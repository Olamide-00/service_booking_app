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
  title: {
    alignSelf: "center",
  },
  dateSelector: {
    flexDirection: "row",
    gap: wp(3),
    marginTop: hp(5),
    alignItems: "center",
  },
  input: {
    borderWidth: 0.5,
    borderColor: COLORS.border,
    borderRadius: 8,
    width: wp(78),
    height: hp(6.5),
    paddingHorizontal: wp(4),
  },
  item: {
    flex: 1,
  },
  seperator: {
    gap: hp(3),
  },
  empty: {
    flex: 1,
    marginTop: hp(20),
  },
});
