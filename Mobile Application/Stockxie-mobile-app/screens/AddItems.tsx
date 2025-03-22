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
type Props = NativeStackScreenProps<RootStackParamList, "AddItems">;

const AddItems: React.FC = (): JSX.Element => {
  const navigation = useAppNavigation();

  // State for form fields
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [type, setType] = useState("");

  // Error state
  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    quantity: "",
    category: "",
    expiryDate: "",
    type: "",
  });

  // Refs for input fields
  const nameRef = useRef(null);
  const quantityRef = useRef(null);
  const categoryRef = useRef(null);
  const expiryDateRef = useRef(null);
  const typeRef = useRef(null);

  // Form validation
  const validateForm = () => {
    let isValid = true;
    const errors = {
      name: "",
      quantity: "",
      category: "",
      expiryDate: "",
      type: "",
    };

    if (!name) {
      errors.name = "Name is required";
      isValid = false;
    }

    if (!quantity || isNaN(Number(quantity))) {
      errors.quantity = "Quantity must be a number";
      isValid = false;
    }

    if (!category) {
      errors.category = "Category is required";
      isValid = false;
    }

    if (!expiryDate) {
      errors.expiryDate = "Expiry date is required";
      isValid = false;
    }

    if (!type) {
      errors.type = "Type is required";
      isValid = false;
    }

    setFieldErrors(errors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      Alert.alert("Form is valid", "You can proceed with the form submission!");
      // Call the API or proceed with data handling here
    } else {
      Alert.alert("Error", "Please fill all the required fields correctly.");
    }
  };

  // Render status bar, header, etc.
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
        <components.InputField
          type="text"
          innerRef={nameRef}
          value={name}
          placeholder="Item Name"
          containerStyle={{ marginBottom: 14 }}
          onChangeText={(text) => setName(text)}
        />
        {fieldErrors.name && (
          <Text style={{ color: "red", fontSize: 12 }}>{fieldErrors.name}</Text>
        )}

        <components.InputField
          type="number"
          innerRef={quantityRef}
          value={quantity}
          placeholder="Quantity"
          containerStyle={{ marginBottom: 14 }}
          onChangeText={(text) => setQuantity(text)}
        />
        {fieldErrors.quantity && (
          <Text style={{ color: "red", fontSize: 12 }}>{fieldErrors.quantity}</Text>
        )}

        <components.InputField
          type="text"
          innerRef={categoryRef}
          value={category}
          placeholder="Category"
          containerStyle={{ marginBottom: 14 }}
          onChangeText={(text) => setCategory(text)}
        />
        {fieldErrors.category && (
          <Text style={{ color: "red", fontSize: 12 }}>{fieldErrors.category}</Text>
        )}

        <components.InputField
          type="date"
          innerRef={expiryDateRef}
          value={expiryDate}
          placeholder="Expiry Date"
          containerStyle={{ marginBottom: 14 }}
          onChangeText={(text) => setExpiryDate(text)}
        />
        {fieldErrors.expiryDate && (
          <Text style={{ color: "red", fontSize: 12 }}>{fieldErrors.expiryDate}</Text>
        )}

        <components.InputField
          type="text"
          innerRef={typeRef}
          value={type}
          placeholder="Type"
          containerStyle={{ marginBottom: 14 }}
          onChangeText={(text) => setType(text)}
        />
        {fieldErrors.type && (
          <Text style={{ color: "red", fontSize: 12 }}>{fieldErrors.type}</Text>
        )}
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

export default AddItems;
