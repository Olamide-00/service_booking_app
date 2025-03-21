import { FlatList, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import useAuthStore from "@/src/store/userStore";
// import Item from "./item";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "@/src/component/common/emptyState";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS } from "@/src/constant/COLORS";
import Item from "@/src/component/common/item";
import { useTransferHistory } from "@/src/api/hooks/useTransfer";

// Define the navigation type
type RootStackParamList = {
  StackNavigation: {
    screen: string;
    params: { transaction: TransactionProps };
  };
};

type TransactionProps = {
  label: string;
  amount: string;
  status: string;
  date: string;
};

const TransferComponent = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [date, setDate] = useState<string>("Select Date");

  const userData = useAuthStore((state) => state.userData);
  const email = userData?.email || "";

  const {
    data: histories = [],
    isLoading,
    isError,
  } = useTransferHistory(email);

  const renderItem = ({ item }: { item: TransactionProps }) => (
    <Item
      transaction={item}
      onPress={() => {
        navigation.navigate("StackNavigation", {
          screen: "TransactionDetails",
          params: { transaction: item },
        });
      }}
    />
  );

  return (
    <SafeAreaView style={styles.root}>
      {histories.length > 0 ? (
        <FlatList
          data={histories}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          contentContainerStyle={styles.seperator}
        />
      ) : (
        <EmptyState message="No Transaction" />
      )}
    </SafeAreaView>
  );
};

export default TransferComponent;

const styles = StyleSheet.create({
  root: {},
  title: {
    alignSelf: "center",
  },

  input: {
    borderWidth: 0.5,
    borderColor: COLORS.border,
    borderRadius: 8,
    width: wp(78),
    height: hp(6.5),
    paddingHorizontal: wp(4),
  },
  item: {
    flex: 1,
  },
  seperator: {
    gap: hp(3),
  },
  empty: {
    flex: 1,
    marginTop: hp(20),
  },
});
