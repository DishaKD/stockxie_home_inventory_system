import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ViewStyle,
} from "react-native";

import { text } from "../../text";
import { theme } from "../../constants";
import { components } from "../../components";
import type { RootStackParamList } from "../../types";
import { useAppNavigation } from "../../hooks";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { homeIndicatorHeight } from "../../utils";
import { createItem } from "../../config/api/itemCreate";
type Props = NativeStackScreenProps<RootStackParamList, "AddItems">;

const AddItems: React.FC<Props> = ({ route }): JSX.Element => {
  const navigation = useAppNavigation();

  const { userId } = route.params;

  // State for form fields
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

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

    setFieldErrors(errors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const itemData = {
          name,
          quantity: Number(quantity),
          category,
          expiryDate,
          userId,
        };

        // Call the API to create the item
        const response = await createItem(itemData);

        // Handle success
        Alert.alert("Success", "Item created successfully!");
        console.log("Item created:", response);

        // Reset form fields
        setName("");
        setQuantity("");
        setCategory("");
        setExpiryDate("");
      } catch (error) {
        // Handle error
        Alert.alert("Error", "Failed to create item. Please try again.");
        console.error("Error creating item:", error);
      }
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
          <Text style={{ color: "red", fontSize: 12 }}>
            {fieldErrors.quantity}
          </Text>
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
          <Text style={{ color: "red", fontSize: 12 }}>
            {fieldErrors.category}
          </Text>
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
          <Text style={{ color: "red", fontSize: 12 }}>
            {fieldErrors.expiryDate}
          </Text>
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
