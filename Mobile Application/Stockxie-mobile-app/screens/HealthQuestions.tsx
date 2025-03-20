import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ViewStyle,
} from "react-native";

import { text } from "../text";
import { theme } from "../constants";
import { components } from "../components";
import type { RootStackParamList } from "../types";
import { useAppNavigation } from "../hooks";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { homeIndicatorHeight } from "../utils";
import { createHealthProfile } from "../config/api/healthProfile";
type Props = NativeStackScreenProps<RootStackParamList, "HealthQuestions">;

const HealthQuestions: React.FC = (): JSX.Element => {
  const navigation = useAppNavigation();
  // State for form fields
  const [dietaryPreferences, setDietaryPreferences] = useState("");
  const [allergies, setAllergies] = useState("");
  const [healthGoals, setHealthGoals] = useState("");

  // Refs for input fields (optional, for focus management)
  const dietaryPrefRef = useRef(null);
  const allergiesRef = useRef(null);
  const healthGoalsRef = useRef(null);
  const renderStatusBar = () => {
    return <components.StatusBar />;
  };

  const renderHeader = () => {
    return <components.Header goBack={true} />;
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!dietaryPreferences || !allergies || !healthGoals) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }

    const healthProfileData = {
      userId: 1, // Replace with the actual user ID (e.g., from auth context)
      dietaryPreferences,
      allergies,
      healthGoals,
    };

    try {
      await createHealthProfile(healthProfileData);
      Alert.alert("Success", "Health profile created successfully!");
      navigation.replace("SignIn"); // Navigate to the next screen
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to create health profile. Please try again."
      );
      console.error(error);
    }
  };

  const renderContent = () => {
    const contentContainerStyle: ViewStyle = {
      padding: 20,
    };

    return (
      <ScrollView contentContainerStyle={contentContainerStyle}>
        {/* Dietary Preferences Input */}
        <components.InputField
          type="text"
          value={dietaryPreferences}
          innerRef={dietaryPrefRef}
          placeholder="e.g., Vegetarian, Low-Carb"
          containerStyle={{ marginBottom: 20 }}
          onChangeText={(text) => setDietaryPreferences(text)}
        />

        {/* Allergies Input */}
        <components.InputField
          type="text"
          value={allergies}
          innerRef={allergiesRef}
          placeholder="e.g., Peanuts, Gluten"
          containerStyle={{ marginBottom: 20 }}
          onChangeText={(text) => setAllergies(text)}
        />

        {/* Health Goals Input */}
        <components.InputField
          type="text"
          value={healthGoals}
          innerRef={healthGoalsRef}
          placeholder="e.g., Weight Loss, Muscle Gain"
          containerStyle={{ marginBottom: 20 }}
          onChangeText={(text) => setHealthGoals(text)}
        />
      </ScrollView>
    );
  };

  const renderButton = () => {
    return (
      <components.Button
        title="Submit"
        containerStyle={{
          marginBottom: homeIndicatorHeight() === 0 ? 20 : 10,
          marginHorizontal: 20,
          marginTop: 20,
        }}
        onPress={handleSubmit}
      />
    );
  };

  const renderHomeIndicator = () => {
    return <components.HomeIndicator />;
  };

  return (
    <components.SmartView>
      {renderStatusBar()}
      {renderHeader()}
      {renderContent()}
      {renderButton()}
      {renderHomeIndicator()}
    </components.SmartView>
  );
};
export default HealthQuestions;
