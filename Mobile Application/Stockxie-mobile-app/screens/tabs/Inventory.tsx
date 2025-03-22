import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  ViewStyle,
  ImageStyle,
  TextStyle,
  TouchableOpacity,
} from "react-native";

import { text } from "../../text";
import { svg } from "../../assets/svg";
import { sizes } from "../../constants";
import { theme } from "../../constants";
import { components } from "../../components";
import { useAppNavigation } from "../../hooks";
import BottomTabBar from "../../navigation/BottomTabBar";
import {
  useGetCategoriesQuery,
  useGetProductsQuery,
} from "../../store/slices/apiSlice";
import Accordion from "react-native-collapsible/Accordion";
import { homeIndicatorHeight as getHomeIndicatorHeight } from "../../utils";

let history = [
  {
    id: 1,
    orderId: 456654,
    date: "Aug 31, 2023",
    time: "at 8:32 pm",
    total: 25.83,
    status: "Shipping",
    delivery: 2,
    discount: 2.65,
    products: [
      {
        id: 1,
        name: "Beef Stroganoff",
        quantity: 1,
        price: 14.99,
      },
      {
        id: 2,
        name: "Vegetable salad",
        filling: "vanilla",
        quantity: 1,
        price: 11.99,
      },
    ],
  },
  {
    id: 2,
    orderId: 456654,
    date: "Aug 31, 2023",
    time: "at 8:32 pm",
    total: 281.85,
    status: "Delivered",
    delivery: 2,
    discount: 2.65,
    products: [
      {
        id: 1,
        name: "Roasted Tomato Soup",
        quantity: 1,
        price: 6.99,
      },
      {
        id: 2,
        name: "Pan-Seared Salmon",
        filling: "vanilla",
        quantity: 2,
        price: 15.99,
      },
    ],
  },
  {
    id: 3,
    orderId: 456654,
    date: "Aug 31, 2023",
    time: "at 8:32 pm",
    total: 281.85,
    status: "Canceled",
    delivery: 2,
    discount: 2.65,
    products: [
      {
        id: 1,
        name: "Beef Stroganoff",
        quantity: 1,
        price: 14.99,
      },
      {
        id: 2,
        name: "Vegetable salad",
        filling: "vanilla",
        quantity: 1,
        price: 11.99,
      },
    ],
  },
];

const Inventory: React.FC = (): JSX.Element => {
  const navigation = useAppNavigation();
  const [activeSections, setActiveSections] = useState<number[]>([]);

  const homeIndicatorHeight = getHomeIndicatorHeight();

  const setSections = (sections: any) => {
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };

  const {
    data: categoryData,
    error: categoryError,
    isLoading: categoryLoading,
  } = useGetCategoriesQuery();

  const {
    data: productsData,
    error: productsError,
    isLoading: productsLoading,
  } = useGetProductsQuery();

  const categories = categoryData instanceof Array ? categoryData : [];
  const dishes = productsData instanceof Array ? productsData : [];

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
        >
          <svg.FilterSvg />
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
          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <Text
              style={{
                ...theme.fonts.DMSans_500Medium,
                fontSize: 14,
                lineHeight: 14 * 1.2,
                color: theme.colors.mainColor,
                marginRight: 4,
              }}
            >
              {section.date}
            </Text>
            <Text
              style={{
                ...theme.fonts.DMSans_400Regular,
                fontSize: 10,
                lineHeight: 10 * 1.2,
                marginBottom: 2,
                color: theme.colors.textColor,
              }}
            >
              {section.time}
            </Text>
          </View>
          <Text
            style={{
              ...theme.fonts.DMSans_500Medium,
              fontSize: 14,
              lineHeight: 14 * 1.2,
              color: theme.colors.mainColor,
            }}
          >
            ${section.total}
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
            Order ID: {section.orderId}
          </Text>

          <View
            style={{
              paddingHorizontal: 8,
              paddingVertical: 3,
              borderRadius: 5,
              backgroundColor:
                section.status === "Shipping"
                  ? "#FFA462"
                  : section.status === "Delivered"
                  ? theme.colors.mainTurquoise
                  : "#FA5555",
            }}
          >
            <Text
              style={{
                ...theme.fonts.DMSans_500Medium,
                fontSize: 10,
                lineHeight: 10 * 1.5,
                color: theme.colors.white,
              }}
            >
              {section.status}
            </Text>
          </View>
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
          {section.products.map((item: any, index: number, array: []) => {
            const isLastItem = index === array.length - 1;
            return (
              <View
                key={item.id}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <text.T14>{item.name}</text.T14>
                <text.T14>
                  {item.quantity} x ${item.price}
                </text.T14>
              </View>
            );
          })}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <text.T14>Discount</text.T14>
            <text.T14>- ${section.discount}</text.T14>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <text.T14>Delivery</text.T14>
            <text.T14>${section.delivery}</text.T14>
          </View>
        </View>
        {section.status === "Shipping" && (
          <components.Button
            title="track order"
            onPress={() => {
              navigation.navigate("TrackYourOrder");
            }}
          />
        )}
        {section.status === "Delivered" && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <components.Button
              title="repeat order"
              transparent={true}
              containerStyle={{
                width: "48%",
              }}
            />
            <components.Button
              title="Leave review"
              containerStyle={{
                width: "48%",
              }}
            />
          </View>
        )}
      </View>
    );
  };

  const renderContent = () => {
    if (history.length > 0) {
      return (
        <ScrollView contentContainerStyle={{ paddingBottom: 20, flexGrow: 1 }}>
          <Accordion
            activeSections={activeSections}
            sections={history}
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
  };

  const renderEmptyHistory = () => {
    if (history.length === 0) {
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
              No Order History Yet!
            </text.H2>
            <text.T16 style={{ textAlign: "center" }}>
              It looks like your order history is empty.{"\n"}Place your order
              now to start building{"\n"}your history!
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
