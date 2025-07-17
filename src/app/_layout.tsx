import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import React from "react";
import CartProvider from "@/providers/CartProvider";

const RootLayout = () => {
  return (
    <CartProvider>
      <Stack screenOptions={{ headerTitleAlign: "center" }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="cart" options={{ presentation: "modal" }} />
      </Stack>
      <Toast />
    </CartProvider>
  );
};

export default RootLayout;
