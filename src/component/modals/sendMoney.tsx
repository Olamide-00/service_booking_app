import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS } from "@/src/constant/COLORS";
import { BoldText, MediumText, RegularText } from "../text/indext";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";

interface SendMoneyProps {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
}

interface MenuOption {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  navigateTo: string;
  gradient: string[];
  iconBg: string;
}

const SendMoney: React.FC<SendMoneyProps> = ({ isVisible, setIsVisible }) => {
  const navigation = useNavigation();

  const menuOptions: MenuOption[] = [
    {
      icon: (
        <LottieView
          autoPlay
          loop
          source={require("@/assets/json/6.json")}
          style={styles.lottieIcon}
        />
      ),
      title: "Send to Payverve",
      subtitle: "Transfer to other Payverve users",
      navigateTo: "SendRemit",
      gradient: ['#667eea', '#764ba2'],
      iconBg: 'rgba(102, 126, 234, 0.15)',
    },
    {
      icon: (
        <LottieView
          autoPlay
          loop
          source={require("@/assets/json/5.json")}
          style={styles.lottieIcon}
        />
      ),
      title: "Send to Bank",
      subtitle: "Transfer to any bank account",
      navigateTo: "SendBank",
      gradient: ['#4facfe', '#205a5eff'],
      iconBg: 'rgba(79, 172, 254, 0.15)',
    },
  ];

  const handleNavigation = (screen: string) => {
    setIsVisible(false);
    navigation.navigate("StackNavigation", { screen });
  };

  const renderMenuItem = ({ icon, title, subtitle, navigateTo, gradient, iconBg }: MenuOption, index: number) => (
    <TouchableOpacity
      key={index}
      style={styles.menuItem}
      onPress={() => handleNavigation(navigateTo)}
      activeOpacity={0.85}
    >
      <LinearGradient
        colors={gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.menuItemGradient}
      >
        {/* Background decorative element */}
        <MaterialIcons 
          name="arrow-forward"
          size={40}
          color="rgba(255, 255, 255, 0.08)"
          style={styles.backgroundArrow}
        />
        
        {/* Content */}
        <View style={styles.menuItemContent}>
          <View style={[styles.iconContainer, { backgroundColor: iconBg }]}>
            {icon}
          </View>
          
          <View style={styles.textContainer}>
            <BoldText size="large" style={styles.menuTitle}>
              {title}
            </BoldText>
            <RegularText size="small" style={styles.menuSubtitle}>
              {subtitle}
            </RegularText>
          </View>
          
          <View style={styles.arrowContainer}>
            <MaterialIcons 
              name="arrow-forward-ios" 
              size={16} 
              color="rgba(255, 255, 255, 0.8)" 
            />
          </View>
        </View>
        
        {/* Decorative elements */}
        <View style={styles.decorativeDot1} />
        <View style={styles.decorativeDot2} />
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => setIsVisible(false)}
      backdropOpacity={0.5}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      animationInTiming={300}
      animationOutTiming={200}
    >
      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          {/* Close button */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsVisible(false)}
          >
            <Ionicons name="close" size={20} color="rgba(102, 126, 234, 0.7)" />
          </TouchableOpacity>
          
          {/* Title */}
          <View style={styles.titleContainer}>
            <BoldText size="large" style={styles.headerTitle}>
              Send Money
            </BoldText>
            <RegularText size="medium" style={styles.headerSubtitle}>
              Choose your preferred method
            </RegularText>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuOptions.map(renderMenuItem)}
        </View>
        
        {/* Footer hint */}
        <View style={styles.footerHint}>
          <MaterialIcons name="info-outline" size={16} color="rgba(102, 126, 234, 0.6)" />
          <RegularText size="small" style={styles.hintText}>
            Secure & instant transfers
          </RegularText>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp("75%"),
    height: hp("29%"),
    backgroundColor: COLORS.white,
    alignSelf: "center",
    borderRadius: 24,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    overflow: 'hidden',
  },
  
  // Header Section
  headerSection: {
    paddingTop: hp("1.5%"),
    paddingHorizontal: wp("5%"),
    position: 'relative',
    alignItems: 'center',
    marginBottom: hp("1%"),
  },
  closeButton: {
    position: 'absolute',
    top: hp("1.5%"),
    right: wp("4%"),
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  titleContainer: {
    alignItems: 'center',
    gap: hp("0.2%"),
  },
  headerIcon: {
    marginBottom: hp("0.2%"),
  },
  headerTitle: {
    color: '#1f2937',
  },
  headerSubtitle: {
    color: 'rgba(102, 126, 234, 0.7)',
  },
  
  // Menu Container
  menuContainer: {
    flex: 1,
    paddingHorizontal: wp("5%"),
    gap: hp("2%"),
    // paddingBottom: hp("0.5%"),
  },
  menuItem: {
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuItemGradient: {
    borderRadius: 16,
    padding: wp("3.5%"),
    position: 'relative',
    overflow: 'hidden',
    minHeight: hp("5%"),
    justifyContent: 'center',
    height: hp("7%"),
  },
  backgroundArrow: {
    position: 'absolute',
    top: -8,
    right: -8,
    transform: [{ rotate: '15deg' }],
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp("3%"),
    zIndex: 2,
  },
  
  // Icon and Text
  iconContainer: {
    width: hp("4%"),
    height: hp("4%"),
    borderRadius: hp("2%"),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  lottieIcon: {
    width: hp("2.5%"),
    height: hp("2.5%"),
  },
  textContainer: {
    flex: 1,
  },
  menuTitle: {
    color: '#FFFFFF',
    marginBottom: hp("0.2%"),
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  menuSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  arrowContainer: {
    width: hp("3%"),
    height: hp("3%"),
    borderRadius: hp("1.5%"),
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Decorative Elements
  decorativeDot1: {
    position: 'absolute',
    top: 8,
    left: 12,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  decorativeDot2: {
    position: 'absolute',
    bottom: 8,
    right: 40,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  
  // Footer
  footerHint: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: wp("2%"),
    paddingBottom: hp("1%"),
    paddingTop: hp("0.3%"),
  },
  hintText: {
    color: 'rgba(102, 126, 234, 0.6)',
  },
});

export default SendMoney;