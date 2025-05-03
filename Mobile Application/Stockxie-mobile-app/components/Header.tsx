import { useRoute } from "@react-navigation/native";
import React, { PropsWithChildren, useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  ViewStyle,
  TextStyle,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import { responsiveWidth } from "react-native-responsive-dimensions";
import axios from "axios";

import { text } from "../text";
import { svg } from "../assets/svg";
import { theme } from "../constants";
import { components } from "../components";
import Image from "../components/custom/Image";
import { statusBarHeight, homeIndicatorHeight } from "../utils";
import { useAppNavigation, useAppSelector } from "../hooks";
import { BASE_URL, ENDPOINTS } from "../config";

type Props = PropsWithChildren<{
  skip?: boolean;
  title?: string;
  basket?: boolean;
  goBack?: boolean;
  filter?: boolean;
  search?: boolean;
  style?: ViewStyle;
  bottomLine?: boolean;
  burgerIcon?: boolean;
  user?: boolean;
  userName?: boolean;
  userImage?: boolean;
  token?: string;
  skipOnPress?: () => void;
}>;

const Header: React.FC<Props> = ({
  skip,
  userName,
  title,
  style,
  basket,
  search,
  goBack,
  filter,
  userImage,
  bottomLine,
  token,
  skipOnPress,
}) => {
  const navigation = useAppNavigation();
  const route = useRoute();

  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState(true);
  const [profileName, setProfileName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [userAvatar, setUserAvatar] = useState<string>(
    "https://george-fx.github.io/dine-hub/10.jpg"
  );

  useEffect(() => {
    if (token) {
      axios
        .get(`${BASE_URL}${ENDPOINTS.get.profile}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setProfileName(response.data.user.username);
          setEmail(response.data.user.email);
          if (response.data.user.avatar) {
            setUserAvatar(response.data.user.avatar);
          }
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
        });
    }
  }, [token]);

  const renderUser = (): JSX.Element | null => {
    if (!userImage) return null;

    return (
      <TouchableOpacity
        style={{
          position: "absolute",
          flexDirection: "row",
          alignItems: "center",
          left: 0,
          paddingVertical: 12,
          paddingHorizontal: 20,
        }}
        onPress={() => setShowModal(true)}
      >
        <components.Image
          source={{ uri: userAvatar }}
          style={{ width: 22, height: 22 }}
        />
        {userName && (
          <Text
            style={{
              marginLeft: 10,
              ...theme.fonts.H5,
              textTransform: "capitalize",
            }}
          >
            {profileName}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  const renderBurgerUser = (): JSX.Element => (
    <View
      style={{
        padding: 20,
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#DBE9F5",
        marginBottom: 20,
      }}
    >
      <Image
        source={{ uri: userAvatar }}
        style={{ width: responsiveWidth(14), aspectRatio: 1 }}
      />
      <View style={{ marginLeft: 14 }}>
        <Text
          style={{
            ...theme.fonts.DMSans_500Medium,
            fontSize: 14,
            lineHeight: 14 * 1.2,
            marginBottom: 4,
          }}
        >
          {profileName}
        </Text>
        <Text
          style={{ ...theme.fonts.textStyle_14, color: theme.colors.textColor }}
        >
          {email}
        </Text>
      </View>
    </View>
  );

  const renderCloseButton = (): JSX.Element => (
    <TouchableOpacity
      style={{
        position: "absolute",
        marginTop: statusBarHeight(),
        right: -responsiveWidth(11),
      }}
      onPress={() => setShowModal(false)}
    >
      <svg.CloseSvg />
    </TouchableOpacity>
  );

  const renderBurgerContent = (): JSX.Element => (
    <ScrollView style={{ flex: 1, paddingHorizontal: 20 }}>
      <components.BurgerProfileItem
        text={"Personal information"}
        onPress={() => {
          setShowModal(false);
          navigation.navigate("EditProfile", { token: token || "" });
        }}
      />
      <components.BurgerProfileItem
        text={"Notifications"}
        onPress={() => setNotification(!notification)}
        disabled={notification}
      />
      <components.BurgerProfileItem
        text={"Support center"}
        onPress={() => {}}
      />
      <components.BurgerProfileItem
        text={"Sign out"}
        onPress={() => {
          setShowModal(false);
          navigation.navigate("SignIn");
        }}
      />
    </ScrollView>
  );

  const renderBurgerProfile = (): JSX.Element => (
    <Modal
      isVisible={showModal}
      onBackdropPress={() => setShowModal(false)}
      hideModalContentWhileAnimating
      backdropTransitionOutTiming={0}
      style={{ margin: 0 }}
      animationIn="slideInLeft"
      animationOut="slideOutLeft"
      animationInTiming={500}
      animationOutTiming={500}
      deviceWidth={theme.sizes.width}
      deviceHeight={theme.sizes.height}
    >
      <View
        style={{
          width: responsiveWidth(74),
          height: theme.sizes.height,
          backgroundColor: theme.colors.white,
          paddingTop: statusBarHeight(),
          paddingBottom: homeIndicatorHeight(),
        }}
      >
        {renderBurgerUser()}
        {renderBurgerContent()}
        {renderCloseButton()}
      </View>
    </Modal>
  );

  const renderGoBack = (): JSX.Element | null => {
    if (!goBack || !navigation.canGoBack()) return null;
    return (
      <View style={{ position: "absolute", left: 0 }}>
        <TouchableOpacity
          style={{ paddingVertical: 12, paddingHorizontal: 20 }}
          onPress={() => navigation.goBack()}
        >
          <svg.GoBackSvg />
        </TouchableOpacity>
      </View>
    );
  };

  const renderSkipText = (): JSX.Element | null => {
    if (!skip) return null;
    return (
      <TouchableOpacity
        style={{
          right: 0,
          position: "absolute",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
        }}
        onPress={skipOnPress}
      >
        <Text style={{ fontSize: 14, lineHeight: 14 * 1.7 }}>Skip</Text>
      </TouchableOpacity>
    );
  };

  const renderTitle = (): JSX.Element | null => {
    if (!title) return null;
    return (
      <Text
        style={{
          ...theme.fonts.DMSans_400Regular,
          fontSize: 16,
          color: theme.colors.mainColor,
        }}
        numberOfLines={1}
      >
        {title}
      </Text>
    );
  };

  const renderSearch = (): JSX.Element | null => {
    if (!search) return null;
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: theme.sizes.width - 190,
          marginRight: 60,
        }}
        onPress={() => navigation.navigate("Search")}
      >
        <View style={{ marginRight: 7 }}>{/* <svg.SearchSvg /> */}</View>
        <text.T14>search</text.T14>
      </TouchableOpacity>
    );
  };

  const renderFilter = (): JSX.Element | null => {
    if (!filter) return null;
    return (
      <View style={{ position: "absolute", right: 0 }}>
        <TouchableOpacity
          style={{ paddingVertical: 12, paddingHorizontal: 20 }}
          onPress={() => navigation.navigate("Filter")}
        >
          {/* <svg.FilterSvg /> */}
        </TouchableOpacity>
      </View>
    );
  };

  const containerStyle: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 42,
    borderBottomColor: bottomLine ? "#DBE9F5" : "transparent",
    borderBottomWidth: bottomLine ? 1 : 0,
    ...style,
  };

  return (
    <View style={containerStyle}>
      {renderUser()}
      {renderGoBack()}
      {renderTitle()}
      {renderSkipText()}
      {renderFilter()}
      {renderSearch()}
      {renderBurgerProfile()}
    </View>
  );
};

export default Header;
