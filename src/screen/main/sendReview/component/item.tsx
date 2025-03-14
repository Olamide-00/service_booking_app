import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { BoldText, RegularText } from "@/src/component/text/indext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS } from "@/src/constant/COLORS";
type Props = {
  label: string;
  value: string | number;
};
const ReviewItem = ({ label, value }: Props) => {
  return (
    <View style={styles.container}>
      <BoldText size="medium">{label}</BoldText>
      <RegularText size="small" color="primary">
        {value}
      </RegularText>
    </View>
  );
};

export default ReviewItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: wp(5),
    borderBottomWidth: 0.5,
    paddingBottom: hp(3),
    borderColor: COLORS.border,
  },
});
