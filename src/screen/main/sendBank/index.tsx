import {
  ActivityIndicator,
  Keyboard,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/src/constant/COLORS";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RegularText } from "@/src/component/text/indext";
import { useNavigation, useRoute } from "@react-navigation/native";
import CustomTextInput from "@/src/component/common/customTextInput";
import CustomBtn from "@/src/component/common/customBtn";
import Spacer from "@/src/component/common/spacer";
import Selector from "@/src/component/common/selector";
import { useAllBanks } from "@/src/api/hooks/useTransfer";
import Header from "@/src/component/common/header";
import { useVerifyBank } from "@/src/api/hooks/useVerify";
import { usePercentage } from "@/src/api/hooks/useWallet";
import useAuthStore from "@/src/store/userStore";
import { set } from "date-fns";
import ToastMessage from "@/src/component/common/toastMessage";

const SendBank = () => {
  const route = useRoute();
  const navigation = useNavigation<any>();

  const { data: bankData, isPending } = useAllBanks();
  const { data: percentage } = usePercentage();
  const bankPercentage = percentage?.bank;

  const [customerName, setCustomerName] = useState<string>("");
  const userData = useAuthStore((state) => state.userData);
  const isWalletCreated = userData?.isWalletCreated;

  // check
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const [formState, setFormState] = useState({
    accountNumber: "",
    amount: "",
    selectedBank: "",
    selectedBankName: "",
    narration: "",
  });

  const [errors, setErrors] = useState({
    accountNumber: "",
    amount: "",
    bank: "",
    narration: "",
  });

  const { data: verifyData, isLoading: isVerifying } = useVerifyBank(
    formState.accountNumber.length === 10 ? formState.selectedBank : "",
    formState.accountNumber.length === 10 ? formState.accountNumber : ""
  );

  useEffect(() => {
    if (verifyData?.data?.account_name) {
      setCustomerName(verifyData.data.account_name);
    }
  }, [verifyData]);

  const handleBankSelect = (bankCode: string, bankName: string) => {
    setFormState((prev) => ({
      ...prev,
      selectedBank: bankCode,
      selectedBankName: bankName,
    }));
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

    if (!customerName) {
      setIsVisible(true);
      setMessage("Account number is invalid");
      setSuccess(false);
      return false;
    }

    if (!isWalletCreated) {
      setIsVisible(true);
      setMessage("Complete your KYC");
      setSuccess(false);
      return false;
    }

    if (!formState.accountNumber.trim()) {
      newErrors.accountNumber = "Account number is required";
      isValid = false;
    } else if (formState.accountNumber.length !== 10) {
      newErrors.accountNumber = "Invalid account number";
      isValid = false;
    }

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

    if (!formState.selectedBank) {
      newErrors.bank = "Please select a bank";
      isValid = false;
    }

    if (!formState.narration.trim()) {
      newErrors.narration = "Narration is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const amount = Number(formState.amount);
      const percentRev = (amount * bankPercentage) / 100;

      navigation.navigate("SendReview", {
        account_number: formState.accountNumber,
        bank_code: formState.selectedBank,
        destinationBankName: formState.selectedBankName,
        amount: amount,
        percentRev,
        reason: formState.narration,
        name: customerName,
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.root} key={route.key}>
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
          <View style={styles.accountNameContainer}>
            {customerName &&
            formState.selectedBank &&
            formState.accountNumber.length === 10 ? (
              <RegularText size="small" color="secondaryColor">
                {customerName || "Invalid bank details"}
              </RegularText>
            ) : (
              isVerifying && (
                <ActivityIndicator size="small" color={COLORS.primary} />
              )
            )}
          </View>

          <Spacer size={hp(1.5)} direction="vertical" />

          <Selector
            label="Select Bank"
            options={
              Array.isArray(bankData) && bankData.length > 0
                ? bankData.map((bank) => ({
                    label: bank.name,
                    value: bank.code,
                  }))
                : []
            }
            showSearch
            onSelect={(bankCode) => {
              const bankName =
                Array.isArray(bankData) && bankData.length > 0
                  ? bankData.find((bank) => bank.code === bankCode)?.name || ""
                  : "";
              handleBankSelect(bankCode, bankName);
            }}
            selectedValue={formState.selectedBank}
            loading={isPending}
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

        <View style={styles.btn}>
          <CustomBtn label="Continue" onPress={handleSubmit} />
        </View>

        <ToastMessage
          isVisible={isVisible}
          message={message}
          onClose={() => setIsVisible(false)}
          isSuccessful={success}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: wp(4),
  },
  input: {
    marginTop: hp(6),
  },
  errorText: {
    marginTop: hp(0.5),
    marginLeft: wp(1),
    color: "red",
  },
  accountNameContainer: {
    alignSelf: "flex-end",
    marginTop: hp(-2),
  },
  btn: {
    marginTop: "auto",
    marginBottom: hp(3),
  },
});

export default SendBank;
