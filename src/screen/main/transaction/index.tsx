import React, { useState } from "react";
import { View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BoldText, ExtraBoldText } from "@/src/component/text/indext";
import { styles } from "./style";
import Spacer from "@/src/component/common/spacer";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Item from "@/src/component/common/item";
import EmptyState from "@/src/component/common/emptyState";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import DateSelector from "@/src/component/common/dateSelector";
import { useGetBillsHistory } from "@/src/api/hooks/useBills";
import useAuthStore from "@/src/store/userStore";

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

const Transaction = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [date, setDate] = useState<string>("Select Date");

  const userData = useAuthStore((state) => state.userData);
  const email = userData?.email || "";

  const {
    data: histories = [],
    isLoading,
    isError,
  } = useGetBillsHistory(email);

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
      <View style={styles.title}>
        <ExtraBoldText size="large">Transactions</ExtraBoldText>
      </View>
      <Spacer size={hp(4)} />
      <DateSelector selectedDate={date} onDateChange={setDate} />

      <Spacer size={hp(5)} direction="vertical" />
      <BoldText size="medium">Transactions</BoldText>
      <Spacer size={hp(3)} direction="vertical" />

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

export default Transaction;
