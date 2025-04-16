import { StyleSheet, Text, View, Modal } from "react-native";
import React, { useEffect } from "react";
import { BoldText, RegularText } from "../text/indext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import LottieView from "lottie-react-native";

type Props = {
  message: string;
  isVisible: boolean;
  isSuccessful?: boolean;
  onClose: () => void;
};

const ToastMessage = ({ message, isVisible, isSuccessful, onClose }: Props) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View
        style={[
          styles.container,
          {
            borderColor: isSuccessful ? "green" : "red",
            backgroundColor: isSuccessful
              ? "rgba(117, 155, 117, 0.7)"
              : "rgba(223, 190, 190, 0.81)",
          },
        ]}
      >
        <View style={styles.title}>
          <BoldText size="large" color="white">
            {isSuccessful ? "Success!" : "Error!"}
          </BoldText>
        </View>
        <View style={[styles.message]}>
          <RegularText size="medium" color="white">
            {message}
          </RegularText>
        </View>
      </View>
    </Modal>
  );
};

export default ToastMessage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(250, 250, 250, 0.6)",
    position: "absolute",
    top: hp("2%"),
    marginLeft: wp("5%"),
    height: hp("7%"),
    width: wp("90%"),
    borderRadius: 4,
    borderLeftWidth: 4,
    borderBottomWidth: 0.5,
  },
  title: {
    position: "absolute",
    paddingLeft: wp("4%"),
  },
  message: {
    position: "absolute",
    top: hp(4),
    paddingLeft: hp("2%"),
  },
});
