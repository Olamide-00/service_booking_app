import { View, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./style";
import {
  BoldText,
  ExtraBoldText,
  RegularText,
} from "@/src/component/text/indext";
import { service } from "@/src/constant/data";
import Spacer from "@/src/component/common/spacer";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import Header from "@/src/component/common/header";

const Service = () => {
  const navigation = useNavigation();

  return (
    <>
      <Header label="Services" height={10} />
      <View style={styles.root}>
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
                  <View style={[styles.icon, {}]}>{item.icon}</View>
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
