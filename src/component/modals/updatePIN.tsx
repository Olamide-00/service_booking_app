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
import { usePINOtp, useUpdatePIN } from "@/src/api/hooks/useAuth";
import useAuthStore from "@/src/store/userStore";
import ToastMessage from "../common/toastMessage";

interface UpdatePINProps {
  isVisible: boolean;
  closeModal: () => void;
}

const UpdatePIN: React.FC<UpdatePINProps> = ({ isVisible, closeModal }) => {
  const userData = useAuthStore((state: any) => state.userData);
  const email = userData?.email;

  const [newPIN, setNewPIN] = useState<string>("");
  const [confirmPIN, setConfirmPIN] = useState<string>("");
  const [otp, setOtp] = useState<string>("");

  const { mutate: requestOTP, isPending: otpLoading } = usePINOtp();
  const { mutate: updatePIN, isPending: pinLoading } = useUpdatePIN();

  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const handleRequestOTP = () => {
    if (!email) {
      alert("Email is required");
      return;
    }
    requestOTP(
      { email },
      {
        onSuccess: () => {
          setOpen(true);
          setMessage("OTP sent to mail");
          setSuccess(true);
        },
        onError: () => {
          setOpen(true);
          setMessage("Error occurred");
          setSuccess(false);
        },
      }
    );
  };

  const handleUpdatePIN = () => {
    if (newPIN !== confirmPIN) {
      setOpen(true);
      setMessage("PINs do not match");
      setSuccess(false);
      return;
    }
    if (!otp) {
      setOpen(true);
      setMessage("Invalid OTP");
      setSuccess(false);
      return;
    }
    updatePIN(
      { email, newPin: newPIN, otp },
      {
        onSuccess: () => {
          setOpen(true);
          setMessage("PIN changed");
          setSuccess(true);
          closeModal();
        },
        onError: (error: any) => alert(error.message),
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
            <RegularText size="large">Forget PIN</RegularText>
            <CloseCircle color="#FF0000" size={20} onPress={closeModal} />
          </View>
          <Spacer size={hp(4)} direction="vertical" />
          <View style={styles.inputContainer}>
            <CustomBtn
              width={wp(40)}
              label={"Request OTP"}
              onPress={handleRequestOTP}
              disabled={otpLoading}
              isLoading={otpLoading}
            />
            <Spacer size={hp(3)} direction="vertical" />
            <CustomTextInput
              placeholder="Enter new PIN"
              title="New PIN"
              keyboardType="numeric"
              value={newPIN}
              setValue={setNewPIN}
            />
            <CustomTextInput
              placeholder="Confirm PIN"
              title="Confirm PIN"
              keyboardType="numeric"
              value={confirmPIN}
              setValue={setConfirmPIN}
            />
            <CustomTextInput
              placeholder="Enter OTP"
              title="OTP code"
              keyboardType="numeric"
              value={otp}
              setValue={setOtp}
            />
            <Spacer size={hp(2)} direction="vertical" />
            <CustomBtn
              label={"Update PIN"}
              onPress={handleUpdatePIN}
              disabled={pinLoading}
              isLoading={pinLoading}
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

export default UpdatePIN;
