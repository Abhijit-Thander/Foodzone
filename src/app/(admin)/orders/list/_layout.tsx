import React from "react";
import { withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";

const TopTab = withLayoutContext(createMaterialTopTabNavigator().Navigator);
const _layout = () => {
  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: "white" }}>
      <TopTab>
        <TopTab.Screen name="index" options={{ title: "Active 🟢" }} />
        <TopTab.Screen name="archive" options={{ title: "Archive" }} />
      </TopTab>
      <StatusBar barStyle="dark-content" />
    </SafeAreaView>
  );
};

export default _layout;
