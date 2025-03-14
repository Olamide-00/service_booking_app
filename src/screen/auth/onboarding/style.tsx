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
  },
  onboarding: {
    flex: 1,
    paddingTop: hp(5),
    height: hp(100),
    width: wp(100),
  },
  image: {
    width: wp(80),
    height: hp(40),
    borderRadius: 20,
    alignSelf: "center",
    marginTop: hp(7),
  },
  desc: {
    width: wp(80),
    marginTop: hp(3),
  },
  footer: {
    position: "absolute",
    bottom: hp(10),
    width: wp(100),
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: wp(6),
  },
});
