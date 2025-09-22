import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/src/component/common/header";
import { styles } from "./style";
import ReviewItem from "./component/item";
import CustomBtn from "@/src/component/common/customBtn";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import useAuthStore from "@/src/store/userStore";

type RouteParams = {
  bank_code: string;
  account_number: string;
  amount: string;
  narration: string;
  customerName: string;
  destinationBankName: string;
  name: string;
  tag: string;
  percentRev: string;
};

type RootStackParamList = {
  PIN: {
    destinationAccountNumber: string;
    destinationBankCode: string;
    narration: string;
    amount: number;
    receipentName: string;
    receipentBank: string;
    name: string;
    tag: string;
    percentRev: string;
  };
};

const SendReview = () => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, "PIN">>();
  const route = useRoute();

  const {
    bank_code,
    account_number,
    amount,
    reason,
    name,
    destinationBankName,
    tag,
    percentRev,
  } = route.params as RouteParams;

  const userData = useAuthStore((state) => state.userData);

  const formattedAmount = `₦${Number(amount).toLocaleString()}`;
  const formattedPercentRev = percentRev
    ? `₦${Number(percentRev).toLocaleString()}`
    : null;

  return (
    <>
      <Header label="Transfer Review" showBackButton />
      <View style={styles.root}>
        <View style={styles.container}>
          <ReviewItem label={"Account Name"} value={name || "N/A"} />
          {destinationBankName && (
            <ReviewItem
              label={"Bank Name"}
              value={destinationBankName || "N/A"}
            />
          )}
          <ReviewItem
            label={tag ? "Payverve Tag" : "Account Number"}
            value={tag || account_number}
          />
          <ReviewItem label="Amount" value={formattedAmount} />
          {percentRev && (
            <ReviewItem label="Charges" value={formattedPercentRev} />
          )}
          {reason && <ReviewItem label="Narration" value={reason} />}
        </View>
        <View style={styles.btn}>
          <CustomBtn
            label="Continue"
            onPress={() =>
              navigation.navigate("TransferPIN", {
                account_number,
                bank_code,
                reason,
                amount: Number(amount),
                destinationBankName,
                name,
                receipentName: name,
                tag,
                percentRev,
              })
            }
          />
        </View>
      </View>
    </>
  );
};

export default SendReview;
