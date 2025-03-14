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
    gap: hp(1),
  },
  header: {
    alignItems: "center",
    marginBottom: hp(2),
    paddingTop: hp(5),
  },
  bioContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: hp(6),
    gap: wp(4),
  },
  forgetPassword: {
    alignSelf: "flex-end",
  },
  viewContainer: {
    flexDirection: "row",
    width: wp(92),
    alignItems: "center",
    gap: 10,
    marginTop: hp(6),
    justifyContent: "center",
  },
  view: {
    width: wp(40),
    borderBottomWidth: 1,
    height: 1,
    marginBottom: -4,
    borderColor: COLORS.border,
  },
});
