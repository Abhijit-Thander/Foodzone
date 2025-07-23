import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
// import products from "@assets/data/products";
import ProductItemList from "@/components/ProductItemList";
import { useProductList } from "@/api/products";

export default function TabOneScreen() {
  const { data: products, isLoading, error } = useProductList();

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
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
        renderItem={({ item }) => <ProductItemList product={item} />}
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
