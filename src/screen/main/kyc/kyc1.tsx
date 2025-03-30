import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  KeyboardTypeOptions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BoldText } from "@/src/component/text/indext";
import { COLORS } from "@/src/constant/COLORS";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import CustomTextInput from "@/src/component/common/customTextInput";
import CustomBtn from "@/src/component/common/customBtn";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useCreateWallet } from "@/src/api/hooks/useWallet";
import useAuthStore from "@/src/store/userStore";
import ToastMessage from "@/src/component/common/toastMessage";
import DateSelector from "@/src/component/common/dateSelector";

// Define navigation type
type RootStackParamList = {
  CreatePin: undefined;
};
type NavigationProp = StackNavigationProp<RootStackParamList, "CreatePin">;

const KYC1: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const userData = useAuthStore((state) => state.userData);
  const updateUserDate = useAuthStore((state) => state.setUserData);
  const { mutate, isPending } = useCreateWallet();

  // State for inputs
  const [dob, setDob] = useState<string>("");
  const [bvn, setBvn] = useState<string>("");

  // Constant values for the remaining fields
  const customerName: string = userData?.name || "";
  const email: string = userData?.email || "";
  const accountName: string = userData?.name || "";
  const customerEmail: string = userData?.email || "";

  // toast message
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  //update wallet status
  const updateIsWalletCreated = useAuthStore(
    (state) => state.setIsWalletCreated
  );

  // Handle form submission
  const handleContinue = () => {
    if (!bvn || bvn.length !== 11) {
      setIsVisible(true);
      setMessage("Enter BVN");
      setSuccess(false);
      return;
    }
    if (!dob) {
      setIsVisible(true);
      setMessage("Select Date of birth");
      setSuccess(false);
      return;
    }

    const requestData = {
      customerName,
      email,
      bvn,
      accountName,
      customerEmail,
      dob,
    };

    mutate(requestData, {
      onSuccess: () => {
        updateUserDate({
          ...userData,
          isWalletCreated: true,
        });
        navigation.navigate("CreatePin");
        setIsVisible(true);
        setMessage("Wallet created successfully!");
        setSuccess(true);
      },
      onError: () => {
        setIsVisible(true);
        setMessage("Unable to create wallet. Please try again.");
        setSuccess(false);
      },
    });
  };

  const disable = !bvn.length || bvn.length != 11 || !dob || isPending;

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.root}>
        {/* Header */}
        <View style={styles.title}>
          <BoldText size="large">Complete your KYC</BoldText>
        </View>

        {/* Forms */}
        <View>
          <CustomTextInput
            title="BVN"
            placeholder="Enter your BVN"
            keyboardType="numeric"
            value={bvn}
            setValue={setBvn}
            maxLength={11}
          />
          <DateSelector
            selectedDate={dob}
            onDateChange={setDob}
            label="Date Of Birth"
          />
        </View>

        {/* Submit Button */}
        <View style={styles.btn}>
          <CustomBtn
            label="Create Wallet"
            onPress={handleContinue}
            disabled={disable}
            isLoading={isPending}
          />
        </View>

        <ToastMessage
          isVisible={isVisible}
          onClose={() => setIsVisible(false)}
          message={message}
          isSuccessful={success}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default KYC1;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: wp(4),
  },
  title: {
    alignSelf: "center",
    marginTop: hp(3),
    marginBottom: hp(6),
  },
  btn: {
    position: "absolute",
    bottom: hp(3),
    alignSelf: "center",
  },
});
