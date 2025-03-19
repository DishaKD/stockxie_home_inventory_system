import React from "react";
import { Provider } from "react-redux";
import { components } from "../components";
import { persistor, store } from "../store/store";
import FlashMessage from "react-native-flash-message";
import { PersistGate } from "redux-persist/integration/react";
import StackNavigator from "../navigation/StackNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-gesture-handler";

import { GestureHandlerRootView } from "react-native-gesture-handler";

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate loading={<components.Loader />} persistor={persistor}>
            <StackNavigator />
          </PersistGate>
        </Provider>
        <FlashMessage position="top" />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
