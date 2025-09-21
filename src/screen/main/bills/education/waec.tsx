import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect } from "react";
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

const Waec = () => {
  const navigation = useNavigation();
  const { data, isLoading } = useGetServicePLan("waec");

  const variations = data?.data?.content?.variations || [];
  const serviceID = data?.data?.content?.serviceID;

  const options = variations.map((item) => ({
    label: item.name,
    value: item.variation_code,
  }));

  const userData = useAuthStore((state) => state.userData);
  const phoneNumber = userData?.phoneNumber;

  const [number, setNumber] = React.useState<string>("");
  const [quantity, setQuantity] = React.useState<string>("1");
  const [amount, setAmount] = React.useState<number>(0);
  const [selectedExamType, setSelectedExamType] = React.useState<string>("");
  const [quantityError, setQuantityError] = React.useState<string>("");

  useEffect(() => {
    const selectedItem = variations.find(
      (item) => item.variation_code === selectedExamType
    );

    const unitAmount = parseFloat(selectedItem?.variation_amount || "0");
    const totalAmount = unitAmount * Math.max(parseInt(quantity || "0"), 0);
    setAmount(totalAmount);
  }, [selectedExamType, quantity, variations]);

  const handleContinue = () => {
    const payload = {
      amount,
      variation_code: selectedExamType,
      serviceID,
      phoneNumber: phoneNumber || number,
    };

    navigation.navigate("ReviewScreen1", payload);
  };

  // Validate form
  const isQuantityValid = parseInt(quantity || "0") >= 1;
  const isPhoneValid = phoneNumber || number.length > 10;
  const isFormValid = selectedExamType && isQuantityValid && isPhoneValid;

  // Show quantity error
  useEffect(() => {
    if (!isQuantityValid) {
      setQuantityError("Quantity cannot be less than 1");
    } else {
      setQuantityError("");
    }
  }, [quantity]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <>
        <Header showBackButton label="Waec" />
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
            <CustomTextInput
              value={quantity}
              setValue={setQuantity}
              title="Quantity"
              keyboardType="numeric"
              error={quantityError}
            />
            <CustomTextInput
              value={amount.toString()}
              setValue={() => {}}
              title="Amount"
              keyboardType="numeric"
              error=""
              editable={false}
            />
          </View>
          <View style={styles.btn}>
            <CustomBtn
              label="Continue"
              onPress={handleContinue}
              disabled={!isFormValid}
            />
          </View>
        </View>
      </>
    </TouchableWithoutFeedback>
  );
};

export default Waec;

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
});
