import { COLORS } from "@/src/constant/COLORS";
import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: wp(4),
    backgroundColor: COLORS.white,
  },
  title: {
    alignItems: "center",
  },
  btn: {
    position: "absolute",
    bottom: hp(4),
    alignSelf: "center",
  },
});
