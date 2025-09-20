import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RegularText, MediumText } from "../text/indext";
import { MaterialIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";

type Prop = {
  message: string;
};

const EmptyState = ({ message }: Prop) => {
  return (
    <View style={styles.container}>
      {/* Background decorative elements */}
      <View style={styles.backgroundElements}>
        <View style={styles.decorativeCircle1} />
        <View style={styles.decorativeCircle2} />
        <View style={styles.decorativeDot1} />
        <View style={styles.decorativeDot2} />
        <View style={styles.decorativeDot3} />
      </View>

      {/* Main content */}
      <View style={styles.contentContainer}>
        {/* Animation container */}
        <View style={styles.animationContainer}>
          <View style={styles.animationBackground}>
            <LottieView
              source={require("@/assets/json/20.json")}
              autoPlay
              loop
              style={styles.lottieAnimation}
            />
          </View>
          
          {/* Subtle glow effect */}
          <View style={styles.glowEffect} />
        </View>

        {/* Text content */}
        <View style={styles.textContainer}>
          <MediumText size="medium" style={styles.messageText}>
            {message}
          </MediumText>
          
          {/* Subtle accent line */}
          <View style={styles.accentLine} />
          
          {/* Optional subtitle for context */}
          <RegularText size="small" style={styles.subtitleText}>
            Pull down to refresh or try again later
          </RegularText>
        </View>
      </View>
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: wp("8%"),
    position: 'relative',
  },
  backgroundElements: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  decorativeCircle1: {
    position: 'absolute',
    top: hp("15%"),
    left: wp("10%"),
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(102, 126, 234, 0.05)',
  },
  decorativeCircle2: {
    position: 'absolute',
    bottom: hp("20%"),
    right: wp("15%"),
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(118, 75, 162, 0.06)',
  },
  decorativeDot1: {
    position: 'absolute',
    top: hp("25%"),
    right: wp("20%"),
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
  },
  decorativeDot2: {
    position: 'absolute',
    bottom: hp("35%"),
    left: wp("25%"),
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(118, 75, 162, 0.08)',
  },
  decorativeDot3: {
    position: 'absolute',
    top: hp("40%"),
    left: wp("15%"),
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(102, 126, 234, 0.07)',
  },
  contentContainer: {
    alignItems: 'center',
    zIndex: 2,
  },
  animationContainer: {
    position: 'relative',
    marginBottom: hp("3%"),
  },
  animationBackground: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(102, 126, 234, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(102, 126, 234, 0.1)',
  },
  lottieAnimation: {
    width: 120,
    height: 120,
  },
  glowEffect: {
    position: 'absolute',
    top: -5,
    left: -5,
    right: -5,
    bottom: -5,
    borderRadius: 75,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'rgba(102, 126, 234, 0.1)',
    opacity: 0.7,
  },
  textContainer: {
    alignItems: 'center',
    maxWidth: wp("70%"),
  },
  messageText: {
    color: '#374151',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: hp("1%"),
    fontWeight: '600',
  },
  accentLine: {
    width: wp("12%"),
    height: 2,
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
    borderRadius: 1,
    marginBottom: hp("1.5%"),
  },
  subtitleText: {
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 18,
    fontWeight: '400',
  },
});