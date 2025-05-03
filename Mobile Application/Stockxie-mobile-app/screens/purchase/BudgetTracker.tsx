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
import { useEffect } from "react";

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
  const [hasExistingBudget, setHasExistingBudget] = useState(false);

  const fetchBudget = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}${ENDPOINTS.BUDGET}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data) {
        const { totalBudget, month } = res.data;
        setTotalBudget(totalBudget.toString());
        setMonth(month);
        setHasExistingBudget(true);
      }
    } catch (error: any) {
      // If 404, assume no budget set yet
      if (error.response?.status === 404) {
        console.log("No budget set yet");
      } else {
        console.error("Error fetching budget:", error);
        showToast("danger", "Failed to load budget");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBudget();
  }, []);

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

  const updateBudget = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    try {
      const response = await axios.put(
        `${BASE_URL}${ENDPOINTS.BUDGET}/${month}`,
        {
          totalBudget: parseFloat(totalBudget),
          userId: userId,
          month: month,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      showToast("success", "Budget updated successfully!");
    } catch (error: any) {
      console.log(error);
      showToast("danger", "Error updating budget");
    } finally {
      setLoading(false);
    }
  };

  const deleteBudget = async () => {
    setLoading(true);
    try {
      await axios.delete(`${BASE_URL}${ENDPOINTS.BUDGET}/${month}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      showToast("success", "Budget deleted successfully!");
      setTotalBudget("");
      setMonth("");
      setHasExistingBudget(false);
    } catch (error: any) {
      console.log(error);
      showToast("danger", "Error deleting budget");
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

          <components.InputField
            type="text"
            placeholder="Enter month (e.g. April)"
            value={month}
            onChangeText={setMonth}
          />

          {hasExistingBudget ? (
            <>
              <components.Button
                title={loading ? "Saving..." : "Save Changes"}
                onPress={updateBudget}
                transparent={true}
                containerStyle={{
                  marginTop: 20,
                  marginBottom: 10,
                  marginHorizontal: 10,
                }}
              />
              <components.Button
                title="Delete Budget"
                onPress={deleteBudget}
                containerStyle={{
                  marginTop: 10,
                  marginBottom: homeIndicatorHeight() === 0 ? 20 : 10,
                  marginHorizontal: 10,
                }}
              />
            </>
          ) : (
            <components.Button
              title={loading ? "Submitting..." : "Submit"}
              onPress={handleSubmit}
              containerStyle={{
                marginTop: 20,
                marginBottom: homeIndicatorHeight() === 0 ? 20 : 10,
                marginHorizontal: 10,
              }}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
      <components.HomeIndicator />
    </components.SmartView>
  );
};

export default BudgetTracker;
