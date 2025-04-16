import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  TextInputProps,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RegularText } from "../text/indext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Spacer from "./spacer";

interface CustomTextInputProps extends TextInputProps {
  title?: string;
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
  keyboardType?: "default" | "numeric" | "email-address" | "visible-password";
  maxLength?: number;
  secureTextEntry?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  isPassword?: boolean;
  isPassword2?: boolean;
  isConfirmPassword?: boolean;
  error?: string;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  title,
  value,
  setValue,
  placeholder,
  keyboardType,
  maxLength,
  secureTextEntry = false,
  multiline = false,
  numberOfLines = 1,
  isPassword = false,
  isPassword2 = false,
  isConfirmPassword = false,
  error = "",
  ...otherProps
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(secureTextEntry);
  const [isPassword2Visible, setIsPassword2Visible] = useState(secureTextEntry);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(secureTextEntry);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const togglePasswordVisibility = () => {
    if (isPassword) {
      setIsPasswordVisible(!isPasswordVisible);
    } else if (isPassword2) {
      setIsPassword2Visible(!isPassword2Visible);
    } else if (isConfirmPassword) {
      setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
    }
  };

  // Password strength function
  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const getStrengthColor = (strength: number) => {
    const colors = [
      "#FF0000",
      "rgba(255, 0, 0, 0.5)",
      "rgba(144, 238, 144, 0.5)",
      "#4CAF50",
    ];
    return colors[strength] || "#ccc";
  };

  const handleTextChange = (text: string) => {
    setValue(text);
    if (isPassword) {
      setPasswordStrength(checkPasswordStrength(text));
    }
  };

  return (
    <View style={styles.container}>
      {title && <RegularText size="medium">{title}</RegularText>}
      <Spacer size={hp(1)} />
      <View
        style={[styles.inputContainer, { borderColor: error ? "red" : "#ccc" }]}
      >
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={handleTextChange}
          placeholder={placeholder}
          keyboardType={keyboardType}
          maxLength={maxLength}
          secureTextEntry={
            isPassword
              ? isPasswordVisible
              : isPassword2
              ? isPassword2Visible
              : isConfirmPassword
              ? isConfirmPasswordVisible
              : false
          }
          multiline={multiline}
          numberOfLines={numberOfLines}
          {...otherProps}
        />
        {(isPassword || isPassword2 || isConfirmPassword) && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.icon}
          >
            <Ionicons
              name={
                (isPassword && isPasswordVisible) ||
                (isPassword2 && isPassword2Visible) ||
                (isConfirmPassword && isConfirmPasswordVisible)
                  ? "eye-off"
                  : "eye"
              }
              size={24}
              color="#666"
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Error Message */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Password Strength Indicator */}
      {isPassword && value.length > 0 && (
        <View style={styles.strengthIndicatorContainer}>
          {Array.from({ length: 4 }).map((_, index) => (
            <View
              key={index}
              style={[
                styles.strengthBar,
                {
                  backgroundColor:
                    index < passwordStrength ? getStrengthColor(index) : "#ccc",
                },
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    height: hp("6%"),
    width: wp("90%"),
  },
  input: {
    flex: 1,
    fontSize: 14,
    paddingLeft: hp("2%"),
  },
  icon: {
    padding: 10,
  },
  errorText: {
    color: "red",
    fontSize: 10,
    marginTop: 5,
  },
  strengthIndicatorContainer: {
    flexDirection: "row",
    marginTop: 14,
    alignSelf: "flex-start",
  },
  strengthBar: {
    height: 4,
    width: wp("21%"),
    marginRight: 5,
    borderRadius: 2,
  },
});

export default CustomTextInput;
