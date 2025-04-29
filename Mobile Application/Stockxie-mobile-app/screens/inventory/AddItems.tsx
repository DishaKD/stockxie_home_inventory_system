import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ViewStyle,
} from "react-native";

import { components } from "../../components";
import type { RootStackParamList } from "../../types";
import { useAppNavigation } from "../../hooks";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { homeIndicatorHeight } from "../../utils";
import { createItem } from "../../config/api/itemCreate";
import { showToast } from "../../components/ToastProvider";
import axios from "axios";
import { BASE_URL, ENDPOINTS, CONFIG } from "../../config/index";
import { Picker } from "@react-native-picker/picker";

type Props = NativeStackScreenProps<RootStackParamList, "AddItems">;

const AddItems: React.FC<Props> = ({ route }): JSX.Element => {
  const navigation = useAppNavigation();

  const { userId } = route.params;
  const { token } = route.params;

  // State for form fields
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );

  // Error state
  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    quantity: "",
    itemPrice: "",
    expiryDate: "",
    type: "",
  });

  // Refs for input fields
  const nameRef = useRef(null);
  const quantityRef = useRef(null);
  const itemPriceRef = useRef(null);
  const expiryDateRef = useRef(null);

  // Form validation
  const validateForm = () => {
    let isValid = true;
    const errors = {
      name: "",
      quantity: "",
      expiryDate: "",
      itemPrice: "",
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

    if (!itemPrice || isNaN(Number(itemPrice))) {
      errors.itemPrice = "Item Price must be a number";
      isValid = false;
    }

    if (!expiryDate) {
      errors.expiryDate = "Expiry date is required";
      isValid = false;
    }

    if (!selectedCategoryId) {
      errors.type = "Category is required";
      isValid = false;
    }

    setFieldErrors(errors);
    return isValid;
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}${ENDPOINTS.get.categories}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategories(response.data);
    } catch (error) {
      showToast("danger", "Error fetching categories");
      console.error("Error fetching categories:", error);
    }
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const itemData = {
          name,
          quantity: Number(quantity),
          itemPrice: Number(itemPrice),
          expiryDate,
          categoryId: selectedCategoryId,
          userId,
        };

        // Call the API to create the item
        const response = await createItem(itemData);

        // Handle success
        showToast("success", "Item created successfully!");
        console.log("Item created:", response);

        // Reset form fields
        setName("");
        setQuantity("");
        setItemPrice("");
        setExpiryDate("");
      } catch (error) {
        // Handle error
        showToast("danger", "Failed to create item. Please try again later.");

        console.error("Error creating item:", error);
      }
    } else {
      showToast("danger", "Please fill all the required fields correctly.");
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
          type="number"
          innerRef={itemPriceRef}
          value={itemPrice}
          placeholder="Item Price"
          containerStyle={{ marginBottom: 14 }}
          onChangeText={(text) => setItemPrice(text)}
        />
        {fieldErrors.itemPrice && (
          <Text style={{ color: "red", fontSize: 12 }}>
            {fieldErrors.itemPrice}
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

        <View style={{ marginBottom: 14 }}>
          <Text style={{ marginBottom: 6, fontSize: 16 }}>Select Category</Text>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 6,
              paddingHorizontal: 10,
              backgroundColor: "#fff",
            }}
          >
            <Picker
              selectedValue={selectedCategoryId}
              onValueChange={(itemValue) => setSelectedCategoryId(itemValue)}
            >
              <Picker.Item label="-- Choose a category --" value="" />
              {categories.map((cat: any) => (
                <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
              ))}
            </Picker>
          </View>
          {fieldErrors.type ? (
            <Text style={{ color: "red", fontSize: 12 }}>
              {fieldErrors.type}
            </Text>
          ) : null}
        </View>
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
