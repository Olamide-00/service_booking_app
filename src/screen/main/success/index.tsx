import { StyleSheet, View, BackHandler } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "@/src/constant/COLORS";
import { MediumText } from "@/src/component/text/indext";
import { Image } from "expo-image";
import LottieView from "lottie-react-native";

const Success = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { message } = route.params;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("BottomTabs", { screen: "Home" });
    }, 3000);

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );

    return () => {
      clearTimeout(timer);
      backHandler.remove();
    };
  }, [navigation]);

  return (
    <SafeAreaView style={styles.root}>
      <LottieView
        autoPlay
        loop
        source={require("../../../../assets/json/5.json")}
        style={{ width: 200, height: 200 }}
      />
      <View>
        <MediumText size="medium" color="primary">
          {message}
        </MediumText>
      </View>
      <LottieView
        autoPlay
        loop
        source={require("../../../../assets/json/4.json")}
        style={{ width: 200, height: 200 }}
      />
    </SafeAreaView>
  );
};

export default Success;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
});
