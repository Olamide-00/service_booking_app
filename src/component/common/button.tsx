import React, { memo } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  ActivityIndicator,
  GestureResponderEvent,
  View,
} from "react-native";
import { AppTextProps, RegularText } from "./text";

// 🎨 Use same design tokens (can be extracted to a theme file)
const COLORS = {
  primary: "#007AFF",
  secondary: "#555555",
  white: "#FFFFFF",
  disabled: "#CCCCCC",
  loadingOverlay: "rgba(255, 255, 255, 0.4)",
} as const;

export interface ButtonProps {
  /**
   * Button label text
   */
  title: string;

  /**
   * Called when the button is pressed
   */
  onPress?: (event: GestureResponderEvent) => void;

  /**
   * Disable button interaction
   */
  disabled?: boolean;

  /**
   * Show loading spinner
   */
  isLoading?: boolean;

  /**
   * Custom background color
   * @default COLORS.primary
   */
  bgColor?: string;

  /**
   * Text color
   * @default COLORS.white
   */
  textColor?: string;

  /**
   * Button width
   */
  width?: number | string;

  /**
   * Additional custom styles
   */
  style?: ViewStyle | ViewStyle[];

  /**
   * Font size
   */
  fontSize?: number;
}

/**
 * 🚀 Reusable Button Component
 * Consistent, theme-ready, accessible, and type-safe
 */
const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled = false,
  isLoading = false,
  bgColor = COLORS.primary,
  textColor = COLORS.white,
  width = "100%",
  style,
  fontSize = 16,
}) => {
  const isInactive = disabled || isLoading;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={isInactive}
      onPress={onPress}
      style={[
        styles.button,
        { backgroundColor: bgColor, width, opacity: isInactive ? 0.6 : 1 },
        style,
      ]}
    >
      <View style={styles.content}>
        {isLoading && (
          <ActivityIndicator
            size="small"
            color={textColor}
            style={{ marginRight: 8 }}
          />
        )}
        <RegularText color="white" size="md" style={{ color: textColor, fontSize }}>
          {title}
        </RegularText>
      </View>
    </TouchableOpacity>
  );
};

// 🧠 Memoize for performance
export default memo(Button);

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
