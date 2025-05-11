import { FlatList, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import useAuthStore from "@/src/store/userStore";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "@/src/component/common/emptyState";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS } from "@/src/constant/COLORS";
import { useTransferHistory } from "@/src/api/hooks/useTransfer";
import Card from "@/src/component/common/card";
import { BoldText, RegularText } from "@/src/component/text/indext";
import LottieView from "lottie-react-native";

type HistoryProps = {
  sender_name: string;
  card_type: string;
  amount: string;
  date: string;
};

const TransferComponent = ({ selectedDate }: { selectedDate: string }) => {
  const [date, setDate] = useState<string>("Select Date");

  const userData = useAuthStore((state) => state.userData);
  const email = userData?.email || "";

  const {
    data: histories = [],
    isLoading,
    isError,
  } = useTransferHistory(email);

  const formatAmount = (amount: string | number) => {
    const amt = typeof amount === "string" ? parseFloat(amount) : amount;
    return `₦${amt.toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-NG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const filteredHistories = selectedDate
    ? histories.filter((item: HistoryProps) => {
        const itemDate = new Date(item.date).toISOString().split("T")[0];
        return itemDate === selectedDate;
      })
    : histories;

  const renderItem = ({ item }: { item: HistoryProps }) => {
    return (
      <Card style={styles.card}>
        <View style={[{ flexDirection: "row" }]}>
          <LottieView
            autoPlay
            loop
            source={require("../../../../../assets/json/5.json")}
            style={{ width: 50, height: 50 }}
          />
          <View style={styles.history}>
            <RegularText size="small" color="primary">
              {item.sender_name}
            </RegularText>
            <RegularText size="small" color="primary">
              {formatDate(item.date)}
            </RegularText>
          </View>
        </View>
        <View style={styles.history}>
          <RegularText size="small" color="primary">
            {item.card_type}
          </RegularText>
          <BoldText size="medium" color="primary">
            {formatAmount(item.amount)}
          </BoldText>
        </View>
      </Card>
    );
  };

  return (
    <SafeAreaView style={styles.root}>
      {filteredHistories.length > 0 ? (
        <FlatList
          data={filteredHistories}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          initialNumToRender={20}
          maxToRenderPerBatch={20}
          updateCellsBatchingPeriod={50}
          windowSize={5}
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
  seperator: {
    gap: hp(3),
  },
  empty: {
    flex: 1,
    marginTop: hp(20),
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
  },
  history: {
    gap: hp(1),
  },
});
