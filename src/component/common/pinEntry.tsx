import { COLORS } from "@/src/constant/COLORS";
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

type Props = {
  columns: number;
  onChangeOTP: number;
};

const OTPInput = ({ columns, onChangeOTP }: Props) => {
  const [otp, setOtp] = useState(Array(columns).fill(""));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [focusIndex, setFocusIndex] = useState(0);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[currentIndex]) {
      inputRefs.current[currentIndex].focus();
      setFocusIndex(currentIndex);
    }
  }, [currentIndex]);

  // Called when a keypad number is pressed
  const handleKeyPress = (value) => {
    if (currentIndex < columns) {
      const updatedOtp = [...otp];
      updatedOtp[currentIndex] = value;
      setOtp(updatedOtp);
      const newIndex =
        currentIndex < columns - 1 ? currentIndex + 1 : currentIndex;
      setCurrentIndex(newIndex);
      onChangeOTP(updatedOtp.join(""));
    }
  };

  const handleDeletePress = () => {
    const updatedOtp = [...otp];
    let newIndex = currentIndex;

    if (updatedOtp[newIndex] === "" && newIndex > 0) {
      newIndex = newIndex - 1;
    }
    updatedOtp[newIndex] = "";
    setOtp(updatedOtp);
    setCurrentIndex(newIndex);
    onChangeOTP(updatedOtp.join(""));
  };

  return (
    <View>
      {/* OTP input fields */}
      <View style={styles.inputContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={[styles.input, focusIndex === index && styles.focusedInput]}
            value={digit}
            showSoftInputOnFocus={false}
            caretHidden={true}
          />
        ))}
      </View>

      {/* Custom keypad */}
      <View style={styles.keyboardWrapper}>
        <View style={styles.keyboardRow}>
          <TouchableOpacity
            style={styles.keyButton}
            onPress={() => handleKeyPress("1")}
          >
            <Text style={styles.keyButtonText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyButton}
            onPress={() => handleKeyPress("2")}
          >
            <Text style={styles.keyButtonText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyButton}
            onPress={() => handleKeyPress("3")}
          >
            <Text style={styles.keyButtonText}>3</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.keyboardRow}>
          <TouchableOpacity
            style={styles.keyButton}
            onPress={() => handleKeyPress("4")}
          >
            <Text style={styles.keyButtonText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyButton}
            onPress={() => handleKeyPress("5")}
          >
            <Text style={styles.keyButtonText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyButton}
            onPress={() => handleKeyPress("6")}
          >
            <Text style={styles.keyButtonText}>6</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.keyboardRow}>
          <TouchableOpacity
            style={styles.keyButton}
            onPress={() => handleKeyPress("7")}
          >
            <Text style={styles.keyButtonText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyButton}
            onPress={() => handleKeyPress("8")}
          >
            <Text style={styles.keyButtonText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyButton}
            onPress={() => handleKeyPress("9")}
          >
            <Text style={styles.keyButtonText}>9</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.keyboardRow}>
          <TouchableOpacity
            style={[styles.keyButton, styles.halfButton2]}
            onPress={() => handleKeyPress("0")}
          >
            <Text style={styles.keyButtonText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.keyButton, styles.halfButton]}
            onPress={handleDeletePress}
          >
            <Text style={styles.keyButtonText}>←</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: "#ccc",
    textAlign: "center",
    fontSize: 24,
    borderRadius: 8,
  },
  focusedInput: {
    borderColor: "#4CAF50",
    transform: [{ scale: 1.1 }],
  },
  keyboardWrapper: {
    marginTop: hp("10%"),
  },
  keyboardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  keyButton: {
    height: hp(8),
    width: hp(8),
    marginHorizontal: wp(3),
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginVertical: hp("2%"),
    // iOS shadow properties
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  halfButton: {
    flex: 0.8,
    marginHorizontal: 5,
  },
  keyButtonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
  },
});

export default OTPInput;
