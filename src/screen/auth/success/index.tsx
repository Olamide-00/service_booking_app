import { StyleSheet, View, BackHandler } from "react-native";
import React, { useEffect, useCallback } from "react";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { COLORS } from "@/src/constant/COLORS";
import { Image } from "expo-image";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import { RegularText } from "@/src/component/text/indext";

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

  useFocusEffect(
    useCallback(() => {
      const handleBackPress = () => true;

      BackHandler.addEventListener("hardwareBackPress", handleBackPress);
      navigation.addListener("beforeRemove", (e) => e.preventDefault());

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
      };
    }, [navigation])
  );

  return (
    <View style={styles.root}>
      <Image
        source={require("../../../../assets/images/success.gif")}
        style={styles.logo}
      />
      <View style={{ alignItems: "center" }}>
        <RegularText size="medium" color="primary">
          {message}
        </RegularText>
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
