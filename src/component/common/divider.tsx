import { View } from "react-native";
import React from "react";
import { COLORS } from "@/src/constant/COLORS";

const Divider = () => {
  return (
    <View
      style={{
        borderBottomWidth: 0.5,
        borderColor: COLORS.border,
        marginVertical: 25,
      }}
    />
  );
};

export default Divider;
