import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import {
  collection,
  getFirestore,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import firebaseApp from "../firebase";
import * as ImagePicker from "expo-image-picker";
import { getAuth, signOut } from "firebase/auth";
import { styles } from "./styles";
import { dateFormat } from "@/constants/String";
import { ListDataProps } from "@/app/app.types";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import { getStorage } from "@firebase/storage";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
const { buttonGradient } = Colors.light;

export default function ProfileTab() {
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
    gradient,
    imageContainer,
    selectImage,
    textWhite,
    centerImage,
    postButton,
  } = styles;
  const [messages, setMessages] = useState<ListDataProps[]>([]);
  const [isPostMessage, setIsPostMessage] = useState<string>("");
  const [selectedPhoto, setSelectedPhoto] = useState<string>("");
  const [loaderShow, setLoaderShow] = useState<boolean>(false);
  const navigation = useNavigation();

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
      quality: 0.2, // Adjust the quality here (0 to 1)
      base64: true, // Set to true if you want base64 representation
    });

    if (!result.canceled) {
      setSelectedPhoto(result.assets[0].uri);
    }
  };

  const handlePostMessage = async () => {
    if (loaderShow) {
      return;
    } else if (!isPostMessage.trim()) {
      alert("Please enter a message.");
      return;
    }

    setLoaderShow(true);
    const imageUpload = await uploadImage(selectedPhoto);
    try {
      const db = getFirestore(firebaseApp);
      await addDoc(collection(db, "messages"), {
        text: isPostMessage,
        createdAt: new Date(),
        email: user?.email,
        image: imageUpload || "",
      });
      setIsPostMessage("");
      setSelectedPhoto("");
      setLoaderShow(false);
    } catch (error) {
      alert("An error occurred while posting the message");
      console.log(error);
      setLoaderShow(false);
      setSelectedPhoto("");
    }
  };
  console.log("auth", auth);

  const logOutUser = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem("userToken");
      navigation.reset({
        index: 0,
        routes: [{ name: "login-screen" }],
      });
    } catch (error) {}
  };

  const uploadImage = async (imageUri: string) => {
    if (imageUri === "") {
      return "";
    }
    const firebaseStorage = getStorage(firebaseApp);
    const response = await fetch(imageUri);
    const blob = await response.blob();

    const imageName = `${Date.now()}.png`; // Replace with your desired filename

    const storageRef = ref(firebaseStorage, imageName);

    const uploadTask = uploadBytes(storageRef, blob);

    // Get the download URL after the upload is complete
    return uploadTask
      .then((snapshot) => {
        // Get the download URL
        return getDownloadURL(storageRef);
      })
      .then((downloadURL) => {
        // Use the download URL
        console.log("File uploaded successfully. Download URL:", downloadURL);
        return downloadURL;
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error uploading file:", error);
        return "";
      });
  };

  return (
    <View style={mainContainer}>
      <View style={textInputMainView}>
        <TouchableOpacity onPress={pickImage} style={selectImage}>
          <Text style={textWhite}>{"Upload"}</Text>
        </TouchableOpacity>
      </View>

      <View style={newPostContainer}>
        <Text style={newPostText}>{"User Detail"}</Text>
        <View style={newPostInsideContainer}>
          <Text style={newPostInsideText} numberOfLines={4}>
            Name: {global.userData.name ?? ""}
          </Text>
          <Text style={newPostInsideText}>
            Email: {global.userData.email ?? ""}
          </Text>
        </View>
      </View>

      {selectedPhoto !== "" ? (
        <Image source={{ uri: selectedPhoto }} style={imageContainer} />
      ) : null}

      <TouchableOpacity style={postMessageButton} onPress={handlePostMessage}>
        <LinearGradient
          colors={buttonGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={[gradient, postButton]}
        >
          {loaderShow ? (
            <ActivityIndicator />
          ) : (
            <Text style={postAccountCta}>Post</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity
        style={[postMessageButton, { marginTop: 40 }]}
        onPress={logOutUser}
      >
        <LinearGradient
          colors={buttonGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={[gradient, postButton]}
        >
          {loaderShow ? (
            <ActivityIndicator />
          ) : (
            <Text style={postAccountCta}>Log Out</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}
