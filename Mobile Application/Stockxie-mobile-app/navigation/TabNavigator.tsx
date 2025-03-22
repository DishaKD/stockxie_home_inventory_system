import React from "react";

// import {tabs} from '../constants';
import { screens } from "../app/screens";
import { useAppSelector } from "../hooks";

const TabNavigator: React.FC = (): JSX.Element => {
  const currentTabScreen = useAppSelector((state) => state.tab.screen);

  const renderScreen = () => {
    return (
      <React.Fragment>
        {currentTabScreen === "Home" && <screens.Home />}
        {currentTabScreen === "Order" && <screens.Order />}
        {currentTabScreen === "Favorite" && <screens.Favorite />}
        {currentTabScreen === "Notification" && <screens.Notification />}
        {currentTabScreen === "Inventory" && <screens.Inventory />}
      </React.Fragment>
    );
  };

  return renderScreen();
};

export default TabNavigator;
