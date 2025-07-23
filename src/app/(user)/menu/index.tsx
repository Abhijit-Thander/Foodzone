import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import products from "@assets/data/products";
import ProductItemList from "@/components/ProductItemList";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function TabOneScreen() {
  if (!products || products.length === 0) {
    return <ActivityIndicator size="large" />;
  }

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("products").select("*");

      console.log("🟢 Products:", data);
      console.log("error", error);
    };
    fetchProducts();
  }, []);

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
