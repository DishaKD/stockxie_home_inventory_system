import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";
import Accordion from "react-native-collapsible/Accordion";
import { text } from "../../text";
import { svg } from "../../assets/svg";
import { theme } from "../../constants";
import { components } from "../../components";
import { useAppNavigation } from "../../hooks";
import BottomTabBar from "../../navigation/BottomTabBar";
import { homeIndicatorHeight as getHomeIndicatorHeight } from "../../utils";
import { BASE_URL, ENDPOINTS, CONFIG } from "../../config/index";
import { showToast } from "../../components/ToastProvider";

interface CategorizeExpensesProps {
  route?: any;
}

const CategorizeExpenses: React.FC<CategorizeExpensesProps> = ({ route }) => {
  const navigation = useAppNavigation();
  const [activeSections, setActiveSections] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const homeIndicatorHeight = getHomeIndicatorHeight();
  const { token } = route.params;
  console.log("Token received Category:", token);

  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}${ENDPOINTS.get.categories}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategories(response.data);
    } catch (error) {
      showToast("danger", "Error fetching categories");
      console.error("Error fetching categories:", error);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) showToast("danger", "Enter a category name.");
    try {
      const response = await axios.post(
        `${BASE_URL}${ENDPOINTS.post.categories}`,
        { name: newCategory },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Pass token here
          },
        }
      );
      setCategories([...categories, response.data]);
      setNewCategory("");
      showToast("success", "Category added successfully!");
    } catch (error) {
      showToast("danger", "Error adding category");
      console.error("Error adding category:", error);
    }
  };

  const handleDeleteCategory = async (id: string): Promise<void> => {
    try {
      await axios.delete(`${BASE_URL}${ENDPOINTS.delete.categories}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Pass token here
        },
      });
      setCategories(categories.filter((cat) => cat.id !== id));
      showToast("success", "Category deleted successfully!");
    } catch (error) {
      showToast("danger", "Error deleting category");

      console.error("Error deleting category:", error);
    }
  };

  const setSections = (sections: any) => {
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };

  const renderCategoryCreate = () => {
    return (
      <View style={{ flexDirection: "row", padding: 20 }}>
        <TextInput
          placeholder="Enter category name"
          value={newCategory}
          onChangeText={setNewCategory}
          style={{
            flex: 1,
            ...theme.fonts.DMSans_400Regular,
            fontSize: 16,
            color: theme.colors.mainColor,
          }}
        />
        <TouchableOpacity onPress={handleAddCategory} style={{ padding: 10 }}>
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
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        ></View>
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
        ></View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <components.Button
            title="Delete"
            containerStyle={{
              width: "48%",
            }}
            onPress={() => handleDeleteCategory(section.id)}
          />
        </View>
      </View>
    );
  };

  const renderStatusBar = () => {
    return <components.StatusBar />;
  };

  const renderHeader = () => {
    return <components.Header goBack={true} title="Categories" />;
  };

  const renderContent = () => {
    return (
      <ScrollView contentContainerStyle={{ paddingBottom: 20, flexGrow: 1 }}>
        <Accordion
          activeSections={activeSections}
          sections={categories}
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
  };

  const renderHomeIndicator = () => {
    return <components.HomeIndicator />;
  };

  return (
    <components.SmartView>
      {renderStatusBar()}
      {renderHeader()}
      {renderCategoryCreate()}
      {renderContent()}
      {renderHomeIndicator()}
    </components.SmartView>
  );
};

export default CategorizeExpenses;
