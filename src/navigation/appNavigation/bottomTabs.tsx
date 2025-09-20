import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { View, Platform } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Home from "../../screen/main/home";
import { COLORS } from "../../constant/COLORS";
import Profile from "../../screen/main/profile";
import Transaction from "../../screen/main/transaction";
import Service from "../../screen/main/service";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RegularText } from "@/src/component/text/indext";

const Tab = createBottomTabNavigator();

const TabBarBackground = ({ children }) => (
  <LinearGradient
    colors={['#667eea', '#764ba2']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={{
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: '100%',
      borderRadius: 25,
    }}
  >
    {/* Glassmorphism effect overlay */}
    <View style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 2,
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
    }} />
    {children}
  </LinearGradient>
);

const CustomTabBarIcon = ({ focused, iconName, route }) => {
  return (
    <View style={{
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    }}>
      {/* Active indicator background */}
      {focused && (
        <View style={{
          position: 'absolute',
          width: wp("12%"),
          height: hp("4.5%"),
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          borderRadius: 20,
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.2)',
        }} />
      )}
      
      {/* Icon container */}
      <View style={{
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: hp("0.5%"),
        zIndex: 2,
      }}>
        <Ionicons 
          name={iconName} 
          size={focused ? 24 : 22} 
          color={focused ? '#ffffff' : 'rgba(255, 255, 255, 0.7)'}
          style={{
            textShadowColor: focused ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
            textShadowOffset: { width: 0, height: 1 },
            textShadowRadius: 2,
          }}
        />
        
        {/* Active dot indicator */}
        {focused && (
          <View style={{
            width: 4,
            height: 4,
            backgroundColor: '#ffffff',
            borderRadius: 2,
            marginTop: hp("0.3%"),
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 1,
          }} />
        )}
      </View>
    </View>
  );
};

const CustomTabBarLabel = ({ focused, labelName }) => {
  return (
    <RegularText 
      size="small" 
      style={{
        color: focused ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
        fontWeight: focused ? '600' : '400',
        textShadowColor: focused ? 'rgba(0, 0, 0, 0.15)' : 'transparent',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 1,
        marginTop: hp("0.2%"),
      }}
    >
      {labelName}
    </RegularText>
  );
};

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === "HOME") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Service") {
            iconName = focused ? "grid" : "grid-outline";
          } else if (route.name === "Transaction") {
            iconName = focused ? "receipt" : "receipt-outline";
          } else if (route.name === "PROFILE") {
            iconName = focused ? "person-circle" : "person-circle-outline";
          }

          return (
            <CustomTabBarIcon 
              focused={focused} 
              iconName={iconName} 
              route={route.name} 
            />
          );
        },
        tabBarLabel: ({ focused }) => {
          let labelName;

          if (route.name === "HOME") {
            labelName = "Home";
          } else if (route.name === "Service") {
            labelName = "Services";
          } else if (route.name === "Transaction") {
            labelName = "History";
          } else if (route.name === "PROFILE") {
            labelName = "Profile";
          }

          return (
            <CustomTabBarLabel focused={focused} labelName={labelName} />
          );
        },
        tabBarStyle: {
          position: 'absolute',
          bottom: Platform.OS === 'ios' ? hp("2.2%") : hp("1.8%"),
          left: wp("5%"),
          right: wp("5%"),
          height: hp("8%"),
          backgroundColor: 'transparent',
          marginHorizontal: wp("1%"),
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.25,
          shadowRadius: 12,
          borderRadius: 25,
          paddingTop: hp("0.5%"),
          paddingBottom: Platform.OS === 'ios' ? hp("1%") : hp("0.8%"),
        },
        tabBarBackground: () => <TabBarBackground />,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.5)',
      })}
    >
      <Tab.Screen
        name="HOME"
        component={Home}
        options={{ 
          headerShown: false,
          tabBarItemStyle: {
            marginHorizontal: wp("1%"),
          }
        }}
      />
      <Tab.Screen
        name="Service"
        component={Service}
        options={{ 
          headerShown: false,
          tabBarItemStyle: {
            marginHorizontal: wp("1%"),
          }
        }}
      />
      <Tab.Screen
        name="Transaction"
        component={Transaction}
        options={{ 
          headerShown: false,
          tabBarItemStyle: {
            marginHorizontal: wp("1%"),
          }
        }}
      />
      <Tab.Screen
        name="PROFILE"
        component={Profile}
        options={{ 
          headerShown: false,
          tabBarItemStyle: {
            marginHorizontal: wp("1%"),
          }
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;