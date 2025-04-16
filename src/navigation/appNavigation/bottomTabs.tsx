import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Home from "../../screen/main/home";
import { COLORS } from "../../constant/COLORS";
import Profile from "../../screen/main/profile";
import Transaction from "../../screen/main/transaction";
import Service from "../../screen/main/service";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "HOME") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Service") {
            iconName = focused ? "grid" : "grid-outline";
          } else if (route.name === "Transaction") {
            iconName = focused ? "newspaper" : "newspaper-outline";
          } else if (route.name === "PROFILE") {
            iconName = focused ? "person-circle" : "person-circle-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.secondaryColor,
        tabBarInactiveTintColor: COLORS.white,
        tabBarStyle: {
          backgroundColor: COLORS.primary,
          marginHorizontal: 20,
          marginBottom: 8,
          borderRadius: 50,
        },
      })}
    >
      <Tab.Screen
        name="HOME"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Service"
        component={Service}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Transaction"
        component={Transaction}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="PROFILE"
        component={Profile}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
