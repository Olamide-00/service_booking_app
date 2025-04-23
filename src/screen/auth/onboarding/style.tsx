import { COLORS } from "@/src/constant/COLORS";
import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  onboarding: {
    flex: 1,
    paddingTop: height * 0.01,
    width: width,
  },
  image: {
    width: width * 0.8,
    height: height * 0.4,
    borderRadius: 20,
    alignSelf: "center",
    // marginTop: height * 0.01,
    resizeMode: "contain",
  },
  desc: {
    width: width * 0.8,
    marginTop: height * 0.04,
  },
  footer: {
    marginTop: "auto",
    bottom: height * 0.1,
    width: width,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: width * 0.07,
    alignItems: "center",
  },
});
