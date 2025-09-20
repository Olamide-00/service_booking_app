import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { BoldText, RegularText } from "@/src/component/text/indext";
import { QuickActionData } from "@/src/constant/data";
import { useNavigation } from "@react-navigation/native";
import Animated, { SlideInLeft, SlideOutLeft } from "react-native-reanimated";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Spacer from "@/src/component/common/spacer";

const QuickAction = () => {
  const navigation = useNavigation();

  // Simple gradient and icon mapping
  const cardStyles = [
    { gradient: ['#667eea', '#764ba2'], icon: 'dashboard' },
    { gradient: ['#f093fb', '#f5576c'], icon: 'payment' },
    { gradient: ['#4facfe', '#00f2fe'], icon: 'analytics' },
    { gradient: ['#43e97b', '#38f9d7'], icon: 'settings' },
  ];

  return (
    <View>
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
              entering={SlideInLeft.delay(
                (index % 2) * 200 + Math.floor(index / 2) * 200
              ).duration(600)}
              exiting={SlideOutLeft.duration(300)}
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
  itemContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  itemWrapper: {
    width: wp("44%"),
  },
  item: {
    height: hp("7%"),
    marginBottom: hp("1.5%"),
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
    position: 'relative',
  },
  backgroundIcon: {
    position: 'absolute',
    top: 8,
    right: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
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