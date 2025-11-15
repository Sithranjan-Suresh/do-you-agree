import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Icons Row */}
      <View style={styles.iconRow}>
        <Text style={styles.icon}>💬</Text>
        <Text style={styles.icon}>👥</Text>
      </View>

      {/* Title */}
      <Text style={styles.title}>Do You Agree?</Text>

      {/* Buttons */}
      <TouchableOpacity style={styles.loginButton} onPress={() => router.push("/login")}>
        <Text style={styles.loginText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.createButton} onPress={() => router.push("/signup")}>
        <Text style={styles.createText}>Create Account</Text>
      </TouchableOpacity>

      {/* Guest */}
      <TouchableOpacity>
        <Text style={styles.guestText}>Continue as Guest</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  iconRow: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 40,
  },
  icon: {
    fontSize: 42,
  },
  title: {
    fontSize: 42,
    fontWeight: "700",
    color: "#000",
    marginBottom: 60,
    textAlign: "center",
  },
  loginButton: {
    backgroundColor: "#000",
    width: "100%",
    paddingVertical: 14,
    borderRadius: 16,
    marginBottom: 24,
  },
  loginText: {
    color: "#FFF",
    fontWeight: "700",
    textAlign: "center",
    fontSize: 18,
  },
  createButton: {
    backgroundColor: "#F3EFF5",
    width: "100%",
    paddingVertical: 14,
    borderRadius: 16,
    marginBottom: 24,
  },
  createText: {
    color: "#000",
    fontWeight: "700",
    textAlign: "center",
    fontSize: 18,
  },
  guestText: {
    color: "#808080",
    textDecorationLine: "underline",
    marginTop: 16,
    fontSize: 16,
  },
});
