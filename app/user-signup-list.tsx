import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import { collection, getFirestore, getDocs } from "firebase/firestore";
import { Colors } from "@/constants/Colors";

export default function UserSignupTab() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const db = getFirestore();
      const usersCollection = collection(db, "users");
      const querySnapshot = await getDocs(usersCollection);
      const userData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setUsers(userData);
    };

    fetchUsers();
  }, []);

  const renderUserItem = ({ item }) => (
    <View style={styles.userContainer}>
      {item.profile ? (
        <Image
          source={{
            uri: item.profile,
          }}
          style={{ height: 50, width: 50, marginRight: 10, borderRadius: 10 }}
        />
      ) : null}
      <View>
        <Text style={styles.emailText}>Name: {item.name}</Text>
        <Text style={styles.emailText}>Email: {item.email}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Signup List</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={renderUserItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light.background,
  },
  title: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.light.text,
  },
  userContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: Colors.light.buttonBorder,
    padding: 20,
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: Colors.light.background,
    width: "100%",
  },
  emailText: {
    fontSize: 16,
    color: Colors.light.text,
  },
});
