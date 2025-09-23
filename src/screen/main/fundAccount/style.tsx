import { COLORS } from "@/src/constant/COLORS";
import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const modernStyles = {
    root: {
      flex: 1,
      backgroundColor: '#F8FAFC',
    },
    container: {
      flex: 1,
      paddingHorizontal: wp(5),
    },
    heroCard: {
      borderRadius: 20,
      overflow: 'hidden',
      marginBottom: hp(3),
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 8,
    },
    gradientCard: {
      padding: hp(3),
      minHeight: hp(22),
      justifyContent: 'space-between',
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: hp(2),
    },
    walletIcon: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderRadius: 12,
      padding: 8,
    },
    accountSection: {
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      borderRadius: 16,
      padding: hp(2),
      marginVertical: hp(1),
    },
    accountNumber: {
      fontSize: 24,
      fontWeight: '700',
      color: 'white',
      letterSpacing: 2,
      textAlign: 'center',
      marginVertical: hp(1),
    },
    bankName: {
      fontSize: 14,
      color: 'rgba(255, 255, 255, 0.9)',
      textAlign: 'center',
    },
    actionButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: wp(3),
      marginTop: hp(2),
    },
    actionBtn: {
      flex: 1,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderRadius: 12,
      paddingVertical: hp(1.5),
      paddingHorizontal: wp(4),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    shareBtn: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },
    actionBtnText: {
      color: 'white',
      fontSize: 14,
      fontWeight: '600',
    },
    shareBtnText: {
      color: COLORS.primary,
      fontSize: 14,
      fontWeight: '600',
    },
    emptyState: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: hp(6),
      backgroundColor: 'white',
      borderRadius: 20,
      marginTop: hp(2),
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    emptyStateIcon: {
      backgroundColor: 'rgba(42, 42, 114, 0.1)',
      borderRadius: 30,
      padding: 20,
      marginBottom: hp(2),
    },
    tipCard: {
      backgroundColor: 'white',
      borderRadius: 16,
      padding: hp(2.5),
      marginTop: hp(2),
      borderLeftWidth: 4,
      borderLeftColor: COLORS.primary,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 3,
    },
    tipTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: COLORS.primary,
      marginBottom: 8,
    },
    tipText: {
      fontSize: 14,
      color: '#64748B',
      lineHeight: 20,
    },
  };