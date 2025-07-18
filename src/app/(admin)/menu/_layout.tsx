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
      <Stack.Screen
        name="index"
        options={{
          title: "Menu",
          headerRight: () => (
            <Link href="/(admin)/menu/create" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="plus-circle"
                    size={23}
                    color={"#ffffff"}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
    </Stack>
  );
};

export default _layout;
