import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "./COLORS";

export const transactionActionData = [
  {
    id: 2,
    label: "Send Money",
    icon: (
      <Ionicons name="remove-circle-outline" size={18} color={COLORS.primary} />
    ),
    screen: "Transfer",
  },
  {
    id: 1,
    label: "Fund Account",
    icon: (
      <Ionicons name="add-circle-outline" size={18} color={COLORS.primary} />
    ),
    screen: "FundWallet",
  },
  {
    id: 3,
    label: "Save",
    icon: (
      <Ionicons name="add-circle-outline" size={18} color={COLORS.primary} />
    ),
    screen: "ComingSoon",
  },
];

export const QuickActionData = [
  {
    id: 1,
    label: "Data Plans",
    screen: "DataScreen",
    bg: "rgba(7, 231, 7, 0.1))",
  },
  {
    id: 2,
    label: "Airtime",
    screen: "AirtimeScreen",
    bg: "rgba(135, 206, 235, 0.1)",
  },
  {
    id: 3,
    label: "Electricity",
    screen: "ElectricityScreen",
    bg: "rgba(220, 20, 60, 0.1)",
  },
  {
    id: 4,
    label: "More Service",
    screen: "Service",
    bg: "rgba(255, 200, 100, 0.1) ",
  },
];

export const service = [
  {
    id: 1,
    label: "Buy Airtime",
    icon: <Ionicons name="globe" size={20} />,
    screen: "AirtimeScreen",
    bg: "rgba(255, 200, 100, 0.1) ",
    bg2: "rgba(255, 200, 100, 1) ",
    description: "Buy airtime of all network",
  },
  {
    id: 2,
    label: "Buy Data",
    icon: <Ionicons name="globe" size={20} />,
    screen: "DataScreen",
    bg: "rgba(10, 37, 39, 0.1)",
    bg2: "rgba(10, 37, 39, 01)",
    description: "Buy cheap data",
  },
  {
    id: 3,
    label: "TV Subscription",
    icon: <Ionicons name="globe" size={20} />,
    screen: "TVScreen",
    bg: "rgba(135, 206, 235, 0.1)",
    bg2: "rgba(135, 206, 235, 01)",
    description: "Pay for cable subscription",
  },
  {
    id: 4,
    label: "Electricity",
    icon: <Ionicons name="globe" size={20} />,
    screen: "ElectricityScreen",
    bg: "rgba(216, 15, 149, 0.1)",
    bg2: "rgba(216, 15, 149, 01)",
    description: "Top up prepaid meter",
  },
  {
    id: 5,
    label: "Save",
    icon: <Ionicons name="globe" size={20} />,
    screen: "ComingSoon",
    bg: "rgba(152, 32, 233, 0.1)rgba(255, 200, 100, 0.1) ",
    bg2: "rgba(152, 32, 233, 01) ",
    description: "Save",
  },
  {
    id: 6,
    label: "Loan",
    icon: <Ionicons name="globe" size={20} />,
    screen: "ComingSoon",
    bg: "rgba(7, 231, 7, 0.1) ",
    bg2: "rgba(7, 231, 7, 1) ",
    description: "Apply for loan",
  },
  {
    id: 7,
    label: "Education",
    icon: <Ionicons name="globe" size={20} />,
    screen: "ComingSoon",
    bg: "rgba(128, 0, 0, 0.1) ",
    bg2: "rgba(128, 0, 0, 1)",
    description: "Buy education pin",
  },
  {
    id: 8,
    label: "Government Bills",
    icon: <Ionicons name="globe" size={20} />,
    screen: "ComingSoon",
    bg: "rgba(75, 0, 130, 0.1) ",
    bg2: "rgba(75, 0, 130, 1) ",
    description: "other bills",
  },
];

export const transactionHistory = [
  {
    id: 1,
    status: "credit",
    date: "2025 02 08",
    label: "Data Purchase",
    amount: "10,000",
  },
  {
    id: 2,
    status: "debit",
    date: "2025 02 08",
    label: "Airtime Purchase",
    amount: "1,000",
  },
  {
    id: 3,
    status: "credit",
    date: "2025 02 08",
    label: "Data Purchase",
    amount: "10,000",
  },
  {
    id: 4,
    status: "debit",
    date: "2025 02 08",
    label: "Transfer",
    amount: "100,000",
  },
  {
    id: 5,
    status: "credit",
    date: "2025 02 08",
    label: "Fund Wallet",
    amount: "100,000",
  },
];
