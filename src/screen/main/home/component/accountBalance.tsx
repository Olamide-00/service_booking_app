import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { BoldText, MediumText, RegularText } from "@/src/component/text/indext";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "@/src/constant/COLORS";
import { LinearGradient } from 'expo-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as Clipboard from "expo-clipboard";
import ToastMessage from "@/src/component/common/toastMessage";
import { useNavigation } from "@react-navigation/native";

type AccountBalanceProps = {
  balance: number;
  wallet: string;
};

const AccountBalance = ({ balance, wallet }: AccountBalanceProps) => {
  const navigation = useNavigation();
  const [isBalanceVisible, setIsBalanceVisible] = React.useState(false);
  const [isToastVisible, setIsToastVisible] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>("");
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);

  // Format balance properly
  const formattedBalance = new Intl.NumberFormat("en-NG", {
    style: "decimal",
    minimumFractionDigits: 2,
  }).format(balance);

  const dots = () => {
    return [1, 2, 3].map((index) => (
      <View style={styles.dotContainer} key={index}>
        <View style={styles.dot} />
      </View>
    ));
  };

  const copyToClipboard = () => {
    Clipboard.setStringAsync(wallet);
    setIsToastVisible(true);
    setIsSuccess(true);
    setMessage("Copied to clipboard");
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.cardContainer}
      >
        {/* Background decorative elements */}
        <MaterialIcons 
          name="account-balance-wallet"
          size={80}
          color="rgba(255, 255, 255, 0.08)"
          style={styles.backgroundIcon}
        />
        
        {/* Decorative shapes */}
        <View style={styles.decorativeCircle1} />
        <View style={styles.decorativeCircle2} />
        <View style={styles.decorativeSquare} />
        
        {/* Card content */}
        <View style={styles.cardContent}>
          {/* Header with label and icon */}
          <View style={styles.headerRow}>
            <View style={styles.labelContainer}>
              <MaterialIcons 
                name="account-balance" 
                size={18} 
                color="rgba(255, 255, 255, 0.8)" 
                style={styles.labelIcon}
              />
              <MediumText size="medium" style={styles.labelText}>
                Account Balance
              </MediumText>
            </View>
            <View style={styles.statusIndicator} />
          </View>
          
          {/* Balance display */}
          <Pressable
            style={styles.balanceContainer}
            onPress={() => setIsBalanceVisible(!isBalanceVisible)}
          >
            <View style={styles.balanceRow}>
              <BoldText size="xlarge" style={styles.balanceText}>
                ₦{isBalanceVisible ? formattedBalance : dots()}
              </BoldText>
              <View style={styles.eyeIconContainer}>
                <Ionicons
                  name={isBalanceVisible ? "eye-off" : "eye"}
                  size={22}
                  color="rgba(255, 255, 255, 0.9)"
                />
              </View>
            </View>
          </Pressable>
          
          {/* Account Details Section */}
          <View style={styles.accountDetailsSection}>
            {/* Account Details Button */}
            <Pressable
              style={({ pressed }) => [
                styles.accountButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={() =>
                navigation.navigate("StackNavigation", { screen: "FundWallet" })
              }
            >
              <View style={styles.buttonContent}>
                <Ionicons name="wallet-outline" size={18} color="rgba(255, 255, 255, 0.9)" />
                <RegularText size="small" style={styles.buttonText}>
                  Account Details
                </RegularText>
              </View>
            </Pressable>

            {/* Wallet Address Card */}
            <Pressable
              style={({ pressed }) => [
                styles.walletCard,
                pressed && styles.cardPressed,
              ]}
              onPress={copyToClipboard}
            >
              <View style={styles.walletContent}>
                <View style={styles.walletTextContainer}>
                  <RegularText size="small" numberOfLines={1} style={styles.walletText}>
                    {wallet ?? "0123456789"}
                  </RegularText>
                </View>
                <View style={styles.copyBadge}>
                  <Ionicons name="copy-outline" size={10} color="rgba(255, 255, 255, 0.9)" />
                </View>
              </View>
            </Pressable>
          </View>
          
          {/* Bottom accent line */}
          <View style={styles.accentLine} />
        </View>
        
        {/* Subtle shine effect */}
        <View style={styles.shineEffect} />
      </LinearGradient>

      <ToastMessage
        isVisible={isToastVisible}
        message={message}
        onClose={() => setIsToastVisible(false)}
        isSuccessful={isSuccess}
      />
    </View>
  );
};

export default AccountBalance;

const styles = StyleSheet.create({
  container: {
    marginVertical: hp("1%"),
  },
  cardContainer: {
    borderRadius: 20,
    padding: wp("5%"),
    position: 'relative',
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  backgroundIcon: {
    position: 'absolute',
    top: -20,
    right: -20,
    transform: [{ rotate: '15deg' }],
  },
  decorativeCircle1: {
    position: 'absolute',
    top: -30,
    left: -30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  decorativeCircle2: {
    position: 'absolute',
    bottom: -20,
    right: 30,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  decorativeSquare: {
    position: 'absolute',
    bottom: 20,
    left: -10,
    width: 20,
    height: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 4,
    transform: [{ rotate: '45deg' }],
  },
  cardContent: {
    position: 'relative',
    zIndex: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp("1.5%"),
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp("2%"),
  },
  labelIcon: {
    opacity: 0.8,
  },
  labelText: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontWeight: '500',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4ade80',
    shadowColor: '#4ade80',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  balanceContainer: {
    marginBottom: hp("2%"),
  },
  balanceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  balanceText: {
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    flex: 1,
  },
  eyeIconContainer: {
    padding: wp("2%"),
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    marginRight: 6,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
  },
  dotContainer: {
    paddingHorizontal: wp("1%"),
  },
  // Account Details Section Styles
  accountDetailsSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp("3%"),
    marginBottom: hp("1.5%"),
  },
  accountButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 12,
    paddingVertical: hp("1.2%"),
    paddingHorizontal: wp("3%"),
    minHeight: hp("4.5%"),
    justifyContent: "center",
  },
  walletCard: {
    flex: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    paddingVertical: hp("1%"),
    paddingHorizontal: wp("3%"),
    minHeight: hp("4.5%"),
    justifyContent: "center",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: wp("2%"),
  },
  walletContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  walletTextContainer: {
    flex: 1,
    marginRight: wp("2%"),
  },
  walletText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: "500",
    letterSpacing: 0.5,
  },
  copyBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: wp("1.5%"),
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    minWidth: hp("3%"),
    minHeight: hp("3%"),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  buttonText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: "600",
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  accentLine: {
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 1,
    width: '40%',
  },
  shineEffect: {
    position: 'absolute',
    top: 0,
    left: -30,
    width: 20,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    transform: [{ skewX: '-15deg' }],
    zIndex: 1,
  },
});