// import { View, Text, StyleSheet, Image, Pressable } from "react-native";
// import React from "react";
// import Colors from "../constants/Colors";
// import { CartItem } from "../types";
// import { Link } from "expo-router";

// import { FontAwesome } from "@expo/vector-icons";
// import { useCart } from "../providers/CartProvider";
// import { ScrollView } from "react-native-reanimated/lib/typescript/Animated";

// type CartListItemProps = {
//   cartItem: CartItem;
// };

// const CartListItem = ({ cartItem }: CartListItemProps) => {
//   //   const { updateQuantity } = useCart();
//   return (
//     <View style={styles.container}>
//       <Image
//         source={{ uri: cartItem.product.image || "" }}
//         style={styles.image}
//         resizeMode="cover"
//       />
//       <View style={styles.itemContainer}>
//         <Text style={styles.title} numberOfLines={1}>
//           {cartItem.product.name}
//         </Text>

//         <View style={styles.subtitleContainer}>
//           <Text style={styles.price}>₹{cartItem.product.price.toFixed(2)}</Text>
//           <Text>Size: {cartItem.size}</Text>
//         </View>
//       </View>
//       <View style={styles.quantitySelector}>
//         <FontAwesome
//           //   onPress={() => updateQuantity(cartItem.id, -1)}
//           name="minus"
//           color="gray"
//           style={{ padding: 5 }}
//         />

//         <Text style={styles.quantity}>{cartItem.quantity}</Text>
//         <FontAwesome
//           //   onPress={() => updateQuantity(cartItem.id, 1)}
//           name="plus"
//           color="gray"
//           style={{ padding: 5 }}
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#a6e8d3",
//     borderRadius: 40,
//     padding: 15,
//     // flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     elevation: 3,
//     overflow: "hidden",
//     borderWidth: 0.1,
//   },
//   image: {
//     width: 65,
//     aspectRatio: 1,
//     alignSelf: "center",
//     marginRight: 10,
//     borderRadius: 20,
//   },
//   itemContainer: {
//     // backgroundColor: "#a7f3b0",
//   },
//   title: {
//     fontWeight: "500",
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   subtitleContainer: {
//     flexDirection: "row",
//     gap: 5,
//   },
//   quantitySelector: {
//     flexDirection: "row",
//     gap: 10,
//     alignItems: "center",
//     marginVertical: 10,
//   },
//   quantity: {
//     fontWeight: "500",
//     fontSize: 18,
//   },
//   price: {
//     color: Colors.light.tint,
//     fontWeight: "bold",
//   },
// });

// export default CartListItem;

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
              <FontAwesome name="minus" size={14} color="#333" />
            </Pressable>

            <Text style={styles.quantity}>{cartItem.quantity}</Text>

            <Pressable
                onPress={() => updateQuantity(cartItem.id, 1)}
              style={styles.qtyButton}
            >
              <FontAwesome name="plus" size={14} color="#333" />
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
    backgroundColor: "#e0e0e0",
    borderRadius: 15,
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
