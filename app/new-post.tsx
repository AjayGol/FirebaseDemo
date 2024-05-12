import React, { useState, useEffect } from "react";
import { View, TextInput, Text, TouchableOpacity, Image } from "react-native";
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
import { ListDataProps } from "@/app/app.types";
import * as ImagePicker from "expo-image-picker";
import {LinearGradient} from "expo-linear-gradient";

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
    textBoxBig,
    imageContainer,
    selectImage,
    textWhite,
    gradient,
  } = styles;
  const [messages, setMessages] = useState<ListDataProps[]>([]);
  const [isPostMessage, setIsPostMessage] = useState<string>("");
  const [selectedPhoto, setSelectedPhoto] = useState<string>("");
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
        })) as [ListDataProps];
        setMessages(messagesData.reverse());
      },
    );

    return () => unsubscribe();
  }, []);

  const pickImage = async (index) => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedPhoto(result.assets[0].uri);
    }
  };

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
      console.log(error);
    }
  };

  return (
    <View style={mainContainer}>
      <View style={newPostContainer}>
        <Text style={newPostText}>{"Newest Post"}</Text>
        <View style={newPostInsideContainer}>
          <Text style={newPostInsideText}>Post: {messages[0]?.text ?? ""}</Text>
          <Text style={newPostInsideText}>
            Email: {messages[0]?.email ?? ""}
          </Text>
          <Text style={newPostInsideText}>
            Time Posted: {dateFormat(messages[0]?.createdAt?.seconds ?? "")}
          </Text>
        </View>
      </View>
      <View style={textInputMainView}>
        <TextInput
          style={[commonTextInput, textBoxBig]}
          placeholder="Enter Text Post Here"
          placeholderTextColor="gray"
          value={isPostMessage}
          onChangeText={setIsPostMessage}
          multiline={true}
          numberOfLines={5}
        />
        <TouchableOpacity onPress={pickImage} style={selectImage}>
          <Text style={textWhite}>{"Image"}</Text>
        </TouchableOpacity>
      </View>

      {selectedPhoto !== "" ? (
        <Image source={{ uri: selectedPhoto }} style={imageContainer} />
      ) : null}

      <TouchableOpacity style={postMessageButton} onPress={handlePostMessage}>
        <LinearGradient
            colors={['#26BCF2', '#82DAF9']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={gradient}>
          <Text style={postAccountCta}>Post</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}
