import { View, Text, Pressable } from "react-native";
import React from "react";
import { Link, Stack } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
// import useColorScheme }from "@/components/useColorScheme.web";

const _layout = () => {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        animation: "fade",
        headerStyle: {
          backgroundColor: Colors.light.tint,
        },
      }}
    >
      <Stack.Screen name="index" options={{}} />
    </Stack>
  );
};

export default _layout;
