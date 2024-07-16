import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, View } from "react-native";
import screenNames from "@/components/navigation/ScreenNames";
import firebaseApp from "@/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function Page() {
  const navigation = useNavigation();

  useEffect(() => {
    const checkLoginState = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) {
          navigation.reset({
            index: 0,
            routes: [{ name: screenNames.Login }],
          });
        } else {
          const auth = getAuth(firebaseApp);
          try {
            const storedToken = await AsyncStorage.getItem("userToken");
            if (typeof storedToken === "string") {
              const userData = JSON.parse(storedToken);
              await signInWithEmailAndPassword(
                auth,
                userData.email,
                userData.password,
              );
              navigation.reset({
                index: 0,
                routes: [{ name: screenNames.TabBar }],
              });
            }
          } catch (error) {
            console.error("Error handling stored token:", error);
          }
        }
      } catch (error) {
        console.error("Failed to fetch the token from storage", error);
      }
    };

    checkLoginState();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator />
    </View>
  );
}
