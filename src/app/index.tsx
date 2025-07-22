import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Link, Redirect, router } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";
import { supabase } from "@/lib/supabase";

const Home = () => {
  const { session, loading, isAdmin } = useAuth();

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (!session) {
    return <Redirect href="/Sign-in" />;
  }
  if (!isAdmin) {
    return <Redirect href={"/(user)"} />;
  }

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
      {/* <Link href="/Sign-in" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Sign In</Text>
        </Pressable>
      </Link>
      <Link href="/Sign-up" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>
      </Link> */}
      <Link href="/Sign-up" asChild>
        <Pressable
          style={styles.button}
          onPress={() => supabase.auth.signOut()}
        >
          <Text style={styles.buttonText}>Sign Out</Text>
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
