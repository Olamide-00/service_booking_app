import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import { LinearGradient } from 'expo-linear-gradient';
import { RegularText, MediumText, BoldText } from "../text/indext";
import { CloseCircle, Lock, Shield, Sms } from "iconsax-react-native";
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
import { COLORS } from "@/src/constant/COLORS";

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
  const [step, setStep] = useState<1 | 2>(1); // Step 1: Request OTP, Step 2: Update PIN

  const handleRequestOTP = () => {
    if (!email) {
      setOpen(true);
      setMessage("Email is required");
      setSuccess(false);
      return;
    }
    requestOTP(
      { email },
      {
        onSuccess: () => {
          setOpen(true);
          setMessage("OTP sent to your email");
          setSuccess(true);
          setStep(2);
        },
        onError: () => {
          setOpen(true);
          setMessage("Failed to send OTP");
          setSuccess(false);
        },
      }
    );
  };

  const handleUpdatePIN = () => {
    if (newPIN.length < 4) {
      setOpen(true);
      setMessage("PIN must be at least 4 digits");
      setSuccess(false);
      return;
    }
    if (newPIN !== confirmPIN) {
      setOpen(true);
      setMessage("PINs do not match");
      setSuccess(false);
      return;
    }
    if (!otp || otp.length < 4) {
      setOpen(true);
      setMessage("Please enter valid OTP");
      setSuccess(false);
      return;
    }
    updatePIN(
      { email, newPin: newPIN, otp },
      {
        onSuccess: () => {
          setOpen(true);
          setMessage("PIN updated successfully");
          setSuccess(true);
          setTimeout(() => {
            handleClose();
          }, 1000);
        },
        onError: (error: any) => {
          setOpen(true);
          setMessage(error.message || "Failed to update PIN");
          setSuccess(false);
        },
      }
    );
  };

  const handleClose = () => {
    setNewPIN("");
    setConfirmPIN("");
    setOtp("");
    setStep(1);
    closeModal();
  };

  const isStep1Valid = email;
  const isStep2Valid = newPIN && confirmPIN && otp && newPIN === confirmPIN;

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      <View style={[styles.stepDot, step >= 1 && styles.stepDotActive]}>
        <RegularText size="extraSmall" color={step >= 1 ? "white" : "secondaryColor"}>
          1
        </RegularText>
      </View>
      <View style={[styles.stepLine, step > 1 && styles.stepLineActive]} />
      <View style={[styles.stepDot, step >= 2 && styles.stepDotActive]}>
        <RegularText size="extraSmall" color={step >= 2 ? "white" : "secondaryColor"}>
          2
        </RegularText>
      </View>
    </View>
  );

  const renderStep1 = () => (
    <View style={styles.stepContent}>
      <View style={styles.stepHeader}>
        <View style={styles.stepIcon}>
          <Sms size={24} color={COLORS.primary} />
        </View>
        <BoldText size="medium" color="primary" style={styles.stepTitle}>
          Request Verification
        </BoldText>
        <RegularText size="small" color="secondaryColor" style={styles.stepDescription}>
          We'll send an OTP to your registered email address for verification
        </RegularText>
      </View>

      <View style={styles.emailInfo}>
        <RegularText size="small" color="secondaryColor">
          OTP will be sent to:
        </RegularText>
        <MediumText size="small" color="primary" style={styles.emailText}>
          {email}
        </MediumText>
      </View>

      <CustomBtn
        label="Send OTP"
        onPress={handleRequestOTP}
        disabled={!isStep1Valid || otpLoading}
        isLoading={otpLoading}
        width="100%"
      />
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContent}>
      <View style={styles.stepHeader}>
        <View style={styles.stepIcon}>
          <Shield size={24} color={COLORS.primary} />
        </View>
        <BoldText size="medium" color="primary" style={styles.stepTitle}>
          Update Your PIN
        </BoldText>
        <RegularText size="small" color="secondaryColor" style={styles.stepDescription}>
          Enter the OTP sent to your email and create a new PIN
        </RegularText>
      </View>

      <View style={styles.inputGroup}>
        <CustomTextInput
          placeholder="Enter OTP from email"
          title="Verification Code"
          keyboardType="numeric"
          maxLength={6}
          value={otp}
          setValue={setOtp}
        />
        <Spacer size={hp(1)} direction="vertical" />
        <CustomTextInput
          placeholder="Enter 4-digit PIN"
          title="New PIN"
          keyboardType="numeric"
          maxLength={6}
          secureTextEntry
          value={newPIN}
          setValue={setNewPIN}
        />
        <Spacer size={hp(1)} direction="vertical" />
        <CustomTextInput
          placeholder="Re-enter PIN"
          title="Confirm PIN"
          keyboardType="numeric"
          maxLength={6}
          secureTextEntry
          value={confirmPIN}
          setValue={setConfirmPIN}
        />
        
        {/* PIN Match Indicator */}
        {newPIN && confirmPIN && (
          <View style={styles.validationInfo}>
            <View style={[
              styles.validationDot,
              { backgroundColor: newPIN === confirmPIN ? '#10B981' : '#EF4444' }
            ]} />
            <RegularText 
              size="extraSmall" 
              color={newPIN === confirmPIN ? "success" : "error"}
            >
              {newPIN === confirmPIN ? "PINs match" : "PINs don't match"}
            </RegularText>
          </View>
        )}
      </View>

      <View style={styles.buttonGroup}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => setStep(1)}
        >
          <RegularText size="small" color="primary">
            Back
          </RegularText>
        </TouchableOpacity>
        
        <View style={styles.updateButtonContainer}>
          <CustomBtn
            label="Update PIN"
            onPress={handleUpdatePIN}
            disabled={!isStep2Valid || pinLoading}
            isLoading={pinLoading}
            width="100%"
          />
        </View>
      </View>
    </View>
  );

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
                <View style={styles.lockIconContainer}>
                  <Lock size={20} color="white" />
                </View>
                <BoldText size="medium" color="white">
                  Update PIN
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
          <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
            <Spacer size={hp(2)} direction="vertical" />
            
            {renderStepIndicator()}
            
            <Spacer size={hp(3)} direction="vertical" />
            
            {step === 1 ? renderStep1() : renderStep2()}
            
            <Spacer size={hp(2)} direction="vertical" />
          </ScrollView>
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

const styles = StyleSheet.create({
  modalWrapper: {
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: wp(92),
    maxWidth: 400,
    maxHeight: hp(85),
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
  lockIconContainer: {
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
    maxHeight: hp(60),
  },
  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepDotActive: {
    backgroundColor: COLORS.primary,
  },
  stepLine: {
    width: 40,
    height: 2,
    backgroundColor: '#E5E7EB',
    marginHorizontal: wp(2),
  },
  stepLineActive: {
    backgroundColor: COLORS.primary,
  },
  stepContent: {
    width: '100%',
  },
  stepHeader: {
    alignItems: 'center',
    marginBottom: hp(3),
  },
  stepIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(42, 42, 114, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(1.5),
  },
  stepTitle: {
    marginBottom: hp(0.5),
  },
  stepDescription: {
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: wp(2),
  },
  emailInfo: {
    backgroundColor: 'rgba(42, 42, 114, 0.05)',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(4),
    borderRadius: 12,
    marginBottom: hp(3),
    alignItems: 'center',
  },
  emailText: {
    marginTop: 4,
  },
  inputGroup: {
    marginBottom: hp(3),
  },
  validationInfo: {
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
  buttonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(3),
  },
  backButton: {
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(6),
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  updateButtonContainer: {
    flex: 1,
  },
});

export default UpdatePIN;