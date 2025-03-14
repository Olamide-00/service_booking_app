import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { BoldText, RegularText } from "@/src/component/text/indext";
import { QuickActionData } from "@/src/constant/data";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { COLORS } from "@/src/constant/COLORS";
import { useNavigation } from "@react-navigation/native";

const QuickAction = () => {
  const navigation = useNavigation();
  return (
    <View>
      <BoldText size="large" color="black">
        Quick Actions
      </BoldText>
      <View style={styles.itemContainer}>
        {QuickActionData.map((item) => {
          return (
            <TouchableOpacity
              key={item.id}
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
    marginTop: hp(1.6),
  },
  item: {
    width: "48%",
    padding: 15,
    marginBottom: 10,
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: COLORS.primary,
  },
});
