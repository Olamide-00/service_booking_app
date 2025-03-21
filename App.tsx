import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import * as Updates from "expo-updates";
import RootNavigation from "./src/navigation/rootNavigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ActivityIndicator, View } from "react-native";
import { COLORS } from "./src/constant/COLORS";

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
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="small" color={COLORS.primary} />
      </View>
    );
  }
  return (
    <QueryClientProvider client={queryClient}>
      <RootNavigation />
    </QueryClientProvider>
  );
};

export default App;
