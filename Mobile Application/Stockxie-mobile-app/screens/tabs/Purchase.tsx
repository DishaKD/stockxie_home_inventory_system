import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import {
  responsiveWidth,
  responsiveHeight,
} from "react-native-responsive-dimensions";
import { components } from "../../components";
import BottomTabBar from "../../navigation/BottomTabBar";
import axios from "axios";
import { BASE_URL, ENDPOINTS, CONFIG } from "../../config/index";
import { useAppNavigation } from "../../hooks";

// Mock data for demonstration
const expenseCategories = [
  { name: "Food", amount: 450, percentage: 30 },
  { name: "Transport", amount: 300, percentage: 20 },
  { name: "Shopping", amount: 225, percentage: 15 },
  { name: "Bills", amount: 375, percentage: 25 },
  { name: "Others", amount: 150, percentage: 10 },
];

const monthlyData = [
  { month: "Jan", income: 4200, expense: 3800 },
  { month: "Feb", income: 4800, expense: 3950 },
  { month: "Mar", income: 5300, expense: 4100 },
  { month: "Apr", income: 5800, expense: 4300 },
];

interface PurchaseProps {
  token?: string;
  userId?: string;
}

const Purchase: React.FC<PurchaseProps> = ({ token, userId }): JSX.Element => {
  const navigation = useAppNavigation();

  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [currentMonth, setCurrentMonth] = useState("");
  const [totalIncome, setTotalIncome] = useState(5800);
  const [totalExpense, setTotalExpense] = useState(0);
  const [savingsPercentage, setSavingsPercentage] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchBudget = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}${ENDPOINTS.BUDGET}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { totalBudget, totalSpent, month } = res.data;
      setTotalBudget(totalBudget);
      setTotalSpent(totalSpent);
      setCurrentMonth(month);
    } catch (error) {
      console.error("Error fetching budget:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && userId) {
      fetchBudget();
    }
  }, [token, userId]);

  const renderStatusBar = () => {
    return <components.StatusBar />;
  };

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <components.Header basket={true} user={true} userImage={true} />

        <Text style={styles.headerTitle}>Financial Overview</Text>
        <Text style={styles.headerSubtitle}>
          Track your budgets, expenses, and financial health in one place
        </Text>
      </View>
    );
  };

  const renderBudgetTracker = () => {
    const remainingBudget = totalBudget - totalSpent;
    const percentSpent = (totalSpent / totalBudget) * 100;

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Budget Tracker</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() =>
              navigation.navigate("BudgetTracker", {
                token: token ?? "",
                userId: userId ?? "",
              })
            }
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.budgetInfo}>
          <View style={styles.budgetInfoItem}>
            <Text style={styles.budgetInfoLabel}>Total Budget</Text>
            <Text style={styles.budgetInfoValue}>LKR {totalBudget}</Text>
          </View>
          <View style={styles.budgetInfoItem}>
            <Text style={styles.budgetInfoLabel}>Spent</Text>
            <Text style={styles.budgetInfoValue}>LKR {totalSpent}</Text>
          </View>
          <View style={styles.budgetInfoItem}>
            <Text style={styles.budgetInfoLabel}>Remaining</Text>
            <Text
              style={[
                styles.budgetInfoValue,
                { color: remainingBudget < 0 ? "#e74c3c" : "#04b4bc" },
              ]}
            >
              LKR {remainingBudget}
            </Text>
          </View>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${Math.min(percentSpent, 100)}%` },
                percentSpent > 100 && { backgroundColor: "#e74c3c" },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {percentSpent > 100
              ? "Budget exceeded!"
              : `${Math.round(percentSpent)}% of budget used`}
          </Text>
        </View>

        <Text style={styles.budgetDate}>
          Budget period: 1 - 30 {currentMonth}
        </Text>
      </View>
    );
  };

  const renderExpenseTracker = () => {
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Expense Categories</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() =>
              navigation.navigate("CategorizeExpenses", {
                token: token ?? "",
              })
            }
          >
            <Text style={styles.editButtonText}>View All</Text>
          </TouchableOpacity>
        </View>

        {expenseCategories.map((category, index) => (
          <View key={index} style={styles.categoryItem}>
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryName}>{category.name}</Text>
              <Text style={styles.categoryAmount}>${category.amount}</Text>
            </View>
            <View style={styles.categoryProgressBar}>
              <View
                style={[
                  styles.categoryProgressFill,
                  { width: `${category.percentage}%` },
                ]}
              />
            </View>
          </View>
        ))}
      </View>
    );
  };

  const renderFinancialSummary = () => {
    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Financial Summary</Text>

        <View style={styles.summaryCards}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Income</Text>
            <Text style={styles.summaryValue}>${totalIncome}</Text>
            <Text style={styles.summarySubtext}>This Month</Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Expenses</Text>
            <Text style={styles.summaryValue}>${totalExpense}</Text>
            <Text style={styles.summarySubtext}>This Month</Text>
          </View>
        </View>

        <View style={styles.savingsContainer}>
          <View style={styles.savingsTextContainer}>
            <Text style={styles.savingsLabel}>Savings</Text>
            <Text style={styles.savingsValue}>
              ${totalIncome - totalExpense}
            </Text>
          </View>
          <View style={styles.savingsPercentageContainer}>
            <Text style={styles.savingsPercentage}>{savingsPercentage}%</Text>
            <Text style={styles.savingsPercentageLabel}>of income</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.viewMoreButton}>
          <Text style={styles.viewMoreButtonText}>View Detailed Report</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderBottomTabBar = () => {
    return <BottomTabBar />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#04b4bc" barStyle="light-content" />
      {renderStatusBar()}

      {renderHeader()}
      <ScrollView style={styles.scrollView}>
        {renderBudgetTracker()}
        {renderExpenseTracker()}
        {renderFinancialSummary()}
        <View style={{ height: 20 }} />
      </ScrollView>
      {renderBottomTabBar()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: responsiveWidth(5),
  },
  header: {
    backgroundColor: "#04b4bc",
    paddingTop: responsiveHeight(5),
    paddingBottom: responsiveHeight(3),
    paddingHorizontal: responsiveWidth(5),
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 5,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  editButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  editButtonText: {
    color: "#04b4bc",
    fontWeight: "500",
  },
  budgetInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  budgetInfoItem: {
    alignItems: "center",
  },
  budgetInfoLabel: {
    fontSize: 12,
    color: "#999",
    marginBottom: 3,
  },
  budgetInfoValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  progressContainer: {
    marginBottom: 10,
  },
  progressBar: {
    height: 6,
    backgroundColor: "#e9ecef",
    borderRadius: 10,
    marginBottom: 5,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#04b4bc",
    borderRadius: 10,
  },
  progressText: {
    fontSize: 12,
    color: "#666",
    textAlign: "right",
  },
  budgetDate: {
    fontSize: 12,
    color: "#999",
    marginTop: 5,
  },
  categoryItem: {
    marginBottom: 12,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  categoryName: {
    fontWeight: "500",
    color: "#333",
  },
  categoryAmount: {
    fontWeight: "500",
    color: "#333",
  },
  categoryProgressBar: {
    height: 4,
    backgroundColor: "#e9ecef",
    borderRadius: 10,
    overflow: "hidden",
  },
  categoryProgressFill: {
    height: "100%",
    backgroundColor: "#04b4bc",
    borderRadius: 10,
  },
  summaryCards: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 20,
  },
  summaryCard: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 15,
    width: "48%",
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 5,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  summarySubtext: {
    fontSize: 10,
    color: "#999",
    marginTop: 5,
  },
  savingsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#edf8f7",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  savingsTextContainer: {
    flex: 1,
  },
  savingsLabel: {
    fontSize: 12,
    color: "#666",
  },
  savingsValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#04b4bc",
    marginTop: 3,
  },
  savingsPercentageContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#04b4bc",
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  savingsPercentage: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  savingsPercentageLabel: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 10,
  },
  viewMoreButton: {
    backgroundColor: "#f8f9fa",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  viewMoreButtonText: {
    color: "#04b4bc",
    fontWeight: "500",
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  actionButton: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    width: "30%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  actionButtonIcon: {
    backgroundColor: "#edf8f7",
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  actionButtonText: {
    fontSize: 12,
    color: "#333",
    fontWeight: "500",
  },
});

export default Purchase;
