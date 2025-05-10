import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { BoldText } from "@/src/component/text/indext";
import { COLORS } from "@/src/constant/COLORS";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import OTPInput from "@/src/component/common/pinEntry";
import { useNavigation } from "@react-navigation/native";
import Header from "@/src/component/common/header";

const CreatePin = () => {
  const navigation = useNavigation();
  const [otpValue, setOtpValue] = useState("");

  useEffect(() => {
    if (otpValue.length === 4) {
      navigation.navigate("ConfirmPin", { otp: otpValue });
    }
  }, [otpValue]);

  return (
    <>
      <Header showLogo label="Set PIN" />
      <View style={styles.root}>
        <View style={styles.otp}>
          <OTPInput columns={4} onChangeOTP={setOtpValue} />
        </View>
      </View>
    </>
  );
};

export default CreatePin;

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
});
