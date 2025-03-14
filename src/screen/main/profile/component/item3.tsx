import { StyleSheet, View, Switch } from "react-native";
import React from "react";
import { RegularText } from "@/src/component/text/indext";
import { COLORS } from "@/src/constant/COLORS";

type Item3Props = {
  name: string;
  value: boolean;
  onToggle: (newValue: boolean) => void;
};

const Item3 = ({ name, value, onToggle }: Item3Props) => {
  return (
    <View style={styles.container}>
      <RegularText size="medium">{name}</RegularText>
      <Switch
        value={value}
        onValueChange={onToggle}
        thumbColor={value ? COLORS.primary : COLORS.secondaryColor}
      />
    </View>
  );
};

export default Item3;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
});
