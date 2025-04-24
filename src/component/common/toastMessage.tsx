import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Modal,
  Animated,
  PanResponder,
  Text,
  TouchableOpacity,
  AccessibilityInfo,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS } from "@/src/constant/COLORS";

type Props = {
  message: string;
  isVisible: boolean;
  isSuccessful?: boolean;
  actionLabel?: string;
  onAction?: () => void;
  onClose: () => void;
};

const ToastMessage = ({
  message,
  isVisible,
  isSuccessful = true,
  actionLabel,
  onAction,
  onClose,
}: Props) => {
  const translateY = useRef(new Animated.Value(hp("10%"))).current;
  const opacity = useRef(new Animated.Value(0)).current;

  // Announce and animate in/out
  useEffect(() => {
    if (isVisible) {
      AccessibilityInfo.announceForAccessibility(message);
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: hp("10%"),
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start(onClose);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, message, onClose, opacity, translateY]);

  // Swipe to dismiss
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, { dy }) => dy > 5,
      onPanResponderMove: (_, { dy }) => translateY.setValue(dy),
      onPanResponderRelease: (_, { dy }) => {
        if (dy > 50) {
          onClose();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  return (
    <Modal visible={isVisible} transparent animationType="none">
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.container,
          {
            backgroundColor: isSuccessful
              ? COLORS.primary
              : COLORS.secondaryColor,
            transform: [{ translateY }],
            opacity,
          },
        ]}
      >
        <Ionicons
          name={isSuccessful ? "checkmark-circle" : "alert-circle"}
          size={hp("3%")}
          color="#fff"
          style={styles.icon}
        />
        <Text
          style={styles.message}
          numberOfLines={2}
          accessible
          accessibilityRole="text"
        >
          {message}
        </Text>
        {actionLabel && onAction && (
          <TouchableOpacity
            onPress={onAction}
            style={styles.actionButton}
            accessibilityRole="button"
          >
            <Text style={styles.actionText}>{actionLabel}</Text>
          </TouchableOpacity>
        )}
      </Animated.View>
    </Modal>
  );
};

export default ToastMessage;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: hp("5%"),
    left: wp("5%"),
    right: wp("5%"),
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: hp("1.2%"),
    paddingHorizontal: wp("4%"),
    borderRadius: 24, // Pill shape :contentReference[oaicite:18]{index=18}
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  icon: {
    marginRight: wp("2%"),
  },
  message: {
    flex: 1,
    color: "#fff",
    fontSize: hp("2%"),
  },
  actionButton: {
    marginLeft: wp("3%"),
    paddingVertical: hp("0.5%"),
    paddingHorizontal: wp("2%"),
  },
  actionText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: hp("1.8%"),
  },
});
