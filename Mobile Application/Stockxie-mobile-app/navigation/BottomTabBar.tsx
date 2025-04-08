import React from "react";
import Svg, { Path } from "react-native-svg";
import {
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from "react-native";

import { theme } from "../constants";
import { homeIndicatorHeight } from "../utils";
import { setScreen } from "../store/slices/tabSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

const BottomTabBar: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const currentTabScreen = useAppSelector((state) => state.tab.screen);

  const HomeSvg: React.FC = () => {
    return (
      <Svg width={24} height={24} fill="none">
        <Path
          fill={
            currentTabScreen === "Home"
              ? theme.colors.mainTurquoise
              : theme.colors.textColor
          }
          fillOpacity={0.15}
          d="M5.4 7.87 12 2.4l6.6 5.47V21H5.4V7.87Z"
        />
        <Path
          stroke={
            currentTabScreen === "Home"
              ? theme.colors.mainTurquoise
              : theme.colors.textColor
          }
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M5 21h14M5 21V8m14 13V8M2 10l10-8 10 8"
        />
      </Svg>
    );
  };

  const NutriSenseAIsvg: React.FC = () => {
    return (
      <Svg width={16} height={16} fill="none">
        <Path
          fill={
            currentTabScreen === "NutriSenseAI"
              ? theme.colors.mainTurquoise
              : theme.colors.textColor
          }
          fillOpacity={0.15}
          d="M 8 0 A 2 2 0 0 0 7 3.7304688 L 7 5 L 4 5 L 2 7 L 2 9 L 0 9 L 0 13 L 2 13 L 2 16 L 5 16 L 5 14 L 6 13 L 10 13 L 11 14 L 11 16 L 14 16 L 14 13 L 16 13 L 16 9 L 14 9 L 14 7 L 12 5 L 9 5 L 9 3.7304688 A 2 2 0 0 0 8 0 z M 5.5 8 C 6.328 8 7 8.672 7 9.5 C 7 10.328 6.328 11 5.5 11 C 4.672 11 4 10.328 4 9.5 C 4 8.672 4.672 8 5.5 8 z M 10.5 8 C 11.328 8 12 8.672 12 9.5 C 12 10.328 11.328 11 10.5 11 C 9.672 11 9 10.328 9 9.5 C 9 8.672 9.672 8 10.5 8 z"
        />
        <Path
          stroke={
            currentTabScreen === "NutriSenseAI"
              ? theme.colors.mainTurquoise
              : theme.colors.textColor
          }
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M 8 0 A 2 2 0 0 0 7 3.7304688 L 7 5 L 4 5 L 2 7 L 2 9 L 0 9 L 0 13 L 2 13 L 2 16 L 5 16 L 5 14 L 6 13 L 10 13 L 11 14 L 11 16 L 14 16 L 14 13 L 16 13 L 16 9 L 14 9 L 14 7 L 12 5 L 9 5 L 9 3.7304688 A 2 2 0 0 0 8 0 z M 5.5 8 C 6.328 8 7 8.672 7 9.5 C 7 10.328 6.328 11 5.5 11 C 4.672 11 4 10.328 4 9.5 C 4 8.672 4.672 8 5.5 8 z M 10.5 8 C 11.328 8 12 8.672 12 9.5 C 12 10.328 11.328 11 10.5 11 C 9.672 11 9 10.328 9 9.5 C 9 8.672 9.672 8 10.5 8 z"
        />
      </Svg>
    );
  };

  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="64"
    height="64"
    viewBox="0 0 16 16"
  >
    <path></path>
  </svg>;

  const InventorySvg: React.FC = () => {
    return (
      <Svg width={24} height={24} fill="none">
        <Path
          fill={
            currentTabScreen === "Inventory"
              ? theme.colors.mainTurquoise
              : theme.colors.textColor
          }
          fillOpacity={0.15}
          d="M5.1 9 3 10.5l1.5 8.7L6 21l12.9-.6 2.1-9-1.8-2.1L5.1 9Z"
        />
        <Path
          fill={
            currentTabScreen === "Inventory"
              ? theme.colors.mainTurquoise
              : theme.colors.textColor
          }
          d="M8.75 13a.75.75 0 1 0-1.5 0v4a.75.75 0 1 0 1.5 0v-4Zm7.25-.75a.75.75 0 0 1 .75.75v4a.75.75 0 1 1-1.5 0v-4a.75.75 0 0 1 .75-.75Zm-3.25.75a.75.75 0 1 0-1.5 0v4a.75.75 0 1 0 1.5 0v-4Z"
        />
        <Path
          fill={
            currentTabScreen === "Purchase"
              ? theme.colors.mainTurquoise
              : theme.colors.textColor
          }
          fillRule="evenodd"
          d="M17.274 3.473c-.476-.186-1.009-.217-1.692-.222A1.75 1.75 0 0 0 14 2.25h-4a1.75 1.75 0 0 0-1.582 1c-.684.006-1.216.037-1.692.223A3.25 3.25 0 0 0 5.3 4.563c-.367.493-.54 1.127-.776 1.998l-.628 2.303a2.98 2.98 0 0 0-1.01.828c-.622.797-.732 1.746-.621 2.834.107 1.056.44 2.386.856 4.05l.026.107c.264 1.052.477 1.907.731 2.574.265.696.602 1.266 1.156 1.699.555.433 1.19.62 1.929.71.708.084 1.59.084 2.675.084h4.724c1.085 0 1.966 0 2.675-.085.74-.088 1.374-.276 1.928-.71.555-.432.891-1.002 1.156-1.698.255-.667.468-1.522.731-2.575l.027-.105c.416-1.665.748-2.995.856-4.05.11-1.09 0-2.038-.622-2.835a2.98 2.98 0 0 0-1.009-.828l-.628-2.303c-.237-.871-.41-1.505-.776-1.999a3.25 3.25 0 0 0-1.426-1.089ZM7.272 4.87c.22-.086.486-.111 1.147-.118.282.59.884.998 1.58.998h4c.698 0 1.3-.408 1.582-.998.661.007.927.032 1.147.118.306.12.572.323.768.587.176.237.279.568.57 1.635l.354 1.297c-1.038-.139-2.378-.139-4.043-.139H9.622c-1.664 0-3.004 0-4.042.139l.354-1.297c.29-1.067.394-1.398.57-1.635a1.75 1.75 0 0 1 .768-.587ZM10 3.75a.25.25 0 0 0 0 .5h4a.25.25 0 0 0 0-.5h-4Zm-5.931 6.865c.279-.357.72-.597 1.63-.729.931-.134 2.193-.136 3.986-.136h4.63c1.793 0 3.054.002 3.985.136.911.132 1.352.372 1.631.73.279.357.405.842.311 1.758-.095.936-.399 2.16-.834 3.9-.277 1.108-.47 1.876-.688 2.45-.212.554-.419.847-.678 1.05-.259.202-.594.331-1.183.402-.61.073-1.4.074-2.544.074h-4.63c-1.144 0-1.935-.001-2.544-.074-.59-.07-.924-.2-1.183-.402-.26-.203-.467-.496-.678-1.05-.218-.574-.411-1.342-.689-2.45-.434-1.74-.739-2.964-.834-3.9-.093-.916.033-1.402.312-1.759Z"
          clipRule="evenodd"
        />
      </Svg>
    );
  };

  const PurchaseSvg: React.FC = () => {
    return (
      <Svg width={24} height={24} fill="none">
        <Path
          fill={
            currentTabScreen === "Purchase"
              ? theme.colors.mainTurquoise
              : theme.colors.textColor
          }
          fillOpacity={0.15}
          d="M4 1L7 0 11 1 11 3 5 3zM11 5H5c0 0-4 1.427-4 6.715C1 13.88 2 16 2 16h12c0 0 1-2.12 1-4.285C15 7.42 11 5 11 5zM10 9H8.333L9.8 11.64c.131.236.2.501.2.771v0C10 13.289 9.289 14 8.412 14H6v-2h1.667L6.2 9.36C6.069 9.124 6 8.858 6 8.588v0C6 7.711 6.711 7 7.588 7H10V9z"
        />
        <Path
          fill={
            currentTabScreen === "Purchase"
              ? theme.colors.mainTurquoise
              : theme.colors.textColor
          }
          d="M4 1L7 0 11 1 11 3 5 3zM11 5H5c0 0-4 1.427-4 6.715C1 13.88 2 16 2 16h12c0 0 1-2.12 1-4.285C15 7.42 11 5 11 5zM10 9H8.333L9.8 11.64c.131.236.2.501.2.771v0C10 13.289 9.289 14 8.412 14H6v-2h1.667L6.2 9.36C6.069 9.124 6 8.858 6 8.588v0C6 7.711 6.711 7 7.588 7H10V9z"
        />
        <Path
          fill={
            currentTabScreen === "Purchase"
              ? theme.colors.mainTurquoise
              : theme.colors.textColor
          }
          fillRule="evenodd"
          d="M4 1L7 0 11 1 11 3 5 3zM11 5H5c0 0-4 1.427-4 6.715C1 13.88 2 16 2 16h12c0 0 1-2.12 1-4.285C15 7.42 11 5 11 5zM10 9H8.333L9.8 11.64c.131.236.2.501.2.771v0C10 13.289 9.289 14 8.412 14H6v-2h1.667L6.2 9.36C6.069 9.124 6 8.858 6 8.588v0C6 7.711 6.711 7 7.588 7H10V9z"
          clipRule="evenodd"
        />
      </Svg>
    );
  };

  const NotificationSvg: React.FC = () => {
    return (
      <Svg width={24} height={24} fill="none">
        <Path
          fill={
            currentTabScreen === "Notification"
              ? theme.colors.mainTurquoise
              : theme.colors.textColor
          }
          fillOpacity={0.15}
          d="M19.5 18h-15a.75.75 0 0 1-.645-1.125c.618-1.069 1.395-3.018 1.395-6.375a6.75 6.75 0 1 1 13.5 0c0 3.358.778 5.306 1.397 6.375A.75.75 0 0 1 19.5 18Z"
        />
        <Path
          fill={
            currentTabScreen === "Notification"
              ? theme.colors.mainTurquoise
              : theme.colors.textColor
          }
          d="M21 6.666a.75.75 0 0 1-1.01-.321 8.825 8.825 0 0 0-3.137-3.46.751.751 0 0 1 .8-1.27 10.449 10.449 0 0 1 3.668 4.04.75.75 0 0 1-.321 1.01ZM3.348 6.75a.75.75 0 0 0 .665-.405 8.825 8.825 0 0 1 3.137-3.46.75.75 0 1 0-.8-1.27 10.45 10.45 0 0 0-3.668 4.04.75.75 0 0 0 .666 1.095Zm17.447 9.744A1.5 1.5 0 0 1 19.5 18.75h-3.825a3.75 3.75 0 0 1-7.35 0H4.5a1.5 1.5 0 0 1-1.293-2.256C4.052 15.037 4.5 12.964 4.5 10.5a7.5 7.5 0 1 1 15 0c0 2.463.448 4.536 1.295 5.994ZM14.12 18.75H9.879a2.25 2.25 0 0 0 4.242 0Zm5.379-1.5c-.997-1.713-1.5-3.983-1.5-6.75a6 6 0 1 0-12 0c0 2.767-.504 5.038-1.5 6.75h15Z"
        />
      </Svg>
    );
  };

  const tabs = [
    {
      id: 1,
      name: "Home",
      icon: HomeSvg,
    },
    {
      id: 2,
      name: "NutriSenseAI",
      icon: NutriSenseAIsvg,
    },
    {
      id: 3,
      name: "Inventory",
      icon: InventorySvg,
    },
    {
      id: 4,
      name: "Purchase",
      icon: PurchaseSvg,
    },

    {
      id: 5,
      name: "Notification",
      icon: NotificationSvg,
    },
  ];

  const containerStyle: ViewStyle = {
    backgroundColor: theme.colors.white,
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 15,
    paddingTop: 15,
    paddingBottom: 12,
    borderRadius: 10,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: homeIndicatorHeight() === 0 ? 20 : 10,
  };

  const textStyle: TextStyle = {
    ...theme.fonts.DMSans_400Regular,
    fontSize: 12,
    lineHeight: 12 * 1.7,
    marginTop: 3,
  };

  return (
    <View style={{ ...containerStyle }}>
      {tabs.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={{ alignItems: "center" }}
            onPress={() => dispatch(setScreen(item.name))}
          >
            <item.icon />
            <Text
              style={{
                ...textStyle,
                color:
                  currentTabScreen === item.name
                    ? theme.colors.mainTurquoise
                    : theme.colors.textColor,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomTabBar;
