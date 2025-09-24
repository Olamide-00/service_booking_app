import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
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
import useAuthStore from "@/src/store/userStore";
import ToastMessage from "@/src/component/common/toastMessage";
import Spacer from "@/src/component/common/spacer";
import { isLoading } from "expo-font";
import { usePercentage } from "@/src/api/hooks/useWallet";

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
  amount: number;
  percentRev: number;
  phoneNumber: string | null;
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
  const userData = useAuthStore((state) => state.userData);
  const isWalletCreated = userData?.isWalletCreated;

  // toast message
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const { data: percentage, isLoading } = usePercentage();
  const tvPercentage = percentage?.tv;

  // Fetch packages for the selected service
  const {
    data: packagesData,
    isLoading: loads,
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
    if (selectedService && smartcardNumber.length === 10) {
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
    if (!isWalletCreated) {
      setIsVisible(true);
      setMessage("Complete your KYC");
      setSuccess(false);
      return;
    }

    if (
      !selectedService ||
      !smartcardNumber ||
      !selectedPackage ||
      !customerName
    ) {
      setIsVisible(true);
      setMessage("All fields are required");
      setSuccess(false);
      return;
    }

    const selectedPackageObj: PackageOption | undefined = packageOptions.find(
      (pkg: PackageOption) => pkg.value === selectedPackage
    );

    if (!selectedPackageObj) {
      setIsVisible(true);
      setMessage("Invalid package selection");
      setSuccess(false);
      return;
    }

    const baseAmount = parseFloat(selectedPackageObj.amount);
    const percentRev = (tvPercentage / 100) * baseAmount;

    const payload: NavigationPayload = {
      serviceID: selectedService,
      billersCode: smartcardNumber,
      variation_code: selectedPackage,
      amount: baseAmount,
      percentRev,
      phoneNumber: userData?.phoneNumber ?? "08011111111",
      quantity: 1,
    };

    navigation.navigate("ReviewScreen1", payload);
  };

  const disable =
    !selectedService ||
    !smartcardNumber ||
    !selectedPackage ||
    !customerName ||
    packageOptions.length === 0 ||
    isVerifying;

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
        <Header label="TV Subscription" showBackButton />
        <View style={styles.root}>
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
              loading={servicesLoading}
            />

            <Spacer size={hp(0.2)} />
            <View>
              <CustomTextInput
                placeholder="Enter smartcard number"
                title="Smartcard Number"
                keyboardType="numeric"
                value={smartcardNumber}
                setValue={setSmartcardNumber}
                maxLength={10}
              />
              <View style={styles.customerName}>
                {isVerifying ? (
                  <ActivityIndicator size="small" color={COLORS.primary} />
                ) : (
                  <RegularText color="secondaryColor" size="small">
                    {customerName}
                  </RegularText>
                )}
              </View>
            </View>

            <Selector
              label="Packages"
              options={packageOptions}
              onSelect={(value: string) => setSelectedPackage(value)}
              selectedValue={selectedPackage}
              loading={loads}
            />
          </View>

          <View style={styles.btn}>
            <CustomBtn
              label="Continue"
              onPress={handleContinue}
              disabled={disable}
            />
          </View>
          <ToastMessage
            isVisible={isVisible}
            onClose={() => setIsVisible(false)}
            message={message}
            isSuccessful={success}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
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
    marginTop: "auto",
    marginBottom: hp(3),
  },
  customerName: {
    // marginTop: hp(-2.6),
    alignSelf: "flex-end",
  },
});
