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
    paddingHorizontal: wp(5),
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: hp(1),
  },
});
