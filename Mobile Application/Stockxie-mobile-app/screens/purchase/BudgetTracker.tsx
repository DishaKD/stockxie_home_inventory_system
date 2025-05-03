import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { text } from "../../text";
import { theme } from "../../constants";
import { components } from "../../components";
import { homeIndicatorHeight } from "../../utils";
import { BASE_URL, ENDPOINTS } from "../../config/index";
import { showToast } from "../../components/ToastProvider";
import H3 from "@/text/H3";

interface BudgetTrackerProps {
  route?: any;
  userId?: string;
}

const BudgetTracker: React.FC<BudgetTrackerProps> = ({ route }) => {
  const { token } = route.params;
  const { userId } = route.params;

  const [totalBudget, setTotalBudget] = useState("");
  const [month, setMonth] = useState("");
  const [loading, setLoading] = useState(false);
  const [budgetError, setBudgetError] = useState("");
  const [monthError, setMonthError] = useState("");

  const validateInputs = () => {
    let valid = true;

    // Validate budget
    if (
      !totalBudget ||
      isNaN(Number(totalBudget)) ||
      Number(totalBudget) <= 0
    ) {
      setBudgetError("Please enter a valid positive number for budget.");
      valid = false;
    } else {
      setBudgetError("");
    }

    // Validate month (basic text check)
    if (!month || !/^[A-Za-z]{3,10}$/.test(month)) {
      setMonthError("Enter a valid month name (e.g. April).");
      valid = false;
    } else {
      setMonthError("");
    }

    return valid;
  };

  const handleSubmit = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}${ENDPOINTS.BUDGET}`,
        {
          totalBudget: parseFloat(totalBudget),
          month,
          userId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      showToast("success", "Budget set successfully!");
      setTotalBudget("");
      setMonth("");
    } catch (error: any) {
      console.log(error);
      showToast("danger", "Error setting budget");
    } finally {
      setLoading(false);
    }
  };

  return (
    <components.SmartView>
      <components.StatusBar />
      <components.Header goBack={true} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            padding: 20,
            paddingBottom: homeIndicatorHeight() + 40,
            flexGrow: 1,
          }}
        >
          <H3 style={{ marginBottom: 16 }}>Set Monthly Budget</H3>

          <components.InputField
            type="numeric"
            placeholder="Enter total budget"
            keyboardType="numeric"
            value={totalBudget}
            onChangeText={setTotalBudget}
          />
          {budgetError !== "" && (
            <Text style={{ color: "red", marginBottom: 8 }}>{budgetError}</Text>
          )}

          <components.InputField
            type="text"
            placeholder="Enter month (e.g. April)"
            value={month}
            onChangeText={setMonth}
          />
          {monthError !== "" && (
            <Text style={{ color: "red", marginBottom: 8 }}>{monthError}</Text>
          )}

          <components.Button
            title={loading ? "Submitting..." : "Submit"}
            containerStyle={{
              marginTop: 20,
              marginBottom: homeIndicatorHeight() === 0 ? 20 : 10,
              marginHorizontal: 10,
            }}
            onPress={handleSubmit}
          />
        </ScrollView>
      </KeyboardAvoidingView>
      <components.HomeIndicator />
    </components.SmartView>
  );
};

export default BudgetTracker;
