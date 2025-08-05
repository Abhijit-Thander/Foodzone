import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { use } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import OrderListItem from "@/components/OrdersListItem";
import OrderItemListItem from "@/components/OrderItemListItem";
import { useOrdersDetails } from "@/api/orders";
import { useUpdateOrderStatusSubscription } from "@/api/orders/subscriptions";

const OrdersDetailsScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);

  const { data: order, isLoading, error } = useOrdersDetails(id);
  // Subscribe to order status updates
  // This will automatically update the order details when the status changes
  // and invalidate the query to refetch the latest data.
  useUpdateOrderStatusSubscription(id);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (error || !order) return <Text>Error: {error?.message}</Text>;

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
