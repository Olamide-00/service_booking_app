import { View, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import {
  BoldText,
  ExtraBoldText,
  RegularText,
} from "@/src/component/text/indext";
import { service } from "@/src/constant/data";
import Spacer from "@/src/component/common/spacer";
import { 
  heightPercentageToDP as hp, 
  widthPercentageToDP as wp 
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import Header from "@/src/component/common/header";
import { COLORS } from "@/src/constant/COLORS";

const Service = () => {
  const navigation = useNavigation();

  return (
    <>
      <Header label="Services" showBackButton={true} height={10} />
      <View style={styles.root}>
        {/* Background decorative elements */}
        <View style={styles.backgroundContainer}>
          {/* Fading background icons */}
          <MaterialIcons 
            name="miscellaneous-services"
            size={120}
            color="rgba(102, 126, 234, 0.12)"
            style={styles.backgroundIcon1}
          />
          <MaterialIcons 
            name="support-agent"
            size={80}
            color="rgba(118, 75, 162, 0.15)"
            style={styles.backgroundIcon2}
          />
          
          {/* Scattered dots */}
          <View style={styles.dot1} />
          <View style={styles.dot2} />
          <View style={styles.dot3} />
          <View style={styles.dot4} />
          <View style={styles.dot5} />
          <View style={styles.dot6} />
          <View style={styles.dot7} />
          <View style={styles.dot8} />
        </View>

        <ScrollView
          contentContainerStyle={{ paddingBottom: hp(10) }}
          showsVerticalScrollIndicator={false}
        >
          <Spacer size={hp(2)} direction="vertical" />
          <View style={styles.itemContainer}>
            {service.map((item, index) => (
              <Animated.View
                key={index}
                entering={FadeIn.duration(500).delay(index * 150)}
                exiting={FadeOut.duration(300)}
              >
                <TouchableOpacity
                  style={[styles.item, { backgroundColor: item.bg }]}
                  onPress={() =>
                    navigation.navigate("StackNavigation", {
                      screen: item.screen,
                    })
                  }
                >
                  <BoldText size="medium">{item.label}</BoldText>
                  <RegularText size="small">{item.description}</RegularText>
                  <View style={styles.icon}>{item.icon}</View>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default Service;

const styles = {
  root: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: wp("4%"),
    position: 'relative',
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  // Background icons
  backgroundIcon1: {
    position: 'absolute',
    top: hp("5%"),
    right: -wp("8%"),
    transform: [{ rotate: '15deg' }],
  },
  backgroundIcon2: {
    position: 'absolute',
    bottom: hp("15%"),
    left: -wp("5%"),
    transform: [{ rotate: '-25deg' }],
  },
  // Scattered dots in various sizes
  dot1: {
    position: 'absolute',
    top: hp("8%"),
    left: wp("15%"),
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(102, 126, 234, 0.18)',
  },
  dot2: {
    position: 'absolute',
    top: hp("20%"),
    right: wp("20%"),
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(118, 75, 162, 0.16)',
  },
  dot3: {
    position: 'absolute',
    top: hp("35%"),
    left: wp("8%"),
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(102, 126, 234, 0.15)',
  },
  dot4: {
    position: 'absolute',
    top: hp("50%"),
    right: wp("12%"),
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(118, 75, 162, 0.20)',
  },
  dot5: {
    position: 'absolute',
    top: hp("65%"),
    left: wp("25%"),
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: 'rgba(102, 126, 234, 0.17)',
  },
  dot6: {
    position: 'absolute',
    bottom: hp("25%"),
    right: wp("8%"),
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: 'rgba(118, 75, 162, 0.19)',
  },
  dot7: {
    position: 'absolute',
    bottom: hp("40%"),
    left: wp("18%"),
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: 'rgba(102, 126, 234, 0.14)',
  },
  dot8: {
    position: 'absolute',
    bottom: hp("8%"),
    right: wp("30%"),
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(118, 75, 162, 0.16)',
  },
  // Original styles
  title: {
    alignSelf: "center",
    marginTop: hp("2%"),
  },
  itemContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    zIndex: 1,
  },
  item: {
    width: wp("45%"),
    height: hp("25%"),
    borderRadius: 8,
    paddingHorizontal: wp("3%"),
    paddingTop: hp("2%"),
    marginVertical: hp("1%"),
    position: 'relative',
  },
  icon: {
    position: "absolute",
    bottom: hp("0%"),
    right: wp("0%"),
  },
};