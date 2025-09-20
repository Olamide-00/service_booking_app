import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Card from "./card";
import { COLORS } from "@/src/constant/COLORS";
import { BoldText, MediumText, RegularText } from "../text/indext";
import { CardReceive, LayoutMaximize } from "iconsax-react-native";

type historyProps = {
  label: string;
  amount: string;
  status: string;
  date: string;
  type: string;
};

// Function to format the date properly
const formatDate = (dateString: string) => {
  if (!dateString) return "N/A";

  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
};

const Item = ({ transaction, onPress }: { transaction: historyProps }) => {
  // formated amount
  const formattedBalance = new Intl.NumberFormat("en-NG", {
    style: "decimal",
    minimumFractionDigits: 2,
  }).format(transaction.amount);

  // Determine transaction colors and status
  const isSuccess = transaction.status === "SUCCESS";
  const isCredit = transaction.type === "CREDIT";
  
  const getStatusColor = () => {
    if (transaction.type) {
      return isCredit ? "#10b981" : "#ef4444"; // Green for credit, red for debit
    }
    return isSuccess ? "#10b981" : "#f59e0b"; // Green for success, amber for pending
  };

  const getIconBackgroundColor = () => {
    if (transaction.type) {
      return isCredit ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)";
    }
    return isSuccess ? "rgba(16, 185, 129, 0.1)" : "rgba(245, 158, 11, 0.1)";
  };

  const getStatusText = () => {
    if (transaction.type) return transaction.type;
    return transaction.status || "PENDING";
  };

  return (
    <Pressable onPress={onPress} style={styles.pressableContainer}>
      <View style={styles.container}>
        {/* Left Section - Icon and Details */}
        <View style={styles.leftSection}>
          <View style={[
            styles.iconContainer,
            { backgroundColor: getIconBackgroundColor() }
          ]}>
            {isSuccess || isCredit ? (
              <MaterialIcons 
                name="trending-up" 
                size={18} 
                color={getStatusColor()} 
              />
            ) : (
              <MaterialIcons 
                name="schedule" 
                size={18} 
                color={getStatusColor()} 
              />
            )}
          </View>
          
          <View style={styles.detailsContainer}>
            <MediumText size="medium" style={styles.serviceText}>
              {transaction.service || transaction.type || "Transaction"}
            </MediumText>
            <RegularText size="small" style={styles.dateText}>
              {formatDate(transaction.date || transaction.transaction_date)}
            </RegularText>
          </View>
        </View>

        {/* Right Section - Amount and Status */}
        <View style={styles.rightSection}>
          <BoldText size="medium" style={[
            styles.amountText,
            { color: getStatusColor() }
          ]}>
            {isCredit ? "+" : "-"}₦{formattedBalance}
          </BoldText>
          
          <View style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor() + "15" }
          ]}>
            <RegularText size="small" style={[
              styles.statusText,
              { color: getStatusColor() }
            ]}>
              {getStatusText()}
            </RegularText>
          </View>
        </View>

        {/* Subtle arrow indicator */}
        <MaterialIcons 
          name="chevron-right" 
          size={20} 
          color="rgba(107, 114, 128, 0.4)"
          style={styles.arrowIcon}
        />
      </View>
    </Pressable>
  );
};

export default Item;

const styles = StyleSheet.create({
  pressableContainer: {
    marginVertical: hp("0.5%"),
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: wp("4%"),
    paddingVertical: hp("1.8%"),
    marginHorizontal: wp("1%"),
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(102, 126, 234, 0.08)",
    elevation: 2,
    shadowColor: '#667eea',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: wp("3.5%"),
  },
  iconContainer: {
    width: hp("5%"),
    height: hp("5%"),
    borderRadius: hp("2.5%"),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "rgba(102, 126, 234, 0.15)",
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
  },
  serviceText: {
    color: "#374151",
    fontWeight: "600",
    marginBottom: hp("0.3%"),
  },
  dateText: {
    color: "#6b7280",
    fontWeight: "400",
  },
  rightSection: {
    alignItems: "flex-end",
    justifyContent: "center",
    gap: hp("0.4%"),
  },
  amountText: {
    fontWeight: "700",
    textAlign: "right",
  },
  statusBadge: {
    paddingHorizontal: wp("2.5%"),
    paddingVertical: hp("0.3%"),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(102, 126, 234, 0.1)",
  },
  statusText: {
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  arrowIcon: {
    marginLeft: wp("2%"),
  },
});