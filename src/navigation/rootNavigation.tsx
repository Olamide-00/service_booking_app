import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import AuthNavigation from "./authNavigation/authNavigation";
import MainNavigation from "./appNavigation/mainNavigation";
import useAuthStore from "../store/userStore";

const TOKEN_EXPIRATION_DAYS = 7;

const isTokenExpired = (loginDateStr: string | null): boolean => {
  if (!loginDateStr) return true;
  const loginDate = new Date(loginDateStr);
  const now = new Date();
  const diffInDays =
    (now.getTime() - loginDate.getTime()) / (1000 * 60 * 60 * 24);
  return diffInDays >= TOKEN_EXPIRATION_DAYS;
};

const RootNavigation = () => {
  const { token, loginDate, isAuthenticated, setIsAuthenticated } =
    useAuthStore();

  useEffect(() => {
    const checkTokenStatus = () => {
      const expired = isTokenExpired(loginDate);
      if (!token || expired) {
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    };

    checkTokenStatus();
  }, [token, loginDate, setIsAuthenticated]);

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default RootNavigation;
