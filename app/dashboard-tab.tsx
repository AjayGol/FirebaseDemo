import React, { useState, useEffect } from "react";
import {View, Text, StyleSheet, ActivityIndicator} from "react-native";
import { Colors } from "@/constants/Colors";
import { collection, getDocs, getFirestore } from "firebase/firestore";

export default function DashBoardTab() {
    const [chartData, setChartData] = useState({
        labels: [],
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUserGraphData = async () => {
            try {
                setLoading(true);
                const db = getFirestore();
                const usersCollection = collection(db, "users");
                const querySnapshot = await getDocs(usersCollection);

                const userData = querySnapshot.docs.map((doc) => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        name: data.name,
                        createdAt: data.createdAt.toDate(),
                    };
                });

                // Process userData to count sign-ups by month
                const dataByMonth = {};
                userData.forEach((user) => {
                    console.log('user', user?.name);
                    const signUpMonth = getMonthYearString(user.createdAt);

                    if (!dataByMonth[signUpMonth]) {
                        dataByMonth[signUpMonth] = 0;
                    }

                    dataByMonth[signUpMonth]++;
                });
                const sortedMonths = Object.keys(dataByMonth).sort(
                    (a, b) => new Date(a) - new Date(b)
                );
                const data = sortedMonths.map((month) => dataByMonth[month]);

                setChartData({
                    labels: sortedMonths,
                });

                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };

        fetchUserGraphData();
    }, []);


    const getMonthYearString = (date) => {
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const monthIndex = date.getMonth();
        const year = date.getFullYear();

        return `${months[monthIndex]} ${year}`;
    };

    console.log("chartData", chartData);
    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator />
            ) : (
                    <Text style={styles.title}>User SignUp By Month</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.light.background,
        padding: 20,
    },
    title: {
        marginBottom: 20,
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.light.text,
    },
});
