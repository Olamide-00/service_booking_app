import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { COLORS } from "@/src/constant/COLORS";
import { ExtraBoldText } from "@/src/component/text/indext";
import Header from "@/src/component/common/header";

const ComingSoon = () => {
  return (
    <SafeAreaView style={styles.root}>
      <Header showLogo />
      <View style={styles.container}>
        <Image
          source={require("../../../../assets/images/oops.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <ExtraBoldText size="large" color="secondaryColor">
          Coming soon ...
        </ExtraBoldText>
      </View>
    </SafeAreaView>
  );
};

export default ComingSoon;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    gap: 50,
  },
  image: {
    width: "100%",
    height: 400,
  },
});
