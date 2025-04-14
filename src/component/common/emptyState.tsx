import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RegularText } from "../text/indext";
import LottieView from "lottie-react-native";

type Prop = {
  message: string;
};
const EmptyState = ({ message }: Prop) => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("@/assets/json/20.json")}
        autoPlay
        loop
        style={{ width: 120, height: 120 }}
      />
      <RegularText size="medium">{message}</RegularText>
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({
  container: {
    // flexDirection: "row",
    alignItems: "center",
    gap: 20,
    flex: 1,
  },
  image: {
    width: "100%",
    height: 100,
  },
});
