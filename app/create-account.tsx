import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { screenHeight, screenWidth } from "@/constants/Common";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"; // Correct import path
import firebaseApp from "../firebase"; // Import your firebase configuration

export default function CreateAccount() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onPressCreateAccount = async () => {
    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords don't match");
      }
      const auth = getAuth(firebaseApp);
      await createUserWithEmailAndPassword(auth, email, password);
      // await createUserWithEmailAndPassword(email, password);
      navigation.navigate("new-post");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.createAccountContainer}>
        <Text style={styles.createAccountText}>{"Create an account"}</Text>
      </View>
      <View style={styles.textInputMainView}>
        <TextInput
          style={[styles.input, { marginBottom: 40 }]}
          placeholder="Email"
          placeholderTextColor="gray"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="gray"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="gray"
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
          }}
          secureTextEntry
        />
      </View>

      <TouchableOpacity
        style={{ backgroundColor: "#4bc7f3", borderRadius: 8, marginTop: 20 }}
        onPress={onPressCreateAccount}
      >
        <Text style={styles.createAccountCta}>{"Create Account"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: screenHeight * 0.2,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  createAccountContainer: {
    marginBottom: 40,
  },
  createAccountText: {
    fontSize: 35,
    color: "#4bc7f3",
    fontWeight: "bold",
    paddingHorizontal: 50,
    paddingVertical: 10,
    textAlign: "center",
    justifyContent: "center",
  },
  textInputMainView: {
    width: screenWidth * 0.8,
  },
  createAccountCta: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "600",
    paddingHorizontal: 70,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
