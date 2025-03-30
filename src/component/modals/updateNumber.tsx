import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import { RegularText } from "../text/indext";
import { CloseCircle } from "iconsax-react-native";
import CustomBtn from "../common/customBtn";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import CustomTextInput from "../common/customTextInput";
import Spacer from "../common/spacer";
import useAuthStore from "@/src/store/userStore";
import { useUpdateNumber } from "@/src/api/hooks/useAuth";
import ToastMessage from "../common/toastMessage";

type UpdatePINProps = {
  isVisible: boolean;
  closeModal: () => void;
};

const validatePhoneNumber = (number: string) => {
  const nigerianPhoneRegex = /^(0)(7|8|9)(0|1)\d{8}$/;
  return nigerianPhoneRegex.test(number);
};

const UpdateNumber = ({ isVisible, closeModal }: UpdatePINProps) => {
  const userData = useAuthStore((state) => state.userData);
  const email = userData?.email;

  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const updateUserData = useAuthStore((state) => state.setUserData);
  const { mutate: updatePhoneNumber, isPending } = useUpdateNumber();

  const handleUpdateNumber = () => {
    if (!email || !validatePhoneNumber(phoneNumber)) {
      setOpen(true);
      setMessage("Valid phone number is required");
      setSuccess(false);
      return;
    }

    updatePhoneNumber(
      { email, phoneNumber },
      {
        onSuccess: () => {
          setOpen(true);
          setMessage("Phone number updated successfully");
          setSuccess(true);
          updateUserData({ ...userData, phoneNumber });
          closeModal();
        },
        onError: (error: any) => {
          setOpen(true);
          setMessage(error.message || "Error updating phone number");
          setSuccess(false);
        },
      }
    );
  };

  return (
    <Modal
      isVisible={isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.5}
      style={{ margin: 0 }}
    >
      <View style={styles.container}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <RegularText size="large">Update Number</RegularText>
            <CloseCircle color="#FF0000" size={28} onPress={closeModal} />
          </View>
          <Spacer size={hp(4)} direction="vertical" />
          <View style={styles.inputContainer}>
            <CustomTextInput
              placeholder="e.g. 09036018013"
              title="Phone Number"
              keyboardType="numeric"
              maxLength={11}
              value={phoneNumber}
              setValue={setPhoneNumber}
            />
            <Spacer size={hp(2)} direction="vertical" />
            <CustomBtn
              label="Update"
              onPress={handleUpdateNumber}
              isLoading={isPending}
              disabled={isPending || !validatePhoneNumber(phoneNumber)}
            />
          </View>
        </View>
      </View>
      <ToastMessage
        isVisible={open}
        onClose={() => setOpen(false)}
        message={message}
        isSuccessful={success}
      />
    </Modal>
  );
};

export default UpdateNumber;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "93%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: wp(60),
    alignSelf: "center",
    paddingHorizontal: wp(2),
  },
});
