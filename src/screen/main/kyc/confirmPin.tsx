import { StyleSheet, View, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { BoldText } from "@/src/component/text/indext";
import { COLORS } from "@/src/constant/COLORS";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import OTPInput from "@/src/component/common/pinEntry";
import { useNavigation, useRoute } from "@react-navigation/native";
import ToastMessage from "@/src/component/common/toastMessage";
import useAuthStore from "@/src/store/userStore";
import { useSetPIN } from "@/src/api/hooks/usePIN";
import Header from "@/src/component/common/header";

const ConfirmPin = () => {
  const navigation = useNavigation();
  const route: any = useRoute();
  const { otp } = route.params;
  const [error, setError] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { setIsActivated, userData }: any = useAuthStore();
  const email = userData?.email;
  const [otpValue, setOtpValue] = useState<string>("");

  // Use the mutation
  const { mutate: setPin, isPending }: any = useSetPIN();

  // Function to handle PIN submission
  const handleConfirmPIN = () => {
    if (otpValue.length !== 4) return;

    if (otpValue === otp) {
      setPin(
        { pin: otpValue, email },
        {
          onSuccess: () => {
            setIsActivated(true);
            navigation.navigate("Success", {
              message: "Transaction PIN set successfully",
            });
          },
          onError: (err: any) => {
            setIsVisible(true);
            setError(err.message || "Failed to set PIN");
          },
        }
      );
    } else {
      setIsVisible(true);
      setError("PIN did not match");
    }
  };

  useEffect(() => {
    if (otpValue.length === 4) {
      handleConfirmPIN();
    }
  }, [otpValue]);

  return (
    <>
      <Header showLogo label="Confirm PIN" />
      <View style={styles.root}>
        {/* OTPInput component */}
        <View style={styles.otp}>
          <OTPInput
            columns={4}
            onChangeOTP={(value: any) => setOtpValue(value)}
          />
        </View>

        {/* Loading Indicator */}
        {isPending && (
          <View style={styles.overlay}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        )}

        {/* Toast Message */}
        <ToastMessage
          isVisible={isVisible}
          message={error}
          onClose={() => setIsVisible(false)}
        />
      </View>
    </>
  );
};

export default ConfirmPin;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: wp(4),
  },
  title: {
    alignSelf: "center",
    marginTop: hp(3),
    marginBottom: hp(8),
  },
  otp: {
    position: "absolute",
    bottom: hp(10),
    width: wp(80),
    alignSelf: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});
