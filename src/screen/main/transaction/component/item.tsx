import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { RegularText } from "@/src/component/text/indext";

type Props = {
  label: string;
  value: string | number;
};

const Item = ({ label, value }: Props) => {
  return (
    <View style={styles.container}>
      <RegularText size="medium">{label}</RegularText>
      <View
        style={{
          width: "33%",
        }}
      >
        <RegularText size="small" color="primary">
          {value}
        </RegularText>
      </View>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
