import React, { useState, useRef } from "react";
import { View, FlatList } from "react-native";
import {
  responsiveWidth,
  responsiveHeight,
} from "react-native-responsive-dimensions";

import { text } from "../text";
import { components } from "../components";
import { useAppNavigation } from "../hooks";
import { homeIndicatorHeight } from "../utils";
import { theme } from "../constants";

const onboardingData = [
  {
    id: 1,
    title: "Track Your Home\nInventory",
    description: "Easily manage and track your home inventory with Stoxie.",
    image: "https://george-fx.github.io/dine-hub/01.jpg",
  },
  {
    id: 2,
    title: "Organize Your\nPantry",
    description: "Sort and categorize your items for better organization.",
    image: "https://george-fx.github.io/dine-hub/02.jpg",
  },
  {
    id: 3,
    title: "Smart Shopping\nMade Easy",
    description: "Get smart shopping lists and restocking suggestions.",
    image: "https://george-fx.github.io/dine-hub/03.jpg",
  },
];

const Onboarding: React.FC = (): JSX.Element => {
  const navigation = useAppNavigation();

  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const flatListRef = useRef<FlatList>(null);

  const updateCurrentSlideIndex = (e: any) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / theme.sizes.width);
    setCurrentSlideIndex(currentIndex);
  };

  const renderStatusBar = () => {
    return <components.StatusBar containerStyle={{ marginBottom: 10 }} />;
  };

  const renderImage = () => {
    return (
      <FlatList
        data={onboardingData}
        ref={flatListRef}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        keyExtractor={(item, index) => index.toString()}
        style={{ flexGrow: 0 }}
        renderItem={({ item }) => {
          const width = responsiveWidth(100);
          const height = responsiveHeight(43);
          return (
            <View style={{ width, height }}>
              <components.Image
                source={{ uri: item.image }}
                style={{
                  width: width - 40,
                  height: height,
                  alignSelf: "center",
                }}
                resizeMode="contain"
              />
            </View>
          );
        }}
      />
    );
  };

  const renderIndicator = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignSelf: "center",
          alignItems: "center",
          marginTop: 20,
          marginBottom: 30,
        }}
      >
        {onboardingData.map((_, index) => {
          return (
            <View
              key={index}
              style={{
                width: 8,
                height: currentSlideIndex === index ? 20 : 8,
                borderRadius: 4,
                marginHorizontal: 4,
                backgroundColor: theme.colors.mainTurquoise,
                opacity: currentSlideIndex === index ? 1 : 0.3,
              }}
            />
          );
        })}
      </View>
    );
  };

  const renderDetails = () => {
    return (
      <View
        style={{
          backgroundColor: theme.colors.white,
          flex: 1,
          marginHorizontal: 20,
          marginBottom: 20,
          borderRadius: 10,
          justifyContent: "center",
        }}
      >
        {onboardingData.map((item, index) => {
          if (currentSlideIndex === index) {
            return (
              <View
                key={index}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginHorizontal: 20,
                }}
              >
                <text.H1 style={{ textAlign: "center", marginBottom: 20 }}>
                  {item.title}
                </text.H1>
                <text.T16 style={{ textAlign: "center" }}>
                  {item.description}
                </text.T16>
              </View>
            );
          }
        })}
      </View>
    );
  };

  const renderButton = () => {
    return (
      <components.Button
        title="Start Organizing"
        containerStyle={{
          marginHorizontal: 20,
          marginBottom: homeIndicatorHeight() === 0 ? 20 : 10,
        }}
        onPress={() => {
          navigation.navigate("SignIn");
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
      {renderImage()}
      {renderIndicator()}
      {renderDetails()}
      {renderButton()}
      {renderHomeIndicator()}
    </components.SmartView>
  );
};

export default Onboarding;
