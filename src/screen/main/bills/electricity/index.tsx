import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  ActivityIndicator,
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

type ReviewScreenParams = {
  serviceID: string | null;
  discoName: string | null;
  variation_code: string | null;
  amount: string;
  billersCode: string;
  phoneNumber: string;
};

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

  // Fetch all electricity services (Disco types)
  const {
    data,
    isLoading: servicesLoading,
    isError: servicesError,
  } = useGetAllServices("electricity-bill");

  // Map fetched services into dropdown options
  const discoOptions =
    data?.data?.content?.map((item: { name: string; serviceID: string }) => ({
      label: item.name,
      value: item.serviceID,
    })) || [];

  // Fetch electric company plans based on selected Disco type
  const {
    data: electricCompany,
    isLoading: isPending,
    isError,
  } = useGetServicePLan(selectedService);

  // Extract package options
  const packageOptions =
    electricCompany?.data?.content?.variations?.map(
      (pkg: {
        name: string;
        variation_code: string;
        variation_amount: number;
      }) => ({
        label: pkg.name,
        value: pkg.variation_code,
        amount: pkg.variation_amount,
      })
    ) || [];

  // Define meter types
  const meterTypes = [
    { label: "Prepaid", value: "prepaid" },
    { label: "Postpaid", value: "postpaid" },
  ];

  // Use the verify mutation hook
  const { mutate: verify, isPending: isVerifying } = useVerify();

  // Auto-trigger verification when service and meter number are set
  useEffect(() => {
    if (selectedService && meterNumber) {
      verify(
        { serviceID: selectedService, billersCode: meterNumber },
        {
          onSuccess: (data) => {
            setCustomerName(data.data?.content?.Customer_Name || "Unknown");
            console.log(data);
          },
          onError: (error) => {
            Alert.alert(
              "Verification Failed",
              error?.message || "Something went wrong"
            );
          },
        }
      );
    }
  }, [selectedService, meterNumber, verify]);

  // Handle form submission
  const handleContinue = () => {
    const payload: ReviewScreenParams = {
      serviceID: selectedService,
      discoName: selectedDisco,
      variation_code: selectedMeterType,
      billersCode: meterNumber,
      amount,
      phoneNumber: "08011111111",
    };

    console.log("Navigating with payload:", payload); // Log data going to the next screen

    navigation.navigate("ReviewScreen1", payload);
  };

  return (
    <SafeAreaView style={styles.root}>
      {/* Header */}
      <Header label="Electricity" showLogo />

      {/* Scrollable Form */}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.input}>
          {/* Meter Number Input */}
          <CustomTextInput
            placeholder="Enter meter number"
            title="Meter Number"
            keyboardType="numeric"
            value={meterNumber}
            onChangeText={setMeterNumber}
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

          {/* Disco Type Selector */}
          <Selector
            label="Disco Type"
            options={discoOptions}
            selectedValue={selectedService}
            onSelect={(val: string) => {
              setSelectedService(val);
              const selected = discoOptions.find((item) => item.value === val);
              setSelectedDisco(selected ? selected.label : null);
            }}
          />

          {/* Meter Type Selector */}
          <Selector
            label="Meter Type"
            options={meterTypes}
            selectedValue={selectedMeterType}
            onSelect={setSelectedMeterType}
          />

          {/* Amount Input */}
          <CustomTextInput
            title="Amount"
            placeholder="Enter amount"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
        </View>

        {/* Continue Button */}
        <View style={styles.btn}>
          <CustomBtn label="Continue" onPress={handleContinue} />
        </View>
      </ScrollView>
    </SafeAreaView>
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
    marginTop: hp(5),
    gap: hp(2),
  },
  btn: {
    position: "absolute",
    alignSelf: "center",
    bottom: hp(4),
  },
  customerName: {
    marginTop: hp(-4),
    alignSelf: "flex-end",
  },
});
