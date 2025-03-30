import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
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
import { useGetAllServices, useGetServicePLan } from "@/src/api/hooks/useBills";
import Spacer from "@/src/component/common/spacer";
import { usePercentage } from "@/src/api/hooks/useWallet";
import useAuthStore from "@/src/store/userStore";
import ToastMessage from "@/src/component/common/toastMessage";

const DataScreen = () => {
  const navigation = useNavigation();
  const { data, isLoading } = useGetAllServices("data");

  // check
  const userData = useAuthStore((state) => state.userData);
  const isWalletCreated = userData?.isWalletCreated;

  // toast message
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  // State variables
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [selectedDataPlan, setSelectedDataPlan] = useState("");
  const [networks, setNetworks] = useState([]);
  const [dataPlans, setDataPlans] = useState([]);

  // Fetch percentage from backend (default to 0 if undefined)
  const { data: percentage, isLoading: isPercentageLoading } = usePercentage();
  const dataPercentage = percentage?.data || 0;

  // Parse network providers from API response
  useEffect(() => {
    if (data?.data?.content) {
      const providersData = data.data.content.map((item) => ({
        id: item.serviceID,
        label: item.name ? item.name.split(" ")[0] : "Unknown",
        value: item.serviceID,
        image: item.image,
      }));

      // Remove duplicates
      const uniqueProviders = providersData.filter(
        (provider, index, self) =>
          index === self.findIndex((p) => p.label === provider.label)
      );

      setNetworks(uniqueProviders);
    }
  }, [data]);

  // Fetch data plans based on selected network
  const { data: dataPackage, isLoading: dataPackageLoading } =
    useGetServicePLan(selectedNetwork);

  // Process data plans when new data is fetched
  useEffect(() => {
    if (dataPackage?.data?.content?.variations) {
      const plans = dataPackage.data.content.variations.map((plan) => {
        // Remove the last numeric part (-3000) from variation_code for display
        const cleanVariationCode = plan.variation_code.replace(/-\d+$/, "");

        // Modify variation_code to end with "-300" before sending to next screen
        const modifiedVariationCode = plan.variation_code;

        // Convert price and apply percentage increase
        const cleanAmount = parseFloat(plan.variation_amount) || 0;
        const increasedAmount =
          cleanAmount + (cleanAmount * dataPercentage) / 100;

        const percentRev = (cleanAmount * dataPercentage) / 100;

        return {
          id: modifiedVariationCode,
          label: `${cleanVariationCode} ₦${increasedAmount
            .toFixed(2)
            .replace(/\.00$/, "")}`,
          value: modifiedVariationCode,
          actualAmount: cleanAmount,
        };
      });

      setDataPlans(plans);
    } else {
      setDataPlans([]);
    }
  }, [dataPackage, dataPercentage]);

  // Handle Continue button click
  const handleContinue = () => {
    if (!isWalletCreated) {
      setIsVisible(true);
      setMessage("Complete your KYC");
      setSuccess(false);
      return;
    }

    if (!phoneNumber || !selectedNetwork || !selectedDataPlan) {
      return;
    }

    const selectedPlanObject = dataPlans.find(
      (plan) => plan.value === selectedDataPlan
    );

    const percentRev =
      (selectedPlanObject?.actualAmount * dataPercentage) / 100;

    navigation.navigate("ReviewScreen1", {
      phoneNumber,
      amount: selectedPlanObject?.actualAmount.toFixed(2),
      variation_code: selectedPlanObject?.id,
      serviceID: selectedNetwork,
      percentRev,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.root}>
        <Header label="Data Subscription" showLogo />

        <View style={styles.input}>
          <CustomTextInput
            placeholder="eg 09036018013"
            title="Phone Number"
            keyboardType="numeric"
            value={phoneNumber}
            setValue={setPhoneNumber}
            maxLength={11}
          />

          <Selector
            label="Network"
            options={networks}
            selectedValue={selectedNetwork}
            onSelect={(value) => {
              setSelectedNetwork(value);
              setSelectedDataPlan("");
            }}
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => option.value}
            loading={isLoading}
          />
          <Spacer size={hp(0.2)} />

          <Selector
            key={selectedDataPlan}
            label="Data Plan"
            options={dataPlans}
            selectedValue={selectedDataPlan}
            onSelect={(value) => {
              setSelectedDataPlan(value);
            }}
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => option.value}
            disabled={!selectedNetwork || dataPlans.length === 0}
            loading={dataPackageLoading}
          />
        </View>

        <View style={styles.btn}>
          <CustomBtn
            label="Continue"
            onPress={handleContinue}
            disabled={
              isLoading || !phoneNumber || !selectedNetwork || !selectedDataPlan
            }
          />
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

export default DataScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: wp(4),
  },
  input: {
    marginTop: hp(3.5),
    gap: hp(1.5),
  },
  btn: {
    marginTop: "auto",
    marginBottom: hp(3),
  },
});
