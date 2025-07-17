import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import Colors from "../constants/Colors";
import { CartItem } from "../types";
import { FontAwesome } from "@expo/vector-icons";
import { useCart } from "../providers/CartProvider";

type CartListItemProps = {
  cartItem: CartItem;
};

const CartListItem = ({ cartItem }: CartListItemProps) => {
  const { updateQuantity } = useCart();

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: cartItem.product.image || "" }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {cartItem.product.name}
        </Text>
        <Text style={styles.sizeText}>Size: {cartItem.size}</Text>
        <View style={styles.bottomRow}>
          <Text style={styles.price}>₹{cartItem.product.price.toFixed(2)}</Text>
          <View style={styles.quantitySelector}>
            <Pressable
              onPress={() => updateQuantity(cartItem.id, -1)}
              style={styles.qtyButton}
            >
              <FontAwesome name="minus" size={16} color="#e24242" />
            </Pressable>

            <Text style={styles.quantity}>{cartItem.quantity}</Text>

            <Pressable
              onPress={() => updateQuantity(cartItem.id, 1)}
              style={styles.qtyButton}
            >
              <FontAwesome name="plus" size={16} color="#10ec35" />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 12,
    marginRight: 12,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  sizeText: {
    fontSize: 14,
    color: "#666",
    marginVertical: 4,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.light.tint,
  },
  quantitySelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  qtyButton: {
    // backgroundColor: "#e0e0e0",
    // borderRadius: 15,
    padding: 6,
    marginHorizontal: 4,
  },
  quantity: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    minWidth: 20,
    textAlign: "center",
  },
});

export default CartListItem;
