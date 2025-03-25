import { COLORS } from "@/src/constant/COLORS";
import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: wp(4),
  },
  inputContainer: {
    gap: hp(0.2),
  },
  header: {
    alignItems: "center",
  },
  image: {
    width: wp(60),
    height: 100,
  },
});
