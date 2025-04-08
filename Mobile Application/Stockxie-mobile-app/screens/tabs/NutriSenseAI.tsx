import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { components } from "../../components";
import BottomTabBar from "../../navigation/BottomTabBar";
import axios from "axios";
import { BASE_URL, ENDPOINTS, CONFIG } from "../../config/index";

interface NutriSenseAIProps {
  token: string;
}

const NutriSenseAI: React.FC<NutriSenseAIProps> = ({ token }) => {
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch user's profile to get their name
    axios
      .get(`${BASE_URL}${ENDPOINTS.get.profile}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUserName(response.data.user.username);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        setIsLoading(false);
      });
  }, []);

  const renderStatusBar = () => {
    return <components.StatusBar />;
  };

  const renderHeader = () => {
    return <components.Header basket={true} user={true} userImage={true} />;
  };

  const renderWelcomeMessage = () => {
    return (
      <View style={{ paddingHorizontal: 20, marginTop: 20, marginBottom: 25 }}>
        <Text style={{ fontSize: 24, color: "#777", fontWeight: "500" }}>
          Hi {isLoading ? "..." : userName},
        </Text>
        <Text
          style={{
            fontSize: 20,
            color: "#4CAF50",
            fontWeight: "bold",
            marginTop: 5,
          }}
        >
          Your smart inventory assistant
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: "#666",
            marginTop: 8,
            lineHeight: 22,
          }}
        >
          NutriSenseAI tracks your food, suggests recipes, and helps reduce
          waste while promoting healthier eating habits.
        </Text>
      </View>
    );
  };

  const renderFunctionButtons = () => {
    const buttons = [
      {
        id: 1,
        icon: "scan",
        title: "Scan Items",
        subtitle: "Track your food inventory",
      },
      {
        id: 2,
        icon: "recipes",
        title: "Recipes",
        subtitle: "Based on your pantry",
      },
      {
        id: 3,
        icon: "health",
        title: "Health",
        subtitle: "Nutrition insights & tips",
      },
      {
        id: 4,
        icon: "shopping",
        title: "Shopping",
        subtitle: "Smart lists & reminders",
      },
    ];

    const renderIcon = (iconName: string) => {
      // Placeholder for icons - you should replace with actual icons
      switch (iconName) {
        case "scan":
          return (
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 5,
                borderWidth: 2,
                borderColor: "#4CAF50",
              }}
            />
          );
        case "recipes":
          return (
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 5,
                borderWidth: 2,
                borderColor: "#FF9800",
              }}
            />
          );
        case "health":
          return (
            <View
              style={{
                width: 28,
                height: 28,
                borderWidth: 2,
                borderColor: "#2196F3",
              }}
            />
          );
        case "shopping":
          return (
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 5,
                borderWidth: 2,
                borderColor: "#9C27B0",
              }}
            />
          );
        default:
          return null;
      }
    };

    return (
      <View style={{ paddingHorizontal: 20 }}>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {buttons.map((button) => (
            <TouchableOpacity
              key={button.id}
              style={{
                width: "48%",
                backgroundColor: "#F5F5F5",
                borderRadius: 20,
                padding: 20,
                marginBottom: 15,
              }}
            >
              {renderIcon(button.icon)}
              <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 15 }}>
                {button.title}
              </Text>
              <Text style={{ fontSize: 14, color: "#777", marginTop: 5 }}>
                {button.subtitle}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const renderExpirationAlerts = () => {
    return (
      <View style={{ paddingHorizontal: 20, marginTop: 15, marginBottom: 20 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 15,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Expiring Soon
          </Text>
          <TouchableOpacity>
            <Text style={{ color: "#4CAF50" }}>View All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginLeft: -5 }}
        >
          {[
            { id: 1, name: "Tomatoes", days: 2, image: "tomato" },
            { id: 2, name: "Milk", days: 1, image: "milk" },
            { id: 3, name: "Chicken", days: 3, image: "chicken" },
          ].map((item) => (
            <View
              key={item.id}
              style={{
                width: 110,
                backgroundColor: "#FFF",
                borderRadius: 15,
                marginRight: 12,
                padding: 12,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
                elevation: 2,
              }}
            >
              <View
                style={{
                  height: 70,
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 10,
                }}
              >
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    backgroundColor: "#F5F5F5",
                  }}
                />
              </View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {item.name}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: item.days <= 1 ? "#F44336" : "#FF9800",
                  textAlign: "center",
                  marginTop: 5,
                }}
              >
                {item.days} day{item.days > 1 ? "s" : ""} left
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

  const renderRecipeRecommendation = () => {
    return (
      <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 15 }}>
          Today's Recipe Suggestion
        </Text>

        <TouchableOpacity
          style={{
            backgroundColor: "#FFF",
            borderRadius: 20,
            padding: 15,
            flexDirection: "row",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 2,
          }}
        >
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 15,
              backgroundColor: "#F5F5F5",
              marginRight: 15,
            }}
          />
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 5 }}>
              Veggie Stir Fry
            </Text>
            <Text style={{ fontSize: 14, color: "#777", marginBottom: 8 }}>
              Uses 5 items from your pantry
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{ fontSize: 12, color: "#4CAF50", fontWeight: "bold" }}
              >
                Ready in 25 mins
              </Text>
              <View
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: 2,
                  backgroundColor: "#777",
                  marginHorizontal: 8,
                }}
              />
              <Text style={{ fontSize: 12, color: "#777" }}>350 cal</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderSearchBar = () => {
    return (
      <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#F5F5F5",
            borderRadius: 20,
            paddingHorizontal: 15,
            paddingVertical: 12,
          }}
        >
          <Text style={{ flex: 1, color: "#777" }}>
            Search food items, recipes...
          </Text>
          <TouchableOpacity>
            <View
              style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                backgroundColor: "#E0E0E0",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const renderBottomTabBar = () => {
    return <BottomTabBar />;
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      {renderStatusBar()}
      {renderHeader()}
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {renderWelcomeMessage()}
        {renderFunctionButtons()}
        {renderSearchBar()}
        {renderExpirationAlerts()}
        {renderRecipeRecommendation()}
      </ScrollView>
      {renderBottomTabBar()}
    </View>
  );
};

export default NutriSenseAI;
