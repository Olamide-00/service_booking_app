import React from "react";
import { Platform, StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface CardProps {
  children: React.ReactNode;
  borderOnly?: boolean;
  style?: StyleProp<ViewStyle>;
}

const Card: React.FC<CardProps> = ({ children, borderOnly = false, style }) => {
  return (
    <View style={[styles.card, borderOnly && styles.borderOnly, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: "#ccc",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  borderOnly: {
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
    borderWidth: 0.5,
    borderColor: "#ccc",
  },
});

export default Card;
