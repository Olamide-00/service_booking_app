import { StyleSheet, Text, View, Share, Alert } from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from "@expo/vector-icons";
import Header from "@/src/component/common/header";
import Spacer from "@/src/component/common/spacer";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BoldText, MediumText, RegularText } from "@/src/component/text/indext";
import { COLORS } from "@/src/constant/COLORS";
import { CardReceive, LayoutMaximize } from "iconsax-react-native";
import Item from "./component/item";
import { useRoute } from "@react-navigation/native";
import useAuthStore from "@/src/store/userStore";
import CustomBtn from "@/src/component/common/customBtn";
import * as Print from "expo-print";
import { captureRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";

const TransactionDetails = () => {
  const route = useRoute();
  const { transaction } = route.params;
  const userData = useAuthStore((state) => state.userData);
  const name = userData?.name;
  const [isLoading, setIsLoading] = useState(false);

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

  // Formatted amount
  const formattedBalance = new Intl.NumberFormat("en-NG", {
    style: "decimal",
    minimumFractionDigits: 2,
  }).format(transaction.amount);

  // Get status color and icon
  const getStatusInfo = () => {
    const isSuccess = transaction.status === "SUCCESS";
    const isDebit = transaction.type === "DEBIT";
    
    return {
      color: isSuccess ? (isDebit ? "#ef4444" : "#10b981") : "#f59e0b",
      bgColor: isSuccess ? (isDebit ? "#fef2f2" : "#f0fdf4") : "#fffbeb",
      borderColor: isSuccess ? (isDebit ? "#fecaca" : "#bbf7d0") : "#fed7aa",
      icon: isSuccess ? "check-circle" : "schedule",
      text: transaction.status || transaction.type || "PENDING"
    };
  };

  const statusInfo = getStatusInfo();

  const generateReceiptPDF = async () => {
    setIsLoading(true);
    try {
      const { uri } = await Print.printToFileAsync({
        html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background: #f9f9f9;
              }
              .receipt-wrapper {
                max-width: 600px;
                margin: 50px auto;
                padding: 40px;
                background-color: white;
                position: relative;
                box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                border-radius: 16px;
              }
              .watermark {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 200px;
                font-weight: bold;
                color: rgba(102, 126, 234, 0.03);
                z-index: 0;
                border-radius: 50%;
                width: 300px;
                height: 300px;
                text-align: center;
                line-height: 300px;
                border: 2px solid rgba(102, 126, 234, 0.05);
              }
              .content {
                position: relative;
                z-index: 1;
              }
              .header {
                text-align: center;
                margin-bottom: 30px;
                padding-bottom: 20px;
                border-bottom: 2px solid #f3f4f6;
              }
              .logo {
                font-size: 32px;
                font-weight: bold;
                color: ${COLORS.primary};
                margin-bottom: 8px;
              }
              .title {
                font-size: 22px;
                font-weight: bold;
                color: #1f2937;
                margin-bottom: 4px;
              }
              .subtitle {
                font-size: 14px;
                color: #6b7280;
              }
              .status-section {
                text-align: center;
                margin: 20px 0;
              }
              .amount {
                font-size: 36px;
                font-weight: bold;
                color: ${statusInfo.color};
                margin-bottom: 12px;
              }
              .status {
                display: inline-block;
                padding: 8px 16px;
                border-radius: 8px;
                background-color: ${statusInfo.bgColor};
                color: ${statusInfo.color};
                font-weight: bold;
                font-size: 12px;
                text-transform: uppercase;
                border: 1px solid ${statusInfo.borderColor};
              }
              .divider {
                border-top: 1px solid #e5e7eb;
                margin: 24px 0;
              }
              .detail-row {
                display: flex;
                justify-content: space-between;
                margin-bottom: 12px;
                padding: 8px 0;
              }
              .detail-label {
                color: #6b7280;
                font-weight: 600;
                font-size: 14px;
              }
              .detail-value {
                color: #1f2937;
                font-weight: 500;
                font-size: 14px;
                text-align: right;
              }
              .footer {
                text-align: center;
                margin-top: 40px;
                padding-top: 20px;
                border-top: 1px solid #e5e7eb;
                font-size: 12px;
                color: #9ca3af;
              }
              .footer-logo {
                color: ${COLORS.primary};
                font-weight: bold;
              }
            </style>
          </head>
          <body>
            <div class="receipt-wrapper">
              <div class="watermark">P</div>
              <div class="content">
                <div class="header">
                  <div class="logo">Payverve</div>
                  <div class="title">Transaction Receipt</div>
                  <div class="subtitle">${formatDate(
                    transaction.date || transaction.transaction_date
                  )}</div>
                </div>

                <div class="status-section">
                  <div class="amount">₦${formattedBalance}</div>
                  <div class="status">${statusInfo.text}</div>
                </div>

                <div class="divider"></div>

                <div class="detail-row">
                  <div class="detail-label">Service:</div>
                  <div class="detail-value">${transaction.service || transaction.type || "N/A"}</div>
                </div>

                ${
                  transaction.receipentName || name
                    ? `
                <div class="detail-row">
                  <div class="detail-label">${
                    transaction.type === "DEBIT" ? "Recipient" : "Sender"
                  }:</div>
                  <div class="detail-value">${transaction.receipentName || name || "N/A"}</div>
                </div>
                `
                    : ""
                }

                <div class="detail-row">
                  <div class="detail-label">Date:</div>
                  <div class="detail-value">${formatDate(
                    transaction.date || transaction.transaction_date
                  )}</div>
                </div>

                <div class="detail-row">
                  <div class="detail-label">Reference:</div>
                  <div class="detail-value">${transaction.transactionReference || "N/A"}</div>
                </div>

                <div class="footer">
                  Thank you for using <span class="footer-logo">Payverve</span><br>
                  For support: customer.payverve<br>
                  ${new Date().getFullYear()} © Payverve. All rights reserved.
                </div>
              </div>
            </div>
          </body>
        </html>
        `,
        base64: false,
      });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
        setIsLoading(false);
      } else {
        Alert.alert("Sharing is not available on this device.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error generating or sharing the PDF:", error);
      Alert.alert(
        "Error",
        "There was an issue generating or sharing the receipt."
      );
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header showBackButton={true} label="Transaction Details" />
      <SafeAreaView style={styles.root}>
        {/* Background decorative elements */}
        <View style={styles.backgroundElements}>
          <View style={styles.decorativeDot1} />
          <View style={styles.decorativeDot2} />
          <View style={styles.decorativeDot3} />
        </View>

        <Spacer size={hp(2)} direction="vertical" />

        {/* Enhanced Transaction Summary Card */}
        <View style={styles.summaryCard}>
          <LinearGradient
            colors={[statusInfo.bgColor, 'rgba(255,255,255,0.9)']}
            style={styles.summaryGradient}
          >
            {/* Status indicator bar */}
            <View style={[styles.statusBar, { backgroundColor: statusInfo.color }]} />
            
            <View style={styles.summaryContent}>
              {/* Service/Type */}
              <View style={styles.serviceSection}>
                <MaterialIcons 
                  name={transaction.service ? "business-center" : "swap-horiz"} 
                  size={24} 
                  color={statusInfo.color}
                />
                <MediumText size="large" style={styles.serviceText}>
                  {transaction.service || transaction.type}
                </MediumText>
              </View>

              {/* Amount */}
              <View style={styles.amountSection}>
                <BoldText size="xxlarge" style={[styles.amount, { color: statusInfo.color }]}>
                  ₦{formattedBalance}
                </BoldText>
              </View>

              {/* Status badge */}
              <View style={[styles.statusBadge, { 
                backgroundColor: statusInfo.bgColor,
                borderColor: statusInfo.borderColor 
              }]}>
                <MaterialIcons name={statusInfo.icon} size={16} color={statusInfo.color} />
                <RegularText size="small" style={[styles.statusText, { color: statusInfo.color }]}>
                  {statusInfo.text}
                </RegularText>
              </View>
            </View>
          </LinearGradient>
        </View>

        <Spacer size={hp(3)} />

        {/* Enhanced Details Card */}
        <View style={styles.detailsCard}>
          <View style={styles.detailsHeader}>
            <MaterialIcons name="receipt-long" size={24} color={COLORS.primary} />
            <MediumText size="large" style={styles.detailsTitle}>
              Transaction Details
            </MediumText>
          </View>

          <View style={styles.detailsContent}>
            {transaction.service === "BANK_TRANSFER" && (
              <>
                <Item label="Recipient Name" value={transaction.name} />
                <Item label="Bank Name" value={transaction.destinationBankName} />
                <Item label="Account Number" value={transaction.account_number} />
              </>
            )}
            {transaction.service === "REMIT_TRANSFER" && (
              <Item
                label={transaction.type ? "Recipient Name" : "Account Name"}
                value={transaction.receipentName || name}
              />
            )}
            {transaction.units && (
              <Item label="Units" value={transaction.units} />
            )}
            {transaction.token && (
              <Item
                label="Token"
                value={transaction.token.replace("Token : ", "")}
              />
            )}
            {transaction.receipentBank && (
              <Item
                label={transaction.receipentBank ? "Recipient Bank" : "Recipient Number"}
                value={transaction.receipentBank || transaction.unique_element}
              />
            )}
            {(transaction.service === "Bank Transfer" ||
              transaction.service === "REMIT_TRANSFER") && (
              <Item label="Sender Name" value={name} />
            )}
            {transaction.serialNumber && (
              <Item label="Serial Number" value={transaction.serialNumber} />
            )}
            {transaction.jambPin && (
              <Item label="PIN" value={transaction.jambPin} />
            )}
            <Item
              label="Transaction Date"
              value={formatDate(transaction.date || transaction.transaction_date)}
            />
            <Item
              label="Reference Number"
              value={transaction.transactionReference}
            />
          </View>
        </View>

        {/* Enhanced Share Button */}
        <Spacer size={hp(4)} />
        <View style={styles.shareButtonContainer}>
          <CustomBtn
            disabled={isLoading}
            label={isLoading ? "Generating..." : "Share Receipt"}
            onPress={generateReceiptPDF}
          />
        </View>
        <Spacer size={hp(2)} />
      </SafeAreaView>
    </>
  );
};

export default TransactionDetails;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: wp(4),
    position: 'relative',
  },
  backgroundElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  decorativeDot1: {
    position: 'absolute',
    top: hp("8%"),
    right: wp("15%"),
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(102, 126, 234, 0.12)',
  },
  decorativeDot2: {
    position: 'absolute',
    top: hp("25%"),
    left: wp("10%"),
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(118, 75, 162, 0.10)',
  },
  decorativeDot3: {
    position: 'absolute',
    bottom: hp("20%"),
    right: wp("20%"),
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(102, 126, 234, 0.08)',
  },
  summaryCard: {
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    overflow: 'hidden',
    zIndex: 1,
  },
  summaryGradient: {
    position: 'relative',
  },
  statusBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
  },
  summaryContent: {
    padding: wp("6%"),
    alignItems: 'center',
    gap: hp("2%"),
  },
  serviceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp("3%"),
  },
  serviceText: {
    color: '#1f2937',
    fontWeight: '700',
  },
  amountSection: {
    alignItems: 'center',
  },
  amount: {
    fontWeight: '800',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp("2%"),
    paddingHorizontal: wp("4%"),
    paddingVertical: hp("1%"),
    borderRadius: 20,
    borderWidth: 1,
  },
  statusText: {
    fontWeight: '700',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(102, 126, 234, 0.08)',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    zIndex: 1,
  },
  detailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp("3%"),
    paddingHorizontal: wp("5%"),
    paddingVertical: hp("2%"),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(102, 126, 234, 0.08)',
  },
  detailsTitle: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  detailsContent: {
    padding: wp("5%"),
    gap: hp("1.5%"),
  },
  shareButtonContainer: {
    zIndex: 1,
  },
});