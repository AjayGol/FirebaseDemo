import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import {
  collection,
  getFirestore,
  addDoc,
  onSnapshot,
} from 'firebase/firestore';
import firebaseApp from '../firebase';
import { getAuth } from 'firebase/auth';
import { styles } from './styled';

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
  const [isPostMessage, setIsPostMessage] = useState('');
  const auth = getAuth(firebaseApp);
  const user = auth.currentUser;

  useEffect(() => {
    const unsubscribe = onSnapshot(
        collection(getFirestore(firebaseApp), 'messages'),
        snapshot => {
          const messagesData = snapshot.docs.map(doc => ({
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
        await addDoc(collection(db, 'messages'), {
          text: isPostMessage,
          createdAt: new Date(),
          email: user?.email,
        });
        setIsPostMessage('');
        setMessages(prevMessages => [
          ...prevMessages,
          { text: isPostMessage, createdAt: new Date(), email: user?.email },
        ]);
      } else {
        alert('Please enter a message.');
      }
    } catch (error) {
      alert('An error occurred while posting the message');
    }
  };

  const formatDateTime = dateObject => {
    const date = new Date(dateObject * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const timeComponent = `${hours % 12 === 0 ? 12 : hours % 12}:${
        minutes < 10 ? '0' : ''
    }${minutes}${hours < 12 ? 'am' : 'pm'}`;

    const dateComponent = `${day < 10 ? '0' : ''}${day}/${
        month < 10 ? '0' : ''
    }${month}/${year}`;

    return `${timeComponent}, ${dateComponent}`;
  };

  return (
      <View style={mainContainer}>
        <View style={newPostContainer}>
          <Text style={newPostText}>{'Newest Post'}</Text>
          <View style={newPostInsideContainer}>
            <Text style={newPostInsideText}>Post: {messages[0]?.text}</Text>
            <Text style={newPostInsideText}>Email: {user?.email}</Text>
            <Text style={newPostInsideText}>
              Time Posted:{' '}
              {messages[0]?.createdAt?.seconds
                  ? formatDateTime(messages[0]?.createdAt?.seconds)
                  : ''}
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
          <Text style={postAccountCta}>{'Post'}</Text>
        </TouchableOpacity>
      </View>
  );
}
