import {
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { ArrowLeft2, ArrowLeft } from "iconsax-react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from "@/src/constant/COLORS";
import { BoldText } from "../text/indext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

type Props = {
  label?: string;
  showBackButton?: boolean;
  height?: number;
};

const Header = ({
  label,
  showBackButton = false,
  height = 15,
}: Props) => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[styles.header, { height: hp(height) }]}
    >
      {/* Enhanced decorative elements */}
      <MaterialIcons 
        name="trending-up"
        size={100}
        color="rgba(255, 255, 255, 0.06)"
        style={styles.backgroundIcon1}
      />
      <MaterialIcons 
        name="account-balance"
        size={80}
        color="rgba(255, 255, 255, 0.05)"
        style={styles.backgroundIcon2}
      />
      
      {/* Decorative dots */}
      <View style={styles.decorativeDot1} />
      <View style={styles.decorativeDot2} />
      <View style={styles.decorativeDot3} />
      <View style={styles.decorativeDot4} />
      
      {/* Top highlight bar */}
      <View style={styles.topHighlight} />
      
      <View style={styles.contentContainer}>
        <View style={styles.row}>
          {/* Left Section */}
          <View style={styles.leftContainer}>
            {showBackButton && (
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
                activeOpacity={0.8}
              >
                <View style={styles.backButtonInner}>
                  <ArrowLeft2 size="20" color="rgba(255, 255, 255, 0.9)" />
                </View>
              </TouchableOpacity>
            )}
          </View>

          {/* Center Section */}
          <View style={styles.centerContainer}>
            {label && (
              <View style={styles.titleContainer}>
                <BoldText size="medium" style={styles.titleText}>
                  {label}
                </BoldText>
                {/* Subtle underline */}
                <View style={styles.titleUnderline} />
              </View>
            )}
          </View>

          {/* Right Section - Balance for spacing */}
          <View style={styles.rightContainer}>
            {/* Optional: Add right action buttons here if needed */}
          </View>
        </View>
      </View>
      
      {/* Bottom subtle shadow */}
      <View style={styles.bottomShadow} />
    </LinearGradient>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingHorizontal: wp(4),
    justifyContent: "center",
    position: 'relative',
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backgroundIcon1: {
    position: 'absolute',
    top: -25,
    right: -25,
    transform: [{ rotate: '25deg' }],
  },
  backgroundIcon2: {
    position: 'absolute',
    bottom: -20,
    left: -20,
    transform: [{ rotate: '-15deg' }],
  },
  topHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  contentContainer: {
    position: 'relative',
    zIndex: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  backButton: {
    width: hp("4.5%"),
    height: hp("4.5%"),
    borderRadius: hp("2.25%"),
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  backButtonInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: wp("1.5%"),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  logo: {
    width: wp("8%"),
    height: hp("4%"),
    tintColor: 'rgba(255, 255, 255, 0.9)',
  },
  // Decorative dots
  decorativeDot1: {
    position: 'absolute',
    top: hp("2%"),
    left: wp("10%"),
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  decorativeDot2: {
    position: 'absolute',
    top: hp("4%"),
    right: wp("15%"),
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  decorativeDot3: {
    position: 'absolute',
    bottom: hp("3%"),
    left: wp("20%"),
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
  },
  decorativeDot4: {
    position: 'absolute',
    bottom: hp("1.5%"),
    right: wp("8%"),
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  centerContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  titleText: {
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.15)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    fontWeight: '700',
  },
  titleUnderline: {
    width: wp("12%"),
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 1,
    marginTop: hp("0.3%"),
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  bottomShadow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
});