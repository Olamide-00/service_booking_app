import { View, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/src/component/common/header";
import { styles } from "./style";
import { MediumText, RegularText } from "@/src/component/text/indext";
import OTP from "@/src/component/common/OTP";
import Spacer from "@/src/component/common/spacer";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import CustomBtn from "@/src/component/common/customBtn";
import { useVerifyOtp, useResendOtp } from "@/src/api/hooks/useAuth";
import { useNavigation, useRoute } from "@react-navigation/native";
import ToastMessage from "@/src/component/common/toastMessage";

const OTPInput = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { email } = route.params;

  const [otp, setOtp] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [sucess, setSuccess] = useState<boolean>(false);

  const { mutate: verifyOtp, isPending, isError } = useVerifyOtp();
  const { mutate: resendOTP, isSuccess, isPending: isLoading } = useResendOtp();

  const handleVerifyOtp = () => {
    if (otp.length === 6) {
      verifyOtp(
        { otp, email },
        {
          onSuccess: () => {
            navigation.navigate("Success", {
              message: "Account Successfully verified Pls login ",
            });
          },
          onError: () => {
            setVisible(true);
            setMessage("Invalid OTP");
            setSuccess(false);
          },
        }
      );
    } else {
      setVisible(true);
      setMessage("Please input a valid OTP");
      setSuccess(false);
    }
  };

  const handleResendOtp = () => {
    if (email) {
      resendOTP({ email });
    }
  };
  useEffect(() => {
    if (isError) {
      setVisible(true);
      setMessage("Invalid OTP");
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      setVisible(true);
      setMessage("Resend successfully");
      setSuccess(true);
    }
  }, [isSuccess]);

  const loading = isLoading || isPending;

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <>
        <Header showBackButton label="Verification" />
        <View style={styles.root}>
          <View>
            <View style={styles.title}>
              <RegularText size="medium">
                Enter the 6-digit OTP sent to your email address {"\n"} {email}
              </RegularText>
              <RegularText size="small" color="primary">
                check your spam folder if you don't see it
              </RegularText>
            </View>
            <Spacer size={hp(5)} />
            <OTP
              column={6}
              value={otp}
              setValue={setOtp}
              func={handleResendOtp}
            />
          </View>
          <View style={styles.btn}>
            <CustomBtn
              label="Continue"
              onPress={handleVerifyOtp}
              isLoading={loading}
              disabled={loading}
            />
          </View>
          <ToastMessage
            isVisible={visible}
            message={message}
            onClose={() => setVisible(false)}
            isSuccessful={sucess}
          />
        </View>
      </>
    </TouchableWithoutFeedback>
  );
};

export default OTPInput;
