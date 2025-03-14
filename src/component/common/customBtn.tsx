import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from "react-native";
import { MediumText } from "../text/indext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

interface CustomBtnProps {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
  color?: string;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  isLoading?: boolean;
  width?: number | string;
}

const CustomBtn: React.FC<CustomBtnProps> = ({
  label,
  onPress,
  color = "#2A2A72",
  disabled = false,
  style,
  textStyle,
  isLoading,
  width,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        {
          backgroundColor:
            disabled || isLoading ? "rgba(42, 42, 114, 0.5)" : color,
          width: width ? width : wp(90),
        },
        style,
      ]}
    >
      <View style={styles.content}>
        {isLoading ? (
          <View
            style={{ flexDirection: "row", alignItems: "center", gap: wp(3) }}
          >
            <ActivityIndicator size={20} color="white" />
            <MediumText size="small" color="white" style={textStyle}>
              {label}
            </MediumText>
          </View>
        ) : (
          <MediumText size="small" color="white" style={textStyle}>
            {label}
          </MediumText>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomBtn;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: hp(1.5),
    width: wp(90),
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: hp(3),
  },
});
