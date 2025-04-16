import {
  Image,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { BoldText, MediumText } from "@/src/component/text/indext";
import { styles } from "./style";
import CustomTextInput from "@/src/component/common/customTextInput";
import Spacer from "@/src/component/common/spacer";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import CustomBtn from "@/src/component/common/customBtn";
import { useNavigation } from "@react-navigation/native";
import { useRegister } from "@/src/api/hooks/useAuth";
import { usePushNotification } from "@/src/utils/pushToken";

const SignUp = () => {
  const navigation = useNavigation();
  const { mutate: register, isPending } = useRegister();
  const expoPushToken = usePushNotification();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (field, value) => {
    let formattedValue =
      field === "name"
        ? value
        : field === "email"
        ? value.trim().toLowerCase()
        : value.trim();

    setFormData((prevData) => ({ ...prevData, [field]: formattedValue }));
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
  };

  const validate = () => {
    let newErrors = { name: "", email: "", password: "", confirmPassword: "" };
    const { name, email, password, confirmPassword } = formData;

    // Improved email validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!name) newErrors.name = "Name is required";
    if (!emailRegex.test(email)) newErrors.email = "Enter a valid email";
    if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = () => {
    if (!validate()) return;

    register(
      {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        pushToken: expoPushToken,
      },
      {
        onSuccess: (data) => {
          navigation.navigate("OTPInput", { email: formData.email });
        },
        onError: (err) => {
          console.error("Registration Failed:", err);
        },
      }
    );
  };
  const disable =
    !formData.name ||
    !formData.email ||
    !formData.password ||
    !formData.confirmPassword ||
    isPending;

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.root}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.header}>
              <Spacer size={hp(3)} direction="vertical" />
              <Image
                source={require("../../../../assets/images/REMITBRAND.png")}
                style={styles.image}
                resizeMode="cover"
              />
              <Spacer size={hp(-2)} direction="vertical" />
              <BoldText size="large">Sign Up to Remit</BoldText>
            </View>
            <Spacer size={hp(3)} direction="vertical" />
            <View style={styles.inputContainer}>
              <CustomTextInput
                placeholder="e.g. Olamide Oladele"
                title="Full Name"
                value={formData.name}
                setValue={(val) => handleInputChange("name", val)}
                error={errors.name}
              />
              <CustomTextInput
                placeholder="Enter your email address"
                title="Email"
                value={formData.email}
                setValue={(val) => handleInputChange("email", val)}
                error={errors.email}
              />
              <CustomTextInput
                placeholder="Enter your password"
                title="Password"
                value={formData.password}
                setValue={(val) => handleInputChange("password", val)}
                isPassword
                error={errors.password}
              />
              <CustomTextInput
                placeholder="Confirm your password"
                title="Confirm Password"
                value={formData.confirmPassword}
                setValue={(val) => handleInputChange("confirmPassword", val)}
                isConfirmPassword
                error={errors.confirmPassword}
              />
            </View>
            <Spacer size={hp(3)} direction="vertical" />
            <CustomBtn
              label="Sign Up"
              onPress={handleSubmit}
              disabled={disable}
              isLoading={isPending}
            />
            <Spacer direction="vertical" size={hp(2)} />
            <TouchableOpacity
              style={{ alignSelf: "center" }}
              onPress={() => navigation.navigate("Login")}
            >
              <MediumText size="medium">I Already Have An Account</MediumText>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SignUp;
