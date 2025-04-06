import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";
import { useEffect, useState } from "react";

// Registering for push notifications
export function usePushNotification() {
  const [pushToken, setPushToken] = useState<string | null>(null);

  useEffect(() => {
    const registerForPushNotificationsAsync = async () => {
      let token: string | null = null;

      if (Device.isDevice) {
        try {
          // Check for existing permissions and request permissions if not granted
          const { status: existingStatus } =
            await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;

          if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }

          if (finalStatus !== "granted") {
            console.log("Failed to get push token for push notification!");
            return; // Early return if permission isn't granted
          }

          // Get the Expo push token
          const response = await Notifications.getExpoPushTokenAsync();
          token = response.data;

          // On Android, set the notification channel
          if (Platform.OS === "android") {
            await Notifications.setNotificationChannelAsync("default", {
              name: "default",
              importance: Notifications.AndroidImportance.DEFAULT,
            });
          }

          setPushToken(token); // Store the push token in state
        } catch (error) {
          console.error("Error getting push token:", error);
        }
      } else {
        console.log("Must use a physical device for Push Notifications");
      }
    };

    registerForPushNotificationsAsync();
  }, []);

  return pushToken;
}
