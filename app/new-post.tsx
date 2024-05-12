import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { screenHeight, screenWidth } from "@/constants/common";
import {
  collection,
  getFirestore,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import firebaseApp from "../firebase";
import { getAuth } from "firebase/auth";

export default function NewPost() {
  const [messages, setMessages] = useState([]);
  const [isPostMessage, setIsPostMessage] = useState("");
  const auth = getAuth(firebaseApp);
  const user = auth.currentUser;

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(getFirestore(firebaseApp), "messages"),
      (snapshot) => {
        const messagesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(messagesData);
      },
    );

    return () => unsubscribe();
  }, []);

  const handlePostMessage = async () => {
    try {
      if (isPostMessage.trim()) {
        const db = getFirestore(firebaseApp);
        await addDoc(collection(db, "messages"), {
          text: isPostMessage,
          createdAt: new Date(),
          email: user?.email,
        });
        setIsPostMessage("");

        // Update local state immediately after posting
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: isPostMessage, createdAt: new Date(), email: user?.email },
        ]);
      } else {
        alert("Please enter a message.");
      }
    } catch (error) {
      alert("An error occurred while posting the message");
    }
  };

  const formatDateTime = (dateObject) => {
    const date = new Date(dateObject * 1000); // Convert seconds to milliseconds
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based, so add 1
    const year = date.getFullYear();

    // Format the time component (e.g., "1:24m")
    const timeComponent = `${hours % 12 === 0 ? 12 : hours % 12}:${
      minutes < 10 ? "0" : ""
    }${minutes}${hours < 12 ? "am" : "pm"}`;

    // Format the date component (e.g., "11/06/2024")
    const dateComponent = `${day < 10 ? "0" : ""}${day}/${
      month < 10 ? "0" : ""
    }${month}/${year}`;

    // Return the combined format
    return `${timeComponent}, ${dateComponent}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.newPostContainer}>
        <Text style={styles.newPostText}>{"Newest Post"}</Text>
        <View style={styles.newPostInsideContainer}>
          <Text style={styles.newPostInsideText}>
            Post: {messages[0]?.text}
          </Text>
          <Text style={styles.newPostInsideText}>Email: {user?.email}</Text>
          <Text style={styles.newPostInsideText}>
            Time Posted:{" "}
            {messages[0]?.createdAt?.seconds
              ? formatDateTime(messages[0]?.createdAt?.seconds)
              : ""}
          </Text>
        </View>
      </View>
      <View style={styles.textInputMainView}>
        <TextInput
          style={styles.input}
          placeholder="Enter Text Post Here"
          placeholderTextColor="gray"
          value={isPostMessage}
          onChangeText={setIsPostMessage}
          multiline={true}
          numberOfLines={5}
        />
      </View>

      <TouchableOpacity
        style={{ backgroundColor: "#0a7ea4", borderRadius: 8, marginTop: 5 }}
        onPress={handlePostMessage}
      >
        <Text style={styles.createAccountCta}>{"Post"}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ backgroundColor: "#0a7ea4", borderRadius: 8, marginTop: 10 }}
        onPress={handlePostMessage}
      >
        <Text style={styles.createAccountCta}>{"LogOut"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: screenHeight * 0.1,
  },
  input: {
    width: "100%",
    height: 110,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  newPostContainer: {
    borderWidth: 2,
    borderColor: "#0a7ea4",
    marginBottom: screenHeight * 0.15,
    width: screenWidth - 20,
    alignSelf: "center",
  },
  newPostInsideContainer: {
    borderWidth: 2,
    borderColor: "#0a7ea4",
    marginBottom: 40,
    paddingBottom: 10,
    width: screenWidth * 0.83,
    alignSelf: "center",
  },
  newPostText: {
    fontSize: 35,
    color: "#0a7ea4",
    fontWeight: "bold",
    paddingHorizontal: 50,
    paddingVertical: 10,
    textAlign: "center",
    justifyContent: "center",
  },
  newPostInsideText: {
    fontSize: 16,
    color: "black",
    fontWeight: "regular",
    paddingHorizontal: 15,
    paddingVertical: 5,
    textAlign: "flex-start",
    justifyContent: "center",
  },
  textInputMainView: {
    width: screenWidth * 0.75,
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
