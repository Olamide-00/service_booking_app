import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS } from "@/src/constant/COLORS";
import Header from "@/src/component/common/header";
import { BoldText, RegularText } from "@/src/component/text/indext";
import Spacer from "@/src/component/common/spacer";
import CustomTextInput from "@/src/component/common/customTextInput";
import CustomBtn from "@/src/component/common/customBtn";
import { useResetOTP } from "@/src/api/hooks/useAuth";
import ToastMessage from "@/src/component/common/toastMessage";
import { useNavigation } from "@react-navigation/native";

const ForgetPassword = () => {
  const navigation = useNavigation();

  const [email, setEmail] = React.useState<string>("");
  const { mutate: otpDAta, isPending: otpLoading } = useResetOTP();

  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const handleRequestOTP = () => {
    if (!email) {
      alert("Email is required");
      return;
    }
    otpDAta(
      { email: email.toLowerCase() },
      {
        onSuccess: () => {
          setOpen(true);
          setMessage("OTP sent to mail");
          setSuccess(true);
          navigation.navigate("ResetPassword", { email: email });
        },
        onError: () => {
          setOpen(true);
          setMessage("Error occurred");
          setSuccess(false);
        },
      }
    );
  };
  const disable = otpLoading || !email;

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.root}>
        <Header showLogo />
        <View>
          <BoldText size="large" color="primary">
            Reset Password
          </BoldText>
          <RegularText size="medium">
            Enter the email linked with your account to proceed
          </RegularText>
        </View>
        <Spacer size={hp(8)} direction="vertical" />
        <CustomTextInput
          placeholder="Enter your email"
          title="Email Address"
          value={email}
          setValue={setEmail}
        />
        <View style={styles.btn}>
          <CustomBtn
            label="Continue"
            onPress={handleRequestOTP}
            isLoading={otpLoading}
            disabled={disable}
          />
        </View>
        <ToastMessage
          isVisible={open}
          onClose={() => setOpen(false)}
          message={message}
          isSuccessful={success}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: wp(4),
    backgroundColor: COLORS.white,
  },
  btn: {
    position: "absolute",
    bottom: hp(4),
    alignSelf: "center",
  },
});
