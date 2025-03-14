import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useState, useEffect } from "react";
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

const AirtimeScreen = () => {
  const navigation = useNavigation();
  const { data, isLoading } = useGetAllServices("airtime");

  // State for selected values
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");

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
    if (!selectedNetwork || !phoneNumber || !amount) {
      Alert.alert("Error", "Please fill all fields.");
      return;
    }

    navigation.navigate("ReviewScreen1", {
      serviceID: selectedService?.serviceID,
      phoneNumber,
      amount,
    });
  };

  return (
    <SafeAreaView style={styles.root}>
      {/* Header */}
      <Header label="Airtime" showIcon showLogo />

      <View style={styles.input}>
        {/* Selector for Network */}
        <Selector
          label="Network"
          options={network}
          selectedValue={selectedNetwork}
          onSelect={(value) => setSelectedNetwork(value)}
        />

        {/* Phone Number Input */}
        <CustomTextInput
          placeholder="e.g., 09036018013"
          title="Phone Number"
          keyboardType="numeric"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />

        {/* Amount Input */}
        <CustomTextInput
          placeholder="Enter amount"
          title="Amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
      </View>

      {/* Continue Button */}
      <View style={styles.btn}>
        <CustomBtn label="Continue" onPress={handleContinue} />
      </View>
    </SafeAreaView>
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
    marginTop: hp(5),
    gap: hp(2),
  },
  btn: {
    position: "absolute",
    alignSelf: "center",
    bottom: hp(4),
  },
});
