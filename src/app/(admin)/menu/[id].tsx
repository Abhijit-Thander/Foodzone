import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message"; // 🔁 Add this import
import { useCart } from "@/providers/CartProvider";
import { PizzaSize } from "@/types";
import { useProduct } from "@/api/products";

const { width } = Dimensions.get("window");

// const ItemSize: PizzaSize[] = ["S", "M", "L", "XL"];

export default function ProductDetails() {
  const { addItem } = useCart();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { data: product, error, isLoading } = useProduct(Number(id));
  // const product = products.find((p) => p.id === Number(id));

  const [selectedSize, setSelectedsize] = useState<PizzaSize>("M");

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  if (!product) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFound}>Product not found!</Text>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color="#fff" />
          <Text style={styles.backText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const onConfirmDelete = () => {
    Alert.alert("Delete Dish", "Are you sure you want to delete this dish?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: onDelete,
        style: "destructive",
      },
    ]);
  };
  const onDelete = () => {
    // addItem(product, selectedSize);
    // router.push("/cart");

    Toast.show({
      type: "success",
      text1: "Deleted Dish 🍽️",
      text2: `${product.name} has deleted successfully`,
      position: "top",
      visibilityTime: 2000,
    });
  };

  return (
    <View style={styles.page}>
      <Stack.Screen
        options={{
          title: "Details",
          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={22}
                    color={"#f3f3f3"}
                    style={{ marginRight: 10, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Product Image */}
        <View style={styles.imageContainer}>
          {product.image ? (
            <Image source={{ uri: product.image }} style={styles.image} />
          ) : (
            <View style={styles.noImage}>
              <Text style={styles.noImageText}>No Image Available</Text>
            </View>
          )}

          {product.discount && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{product.discount}% OFF</Text>
            </View>
          )}
        </View>

        {/* Product Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{product.name}</Text>

          <View style={styles.priceRow}>
            <Text style={styles.price}>₹{product.price}</Text>

            <View style={styles.ratingRow}>
              <Ionicons name="star" size={18} color="#f5a623" />
              <Text style={styles.rating}>{product.rating}</Text>
            </View>
          </View>

          <Text style={styles.description}>{product.description}</Text>

          <View style={styles.extraInfo}>
            <Text
              style={[
                styles.extraLabel,
                { color: product.isVeg ? "#168b1e" : "#ed4b4b" },
              ]}
            >
              {product.isVeg ? "Vegetarian" : "Non-Vegetarian"}
            </Text>
            <Text style={styles.extraText}>
              Restaurant: {product.restaurantName}
            </Text>
            <Text style={styles.extraText}>
              Delivery Time: {product.deliveryTime} mins
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* ✅ Add to Cart Button */}
      <TouchableOpacity style={styles.deleteBtn} onPress={onConfirmDelete}>
        <Text style={styles.deleteText}>Delete Dish</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  container: {
    paddingBottom: 40,
  },
  imageContainer: {
    width: width,
    height: 350,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  noImage: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  noImageText: {
    color: "#555",
    fontSize: 16,
  },
  discountBadge: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "#FF5722",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    elevation: 3,
  },
  discountText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
  },
  infoContainer: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: -30,
    borderRadius: 16,
    padding: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#14CF93",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 4,
    color: "#333",
  },
  sizeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 10,
  },
  sizeBoxSelected: {
    backgroundColor: "#14CF93",
    borderColor: "#14CF93",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  sizeTextSelected: {
    color: "#fff",
  },
  sizeLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },

  sizeBox: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 999, // big number makes it fully round
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: 10,
    elevation: 3,
  },
  sizeText: {
    fontSize: 16,
    color: "#656769",
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#555",
    marginBottom: 16,
  },
  extraInfo: {
    marginTop: 8,
  },
  extraLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: "#333",
  },
  extraText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
    fontWeight: "600",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  notFound: {
    fontSize: 18,
    marginBottom: 20,
  },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#14CF93",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backText: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 16,
  },
  deleteBtn: {
    backgroundColor: "#ec6645",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginVertical: 16,
    marginHorizontal: 40,
  },
  deleteText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
