import {
  Pressable,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/src/constant/COLORS";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ExtraBoldText, RegularText } from "@/src/component/text/indext";
import { useNavigation, useRoute } from "@react-navigation/native";
import CustomTextInput from "@/src/component/common/customTextInput";
import CustomBtn from "@/src/component/common/customBtn";
import Spacer from "@/src/component/common/spacer";
import ToastMessage from "@/src/component/common/toastMessage";
import { useFindRemit } from "@/src/api/hooks/useTransfer";
import Header from "@/src/component/common/header";
import useAuthStore from "@/src/store/userStore";

const SendRemit = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [tag, setTag] = useState("");
  const [amount, setAmount] = useState("");
  const [walletError, setWalletError] = useState("");
  const [amountError, setAmountError] = useState("");

  // Fetch user data when tag length is valid
  const { data, isLoading } = useFindRemit(tag.length >= 5 ? tag : null);
  const userData = useAuthStore((state) => state.userData);
  const isWalletCreated = userData?.isWalletCreated;

  // check
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const validateAndProceed = () => {
    let isValid = true;

    if (!data?.name) {
      setIsVisible(true);
      setMessage("Invalid Remit Tag");
      setSuccess(false);
      return;
    }

    if (!isWalletCreated) {
      setIsVisible(true);
      setMessage("Complete your KYC");
      setSuccess(false);
      return;
    }

    if (!tag.trim()) {
      setWalletError("Remit Tag is required");
      isValid = false;
    } else if (tag.length < 3) {
      setWalletError("Invalid Remit Tag");
      isValid = false;
    } else {
      setWalletError("");
    }

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
      navigation.navigate("SendReview", {
        name: data?.name || "Unknown",
        tag,
        amount,
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.root} key={route.key}>
        <Header showLogo />
        {/* Input Fields */}
        <View style={styles.input}>
          <CustomTextInput
            title="Remit Tag"
            placeholder="Enter Your Remit Tag"
            value={tag}
            setValue={setTag}
            error={walletError}
            maxLength={11}
          />
          <View style={styles.name}>
            {isLoading ? (
              <ActivityIndicator size="small" color={COLORS.primary} />
            ) : (
              data?.name && (
                <RegularText size="small" color="secondaryColor">
                  {data.name}
                </RegularText>
              )
            )}
          </View>

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
    marginTop: hp(5),
    gap: hp(2),
  },
  name: {
    marginTop: hp(-2),
    alignSelf: "flex-end",
  },
});
