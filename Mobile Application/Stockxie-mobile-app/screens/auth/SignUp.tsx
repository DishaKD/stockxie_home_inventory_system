import React, { useState, useRef } from "react";
import { View, ViewStyle, TextInput, Text } from "react-native";
import axios from "axios";

import { text } from "../../text";
import { svg } from "../../assets/svg";
import { theme } from "../../constants";
import { components } from "../../components";
import { useAppNavigation } from "../../hooks";
import { homeIndicatorHeight } from "../../utils";
import { BASE_URL, ENDPOINTS, CONFIG } from "../../config/index";
import { showToast } from "../../components/ToastProvider";

const SignUp: React.FC = (): JSX.Element => {
  const navigation = useAppNavigation();

  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const inp1Ref = useRef<TextInput>({ focus: () => {} } as TextInput);
  const inp2Ref = useRef<TextInput>({ focus: () => {} } as TextInput);
  const inp3Ref = useRef<TextInput>({ focus: () => {} } as TextInput);
  const inp4Ref = useRef<TextInput>({ focus: () => {} } as TextInput);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const renderStatusBar = () => {
    return <components.StatusBar />;
  };

  const renderHeader = () => {
    return <components.Header goBack={true} />;
  };

  const renderMainText = () => {
    return <text.H1 style={{ marginBottom: 30 }}>Sign up</text.H1>;
  };

  const validateInputs = (): boolean => {
    let errors: { [key: string]: string } = {};

    if (!userName.trim()) {
      errors["userName"] = "Username is required.";
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      errors["email"] = "Enter a valid email address.";
    }
    if (password.length < 6) {
      errors["password"] = "Password must be at least 6 characters.";
    }
    if (password !== confirmPassword) {
      errors["confirmPassword"] = "Passwords do not match.";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return false;
    }

    setFieldErrors({});
    return true;
  };

  const handleSignUp = async () => {
    if (!validateInputs()) return; // Prevent API call if validation fails

    setLoading(true);

    try {
      const response = await axios.post(
        `${BASE_URL}${ENDPOINTS.auth.register}`,
        {
          username: userName,
          email: email,
          password: password,
        }
      );

      if (response.data.message === "User registered successfully") {
        // Registration successful, navigate to verification screen
        showToast("success", "Sign up Successful");

        navigation.navigate("SignUpaccountCreated");
      } else {
        showToast("danger", "Sign up Failed");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showToast("danger", "Something went wrong.");

        setError(error.response?.data?.message || "Something went wrong.");
      } else {
        showToast("danger", "Something went wrong.");
        setError("Something went wrong.");
      }
    }

    setLoading(false);
  };

  const renderInputFields = () => {
    return (
      <React.Fragment>
        <components.InputField
          type="username"
          innerRef={inp1Ref}
          value={userName}
          placeholder="Jordan Hebert"
          containerStyle={{ marginBottom: 14 }}
          onChangeText={(text) => setUserName(text)}
        />
        {fieldErrors.userName && (
          <Text style={{ color: "red", fontSize: 12 }}>
            {fieldErrors.userName}
          </Text>
        )}

        <components.InputField
          type="email"
          value={email}
          checkIcon={true}
          innerRef={inp2Ref}
          placeholder="jordanhebert@mail.com"
          containerStyle={{ marginBottom: 14 }}
          onChangeText={(text) => setEmail(text)}
        />
        {fieldErrors.email && (
          <Text style={{ color: "red", fontSize: 12 }}>
            {fieldErrors.email}
          </Text>
        )}

        <components.InputField
          type="password"
          value={password}
          eyeOffIcon={true}
          innerRef={inp3Ref}
          placeholder="••••••••"
          secureTextEntry={true}
          containerStyle={{ marginBottom: 14 }}
          onChangeText={(text) => setPassword(text)}
        />
        {fieldErrors.password && (
          <Text style={{ color: "red", fontSize: 12 }}>
            {fieldErrors.password}
          </Text>
        )}

        <components.InputField
          type="password"
          eyeOffIcon={true}
          innerRef={inp4Ref}
          value={confirmPassword}
          placeholder="••••••••"
          secureTextEntry={true}
          containerStyle={{ marginBottom: 14 }}
          onChangeText={(text) => setConfirmPassword(text)}
        />
        {fieldErrors.confirmPassword && (
          <Text style={{ color: "red", fontSize: 12 }}>
            {fieldErrors.confirmPassword}
          </Text>
        )}
      </React.Fragment>
    );
  };

  const renderButton = () => {
    return (
      <components.Button
        title="Sign up"
        containerStyle={{ marginBottom: 20 }}
        onPress={handleSignUp}
      />
    );
  };

  const renderAlreadyHaveAccount = () => {
    return (
      <components.ParsedText
        parse={[
          {
            pattern: /Sign in./,
            style: { color: theme.colors.mainTurquoise },
            onPress: () => navigation.replace("SignIn"),
          },
        ]}
      >
        Already have an account? Sign in.
      </components.ParsedText>
    );
  };

  const renderContent = () => {
    const styles: ViewStyle = {
      flexGrow: 1,
      backgroundColor: theme.colors.white,
      paddingHorizontal: 20,
      marginHorizontal: 20,
      borderTopEndRadius: 10,
      borderTopStartRadius: 10,
      justifyContent: "center",
      marginTop: 10,
    };

    return (
      <components.KAScrollView contentContainerStyle={{ ...styles }}>
        {renderMainText()}
        {renderInputFields()}
        {renderButton()}
        {renderAlreadyHaveAccount()}
      </components.KAScrollView>
    );
  };

  const renderFooter = () => {
    const styles: ViewStyle = {
      backgroundColor: theme.colors.white,
      width: "48%",
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
    };

    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 20,
          justifyContent: "space-between",
          marginTop: 10,
          marginBottom: homeIndicatorHeight() === 0 ? 20 : 10,
        }}
      >
        <View style={{ ...styles }}>
          <svg.FacebookSvg />
        </View>
        <View style={{ ...styles }}>
          <svg.GoogleSvg />
        </View>
      </View>
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
      {renderFooter()}
      {renderHomeIndicator()}
    </components.SmartView>
  );
};

export default SignUp;
