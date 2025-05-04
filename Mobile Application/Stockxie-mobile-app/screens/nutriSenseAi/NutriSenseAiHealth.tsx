import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import Accordion from "react-native-collapsible/Accordion";
import { text } from "../../text";
import { svg } from "../../assets/svg";
import { theme } from "../../constants";
import { components } from "../../components";
import { useAppNavigation } from "../../hooks";
import { homeIndicatorHeight as getHomeIndicatorHeight } from "../../utils";
import { BASE_URL, ENDPOINTS, CONFIG } from "../../config/index";
import { showToast } from "../../components/ToastProvider";
import { FlatList } from "react-native";

interface NutriSenseAIHealthProps {
  route?: any;
}

const { width } = Dimensions.get("window");

interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

const NutriSenseAIHealth: React.FC<NutriSenseAIHealthProps> = ({ route }) => {
  const [activeSections, setActiveSections] = useState<number[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { token } = route.params;
  console.log("Token received Category:", token);

  useEffect(() => {
    fetchRecipes();
  }, []);
  const fetchRecipes = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/ai/recipes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRecipes(response.data);
    } catch (err) {
      console.error("Error fetching recipes:", err);
      setError("Failed to fetch recipes.");
      showToast("danger", "Failed to fetch recipes.");
    } finally {
      setLoading(false);
    }
  };

  const renderRecipeCard = ({ item }: { item: Recipe }) => (
    <TouchableOpacity
      style={{
        backgroundColor: theme.colors.white,
        borderRadius: 12,
        margin: 10,
        width: (width - 60) / 2,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      }}
    >
      <Image
        source={{ uri: item.imageUrl }}
        style={{
          width: "100%",
          height: 120,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
        resizeMode="cover"
      />
      <View style={{ padding: 10 }}>
        <Text
          numberOfLines={2}
          style={{
            ...theme.fonts.DMSans_500Medium,
            fontSize: 14,
            color: theme.colors.mainColor,
          }}
        >
          {item.title}
        </Text>
        <Text
          numberOfLines={3}
          style={{
            ...theme.fonts.DMSans_400Regular,
            fontSize: 12,
            color: theme.colors.bodyTextColor,
            marginTop: 4,
          }}
        >
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderContent = () => {
    if (loading) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={theme.colors.mainColor} />
        </View>
      );
    }

    if (error) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ color: "red" }}>{error}</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        renderItem={renderRecipeCard}
        numColumns={2}
        contentContainerStyle={{
          paddingHorizontal: 10,
          paddingBottom: 20,
        }}
      />
    );
  };

  const renderStatusBar = () => {
    return <components.StatusBar />;
  };

  const renderHeader = () => {
    return <components.Header goBack={true} title="Recipes" />;
  };

  const renderHomeIndicator = () => {
    return <components.HomeIndicator />;
  };

  return (
    <components.SmartView>
      <components.StatusBar />
      <components.Header goBack={true} title="NutriSense Recipes" />
      {renderContent()}
      <components.HomeIndicator />
    </components.SmartView>
  );
};

export default NutriSenseAIHealth;
