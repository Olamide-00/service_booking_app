import React from "react";
import { Text, StyleSheet, TextProps } from "react-native";

const TEXT_SIZES = {
  small: 9,
  medium: 11,
  large: 15,
  xlarge: 18,
} as const;

const TEXT_COLORS = {
  primary: "#2A2A72",
  white: "#FFFFFF",
  black: "#000000",
  gray: "gray",
  secondaryColor: "#F77F00",
  error: "#FF0000",
} as const;

type TextSize = keyof typeof TEXT_SIZES;
type TextColor = keyof typeof TEXT_COLORS;

interface CustomTextProps extends TextProps {
  size: TextSize;
  color?: TextColor;
}

export const RegularText: React.FC<CustomTextProps> = ({
  size,
  color = "black",
  style,
  ...props
}) => (
  <Text
    allowFontScaling={false}
    style={[
      styles.regular,
      { fontSize: TEXT_SIZES[size], color: TEXT_COLORS[color] },
      style,
    ]}
    {...props}
  />
);

export const MediumText: React.FC<CustomTextProps> = ({
  size,
  color = "black",
  style,
  ...props
}) => (
  <Text
    allowFontScaling={false}
    style={[
      styles.medium,
      { fontSize: TEXT_SIZES[size], color: TEXT_COLORS[color] },
      style,
    ]}
    {...props}
  />
);

export const BoldText: React.FC<CustomTextProps> = ({
  size,
  color = "black",
  style,
  ...props
}) => (
  <Text
    allowFontScaling={false}
    style={[
      styles.bold,
      { fontSize: TEXT_SIZES[size], color: TEXT_COLORS[color] },
      style,
    ]}
    {...props}
  />
);

export const ExtraBoldText: React.FC<CustomTextProps> = ({
  size,
  color = "black",
  style,
  ...props
}) => (
  <Text
    allowFontScaling={false}
    style={[
      styles.extraBold,
      { fontSize: TEXT_SIZES[size], color: TEXT_COLORS[color] },
      style,
    ]}
    {...props}
  />
);

const styles = StyleSheet.create({
  regular: {
    fontFamily: "font-regular",
  },
  medium: {
    fontFamily: "font-light",
  },
  bold: {
    fontFamily: "font-bold",
  },
  extraBold: {
    fontFamily: "font-ExtraBold",
  },
});
