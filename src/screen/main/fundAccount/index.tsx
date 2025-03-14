import { View, Text, TouchableOpacity, Share, FlatList } from "react-native";
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
import Divider from "@/src/component/common/divider";
import * as Clipboard from "expo-clipboard";
import ToastMessage from "@/src/component/common/toastMessage";
import { useWalletDetails } from "@/src/api/hooks/useWallet";

const FundWallet = () => {
  const [isVisible, setIsvisible] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>("");
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);
  const { walletData, isSuccess: isDataLoaded } = useWalletDetails();

  // Access accounts from wallet data properly
  const accounts = walletData?.accounts || [];

  const copyToClipboard = (accountNumber, accountName) => {
    Clipboard.setString(accountNumber);
    setIsSuccess(true);
    setIsvisible(true);
    setMessage("Account Details Copied");
  };

  const shareDetails = async (accountNumber, accountName) => {
    try {
      await Share.share({
        message: `Remit Account Details: ${accountNumber} ${accountName}`,
      });
    } catch (error) {
      setIsvisible(true);
      setIsSuccess(false);
      setMessage("Error occurred");
    }
  };

  const renderAccountCard = ({ item }) => (
    <Card style={{ paddingVertical: hp(3), marginBottom: hp(2) }}>
      <MediumText size="medium">Remit Account Number</MediumText>
      <BoldText size="large" color={"primary"}>
        {item.accountNumber}
      </BoldText>
      <MediumText size="small" style={{ marginTop: 5 }}>
        {item.bankName}
      </MediumText>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => copyToClipboard(item.accountNumber, item.accountName)}
        >
          <RegularText size="small" color="primary">
            Copy Number
          </RegularText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn2}
          onPress={() => shareDetails(item.accountNumber, item.accountName)}
        >
          <RegularText size="small" color="white">
            Share Details
          </RegularText>
        </TouchableOpacity>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.root}>
      {/* header */}
      <Header label="Fund Wallet" showLogo />
      <Spacer size={hp(3)} direction="vertical" />
      <View style={styles.container}>
        {accounts.length > 0 ? (
          <FlatList
            data={accounts}
            renderItem={renderAccountCard}
            keyExtractor={(item, index) =>
              item.accountNumber || index.toString()
            }
            ListFooterComponent={
              <Card style={styles.card}>
                <CardAdd size={30} color={COLORS.primary} />
                <ExtraBoldText size="medium" color="primary">
                  Fund With Card
                </ExtraBoldText>
              </Card>
            }
          />
        ) : (
          <View>
            <Card style={{ paddingVertical: hp(3) }}>
              <MediumText size="medium" style={{ textAlign: "center" }}>
                No accounts available yet
              </MediumText>
            </Card>
            <Spacer size={hp(2)} direction="vertical" />
            <Card style={styles.card}>
              <CardAdd size={30} color={COLORS.primary} />
              <ExtraBoldText size="medium" color="primary">
                Fund With Card
              </ExtraBoldText>
            </Card>
          </View>
        )}
      </View>
      <ToastMessage
        isVisible={isVisible}
        onClose={() => setIsvisible(false)}
        message={message}
        isSuccessful={isSuccess}
      />
    </SafeAreaView>
  );
};

export default FundWallet;
