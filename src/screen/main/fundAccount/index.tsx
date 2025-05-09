import { View, Text, TouchableOpacity, Share } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/src/component/common/header";
import { styles } from "./style";
import {
  BoldText,
  ExtraBoldText,
  MediumText,
  RegularText,
} from "@/src/component/text/indext";
import { COLORS } from "@/src/constant/COLORS";
import Card from "@/src/component/common/card";
import { CardAdd } from "iconsax-react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Spacer from "@/src/component/common/spacer";
import ToastMessage from "@/src/component/common/toastMessage";
import { useWalletDetails } from "@/src/api/hooks/useWallet";
import useAuthStore from "@/src/store/userStore";
import * as Clipboard from "expo-clipboard";

const FundWallet: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>("");
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);
  const { walletData } = useWalletDetails();
  const userData = useAuthStore((state) => state.userData);

  const account = walletData?.data?.account_number;

  const copyToClipboard = (accountNumber: string) => {
    Clipboard.setStringAsync(account);
    setIsSuccess(true);
    setIsVisible(true);
    setMessage("Account Details Copied");
  };

  const shareDetails = async (account: string, accountName: string) => {
    try {
      await Share.share({
        message: `Remit Account Details: ${walletData?.data.account_number} ${userData?.name}`,
      });
    } catch (error) {
      setIsVisible(true);
      setIsSuccess(false);
      setMessage("Error occurred");
    }
  };

  return (
    <>
      <Header label="Fund Wallet" showLogo />
      <View style={styles.root}>
        <Spacer size={hp(3)} direction="vertical" />
        <View style={styles.container}>
          {account ? (
            <>
              <Card style={{ paddingVertical: hp(3), marginBottom: hp(2) }}>
                <MediumText size="medium">Remit- {userData?.name}</MediumText>
                <BoldText size="large" color="primary">
                  {account}
                </BoldText>
                <MediumText
                  size="small"
                  style={{ marginTop: 5 }}
                  color="secondaryColor"
                >
                  {walletData?.data?.bank_name}
                </MediumText>
                <View style={styles.btnContainer}>
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() => copyToClipboard(account.accountNumber)}
                  >
                    <RegularText size="small" color="primary">
                      Copy Number
                    </RegularText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.btn2}
                    onPress={() =>
                      shareDetails(account.accountNumber, account.accountName)
                    }
                  >
                    <RegularText size="small" color="white">
                      Share Details
                    </RegularText>
                  </TouchableOpacity>
                </View>
              </Card>
              {/* <Card style={styles.card}>
              <CardAdd size={30} color={COLORS.primary} />
              <ExtraBoldText size="medium" color="primary">
                Fund With Card
              </ExtraBoldText>
            </Card> */}
            </>
          ) : (
            <View>
              <Card style={{ paddingVertical: hp(3) }}>
                <MediumText size="medium" style={{ textAlign: "center" }}>
                  No accounts available yet
                </MediumText>
              </Card>
              <Spacer size={hp(2)} direction="vertical" />

              {/* <Card style={styles.card}>
              <CardAdd size={30} color={COLORS.primary} />
              <ExtraBoldText size="medium" color="primary">
                Fund With Card
              </ExtraBoldText>
            </Card> */}
            </View>
          )}
        </View>
        <ToastMessage
          isVisible={isVisible}
          onClose={() => setIsVisible(false)}
          message={message}
          isSuccessful={isSuccess}
        />
      </View>
    </>
  );
};

export default FundWallet;
