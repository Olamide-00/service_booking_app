import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./style";
import Header from "@/src/component/common/header";
import OTPInput from "@/src/component/common/pinEntry";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useVerifyPIN } from "@/src/api/hooks/usePIN";
import useAuthStore from "@/src/store/userStore";
import { useTransfer } from "@/src/api/hooks/useTransfer";
import ToastMessage from "@/src/component/common/toastMessage";
import { StackNavigationProp } from "@react-navigation/stack";

type RouteParams = {
  destinationBankCode: string;
  destinationAccountNumber: string;
  narration: string;
  amount: string;
};

type RootStackParamList = {
  Success: { message: string };
};

interface TransferResponse {
  success: boolean;
  data?: {
    response_description?: string;
  };
}

const TransferPIN = () => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, "Success">>();
  const userData = useAuthStore((state) => state.userData);
  const email = userData?.email || "";

  const route = useRoute();
  const { destinationBankCode, destinationAccountNumber, narration, amount } =
    (route.params as RouteParams) || {};

  const [pin, setPin] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { mutate: verifyPin, isPending: isVerifying } = useVerifyPIN();
  const { mutate: transfer, isPending: isPaying } = useTransfer();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (pin.length === 4) {
      setLoading(true);
      verifyPin(
        { email, pin },
        {
          onSuccess: () => {
            transfer(
              {
                email,
                destinationAccountNumber,
                destinationBankCode,
                narration,
                amount: parseInt(amount, 10),
              },
              {
                onSuccess: (response: TransferResponse) => {
                  setLoading(false);

                  const isSuccess = response?.data?.success === true;

                  if (isSuccess) {
                    navigation.navigate("Success", {
                      message: "Transaction Completed",
                    });
                  } else {
                    setIsVisible(true);
                    setMessage(
                      response?.data?.response_description ||
                        "Payment Failed. Try again."
                    );
                    setSuccess(false);
                  }
                },
                onError: () => {
                  setLoading(false);
                  setIsVisible(true);
                  setMessage("Payment Failed. Try again.");
                  setSuccess(false);
                },
              }
            );
          },
          onError: () => {
            setLoading(false);
            setIsVisible(true);
            setMessage("Incorrect PIN");
            setSuccess(false);
          },
        }
      );
    }
  }, [
    pin,
    verifyPin,
    transfer,
    email,
    destinationAccountNumber,
    destinationBankCode,
    narration,
    amount,
    navigation,
  ]);

  return (
    <SafeAreaView style={styles.root}>
      <Header showIcon label="Transaction PIN" />

      {/* Loading Overlay (Only visible when loading) */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      )}

      <View style={styles.input}>
        <OTPInput columns={4} onChangeOTP={setPin} />
      </View>

      <ToastMessage
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        message={message}
        isSuccessful={success}
      />
    </SafeAreaView>
  );
};

export default TransferPIN;
