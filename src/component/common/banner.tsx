import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Card from "./card";
import { Ionicons } from "@expo/vector-icons";
import { BoldText, RegularText } from "../text/indext";
import CustomBtn from "./customBtn";
import { COLORS } from "@/src/constant/COLORS";
import { useNavigation } from "@react-navigation/native";

const Banner = () => {
  const navigation = useNavigation();
  const handleKYC = () => {
    navigation.navigate("StackNavigation", { screen: "KYC1" });
  };
  return (
    <Card style={styles.container}>
      <View style={styles.itemContainer}>
        <BoldText size="medium" color="primary">
          Complete your KYC
        </BoldText>
        <RegularText size="small" color="gray">
          Few more steps to get you started
        </RegularText>
      </View>

      <CustomBtn
        color={COLORS.secondaryColor}
        textStyle={{ color: COLORS.primary }}
        width={wp(35)}
        label="Tap to complete"
        onPress={handleKYC}
      />
    </Card>
  );
};

export default Banner;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp("5%"),
    justifyContent: "center",
    paddingVertical: hp("2%"),
  },
  itemContainer: {
    gap: 5,
    alignItems: "center",
  },
});
