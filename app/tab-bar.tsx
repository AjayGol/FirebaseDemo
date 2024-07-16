import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileTab from "@/app/profile-tab";
import { Ionicons } from "@expo/vector-icons"; // You can use any icon library
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import UserSignupTab from "@/app/user-signup-list";
import ContactFormTab from "@/app/contact-form-tab";
import DashBoardTab from "@/app/dashboard-tab";

export default function TabBar() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === "Tab1") {
            // You can return any component that you like here!
            return <Ionicons name={"home"} size={size} color={color} />;
          } else if (route.name === "Tab2") {
            return (
              <MaterialIcons name={"dashboard"} size={size} color={color} />
            );
          } else if (route.name === "Tab3") {
            return <AntDesign name={"profile"} size={size} color={color} />;
          } else if (route.name === "Tab4") {
            return <AntDesign name={"contacts"} size={size} color={color} />;
          } else if (route.name === "Tab5") {
            return <Entypo name={"users"} size={size} color={color} />;
          }
          return null;
        },
        tabBarShowLabel: true, // This will hide the labels
      })}
    >
      <Tab.Screen
        name="Tab1"
        component={Tab1Screen}
        options={{ tabBarLabel: "Home" }}
      />
      <Tab.Screen
        name="Tab2"
        component={DashBoardTab}
        options={{ tabBarLabel: "Dashboard" }}
      />
      <Tab.Screen
        name="Tab3"
        component={ContactFormTab}
        options={{ tabBarLabel: "Contact Form" }}
      />
      <Tab.Screen
        name="Tab4"
        component={ProfileTab}
        options={{ tabBarLabel: "Profile" }}
      />
      <Tab.Screen
        name="Tab5"
        component={UserSignupTab}
        options={{ tabBarLabel: "User SignUp" }}
      />
    </Tab.Navigator>
  );
}

function Tab1Screen() {
  return <View style={{ flex: 1, backgroundColor: "red" }} />;
}
