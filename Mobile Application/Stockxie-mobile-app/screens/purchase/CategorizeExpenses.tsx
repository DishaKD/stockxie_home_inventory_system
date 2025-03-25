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

import { text } from "../../text";
import { svg } from "../../assets/svg";
import { theme } from "../../constants";
import { components } from "../../components";
import { useAppNavigation } from "../../hooks";
import BottomTabBar from "../../navigation/BottomTabBar";

import { PieChart } from "react-native-chart-kit";
import { homeIndicatorHeight as getHomeIndicatorHeight } from "../../utils";
import { BASE_URL, ENDPOINTS, CONFIG } from "../../config/index";

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
  interface Expense {
    id: string;
    category: string;
    amount: number;
  }

  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    fetchCategories();
    fetchExpenses();
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
      console.error("Error fetching categories:", error);
    }
  };

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}${ENDPOINTS.get.expenses}`);
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim())
      return Alert.alert("Error", "Enter a category name.");
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
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  // Prepare data for Pie Chart
  const categorySpending = categories.map((cat) => {
    const total = expenses
      .filter((exp) => exp.category === cat.name)
      .reduce((sum, exp) => sum + exp.amount, 0);
    return {
      name: cat.name,
      amount: total,
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Random color
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    };
  });

  // Handle category deletion
  const handleDeleteCategory = async (id: string): Promise<void> => {
    try {
      await axios.delete(`${BASE_URL}${ENDPOINTS.delete.categories}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Pass token here
        },
      });
      setCategories(categories.filter((cat) => cat.id !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
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

  const renderContent = () => {
    return (
      <ScrollView>
        {/* Header */}
        <components.Header title="Categorize Expenses" />

        {/* Add Category Input */}
        <View style={{ flexDirection: "row", padding: 20 }}>
          <TextInput
            placeholder="Enter category name"
            value={newCategory}
            onChangeText={setNewCategory}
          />
          <TouchableOpacity onPress={handleAddCategory} style={{ padding: 10 }}>
            <svg.PlusSvg />
          </TouchableOpacity>
        </View>

        {/* Category List */}
        <ScrollView style={{ marginHorizontal: 20 }}>
          {categories.map((category) => (
            <View key={category.id}>
              <Text style={{ fontSize: 16 }}>{category.name}</Text>
              <TouchableOpacity
                onPress={() => handleDeleteCategory(category.id)}
              ></TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* Pie Chart for Category Spending */}
        {expenses.length > 0 && (
          <View>
            <Text style={{ textAlign: "center", marginTop: 20, fontSize: 18 }}>
              Expense Breakdown
            </Text>
            <PieChart
              data={categorySpending}
              width={theme.sizes.width - 40}
              height={220}
              chartConfig={{
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "#fff",
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor="amount"
              backgroundColor="transparent"
              paddingLeft="10"
            />
          </View>
        )}
      </ScrollView>
    );
  };

  const renderBottomTabBar = () => {
    return <BottomTabBar />;
  };

  const renderHomeIndicator = () => {
    return <components.HomeIndicator />;
  };

  return (
    <components.SmartView>
      {renderStatusBar()}
      {renderHeader()}
      {renderContent()}
      {renderBottomTabBar()}
      {renderHomeIndicator()}
    </components.SmartView>
  );
};

export default CategorizeExpenses;
