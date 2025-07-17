import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import { useCart } from "@/providers/CartProvider";
import CartListItem from "@/components/CartListItem";

export default function ModalScreen() {
  const { items, addItem } = useCart();

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <View style={styles.container}>
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
            <TouchableOpacity style={styles.checkoutButton}>
              <Text style={styles.checkoutText}>Checkout</Text>
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
