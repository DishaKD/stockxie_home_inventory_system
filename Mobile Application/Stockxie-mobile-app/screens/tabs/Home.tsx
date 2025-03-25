import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { Ionicons } from "@expo/vector-icons";

import { useAppDispatch } from "../../hooks";
import { components } from "../../components";
import { useAppNavigation } from "../../hooks";
import { theme, reviews } from "../../constants";
import { setScreen } from "../../store/slices/tabSlice";
import BottomTabBar from "../../navigation/BottomTabBar";

const Home: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();

  const renderStatusBar = () => {
    return <components.StatusBar />;
  };

  const renderHeader = () => {
    return (
      <components.Header
        basket={true}
        user={true}
        userImage={true}
        userName={true}
      />
    );
  };

  const renderReviews = () => {
    const slice = reviews?.slice(0, 12);

    return (
      <View style={{ marginBottom: 20 }}>
        <components.BlockHeading
          title="Our Happy clients say"
          onPress={() => {
            navigation.navigate("Reviews");
          }}
          containerStyle={{ marginHorizontal: 20, marginBottom: 14 }}
        />
        <FlatList
          data={slice}
          horizontal={true}
          contentContainerStyle={{ paddingLeft: 20 }}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          pagingEnabled={true}
          snapToInterval={theme.sizes.width - 54}
          decelerationRate={0}
          renderItem={({ item, index }) => {
            const last = index === reviews.length - 1;
            return <components.ReviewItem item={item} last={last} />;
          }}
        />
      </View>
    );
  };

  const renderContent = () => {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#F8F9FC" }}>
        <StatusBar />
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 24, fontWeight: "bold", color: "#333" }}>
              Welcome, Anthony!
            </Text>
            <Ionicons name="notifications-outline" size={24} color="#555" />
          </View>
          <Text style={{ color: "#888", marginTop: 4 }}>Wed, 13 Apr 23</Text>

          {/* Inventory Summary */}
          <View
            style={{
              backgroundColor: "#6F5EF6",
              padding: 20,
              borderRadius: 12,
              marginTop: 20,
            }}
          >
            <Text style={{ color: "#FFF", fontSize: 16, fontWeight: "bold" }}>
              Inventory Summary
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <View>
                <Text style={{ color: "#FFF", fontSize: 14 }}>
                  Category Items
                </Text>
                <Text
                  style={{ color: "#FFF", fontSize: 18, fontWeight: "bold" }}
                >
                  24
                </Text>
              </View>
              <View>
                <Text style={{ color: "#FFF", fontSize: 14 }}>Folders</Text>
                <Text
                  style={{ color: "#FFF", fontSize: 18, fontWeight: "bold" }}
                >
                  15
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <View>
                <Text style={{ color: "#FFF", fontSize: 14 }}>Total Qty</Text>
                <Text
                  style={{ color: "#FFF", fontSize: 18, fontWeight: "bold" }}
                >
                  479 Items
                </Text>
              </View>
              <View>
                <Text style={{ color: "#FFF", fontSize: 14 }}>Total Value</Text>
                <Text
                  style={{ color: "#FFF", fontSize: 18, fontWeight: "bold" }}
                >
                  $1,067.50
                </Text>
              </View>
            </View>
          </View>

          {/* Feature Cards */}
          <View style={{ marginTop: 20 }}>
            {[
              {
                title: "Low Stock",
                desc: "All stock items that are low inventory",
                value: "18 Items",
              },
              {
                title: "Move Stock",
                desc: "Track inventory that has moved locations",
                value: "8 Orders",
              },
              {
                title: "Upcoming Expiry",
                desc: "Items in inventory are set to expire soon",
                value: "4 Items",
              },
              {
                title: "Qty Changes",
                desc: "All inflows and outflows for an item",
                value: "32 Items",
              },
            ].map((item, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: "#FFF",
                  padding: 15,
                  borderRadius: 12,
                  marginBottom: 10,
                  shadowColor: "#000",
                  shadowOpacity: 0.1,
                  shadowRadius: 5,
                  elevation: 3,
                }}
              >
                <Text
                  style={{ fontSize: 16, fontWeight: "bold", color: "#333" }}
                >
                  {item.title}
                </Text>
                <Text style={{ color: "#777", marginTop: 4 }}>{item.desc}</Text>
                <Text
                  style={{ color: "#6F5EF6", fontWeight: "bold", marginTop: 6 }}
                >
                  {item.value}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
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

export default Home;
