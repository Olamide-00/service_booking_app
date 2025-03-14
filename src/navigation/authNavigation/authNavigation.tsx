import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Login from "@/src/screen/auth/login";
import OnboardingScreen from "@/src/screen/auth/onboarding";
import SignUp from "@/src/screen/auth/signUp";
import useAuthStore from "@/src/store/userStore";
import OTPInput from "@/src/screen/auth/otpInput";
import Success from "@/src/screen/auth/success";
import ForgetPassword from "@/src/screen/auth/forgetPassword";
import ResetPassword from "@/src/screen/auth/resetPassword";

const Stack = createStackNavigator();

const AuthNavigation = () => {
  const isOnboarded = useAuthStore((state) => state.isOnboarded);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={isOnboarded ? "Login" : "OnboardingScreen"}
    >
      {!isOnboarded && (
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
      )}
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="OTPInput" component={OTPInput} />
      <Stack.Screen name="Success" component={Success} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
