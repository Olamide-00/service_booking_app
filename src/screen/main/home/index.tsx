import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  StatusBar,
  InteractionManager,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { BoldText, RegularText, MediumText } from "@/src/component/text/indext";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "@/src/constant/COLORS";
import Spacer from "@/src/component/common/spacer";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AccountBalance from "./component/accountBalance";
import TransactionAction from "./component/transactionAction";
import Banner from "@/src/component/common/banner";
import QuickAction from "./component/quickAction";
import RecentHistory from "./component/recentHistory";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import useAuthStore from "@/src/store/userStore";
import { useWalletDetails } from "@/src/api/hooks/useWallet";
import { useGetBalance } from "@/src/api/hooks/useAuth";
import { Image } from "expo-image";
import LottieView from "lottie-react-native";
import { io } from "socket.io-client";

const Home = () => {
  const navigation = useNavigation();
  const userData = useAuthStore((state) => state.userData);
  const route = useRoute();
  const { walletData: walletDetails, isLoading, error } = useWalletDetails();
  const accountNumber = walletDetails?.data?.account_number;
  const email = userData?.email;
  const [firstName, lastName] = userData?.name.split(" ") ?? ["", ""];
  const imageLogo = userData?.profilePicture;

  const socket = io("https://remitbackend-production.up.railway.app");
  const [currentBalance, setCurrentBalance] = useState(null);

  useEffect(() => {
    if (email) {
      // Join the user room after login
      socket.emit("join", email);

      // Listen for balance updates
      socket.on("balance_updated", (data) => {
        setCurrentBalance(data.newBalance);
      });

      // Handle reconnection
      socket.on("reconnect", () => {
        console.log("✅ Reconnected to socket");
      });

      // Handle disconnection
      socket.on("disconnect", () => {
        console.log("❌ Socket disconnected");
      });

      return () => {
        socket.off("balance_updated");
        socket.off("reconnect");
        socket.off("disconnect");
        socket.disconnect();
      };
    }
  }, [email]);
  const { balance, refetch } = useGetBalance(email);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  useEffect(() => {
    const task = InteractionManager.runAfterInteractions(() => {
      StatusBar.setBarStyle("dark-content", true);
    });

    return () => task.cancel();
  }, []);

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle("dark-content", true);
      return () => {
        StatusBar.setBarStyle("light-content", true);
      };
    }, [])
  );

  const isWalletCreated = useAuthStore.getState().isWalletCreated;

  // Get current time greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <SafeAreaView style={styles.root}>
      {/* Redesigned Header Section */}
      <View style={styles.headerContainer} key={route.key}>
        {/* Top Row */}
        <View style={styles.topRow}>
          {/* Left Side - Profile */}
          <View style={styles.profileSection}>
            <Pressable
              style={styles.imageContainer}
              onPress={() => navigation.navigate("PROFILE")}
            >
              {imageLogo ? (
                <Image source={{ uri: imageLogo }} style={styles.profileImage} />
              ) : (
                <View style={styles.defaultImageContainer}>
                  <Ionicons name="person" size={28} color={COLORS.primary} />
                </View>
              )}
              <View style={styles.onlineIndicator} />
            </Pressable>
            
            <View style={styles.greetingContainer}>
              <RegularText size="small" style={styles.greetingText}>
                {getGreeting()}
              </RegularText>
              <BoldText size="large" style={styles.nameText}>
                {firstName}!
              </BoldText>
            </View>
          </View>

          {/* Right Side - Actions */}
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() =>
                navigation.navigate("StackNavigation", { screen: "Support" })
              }
            >
              <LottieView
                autoPlay
                loop
                source={require("@/assets/json/support.json")}
                style={styles.supportAnimation}
              />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() =>
                navigation.navigate("StackNavigation", { screen: "Notification" })
              }
            >
              <Ionicons
                name="notifications-outline"
                size={22}
                color={COLORS.primary}
              />
              {/* Notification badge */}
              <View style={styles.notificationBadge}>
                <Text style={styles.badgeText}>2</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Row - Tag */}
        <View style={styles.bottomRow}>
          <View style={styles.tagSection}>
            <MaterialIcons 
              name="local-offer" 
              size={16} 
              color="rgba(102, 126, 234, 0.7)" 
            />
            <RegularText size="medium" style={styles.tagLabel}>
              Remit Tag
            </RegularText>
            <View style={styles.modernTag}>
              <RegularText size="small" style={styles.tagText}>
                @{userData?.tag}
              </RegularText>
            </View>
          </View>
          
          <View style={styles.statusIndicator}>
            <MaterialIcons name="verified" size={16} color="#10b981" />
            <RegularText size="small" style={styles.statusText}>Verified</RegularText>
          </View>
        </View>
      </View>

      {/* Account balance */}
      <AccountBalance balance={currentBalance ?? balance?.data ?? "0.00"} wallet={accountNumber} />
      <Spacer direction="vertical" size={hp(0.5)} />

      {/* Transaction action */}
      <TransactionAction />
      <Spacer direction="vertical" size={hp(1)} />

      {/* Quick action */}
      <QuickAction />

      {/* Recent transactions */}
      <RecentHistory email={email} />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: wp("3%"),
    paddingTop: hp("0.5")
  },
  
  // Header Styles
  headerContainer: {
    paddingHorizontal: wp("4%"),
    paddingTop: hp("1%"),
    paddingBottom: hp("1.5%"),
  },
  
  // Top Row
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp("1.5%"),
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    marginRight: wp("3.5%"),
  },
  profileImage: {
    width: hp("6%"),
    height: hp("6%"),
    borderRadius: hp("3%"),
    borderWidth: 2,
    borderColor: 'rgba(102, 126, 234, 0.2)',
  },
  defaultImageContainer: {
    width: hp("6%"),
    height: hp("6%"),
    borderRadius: hp("3%"),
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    borderWidth: 2,
    borderColor: 'rgba(102, 126, 234, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: hp("1.5%"),
    height: hp("1.5%"),
    borderRadius: hp("0.75%"),
    backgroundColor: '#10b981',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  greetingContainer: {
    flex: 1,
  },
  greetingText: {
    color: 'rgba(102, 126, 234, 0.7)',
    marginBottom: hp("0.2%"),
  },
  nameText: {
    color: '#1f2937',
  },
  
  // Action Buttons
  actionButtonsContainer: {
    flexDirection: 'row',
    gap: wp("3%"),
  },
  actionButton: {
    width: hp("5%"),
    height: hp("5%"),
    borderRadius: hp("2.5%"),
    backgroundColor: 'rgba(102, 126, 234, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(102, 126, 234, 0.15)',
  },
  supportAnimation: {
    width: hp("2.8%"),
    height: hp("2.8%"),
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#ef4444',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '600',
  },
  
  // Bottom Row
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tagSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp("2%"),
  },
  tagLabel: {
    color: 'rgba(102, 126, 234, 0.7)',
  },
  modernTag: {
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    paddingHorizontal: wp("3%"),
    paddingVertical: hp("0.5%"),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(102, 126, 234, 0.2)',
  },
  tagText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp("1%"),
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: wp("2.5%"),
    paddingVertical: hp("0.5%"),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
  },
  statusText: {
    color: '#10b981',
    fontWeight: '500',
  },
});