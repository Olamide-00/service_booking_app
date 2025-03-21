import { FlatList, StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import useAuthStore from "@/src/store/userStore";
import { useGetBillsHistory } from "@/src/api/hooks/useBills";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "@/src/component/common/emptyState";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS } from "@/src/constant/COLORS";
import Item from "@/src/component/common/item";

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
  date?: string;
  transaction_date?: string;
};

// Receive selectedDate as a prop
const BillsComponent = ({ selectedDate }: { selectedDate: string }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const userData = useAuthStore((state) => state.userData);
  const email = userData?.email || "";

  const {
    data: histories = [],
    isLoading,
    isError,
  } = useGetBillsHistory(email);

  // Convert selectedDate to a comparable format
  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    return new Date(dateString).toISOString().split("T")[0];
  };

  // Filter histories by selected date, checking both `date` and `transaction_date`
  const filteredHistories = selectedDate
    ? histories.filter((item: TransactionProps) => {
        const formattedItemDate = formatDate(
          item.transaction_date || item.date
        );
        return formattedItemDate === selectedDate;
      })
    : histories;

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
      {filteredHistories.length > 0 ? (
        <FlatList
          data={filteredHistories}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          contentContainerStyle={styles.separator}
        />
      ) : (
        <EmptyState message="No Transaction" />
      )}
    </SafeAreaView>
  );
};

export default BillsComponent;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
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
  separator: {
    gap: hp(3),
  },
  empty: {
    flex: 1,
    marginTop: hp(20),
  },
});
