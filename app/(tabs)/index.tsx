import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, View } from "react-native";
import screenNames from "@/components/navigation/ScreenNames";
import firebaseApp from "@/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getUserDataByUserID } from "@/constants/firebaseFunction";

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

  // const getUserDataByUserID = async (userID) => {
  //   try {
  //     console.log(userID)
  //     // Reference to the users collection
  //     const db = getFirestore(firebaseApp);
  //     const usersCollection = collection(db, "users");
  //
  //     // Query to find the user with the specific userID
  //     const q = query(usersCollection, where("userID", "==", userID));
  //
  //     // Execute the query
  //     const querySnapshot = await getDocs(q);
  //
  //     // Check if a document was found
  //     if (!querySnapshot.empty) {
  //       // Extract user data from the first document (assuming userID is unique)
  //       const userData = querySnapshot.docs[0].data();
  //       console.log("User data:", userData);
  //       return userData;
  //     } else {
  //       console.log("No user found with the specified userID.");
  //       return null;
  //     }
  //   } catch (error) {
  //     console.error("Error getting user data:", error);
  //     throw error;
  //   }
  // };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator />
    </View>
  );
}
