import React from "react";
import { View, Text, ScrollView } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { theme } from "../../constants";
import { useAppNavigation } from "../../hooks";

interface ExpenseSummaryProps {
  route?: any;
}

const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({ route }) => {
  const navigation = useAppNavigation();
  const { categorySpending } = route.params;

  return (
    <ScrollView>
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
    </ScrollView>
  );
};

export default ExpenseSummary;
