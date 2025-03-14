import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, View } from "react-native";
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

interface ServiceOption {
  label: string;
  value: string;
}

interface PackageOption {
  label: string;
  value: string;
  amount: string;
}

interface NavigationPayload {
  serviceID: string;
  billersCode: string;
  variation_code: string;
  amount: string;
  phoneNumber: string;
  quantity: number;
}

const TVScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  // Fetch all TV subscription services
  const {
    data: servicesData,
    isLoading: servicesLoading,
    isError: servicesError,
  } = useGetAllServices("tv-subscription");

  const serviceOptions: ServiceOption[] = servicesData?.data?.content
    ? servicesData.data.content.map((item: any) => ({
        label: item.name,
        value: item.serviceID,
      }))
    : [];

  const [selectedService, setSelectedService] = useState<string>("");
  const [smartcardNumber, setSmartcardNumber] = useState<string>("");
  const [selectedPackage, setSelectedPackage] = useState<string>("");
  const [customerName, setCustomerName] = useState<string>("");

  // Fetch packages for the selected service
  const {
    data: packagesData,
    isLoading: packagesLoading,
    isError: packagesError,
  } = useGetServicePLan(selectedService);

  const packageOptions: PackageOption[] = packagesData?.data?.content
    ?.variations
    ? packagesData.data.content.variations.map((pkg: any) => ({
        label: pkg.name,
        value: pkg.variation_code,
        amount: pkg.variation_amount,
      }))
    : [];

  // Use the verify mutation hook
  const { mutate: verify, isPending: isVerifying } = useVerify();

  // Auto-trigger verification when service and smartcard number are set
  useEffect(() => {
    if (selectedService && smartcardNumber) {
      verify(
        { serviceID: selectedService, billersCode: smartcardNumber },
        {
          onSuccess: (data) => {
            setCustomerName(data.data?.content.Customer_Name);
          },
          onError: (error) => {
            Alert.alert(
              "Verification Failed",
              error.message || "Something went wrong"
            );
          },
        }
      );
    }
  }, [selectedService, smartcardNumber, verify]);

  const handleContinue = () => {
    if (
      !selectedService ||
      !smartcardNumber ||
      !selectedPackage ||
      !customerName
    ) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    const selectedPackageObj: PackageOption | undefined = packageOptions.find(
      (pkg: PackageOption) => pkg.value === selectedPackage
    );

    const payload: NavigationPayload = {
      serviceID: selectedService,
      billersCode: smartcardNumber,
      variation_code: selectedPackage,
      amount: selectedPackageObj?.amount || "",
      phoneNumber: "08011111111",
      quantity: 1,
    };

    navigation.navigate("ReviewScreen1", payload);
  };

  return (
    <SafeAreaView style={styles.root}>
      <Header label="TV Subscription" showLogo />
      <View style={styles.input}>
        <Selector
          label="Service Type"
          options={serviceOptions}
          onSelect={(value: string) => {
            setSelectedService(value);
            setSelectedPackage("");
          }}
          selectedValue={selectedService}
          disabled={servicesLoading || !!servicesError}
        />

        <CustomTextInput
          placeholder="Enter smartcard number"
          title="Smartcard Number"
          keyboardType="numeric"
          value={smartcardNumber}
          setValue={setSmartcardNumber}
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

        <Selector
          label="Packages"
          options={packageOptions}
          onSelect={(value: string) => setSelectedPackage(value)}
          selectedValue={selectedPackage}
          disabled={
            !selectedService ||
            packagesLoading ||
            !!packagesError ||
            packageOptions.length === 0
          }
        />
      </View>

      <View style={styles.btn}>
        <CustomBtn label="Continue" onPress={handleContinue} />
      </View>
    </SafeAreaView>
  );
};

export default TVScreen;

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
  customerName: {
    marginTop: hp(-4),
    alignSelf: "flex-end",
  },
});
