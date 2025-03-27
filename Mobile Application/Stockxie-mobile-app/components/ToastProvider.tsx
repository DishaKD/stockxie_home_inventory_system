import React from "react";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { View, StyleSheet } from "react-native";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";

export const showToast = (
  type: "success" | "warning" | "danger" | "default",
  message: string
) => {
  showMessage({
    message: message,
    type: type,
    icon: type,
    position: "top",
    animated: true,
    animationDuration: 500,
    floating: true,
    style: styles.toastContainer, // Custom shape
    titleStyle: styles.toastMessage, // Message styling
  });
};

const ToastProvider = () => {
  return (
    <Animated.View entering={FadeInDown} exiting={FadeOutUp}>
      <FlashMessage position="top" />
    </Animated.View>
  );
};

// 🎨 Custom Styles for Small Pill-Shaped Toast
const styles = StyleSheet.create({
  toastContainer: {
    borderRadius: 30, // Fully rounded edges
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 20,
    minHeight: 40,
    flexDirection: "row", // Icon + message inline
    alignItems: "center",
    justifyContent: "center",
    elevation: 5, // Shadow for Android
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  toastMessage: {
    fontSize: 14,
    fontWeight: "500",
    color: "#fff",
    textAlign: "center",
  },
});

export default ToastProvider;
