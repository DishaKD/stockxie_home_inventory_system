import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ViewStyle,
} from "react-native";
import axios from "axios";
import { text } from "../../text";
import { theme } from "../../constants";
import { components } from "../../components";
import type { RootStackParamList } from "../../types";
import { useAppNavigation } from "../../hooks";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { homeIndicatorHeight } from "../../utils";
import { BASE_URL, ENDPOINTS, CONFIG } from "../../config/index";
import { showToast } from "../../components/ToastProvider";

type Props = NativeStackScreenProps<RootStackParamList, "EditItems">;

const EditItems: React.FC<Props> = ({ route }): JSX.Element => {
  const navigation = useAppNavigation();
  const { itemId } = route.params;

  // State for form fields
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  // Refs for input fields (optional, for focus management)
  const nameRef = useRef(null);
  const quantityRef = useRef(null);
  const expiryDateRef = useRef(null);

  // Fetch item details on component mount
  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}${ENDPOINTS.get.items}/${itemId}`
        );
        const item = response.data;
        setName(item.name);
        setQuantity(item.quantity.toString());
        setExpiryDate(item.expiryDate);
      } catch (error) {
        showToast("danger", "Failed to fetch item details. Please try again later.");
        console.error("Error fetching item details:", error);
      }
    };

    fetchItemDetails();
  }, [itemId]);

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const updatedItem = {
        name,
        quantity: Number(quantity),
        expiryDate,
      };

      // Call the API to update the item
      const response = await axios.put(
        `${BASE_URL}${ENDPOINTS.put.items}/${itemId}`,
        updatedItem
      );

      // Handle success
      showToast("success", "Item updated successfully!");
      console.log("Item updated:", response.data);

      // Navigate back to the previous screen
      navigation.goBack();
    } catch (error) {
      showToast("danger", "Failed to update item. Please try again.");
      console.error("Error updating item:", error);
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
        <components.InputField
          type="number"
          innerRef={quantityRef}
          value={quantity}
          placeholder="Quantity"
          containerStyle={{ marginBottom: 14 }}
          onChangeText={(text) => setQuantity(text)}
        />

        <components.InputField
          type="date"
          innerRef={expiryDateRef}
          value={expiryDate}
          placeholder="Expiry Date"
          containerStyle={{ marginBottom: 14 }}
          onChangeText={(text) => setExpiryDate(text)}
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

export default EditItems;
