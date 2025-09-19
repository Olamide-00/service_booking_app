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
import { styles } from "./style";
import { BoldText, RegularText } from "@/src/component/text/indext";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/src/constant/COLORS";
// import AccountDetails from "./component/accountDetails";
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

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.headerContainer} key={route.key}>
        <View style={styles.nameContainer}>
          <Pressable
            style={styles.imageContainer}
            onPress={() => navigation.navigate("PROFILE")}
          >
            {imageLogo ? (
              <Image source={{ uri: imageLogo }} style={styles.image} />
            ) : (
              <Ionicons name="person-circle" size={50} color={COLORS.primary} />
            )}
          </Pressable>
          <View>
            <BoldText size="large" color="black">
              Hello, {firstName}!
            </BoldText>
            <View style={styles.tagContainer}>
              <RegularText size="medium" color="secondaryColor">
                {/* {userData?.tag} */} Remit Tag
              </RegularText>
              <View style={styles.tag}>
                <RegularText size="small" color="white">
                  {userData?.tag}
                </RegularText>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("StackNavigation", { screen: "Support" })
            }
          >
            <LottieView
              autoPlay
              loop
              source={require("@/assets/json/support.json")}
              style={{ width: 60, height: 60 }}
            />
          </TouchableOpacity>
          <Ionicons
            name="notifications"
            size={24}
            color={COLORS.primary}
            onPress={() =>
              navigation.navigate("StackNavigation", { screen: "Notification" })
            }
          />
        </View>
      </View>

      {/* Account status */}
      {/* {userData?.isWalletCreated ? (
        <AccountDetails wallet={accountNumber} />
      ) : (
        <Banner />
      )} */}
      {/* <Spacer direction="vertical" size={hp(3)} /> */}

      {/* Account balance */}
      <AccountBalance balance={currentBalance ?? balance?.data ?? "0.00"} wallet={accountNumber} />
      <Spacer direction="vertical" size={hp(0.5)} />

      {/* Transaction action */}
      <TransactionAction />
      <Spacer direction="vertical" size={hp(1)} />

      {/* Quick action */}
      <QuickAction />
      {/* <Spacer direction="vertical" size={hp(1)} /> */}

      {/* Recent transactions */}
      <RecentHistory email={email} />

      {/* modals */}
    </SafeAreaView>
  );
};

export default Home;
