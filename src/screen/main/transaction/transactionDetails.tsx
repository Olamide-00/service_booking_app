import { StyleSheet, Text, View, Share } from "react-native";
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
import { CardReceive, LayoutMaximize } from "iconsax-react-native";
import Item from "./component/item";
import { useRoute } from "@react-navigation/native";
import useAuthStore from "@/src/store/userStore";
import CustomBtn from "@/src/component/common/customBtn";

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

  // Formatted amount
  const formattedBalance = new Intl.NumberFormat("en-NG", {
    style: "decimal",
    minimumFractionDigits: 2,
  }).format(transaction.amount);

  // Share Function
  const handleShare = async () => {
    try {
      const message = `
        Transaction Details:
        ------------------------
        Amount: ₦${formattedBalance}
        Status: ${transaction.status ?? "N/A"}
        Type: ${transaction.type ?? "N/A"}
        ${transaction.units ? `Units: ${transaction.units}` : ""}
        ${
          transaction.token
            ? `Token: ${transaction.token.replace("Token : ", "")}`
            : ""
        }
        Recipient: ${transaction.receipentName || name || "N/A"}
        Date: ${formatDate(transaction.date || transaction.transaction_date)}
        Reference Number: ${transaction.transactionReference ?? "N/A"}
      `;

      await Share.share({ message });
    } catch (error) {
      console.error("Error sharing transaction details:", error);
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      {/* Header */}
      <Header showLogo />
      <Spacer size={hp(3)} direction="vertical" />

      {/* Transaction Summary Card */}
      <Card style={styles.card}>
        {transaction.service ? (
          <MediumText size="medium">{transaction.service}</MediumText>
        ) : (
          <MediumText size="medium">{transaction.type}</MediumText>
        )}

        <BoldText size="large" color="primary">
          ₦{formattedBalance}
        </BoldText>
        <View style={styles.item2}>
          {transaction.status === "SUCCESS" ? (
            <CardReceive size={18} color={COLORS.primary} />
          ) : (
            <LayoutMaximize size={18} color={COLORS.secondaryColor} />
          )}
          <RegularText
            size="small"
            color={transaction.type === "DEBIT" ? "error" : "primary"}
          >
            {transaction.type ?? transaction.status}
          </RegularText>
        </View>
      </Card>
      <Spacer size={hp(2)} />
      {/* Transaction Details Card */}
      <Card style={styles.card2}>
        <MediumText size="large" color="primary">
          Transaction Details
        </MediumText>
        {transaction.service === "BANK_TRANSFER" && (
          <>
            <Item label="Receipient Name" value={transaction.name} />
            <Item label="Bank Name" value={transaction.destinationBankName} />
            <Item label="Account Number" value={transaction.account_number} />
          </>
        )}
        {transaction.service === "REMIT_TRANSFER" && (
          <Item
            label={transaction.type ? "Recipient Name" : "Account Name"}
            value={transaction.receipentName || name}
          />
        )}
        {transaction.units && <Item label="Units" value={transaction.units} />}
        {transaction.token && (
          <Item
            label="Token"
            value={transaction.token.replace("Token : ", "")}
          />
        )}
        {transaction.receipentBank && (
          <Item
            label={
              transaction.receipentBank ? "Recipient Bank" : "Recipient Number"
            }
            value={transaction.receipentBank || transaction.unique_element}
          />
        )}
        {(transaction.service === "Bank Transfer" ||
          transaction.service === "REMIT_TRANSFER") && (
          <Item label="Sender Name" value={name} />
        )}

        {transaction.serialNumber && (
          <Item label="Serial Number" value={transaction.serialNumber} />
        )}
        {transaction.jambPin && (
          <Item label="PIN" value={transaction.jambPin} />
        )}
        <Item
          label="Transaction Date"
          value={formatDate(transaction.date || transaction.transaction_date)}
        />
        <Item
          label="Reference Number"
          value={transaction.transactionReference}
        />
      </Card>

      {/* Share Button */}
      <Spacer size={hp(10)} />
      <CustomBtn label="Share" onPress={handleShare} />
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
