// import { RegularText } from "@/src/component/text/indext";
// import {
//   View,
//   StyleSheet,
//   Pressable,
//   Touchable,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { COLORS } from "@/src/constant/COLORS";
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from "react-native-responsive-screen";
// import * as Clipboard from "expo-clipboard";
// import ToastMessage from "@/src/component/common/toastMessage";
// import React from "react";
// import { useNavigation } from "@react-navigation/native";

// type AccountDetailsProps = {
//   wallet: string;
// };

// const AccountDetails = ({ wallet }: AccountDetailsProps) => {
//   const navigation = useNavigation();

//   const [isVisible, setIsVisible] = React.useState<boolean>(false);
//   const [message, setMessage] = React.useState<string>("");
//   const [isSuccess, setIsSuccess] = React.useState<boolean>(false);

//   const copyToClipboard = () => {
//     Clipboard.setStringAsync(wallet);
//     setIsVisible(true);
//     setIsSuccess(true);
//     setMessage("Copied to clipboard");
//   };

//   return (
//     <View style={styles.container}>
//       {/* Account Details Button */}
//       <Pressable
//         style={({ pressed }) => [
//           styles.accountButton,
//           pressed && styles.buttonPressed,
//         ]}
//         onPress={() =>
//           navigation.navigate("StackNavigation", { screen: "FundWallet" })
//         }
//       >
//         <View style={styles.buttonContent}>
//           <Ionicons name="wallet-outline" size={20} color={COLORS.primary} />
//           <RegularText size="small" color="primary" style={styles.buttonText}>
//             Account Details
//           </RegularText>
//         </View>
//       </Pressable>

//       {/* Wallet Address Card */}
//       <Pressable
//         style={({ pressed }) => [
//           styles.walletCard,
//           pressed && styles.cardPressed,
//         ]}
//         onPress={copyToClipboard}
//       >
//         <View style={styles.walletContent}>
//           <View style={styles.walletTextContainer}>
//             <RegularText size="small" color="primary" numberOfLines={1} style={styles.walletText}>
//               {wallet ?? "0123456789"}
//             </RegularText>
//           </View>
//           <View style={styles.copyBadge}>
//             <Ionicons name="copy-outline" size={16} color={COLORS.white} />
//           </View>
//         </View>
//       </Pressable>

//       <ToastMessage
//         isVisible={isVisible}
//         message={message}
//         onClose={() => setIsVisible(false)}
//         isSuccessful={isSuccess}
//       />
//     </View>
//   );
// };

// export default AccountDetails;

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: wp("3%"),
//     paddingHorizontal: wp("4%"),
//   },
//   accountButton: {
//     flex: 1,
//     backgroundColor: COLORS.primary + "15", // 15% opacity
//     borderWidth: 1,
//     borderColor: COLORS.primary + "30",
//     borderRadius: 12,
//     paddingVertical: hp("1.4%"),
//     paddingHorizontal: wp("3%"),
//     minHeight: hp("5%"),
//     justifyContent: "center",
//   },
//   walletCard: {
//     flex: 2,
//     backgroundColor: COLORS.white,
//     borderWidth: 1,
//     borderColor: COLORS.border + "80",
//     borderRadius: 12,
//     paddingVertical: hp("1.2%"),
//     paddingHorizontal: wp("4%"),
//     minHeight: hp("5%"),
//     justifyContent: "center",
//     shadowColor: COLORS.primary,
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 3,
//   },
//   buttonContent: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: wp("2%"),
//   },
//   walletContent: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   walletTextContainer: {
//     flex: 1,
//     marginRight: wp("2%"),
//   },
//   walletText: {
//     fontWeight: "500",
//     letterSpacing: 0.5,
//   },
//   copyBadge: {
//     backgroundColor: COLORS.primary,
//     padding: wp("2%"),
//     borderRadius: 8,
//     justifyContent: "center",
//     alignItems: "center",
//     minWidth: hp("3.2%"),
//     minHeight: hp("3.2%"),
//   },
//   buttonText: {
//     fontWeight: "600",
//   },
//   buttonPressed: {
//     opacity: 0.8,
//     transform: [{ scale: 0.98 }],
//   },
//   cardPressed: {
//     opacity: 0.9,
//     transform: [{ scale: 0.99 }],
//   },
// });