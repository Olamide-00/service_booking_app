import { StyleSheet, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import React from "react";
import { COLORS } from "@/src/constant/COLORS";

const Dots = ({ index }: { index: number }) => {
  return (
    <View style={styles.container}>
      {[0, 1, 2].map((item) => (
        <View
          key={item}
          style={[
            styles.dot,
            {
              borderColor:
                index === item ? COLORS.primary : "rgba(42, 42, 114, 0.4)",
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(2),
  },
  dot: {
    width: wp(8),
    borderWidth: 3,
    borderRadius: 5,
  },
});

export default Dots;
