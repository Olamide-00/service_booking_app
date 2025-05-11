import { StyleSheet, Text, View, Share, Alert } from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/src/component/common/header";
import Spacer from "@/src/component/common/spacer";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Card from "@/src/component/common/card";
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
        }
        .watermark {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 200px;
          font-weight: bold;
          color: rgba(0, 0, 0, 0.05);
          z-index: 0;
          border-radius: 50%;
          width: 300px;
          height: 300px;
          text-align: center;
          line-height: 300px;
          border: 2px solid rgba(0,0,0,0.05);
        }
        .content {
          position: relative;
          z-index: 1;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .logo {
          font-size: 30px;
          font-weight: bold;
          color: ${COLORS.primary};
        }
        .title {
          font-size: 20px;
          font-weight: bold;
        }
        .subtitle {
          font-size: 14px;
          color: #666;
        }
        .amount {
          font-size: 32px;
          font-weight: bold;
          color: ${
            transaction.type === "DEBIT"
              ? COLORS.secondaryColor
              : COLORS.primary
          };
          text-align: center;
          margin: 20px 0;
        }
        .status {
          text-align: center;
          padding: 10px;
          border-radius: 6px;
          background-color: ${
            transaction.status === "SUCCESS" ? "#e6f7ee" : "#fff3e0"
          };
          color: ${transaction.status === "SUCCESS" ? "#00a859" : "#ff9800"};
          font-weight: bold;
          margin-bottom: 20px;
        }
        .divider {
          border-top: 1px solid #eee;
          margin: 20px 0;
        }
        .detail-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .detail-label {
          color: #777;
          font-weight: 600;
        }
        .footer {
          text-align: center;
          margin-top: 40px;
          font-size: 12px;
          color: #999;
        }
      </style>
    </head>
    <body>
      <div class="receipt-wrapper">
        <div class="watermark">R</div>
        <div class="content">
          <div class="header">
            <div class="logo">Remit</div>
            <div class="title">Transaction Receipt</div>
            <div class="subtitle">${formatDate(
              transaction.date || transaction.transaction_date
            )}</div>
          </div>

          <div class="amount">₦${formattedBalance}</div>

          <div class="status">${transaction.status || transaction.type}</div>

          <div class="divider"></div>

          <div class="detail-row">
            <div class="detail-label">Service:</div>
            <div>${transaction.service || transaction.type || "N/A"}</div>
          </div>

          ${
            transaction.receipentName || name
              ? `
          <div class="detail-row">
            <div class="detail-label">${
              transaction.type === "DEBIT" ? "Recipient" : "Sender"
            }:</div>
            <div>${transaction.receipentName || name || "N/A"}</div>
          </div>
          `
              : ""
          }

          ${
            transaction.account_number
              ? `
          <div class="detail-row">
            <div class="detail-label">Account Number:</div>
            <div>${transaction.account_number}</div>
          </div>
          `
              : ""
          }

          ${
            transaction.destinationBankName
              ? `
          <div class="detail-row">
            <div class="detail-label">Bank Name:</div>
            <div>${transaction.destinationBankName}</div>
          </div>
          `
              : ""
          }

          ${
            transaction.token
              ? `
          <div class="detail-row">
            <div class="detail-label">Token:</div>
            <div>${transaction.token.replace("Token : ", "")}</div>
          </div>
          `
              : ""
          }

          ${
            transaction.jambPin
              ? `
          <div class="detail-row">
            <div class="detail-label">PIN:</div>
            <div>${transaction.jambPin}</div>
          </div>
          `
              : ""
          }

          <div class="detail-row">
            <div class="detail-label">Date:</div>
            <div>${formatDate(
              transaction.date || transaction.transaction_date
            )}</div>
          </div>

          <div class="detail-row">
            <div class="detail-label">Reference:</div>
            <div>${transaction.transactionReference || "N/A"}</div>
          </div>

          <div class="divider"></div>

          <div class="footer">
            Thank you for using Remit<br>
            support@remit.com<br>
            ${new Date().getFullYear()} © Remit
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
      <Header showLogo label="Transaction Details" />
      <SafeAreaView style={styles.root}>
        <Spacer size={hp(3)} direction="vertical" />

        {/* Transaction Summary Card */}
        <Card style={styles.card}>
          {transaction.service ? (
            <MediumText size="medium">{transaction.service}</MediumText>
          ) : (
            <MediumText size="medium">{transaction.type}</MediumText>
          )}

          <BoldText size="large" color="primary">
            ₦{formattedBalance}
          </BoldText>
          <View style={styles.item2}>
            {transaction.status === "SUCCESS" ? (
              <CardReceive size={18} color={COLORS.primary} />
            ) : (
              <LayoutMaximize size={18} color={COLORS.secondaryColor} />
            )}
            <RegularText
              size="small"
              color={transaction.type === "DEBIT" ? "error" : "primary"}
            >
              {transaction.type ?? transaction.status}
            </RegularText>
          </View>
        </Card>
        <Spacer size={hp(2)} />
        {/* Transaction Details Card */}
        <Card style={styles.card2}>
          <MediumText size="large" color="primary">
            Transaction Details
          </MediumText>
          {transaction.service === "BANK_TRANSFER" && (
            <>
              <Item label="Receipient Name" value={transaction.name} />
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
              label={
                transaction.receipentBank
                  ? "Recipient Bank"
                  : "Recipient Number"
              }
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
        </Card>

        {/* Share Button */}
        <Spacer size={hp(10)} />
        <CustomBtn disabled={isLoading} label="Share" onPress={generateReceiptPDF} />
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
  },
  item2: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(3),
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  card2: {
    gap: hp(1.5),
    marginTop: hp(2),
  },
});
