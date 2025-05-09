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
    paddingTop: hp("1%"),
  },
  btnContainer: {
    flexDirection: "row",
    gap: wp(3),
    marginTop: hp(2),
  },
  btn: {
    width: wp(40),
    borderWidth: 0.5,
    height: hp(5),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    borderColor: COLORS.primary,
  },
  btn2: {
    width: wp(40),
    borderWidth: 0.5,
    height: hp(5),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  card: {
    flexDirection: "row",
    gap: wp(5),
    alignItems: "center",
  },
  container: {
    gap: hp(5),
  },
});
