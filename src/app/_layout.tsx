import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import React from "react";
import CartProvider from "@/providers/CartProvider";
import { StatusBar } from "react-native";
import AuthProvider from "@/providers/AuthProvider";
import QueryProvider from "@/providers/QueryProvider";

const RootLayout = () => {
  return (
    <AuthProvider>
      <QueryProvider>
        <CartProvider>
          <Stack screenOptions={{ headerTitleAlign: "center" }}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(admin)" options={{ headerShown: false }} />
            <Stack.Screen name="(user)" options={{ headerShown: false }} />
            <Stack.Screen name="cart" options={{ presentation: "modal" }} />
          </Stack>
          <Toast />
          <StatusBar barStyle="dark-content" />
        </CartProvider>
      </QueryProvider>
    </AuthProvider>
  );
};

export default RootLayout;
