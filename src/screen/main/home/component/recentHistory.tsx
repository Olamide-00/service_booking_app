import React from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { BoldText, RegularText } from "@/src/component/text/indext";
import Item from "@/src/component/common/item";
import { heightPercentageToDP } from "react-native-responsive-screen";
import EmptyState from "@/src/component/common/emptyState";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useGetBillsHistory } from "@/src/api/hooks/useBills";
import LottieView from "lottie-react-native";

// Define the navigation type
type RootStackParamList = {
  StackNavigation: { screen: string; params: { transaction: historyProps } };
  Transaction: undefined;
};

type historyProps = {
  label: string;
  amount: string;
  status: string;
  date: string;
};

type Prop = {
  email: string;
};

const RecentHistory = ({ email }: Prop) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {
    data: histories = [],
    isLoading,
    isError,
  } = useGetBillsHistory(email);

  // Get the latest 5 transactions
  const recentHistories = histories.slice(0, 5);

  const renderItem = ({ item }: { item: historyProps }) => (
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
    <View style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.headerContainer}>
        <BoldText size="large">Recent Transactions</BoldText>
        <TouchableOpacity onPress={() => navigation.navigate("Transaction")}>
          <RegularText size="medium" color="primary">
            View all
          </RegularText>
        </TouchableOpacity>
      </View>

      {/* Loading State */}
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <LottieView
            autoPlay
            loop
            source={require("@/assets/json/loading.json")}
            style={{ width: 250, height: 250 }}
          />
        </View>
      ) : recentHistories.length > 0 ? (
        <FlatList
          data={recentHistories}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={5}
          showsVerticalScrollIndicator={false}
          maxToRenderPerBatch={20}
          updateCellsBatchingPeriod={50}
          windowSize={5}
          ItemSeparatorComponent={() => <View style={styles.item} />}
        />
      ) : (
        <EmptyState message="No Recent Transactions" />
      )}
    </View>
  );
};

export default RecentHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: heightPercentageToDP(2),
  },
  item: {
    marginVertical: 5,
  },
});
