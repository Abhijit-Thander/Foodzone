import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Product } from "@/types";

type ProductListItemProps = {
  item: Product;
};

const ProductItemList = ({ item }: ProductListItemProps) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.85}>
      <View style={styles.imgView}>
        <Image source={{ uri: item.image || "" }} style={styles.image} />
        {item.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{item.discount}% OFF</Text>
          </View>
        )}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {item.name}
        </Text>
        <View style={styles.bottomRow}>
          <Text style={styles.price}>₹{item.price}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.star}>★</Text>
            <Text style={styles.rating}>{item.rating}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductItemList;

const styles = StyleSheet.create({
  container: {
    width: "46%",
    margin: "2%",
    borderRadius: 16,
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    overflow: "hidden",
    borderWidth: 0.4,
    borderColor: "#eee",
  },
  imgView: {
    height: 150,
    width: "100%",
    overflow: "hidden",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  discountBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#FF5722",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  discountText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  textContainer: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
    textAlign: "left",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#27ae60", // premium green
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fef1f0",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
  },
  star: {
    fontSize: 14,
    color: "#f5a623", // gold star
    marginRight: 2,
  },
  rating: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#f42828",
  },
});
