import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        animation: "fade",
        tabBarActiveTintColor: "#f4fcfa",
        tabBarInactiveTintColor: "#5d605f",
        tabBarLabelStyle: {
          fontWeight: "bold",
        },
        headerShown: false,
        headerTitleAlign: "center",
        tabBarStyle: {
          backgroundColor: "#13aeeb",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="menu"
        options={{
          headerShown: false,
          title: "Menu",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "Orders",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="angellist" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
