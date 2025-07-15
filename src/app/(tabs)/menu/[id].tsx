import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Pressable,
} from "react-native";
import React from "react";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import products from "@assets/data/products";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function ProductDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const product = products.find((p) => p.id === Number(id));

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

  return (
    <View style={styles.page}>
      <Stack.Screen
        options={{
          title: "Details",
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="opencart"
                    size={25}
                    // color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 5, opacity: pressed ? 0.5 : 1 }}
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
          <Image source={{ uri: product.image }} style={styles.image} />
          {product.discount && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{product.discount}% OFF</Text>
            </View>
          )}
        </View>

        {/* Product Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.name} numberOfLines={2}>
            {product.name}
          </Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>₹{product.price}</Text>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={18} color="#f5a623" />
              <Text style={styles.rating}>{product.rating}</Text>
            </View>
          </View>
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>
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
  backIcon: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 50,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  imageContainer: {
    width: width,
    height: 350,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
    backgroundColor: "#ddd",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
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
    marginBottom: 16,
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
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#555",
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
});

// export default ProductDetails;
