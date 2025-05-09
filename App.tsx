import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import * as Updates from "expo-updates";
import RootNavigation from "./src/navigation/rootNavigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ActivityIndicator, StatusBar, View } from "react-native";
import { COLORS } from "./src/constant/COLORS";
import * as Notifications from "expo-notifications";

// Set global notification handler once at the app level
Notifications.setNotificationHandler({
  handleNotification: async (notification) => {
    console.log("Handling foreground notification:", notification);
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    };
  },
});

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

  // Listening for push notifications
  useEffect(() => {
    // Foreground notification listener
    const foregroundSubscription =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Notification received in foreground:", notification);
      });

    // Notification response (tap on notification)
    const responseSubscription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        // Extract notification data
        const { notification } = response;
        const data = notification.request.content.data;
      });

    // Cleanup listeners on unmount
    return () => {
      foregroundSubscription.remove();
      responseSubscription.remove();
    };
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
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
    </QueryClientProvider>
  );
};

export default App;
