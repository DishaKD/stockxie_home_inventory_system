import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";

import { svg } from "../../assets/svg";
import { theme } from "../../constants";
import { components } from "../../components";
import BottomTabBar from "../../navigation/BottomTabBar";

const NutriSenseAI: React.FC = (): JSX.Element => {
  const renderStatusBar = () => {
    return <components.StatusBar />;
  };

  const renderHeader = () => {
    return (
      <components.Header
        title="NutriSenseAI"
        basket={true}
        user={true}
        userImage={true}
      />
    );
  };

  const renderContent = () => {
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
          paddingTop: 10,
          paddingBottom: 20,
        }}
        showsVerticalScrollIndicator={false}
      ></ScrollView>
    );
  };

  const renderBottomTabBar = () => {
    return <BottomTabBar />;
  };

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

export default NutriSenseAI;
