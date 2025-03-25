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

interface PurchaseProps {
  token?: string;
}

const Purchase: React.FC<PurchaseProps> = ({ token }): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();
  console.log("Token received:", token);

  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [purchaseLimit, setPurchaseLimit] = useState<number | null>(null);
  const [totalSpent, setTotalSpent] = useState(0);
  const [itemPrice, setItemPrice] = useState<{ [key: string]: number }>({});

  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [pricePerUnit, setPricePerUnit] = useState("");
  const [totalCost, setTotalCost] = useState(0);

  const renderHeader = () => {
    return (
      <components.Header
        basket={true}
        user={true}
        userImage={true}
        userName={true}
      />
    );
  };

  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      try {
        const response = await axios.get(`${BASE_URL}${ENDPOINTS.get.items}`);
        console.log("API Response:", response.data);
        setPurchases(response.data);
      } catch (error) {
        console.error("Error fetching purchase history:", error);
      }
    };

    fetchPurchaseHistory();
  }, []);

  const calculateTotalSpent = (purchases: Purchase[]): void => {
    const total = purchases.reduce(
      (sum, purchase) => sum + (purchase.quantity || 0),
      0
    );
    setTotalSpent(total);
  };

  const getCurrentMonth = () => {
    const date = new Date();
    return date.toLocaleString("default", { month: "long", year: "numeric" });
  };

  // Render status bar
  const renderStatusBar = () => {
    return <components.StatusBar />;
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
          <Text
            style={{ fontSize: 18, fontWeight: "bold", textAlign: "center" }}
          >
            {getCurrentMonth()}
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Budget: {purchaseLimit ? `LKR ${purchaseLimit}` : "Not Set"}
          </Text>
          <Text style={{ fontSize: 14, color: "gray" }}>
            Spent: LKR {totalSpent}
          </Text>

          <TouchableOpacity
            style={{
              backgroundColor: theme.colors.mainTurquoise,
              padding: 10,
              borderRadius: 10,
              marginTop: 10,
            }}
            onPress={() =>
              navigation.navigate("CategorizeExpenses", { token: token ?? "" })
            }
          >
            <Text style={{ color: theme.colors.white, textAlign: "center" }}>
              Set Purchase Limit
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  // Render purchase history
  const renderPurchaseHistory = () => {
    if (!Array.isArray(purchases)) {
      console.error("purchases is not an array:", purchases); // Debugging log
      return (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <Text style={{ ...theme.fonts.DMSans_500Medium, fontSize: 16 }}>
            Error: Purchases data is invalid.
          </Text>
        </View>
      );
    }

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
        <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}>
          Current Stock
        </Text>
        {purchases.length > 0 ? (
          purchases.map((purchase, index) => (
            <View
              key={index}
              style={{
                padding: 15,
                borderBottomWidth: 1,
                borderBottomColor: "#ddd",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>{purchase.name}</Text>
              <Text>Quantity: {purchase.quantity}</Text>
              <Text>Expiry Date: {purchase.expiryDate}</Text>
              {/* Auto-calculated total cost */}
              <Text style={{ marginTop: 5 }}>Total Cost: LKR </Text>
            </View>
          ))
        ) : (
          <Text>No items in stock.</Text>
        )}
      </ScrollView>
    );
  };

  // Render content
  const renderContent = () => {
    return (
      <ScrollView>
        {renderPurchaseLimit()}
        {renderPurchaseHistory()}
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

export default Purchase;
