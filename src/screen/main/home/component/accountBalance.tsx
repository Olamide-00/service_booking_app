import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { BoldText, MediumText } from "@/src/component/text/indext";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/src/constant/COLORS";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

type AccountBalanceProps = {
  balance: number;
};

const AccountBalance = ({ balance }: AccountBalanceProps) => {
  const [isVisible, setIsVisible] = React.useState(false);

  // Format balance properly
  const formattedBalance = new Intl.NumberFormat("en-NG", {
    style: "decimal",
    minimumFractionDigits: 2,
  }).format(balance);

  const dots = () => {
    return [1, 2, 3].map((index) => (
      <View style={styles.dotContainer} key={index}>
        <View style={styles.dot} />
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.balanceContainer}
        onPress={() => setIsVisible(!isVisible)}
      >
        <BoldText size="xlarge" color="primary">
          ₦{isVisible ? formattedBalance : dots()}
        </BoldText>
        <Ionicons
          name={isVisible ? "eye-off" : "eye"}
          size={20}
          style={{ marginTop: 10 }}
        />
      </Pressable>
      <MediumText size="large" color="black">
        Account Balance
      </MediumText>
    </View>
  );
};

export default AccountBalance;

const styles = StyleSheet.create({
  container: {},
  balanceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp("4%"),
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    marginRight: 5,
  },
  dotContainer: {
    paddingHorizontal: wp("1.5%"),
  },
});
