import { StyleSheet, Text, View, Switch } from "react-native";
import React from "react";
import { RegularText } from "@/src/component/text/indext";
import { Edit } from "iconsax-react-native";
import { COLORS } from "@/src/constant/COLORS";

type Item2Props = {
  name: string;
  func: () => void;
};

const Item2 = ({ name, func }: Item2Props) => {
  return (
    <View style={styles.container}>
      <RegularText size="medium">{name}</RegularText>
      <Edit size={20} color={COLORS.primary} onPress={func} />
    </View>
  );
};

export default Item2;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
});
