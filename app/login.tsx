import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // Correct import path
import { screenWidth } from "@/constants/Common";
import firebaseApp from "../firebase"; // Import your firebase configuration

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address");
      return;
    }
    try {
      const auth = getAuth(firebaseApp);
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate("new-post");
    } catch (error) {
      Alert.alert("Invalid Credential");
    }
  };

  const handleSignUp = () => {
    navigation.navigate("create-account");
  };

  const Divider = () => {
    return (
      <View style={styles.dividerContainer}>
        <View style={styles.line}></View>
        <Text style={styles.text}>Or</Text>
        <View style={styles.line}></View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.signUpContainer} onPress={handleSignUp}>
        <Text style={styles.signUpText}>{"Sign Up"}</Text>
      </TouchableOpacity>
      {Divider()}
      <View style={styles.textInputMainView}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="gray"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            // setEmailError(''); // Clear email error when text changes
          }}
        />
        {/*{emailError ? <Text style={styles.errorText}>{emailError}</Text> : null} /!* Display email error message *!/*/}
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          placeholderTextColor="gray"
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <TouchableOpacity
        style={styles.loginButoonContainer}
        onPress={handleLogin}
      >
        <Text style={styles.signUpText}>{"Login"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  signUpContainer: {
    backgroundColor: "#4bc7f3",
    borderRadius: 8,
    marginBottom: 80,
  },
  signUpText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "600",
    paddingHorizontal: 70,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    marginBottom: 80,
  },
  line: {
    width: "20%",
    height: 2,
    backgroundColor: "#4bc7f3",
    marginHorizontal: 10,
  },
  textInputMainView: {
    width: screenWidth * 0.8,
  },
  text: {
    fontSize: 16,
    fontWeight: "regular",
    color: "black",
  },
  errorText: {
    color: "red",
    marginBottom: 5,
  },
  loginButoonContainer: {
    backgroundColor: "#4bc7f3",
    borderRadius: 8,
    marginTop: 20,
  },
});
