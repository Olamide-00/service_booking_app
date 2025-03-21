import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
  type: string;
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
    <Pressable onPress={onPress}>
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
            {transaction.service ? (
              <MediumText size="medium">{transaction.service}</MediumText>
            ) : (
              <MediumText size="medium">{transaction.type}</MediumText>
            )}

            <RegularText size="small">
              {formatDate(transaction.date || transaction.transaction_date)}
            </RegularText>
          </View>
        </View>
        <View>
          <BoldText
            size="medium"
            color={
              transaction.status === "SUCCESS" ? "primary" : "secondaryColor"
            }
          >
            ₦{formattedBalance}
          </BoldText>
          {transaction.status && !transaction.type && (
            <RegularText
              size="small"
              color={
                transaction.status === "SUCCESS" ? "primary" : "secondaryColor"
              }
            >
              {transaction.status}
            </RegularText>
          )}
          {transaction.type && (
            <RegularText
              size="small"
              color={transaction.type === "CREDIT" ? "primary" : "error"}
            >
              {transaction.type}
            </RegularText>
          )}
        </View>
      </Card>
    </Pressable>
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
