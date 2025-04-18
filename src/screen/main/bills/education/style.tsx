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
    paddingHorizontal: wp("4%"),
  },
  item: {
    marginTop: hp("2%"),
    flexDirection: "row",
    alignItems: "center",
    gap: wp("5%"),
  },
  imageContainer: {
    // width: wp("100%"),
    height: hp("8%"),
  },
  image: {
    height: 50,
    width: 50,
  },
});
