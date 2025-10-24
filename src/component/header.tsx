import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BoldText, RegularText } from "./common/text";
import { COLORS } from "../constant/color";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

interface HeaderProps {
  userName?: string;
  subtitle?: string;
  avatarUri?: string;
  onAvatarPress?: () => void;
  onNotificationPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  userName = "Olamide",
  subtitle = "Welcome back 👋",
  avatarUri,
  onAvatarPress,
  onNotificationPress,
}) => {
  return (
    <LinearGradient
      colors={['#6C3FED', '#8B5CF6', '#A78BFA']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* Animated background pattern */}
      <View style={styles.patternContainer}>
        {/* Geometric shapes */}
        <View style={[styles.geometricShape, styles.shape1]} />
        <View style={[styles.geometricShape, styles.shape2]} />
        <View style={[styles.geometricShape, styles.shape3]} />
        
        {/* Floating circles */}
        <View style={[styles.floatingCircle, styles.circle1]} />
        <View style={[styles.floatingCircle, styles.circle2]} />
        <View style={[styles.floatingCircle, styles.circle3]} />
        
        {/* Decorative lines */}
        <View style={[styles.decorativeLine, styles.line1]} />
        <View style={[styles.decorativeLine, styles.line2]} />
        
        {/* Star decorations */}
        <Ionicons 
          name="star" 
          size={16} 
          color="rgba(255,255,255,0.15)" 
          style={[styles.starIcon, { top: 25, left: 40 }]}
        />
        <Ionicons 
          name="star" 
          size={12} 
          color="rgba(255,255,255,0.12)" 
          style={[styles.starIcon, { top: 70, right: 60 }]}
        />
        <Ionicons 
          name="star" 
          size={10} 
          color="rgba(255,255,255,0.1)" 
          style={[styles.starIcon, { top: 50, left: width / 2 }]}
        />
      </View>

      {/* Main content */}
      <View style={styles.content}>
        <View style={styles.leftSection}>
          <View style={styles.greetingCard}>
            <View style={styles.greetingCardInner}>
              <RegularText color="rgba(255,255,255,0.9)" size={13}>
                {subtitle}
              </RegularText>
              <BoldText color={COLORS.white} size={24} style={styles.userName}>
                {userName}
              </BoldText>
            </View>
          </View>
        </View>


        <View style={styles.rightSection}>
          <TouchableOpacity
            onPress={onAvatarPress}
            activeOpacity={0.8}
            style={styles.avatarWrapper}
          >

            <View style={styles.avatarContainer}>
              <Image
                source={
                  avatarUri
                    ? { uri: avatarUri }
                    : require("../../assets/images/image.png")
                }
                resizeMode="cover"
                style={styles.avatar}
              />
              <View style={styles.avatarAccent} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom wave decoration */}
      <View style={styles.bottomWave}>
        <View style={styles.waveShape} />
      </View>
    </LinearGradient>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 25,
    overflow: "hidden",
    elevation: 12,
    shadowColor: "#6C3FED",
    shadowOpacity: 0.4,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 8 },
  },
  patternContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  geometricShape: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 8,
  },
  shape1: {
    width: 80,
    height: 80,
    top: -20,
    right: 30,
    transform: [{ rotate: '25deg' }],
  },
  shape2: {
    width: 60,
    height: 60,
    bottom: 10,
    left: -15,
    transform: [{ rotate: '-15deg' }],
  },
  shape3: {
    width: 40,
    height: 40,
    top: 50,
    left: width / 3,
    transform: [{ rotate: '45deg' }],
  },
  floatingCircle: {
    position: 'absolute',
    borderRadius: 999,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  circle1: {
    width: 100,
    height: 100,
    top: -30,
    left: 20,
  },
  circle2: {
    width: 70,
    height: 70,
    bottom: -10,
    right: 50,
  },
  circle3: {
    width: 50,
    height: 50,
    top: 60,
    right: width / 4,
  },
  decorativeLine: {
    position: 'absolute',
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  line1: {
    width: 60,
    top: 35,
    right: width / 2,
    transform: [{ rotate: '30deg' }],
  },
  line2: {
    width: 40,
    bottom: 35,
    left: width / 3,
    transform: [{ rotate: '-20deg' }],
  },
  starIcon: {
    position: 'absolute',
  },
  content: {
    flexDirection: "row",
    // alignItems: "flex-start",
    justifyContent: "space-between",
    paddingTop: Platform.OS === "ios" ? 20 : 50,
    paddingHorizontal: 20,
    zIndex: 1,
  },
  leftSection: {
    flex: 1,
    marginRight: 16,
  },
  greetingCard: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    padding: 2,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  greetingCardInner: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 14,
    padding: 12,
  },
  userName: {
    marginTop: 2,
    letterSpacing: 0.5,
  },
  waveUnderline: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
  },
  waveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 14,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: 12,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  notificationBtn: {
    marginTop: 4,
  },
  notificationGradient: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.3)',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  badgeGradient: {
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    borderWidth: 2,
    borderColor: '#6C3FED',
  },
  pulseRing: {
    position: 'absolute',
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatarOuterRing: {
    position: 'absolute',
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
  },
  avatarGlowRing: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  avatarContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    position: 'relative',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.9)',
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 2,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2ECC71',
  },
  avatarAccent: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 16,
    height: 16,
    backgroundColor: '#FFD700',
    borderTopRightRadius: 28,
    opacity: 0.8,
  },
  bottomWave: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 25,
  },
  waveShape: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F8F9FD',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
});