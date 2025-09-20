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
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { MaterialIcons } from "@expo/vector-icons";
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

  // Compact empty state component
  const CompactEmptyState = () => (
    <View style={styles.emptyContainer}>
      <MaterialIcons 
        name="receipt-long" 
        size={32} 
        color="rgba(102, 126, 234, 0.4)" 
      />
      <RegularText size="small" style={styles.emptyText}>
        No recent transactions
      </RegularText>
    </View>
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
        <View style={styles.loadingContainer}>
          <LottieView
            autoPlay
            loop
            source={require("@/assets/json/loading.json")}
            style={{ width: 150, height: 150 }}
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
        <CompactEmptyState />
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
    marginBottom: hp(0.5),
  },
  item: {
    marginVertical: 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    alignItems: "center",
    paddingTop: hp(4),
    gap: hp(1),
  },
  emptyText: {
    color: '#9ca3af',
    textAlign: 'center',
  },
});