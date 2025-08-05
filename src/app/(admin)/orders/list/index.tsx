import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import OrdersListItem from "@/components/OrdersListItem";
import { useAdminOrderList } from "@/api/orders";
import { useInsertOrderSubscription } from "@/api/orders/subscriptions";

const index = () => {
  const {
    data: orders,
    isLoading,
    error,
  } = useAdminOrderList({ archived: false });

  useInsertOrderSubscription();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
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
        data={orders}
        renderItem={({ item }) => <OrdersListItem order={item} />}
        contentContainerStyle={{
          gap: 10,
          paddingVertical: 8,
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
