import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "./COLORS";
import LottieView from "lottie-react-native";

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
    icon: (
      <LottieView
        source={require("@/assets/json/19.json")}
        autoPlay
        loop
        style={{ width: 70, height: 70 }}
      />
    ),
    screen: "AirtimeScreen",
    bg: "rgba(255, 200, 100, 0.1) ",
    bg2: "rgba(255, 200, 100, 1) ",
    description: "Buy airtime of all network",
  },
  {
    id: 2,
    label: "Buy Data",
    icon: (
      <LottieView
        source={require("@/assets/json/10.json")}
        autoPlay
        loop
        style={{ width: 60, height: 60 }}
      />
    ),
    screen: "DataScreen",
    bg: "rgba(10, 37, 39, 0.1)",
    bg2: "rgba(10, 37, 39, 01)",
    description: "Buy cheap data",
  },
  {
    id: 3,
    label: "TV Subscription",
    icon: (
      <LottieView
        source={require("@/assets/json/16.json")}
        autoPlay
        loop
        style={{ width: 70, height: 70 }}
      />
    ),
    screen: "TVScreen",
    bg: "rgba(135, 206, 235, 0.1)",
    bg2: "rgba(135, 206, 235, 01)",
    description: "Pay for cable subscription",
  },
  {
    id: 4,
    label: "Electricity",
    icon: (
      <LottieView
        source={require("@/assets/json/17.json")}
        autoPlay
        loop
        style={{ width: 60, height: 60 }}
      />
    ),
    screen: "ElectricityScreen",
    bg: "rgba(216, 15, 149, 0.1)",
    bg2: "rgba(216, 15, 149, 01)",
    description: "Top up prepaid meter",
  },
  {
    id: 7,
    label: "Education",
    icon: (
      <LottieView
        source={require("@/assets/json/12.json")}
        autoPlay
        loop
        style={{ width: 60, height: 60 }}
      />
    ),
    screen: "Education",
    bg: "rgba(128, 0, 0, 0.1) ",
    bg2: "rgba(128, 0, 0, 1)",
    description: "Buy education pin",
  },
  {
    id: 5,
    label: "Save",
    icon: (
      <LottieView
        source={require("@/assets/json/14.json")}
        autoPlay
        loop
        style={{ width: 70, height: 70 }}
      />
    ),
    screen: "ComingSoon",
    bg: "rgba(152, 32, 233, 0.1)rgba(255, 200, 100, 0.1) ",
    bg2: "rgba(152, 32, 233, 01) ",
    description: "Save",
  },
  {
    id: 6,
    label: "Loan",
    icon: (
      <LottieView
        source={require("@/assets/json/15.json")}
        autoPlay
        loop
        style={{ width: 60, height: 60 }}
      />
    ),
    screen: "ComingSoon",
    bg: "rgba(7, 231, 7, 0.1) ",
    bg2: "rgba(7, 231, 7, 1) ",
    description: "Apply for loan",
  },
  {
    id: 8,
    label: "Government Bills",
    icon: (
      <LottieView
        source={require("@/assets/json/11.json")}
        autoPlay
        loop
        style={{ width: 60, height: 60 }}
      />
    ),
    screen: "ComingSoon",
    bg: "rgba(75, 0, 130, 0.1) ",
    bg2: "rgba(75, 0, 130, 1) ",
    description: "other bills",
  },
];

export const educationData = [
  {
    id: 1,
    logo: require("@/assets/images/waec.png"),
    label: "Waec Services",
    screen: "Waec",
  },
  {
    id: 2,
    logo: require("@/assets/images/jamb.png"),
    label: "Jamb Services",
    screen: "Jamb",
  },
];
