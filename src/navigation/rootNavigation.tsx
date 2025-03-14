import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import AuthNavigation from "./authNavigation/authNavigation";
import MainNavigation from "./appNavigation/mainNavigation";
import useAuthStore from "../store/userStore";

const RootNavigation = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default RootNavigation;
