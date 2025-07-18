import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { Link, router } from "expo-router";

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose User Type</Text>

      <Pressable
        style={[styles.button, { backgroundColor: "#383838" }]}
        onPress={() => router.navigate("/(admin)")}
      >
        <Text style={styles.buttonText}>🔏 Admin</Text>
      </Pressable>

      <Link href={"/(user)"} asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>👤 User</Text>
        </Pressable>
      </Link>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#14CF93",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 20,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
