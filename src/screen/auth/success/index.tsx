import { StyleSheet, View, BackHandler } from "react-native";
import React, { useEffect, useCallback } from "react";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { COLORS } from "@/src/constant/COLORS";

import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import { RegularText } from "@/src/component/text/indext";
import LottieView from "lottie-react-native";

const Success = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { message } = route.params;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Login");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

      // handle back button
    useFocusEffect(
      useCallback(() => {
        const onBackPress = () => {
          return true;
        };

        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          onBackPress
        );
        return () => backHandler.remove();
      }, [])
    );

  return (
    <View style={styles.root}>
      <LottieView
        autoPlay
        loop
        source={require("@/assets/json/5.json")}
        style={{ width: 200, height: 200 }}
      />
      <View style={{ alignItems: "center" }}>
        <RegularText size="medium" color="primary">
          {message}
        </RegularText>
        <LottieView
          autoPlay
          loop
          source={require("@/assets/json/4.json")}
          style={{ width: 200, height: 200 }}
        />
      </View>
    </View>
  );
};

export default Success;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: widthPercentageToDP(4),
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(30),
  },
});
