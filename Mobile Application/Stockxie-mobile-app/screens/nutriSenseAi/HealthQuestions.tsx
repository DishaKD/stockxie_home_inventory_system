import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ViewStyle,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import { text } from "../../text";
import { theme } from "../../constants";
import { components } from "../../components";
import type { RootStackParamList } from "../../types";
import { useAppNavigation } from "../../hooks";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { homeIndicatorHeight } from "../../utils";
import { createHealthProfile } from "../../config/api/healthProfile";

const genders = ["Male", "Female", "Other"];
const activityLevels = [
  "Sedentary",
  "Light",
  "Moderate",
  "Active",
  "Very Active",
];
const mealTypes = ["Vegetarian", "Vegan", "Keto", "Low-Carb", "Balanced"];

type Props = NativeStackScreenProps<RootStackParamList, "HealthQuestions">;

const HealthQuestions: React.FC<Props> = ({ route }): JSX.Element => {
  const { token, userId } = route.params;

  console.log("Token:", token);
  console.log("User ID:", userId);

  const navigation = useAppNavigation();
  // State for form fields
  // State for all fields
  const [dietaryPreferences, setDietaryPreferences] = useState("");
  const [allergies, setAllergies] = useState("");
  const [healthGoals, setHealthGoals] = useState("");
  const [medicalConditions, setMedicalConditions] = useState("");
  const [preferredMealTypes, setPreferredMealTypes] = useState("");
  const [gender, setGender] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [sleepHours, setSleepHours] = useState("");
  const [waterIntake, setWaterIntake] = useState("");

  // Refs for input fields (optional, for focus management)
  const dietaryPrefRef = useRef(null);
  const allergiesRef = useRef(null);
  const healthGoalsRef = useRef(null);

  const handleSubmit = async () => {
    if (
      !dietaryPreferences ||
      !allergies ||
      !healthGoals ||
      !gender ||
      !activityLevel ||
      !age ||
      !weight ||
      !height
    ) {
      Alert.alert("Error", "Please fill out all required fields.");
      return;
    }

    const healthProfileData = {
      userId: parseInt(userId, 10),
      dietaryPreferences,
      allergies,
      healthGoals,
      medicalConditions,
      preferredMealTypes,
      gender,
      activityLevel,
      age: parseInt(age),
      weight: parseFloat(weight),
      height: parseFloat(height),
      sleepHours: parseFloat(sleepHours),
      waterIntake: parseFloat(waterIntake),
    };

    try {
      await createHealthProfile(healthProfileData);
      Alert.alert("Success", "Health profile created!");
    } catch (error) {
      console.error("Create Profile Error:", error);
      Alert.alert("Error", "Could not create profile.");
    }
  };

  const renderStatusBar = () => {
    return <components.StatusBar />;
  };

  const renderHeader = () => {
    return <components.Header goBack={true} />;
  };

  const renderContent = () => {
    const contentContainerStyle: ViewStyle = {
      padding: 20,
    };

    return (
      <ScrollView contentContainerStyle={contentContainerStyle}>
        {/* Age */}
        <components.InputField
          type="numeric"
          placeholder="Age"
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
          containerStyle={{ marginBottom: 20 }}
        />

        {/* Gender Dropdown */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ marginBottom: 10, color: theme.colors.textColor }}>
            Select Gender
          </Text>
          <Picker
            selectedValue={gender}
            onValueChange={setGender}
            style={{
              height: 50,
              color: theme.colors.textColor,
              backgroundColor: theme.colors.neonWhite,
              borderWidth: 1,
              borderColor: theme.colors.textColor,
              borderRadius: 5,
              paddingHorizontal: 10,
            }}
          >
            <Picker.Item label="Select Gender" value="" />
            {genders.map((option) => (
              <Picker.Item key={option} label={option} value={option} />
            ))}
          </Picker>
        </View>

        {/* Weight */}
        <components.InputField
          type="numeric"
          placeholder="Weight (kg)"
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
          containerStyle={{ marginBottom: 20 }}
        />

        {/* Height */}
        <components.InputField
          type="numeric"
          placeholder="Height (cm)"
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
          containerStyle={{ marginBottom: 20 }}
        />

        {/* Activity Level Dropdown */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ marginBottom: 10, color: theme.colors.textColor }}>
            Activity Level
          </Text>
          <Picker
            selectedValue={activityLevel}
            onValueChange={setActivityLevel}
            style={{
              height: 50,
              color: theme.colors.textColor,
              backgroundColor: theme.colors.neonWhite,
              borderWidth: 1,
              borderColor: theme.colors.textColor,
              borderRadius: 5,
              paddingHorizontal: 10,
            }}
          >
            <Picker.Item label="Select Activity Level" value="" />
            {activityLevels.map((option) => (
              <Picker.Item key={option} label={option} value={option} />
            ))}
          </Picker>
        </View>

        {/* Preferred Meal Type Dropdown */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ marginBottom: 10, color: theme.colors.textColor }}>
            Preferred Meal Type
          </Text>
          <Picker
            selectedValue={preferredMealTypes}
            onValueChange={setPreferredMealTypes}
            style={{
              height: 50,
              color: theme.colors.textColor,
              backgroundColor: theme.colors.neonWhite,
              borderWidth: 1,
              borderColor: theme.colors.textColor,
              borderRadius: 5,
              paddingHorizontal: 10,
            }}
          >
            <Picker.Item label="Select Meal Type" value="" />
            {mealTypes.map((option) => (
              <Picker.Item key={option} label={option} value={option} />
            ))}
          </Picker>
        </View>

        {/* Text Inputs */}
        <components.InputField
          type="text"
          placeholder="Dietary Preferences"
          value={dietaryPreferences}
          onChangeText={setDietaryPreferences}
          containerStyle={{ marginBottom: 20 }}
        />
        <components.InputField
          type="text"
          placeholder="Allergies"
          value={allergies}
          onChangeText={setAllergies}
          containerStyle={{ marginBottom: 20 }}
        />
        <components.InputField
          type="text"
          placeholder="Health Goals"
          value={healthGoals}
          onChangeText={setHealthGoals}
          containerStyle={{ marginBottom: 20 }}
        />
        <components.InputField
          type="text"
          placeholder="Medical Conditions"
          value={medicalConditions}
          onChangeText={setMedicalConditions}
          containerStyle={{ marginBottom: 20 }}
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
