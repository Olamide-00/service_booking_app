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
  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: hp(4),
    backgroundColor: "#F3F3F3",
    padding: hp(1),
    borderRadius: 10,
  },

  menuItem: {
    paddingVertical: hp(1),
    paddingHorizontal: wp(6),
    borderRadius: 8,
  },

  activeMenuItem: {
    backgroundColor: COLORS.primary,
  },

  menuText: {
    color: COLORS.primary,
  },

  activeMenuText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
