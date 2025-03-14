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
    marginTop: hp(2),
  },
  itemContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: wp(100),
  },
  item: {
    width: wp(45),
    height: hp(20),
    borderRadius: 8,
    paddingHorizontal: wp(3),
    paddingTop: hp(2),

    marginVertical: hp(1),
    marginRight: hp(1),
  },
  icon: {
    position: "absolute",
    bottom: hp(2),
    right: hp(2),
    backgroundColor: COLORS.primary,
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
    borderRadius: 10,
  },
});
