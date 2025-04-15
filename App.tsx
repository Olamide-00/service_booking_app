import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import * as Updates from "expo-updates";
import RootNavigation from "./src/navigation/rootNavigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ActivityIndicator, StatusBar, View } from "react-native";
import { COLORS } from "./src/constant/COLORS";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";

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

  // listening for push notifications
  useEffect(() => {
    // Set the notification handler to control how notifications are displayed
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

    // Foreground notification listener
    const foregroundSubscription =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Notification received in foreground:", notification);
      });

    // Notification response (tap on notification)
    const responseSubscription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification tapped:", response);
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
      <StatusBar barStyle={"dark-content"} />
      <RootNavigation />
    </QueryClientProvider>
  );
};

export default App;
