import React, { useEffect, useState, useRef } from "react";
import { useFonts } from "expo-font";
import * as Updates from "expo-updates";
import RootNavigation from "./src/navigation/rootNavigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ActivityIndicator, StatusBar, View, AppState } from "react-native";
import { COLORS } from "./src/constant/COLORS";
import * as Notifications from "expo-notifications";
import { RegularText } from "./src/component/text/indext";

// Set global notification handler once at the app level
Notifications.setNotificationHandler({
  handleNotification: async (notification) => {
    console.log("Handling foreground notification:", notification);
    
    const data = notification.request.content.data;
    
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
      priority: data?.priority === 'high' ? Notifications.AndroidNotificationPriority.HIGH : Notifications.AndroidNotificationPriority.DEFAULT,
    };
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  // Handle app updates
  useEffect(() => {
    const checkForUpdates = async () => {
      if (!__DEV__) {
        try {
          setIsUpdating(true);
          const update = await Updates.checkForUpdateAsync();
          if (update.isAvailable) {
            console.log("Update available, fetching...");
            await Updates.fetchUpdateAsync();
            console.log("Update fetched, reloading...");
            await Updates.reloadAsync();
          }
        } catch (error) {
          console.error("Error checking for updates:", error);
        } finally {
          setIsUpdating(false);
        }
      }
    };

    checkForUpdates();
  }, []);

  // Handle app state changes
  useEffect(() => {
    const handleAppStateChange = (nextAppState: string) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log("App has come to the foreground");
        Notifications.setBadgeCountAsync(0);
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    };

    const subscription = AppState.addEventListener("change", handleAppStateChange);

    return () => {
      subscription?.remove();
    };
  }, []);

  // Notification listeners only - permissions handled in utils
  useEffect(() => {
    let foregroundSubscription: Notifications.Subscription;
    let responseSubscription: Notifications.Subscription;

    // Foreground notification listener
    foregroundSubscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Notification received in foreground:", {
          title: notification.request.content.title,
          body: notification.request.content.body,
          data: notification.request.content.data,
        });

        const notificationType = notification.request.content.data?.type;
        
        switch (notificationType) {
          case 'transaction':
            console.log("Transaction notification received");
            break;
          case 'security':
            console.log("Security notification received");
            break;
          default:
            console.log("General notification received");
        }
      }
    );

    // Notification response (tap on notification)
    responseSubscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("Notification tapped:", response);
        
        const { notification } = response;
        const data = notification.request.content.data;
        
        if (data?.screen) {
          console.log(`Should navigate to: ${data.screen}`);
          // Add navigation logic here
        }
        
        if (data?.action) {
          console.log(`Should perform action: ${data.action}`);
          // Handle specific actions from notification
        }
      }
    );

    // Cleanup listeners on unmount
    return () => {
      foregroundSubscription?.remove();
      responseSubscription?.remove();
    };
  }, []);

  const [fontsLoaded] = useFonts({
    "font-bold": require("./assets/fonts/Merienda-Bold.ttf"),
    "font-regular": require("./assets/fonts/Merienda-Regular.ttf"),
    "font-light": require("./assets/fonts/Merienda-Light.ttf"),
    "font-ExtraBold": require("./assets/fonts/Merienda-ExtraBold.ttf"),
  });

  if (!fontsLoaded || isUpdating) {
    return (
      <View style={{ 
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center",
        backgroundColor: COLORS.white 
      }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        {isUpdating && (
          <View style={{ marginTop: 20 }}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
            <RegularText size="medium">
              Updating...
            </RegularText>
          </View>
        )}
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