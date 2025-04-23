import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  BackHandler,
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
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useCreateWallet } from "@/src/api/hooks/useWallet";
import useAuthStore from "@/src/store/userStore";
import ToastMessage from "@/src/component/common/toastMessage";
import DateSelector from "@/src/component/common/dateSelector";
import Header from "@/src/component/common/header";

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

  // Constant values for the remaining fields
  const Name: string = userData?.name || "";
  const nameParts = Name.trim().split(" ");
  const first_name = nameParts[0] || "";
  const last_name = nameParts[1] || "Remit";

  const email: string = userData?.email || "";
  const [phone, setPhone] = useState<string>("");
  const [dob, setDob] = useState<string>("");

  // toast message
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  // update wallet status
  const updateIsWalletCreated = useAuthStore(
    (state) => state.setIsWalletCreated
  );

  // handle back button
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  // Handle form submission
  const handleContinue = () => {
    if (!phone) {
      setIsVisible(true);
      setMessage("Enter your phone number");
      setSuccess(false);
      return;
    }

    const requestData = {
      first_name,
      last_name,
      phone,
      email,
    };

    mutate(requestData, {
      onSuccess: (data) => {
        updateUserDate({
          ...userData,
          isWalletCreated: true,
        });

        setIsVisible(true);
        setMessage("Wallet created successfully!");
        setSuccess(true);

        setTimeout(() => {
          navigation.navigate("CreatePin");
        }, 3000);
      },

      onError: () => {
        setIsVisible(true);
        setMessage("Unable to create wallet. Please try again.");
        setSuccess(false);
      },
    });
  };

  const disable =
    !phone || phone.length < 10 || !email || !Name || isPending || !dob;

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.root}>
        {/* Header */}
        <View style={styles.title}>
          <Header showLogo />
          <BoldText size="large">Complete your KYC</BoldText>
        </View>

        {/* Forms */}
        <View>
          <CustomTextInput
            title="Phone Number"
            placeholder="Enter your Phone Number"
            keyboardType="numeric"
            value={phone}
            setValue={setPhone}
            maxLength={14}
            acceptContact
          />
          <DateSelector
            label="Date Of Birth"
            selectedDate={dob}
            onDateChange={setDob}
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
    marginTop: hp("3%"),
    marginBottom: hp("6%"),
    flexDirection: "row",
    alignItems: "center",
    gap: wp("10%"),
  },
  btn: {
    marginTop: "auto",
    bottom: hp("3%"),
    alignSelf: "center",
  },
});
