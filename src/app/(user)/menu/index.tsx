import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
// import products from "@assets/data/products";
import ProductItemList from "@/components/ProductItemList";
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

export default function TabOneScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*");
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  // if (error) {
  //   return <Text>Error: {error.message}</Text>;
  // }

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
        data={data}
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
