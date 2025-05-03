import axios from "axios";
import { View, TextInput, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useRef } from "react";

import { svg } from "../assets/svg";
import { theme } from "../constants";
import { showMessage } from "../utils";
import { components } from "../components";
import { useAppNavigation } from "../hooks";
import { validation } from "../utils/validation";
import { setUser } from "../store/slices/userSlice";
import { BASE_URL, ENDPOINTS, CONFIG } from "../config";
import { useAppSelector, useAppDispatch } from "../hooks";
import { useRoute } from "@react-navigation/native";

const EditProfile: React.FC = (): JSX.Element => {
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const data = { email, userName, country };

  const inp1Ref = useRef<TextInput>({ focus: () => {} } as TextInput);
  const inp2Ref = useRef<TextInput>({ focus: () => {} } as TextInput);
  const inp3Ref = useRef<TextInput>({ focus: () => {} } as TextInput);
  const inp4Ref = useRef<TextInput>({ focus: () => {} } as TextInput);

  const route = useRoute();
  const { token } = route.params as { token: string };

  console.log("Token from route params:", token);

  useEffect(() => {
    if (token) {
      axios
        .get(`${BASE_URL}${ENDPOINTS.get.profile}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const userData = response.data.user;
          setEmail(userData.email || "");
          setUserName(userData.username || "");
          setPhone(userData.phone || "");
          setCountry(userData.country || "");
          // Optional: Update global state
          dispatch(setUser(userData));
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
          showMessage("Failed to load profile info");
        });
    }
  }, [token]);

  const renderStatusBar = () => {
    return <components.StatusBar />;
  };

  const renderHeader = () => {
    return <components.Header goBack={true} title="Edit profile" />;
  };

  const renderUserImage = () => {
    return (
      <TouchableOpacity
        style={{
          width: 100,
          height: 100,
          alignSelf: "center",
          marginBottom: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <components.Image
          source={{
            uri: "https://george-fx.github.io/dine-hub/10.jpg",
          }}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: 50,
          }}
        />
        <View
          style={{
            backgroundColor: theme.colors.mainColor,
            position: "absolute",
            bottom: 0,
            right: 0,
            left: 0,
            top: 0,
            borderRadius: 50,
            opacity: 0.3,
          }}
        />
        <svg.CameraSvg />
      </TouchableOpacity>
    );
  };

  const renderInputFields = () => {
    return (
      <React.Fragment>
        <components.InputField
          value={userName}
          innerRef={inp1Ref}
          placeholder="Jordan Hebert"
          onChangeText={(text) => setUserName(text)}
          type="username"
          containerStyle={{ marginBottom: 14 }}
        />
        <components.InputField
          value={email}
          innerRef={inp2Ref}
          placeholder="jordanhebert@mail.com"
          onChangeText={(text) => setEmail(text)}
          type="email"
          checkIcon={true}
          containerStyle={{ marginBottom: 14 }}
        />
      </React.Fragment>
    );
  };

  const renderButton = () => {
    return (
      <View>
        <components.Button
          title="save changes"
          loading={loading}
          onPress={() => {
            navigation.goBack();
          }}
          containerStyle={{ marginBottom: 14 }}
        />
      </View>
    );
  };

  const renderContent = () => {
    const contentContainerStyle = {
      backgroundColor: theme.colors.white,
      marginHorizontal: 20,
      paddingBottom: 30,
      paddingTop: 50,
      paddingHorizontal: 20,
      borderRadius: 10,
      marginTop: 10,
      flexGrow: 0,
    };

    return (
      <components.KAScrollView
        contentContainerStyle={{ ...contentContainerStyle }}
      >
        {renderUserImage()}
        {renderInputFields()}
        {renderButton()}
      </components.KAScrollView>
    );
  };

  const renderHomeIndicator = () => {
    return <components.HomeIndicator />;
  };

  return (
    <components.SmartView>
      {renderStatusBar()}
      {renderHeader()}
      {renderContent()}
      {renderHomeIndicator()}
    </components.SmartView>
  );
};

export default EditProfile;
