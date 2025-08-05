import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
// import products from "@assets/data/products
import ProductItemList from "@/components/ProductItemList";
import { useProductList } from "@/api/products";
import { Link, Stack } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function TabOneScreen() {
  const { data: products, isLoading, error } = useProductList();

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Menu",
          headerRight: () => (
            <Link href="/(admin)/menu/create" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="plus-circle"
                    size={23}
                    color={"#ffffff"}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
