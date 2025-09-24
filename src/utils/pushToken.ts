import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";
import { useEffect, useState, useRef } from "react";

// Types for better type safety
interface PushNotificationState {
  pushToken: string | null;
  loading: boolean;
  error: Error | null;
  isRegistered: boolean;
}

interface NotificationChannel {
  id: string;
  name: string;
  importance: Notifications.AndroidImportance;
  sound?: string;
  vibrationPattern?: number[];
  lightColor?: string;
}

// Constants
const PROJECT_ID = "fc1576b7-d071-4db6-ba03-d48d3fc3f810";

// Remove the global notification handler from here since it's already set in App.js
// This prevents conflicts and double handlers

// Setup Android notification channels
const setupAndroidChannels = async (): Promise<void> => {
  if (Platform.OS === 'android') {
    const channels: NotificationChannel[] = [
      {
        id: 'default',
        name: 'Default Notifications',
        importance: Notifications.AndroidImportance.DEFAULT,
      },
      {
        id: 'high-priority',
        name: 'High Priority',
        importance: Notifications.AndroidImportance.HIGH,
        sound: 'default',
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF0000',
      },
      {
        id: 'transaction',
        name: 'Transaction Alerts',
        importance: Notifications.AndroidImportance.HIGH,
        sound: 'default',
        vibrationPattern: [0, 500, 200, 500],
      },
      {
        id: 'security',
        name: 'Security Alerts',
        importance: Notifications.AndroidImportance.MAX,
        sound: 'default',
        vibrationPattern: [0, 1000, 500, 1000],
        lightColor: '#FF4444',
      }
    ];

    // Create all channels
    for (const channel of channels) {
      await Notifications.setNotificationChannelAsync(channel.id, {
        name: channel.name,
        importance: channel.importance,
        sound: channel.sound,
        vibrationPattern: channel.vibrationPattern,
        lightColor: channel.lightColor,
      });
    }

    console.log('✅ Android notification channels configured');
  }
};

// Enhanced hook for push notifications
export function usePushNotification(): PushNotificationState {
  const [state, setState] = useState<PushNotificationState>({
    pushToken: null,
    loading: true,
    error: null,
    isRegistered: false,
  });
  
  const isInitialized = useRef(false);

  useEffect(() => {
    // Prevent double initialization
    if (isInitialized.current) return;
    isInitialized.current = true;

    const registerForPushNotificationsAsync = async (): Promise<void> => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));

        // Check if running on physical device
        if (!Device.isDevice) {
          const error = new Error("Push notifications require a physical device");
          console.warn("⚠️ Must use a physical device for Push Notifications");
          setState(prev => ({ ...prev, error, loading: false }));
          return;
        }

        // Setup Android channels first
        await setupAndroidChannels();

        // Check existing permissions
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        console.log(`📱 Current notification permission status: ${existingStatus}`);

        // Request permissions if not granted
        if (existingStatus !== "granted") {
          console.log("🔔 Requesting notification permissions...");
          const { status } = await Notifications.requestPermissionsAsync({
            ios: {
              allowAlert: true,
              allowBadge: true,
              allowSound: true,
              allowAnnouncements: true,
            },
          });
          finalStatus = status;
        }

        if (finalStatus !== "granted") {
          const error = new Error("Notification permissions not granted");
          console.error("❌ Failed to get push token for push notification!");
          setState(prev => ({ ...prev, error, loading: false }));
          return;
        }

        console.log("✅ Notification permissions granted");

        // Get Expo push token
        console.log("🎫 Getting Expo push token...");
        const tokenResponse = await Notifications.getExpoPushTokenAsync({
          projectId: PROJECT_ID,
        });

        const token = tokenResponse.data;
        console.log("🎉 Expo Push Token obtained:", token);

        setState({
          pushToken: token,
          loading: false,
          error: null,
          isRegistered: true,
        });

        // Optional: Send token to your backend here
        // await sendTokenToBackend(token);

      } catch (error) {
        const errorObj = error instanceof Error ? error : new Error(String(error));
        console.error("💥 Error getting push token:", errorObj.message);
        
        setState(prev => ({
          ...prev,
          error: errorObj,
          loading: false,
          isRegistered: false,
        }));
      }
    };

    registerForPushNotificationsAsync();
  }, []);

  return state;
}

// Utility function to send local notifications (for testing)
export const sendLocalNotification = async (
  title: string,
  body: string,
  data?: Record<string, any>,
  channelId: string = 'default'
): Promise<void> => {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data,
        sound: 'default',
      },
      trigger: null, // Send immediately
      channelId: Platform.OS === 'android' ? channelId : undefined,
    });
    console.log(`📤 Local notification sent: ${title}`);
  } catch (error) {
    console.error('❌ Error sending local notification:', error);
  }
};

// Utility function to clear all notifications
export const clearAllNotifications = async (): Promise<void> => {
  try {
    await Notifications.dismissAllNotificationsAsync();
    await Notifications.setBadgeCountAsync(0);
    console.log('🧹 All notifications cleared');
  } catch (error) {
    console.error('❌ Error clearing notifications:', error);
  }
};

// Utility function to cancel scheduled notifications
export const cancelScheduledNotifications = async (): Promise<void> => {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
    console.log('🚫 All scheduled notifications cancelled');
  } catch (error) {
    console.error('❌ Error cancelling scheduled notifications:', error);
  }
};

// Get notification settings (useful for debugging)
export const getNotificationSettings = async (): Promise<Notifications.NotificationPermissionsStatus | null> => {
  try {
    const settings = await Notifications.getPermissionsAsync();
    console.log('⚙️ Notification settings:', settings);
    return settings;
  } catch (error) {
    console.error('❌ Error getting notification settings:', error);
    return null;
  }
};

// Hook to listen for notification interactions (optional alternative to App.js setup)
export const useNotificationListener = (
  onNotificationReceived?: (notification: Notifications.Notification) => void,
  onNotificationResponse?: (response: Notifications.NotificationResponse) => void
) => {
  useEffect(() => {
    let receivedSubscription: Notifications.Subscription;
    let responseSubscription: Notifications.Subscription;

    if (onNotificationReceived) {
      receivedSubscription = Notifications.addNotificationReceivedListener(onNotificationReceived);
    }

    if (onNotificationResponse) {
      responseSubscription = Notifications.addNotificationResponseReceivedListener(onNotificationResponse);
    }

    return () => {
      receivedSubscription?.remove();
      responseSubscription?.remove();
    };
  }, [onNotificationReceived, onNotificationResponse]);
};