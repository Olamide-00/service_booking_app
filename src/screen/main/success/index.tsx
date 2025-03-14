import { StyleSheet, View, BackHandler } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "@/src/constant/COLORS";
import { MediumText } from "@/src/component/text/indext";
import { Image } from "expo-image";

const Success = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { message } = route.params;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("BottomTabs", { screen: "Home" });
    }, 2000);

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
      <Image
        source={require("../../../../assets/images/success.gif")}
        style={styles.image}
      />
      <View>
        <MediumText size="medium">{message}</MediumText>
      </View>
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
