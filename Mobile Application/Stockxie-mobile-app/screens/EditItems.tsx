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

type Props = NativeStackScreenProps<RootStackParamList, "EditItems">;

const EditItems: React.FC = (): JSX.Element => {
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

  

  const renderContent = () => {
    const contentContainerStyle: ViewStyle = {
      padding: 20,
    };

    return (
      <Text>Edit Items</Text>
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
export default EditItems;
