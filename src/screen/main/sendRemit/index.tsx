import { Pressable, StyleSheet, View, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/src/constant/COLORS";
import { ArrowLeft } from "iconsax-react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ExtraBoldText } from "@/src/component/text/indext";
import { useNavigation, useRoute } from "@react-navigation/native";
import CustomTextInput from "@/src/component/common/customTextInput";
import CustomBtn from "@/src/component/common/customBtn";
import Spacer from "@/src/component/common/spacer";
import ToastMessage from "@/src/component/common/toastMessage";

const SendRemit = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [walletNumber, setWalletNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [walletError, setWalletError] = useState("");
  const [amountError, setAmountError] = useState("");

  const validateAndProceed = () => {
    let isValid = true;

    if (!walletNumber.trim()) {
      setWalletError("Wallet number is required");
      isValid = false;
    } else if (walletNumber.length != 11) {
      setWalletError("Invalid Wallet");
      isValid = false;
    } else {
      setWalletError("");
    }

    // Validate amount
    if (!amount.trim()) {
      setAmountError("Amount is required");
      isValid = false;
    } else if (isNaN(Number(amount)) || Number(amount) <= 0) {
      setAmountError("Enter a valid amount");
      isValid = false;
    } else {
      setAmountError("");
    }

    if (isValid) {
      navigation.navigate("SendReview", { wallet: "wallet" });
    }
  };

  return (
    <SafeAreaView style={styles.root} key={route.key}>
      {/* header */}
      <Pressable onPress={() => navigation.goBack()} style={styles.header}>
        <ArrowLeft size="30" color={COLORS.primary} />
        <ExtraBoldText size="large" color="primary">
          Remit
        </ExtraBoldText>
      </Pressable>

      {/* Input Fields */}
      <View style={styles.input}>
        <CustomTextInput
          title="Wallet Number"
          placeholder="Enter Remit wallet number"
          value={walletNumber}
          setValue={setWalletNumber}
          keyboardType="numeric"
          error={walletError}
          maxLength={11}
        />
        <CustomTextInput
          title="Amount"
          placeholder="Amount"
          keyboardType="numeric"
          value={amount}
          setValue={setAmount}
          error={amountError}
        />
      </View>

      <Spacer size={hp(10)} direction="vertical" />

      {/* Continue Button */}
      <CustomBtn label="Continue" onPress={validateAndProceed} />
    </SafeAreaView>
  );
};

export default SendRemit;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: wp(4),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(6),
    marginTop: hp(2),
  },
  input: {
    marginTop: hp(10),
  },
});
