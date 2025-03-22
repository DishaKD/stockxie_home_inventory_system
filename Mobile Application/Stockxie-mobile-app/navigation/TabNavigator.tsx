import React from "react";
import { screens } from "../app/screens";
import { useAppSelector } from "../hooks";

interface TabNavigatorProps {
  route?: any;
}

const TabNavigator: React.FC<TabNavigatorProps> = ({ route }): JSX.Element => {
  const userId = route?.params?.userId;
  console.log("User ID in TabNavigator:", userId);
  const currentTabScreen = useAppSelector((state) => state.tab.screen);

  const renderScreen = () => {
    return (
      <React.Fragment>
        {currentTabScreen === "Home" && <screens.Home />}
        {currentTabScreen === "Order" && <screens.Order />}
        {currentTabScreen === "Favorite" && <screens.Favorite />}
        {currentTabScreen === "Notification" && <screens.Notification />}
        {currentTabScreen === "Inventory" && (
          <screens.Inventory userId={userId} />
        )}
      </React.Fragment>
    );
  };

  return renderScreen();
};

export default TabNavigator;
