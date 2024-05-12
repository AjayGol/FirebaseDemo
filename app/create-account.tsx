import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "../firebase";
import { styles } from "./styled";
import { emailValidation } from "@/constants/String";

export default function CreateAccount() {
  const navigation = useNavigation();
  const {
    createPostContainer,
    commonTextInput,
    createAccountContainer,
    createAccountText,
    createAccountCta,
    createAccountButton,
    textInputCreate,
    loginButton,
  } = styles;
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const onPressCreateAccount = async () => {
    try {
      if (emailValidation(email)) {
        Alert.alert("Invalid Email", "Please enter a valid email address");
        return;
      }
      if (password !== confirmPassword) {
        Alert.alert("Passwords don't match");
        return;
      }

      const auth = getAuth(firebaseApp);
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Creat account successfully");
      navigation.goBack();
    } catch (error) {
      Alert.alert("User already exits");
      console.log(error);
    }
  };

  const onPressBack = () => {
    navigation.goBack();
  };

  return (
    <View style={createPostContainer}>
      <View style={createAccountContainer}>
        <Text style={createAccountText}>{"Create an account"}</Text>
      </View>
      <View style={styles.textInputMainView}>
        <TextInput
          style={[commonTextInput, textInputCreate]}
          placeholder="Email"
          placeholderTextColor="gray"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={commonTextInput}
          placeholder="Password"
          placeholderTextColor="gray"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
          secureTextEntry
        />
        <TextInput
          style={commonTextInput}
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
        style={createAccountButton}
        onPress={onPressCreateAccount}
      >
        <Text style={createAccountCta}>{"Create Account"}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressBack}>
        <Text style={[createAccountCta, loginButton]}>{"Login"}</Text>
      </TouchableOpacity>
    </View>
  );
}
