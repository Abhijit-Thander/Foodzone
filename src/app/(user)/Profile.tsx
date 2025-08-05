import { supabase } from "@/lib/supabase";
import { Redirect, router, Stack } from "expo-router";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const UserProfile = () => {
  // Dummy data – replace with Supabase or context data
  const user = {
    name: "Abhijit Thander",
    email: "abhijit@example.com",
    profilePic: "https://i.pravatar.cc/150?img=3", // dummy profile pic
  };

  const  handleLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to sign out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            try {
              await supabase.auth.signOut();
              router.replace("/Sign-in"); // ✅ Navigate here
            } catch (error) {
              console.error("Logout failed:", error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: true }} />
      <View style={styles.profileContainer}>
        <Image source={{ uri: user.profilePic }} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>

        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 40,
  },
  profileContainer: {
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
  },
  email: {
    fontSize: 16,
    color: "#666",
  },
  button: {
    marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: "#14CF93",
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
