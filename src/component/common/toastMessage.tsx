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
  Dimensions,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
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
  position?: 'top' | 'bottom';
  variant?: 'gradient' | 'solid' | 'glass';
};

const ToastMessage = ({
  message,
  isVisible,
  isSuccessful = true,
  actionLabel,
  onAction,
  onClose,
  position = 'bottom',
  variant = 'gradient',
}: Props) => {
  const translateY = useRef(new Animated.Value(position === 'top' ? -hp("15%") : hp("15%"))).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.9)).current;

  // Get colors based on success state
  const getColors = () => {
    if (isSuccessful) {
      return {
        gradient: ['#10B981', '#0a976bff', '#071b16ff'],
        solid: '#10B981',
        glass: 'rgba(16, 185, 129, 0.9)',
        icon: 'checkmark-circle',
      };
    } else {
      return {
        gradient: ['#EF4444', '#DC2626', '#B91C1C'],
        solid: '#EF4444',
        glass: 'rgba(239, 68, 68, 0.9)',
        icon: 'alert-circle',
      };
    }
  };

  const colors = getColors();

  // Enhanced animation with spring effect
  useEffect(() => {
    if (isVisible) {
      AccessibilityInfo.announceForAccessibility(message);
      
      // Reset values
      translateY.setValue(position === 'top' ? -hp("15%") : hp("15%"));
      opacity.setValue(0);
      scale.setValue(0.9);

      // Animate in with spring effect
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();

      const timer = setTimeout(() => {
        // Animate out
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: position === 'top' ? -hp("15%") : hp("15%"),
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 0.9,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start(onClose);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, message, onClose, opacity, translateY, scale, position]);

  

  const renderContent = () => (
    <>
      <View style={styles.iconContainer}>
        <Ionicons
          name={colors.icon as any}
          size={hp("2.5%")}
          color="#fff"
        />
      </View>
      <View style={styles.contentContainer}>
        <Text
          style={styles.message}
          numberOfLines={3}
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
      </View>
      <View style={styles.dismissIndicator} />
    </>
  );

  // Fixed: Use Animated.View instead of regular View for the container
  return (
    <Modal visible={isVisible} transparent animationType="none">
      <Animated.View 
        style={[
          styles.container,
          position === 'top' ? styles.topContainer : styles.bottomContainer,
          {
            transform: [{ translateY }, { scale }],
            opacity,
          },
        ]}
      >
        {variant === 'gradient' && (
          <LinearGradient
            colors={colors.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientBackground}
          >
            {renderContent()}
          </LinearGradient>
        )}
        
        {variant === 'solid' && (
          <View style={[styles.solidBackground, { backgroundColor: colors.solid }]}>
            {renderContent()}
          </View>
        )}
        
        {variant === 'glass' && (
          <View style={[styles.glassBackground, { backgroundColor: colors.glass }]}>
            <View style={styles.glassOverlay} />
            {renderContent()}
          </View>
        )}
      </Animated.View>
    </Modal>
  );
};

export default ToastMessage;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: wp("4%"),
    right: wp("4%"),
    maxWidth: wp("92%"),
    alignSelf: 'center',
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 8,
  },
  topContainer: {
    top: Platform.OS === 'ios' ? hp("8%") : hp("6%"),
  },
  bottomContainer: {
    bottom: hp("5%"),
  },
  gradientBackground: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: hp("1.8%"),
    paddingHorizontal: wp("4%"),
    borderRadius: 16,
    minHeight: hp("7%"),
  },
  solidBackground: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: hp("1.8%"),
    paddingHorizontal: wp("4%"),
    borderRadius: 16,
    minHeight: hp("7%"),
  },
  glassBackground: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: hp("1.8%"),
    paddingHorizontal: wp("4%"),
    borderRadius: 16,
    minHeight: hp("7%"),
    backdropFilter: 'blur(10px)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  glassOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
  },
  iconContainer: {
    width: hp("4%"),
    height: hp("4%"),
    borderRadius: hp("2%"),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp("3%"),
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    color: "#fff",
    fontSize: hp("1.9%"),
    fontWeight: '500',
    lineHeight: hp("2.4%"),
    letterSpacing: 0.3,
  },
  actionButton: {
    marginTop: hp("0.8%"),
    paddingVertical: hp("0.6%"),
    paddingHorizontal: wp("3%"),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  actionText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: hp("1.6%"),
    letterSpacing: 0.5,
  },
  dismissIndicator: {
    width: 4,
    height: hp("3%"),
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    marginLeft: wp("2%"),
  },
});