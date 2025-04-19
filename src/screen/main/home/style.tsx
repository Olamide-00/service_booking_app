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
  headerContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingTop: hp("2%"),
  },
  imageContainer: {
    width: 55,
    height: 55,
    borderRadius: 60,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp("1%"),
  },
  tagContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(1),
  },
  tag: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: wp("2%"),
    borderRadius: 20,
  },
  iconContainer: {
    flexDirection: "row",
    gap: wp("4%"),
    alignItems: "center",
  },
});
