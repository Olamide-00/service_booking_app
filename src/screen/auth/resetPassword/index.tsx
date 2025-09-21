import {
  Keyboard,
  StyleSheet,
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
import { useUpdatePassword } from "@/src/api/hooks/useAuth";
import ToastMessage from "@/src/component/common/toastMessage";
import {
  useNavigation,
  useRoute,
  NavigationProp,
} from "@react-navigation/native";

type ResetPasswordRouteParams = {
  email: string;
};

const ResetPassword = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute();

  const { email } = (route.params as ResetPasswordRouteParams) || { email: "" };

  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [OTP, setOTP] = useState<string>("");

  const { mutate: passwordData, isPending: otpLoading } = useUpdatePassword();

  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const handleRequestOTP = () => {
    if (!password || !confirmPassword || !OTP) {
      alert("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    passwordData(
      { email, password, otp: OTP },
      {
        onSuccess: () => {
          setOpen(true);
          setMessage("OTP sent to mail");
          setSuccess(true);
          navigation.navigate("Success", {
            message: "Password changed successfully",
          });
        },
        onError: () => {
          setOpen(true);
          setMessage("Error occurred");
          setSuccess(false);
        },
      }
    );
  };
  const disable = !OTP || !password || !confirmPassword || otpLoading;

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.root}>
        <Header showBackButton />
        <View>
          <BoldText size="large" color="primary">
            Change Password
          </BoldText>
          <RegularText size="medium">
            Enter a new password with the received OTP code
          </RegularText>
        </View>
        <Spacer size={hp(8)} direction="vertical" />
        <CustomTextInput
          placeholder="Enter new password"
          title="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry
        />
        <CustomTextInput
          placeholder="Enter password again"
          title="Confirm Password"
          value={confirmPassword}
          setValue={setConfirmPassword}
          secureTextEntry
        />
        <CustomTextInput
          placeholder="Enter OTP code"
          title="OTP Code"
          value={OTP}
          setValue={setOTP}
          keyboardType="numeric"
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

export default ResetPassword;

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
