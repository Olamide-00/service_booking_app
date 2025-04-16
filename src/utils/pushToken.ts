import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";
import { useEffect, useState } from "react";

// Add global notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Registering for push notifications
export function usePushNotification() {
  const [pushToken, setPushToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const registerForPushNotificationsAsync = async () => {
      try {
        setLoading(true);
        let token: string | null = null;

        if (!Device.isDevice) {
          console.log("Must use a physical device for Push Notifications");
          setLoading(false);
          return;
        }

        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }

        if (finalStatus !== "granted") {
          console.log("Failed to get push token for push notification!");
          setLoading(false);
          return;
        }
        // Make sure to replace this with your actual project ID
        const response = await Notifications.getExpoPushTokenAsync({
          projectId: "fc1576b7-d071-4db6-ba03-d48d3fc3f810",
        });

        token = response.data;
        console.log("Expo Push Token:", token);
        setPushToken(token);
      } catch (error) {
        console.error("Error getting push token:", error);
        setError(error instanceof Error ? error : new Error(String(error)));
      } finally {
        setLoading(false);
      }
    };

    registerForPushNotificationsAsync();
  }, []);

  return {
    pushToken,
    loading,
    error,
  };
}
