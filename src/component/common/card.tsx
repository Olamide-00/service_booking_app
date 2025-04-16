import React from "react";
import { Platform, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

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
    paddingVertical: hp("1.1%"),
    paddingHorizontal: wp("2%"),
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: "#ccc",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0.8 },
        shadowOpacity: 0.03,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
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
