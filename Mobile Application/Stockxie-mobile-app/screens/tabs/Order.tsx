import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import {
  responsiveWidth,
  responsiveHeight,
} from "react-native-responsive-dimensions";

import { text } from "../../text";
import { svg } from "../../assets/svg";
import { theme } from "../../constants";
import { useAppDispatch } from "../../hooks";
import { components } from "../../components";
import { setScreen } from "../../store/slices/tabSlice";
import BottomTabBar from "../../navigation/BottomTabBar";
import { useAppSelector, useAppNavigation } from "../../hooks";
import { BASE_URL, ENDPOINTS, AUTHORIZATION_TOKEN } from "../../config";

const Order: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();
  interface Purchase {
    itemName: string;
    quantity: number;
    purchaseDate: string;
    pricePerUnit: number;
    totalCost: number;
  }

  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [purchaseLimit, setPurchaseLimit] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [totalSpent, setTotalSpent] = useState(0);

  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [pricePerUnit, setPricePerUnit] = useState("");
  const [totalCost, setTotalCost] = useState(0);

  // Fetch purchase limit and history on component mount
  useEffect(() => {
    // const fetchPurchaseLimit = async () => {
    //   try {
    //     const response = await axios.get(
    //       `${BASE_URL}${ENDPOINTS.purchaseLimit.}`
    //     );
    //     setPurchaseLimit(response.data.limit);
    //   } catch (error) {
    //     console.error("Error fetching purchase limit:", error);
    //   }
    // };

    const fetchPurchaseHistory = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}${ENDPOINTS.purchaseHistory.getAll}`
        );
        setPurchases(response.data);
        calculateTotalSpent(response.data);
      } catch (error) {
        console.error("Error fetching purchase history:", error);
      }
    };

    // fetchPurchaseLimit();
    fetchPurchaseHistory();
  }, []);

  // Calculate total spent
  interface Purchase {
    itemName: string;
    quantity: number;
    purchaseDate: string;
    pricePerUnit: number;
    totalCost: number;
  }

  const calculateTotalSpent = (purchases: Purchase[]): void => {
    const total = purchases.reduce(
      (sum, purchase) => sum + purchase.totalCost,
      0
    );
    setTotalSpent(total);
  };

  // Add a new purchase
  const addPurchase = async () => {
    if (!validateInputs()) {
      Alert.alert("Error", "Please fill all fields correctly.");
      return;
    }

    const newPurchase = {
      itemName,
      quantity: Number(quantity),
      purchaseDate,
      pricePerUnit: Number(pricePerUnit),
      totalCost: Number(quantity) * Number(pricePerUnit),
    };

    try {
      const response = await axios.post(
        `${BASE_URL}${ENDPOINTS.purchaseHistory}`,
        newPurchase
      );
      setPurchases([...purchases, response.data]);
      calculateTotalSpent([...purchases, response.data]);
      resetForm();
    } catch (error) {
      console.error("Error adding purchase:", error);
      Alert.alert("Error", "Failed to add purchase. Please try again.");
    }
  };

  // Validate inputs
  const validateInputs = () => {
    if (!itemName || itemName.length < 2 || itemName.length > 50) {
      return false;
    }
    if (!quantity || isNaN(Number(quantity)) || Number(quantity) <= 0) {
      return false;
    }
    if (!purchaseDate || isNaN(Date.parse(purchaseDate))) {
      return false;
    }
    if (
      !pricePerUnit ||
      isNaN(Number(pricePerUnit)) ||
      Number(pricePerUnit) <= 0
    ) {
      return false;
    }
    return true;
  };

  // Reset form fields
  const resetForm = () => {
    setItemName("");
    setQuantity("");
    setPurchaseDate("");
    setPricePerUnit("");
    setTotalCost(0);
  };

  // Render status bar
  const renderStatusBar = () => {
    return <components.StatusBar />;
  };

  // Render header
  const renderHeader = () => {
    return <components.Header goBack={true} />;
  };

  // Render purchase limit
  const renderPurchaseLimit = () => {
    if (purchaseLimit === null) {
      return (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <Text style={{ ...theme.fonts.DMSans_500Medium, fontSize: 16 }}>
            No purchase limit set.
          </Text>
          <TouchableOpacity
            style={{
              marginTop: 20,
              backgroundColor: theme.colors.mainTurquoise,
              padding: 10,
              borderRadius: 10,
            }}
            // onPress={() => navigation.navigate("SetPurchaseLimit")}
          >
            <Text style={{ color: theme.colors.white }}>
              Set Purchase Limit
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View
        style={{
          padding: 20,
          borderBottomWidth: 1,
          borderBottomColor: "#DBE9F5",
        }}
      >
        <Text style={{ ...theme.fonts.DMSans_500Medium, fontSize: 16 }}>
          Purchase Limit: ${purchaseLimit}
        </Text>
        <View
          style={{
            height: 10,
            backgroundColor: totalSpent >= purchaseLimit ? "red" : "green",
            width: `${(totalSpent / purchaseLimit) * 100}%`,
            marginTop: 10,
          }}
        />
      </View>
    );
  };

  // Render purchase history
  const renderPurchaseHistory = () => {
    if (purchases.length === 0) {
      return (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <Text style={{ ...theme.fonts.DMSans_500Medium, fontSize: 16 }}>
            No purchases yet.
          </Text>
        </View>
      );
    }

    return (
      <ScrollView>
        {purchases &&
          Array.isArray(purchases) &&
          purchases.map((purchase, index) => (
            <View
              key={index}
              style={{
                padding: 20,
                borderBottomWidth: 1,
                borderBottomColor: "#DBE9F5",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>{purchase.itemName}</Text>
              <Text>Quantity: {purchase.quantity}</Text>
              <Text>Price per Unit: ${purchase.pricePerUnit}</Text>
              <Text>Total Cost: ${purchase.totalCost}</Text>
              <Text>Purchase Date: {purchase.purchaseDate}</Text>
            </View>
          ))}
      </ScrollView>
    );
  };

  // Render form to add a new purchase
  const renderAddPurchaseForm = () => {
    return (
      <View style={{ padding: 20 }}>
        <TextInput
          placeholder="Item Name"
          value={itemName}
          onChangeText={setItemName}
          style={{ ...theme.fonts.DMSans_400Regular, fontSize: 14 }}
        />
        <TextInput
          placeholder="Quantity"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
          style={{ ...theme.fonts.DMSans_400Regular, fontSize: 14 }}
        />
        <TextInput
          placeholder="Purchase Date (YYYY-MM-DD)"
          value={purchaseDate}
          onChangeText={setPurchaseDate}
          style={{ ...theme.fonts.DMSans_400Regular, fontSize: 14 }}
        />
        <TextInput
          placeholder="Price per Unit"
          value={pricePerUnit}
          onChangeText={setPricePerUnit}
          keyboardType="numeric"
          style={{ ...theme.fonts.DMSans_400Regular, fontSize: 14 }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: theme.colors.mainTurquoise,
            padding: 10,
            borderRadius: 10,
            marginTop: 20,
          }}
          onPress={addPurchase}
        >
          <Text style={{ color: theme.colors.white }}>Add Purchase</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Render content
  const renderContent = () => {
    return (
      <ScrollView>
        {renderPurchaseLimit()}
        {renderPurchaseHistory()}
        {renderAddPurchaseForm()}
      </ScrollView>
    );
  };

  // Render bottom tab bar
  const renderBottomTabBar = () => {
    return <BottomTabBar />;
  };

  // Render home indicator
  const renderHomeIndicator = () => {
    return <components.HomeIndicator />;
  };

  return (
    <components.SmartView>
      {renderStatusBar()}
      {renderHeader()}
      {renderContent()}
      {renderBottomTabBar()}
      {renderHomeIndicator()}
    </components.SmartView>
  );
};

export default Order;
