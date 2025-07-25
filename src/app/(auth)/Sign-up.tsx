import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { supabase } from "../../lib/supabase";

export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  async function SignUpWithEmail() {
    setIsLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      Alert.alert("Error", error.message);
    }

    setIsLoading(false);
  }

  const onSignin = () => {
    let newErrors: typeof errors = {};
    if (!email.trim()) newErrors.email = "Email is required";
    if (!password.trim()) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    SignUpWithEmail();
    // Signup logic here (API call, Firebase, Supabase, etc.)
    // Alert.alert("Success", "Account created!");
  };
  // const handleSignup = () => {
  //   if (!email || !password || !confirmPassword) {
  //     Alert.alert("Error", "All fields are required");
  //     return;
  //   }

  //   if (password !== confirmPassword) {
  //     Alert.alert("Error", "Passwords do not match");
  //     return;
  //   }

  //   SignUpWithEmail();
  //   // Signup logic here (API call, Firebase, Supabase, etc.)
  //   // Alert.alert("Success", "Account created!");
  // };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Create Account</Text>

          <TextInput
            placeholder="Email"
            value={email}
            // onChangeText={setEmail}
            onChangeText={(text) => {
              setEmail(text);
              setErrors((prev) => ({ ...prev, name: undefined }));
            }}
            style={[styles.input, errors.email && styles.errorInput]}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              style={styles.passwordInput}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={showPassword ? "eye" : "eye-off"}
                size={24}
                color="#888"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={styles.passwordInput}
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={showConfirmPassword ? "eye" : "eye-off"}
                size={24}
                color="#888"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={onSignin} style={styles.button}>
            <Text style={styles.buttonText}>
              {isLoading ? "Creating..." : "Create Account"}
            </Text>
          </TouchableOpacity>
          <Text style={styles.linkText}>
            Already have an account?{" "}
            <Text
              onPress={() => router.navigate("/(auth)/Sign-in")}
              style={styles.link}
            >
              Sign In
            </Text>
          </Text>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  errorInput: {
    borderColor: "red",
  },
  passwordInput: {
    flex: 1,
    padding: 15,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10,
  },
  button: {
    backgroundColor: "#14CF93",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  linkText: {
    marginTop: 20,
    textAlign: "center",
    color: "#333",
  },
  link: {
    color: "#14CF93",
    fontWeight: "bold",
  },
});
