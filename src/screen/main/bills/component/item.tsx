import { StyleSheet, View, TouchableOpacity } from "react-native";
import React from "react";
import * as Clipboard from "expo-clipboard";
import { BoldText, RegularText } from "@/src/component/text/indext";
import Divider from "@/src/component/common/divider";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Copy } from "iconsax-react-native";
import { COLORS } from "@/src/constant/COLORS";
import ToastMessage from "@/src/component/common/toastMessage";

type Props = {
  label: string;
  value: string | number;
  showIcon?: boolean;
};

const Item = ({ label, value, showIcon }: Props) => {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const [success, setSuccess] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>("");

  // Function to copy only the value
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(String(value));
    setIsVisible(true);
    setSuccess(true);
    setMessage("Copied");
  };

  return (
    <View>
      <View style={styles.container}>
        <BoldText size="medium">{label}</BoldText>
        <View style={styles.item}>
          <RegularText size="small" color="primary">
            {value}
          </RegularText>
          {showIcon && (
            <TouchableOpacity onPress={copyToClipboard}>
              <Copy size={20} color={COLORS.primary} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <Divider />
      <ToastMessage
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        message={message}
        isSuccessful={success}
      />
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    marginBottom: hp(-1.5),
  },
  item: {
    alignSelf: "flex-end",
    paddingRight: wp(6),
    flexDirection: "row",
    gap: wp(2),
  },
});
