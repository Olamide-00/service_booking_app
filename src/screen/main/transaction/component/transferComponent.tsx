import { FlatList, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import useAuthStore from "@/src/store/userStore";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS } from "@/src/constant/COLORS";
import { useTransferHistory } from "@/src/api/hooks/useTransfer";
import { BoldText, RegularText, MediumText } from "@/src/component/text/indext";
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
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const filteredHistories = selectedDate
    ? histories.filter((item: HistoryProps) => {
        const itemDate = new Date(item.date).toISOString().split("T")[0];
        return itemDate === selectedDate;
      })
    : histories;

  // Compact empty state
  const CompactEmptyState = () => (
    <View style={styles.emptyContainer}>
      <MaterialIcons 
        name="swap-horiz" 
        size={32} 
        color="rgba(102, 126, 234, 0.4)" 
      />
      <RegularText size="small" style={styles.emptyText}>
        No transfer history found
      </RegularText>
      {selectedDate && (
        <RegularText size="small" style={styles.emptySubtext}>
          Try selecting a different date
        </RegularText>
      )}
    </View>
  );

  const renderItem = ({ item }: { item: HistoryProps }) => {
    return (
      <View style={styles.transactionCard}>
        {/* Left section - Icon and details */}
        <View style={styles.leftSection}>
          <View style={styles.iconContainer}>
            <LottieView
              autoPlay
              loop
              source={require("../../../../../assets/json/5.json")}
              style={styles.lottieIcon}
            />
          </View>
          
          <View style={styles.detailsContainer}>
            <MediumText size="medium" style={styles.senderName}>
              {item.sender_name}
            </MediumText>
            <View style={styles.metaRow}>
              <MaterialIcons name="schedule" size={14} color="#6b7280" />
              <RegularText size="small" style={styles.dateText}>
                {formatDate(item.date)}
              </RegularText>
            </View>
          </View>
        </View>

        {/* Right section - Amount */}
        <View style={styles.rightSection}>
          <View style={styles.amountContainer}>
            <BoldText size="medium" style={styles.amount}>
              +{formatAmount(item.amount)}
            </BoldText>
            <View style={styles.statusBadge}>
              <RegularText size="small" style={styles.statusText}>
                RECEIVED
              </RegularText>
            </View>
          </View>
        </View>
      </View>
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <LottieView
          autoPlay
          loop
          source={require("../../../../../assets/json/loading.json")}
          style={styles.loadingAnimation}
        />
        <RegularText size="small" style={styles.loadingText}>
          Loading transactions...
        </RegularText>
      </View>
    );
  }

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
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <CompactEmptyState />
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
  listContainer: {
    paddingVertical: hp("1%"),
    gap: hp("1%"),
  },
  transactionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: '#ffffff',
    paddingHorizontal: wp("4%"),
    paddingVertical: hp("2%"),
    marginHorizontal: wp("1%"),
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(102, 126, 234, 0.08)',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: wp("3%"),
  },
  iconContainer: {
    width: hp("6%"),
    height: hp("6%"),
    borderRadius: hp("3%"),
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
  },
  lottieIcon: {
    width: hp("4%"),
    height: hp("4%"),
  },
  detailsContainer: {
    flex: 1,
    gap: hp("0.3%"),
  },
  senderName: {
    color: '#1f2937',
    fontWeight: '600',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp("1.5%"),
  },
  cardType: {
    color: '#6b7280',
    textTransform: 'capitalize',
  },
  dateText: {
    color: '#6b7280',
  },
  rightSection: {
    alignItems: 'flex-end',
    gap: hp("0.5%"),
  },
  amountContainer: {
    alignItems: 'flex-end',
    gap: hp("0.5%"),
  },
  amount: {
    color: '#10b981',
    fontWeight: '700',
  },
  statusBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: wp("2%"),
    paddingVertical: hp("0.2%"),
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
  },
  statusText: {
    color: '#10b981',
    fontSize: 10,
    fontWeight: '600',
  },
  arrowIcon: {
    marginLeft: wp("2%"),
  },
  // Loading state
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: hp("2%"),
  },
  loadingAnimation: {
    width: 80,
    height: 80,
  },
  loadingText: {
    color: '#6b7280',
  },
  // Empty state
  emptyContainer: {
    alignItems: "center",
    paddingTop: hp(6),
    gap: hp(1.5),
  },
  emptyText: {
    color: '#9ca3af',
    textAlign: 'center',
  },
  emptySubtext: {
    color: '#d1d5db',
    textAlign: 'center',
    fontSize: 12,
  },
});