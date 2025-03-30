import { View, FlatList } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetBillsHistory } from "@/src/api/hooks/useBills";
import useAuthStore from "@/src/store/userStore";
import Header from "@/src/component/common/header";
import { styles } from "./style";
import { MediumText, RegularText } from "@/src/component/text/indext";
import Card from "@/src/component/common/card";
import { MotiView } from "moti";
import DateSelector from "@/src/component/common/dateSelector";
import EmptyState from "@/src/component/common/emptyState";
import Spacer from "@/src/component/common/spacer";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

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
      animate={{ opacity: 1 }}
      transition={{ loop: true, type: "timing", duration: 800 }}
    >
      <Card style={[styles.card, { backgroundColor: "#E0E0E0", padding: 10 }]}>
        <View>
          <View
            style={{
              width: 100,
              height: 15,
              backgroundColor: "#ccc",
              borderRadius: 4,
              marginBottom: 5,
            }}
          />
          <View
            style={{
              width: 80,
              height: 10,
              backgroundColor: "#ddd",
              borderRadius: 4,
            }}
          />
        </View>
        <View>
          <View
            style={{
              width: 70,
              height: 15,
              backgroundColor: "#ccc",
              borderRadius: 4,
              marginBottom: 5,
            }}
          />
          <View
            style={{
              width: 50,
              height: 10,
              backgroundColor: "#ddd",
              borderRadius: 4,
            }}
          />
        </View>
      </Card>
    </MotiView>
  );
};

const Notification = () => {
  const userData = useAuthStore((state) => state.userData);
  const email = userData?.email;

  const { data: Notification, isLoading, isError } = useGetBillsHistory(email);
  const [selectedDate, setSelectedDate] = useState("");

  if (isLoading) {
    return (
      <SafeAreaView style={styles.root}>
        <Header showLogo />
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          keyExtractor={(item) => item.toString()}
          renderItem={() => <SkeletonLoader />}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    );
  }

  if (isError || !Notification || Notification.length === 0) {
    return (
      <SafeAreaView style={styles.root}>
        <Header showLogo />
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <EmptyState message="No Notifications at the moment" />
        </View>
      </SafeAreaView>
    );
  }

  // Filter notifications by selected date
  const filteredNotifications = selectedDate
    ? Notification.filter((item) => {
        const itemDate = formatDate(item.date);
        return itemDate === formatDate(selectedDate);
      })
    : Notification;

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <View>
        <MediumText size="medium" color="primary">
          {item.service}
        </MediumText>
        <RegularText size="small">{formatDate(item.date)}</RegularText>
      </View>
      <View>
        <MediumText size="medium" color="primary">
          {formatAmount(item.amount)}
        </MediumText>
        <RegularText
          size="small"
          color={item.status === "FAILED" ? "secondaryColor" : "primary"}
        >
          {item.status}
        </RegularText>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.root}>
      <Header showLogo />
      <DateSelector
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        label="Notification Date"
      />

      <Spacer size={hp(4)} />

      {filteredNotifications.length > 0 ? (
        <FlatList
          data={filteredNotifications}
          keyExtractor={(item) => item._id || item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <EmptyState message="No records found for the selected date" />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Notification;
