import { View, Text, TouchableOpacity, ScrollView } from "react-native";
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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

const Service = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.title}>
        <ExtraBoldText size="large">Services</ExtraBoldText>
      </View>
      <ScrollView
        contentContainerStyle={{ paddingBottom: hp(10) }}
        showsVerticalScrollIndicator={false}
      >
        <Spacer size={hp(3)} direction="vertical" />

        <View style={styles.itemContainer}>
          {service.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.item, { backgroundColor: item.bg }]}
              onPress={() =>
                navigation.navigate("StackNavigation", { screen: item.screen })
              }
            >
              <BoldText size="medium">{item.label}</BoldText>
              <RegularText size="small">{item.description}</RegularText>
              <View style={[styles.icon, { backgroundColor: item.bg2 }]}>
                {item.icon}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Service;
