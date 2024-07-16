import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, View } from "react-native";
import screenNames from "@/components/navigation/ScreenNames";
import firebaseApp from "@/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getUserDataByUserID } from "@/constants/FirebaseFunction";
import { useSQLiteContext } from "expo-sqlite";

interface Todo {
  value: string;
  intValue: number;
}

export default function Page() {
  const navigation = useNavigation();
  const db = useSQLiteContext();

  useEffect(() => {
    const checkLoginState = async () => {
      try {
        const result = await db.getAllAsync<Todo>("SELECT * FROM todos");

        if (!result.length) {
          navigation.reset({
            index: 0,
            routes: [{ name: screenNames.Login }],
          });
        } else {
          const auth = getAuth(firebaseApp);
          try {
            if (result.length > 0) {
              const userData = result[0];
              const userCredential = await signInWithEmailAndPassword(
                auth,
                userData.email,
                userData.password,
              );
              const userID = userCredential.user.uid;
              await getUserDataByUserID(userID);
              // await getUserDataByUserID(userID);

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
