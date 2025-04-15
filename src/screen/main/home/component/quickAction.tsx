import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { BoldText, RegularText } from "@/src/component/text/indext";
import { QuickActionData } from "@/src/constant/data";
import { useNavigation } from "@react-navigation/native";
import Animated, { SlideInLeft, SlideOutLeft } from "react-native-reanimated";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Spacer from "@/src/component/common/spacer";

const QuickAction = () => {
  const navigation = useNavigation();

  return (
    <View>
      <BoldText size="large" color="black">
        Quick Actions
      </BoldText>
      <Spacer size={hp(4)} direction="vertical" />
      <View style={styles.itemContainer}>
        {QuickActionData.map((item, index) => (
          <Animated.View
            key={item.id}
            entering={SlideInLeft.delay(
              (index % 2) * 200 + Math.floor(index / 2) * 200
            ).duration(600)}
            exiting={SlideOutLeft.duration(300)}
            style={styles.itemWrapper}
          >
            <TouchableOpacity
              style={[styles.item, { backgroundColor: item.bg }]}
              onPress={() => {
                if (item.id === 4) {
                  navigation.navigate(item.screen);
                } else {
                  navigation.navigate("StackNavigation", {
                    screen: item.screen,
                  });
                }
              }}
            >
              <RegularText size="small">{item.label}</RegularText>
            </TouchableOpacity>
          </Animated.View>
        ))}
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
    // marginTop: hp(4),
  },
  itemWrapper: {
    width: "48%",
  },
  item: {
    paddingVertical: hp(1.5),
    marginBottom: hp(1.5),
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 0.3,
    borderColor: "#2A2A72",
  },
});
