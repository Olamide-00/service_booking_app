import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import * as Updates from "expo-updates";
import AppLoading from "expo-app-loading";
import RootNavigation from "./src/navigation/rootNavigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ActivityIndicator, Alert, View } from "react-native";

const queryClient = new QueryClient();

const App = () => {
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const checkForUpdates = async () => {
      try {
        setIsUpdating(true);
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        }
      } catch (error) {
      } finally {
        setIsUpdating(false);
      }
    };

    checkForUpdates();
  }, []);

  const [fontsLoaded] = useFonts({
    "font-bold": require("./assets/fonts/Merienda-Bold.ttf"),
    "font-regular": require("./assets/fonts/Merienda-Regular.ttf"),
    "font-light": require("./assets/fonts/Merienda-Light.ttf"),
    "font-ExtraBold": require("./assets/fonts/Merienda-ExtraBold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <RootNavigation />
    </QueryClientProvider>
  );
};

export default App;
