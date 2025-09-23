import { View, Text, TouchableOpacity, Share, Animated, Dimensions } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import Header from "@/src/component/common/header";
import { modernStyles } from "./style";
import {
  BoldText,
  ExtraBoldText,
  MediumText,
  RegularText,
} from "@/src/component/text/indext";
import { COLORS } from "@/src/constant/COLORS";
import Card from "@/src/component/common/card";
import { CardAdd, Copy, Share as ShareIcon, Bank, Wallet3 } from "iconsax-react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import Spacer from "@/src/component/common/spacer";
import ToastMessage from "@/src/component/common/toastMessage";
import { useWalletDetails } from "@/src/api/hooks/useWallet";
import useAuthStore from "@/src/store/userStore";
import * as Clipboard from "expo-clipboard";

const { width } = Dimensions.get('window');

const FundWallet: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>("");
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);
  const [pulseAnimation] = React.useState(new Animated.Value(1));
  const { walletData } = useWalletDetails();
  const userData = useAuthStore((state) => state.userData);

  const account = walletData?.data?.account_number;

  React.useEffect(() => {
    const pulse = () => {
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => pulse());
    };
    pulse();
  }, []);

  const copyToClipboard = (accountNumber: string) => {
    Clipboard.setStringAsync(account);
    setIsSuccess(true);
    setIsVisible(true);
    setMessage("Account Details Copied");
    
    // Button press animation
    Animated.sequence([
      Animated.timing(pulseAnimation, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(pulseAnimation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const shareDetails = async (account: string, accountName: string) => {
    try {
      await Share.share({
        message: `Payverve Account Details: ${walletData?.data.account_number} ${userData?.name}`,
      });
    } catch (error) {
      setIsVisible(true);
      setIsSuccess(false);
      setMessage("Error occurred");
    }
  };

  

  return (
    <>
      <Header label="Fund Wallet" showBackButton />
      <View style={modernStyles.root}>
        <Spacer size={hp(2)} direction="vertical" />
        <View style={modernStyles.container}>
          {account ? (
            <Animated.View style={{ transform: [{ scale: pulseAnimation }] }}>
              <View style={modernStyles.heroCard}>
                <LinearGradient
                  colors={[COLORS.primary, '#4A4AAA', '#6366F1']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={modernStyles.gradientCard}
                >
                  <View style={modernStyles.cardHeader}>
                    <View>
                      <Text style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: 14 }}>
                        Account Holder
                      </Text>
                      <Text style={{ color: 'white', fontSize: 18, fontWeight: '600', marginTop: 4 }}>
                        {userData?.name}
                      </Text>
                    </View>
                    <View style={modernStyles.walletIcon}>
                      <Wallet3 size={24} color="white" variant="Bold" />
                    </View>
                  </View>

                  <View style={modernStyles.accountSection}>
                    <Text style={modernStyles.accountNumber}>
                      {account}
                    </Text>
                    <Text style={modernStyles.bankName}>
                      {walletData?.data?.bank_name}
                    </Text>
                  </View>

                  <View style={modernStyles.actionButtons}>
                    <TouchableOpacity
                      style={modernStyles.actionBtn}
                      onPress={() => copyToClipboard(account)}
                      activeOpacity={0.8}
                    >
                      <Copy size={16} color="white" variant="Bold" />
                      <Text style={modernStyles.actionBtnText}>Copy</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      style={[modernStyles.actionBtn, modernStyles.shareBtn]}
                      onPress={() => shareDetails(account, userData?.name)}
                      activeOpacity={0.8}
                    >
                      <ShareIcon size={16} color={COLORS.primary} variant="Bold" />
                      <Text style={modernStyles.shareBtnText}>Share</Text>
                    </TouchableOpacity>
                  </View>
                </LinearGradient>
              </View>
            </Animated.View>
          ) : (
            <View style={modernStyles.emptyState}>
              <View style={modernStyles.emptyStateIcon}>
                <Bank size={40} color={COLORS.primary} variant="Bold" />
              </View>
              <Text style={{ fontSize: 18, fontWeight: '600', color: '#1E293B', marginBottom: 8 }}>
                No Account Available
              </Text>
              <Text style={{ fontSize: 14, color: '#64748B', textAlign: 'center', paddingHorizontal: wp(8) }}>
                Your virtual account will be created shortly. Please check back in a few moments.
              </Text>
            </View>
          )}

          <View style={modernStyles.tipCard}>
            <Text style={modernStyles.tipTitle}>💡 Quick Tip</Text>
            <Text style={modernStyles.tipText}>
              Transfer money to this account number from any Nigerian bank to fund your wallet instantly. 
              Funds typically reflect within 5 minutes.
            </Text>
          </View>
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