import React from "react";
import { View, StyleSheet } from "react-native";

interface SpacerProps {
  size: number;
  direction?: "horizontal" | "vertical";
}

const Spacer: React.FC<SpacerProps> = ({ size, direction = "vertical" }) => {
  return (
    <View
      style={[
        styles.spacer,
        direction === "horizontal" ? { width: size } : { height: size },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  spacer: {
    backgroundColor: "transparent",
  },
});

export default Spacer;
