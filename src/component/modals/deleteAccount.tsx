import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import CustomBtn from "../common/customBtn";
import { RegularText } from "../text/indext";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { COLORS } from "@/src/constant/COLORS";

const DeleteModal = ({ isOpen, setIsOpen, onConfirm }) => {
  return (
    <Modal
      transparent
      visible={isOpen}
      animationType="fade"
      onRequestClose={() => setIsOpen(false)}
    >
      <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <RegularText
                size="medium"
                color="secondaryColor"
                style={styles.title}
              >
                Are you sure?
              </RegularText>
              <RegularText size="small" color="primary" style={styles.message}>
                This action will permanently delete your account.
              </RegularText>

              <View style={styles.buttonRow}>
                <CustomBtn
                  label="Cancel"
                  onPress={() => setIsOpen(false)}
                  style={styles.cancelBtn}
                />
                <CustomBtn
                  label="Delete"
                  onPress={onConfirm}
                  style={styles.deleteBtn}
                  //   disabled={onConfirm}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "80%",
    padding: 20,
    elevation: 5,
  },
  title: {
    textAlign: "center",
    marginVertical: hp("2%"),
  },
  message: {
    textAlign: "center",
    marginBottom: hp("2%"),
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelBtn: {
    backgroundColor: COLORS.primary,
    flex: 1,
    marginRight: 10,
  },
  deleteBtn: {
    backgroundColor: COLORS.secondaryColor,
    flex: 1,
  },
});

export default DeleteModal;
