import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { transactionActionData } from "@/src/constant/data";
import { RegularText } from "@/src/component/text/indext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS } from "@/src/constant/COLORS";
import { useNavigation } from "@react-navigation/native";
import SendMoney from "@/src/component/modals/sendMoney";

interface TransactionActionProps {
  icon: React.ReactNode;
  label: string;
  screen: string;
}

const TransactionAction: React.FC = () => {
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  return (
    <View style={{ height: hp(6) }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {transactionActionData.map(
          (item: TransactionActionProps, index: number) => (
            <TouchableOpacity
              style={styles.item}
              key={index}
              onPress={() => {
                if (index === 0) {
                  setIsVisible(true);
                } else {
                  navigation.navigate("StackNavigation", {
                    screen: item.screen,
                  });
                }
              }}
            >
              {item.icon}
              <RegularText size="small" color="primary">
                {item.label}
              </RegularText>
            </TouchableOpacity>
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
    borderWidth: 0.8,
    width: wp(40),
    height: hp(5.5),
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    borderColor: COLORS.primary,
    marginRight: wp(3),
    backgroundColor: "rgba(42, 42, 114, 0.3)",
  },
});
