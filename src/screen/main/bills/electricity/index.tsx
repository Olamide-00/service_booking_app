import {
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
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
import { useGetAllServices, useGetServicePLan } from "@/src/api/hooks/useBills";
import useVerify from "@/src/api/hooks/useVerify";
import { RegularText } from "@/src/component/text/indext";
import ToastMessage from "@/src/component/common/toastMessage";
import { usePercentage } from "@/src/api/hooks/useWallet";
import useAuthStore from "@/src/store/userStore";

interface ReviewScreenParams {
  serviceID: string;
  discoName: string;
  variation_code: string;
  amount: string | number;
  billersCode: string;
  phoneNumber: string;
  percentRev: number;
}

const ElectricityScreen = () => {
  const navigation = useNavigation();

  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDisco, setSelectedDisco] = useState<string | null>(null);
  const [selectedMeterType, setSelectedMeterType] = useState<string | null>(
    null
  );
  const [meterNumber, setMeterNumber] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [customerName, setCustomerName] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // toast message
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  // check
  const userData = useAuthStore((state) => state.userData);
  const isWalletCreated = userData?.isWalletCreated;
  const phoneNumber = userData?.phoneNumber || "09036018013";

  const { data: percentage, isLoading } = usePercentage();
  const electricityPercentage = percentage?.electricity;

  const { data, isLoading: servicesLoading } =
    useGetAllServices("electricity-bill");

  const discoOptions =
    data?.data?.content?.map((item: { name: string; serviceID: string }) => ({
      label: item.name,
      value: item.serviceID,
    })) || [];

  const { data: electricCompany, isLoading: isPending } =
    useGetServicePLan(selectedService);

  const meterTypes = [
    { label: "Prepaid", value: "prepaid" },
    { label: "Postpaid", value: "postpaid" },
  ];

  const { mutate: verify, isPending: isVerifying } = useVerify();

  useEffect(() => {
    const shouldVerify =
      (selectedService && meterNumber.length === 12) ||
      (selectedService && meterNumber.length === 13);

    if (shouldVerify) {
      verify(
        { serviceID: selectedService, billersCode: meterNumber },
        {
          onSuccess: (data) => {
            setCustomerName(data.data?.content?.Customer_Name || "Unknown");
          },
          onError: () => {
            setIsVisible(true);
            setSuccess(false);
            setMessage("Error occurred, please try again");
          },
        }
      );
    }
  }, [selectedService, meterNumber, verify]);

  const validateFields = () => {
    if (!isWalletCreated) {
      setIsVisible(true);
      setMessage("Complete your KYC");
      setSuccess(false);
      return;
    }

    let newErrors: { [key: string]: string } = {};

    if (meterNumber.length < 12 || meterNumber.length > 13) {
      newErrors.meterNumber = "Meter number must be 12 or 13 digits";
    }
    if (!selectedService) newErrors.selectedService = "Disco type is required";
    if (!selectedMeterType)
      newErrors.selectedMeterType = "Meter type is required";
    if (!amount) newErrors.amount = "Amount is required";
    if (!customerName)
      newErrors.customerName = "Verification failed, please try again";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (!validateFields()) {
      setMessage("Complete your KYC");
      setIsVisible(true);
      setSuccess(false);
      return;
    }

    const amountNumber = parseFloat(amount);
    const percentRev = (electricityPercentage / 100) * amountNumber;

    const payload: ReviewScreenParams = {
      serviceID: selectedService!,
      discoName: selectedDisco!,
      variation_code: selectedMeterType!,
      billersCode: meterNumber,
      amount: amountNumber,
      percentRev,
      phoneNumber: phoneNumber,
    };
    navigation.navigate("ReviewScreen1", payload);
  };

  // Check if all conditions are met
  const isFormValid =
    meterNumber.length > 11 &&
    customerName &&
    selectedService &&
    selectedMeterType &&
    amount;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <>
        <Header label="Electricity" showLogo />
        <View style={styles.root}>
          <View style={styles.input}>
            <View>
              <CustomTextInput
                placeholder="Enter meter number"
                title="Meter Number"
                keyboardType="numeric"
                value={meterNumber}
                setValue={setMeterNumber}
                error={errors.meterNumber}
                maxLength={13}
              />
              <View style={styles.customerName}>
                {isVerifying ? (
                  <ActivityIndicator size="small" color={COLORS.primary} />
                ) : (
                  <RegularText color="primary" size="small">
                    {customerName}
                  </RegularText>
                )}
              </View>
            </View>
            <View pointerEvents="box-none">
              <Selector
                label="Disco Type"
                options={discoOptions}
                selectedValue={selectedService}
                onSelect={(val: string) => {
                  setSelectedService(val);
                  const selected = discoOptions.find(
                    (item) => item.value === val
                  );
                  setSelectedDisco(selected ? selected.label : null);
                }}
                loading={servicesLoading}
                showSearch
              />
            </View>

            <Selector
              label="Meter Type"
              options={meterTypes}
              selectedValue={selectedMeterType}
              onSelect={setSelectedMeterType}
            />

            <CustomTextInput
              title="Amount"
              placeholder="Enter amount"
              keyboardType="numeric"
              value={amount}
              setValue={setAmount}
              error={errors.amount}
            />
          </View>

          <View style={styles.btn}>
            <CustomBtn
              label="Continue"
              onPress={handleContinue}
              disabled={!isFormValid}
            />
          </View>

          <ToastMessage
            isVisible={isVisible}
            onClose={() => setIsVisible(false)}
            message={message}
            isSuccessful={success}
          />
        </View>
      </>
    </TouchableWithoutFeedback>
  );
};

export default ElectricityScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: wp(4),
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: hp(10),
  },
  input: {
    marginTop: hp(3.5),
    gap: hp(3),
  },
  btn: {
    marginTop: "auto",
    marginBottom: hp(3),
  },
  customerName: {
    marginTop: hp(-2.6),
    alignSelf: "flex-end",
  },
});
