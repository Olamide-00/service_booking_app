import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { BoldText, RegularText } from "@/src/component/text/indext";
import Divider from "@/src/component/common/divider";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

type Props = {
  label: string;
  value: string | number;
};

const Item = ({ label, value }: Props) => {
  return (
    <View>
      <View style={styles.container}>
        <BoldText size="medium">{label}</BoldText>
        <View style={styles.item}>
          <RegularText size="small">{value}</RegularText>
        </View>
      </View>
      <Divider />
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    marginBottom: hp(-1.5),
  },
  item: {
    alignSelf: "flex-end",
    paddingRight: wp(6),
  },
});
