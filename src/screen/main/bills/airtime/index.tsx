import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/src/component/common/header";
import { COLORS } from "@/src/constant/COLORS";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import CustomTextInput from "@/src/component/common/customTextInput";
import Selector from "@/src/component/common/selector";
import CustomBtn from "@/src/component/common/customBtn";
import { useNavigation } from "@react-navigation/native";
import { useGetAllServices } from "@/src/api/hooks/useBills";
import Spacer from "@/src/component/common/spacer";
import { RegularText } from "@/src/component/text/indext";
import useAuthStore from "@/src/store/userStore";
import ToastMessage from "@/src/component/common/toastMessage";

const AirtimeScreen = () => {
  const navigation = useNavigation();
  const { data, isLoading } = useGetAllServices("airtime");

  // toast message
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  //check
  const userData = useAuthStore((state) => state.userData);
  const isWalletCreated = userData?.isWalletCreated;

  // State for selected values
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState({
    phoneNumber: "",
    amount: "",
    selectedNetwork: "",
  });

  // Network options
  const network = [
    { id: 1, label: "MTN", value: "mtn" },
    { id: 2, label: "GLO", value: "glo" },
    { id: 3, label: "Airtel", value: "airtel" },
    { id: 4, label: "9mobile", value: "etisalat" },
  ];

  // Get the corresponding serviceID based on the selected network
  const selectedService = data?.data?.content.find(
    (item) => item.serviceID === selectedNetwork
  );

  const handleContinue = () => {
    if (!isWalletCreated) {
      setIsVisible(true);
      setMessage("Complete your KYC");
      setSuccess(false);
      return;
    }
    let newErrors = { phoneNumber: "", amount: "", selectedNetwork: "" };

    if (!selectedNetwork)
      newErrors.selectedNetwork = "Please select a network.";
    if (!phoneNumber) newErrors.phoneNumber = "Phone number is required.";
    if (!amount) newErrors.amount = "Amount is required.";

    if (
      newErrors.phoneNumber ||
      newErrors.amount ||
      newErrors.selectedNetwork
    ) {
      setErrors(newErrors);
      return;
    }

    navigation.navigate("ReviewScreen1", {
      serviceID: selectedService?.serviceID,
      phoneNumber,
      amount,
    });
  };

  const disable =
    !selectedNetwork || !phoneNumber || phoneNumber.length < 10 || !amount;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1 }}>
        <Header showBackButton label="Airtime" height={15} />
        <View style={styles.root}>
          {/* Header */}
          <Spacer size={hp(5)} />

          <View style={styles.input}>
            {/* Selector for Network */}
            <View>
              <Selector
                label="Network"
                options={network}
                selectedValue={selectedNetwork}
                onSelect={(value) => setSelectedNetwork(value)}
              />
              {errors.selectedNetwork ? (
                <View style={styles.errorCon}>
                  <RegularText size="small" color="secondaryColor">
                    {errors.selectedNetwork}
                  </RegularText>
                </View>
              ) : null}
            </View>

            {/* Phone Number Input */}
            <Spacer size={hp(1)} />
            <CustomTextInput
              placeholder="e.g 09036018013"
              title="Phone Number"
              keyboardType="numeric"
              value={phoneNumber}
              setValue={setPhoneNumber}
              maxLength={14}
              acceptContact
              error={errors.phoneNumber}
            />

            {/* Amount Input */}
            <CustomTextInput
              placeholder="Enter amount"
              title="Amount"
              keyboardType="numeric"
              value={amount}
              setValue={setAmount}
              error={errors.amount}
            />
          </View>

          {/* Continue Button */}
          <View style={styles.btn}>
            <CustomBtn
              label="Continue"
              onPress={handleContinue}
              disabled={disable}
            />
          </View>
          <ToastMessage
            isVisible={isVisible}
            message={message}
            onClose={() => setIsVisible(false)}
            isSuccessful={success}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AirtimeScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: wp(4),
  },
  input: {
    // marginTop: hp(5),
    gap: hp(1.5),
  },
  btn: {
    marginTop: "auto",
    marginBottom: hp(4),
  },
  errorCon: {
    marginTop: hp(-2),
  },
});
