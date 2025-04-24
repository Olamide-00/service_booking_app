import { StyleSheet, View, TouchableOpacity } from "react-native";
import React from "react";
import * as Clipboard from "expo-clipboard";
import { RegularText } from "@/src/component/text/indext";
import { Copy } from "iconsax-react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import ToastMessage from "@/src/component/common/toastMessage";

type Props = {
  label: string;
  value: string | number;
};

const MAX_REF_LENGTH = 16;

const Item = ({ label, value }: Props) => {
  const stringValue = String(value);

  // Toast state
  const [isVisible, setIsVisible] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [isSuccessful, setIsSuccessful] = React.useState(false);

  // Only truncate the reference number for display
  const displayValue =
    label === "Reference Number" && stringValue.length > MAX_REF_LENGTH
      ? stringValue.slice(0, MAX_REF_LENGTH) + "..."
      : stringValue;

  const handleCopy = async () => {
    if (label === "Reference Number") {
      await Clipboard.setStringAsync(stringValue);

      // Show success toast
      setMessage("Copied");
      setIsSuccessful(true);
      setIsVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <RegularText size="medium">{label}</RegularText>
      <View style={{ width: "33%" }}>
        <View style={styles.row}>
          <RegularText size="small" color="primary">
            {displayValue}
          </RegularText>
          {label === "Reference Number" && (
            <TouchableOpacity
              onPress={handleCopy}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              accessibilityRole="button"
            >
              <Copy size="20" color="gray" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ToastMessage
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        message={message}
        isSuccessful={isSuccessful}
      />
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    gap: widthPercentageToDP("2%"),
  },
});
