import { Pressable, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/src/constant/COLORS";
import { ArrowLeft } from "iconsax-react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ExtraBoldText, RegularText } from "@/src/component/text/indext";
import { useNavigation, useRoute } from "@react-navigation/native";
import CustomTextInput from "@/src/component/common/customTextInput";
import CustomBtn from "@/src/component/common/customBtn";
import Spacer from "@/src/component/common/spacer";
import Selector from "@/src/component/common/selector";
import { useAllBanks } from "@/src/api/hooks/useTransfer";
import Header from "@/src/component/common/header";

// Define navigation types
type RootStackParamList = {
  SendReview: {
    accountNumber: string;
    bankCode: string;
    amount: string;
    narration: string;
  };
};

const SendBank = () => {
  const route = useRoute();
  const navigation = useNavigation<any>();

  const { data: bankData, isPending, isError } = useAllBanks();

  const bankOptions =
    Array.isArray(bankData) && bankData.length > 0
      ? bankData.map((bank) => ({
          label: bank.name,
          value: bank.code,
        }))
      : [];

  // Form state
  const [formState, setFormState] = useState({
    accountNumber: "",
    amount: "",
    selectedBank: "",
    narration: "",
  });

  // Error state
  const [errors, setErrors] = useState({
    accountNumber: "",
    amount: "",
    bank: "",
    narration: "",
  });

  const handleBankSelect = (bankCode: string) => {
    setFormState((prev) => ({ ...prev, selectedBank: bankCode }));
    setErrors((prev) => ({ ...prev, bank: "" }));
  };

  const handleInputChange = (
    field: "accountNumber" | "amount" | "narration",
    value: string
  ) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = (): boolean => {
    const newErrors = {
      accountNumber: "",
      amount: "",
      bank: "",
      narration: "",
    };
    let isValid = true;

    // Validate account number
    if (!formState.accountNumber.trim()) {
      newErrors.accountNumber = "Account number is required";
      isValid = false;
    } else if (formState.accountNumber.length !== 10) {
      newErrors.accountNumber = "Invalid account number";
      isValid = false;
    }

    // Validate amount
    if (!formState.amount.trim()) {
      newErrors.amount = "Amount is required";
      isValid = false;
    } else if (
      isNaN(Number(formState.amount)) ||
      Number(formState.amount) <= 0
    ) {
      newErrors.amount = "Enter a valid amount";
      isValid = false;
    }

    // Validate bank selection
    if (!formState.selectedBank) {
      newErrors.bank = "Please select a bank";
      isValid = false;
    }

    // Validate narration
    if (!formState.narration.trim()) {
      newErrors.narration = "Narration is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      navigation.navigate("SendReview", {
        destinationAccountNumber: formState.accountNumber,
        destinationBankCode: formState.selectedBank,
        amount: formState.amount,
        narration: formState.narration,
      });
    }
  };

  return (
    <SafeAreaView style={styles.root} key={route.key}>
      {/* <Pressable onPress={() => navigation.goBack()} style={styles.header}>
        <ArrowLeft size="30" color={COLORS.primary} />
        <ExtraBoldText size="large" color="primary">
          Bank Transfer
        </ExtraBoldText>
      </Pressable> */}
      <Header label="Bank Transfer" showLogo />

      <View style={styles.input}>
        <CustomTextInput
          title="Account Number"
          placeholder="Enter account number"
          value={formState.accountNumber}
          setValue={(value) => handleInputChange("accountNumber", value)}
          keyboardType="numeric"
          error={errors.accountNumber}
          maxLength={10}
        />

        <Spacer size={hp(1.5)} direction="vertical" />

        <Selector
          label="Select Bank"
          options={bankOptions}
          onSelect={handleBankSelect}
          selectedValue={formState.selectedBank}
        />
        {errors.bank ? (
          <RegularText size="small" style={styles.errorText}>
            {errors.bank}
          </RegularText>
        ) : null}

        <Spacer size={hp(2)} direction="vertical" />

        <CustomTextInput
          title="Amount"
          placeholder="Enter amount"
          keyboardType="numeric"
          value={formState.amount}
          setValue={(value) => handleInputChange("amount", value)}
          error={errors.amount}
        />

        <Spacer size={hp(0)} direction="vertical" />

        <CustomTextInput
          title="Narration"
          placeholder="Enter narration (optional)"
          value={formState.narration}
          setValue={(value) => handleInputChange("narration", value)}
          error={errors.narration}
        />
      </View>

      <Spacer size={hp(10)} direction="vertical" />

      <CustomBtn label="Continue" onPress={handleSubmit} />
    </SafeAreaView>
  );
};

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
    marginTop: hp(6),
  },
  errorText: {
    marginTop: hp(0.5),
    marginLeft: wp(1),
    color: "red",
  },
});

export default SendBank;
