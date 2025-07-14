import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import products from "../../../assets/data/products";
import ProductItemList from "@/components/ProductItemList";

export default function TabOneScreen() {
  if (!products) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 10 }}
        data={products}
        renderItem={({ item }) => <ProductItemList item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
