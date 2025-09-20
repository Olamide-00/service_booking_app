import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { BoldText, RegularText } from "../text/indext";
import { COLORS } from "@/src/constant/COLORS";
import { useNavigation } from "@react-navigation/native";

const Banner = () => {
  const navigation = useNavigation();
  
  const handleKYC = () => {
    navigation.navigate("StackNavigation", { screen: "KYC1" });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#fef2f2', '#fee2e2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientContainer}
      >
        {/* Background decorative elements */}
        <MaterialIcons 
          name="verified-user"
          size={50}
          color="rgba(239, 68, 68, 0.08)"
          style={styles.backgroundIcon}
        />
        
        {/* Decorative elements */}
        <View style={styles.decorativeCircle1} />
        <View style={styles.decorativeCircle2} />
        <View style={styles.decorativeDot1} />
        <View style={styles.decorativeDot2} />
        
        {/* Main Content */}
        <View style={styles.contentContainer}>
          {/* Left Section - Text Content */}
          <View style={styles.textSection}>
            <View style={styles.headerRow}>
              <MaterialIcons 
                name="security" 
                size={16} 
                color="#ef4444" 
              />
              <BoldText size="medium" style={styles.titleText}>
                Complete your KYC
              </BoldText>
            </View>
            
            <RegularText size="small" style={styles.subtitleText}>
              Few more steps to get you started
            </RegularText>
            
            {/* Progress indicator */}
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={styles.progressFill} />
              </View>
              <RegularText size="small" style={styles.progressText}>
                50% Complete
              </RegularText>
            </View>
          </View>

          {/* Right Section - Action Button */}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleKYC}
            activeOpacity={0.85}
          >
            <View style={styles.buttonContent}>
              <RegularText size="small" style={styles.buttonText}>
                Complete Now
              </RegularText>
              <MaterialIcons 
                name="arrow-forward" 
                size={16} 
                color={COLORS.primary} 
              />
            </View>
            
            {/* Button highlight */}
            <View style={styles.buttonHighlight} />
          </TouchableOpacity>
        </View>
        
        {/* Subtle shine effect */}
        <View style={styles.shineEffect} />
      </LinearGradient>
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  container: {
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    borderRadius: 18,
  },
  gradientContainer: {
    borderRadius: 18,
    padding: wp("3%"),
    paddingVertical: hp("1.2%"),
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundIcon: {
    position: 'absolute',
    top: -25,
    right: -25,
    transform: [{ rotate: '15deg' }],
  },
  // Decorative elements
  decorativeCircle1: {
    position: 'absolute',
    top: -20,
    left: -20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(185, 95, 11, 0.4)',
  },
  decorativeCircle2: {
    position: 'absolute',
    bottom: -15,
    right: 20,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(38, 112, 141, 0.5)',
  },
  decorativeDot1: {
    position: 'absolute',
    top: hp("1.5%"),
    left: wp("8%"),
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(179, 40, 179, 0.5)',
  },
  decorativeDot2: {
    position: 'absolute',
    bottom: hp("1%"),
    left: wp("12%"),
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(26, 34, 143, 0.5)',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 2,
  },
  textSection: {
    flex: 1,
    marginRight: wp("4%"),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp("2%"),
    marginBottom: hp("0.5%"),
  },
  titleText: {
    color: '#dc2626',
    fontWeight: '700',
    textShadowColor: 'rgba(239, 68, 68, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  subtitleText: {
    color: '#991b1b',
    marginBottom: hp("0.8%"),
    lineHeight: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp("3%"),
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    width: '50%',
    height: '100%',
    backgroundColor: '#ef4444',
    borderRadius: 2,
  },
  progressText: {
    color: '#dc2626',
    fontSize: 10,
    fontWeight: '600',
  },
  actionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 14,
    paddingHorizontal: wp("4%"),
    paddingVertical: hp("1.2%"),
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp("2%"),
    zIndex: 2,
  },
  buttonText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  buttonHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  shineEffect: {
    position: 'absolute',
    top: 0,
    left: -25,
    width: 20,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    transform: [{ skewX: '-12deg' }],
    zIndex: 1,
  },
});