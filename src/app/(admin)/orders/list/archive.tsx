import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import OrdersListItem from "@/components/OrdersListItem";
import { useAdminOrderList } from "@/api/orders";

const archive = () => {
  const {
    data: orders,
    isLoading,
    error,
  } = useAdminOrderList({ archived: true });
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }
  return (
    <View style={{ padding: 10 }}>
      <FlatList
        contentContainerStyle={{
          gap: 10,
          paddingVertical: 8,
        }}
        data={orders}
        renderItem={({ item }) => <OrdersListItem order={item} />}
      />
    </View>
  );
};

export default archive;

const styles = StyleSheet.create({});
