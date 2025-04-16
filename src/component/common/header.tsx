import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ArrowLeft } from "iconsax-react-native";
import { COLORS } from "@/src/constant/COLORS";
import { BoldText } from "../text/indext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

type Props = {
  label?: string;
  showIcon?: boolean;
  showLogo?: boolean;
};

const Header = ({ label, showIcon, showLogo }: Props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <ArrowLeft size="30" color={COLORS.primary} />
      </TouchableOpacity>
      {showLogo ? (
        <Image
          source={require("../../../assets/images/RemitLogo.png")}
          resizeMode="contain"
          style={styles.logo}
        />
      ) : (
        <BoldText size="large" color="primary">
          {label}
        </BoldText>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp("4%"),
    backgroundColor: COLORS.white,
    height: hp("8%"),
  },
  logo: {
    width: wp("9%"),
    height: 60,
  },
});
