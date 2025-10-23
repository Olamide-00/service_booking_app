import React, { memo } from "react";
import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleSheet,
  TextStyle,
} from "react-native";
import { COLORS } from "../../constant/color";



const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
} as const;

type ColorKey = keyof typeof COLORS;
type FontSizeKey = keyof typeof FONT_SIZES;

export interface AppTextProps extends RNTextProps {
  /**
   * Choose predefined color from theme
   * @default "primary"
   */
  color?: ColorKey;
  /**
   * Predefined text size
   * @default "md"
   */
  size?: FontSizeKey;
  /**
   * Optional custom style
   */
  style?: TextStyle | TextStyle[];
  /**
   * Font weight variant
   */
  weight?: "regular" | "bold" | "medium" | "semibold";
  /**
   * Text alignment
   */
  align?: "auto" | "left" | "right" | "center" | "justify";
  /**
   * Disable text auto scaling across OS (for consistent design)
   * @default true
   */
  noScale?: boolean;
  children: React.ReactNode;
}

/**
 * 🚀 Reusable Text Component
 * Consistent text styling across the app
 */
const AppText: React.FC<AppTextProps> = ({
  color = "primary",
  size = "md",
  style,
  weight = "regular",
  align = "auto",
  noScale = true,
  children,
  ...props
}) => {
  const textStyle: TextStyle = {
    color: COLORS[color],
    fontSize: FONT_SIZES[size],
    textAlign: align,
    fontWeight:
      weight === "bold"
        ? "700"
        : weight === "semibold"
        ? "600"
        : weight === "medium"
        ? "500"
        : "400",
  };

  return (
    <RNText
      {...props}
      allowFontScaling={!noScale}
      style={StyleSheet.flatten([textStyle, style])}
    >
      {children}
    </RNText>
  );
};

// 🧠 Memoize for performance
export default memo(AppText);

// Optional convenience wrappers
export const BoldText = (props: Omit<AppTextProps, "weight">) => (
  <AppText {...props} weight="bold" />
);

export const RegularText = (props: Omit<AppTextProps, "weight">) => (
  <AppText {...props} weight="regular" />
);
