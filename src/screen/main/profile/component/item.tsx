import { View, Text } from "react-native";
import React from "react";
import { MediumText, RegularText } from "@/src/component/text/indext";

type Props = {
  name: string;
  value: string;
};
const Item = ({ name, value }: Props) => {
  return (
    <View>
      <RegularText size="small" color="gray">
        {name}
      </RegularText>
      <MediumText size="medium">{value}</MediumText>
    </View>
  );
};

export default Item;
