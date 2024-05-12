import React, { useState, useEffect } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import {
  collection,
  getFirestore,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import firebaseApp from "../firebase";
import { getAuth } from "firebase/auth";
import { styles } from "./styled";
import { dateFormat } from "@/constants/String";

export default function NewPost() {
  const {
    postAccountCta,
    textInputMainView,
    newPostInsideText,
    newPostInsideContainer,
    newPostText,
    newPostContainer,
    commonTextInput,
    mainContainer,
    postMessageButton,
  } = styles;
  const [messages, setMessages] = useState([]);
  const [isPostMessage, setIsPostMessage] = useState("");
  const auth = getAuth(firebaseApp);
  const user = auth.currentUser;

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(getFirestore(firebaseApp), "messages"),
        orderBy("createdAt", "asc"),
      ),
      (snapshot) => {
        const messagesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(messagesData.reverse());
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
      } else {
        alert("Please enter a message.");
      }
    } catch (error) {
      alert("An error occurred while posting the message");
    }
  };

  return (
    <View style={mainContainer}>
      <View style={newPostContainer}>
        <Text style={newPostText}>{"Newest Post"}</Text>
        <View style={newPostInsideContainer}>
          <Text style={newPostInsideText}>Post: {messages[0]?.text}</Text>
          <Text style={newPostInsideText}>Email: {messages[0]?.email}</Text>
          <Text style={newPostInsideText}>
            Time Posted:{" "}
            {messages[0]?.createdAt?.seconds
              ? dateFormat(messages[0]?.createdAt?.seconds)
              : ""}
          </Text>
        </View>
      </View>
      <View style={textInputMainView}>
        <TextInput
          style={[commonTextInput, { height: 110 }]}
          placeholder="Enter Text Post Here"
          placeholderTextColor="gray"
          value={isPostMessage}
          onChangeText={setIsPostMessage}
          multiline={true}
          numberOfLines={5}
        />
      </View>

      <TouchableOpacity style={postMessageButton} onPress={handlePostMessage}>
        <Text style={postAccountCta}>{"Post"}</Text>
      </TouchableOpacity>
    </View>
  );
}
