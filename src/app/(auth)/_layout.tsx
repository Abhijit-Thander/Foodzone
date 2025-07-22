import { View, Text } from "react-native";
import React from "react";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";

export default function _layout() {
  const { session } = useAuth();

  if (session) return <Redirect href={"/"} />;
  return (
    <Stack screenOptions={{ animation: "fade", headerTitleAlign: "center" }} />
  );
}
