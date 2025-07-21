import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import orders from "@assets/data/orders";
import OrderListItem from "@/components/OrdersListItem";
import OrderItemListItem from "@/components/OrderItemListItem";

const OrdersDetailsScreen = () => {
  const { id } = useLocalSearchParams();

  const order = orders.find((o) => o.id.toString() === id);

  if (!order) return <Text>Order not found</Text>;

  return (
    <View style={{ padding: 10, gap: 20 }}>
      <Stack.Screen options={{ title: `orders #${id}` }} />
      <OrderListItem order={order} />

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10, paddingVertical: 8 }}
      />
    </View>
  );
};

export default OrdersDetailsScreen;

const styles = StyleSheet.create({});
