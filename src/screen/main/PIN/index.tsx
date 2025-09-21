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
  percentRev?: number;
};

const PIN = () => {
  const navigation = useNavigation<any>();
  const userData = useAuthStore((state: any) => state.userData);
  const email = userData?.email;

  const route = useRoute<any>();
  const {
    serviceID,
    variation_code,
    amount,
    phoneNumber,
    billersCode,
    type,
    percentRev,
  } = (route.params as RouteParams) || {};

  const [pin, setPin] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { mutate: verifyPin, isPending: isVerifying } = useVerifyPIN();
  const { mutate: payBill, isPending: isPaying } = usePayBills();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  // console.log(percentRev, amount);

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
                percentRev,
              },
              {
                onSuccess: (response: any) => {
                  setLoading(false);

                  const isSuccess =
                    response?.success === true &&
                    response?.data?.response_description?.includes(
                      "TRANSACTION SUCCESSFUL"
                    );

                  const hasToken =
                    typeof response?.data?.token === "string" &&
                    response?.data?.token.trim() !== "";
                  const hasUnits =
                    typeof response?.data?.units === "string" &&
                    response?.data?.units.trim() !== "";

                  if (isSuccess && hasToken && hasUnits) {
                    setIsVisible(true);
                    setMessage("Transaction Successful");
                    setSuccess(true);

                    setTimeout(() => {
                      navigation.navigate("ElectReceipt", {
                        data: response?.data,
                      });
                    }, 3000);
                  } else if (isSuccess) {
                    setIsVisible(true);
                    setMessage("Transaction Completed");
                    setSuccess(true);

                    setTimeout(() => {
                      navigation.navigate("Success", {
                        message: "Transaction Completed",
                      });
                    }, 3000);
                  } else {
                    setIsVisible(true);
                    setMessage("Payment Failed. Try again.");
                    setSuccess(false);

                    setTimeout(() => {
                      navigation.navigate("BottomTabs");
                    }, 3000);
                  }
                },
                onError: (error) => {
                  setLoading(false);
                  setIsVisible(true);
                  const errorMessage =
                    error?.message || "Payment Failed. Try again.";
                  setMessage(errorMessage);
                  setSuccess(false);

                  setTimeout(() => {
                    navigation.navigate("BottomTabs");
                  }, 3000);
                },
              }
            );
          },
          onError: (error) => {
            setLoading(false);
            setIsVisible(true);
            const errorMessage = "Incorrect PIN.";
            setMessage(errorMessage);
            setSuccess(false);

            setTimeout(() => {
              navigation.navigate("BottomTabs");
            }, 3000);
          },
        }
      );
    }
  }, [pin]);

  return (
    <>
      <Header label="Transaction PIN" />
      <View style={styles.root}>
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
      </View>
    </>
  );
};

export default PIN;
