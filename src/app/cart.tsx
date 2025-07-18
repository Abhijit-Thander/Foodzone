import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import { useCart } from "@/providers/CartProvider";
import CartListItem from "@/components/CartListItem";
import { Stack } from "expo-router";
import Colors from "@/constants/Colors";
import Toast from "react-native-toast-message"; //

export default function CartScreen() {
  const { items, total } = useCart();

  const OnOrderPlace = () => {
    Toast.show({
      type: "success",
      text1: "Order Placed Successfully",
    });
  };
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Cart 🧺",
          presentation: "modal",
          headerStyle: {
            backgroundColor: Colors.light.tint,
          },
        }}
      />
      <Text style={styles.heading}>🧺 My Basket</Text>

      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>🍕</Text>
          <Text style={styles.emptyText}>Your cart is feeling lonely!</Text>
          <Text style={styles.subText}>
            Add some delicious items to get started.
          </Text>
        </View>
      ) : (
        <>
          <FlatList
            data={items}
            renderItem={({ item }) => <CartListItem cartItem={item} />}
            contentContainerStyle={{ gap: 15, paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
          />

          <View style={styles.checkoutBar}>
            <Text style={styles.totalText}>Total: ₹{total.toFixed(2)}</Text>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={OnOrderPlace}
            >
              <Text style={styles.checkoutText}>Place Order</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fff9",
    paddingHorizontal: 10,
    paddingTop: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#383838",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyEmoji: {
    fontSize: 60,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#383838",
  },
  subText: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },
  checkoutBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderTopColor: "#ccc",
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -1 },
    shadowRadius: 8,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#383838",
  },
  checkoutButton: {
    backgroundColor: "#14CF93",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 50,
  },
  checkoutText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
