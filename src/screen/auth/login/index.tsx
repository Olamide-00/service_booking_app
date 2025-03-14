import { Image, TouchableOpacity, View, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { BoldText, MediumText, RegularText } from "@/src/component/text/indext";
import { styles } from "./style";
import CustomTextInput from "@/src/component/common/customTextInput";
import Spacer from "@/src/component/common/spacer";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import CustomBtn from "@/src/component/common/customBtn";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as LocalAuthentication from "expo-local-authentication";
import ToastMessage from "@/src/component/common/toastMessage";
import useAuthStore from "@/src/store/userStore";
import { useLogin } from "@/src/api/hooks/useAuth";
import * as SecureStore from "expo-secure-store";

const Login = () => {
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const { setIsAuthenticated } = useAuthStore();
  const { mutate: login, isPending } = useLogin();
  const isBioEnable = useAuthStore((state) => state.isBioEnable);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
  };

  const validate = () => {
    let newErrors = { email: "", password: "" };
    const { email, password } = formData;

    if (!email.includes("@")) newErrors.email = "Enter a valid email";
    if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSignUp = () => {
    navigation.navigate("SignUp");
  };

  const handleBiometricAuth = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!hasHardware || !isEnrolled) {
      return Alert.alert(
        "Error",
        "Biometric authentication is not available on this device."
      );
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate with Fingerprint",
      fallbackLabel: "Enter Password",
    });

    if (result.success) {
      setIsVisible(true);
      setSuccess(true);
      setMessage("Login Success");
      setIsAuthenticated(true);
    } else {
      setIsVisible(true);
      setMessage("Login Failed");
      setSuccess(false);
    }
  };

  const handleLogin = () => {
    if (!validate()) return;

    login(
      { email: formData.email, password: formData.password },
      {
        onSuccess: async (data) => {
          console.log("Login Success:", data);
          await SecureStore.setItemAsync("token", data.token);
          const userData = {
            email: data.user.email,
            name: data.user.name,
            phoneNumber: data.user.phoneNumber,
            isWalletCreated: data.user.isWalletCreated,
            balance: data.user.balance,
            profilePicture: data.user.profilePicture,
          };

          // Update Zustand store
          useAuthStore.getState().login(data.token, userData);
          setIsAuthenticated(true);
        },
        onError: (err) => {
          console.error("Login Failed:", err);
          setIsVisible(true);
          setSuccess(false);
          setMessage("Login Failed");
        },
      }
    );
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Spacer size={hp(5)} direction="vertical" />
        <Image source={require("../../../../assets/images/remit.png")} />
        <Spacer size={hp(3)} direction="vertical" />
        <BoldText size="large">Login To Remit</BoldText>
      </View>
      <Spacer size={hp(3)} direction="vertical" />
      <View style={styles.inputContainer}>
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
          isPassword2
          error={errors.password}
        />
      </View>
      <TouchableOpacity
        style={styles.forgetPassword}
        onPress={() => navigation.navigate("ForgetPassword")}
      >
        <RegularText size="small" color="secondaryColor">
          Forget Password
        </RegularText>
      </TouchableOpacity>
      <Spacer size={hp(3)} direction="vertical" />
      <CustomBtn
        label="Login"
        onPress={handleLogin}
        disabled={isPending}
        isLoading={isPending}
      />
      <Spacer direction="vertical" size={hp(2)} />
      <TouchableOpacity style={{ alignSelf: "center" }} onPress={handleSignUp}>
        <MediumText size="medium">I Don't Have An Account</MediumText>
      </TouchableOpacity>
      <View>
        {isBioEnable && (
          <>
            <View style={styles.viewContainer}>
              <View style={styles.view} />
              <BoldText size="medium">or</BoldText>
              <View style={styles.view} />
            </View>
            <TouchableOpacity
              style={styles.bioContainer}
              onPress={handleBiometricAuth}
            >
              <Ionicons name="finger-print" size={40} />
              <RegularText size="small">Login with Biometric</RegularText>
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* modal */}
      <ToastMessage
        message={message}
        isVisible={isVisible}
        isSuccessful={success}
        onClose={() => setIsVisible(false)}
      />
    </SafeAreaView>
  );
};

export default Login;
