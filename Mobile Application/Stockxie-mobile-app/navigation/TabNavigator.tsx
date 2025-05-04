import React from "react";
import { screens } from "../app/screens";
import { useAppSelector } from "../hooks";
import type { RootStackParamList } from "../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "TabNavigator">;

const TabNavigator: React.FC<Props> = ({ route }): JSX.Element => {
  const userId = route?.params?.userId;
  const token = route?.params?.token;
  console.log("Token received:", token);

  const currentTabScreen = useAppSelector((state) => state.tab.screen);

  const renderScreen = () => {
    return (
      <React.Fragment>
        {currentTabScreen === "Home" && <screens.Home token={token} />}
        {currentTabScreen === "Purchase" && (
          <screens.Purchase token={token} userId={userId} />
        )}
        {currentTabScreen === "Notification" && <screens.Notification />}
        {currentTabScreen === "Inventory" && (
          <screens.Inventory userId={userId} token={token} />
        )}
        {currentTabScreen === "NutriSenseAI" && (
          <screens.NutriSenseAI token={token} userId={userId} />
        )}
      </React.Fragment>
    );
  };

  return renderScreen();
};

export default TabNavigator;
