import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import AuthNavigation from "./authNavigation/authNavigation";
import MainNavigation from "./appNavigation/mainNavigation";
import useAuthStore from "../store/userStore";
import * as SecureStore from "expo-secure-store";

const TOKEN_EXPIRATION_DAYS = 7;

const isTokenExpired = async (): Promise<boolean> => {
  const loginDateStr = await SecureStore.getItemAsync("loginDate");

  if (!loginDateStr) return true;

  const loginDate = new Date(loginDateStr);
  const now = new Date();

  const diffInDays =
    (now.getTime() - loginDate.getTime()) / (1000 * 60 * 60 * 24);

  return diffInDays >= TOKEN_EXPIRATION_DAYS;
};

const RootNavigation = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuthStore();

  useEffect(() => {
    const checkTokenStatus = async () => {
      const token = await SecureStore.getItemAsync("token");
      const expired = await isTokenExpired();

      if (!token || expired) {
        await SecureStore.deleteItemAsync("token");
        await SecureStore.deleteItemAsync("loginDate");
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    };

    checkTokenStatus();
  }, [setIsAuthenticated]);

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default RootNavigation;
