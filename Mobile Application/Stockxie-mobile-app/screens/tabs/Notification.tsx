import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";

import { svg } from "../../assets/svg";
import { theme } from "../../constants";
import { components } from "../../components";
import BottomTabBar from "../../navigation/BottomTabBar";

const notifications = [
  {
    id: 1,
    title: "Low Stock Alert",
    description:
      'Your stock of "Toilet Paper" is running low. Only 2 items left. Consider restocking soon.',
    date: "Feb 26 at 12:36 pm",
    icon: svg.CheckSvg, // Assuming an alert icon exists
    status: "alert",
  },
  {
    id: 2,
    title: "Expiry Reminder",
    description:
      'The item "Milk" in your inventory is expiring tomorrow. Use it soon or discard it.',
    date: "Feb 26 at 12:36 pm",
    icon: svg.CheckSvg, // Assuming a clock icon for expiry reminders
    status: "warning",
  },
  {
    id: 3,
    title: "Item Added Successfully",
    description:
      'You have successfully added "Laundry Detergent" to your inventory.',
    date: "Feb 26 at 12:36 pm",
    icon: svg.CheckSvg,
    status: "success",
  },
  {
    id: 4,
    title: "Restock Suggestion",
    description:
      'It’s time to restock "Dish Soap". You last purchased it 30 days ago.',
    date: "Feb 26 at 12:36 pm",
    icon: svg.CartSvg, // Assuming a shopping cart icon
  },
  {
    id: 5,
    title: "Inventory Summary",
    description:
      "Your inventory summary for this month: 15 items added, 10 items used, and 5 items expired.",
    date: "Feb 26 at 12:36 pm",
    icon: svg.CheckSvg, // Assuming a report icon for summaries
  },
];

const Notification: React.FC = (): JSX.Element => {
  const renderStatusBar = () => {
    return <components.StatusBar />;
  };

  const renderHeader = () => {
    return (
      <components.Header
        title="Notifications"
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
      >
        {notifications.map((item, index, array) => {
          const last = array.length - 1 === index;
          return (
            <TouchableOpacity
              key={index}
              style={{
                width: "100%",
                backgroundColor: theme.colors.white,
                borderRadius: 10,
                padding: 20,
                marginBottom: last ? 0 : 14,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 14,
                }}
              >
                <View style={{ marginRight: 8 }}>
                  <item.icon />
                </View>
                <Text
                  style={{
                    ...theme.fonts.DMSans_500Medium,
                    fontSize: 14,
                    lineHeight: 14 * 1.2,
                    color: theme.colors.mainColor,
                    textTransform: "capitalize",
                  }}
                >
                  {item.title}
                </Text>
              </View>
              <Text
                style={{
                  ...theme.fonts.DMSans_400Regular,
                  fontSize: 14,
                  lineHeight: 14 * 1.5,
                  color: theme.colors.textColor,
                  marginBottom: 14,
                }}
              >
                {item.description}
              </Text>
              <Text
                style={{
                  ...theme.fonts.DMSans_400Regular,
                  fontSize: 12,
                  lineHeight: 12 * 1.5,
                  color: theme.colors.textColor,
                }}
              >
                {item.date}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
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

export default Notification;
