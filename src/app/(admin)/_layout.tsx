import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Redirect, Tabs } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return <Redirect href={"/"} />;
  }

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
        name="menu"
        options={{
          headerShown: false,
          title: "Menu",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="angellist" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
