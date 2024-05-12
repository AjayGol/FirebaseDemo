import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "../../firebase";
import { styles } from '../styled';
import screenNames from "@/components/navigation/ScreenNames";

export default function LoginScreen() {
  const navigation = useNavigation();
  const { loginContainer, commonTextInput, signUpContainer, signUpText, dividerContainer, line, textInputMainView, text, loginButtonContainer } = styles;
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
      navigation.navigate(screenNames.NewPost);
    } catch (error) {
      Alert.alert("Invalid Credential");
    }
  };

  const handleSignUp = () => {
    navigation.navigate(screenNames.CreateAccount);
  };

  const Divider = () => {
    return (
      <View style={dividerContainer}>
        <View style={line}></View>
        <Text style={text}>Or</Text>
        <View style={line}></View>
      </View>
    );
  };

  return (
    <View style={loginContainer}>
      <TouchableOpacity style={signUpContainer} onPress={handleSignUp}>
        <Text style={signUpText}>{"Sign Up"}</Text>
      </TouchableOpacity>
      {Divider()}
      <View style={textInputMainView}>
        <TextInput
          style={commonTextInput}
          placeholder="Email"
          placeholderTextColor="gray"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <TextInput
          style={commonTextInput}
          placeholder="Password"
          value={password}
          placeholderTextColor="gray"
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <TouchableOpacity
        style={loginButtonContainer}
        onPress={handleLogin}
      >
           <Text style={signUpText}>{"Login"}</Text>
      </TouchableOpacity>
    </View>
  );
}
