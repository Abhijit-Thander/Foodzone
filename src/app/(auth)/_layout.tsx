import { View, Text } from "react-native";
import React from "react";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";

export default function _layout() {
  const { session } = useAuth();

  if (session) return <Redirect href={"/(user)/menu"} />;
  return (
    <Stack
      screenOptions={{
        animation: "fade",
        headerTitleAlign: "center",
        headerShown: false,
      }}
    />
  );
}
