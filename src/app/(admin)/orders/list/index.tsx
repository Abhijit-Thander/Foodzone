import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import orders from "@assets/data/orders";
import OrdersListItem from "@/components/OrdersListItem";

const index = () => {
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

export default index;

const styles = StyleSheet.create({});
