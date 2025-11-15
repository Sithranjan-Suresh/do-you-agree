import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://umpyr.tech/api/accounts/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        console.log("Non-JSON login response:", text);
        throw new Error("Server returned unexpected response");
      }

      if (data.success === true || data.successful === true) {
        Alert.alert("Success", "Logged in successfully");
        router.push("/dashboard");
      } else {
        Alert.alert("Login Failed", data.message || data["response-text"] || "Invalid credentials");
      }
    } catch (err: any) {
      console.error(err);
      Alert.alert("Login Failed", err.message || "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#E5E5E5" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Log In</Text>
          <Text style={styles.headerIcon}>👤</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#CFCFCF"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#CFCFCF"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleLogin}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitText}>Submit</Text>}
        </TouchableOpacity>

        <Text style={styles.link} onPress={() => router.push("/signup")}>
          Create Account
        </Text>

        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: "center", padding: 24 },
  headerContainer: {
    backgroundColor: "#F3EFF5",
    borderRadius: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    marginBottom: 40,
    position: "relative",
  },
  headerText: { fontSize: 20, fontWeight: "700", color: "#000" },
  headerIcon: { position: "absolute", right: 16, fontSize: 24 },
  input: {
    backgroundColor: "#fff",
    borderColor: "#CFCFCF",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
  },
  submitButton: { backgroundColor: "#000", borderRadius: 16, paddingVertical: 14, alignItems: "center", marginBottom: 12 },
  submitText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  link: { color: "#000", textAlign: "center", textDecorationLine: "underline", fontSize: 16, marginBottom: 40 },
  backButton: { position: "absolute", bottom: 30, left: 24 },
  backArrow: { fontSize: 30, color: "#000" },
});
