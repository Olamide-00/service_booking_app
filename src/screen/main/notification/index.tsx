import { View, FlatList } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetBillsHistory } from "@/src/api/hooks/useBills";
import useAuthStore from "@/src/store/userStore";
import Header from "@/src/component/common/header";
import { MediumText, RegularText } from "@/src/component/text/indext";
import { MaterialIcons } from "@expo/vector-icons";
import { MotiView } from "moti";
import DateSelector from "@/src/component/common/dateSelector";
import Spacer from "@/src/component/common/spacer";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS } from "@/src/constant/COLORS";

const formatDate = (dateString) => {
  if (!dateString) return "Unknown Date";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

const formatAmount = (amount) => {
  if (!amount) return "₦0.00";
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(amount);
};

const SkeletonLoader = () => {
  return (
    <MotiView
      from={{ opacity: 0.3 }}
      animate={{ opacity: 0.8 }}
      transition={{ loop: true, type: "timing", duration: 1000 }}
      style={styles.skeletonCard}
    >
      <View style={styles.skeletonLeft}>
        <View style={styles.skeletonTitle} />
        <View style={styles.skeletonSubtitle} />
      </View>
      <View style={styles.skeletonRight}>
        <View style={styles.skeletonAmount} />
        <View style={styles.skeletonStatus} />
      </View>
    </MotiView>
  );
};

// Compact empty state component
const CompactEmptyState = ({ message, showDateHint = false }) => (
  <View style={styles.emptyContainer}>
    <MaterialIcons 
      name="notifications-none" 
      size={32} 
      color="rgba(102, 126, 234, 0.4)" 
    />
    <RegularText size="small" style={styles.emptyText}>
      {message}
    </RegularText>
    {showDateHint && (
      <RegularText size="small" style={styles.emptySubtext}>
        Try selecting a different date
      </RegularText>
    )}
  </View>
);

const Notification = () => {
  const userData = useAuthStore((state) => state.userData);
  const email = userData?.email;

  const { data: Notification, isLoading, isError } = useGetBillsHistory(email);
  const [selectedDate, setSelectedDate] = useState("");

  // Filter notifications by selected date
  const filteredNotifications = selectedDate
    ? Notification?.filter((item) => {
        const itemDate = formatDate(item.date);
        return itemDate === formatDate(selectedDate);
      }) || []
    : Notification || [];

  const renderItem = ({ item }) => (
    <View style={styles.notificationCard}>
      {/* Status indicator */}
      <View style={[
        styles.statusIndicator,
        { backgroundColor: item.status === "FAILED" ? "#ef4444" : "#10b981" }
      ]} />
      
      {/* Content */}
      <View style={styles.cardContent}>
        {/* Left section */}
        <View style={styles.leftSection}>
          <View style={styles.iconContainer}>
            <MaterialIcons 
              name={item.status === "FAILED" ? "error-outline" : "check-circle-outline"}
              size={20} 
              color={item.status === "FAILED" ? "#ef4444" : "#10b981"}
            />
          </View>
          
          <View style={styles.detailsContainer}>
            <MediumText size="medium" style={styles.serviceName}>
              {item.service || "Transaction"}
            </MediumText>
            <View style={styles.metaRow}>
              <MaterialIcons name="schedule" size={14} color="#6b7280" />
              <RegularText size="small" style={styles.dateText}>
                {formatDate(item.date)}
              </RegularText>
            </View>
          </View>
        </View>

        {/* Right section */}
        <View style={styles.rightSection}>
          <MediumText 
            size="medium" 
            style={[
              styles.amount,
              { color: item.status === "FAILED" ? "#ef4444" : "#10b981" }
            ]}
          >
            {formatAmount(item.amount)}
          </MediumText>
          <View style={[
            styles.statusBadge,
            { 
              backgroundColor: item.status === "FAILED" ? "#fef2f2" : "#f0fdf4",
              borderColor: item.status === "FAILED" ? "#fecaca" : "#bbf7d0"
            }
          ]}>
            <RegularText 
              size="small" 
              style={[
                styles.statusText,
                { color: item.status === "FAILED" ? "#dc2626" : "#16a34a" }
              ]}
            >
              {item.status || "PENDING"}
            </RegularText>
          </View>
        </View>
      </View>

      {/* Arrow indicator */}
      <MaterialIcons 
        name="chevron-right" 
        size={20} 
        color="rgba(107, 114, 128, 0.3)"
        style={styles.arrowIcon}
      />
    </View>
  );

  return (
    <>
      <Header showBackButton={true} label="Notifications" />
      <SafeAreaView style={styles.root}>
        {/* Background decorative elements */}
        <View style={styles.backgroundContainer}>
          <View style={styles.dot1} />
          <View style={styles.dot2} />
          <View style={styles.dot3} />
        </View>

        {/* Date Filter */}
        <View style={styles.dateSection}>
          <DateSelector
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            label="Filter by Date"
          />
        </View>

        <Spacer size={hp(2)} />

        {/* Content */}
        <View style={styles.contentContainer}>
          {isLoading ? (
            <FlatList
              data={[1, 2, 3, 4, 5, 6]}
              keyExtractor={(item) => item.toString()}
              renderItem={() => <SkeletonLoader />}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContainer}
            />
          ) : isError || !Notification || Notification.length === 0 ? (
            <CompactEmptyState message="No notifications at the moment" />
          ) : filteredNotifications.length > 0 ? (
            <FlatList
              data={filteredNotifications}
              keyExtractor={(item) => item._id || item.id}
              renderItem={renderItem}
              initialNumToRender={20}
              maxToRenderPerBatch={20}
              updateCellsBatchingPeriod={50}
              windowSize={5}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContainer}
            />
          ) : (
            <CompactEmptyState 
              message="No notifications found" 
              showDateHint={!!selectedDate} 
            />
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

export default Notification;

const styles = {
  root: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: wp("4%"),
    position: 'relative',
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  dot1: {
    position: 'absolute',
    top: hp("10%"),
    right: wp("15%"),
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(102, 126, 234, 0.12)',
  },
  dot2: {
    position: 'absolute',
    top: hp("30%"),
    left: wp("10%"),
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(118, 75, 162, 0.10)',
  },
  dot3: {
    position: 'absolute',
    bottom: hp("40%"),
    right: wp("20%"),
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(102, 126, 234, 0.08)',
  },
  dateSection: {
    zIndex: 1,
  },
  contentContainer: {
    flex: 1,
    zIndex: 1,
  },
  listContainer: {
    paddingBottom: hp("2%"),
    gap: hp("1%"),
  },
  
  // Notification card styles
  notificationCard: {
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
    position: 'relative',
  },
  statusIndicator: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: wp("2%"),
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: wp("3%"),
  },
  iconContainer: {
    width: hp("5%"),
    height: hp("5%"),
    borderRadius: hp("2.5%"),
    backgroundColor: '#f9fafb',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  detailsContainer: {
    flex: 1,
    gap: hp("0.3%"),
  },
  serviceName: {
    color: '#1f2937',
    fontWeight: '600',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp("1.5%"),
  },
  dateText: {
    color: '#6b7280',
  },
  rightSection: {
    alignItems: 'flex-end',
    gap: hp("0.5%"),
  },
  amount: {
    fontWeight: '700',
  },
  statusBadge: {
    paddingHorizontal: wp("2%"),
    paddingVertical: hp("0.2%"),
    borderRadius: 6,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  arrowIcon: {
    marginLeft: wp("2%"),
  },
  
  // Skeleton loader styles
  skeletonCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: '#f9fafb',
    paddingHorizontal: wp("4%"),
    paddingVertical: hp("2%"),
    marginHorizontal: wp("1%"),
    borderRadius: 16,
    marginBottom: hp("1%"),
  },
  skeletonLeft: {
    flex: 1,
    gap: hp("0.5%"),
  },
  skeletonTitle: {
    width: wp("25%"),
    height: 14,
    backgroundColor: "#e5e7eb",
    borderRadius: 4,
  },
  skeletonSubtitle: {
    width: wp("20%"),
    height: 12,
    backgroundColor: "#f3f4f6",
    borderRadius: 4,
  },
  skeletonRight: {
    alignItems: 'flex-end',
    gap: hp("0.5%"),
  },
  skeletonAmount: {
    width: wp("15%"),
    height: 14,
    backgroundColor: "#e5e7eb",
    borderRadius: 4,
  },
  skeletonStatus: {
    width: wp("12%"),
    height: 12,
    backgroundColor: "#f3f4f6",
    borderRadius: 4,
  },
  
  // Empty state styles
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
};