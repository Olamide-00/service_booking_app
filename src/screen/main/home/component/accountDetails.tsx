import { RegularText } from "@/src/component/text/indext";
import {
  View,
  StyleSheet,
  Pressable,
  ToastAndroid,
  Touchable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/src/constant/COLORS";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as Clipboard from "expo-clipboard";
import ToastMessage from "@/src/component/common/toastMessage";
import React from "react";
import { useNavigation } from "@react-navigation/native";

type AccountDetailsProps = {
  wallet: string;
};

const AccountDetails = ({ wallet }: AccountDetailsProps) => {
  const navigation = useNavigation();

  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>("");
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);

  const copyToClipboard = () => {
    Clipboard.setStringAsync(wallet);
    setIsVisible(true);
    setIsSuccess(true);
    setMessage("Copied");
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.item}
        onPress={() =>
          navigation.navigate("StackNavigation", { screen: "FundWallet" })
        }
      >
        <RegularText size="small" color="primary">
          Account Details
        </RegularText>
      </Pressable>
      <Pressable style={styles.item2} onPress={copyToClipboard}>
        <RegularText size="small" color="primary">
          {wallet ?? "0123456789"}
        </RegularText>
        <Ionicons name="copy-outline" size={20} color={COLORS.primary} />
      </Pressable>
      <ToastMessage
        isVisible={isVisible}
        message={message}
        onClose={() => setIsVisible(false)}
        isSuccessful={isSuccess}
      />
    </View>
  );
};

export default AccountDetails;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(5),
  },
  item: {
    borderWidth: 0.8,
    borderColor: COLORS.border,
    width: wp(43),
    alignItems: "center",
    justifyContent: "center",
    height: hp(4.5),
    borderRadius: 10,
  },
  item2: {
    borderWidth: 0.8,
    borderColor: COLORS.border,
    width: wp(43),
    alignItems: "center",
    justifyContent: "center",
    height: hp(4.5),
    borderRadius: 10,
    flexDirection: "row",
    gap: wp(3),
  },
});
