import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./style";
import Header from "@/src/component/common/header";
import OTPInput from "@/src/component/common/pinEntry";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useVerifyPIN } from "@/src/api/hooks/usePIN";
import useAuthStore from "@/src/store/userStore";
import { usePayBills } from "@/src/api/hooks/useBills";
import ToastMessage from "@/src/component/common/toastMessage";

type RouteParams = {
  serviceID?: any;
  variation_code?: any;
  amount?: any;
  phoneNumber?: any;
  billersCode?: any;
  type: string;
};

const PIN = () => {
  const navigation = useNavigation<any>();
  const userData = useAuthStore((state: any) => state.userData);
  const email = userData?.email;

  const route = useRoute<any>();
  const { serviceID, variation_code, amount, phoneNumber, billersCode, type } =
    (route.params as RouteParams) || {};

  const [pin, setPin] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { mutate: verifyPin, isPending: isVerifying } = useVerifyPIN();
  const { mutate: payBill, isPending: isPaying } = usePayBills();
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
            payBill(
              {
                serviceID,
                variation_code,
                amount,
                phone: phoneNumber,
                email,
                billersCode,
                type,
              },
              {
                onSuccess: (response: any) => {
                  setLoading(false);

                  const isSuccess =
                    response?.success === true &&
                    response?.data?.response_description?.includes(
                      "TRANSACTION SUCCESSFUL"
                    );

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
  }, [pin]);

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

export default PIN;
