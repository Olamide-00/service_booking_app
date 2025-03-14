import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Card from "./card";
import { COLORS } from "@/src/constant/COLORS";
import { BoldText, MediumText, RegularText } from "../text/indext";
import { CardReceive, LayoutMaximize } from "iconsax-react-native";

type historyProps = {
  label: string;
  amount: string;
  status: string;
  date: string;
};

// Function to format the date properly
const formatDate = (dateString: string) => {
  if (!dateString) return "N/A";

  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
};

const Item = ({ transaction, onPress }: { transaction: historyProps }) => {
  // formated amount
  const formattedBalance = new Intl.NumberFormat("en-NG", {
    style: "decimal",
    minimumFractionDigits: 2,
  }).format(transaction.amount);

  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={styles.container}>
        <View style={styles.details}>
          <View
            style={[
              styles.iconContainer,
              {
                borderColor:
                  transaction.status === "SUCCESS"
                    ? COLORS.primary
                    : COLORS.secondaryColor,
              },
            ]}
          >
            {transaction.status === "SUCCESS" ? (
              <CardReceive size="18" color={COLORS.primary} />
            ) : (
              <LayoutMaximize size="18" color={COLORS.secondaryColor} />
            )}
          </View>
          <View>
            <MediumText size="medium">{transaction.service}</MediumText>
            <RegularText size="small">
              {formatDate(transaction.transaction_date)}
            </RegularText>
          </View>
        </View>
        <BoldText
          size="medium"
          color={
            transaction.status === "SUCCESS" ? "primary" : "secondaryColor"
          }
        >
          ₦{formattedBalance}
        </BoldText>
      </Card>
    </TouchableOpacity>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconContainer: {
    borderWidth: 0.5,
    borderRadius: 20,
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    borderColor: COLORS.primary,
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
});
