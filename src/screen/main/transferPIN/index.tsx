import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./style";
import Header from "@/src/component/common/header";
import OTPInput from "@/src/component/common/pinEntry";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useVerifyPIN } from "@/src/api/hooks/usePIN";
import useAuthStore from "@/src/store/userStore";
import { useTransfer, useTransferRemit } from "@/src/api/hooks/useTransfer";
import ToastMessage from "@/src/component/common/toastMessage";
import { StackNavigationProp } from "@react-navigation/stack";

type RouteParams = {
  destinationBankCode: string;
  destinationAccountNumber: string;
  narration: string;
  amount: string;
  senderName: string;
  receipentName: string;
  destinationBankName: string;
  tag?: string;
  name?: string;
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
  const {
    destinationBankCode,
    destinationAccountNumber,
    narration,
    amount,
    receipentName,
    senderName,
    destinationBankName,
    tag,
    name,
  } = (route.params as RouteParams) || {};

  const [pin, setPin] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { mutate: verifyPin } = useVerifyPIN();
  const { mutate: transfer } = useTransfer();
  const { mutate: transferRemit } = useTransferRemit();
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
            if (tag && name) {
              // Use `useTransferRemit` if tag and name are present
              transferRemit(
                {
                  email,
                  tag,
                  amount: parseInt(amount, 10),
                },
                {
                  onSuccess: (response: TransferResponse) => {
                    setLoading(false);

                    if (response?.data?.success) {
                      setTimeout(() => {
                        navigation.navigate("Success", {
                          message: "Transaction Completed",
                        });
                      }, 3000);
                    } else {
                      setIsVisible(true);
                      setMessage(
                        response?.data?.message || "Payment Failed. Try again."
                      );
                      setSuccess(false);
                    }
                  },
                  onError: (error: any) => {
                    setLoading(false);
                    setIsVisible(true);
                    setMessage(
                      error?.response?.data?.message ||
                        "Payment Failed. Try again."
                    );
                    setSuccess(false);
                    setTimeout(() => {
                      navigation.navigate("BottomTabs");
                    }, 3000);
                  },
                }
              );
            } else {
              // Use `useTransfer` if no tag and name are present
              transfer(
                {
                  email,
                  destinationAccountNumber,
                  destinationBankName,
                  destinationBankCode,
                  narration,
                  senderName,
                  receipentName,
                  amount: parseInt(amount, 10),
                },
                {
                  onSuccess: (response: TransferResponse) => {
                    setLoading(false);

                    if (response?.data?.success) {
                      setTimeout(() => {
                        navigation.navigate("Success", {
                          message: "Transaction Completed",
                        });
                      }, 3000);
                    } else {
                      setIsVisible(true);
                      setMessage(
                        response?.data?.message || "Payment Failed. Try again."
                      );
                      setSuccess(false);
                      setTimeout(() => {
                        navigation.navigate("BottomTabs");
                      }, 3000);
                    }
                  },
                  onError: (error: any) => {
                    setLoading(false);
                    setIsVisible(true);
                    setMessage(
                      error?.response?.data?.message ||
                        "Payment Failed. Try again."
                    );
                    setSuccess(false);
                    setTimeout(() => {
                      navigation.navigate("BottomTabs");
                    }, 3000);
                  },
                }
              );
            }
          },
          onError: (error: any) => {
            setLoading(false);
            setIsVisible(true);
            setMessage(error?.response?.data?.message || "Incorrect PIN");
            setSuccess(false);
          },
        }
      );
    }
  }, [
    pin,
    verifyPin,
    transfer,
    transferRemit,
    email,
    destinationAccountNumber,
    destinationBankCode,
    narration,
    amount,
    navigation,
    tag,
    name,
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
