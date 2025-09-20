import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { transactionActionData } from "@/src/constant/data";
import { BoldText, RegularText } from "@/src/component/text/indext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS } from "@/src/constant/COLORS";
import { useNavigation } from "@react-navigation/native";
import SendMoney from "@/src/component/modals/sendMoney";
import Animated, { SlideInRight } from "react-native-reanimated";
import { MaterialIcons } from '@expo/vector-icons';

interface TransactionActionProps {
  icon: React.ReactNode;
  label: string;
  screen: string;
}

const TransactionAction: React.FC = () => {
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  // Light, pastel color schemes
  const cardColors = [
    '#f0f4ff', // Light blue
    '#f5f3ff', // Light purple
    '#f0fdfa', // Light teal
    '#f0fdf4', // Light green
    '#fffbeb', // Light amber
    '#fef2f2', // Light rose
  ];

  // Corresponding accent colors for borders and icons
  const accentColors = [
    '#3b82f6', // Blue
    '#8b5cf6', // Purple
    '#14b8a6', // Teal
    '#22c55e', // Green
    '#f59e0b', // Amber
    '#ef4444', // Rose
  ];

  // Subtle pattern icons
  const patternIcons = [
    'account-balance',
    'payment',
    'sync-alt',
    'credit-card',
    'savings',
    'receipt-long'
  ];

  return (
    <View style={{ height: hp(6) }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {transactionActionData.map(
          (item: TransactionActionProps, index: number) => (
            <Animated.View
              key={index}
              entering={SlideInRight.delay(index * 200).duration(500)}
            >
              <TouchableOpacity
                style={[
                  styles.item,
                  { 
                    backgroundColor: cardColors[index % cardColors.length],
                    borderColor: accentColors[index % accentColors.length],
                  }
                ]}
                onPress={() => {
                  if (index === 0) {
                    setIsVisible(true);
                  } else {
                    navigation.navigate("StackNavigation", {
                      screen: item.screen,
                    });
                  }
                }}
                activeOpacity={0.8}
              >
                {/* Subtle pattern background */}
                <MaterialIcons 
                  name={patternIcons[index % patternIcons.length]}
                  size={80}
                  color={accentColors[index % accentColors.length] + '15'}
                  style={styles.patternIcon}
                />
                
                {/* Decorative dots */}
                <View style={[styles.dot1, { backgroundColor: accentColors[index % accentColors.length] + '20' }]} />
                <View style={[styles.dot2, { backgroundColor: accentColors[index % accentColors.length] + '15' }]} />
                <View style={[styles.dot3, { backgroundColor: accentColors[index % accentColors.length] + '25' }]} />
                
                {/* Content */}
                <View style={styles.contentWrapper}>
                  <View style={[
                    styles.iconWrapper,
                    { 
                      backgroundColor: accentColors[index % accentColors.length] + '12',
                      borderColor: accentColors[index % accentColors.length] + '25',
                    }
                  ]}>
                    {item.icon}
                  </View>
                  <BoldText size="medium" style={[
                    styles.labelText,
                    { color: accentColors[index % accentColors.length] }
                  ]}>
                    {item.label}
                  </BoldText>
                </View>
                
                {/* Subtle inner shadow effect */}
                <View style={[styles.innerShadow, { backgroundColor: accentColors[index % accentColors.length] + '08' }]} />
              </TouchableOpacity>
            </Animated.View>
          )
        )}
      </ScrollView>

      <SendMoney isVisible={isVisible} setIsVisible={setIsVisible} />
    </View>
  );
};

export default TransactionAction;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    width: wp("36%"),
    paddingVertical: hp("1.4%"),
    paddingHorizontal: wp("3%"),
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    gap: wp("3%"),
    marginRight: wp("4%"),
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1.5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  patternIcon: {
    position: 'absolute',
    top: -5,
    right: -5,
    transform: [{ rotate: '15deg' }],
  },
  dot1: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  dot2: {
    position: 'absolute',
    bottom: 12,
    left: 18,
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  dot3: {
    position: 'absolute',
    bottom: 8,
    right: 25,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  contentWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp("3%"),
    zIndex: 2,
  },
  iconWrapper: {
    padding: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  labelText: {
    fontWeight: '600',
    textAlign: 'center',
  },
  innerShadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
});