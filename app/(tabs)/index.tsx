import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import {Text, View} from "react-native";

export default function Page() {
  const navigation = useNavigation();

  useEffect(() => {
    console.log("33")
    const checkLoginState = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token){
          navigation.reset({
            index: 0,
            routes: [{ name: 'login-screen' }],
          });
        }else {
          navigation.reset({
            index: 0,
            routes: [{ name: 'new-post' }],
          });
        }
      } catch (error) {
        console.error('Failed to fetch the token from storage', error);
      }
    };

    checkLoginState();
  }, []);

    return (
        <View>
          <Text>Loading...</Text>
        </View>
    );

}
