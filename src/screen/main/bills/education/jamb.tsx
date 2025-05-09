import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/src/constant/COLORS";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Header from "@/src/component/common/header";
import Selector from "@/src/component/common/selector";
import useAuthStore from "@/src/store/userStore";
import CustomTextInput from "@/src/component/common/customTextInput";
import CustomBtn from "@/src/component/common/customBtn";
import { useGetServicePLan } from "@/src/api/hooks/useBills";
import { useNavigation } from "@react-navigation/native";
import Spacer from "@/src/component/common/spacer";
import useVerify from "@/src/api/hooks/useVerify";
import { RegularText } from "@/src/component/text/indext";

const Jamb = () => {
  const navigation = useNavigation();
  const { data, isLoading } = useGetServicePLan("jamb");

  const variations = data?.data?.content?.variations || [];
  const serviceID = data?.data?.content?.serviceID;

  const options = variations.map((item) => ({
    label: item.name,
    value: item.variation_code,
  }));

  const userData = useAuthStore((state) => state.userData);
  const phoneNumber = userData?.phoneNumber;

  const [number, setNumber] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [selectedExamType, setSelectedExamType] = useState<string>("");
  const [profileCode, setProfileCode] = useState<string>("");
  const [profileError, setProfileError] = useState<string>("");
  const [customerName, setCustomerName] = useState<string>("");

  // update amount when exam type changes
  useEffect(() => {
    const selectedItem = variations.find(
      (item) => item.variation_code === selectedExamType
    );
    const unitAmount = parseFloat(selectedItem?.variation_amount || "0");
    setAmount(unitAmount);
  }, [selectedExamType, variations]);

  // verify profile
  const { mutate: verify, isPending: isVerifying } = useVerify();

  useEffect(() => {
    const shouldVerify = serviceID && profileCode.length === 10;

    if (shouldVerify) {
      verify(
        { serviceID, billersCode: profileCode },
        {
          onSuccess: (data) => {
            const customer =
              data?.data?.content?.Customer_Name || "Invalid Profile";
            setCustomerName(customer);
          },
          onError: () => {
            setCustomerName("");
          },
        }
      );
    }
  }, [serviceID, profileCode, verify]);

  // profile code validation
  useEffect(() => {
    if (profileCode && profileCode.length !== 10) {
      setProfileError("Profile code must be 10 digits");
    } else {
      setProfileError("");
    }
  }, [profileCode]);

  const handleContinue = () => {
    const payload = {
      amount,
      variation_code: selectedExamType,
      serviceID,
      phoneNumber: phoneNumber || number,
      customerName,
      billersCode: profileCode,
    };

    navigation.navigate("ReviewScreen1", payload);
  };

  const isPhoneValid = phoneNumber || number.length > 10;
  const isProfileCodeValid = profileCode.length === 10;
  const isFormValid = selectedExamType && isPhoneValid && isProfileCodeValid;

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <>
        <Header showLogo label="Jamb" />
        <View style={styles.root}>
          <View style={styles.container}>
            <Selector
              label="Exam Type"
              onSelect={setSelectedExamType}
              selectedValue={selectedExamType}
              options={options}
              loading={isLoading}
            />
            <Spacer size={hp("0%")} />
            {!phoneNumber && (
              <CustomTextInput
                title="Phone Number"
                value={number}
                setValue={setNumber}
                keyboardType="numeric"
                error=""
                maxLength={14}
                acceptContact
              />
            )}
            <View style={styles.profileContainer}>
              <CustomTextInput
                value={profileCode}
                setValue={setProfileCode}
                title="Profile Code"
                error={profileError}
                maxLength={10}
              />
              <View style={styles.error}>
                {customerName && (
                  <RegularText size="small" color="secondaryColor">
                    {customerName}
                  </RegularText>
                )}
              </View>
            </View>

            <CustomTextInput
              value={amount.toString()}
              setValue={() => {}}
              title="Amount"
              keyboardType="numeric"
              editable={false}
              error=""
            />
          </View>
          <View style={styles.btn}>
            <CustomBtn
              label={isVerifying ? "Verifying..." : "Continue"}
              onPress={handleContinue}
              disabled={!isFormValid || isVerifying}
              isLoading={isVerifying}
            />
          </View>
        </View>
      </>
    </TouchableWithoutFeedback>
  );
};

export default Jamb;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: wp("4%"),
    paddingTop: hp("5%"),
  },
  container: {
    gap: hp("1.5%"),
  },
  btn: {
    marginTop: "auto",
    marginBottom: hp("3%"),
  },
  error: {
    alignItems: "flex-end",
    marginTop: hp("-1.5%"),
  },
});
