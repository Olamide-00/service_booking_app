import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState, useEffect } from "react";
import { BoldText, RegularText } from "@/src/component/text/indext";
import { QuickActionData } from "@/src/constant/data";
import { useNavigation } from "@react-navigation/native";
import Animated, { SlideInLeft, SlideOutLeft, FadeInUp } from "react-native-reanimated";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Spacer from "@/src/component/common/spacer";

const QuickAction = () => {
  const navigation = useNavigation();
  const [isReady, setIsReady] = useState(false);

  // Force layout calculation after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Simple gradient and icon mapping
  const cardStyles = [
    { gradient: ['#667eea', '#764ba2'], icon: 'dashboard' },
    { gradient: ['#f093fb', '#9c2f3dff'], icon: 'payment' },
    { gradient: ['#4facfe', '#105a5eff'], icon: 'analytics' },
    { gradient: ['#2d884bff', '#615624ff'], icon: 'settings' },
  ];

  return (
    <View style={styles.container}>
      <BoldText size="large" color="black">
        Quick Actions
      </BoldText>
      <Spacer size={hp(1)} direction="vertical" />
      
      <View style={styles.itemContainer}>
        {QuickActionData.map((item, index) => {
          const style = cardStyles[index % cardStyles.length];
          
          return (
            <Animated.View
              key={item.id}
              entering={FadeInUp.delay(index * 100).duration(500)}
              style={styles.itemWrapper}
            >
              <TouchableOpacity
                onPress={() => {
                  if (item.id === 4) {
                    navigation.navigate(item.screen);
                  } else {
                    navigation.navigate("StackNavigation", {
                      screen: item.screen,
                    });
                  }
                }}
                activeOpacity={0.85}
                style={styles.touchable}
              >
                <LinearGradient
                  colors={style.gradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.item}
                >
                  {/* Faded background icon */}
                  <MaterialIcons 
                    name={style.icon}
                    size={35}
                    color="rgba(255, 255, 255, 0.15)"
                    style={styles.backgroundIcon}
                  />
                  
                  {/* Text content */}
                  <View style={styles.textContainer}>
                    <RegularText size="small" style={styles.itemText}>
                      {item.label}
                    </RegularText>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </View>
    </View>
  );
};

export default QuickAction;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  itemContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: '100%',
  },
  itemWrapper: {
    width: wp("46%"),
    marginBottom: hp("1%"),
  },
  touchable: {
    width: '100%',
  },
  item: {
    height: hp("6.5%"),
    width: '100%',
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  backgroundIcon: {
    position: 'absolute',
    top: 8,
    right: 10,
    zIndex: 0,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    paddingHorizontal: wp(2),
  },
  itemText: {
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
});