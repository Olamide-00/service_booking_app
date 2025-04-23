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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    borderWidth: 0.5,
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.2),
    borderRadius: 4,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    borderColor: COLORS.primary,
  },
  imageContainer: {
    width: 1200,
    height: 120,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  editIcon: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: COLORS.white,
    borderColor: COLORS.primary,
    marginTop: hp(-3),
    marginLeft: wp(10),
  },
  card: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: hp(3),
    height: hp(25),
  },
  infoContainer: {
    gap: hp(1.5),
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: hp(0.5),
  },
  btn: {
    width: wp(70),
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
