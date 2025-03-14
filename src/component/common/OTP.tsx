import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState, useRef } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS } from "@/src/constant/COLORS";
import { RegularText } from "../text/indext";

type Props = {
  column: number;
  value: string;
  setValue: (val: string) => void;
  func: () => void;
};

const OTP = ({ column, value, setValue, func }: Props) => {
  const inputsRef = useRef<Array<TextInput | null>>([]);
  const [otpValues, setOtpValues] = useState<string[]>(
    new Array(column).fill("")
  );

  const handleChange = (text: string, index: number) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = text;
    setOtpValues(newOtpValues);
    setValue(newOtpValues.join(""));

    if (text && index < column - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otpValues[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <View>
      <View style={styles.container}>
        {Array.from({ length: column }, (_, index) => (
          <TextInput
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            style={[
              styles.otp,
              {
                borderColor: otpValues[index] ? COLORS.primary : COLORS.border,
              },
            ]}
            keyboardType="numeric"
            maxLength={1}
            value={otpValues[index]}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
          />
        ))}
      </View>
      <View style={styles.resend}>
        <RegularText size="small">Didn't receive OTP? </RegularText>
        <TouchableOpacity onPress={func}>
          <RegularText size="medium" color="secondaryColor">
            Resend
          </RegularText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OTP;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: wp(3),
    justifyContent: "center",
  },
  otp: {
    width: wp(11),
    height: hp(5),
    borderWidth: 1,
    textAlign: "center",
    fontSize: hp(3),
    borderRadius: 5,
    borderColor: COLORS.border,
  },
  resend: {
    marginLeft: wp(7),
    marginTop: hp(2),
    flexDirection: "row",
    gap: wp(2),
  },
});
