import React, { useState, useEffect } from "react";
import {View, Text, StyleSheet, ActivityIndicator, Dimensions} from "react-native";
import { Colors } from "@/constants/Colors";
import { getFirestore, collection, getDocs, query, orderBy } from "firebase/firestore";
import {BarChart} from "react-native-chart-kit";

export default function DashBoardTab() {
    const [chartData, setChartData] = useState({
        labels: [],
        data: [0]
    });
    const [loading, setLoading] = useState(false);

    const chartConfig = {
        backgroundColor: Colors.light.background,
        backgroundGradientFrom: Colors.light.background,
        backgroundGradientTo: Colors.light.background,
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(255, 165, 38, ${opacity})`, // Orange color
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
            borderRadius: 16,

        },
    };
    useEffect(() => {
        const fetchUserGraphData = async () => {
            try {
                setLoading(true);
                const db = getFirestore();
                const usersCollection = collection(db, "users");
                const querySnapshot = await getDocs(query(usersCollection, orderBy("createdAt", "asc")));

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
                    const signUpMonth = getMonthYearString(user.createdAt);

                    if (!dataByMonth[signUpMonth]) {
                        dataByMonth[signUpMonth] = 0;
                    }

                    dataByMonth[signUpMonth]++;
                });

                const sortedMonths = Object.keys(dataByMonth);

                const data = sortedMonths.map((month) => dataByMonth[month]);

                setChartData({
                    labels: sortedMonths,
                    data
                });

                setLoading(false);
            } catch (error) {
                console.log('error', error);
                setLoading(false);
            }
        };

        fetchUserGraphData();
    }, []);


    const getMonthYearString = (date) => {
        try {
            const months = [
                "Jan", "Feb", "Mar", "Apr", "May", "June",
                "July", "Aug", "Sep", "Oct", "Nov", "Dec"
            ];

            const monthIndex = date.getMonth();
            const year = date.getFullYear();

            return `${months[monthIndex]} ${year}`;
        } catch (e) {
            console.log(e)
        }

    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator />
            ) : (
                <View style={styles.chartContainer}>
                    <Text style={styles.titleInside}>Performance Matrix</Text>
                    <BarChart
                        data={{
                            labels: chartData.labels,
                            datasets: [{
                                data: chartData.data,
                            }],
                        }}
                        width={Dimensions.get("window").width - 40}
                        height={220}
                        withVerticalLines={true}
                        chartConfig={chartConfig}
                        fromZero={true}
                        style={styles.chartStyle}
                    />
                </View>
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
    chartContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: '#E0E0E0',
        borderWidth: 1,
        paddingTop: 20,
    },
    titleInside: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.light.text,
        textAlign: 'left',
        paddingLeft: 18,
    },
    chartStyle: {
        borderRadius: 16,
        paddingLeft: 0,
    },
    title: {
        marginBottom: 20,
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.light.text,
    },
});
