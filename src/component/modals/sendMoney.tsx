import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS } from "@/src/constant/COLORS";
import { BoldText, MediumText } from "../text/indext";
import Divider from "../common/divider";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";

interface SendMoneyProps {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
}

interface MenuOption {
  icon: React.ReactNode;
  title: string;
  navigateTo: string;
}

const SendMoney: React.FC<SendMoneyProps> = ({ isVisible, setIsVisible }) => {
  const navigation = useNavigation();

  const menuOptions: MenuOption[] = [
    {
      icon: (
        <LottieView
          source={require("@/assets/json/b.json")}
          autoPlay
          loop
          style={{ width: 55, height: 45 }}
        />
      ),
      title: "Send to Remit wallet",
      navigateTo: "SendRemit",
    },
    {
      icon: (
        <LottieView
          source={require("@/assets/json/a.json")}
          autoPlay
          loop
          style={{ width: 55, height: 45 }}
        />
      ),
      title: "Send to Bank",
      navigateTo: "SendBank",
    },
  ];

  const handleNavigation = (screen: string) => {
    setIsVisible(false);
    navigation.navigate("StackNavigation", { screen });
  };

  const renderMenuItem = ({ icon, title, navigateTo }: MenuOption) => (
    <React.Fragment key={navigateTo}>
      <TouchableOpacity
        style={styles.item}
        onPress={() => handleNavigation(navigateTo)}
      >
        {icon}
        <MediumText size="medium" color="primary">
          {title}
        </MediumText>
      </TouchableOpacity>
      <Divider />
    </React.Fragment>
  );

  return (
    <Modal
      isVisible={isVisible}
      animationIn="slideInDown"
      animationOut="zoomOutUp"
      onBackdropPress={() => setIsVisible(false)}
    >
      <View style={styles.container}>
        <View style={styles.title}>
          <BoldText size="large" color="primary">
            Choose a desired menu
          </BoldText>
        </View>
        <Divider />
        <View style={styles.itemContainer}>
          {menuOptions.map(renderMenuItem)}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp("75%"),
    height: hp("28%"),
    backgroundColor: COLORS.white,
    alignSelf: "center",
    borderRadius: 20,
  },
  title: {
    alignSelf: "center",
    marginTop: hp("1%"),
    marginVertical: hp("-3%"),
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp("5%"),
    marginVertical: hp("-1.5%"),
  },
  itemContainer: {
    paddingHorizontal: wp("7%"),
  },
});

export default SendMoney;
