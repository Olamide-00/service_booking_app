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
    setMessage("Copied to clipboard");
  };

  return (
    <View>
      <View style={styles.container}>
        <BoldText size="medium" color="primary">{label}</BoldText>
        <View style={styles.item}>
          <RegularText size="small" color="secondaryColor" style={styles.value}>
            {value}
          </RegularText>
          {showIcon && (
            <TouchableOpacity 
              onPress={copyToClipboard}
              style={styles.copyButton}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Copy size={18} color={COLORS.primary} />
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // paddingVertical: hp(2),
    paddingHorizontal: wp(4),
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(3),
  },
  value: {
    fontWeight: '500',
  },
  copyButton: {
    padding: wp(1),
    borderRadius: 6,
    backgroundColor: 'rgba(42, 42, 114, 0.08)',
  },
});