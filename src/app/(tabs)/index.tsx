import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import products from "@assets/data/products";
import ProductItemList from "@/components/ProductItemList";

export default function TabOneScreen() {
  if (!products || products.length === 0) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: 10,
          paddingVertical: 8,
        }}
        keyExtractor={(item) => item.id.toString()}
        data={products}
        renderItem={({ item }) => <ProductItemList item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8F0",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
