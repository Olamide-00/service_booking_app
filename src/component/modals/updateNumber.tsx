import { StyleSheet, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import { LinearGradient } from 'expo-linear-gradient';
import { RegularText, MediumText, BoldText } from "../text/indext";
import { CloseCircle, Mobile, Edit } from "iconsax-react-native";
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
import { COLORS } from "@/src/constant/COLORS";

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
      setMessage("Please enter a valid Nigerian phone number");
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
          setTimeout(() => {
            closeModal();
            setPhoneNumber("");
          }, 1000);
        },
        onError: (error: any) => {
          setOpen(true);
          setMessage(error.message || "Failed to update phone number");
          setSuccess(false);
        },
      }
    );
  };

  const handleClose = () => {
    setPhoneNumber("");
    closeModal();
  };

  const isValidNumber = validatePhoneNumber(phoneNumber);

  return (
    <Modal
      isVisible={isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.6}
      style={styles.modalWrapper}
      onBackdropPress={handleClose}
      avoidKeyboard={true}
    >
      <View style={styles.container}>
        <View style={styles.modal}>
          {/* Header with gradient */}
          <LinearGradient
            colors={[COLORS.primary, '#4A4AAA']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.headerGradient}
          >
            <View style={styles.headerContent}>
              <View style={styles.headerLeft}>
                <View style={styles.iconContainer}>
                  <Edit size={20} color="white" />
                </View>
                <BoldText size="medium" color="white">
                  Update Phone Number
                </BoldText>
              </View>
              <TouchableOpacity 
                onPress={handleClose}
                style={styles.closeButton}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <CloseCircle color="white" size={24} />
              </TouchableOpacity>
            </View>
          </LinearGradient>

          {/* Content */}
          <View style={styles.contentContainer}>
            {/* Phone Icon and Description */}
            <View style={styles.descriptionContainer}>
              <View style={styles.phoneIconContainer}>
                <Mobile size={32} color={COLORS.primary} />
              </View>
              <MediumText 
                size="small" 
                color="secondaryColor" 
                style={styles.description}
              >
                Enter your new Nigerian phone number to update your account
              </MediumText>
            </View>

            <Spacer size={hp(3)} direction="vertical" />

            {/* Input Section */}
            <View style={styles.inputSection}>
              <CustomTextInput
                placeholder="e.g. 09036018013"
                title="New Phone Number"
                keyboardType="numeric"
                maxLength={11}
                value={phoneNumber}
                setValue={setPhoneNumber}
              />
              
              {/* Validation Indicator */}
              {phoneNumber.length > 0 && (
                <View style={styles.validationContainer}>
                  <View style={[
                    styles.validationDot, 
                    { backgroundColor: isValidNumber ? '#10B981' : '#EF4444' }
                  ]} />
                  <RegularText 
                    size="extraSmall" 
                    color={isValidNumber ? "success" : "error"}
                    style={styles.validationText}
                  >
                    {isValidNumber ? "Valid phone number" : "Invalid phone number format"}
                  </RegularText>
                </View>
              )}
            </View>

            <Spacer size={hp(4)} direction="vertical" />

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={handleClose}
              >
                <RegularText size="small" color="primary">
                  Cancel
                </RegularText>
              </TouchableOpacity>
              
              <View style={styles.updateButtonContainer}>
                <CustomBtn
                  label="Update Number"
                  onPress={handleUpdateNumber}
                  isLoading={isPending}
                  disabled={isPending || !isValidNumber || phoneNumber.length === 0}
                  width={wp(45)}
                />
              </View>
            </View>

            {/* Help Text */}
            <View style={styles.helpContainer}>
              <RegularText size="small" color="secondaryColor" style={styles.helpText}>
                Make sure to use a valid Nigerian phone number starting with 070, 080, 081, or 090
              </RegularText>
            </View>
          </View>
        </View>
      </View>

      <ToastMessage
        isVisible={open}
        onClose={() => setOpen(false)}
        message={message}
        isSuccessful={success}
        variant="gradient"
      />
    </Modal>
  );
};

export default UpdateNumber;

const styles = StyleSheet.create({
  modalWrapper: {
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: wp(92),
    maxWidth: 400,
  },
  modal: {
    backgroundColor: "white",
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  headerGradient: {
    paddingVertical: hp(2.5),
    paddingHorizontal: wp(5),
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  closeButton: {
    padding: 4,
  },
  contentContainer: {
    paddingHorizontal: wp(5),
    paddingVertical: hp(3),
  },
  descriptionContainer: {
    alignItems: 'center',
  },
  phoneIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(42, 42, 114, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(1.5),
  },
  description: {
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: wp(2),
  },
  inputSection: {
    width: '100%',
  },
  validationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(1),
    paddingHorizontal: wp(1),
  },
  validationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: wp(2),
  },
  validationText: {
    fontSize: hp(1.4),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  cancelButton: {
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(6),
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  updateButtonContainer: {
    flex: 1,
    marginLeft: wp(3),
  },
  helpContainer: {
    marginTop: hp(2),
    paddingHorizontal: wp(2),
  },
  helpText: {
    textAlign: 'center',
    lineHeight: 16,
    opacity: 0.7,
  },
});