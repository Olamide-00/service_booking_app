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
import { Bank, EmptyWallet } from "iconsax-react-native";
import { useNavigation } from "@react-navigation/native";

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
      icon: <EmptyWallet size={20} color={COLORS.primary} />,
      title: "Send to Remit wallet",
      navigateTo: "SendRemit",
    },
    {
      icon: <Bank size={32} color={COLORS.primary} />,
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
        <MediumText size="medium">{title}</MediumText>
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
    width: wp(75),
    height: hp(30),
    backgroundColor: COLORS.white,
    alignSelf: "center",
    borderRadius: 20,
  },
  title: {
    alignSelf: "center",
    marginTop: hp(2),
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(4),
  },
  itemContainer: {
    paddingHorizontal: wp(5),
  },
});

export default SendMoney;
