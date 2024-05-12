import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "../../firebase";
import { styles } from "../styled";
import screenNames from "@/components/navigation/ScreenNames";
import { emailValidation } from "@/constants/String";

export default function LoginScreen() {
  const navigation = useNavigation();
  const {
    loginContainer,
    commonTextInput,
    signUpContainer,
    signUpText,
    dividerContainer,
    line,
    textInputMainView,
    text,
    loginButtonContainer,
  } = styles;
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    if (emailValidation(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address");
      return;
    } else if (password.length === 0) {
      Alert.alert("Invalid Password", "Please enter a valid password");
      return;
    }
    try {
      const auth = getAuth(firebaseApp);
      await signInWithEmailAndPassword(auth, email, password);

      navigation.reset({
        index: 0,
        routes: [{ name: screenNames.NewPost }],
      } as never);
    } catch (error) {
      Alert.alert("Invalid Credential");
      console.log(error);
    }
  };

  const handleSignUp = () => {
    navigation.navigate(screenNames.CreateAccount as never);
  };

  const Divider = () => {
    return (
      <View style={dividerContainer}>
        <View style={line} />
        <Text style={text}>Or</Text>
        <View style={line} />
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
      <TouchableOpacity style={loginButtonContainer} onPress={handleLogin}>
        <Text style={signUpText}>{"Login"}</Text>
      </TouchableOpacity>
    </View>
  );
}
