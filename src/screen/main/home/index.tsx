import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./style";
import { BoldText } from "@/src/component/text/indext";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/src/constant/COLORS";
import AccountDetails from "./component/accountDetails";
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
import { useNavigation, useRoute } from "@react-navigation/native";
import useAuthStore from "@/src/store/userStore";
import { useWalletDetails } from "@/src/api/hooks/useWallet";
import { useGetBalance } from "@/src/api/hooks/useAuth";
import * as SecureStore from "expo-secure-store";

const Home = () => {
  const navigation = useNavigation();
  const userData = useAuthStore((state) => state.userData);
  const route = useRoute();
  const { walletData: walletDetails, isLoading, error } = useWalletDetails();
  const firstAccount = walletDetails?.accounts[0].accountNumber;
  const email = userData?.email;
  const { balance } = useGetBalance(email);
  const [firstName, lastName] = userData?.name.split(" ") ?? ["", ""];
  const imageLogo = userData?.profilePicture;

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
          <BoldText size="large" color="black">
            Hello, {firstName}!
          </BoldText>
        </View>
        <Ionicons name="notifications" size={28} color={COLORS.primary} />
      </View>
      <Spacer direction="vertical" size={hp(2.5)} />

      {/* Account status */}
      {userData?.isWalletCreated ? (
        <AccountDetails wallet={firstAccount} />
      ) : (
        <Banner />
      )}
      <Spacer direction="vertical" size={hp(3)} />

      {/* Account balance */}
      <AccountBalance balance={balance?.data} />
      <Spacer direction="vertical" size={hp(2)} />

      {/* Transaction action */}
      <TransactionAction />
      <Spacer direction="vertical" size={hp(2)} />

      {/* Quick action */}
      <QuickAction />
      <Spacer direction="vertical" size={hp(1)} />

      {/* Recent transactions */}
      <RecentHistory email={email} />

      {/* modals */}
    </SafeAreaView>
  );
};

export default Home;
