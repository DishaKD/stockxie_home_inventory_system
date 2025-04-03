import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

import { text } from "../../text";
import { svg } from "../../assets/svg";
import { theme } from "../../constants";
import { components } from "../../components";
import { useAppNavigation } from "../../hooks";
import BottomTabBar from "../../navigation/BottomTabBar";

import Accordion from "react-native-collapsible/Accordion";
import { homeIndicatorHeight as getHomeIndicatorHeight } from "../../utils";
import { BASE_URL, ENDPOINTS, CONFIG } from "../../config/index";
import { showToast } from "../../components/ToastProvider";

interface InventoryProps {
  userId?: string;
  token?: string;
}

const Inventory: React.FC<InventoryProps> = ({ userId, token }) => {
  const navigation = useAppNavigation();
  const [activeSections, setActiveSections] = useState<number[]>([]);
  interface Item {
    id: number;
    name: string;
    quantity: number;
    expiryDate: string;
    category: string;
  }

  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Move useState here

  const homeIndicatorHeight = getHomeIndicatorHeight();
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${BASE_URL}${ENDPOINTS.get.items}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setItems(response.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  // Function to handle search
  const handleSearch = async (query: string) => {
    try {
      const response = await axios.get(`${BASE_URL}${ENDPOINTS.items.search}`, {
        params: { query },
      });
      setItems(response.data); // Update the items list with search results
    } catch (error) {
      console.error("Error searching items:", error);
      showToast("danger", "Failed to search items. Please try again.");
    }
  };

  const setSections = (sections: any) => {
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };

  const renderStatusBar = () => {
    return <components.StatusBar />;
  };

  const renderHeader = () => {
    return (
      <components.Header
        basket={true}
        user={true}
        userImage={true}
        userName={true}
      />
    );
  };

  const renderSearchBar = () => {
    return (
      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginHorizontal: 20,
          height: 50,
        }}
      >
        <View
          style={{
            backgroundColor: theme.colors.white,
            flex: 1,
            borderRadius: 10,
            marginRight: 5,
            padding: 5,
            flexDirection: "row",
            alignItems: "center",
            height: "100%",
          }}
        >
          <View
            style={{
              backgroundColor: theme.colors.mainTurquoise,
              width: 40,
              height: "100%",
              borderRadius: 8,
              justifyContent: "center",
              alignItems: "center",
              marginRight: 14,
            }}
          >
            <svg.SearchSvg />
          </View>
          <TextInput
            placeholder="Search ..."
            style={{
              flex: 1,
              ...theme.fonts.DMSans_400Regular,
              fontSize: 16,
              color: theme.colors.mainColor,
            }}
            placeholderTextColor={theme.colors.textColor}
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
              handleSearch(text); // Trigger search on text change
            }}
          />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: theme.colors.white,
            borderRadius: 10,
            height: 50,
            width: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            navigation.navigate("AddItems", { userId: userId ?? "" });
            console.log("Plus icon pressed");
          }}
        >
          <svg.PlusSvg />
        </TouchableOpacity>
      </View>
    );
  };

  const accordionHeader = (section: any) => {
    return (
      <View
        style={{
          marginHorizontal: 20,
          backgroundColor: theme.colors.white,
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: 17,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 7,
          }}
        >
          <Text
            style={{
              ...theme.fonts.DMSans_500Medium,
              fontSize: 14,
              lineHeight: 14 * 1.2,
              color: theme.colors.mainColor,
            }}
          >
            {section.name}
          </Text>
          <Text
            style={{
              ...theme.fonts.DMSans_500Medium,
              fontSize: 14,
              lineHeight: 14 * 1.2,
              color: theme.colors.mainColor,
            }}
          >
            Quantity: {section.quantity}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              ...theme.fonts.DMSans_400Regular,
              color: theme.colors.textColor,
              fontSize: 12,
              lineHeight: 12 * 1.5,
            }}
          >
            Expiry Date: {section.expiryDate}
          </Text>
        </View>
      </View>
    );
  };

  const accordionContent = (section: any) => {
    return (
      <View
        style={{
          marginHorizontal: 20,
          borderTopWidth: 1,
          borderTopColor: "#DBE9F5",
        }}
      >
        <View
          style={{
            backgroundColor: theme.colors.white,
            padding: 20,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            marginBottom: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <text.T14>Category</text.T14>
            <text.T14>{section.category}</text.T14>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <text.T14>Expiry Date</text.T14>
            <text.T14>{section.expiryDate}</text.T14>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <text.T14>Quantity</text.T14>
            <text.T14>{section.quantity}</text.T14>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <components.Button
            title="Edit"
            transparent={true}
            containerStyle={{
              width: "48%",
            }}
            onPress={() => {
              navigation.navigate("EditItems", { itemId: section.id });
            }}
          />
          <components.Button
            title="Delete"
            containerStyle={{
              width: "48%",
            }}
            onPress={() => handleDeleteItem(section.id)}
          />
        </View>
      </View>
    );
  };

  const renderContent = () => {
    if (items.length > 0) {
      return (
        <ScrollView contentContainerStyle={{ paddingBottom: 20, flexGrow: 1 }}>
          <Accordion
            activeSections={activeSections}
            sections={items}
            touchableComponent={TouchableOpacity}
            renderHeader={accordionHeader}
            renderContent={accordionContent}
            duration={400}
            onChange={setSections}
            containerStyle={{ paddingTop: 10 }}
            sectionContainerStyle={{ marginBottom: 10 }}
          />
        </ScrollView>
      );
    }
    return renderEmptyHistory();
  };

  const renderEmptyHistory = () => {
    if (items.length === 0) {
      return (
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingTop: 10 }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              backgroundColor: theme.colors.white,
              flex: 1,
              marginHorizontal: 20,
              paddingHorizontal: 20,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <components.Image
              source={{ uri: "https://george-fx.github.io/dine-hub/13.jpg" }}
              style={{
                width: theme.sizes.width - 100,
                aspectRatio: 1,
                alignSelf: "center",
                marginBottom: 14,
              }}
            />
            <text.H2
              style={{
                marginBottom: 14,
              }}
            >
              No Items Found!
            </text.H2>
            <text.T16 style={{ textAlign: "center" }}>
              It looks like your inventory is empty.{"\n"}Add items to get
              started!
            </text.T16>
          </View>
        </ScrollView>
      );
    }

    return null;
  };

  const renderBottomTabBar = () => {
    return <BottomTabBar />;
  };

  const renderButton = () => {
    if (history.length === 0) {
      return (
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 20,
            marginBottom: homeIndicatorHeight === 0 ? 20 : 10,
          }}
        >
          <components.Button
            title="Explore Our Menu"
            onPress={() => {
              navigation.navigate("VerifyYourPhoneNumber");
            }}
          />
        </View>
      );
    }

    return null;
  };

  const renderHomeIndicator = () => {
    return <components.HomeIndicator />;
  };

  const handleDeleteItem = async (itemId: number) => {
    try {
      await axios.delete(`${BASE_URL}${ENDPOINTS.delete.items}/${itemId}`);
      setItems(items.filter((item) => item.id !== itemId));
      showToast("success", "Item deleted successfully!");
    } catch (error) {
      showToast("danger", "Failed to delete item. Please try again.");
      console.error("Error deleting item:", error);
    }
  };
  return (
    <components.SmartView>
      {renderStatusBar()}
      {renderHeader()}
      {renderSearchBar()}
      {renderContent()}
      {renderEmptyHistory()}
      {renderButton()}
      {renderBottomTabBar()}
      {renderHomeIndicator()}
    </components.SmartView>
  );
};

export default Inventory;
