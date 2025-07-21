import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import Colors from "@/constants/Colors";

const OrdersLayout = () => {
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
      <Stack.Screen name="index" options={{ title: "Orders" }} />
    </Stack>
  );
};

export default OrdersLayout;
