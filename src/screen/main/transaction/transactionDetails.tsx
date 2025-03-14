import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/src/component/common/header";
import Spacer from "@/src/component/common/spacer";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Card from "@/src/component/common/card";
import { BoldText, MediumText, RegularText } from "@/src/component/text/indext";
import { COLORS } from "@/src/constant/COLORS";
import {
  CardReceive,
  ChartSuccess,
  LayoutMaximize,
} from "iconsax-react-native";
import Item from "./component/item";
import { useRoute } from "@react-navigation/native";
import useAuthStore from "@/src/store/userStore";

const TransactionDetails = () => {
  const route = useRoute();
  const { transaction } = route.params;
  const userData = useAuthStore((state) => state.userData);
  const name = userData?.name;

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

  return (
    <SafeAreaView style={styles.root}>
      {/* header */}
      <Header showLogo />
      <Spacer size={hp(3)} direction="vertical" />
      <Card style={styles.card}>
        <MediumText size="medium">{transaction.service}</MediumText>
        <BoldText size="large" color="primary">
          ₦{transaction.amount}
        </BoldText>
        <View style={styles.item2}>
          {transaction.status === "SUCCESS" ? (
            <CardReceive size={18} color={COLORS.primary} />
          ) : (
            <LayoutMaximize size={18} color={COLORS.secondaryColor} />
          )}
          <RegularText size="small">{transaction.status}</RegularText>
        </View>
      </Card>
      <Card style={styles.card2}>
        <MediumText size="large" color="primary">
          Transaction Details
        </MediumText>
        <Item label="Account Name" value={name} />
        <Item label="Receipient Number" value={transaction.unique_element} />
        <Item
          label="Transaction Date"
          value={formatDate(transaction.transaction_date)}
        />
        <Item
          label="Reference Number"
          value={transaction.transactionReference}
        />
      </Card>
    </SafeAreaView>
  );
};

export default TransactionDetails;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: wp(4),
  },
  item2: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(3),
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  card2: {
    gap: hp(1.5),
    marginTop: hp(2),
  },
});
