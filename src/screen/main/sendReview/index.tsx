import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/src/component/common/header";
import { styles } from "./style";
import ReviewItem from "./component/item";
import CustomBtn from "@/src/component/common/customBtn";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RouteParams = {
  destinationBankCode: string;
  destinationAccountNumber: string;
  amount: string;
  narration: string;
};

type RootStackParamList = {
  PIN: {
    destinationAccountNumber: string;
    destinationBankCode: string;
    narration: string;
    amount: number;
  };
};

const SendReview = () => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, "PIN">>();
  const route = useRoute();

  const { destinationBankCode, destinationAccountNumber, amount, narration } =
    route.params as RouteParams;

  const fee = 50;
  const total = parseInt(amount, 10) + fee;

  return (
    <SafeAreaView style={styles.root}>
      {/* Header */}
      <Header label="Transfer Review" showLogo />
      <View style={styles.container}>
        <ReviewItem label="Account Name" value="Olamide Oladele" />
        <ReviewItem label="Account Number" value={destinationAccountNumber} />
        <ReviewItem
          label="Amount"
          value={`₦${parseInt(amount, 10).toLocaleString()}`}
        />
        <ReviewItem label="Transaction Fee" value={`₦${fee}`} />
        <ReviewItem label="Narration" value={narration} />
        <ReviewItem label="Total" value={`₦${total.toLocaleString()}`} />
      </View>
      <View style={styles.btn}>
        <CustomBtn
          label="Continue"
          onPress={() =>
            navigation.navigate("TransferPIN", {
              destinationAccountNumber,
              destinationBankCode,
              narration,
              amount: total,
            })
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default SendReview;
