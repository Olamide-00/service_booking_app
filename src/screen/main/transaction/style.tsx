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
    position: 'relative',
  },
  backgroundDots: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  dot1: {
    position: 'absolute',
    top: hp("8%"),
    right: wp("15%"),
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(102, 126, 234, 0.12)',
  },
  dot2: {
    position: 'absolute',
    top: hp("25%"),
    left: wp("10%"),
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(118, 75, 162, 0.90)',
  },
  dot3: {
    position: 'absolute',
    bottom: hp("30%"),
    right: wp("20%"),
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(102, 126, 234, 0.98)',
  },
  dateSection: {
    backgroundColor: 'rgba(102, 126, 234, 0.02)',
    borderRadius: 16,
    padding: wp("4%"),
    marginTop: hp("1%"),
    borderWidth: 1,
    borderColor: 'rgba(102, 126, 234, 0.08)',
    zIndex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp("2%"),
    marginBottom: hp("1.5%"),
  },
  sectionTitle: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  menuSection: {
    position: 'relative',
    zIndex: 1,
  },
  menuContainer: {
    flexDirection: "row",
    backgroundColor: "#f8f9fa",
    borderRadius: 16,
    padding: wp("1%"),
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  menuItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp("1.5%"),
    paddingHorizontal: wp("3%"),
    borderRadius: 12,
    gap: wp("2%"),
  },
  activeMenuItem: {
    backgroundColor: COLORS.primary,
    elevation: 2,
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  menuIcon: {
    // Icon styling handled in the component
  },
  menuText: {
    color: COLORS.primary,
    fontWeight: '500',
  },
  activeMenuText: {
    color: "#ffffff",
    fontWeight: "700",
  },
  indicatorContainer: {
    position: 'relative',
    height: 3,
    marginTop: hp("0.5%"),
  },
  activeIndicator: {
    position: 'absolute',
    width: '46%',
    height: 3,
    backgroundColor: COLORS.primary,
    borderRadius: 2,
    opacity: 0.6,
  },
  contentContainer: {
    flex: 1,
    zIndex: 1,
  },
});