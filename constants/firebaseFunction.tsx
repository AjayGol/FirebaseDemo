// firestoreUtils.js
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import firebaseApp from "@/firebase";

const getUserDataByUserID = async (userID) => {
  try {
    console.log(userID);

    const db = getFirestore(firebaseApp);
    // Reference to the users collection
    const usersCollection = collection(db, "users");

    // Query to find the user with the specific userID
    const q = query(usersCollection, where("userID", "==", userID));

    // Execute the query
    const querySnapshot = await getDocs(q);

    // Check if a document was found
    if (!querySnapshot.empty) {
      // Extract user data from the first document (assuming userID is unique)
      const userData = querySnapshot.docs[0].data();
      console.log("User data:", userData);
      global.userData = userData;
      return userData;
    } else {
      console.log("No user found with the specified userID.");
      return null;
    }
  } catch (error) {
    console.error("Error getting user data:", error);
    throw error;
  }
};

export { getUserDataByUserID };
