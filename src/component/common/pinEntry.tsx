import { COLORS } from "@/src/constant/COLORS";
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

type Props = {
  columns: number;
  onChangeOTP: (otp: string) => void;
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
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {otp.map((digit, index) => (
          <View
            key={index}
            style={[
              styles.inputBox,
              focusIndex === index && styles.focusedBox
            ]}
          >
            <LinearGradient
              colors={
                focusIndex === index
                  ? ['#667eea', '#764ba2']
                  : digit !== ""
                  ? ['#f0f9ff', '#e0f2fe']
                  : ['#f8fafc', '#f1f5f9']
              }
              style={styles.inputGradient}
            >
              <TextInput
                ref={(ref) => (inputRefs.current[index] = ref)}
                style={styles.hiddenInput}
                value={digit}
                showSoftInputOnFocus={false}
                caretHidden={true}
              />
              
              {/* Display star instead of number */}
              <View style={styles.starContainer}>
                {digit !== "" ? (
                  <MaterialIcons 
                    name="star" 
                    size={24} 
                    color={focusIndex === index ? "#fff" : "#667eea"} 
                  />
                ) : (
                  <View style={styles.emptyDot} />
                )}
              </View>
            </LinearGradient>
          </View>
        ))}
      </View>

      {/* Custom keypad */}
      <View style={styles.keyboardWrapper}>
        <View style={styles.keyboardRow}>
          {[1, 2, 3].map((num) => (
            <TouchableOpacity
              key={num}
              style={styles.keyButton}
              onPress={() => handleKeyPress(num.toString())}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#ffffff', '#f8fafc']}
                style={styles.keyGradient}
              >
                <Text style={styles.keyButtonText}>{num}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.keyboardRow}>
          {[4, 5, 6].map((num) => (
            <TouchableOpacity
              key={num}
              style={styles.keyButton}
              onPress={() => handleKeyPress(num.toString())}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#ffffff', '#f8fafc']}
                style={styles.keyGradient}
              >
                <Text style={styles.keyButtonText}>{num}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.keyboardRow}>
          {[7, 8, 9].map((num) => (
            <TouchableOpacity
              key={num}
              style={styles.keyButton}
              onPress={() => handleKeyPress(num.toString())}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#ffffff', '#f8fafc']}
                style={styles.keyGradient}
              >
                <Text style={styles.keyButtonText}>{num}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.keyboardRow}>
          <View style={styles.emptySpace} />
          <TouchableOpacity
            style={styles.keyButton}
            onPress={() => handleKeyPress("0")}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#ffffff', '#f8fafc']}
              style={styles.keyGradient}
            >
              <Text style={styles.keyButtonText}>0</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyButton}
            onPress={handleDeletePress}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#fef2f2', '#fee2e2']}
              style={styles.keyGradient}
            >
              <MaterialIcons name="backspace" size={20} color="#ef4444" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: wp("4%"),
    marginBottom: hp("4%"),
    paddingHorizontal: wp("6%"),
  },
  inputBox: {
    width: wp("14%"),
    height: wp("14%"),
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  focusedBox: {
    transform: [{ scale: 1.05 }],
    elevation: 6,
    shadowOpacity: 0.15,
  },
  inputGradient: {
    flex: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(102, 126, 234, 0.1)',
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: '100%',
    height: '100%',
  },
  starContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(102, 126, 234, 0.3)',
  },
  keyboardWrapper: {
    marginTop: hp("3%"),
  },
  keyboardRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: wp("8%"),
    marginBottom: hp("2.5%"),
  },
  keyButton: {
    width: hp("7.5%"),
    height: hp("7.5%"),
    borderRadius: hp("3.75%"),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  keyGradient: {
    flex: 1,
    borderRadius: hp("3.75%"),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: 'rgba(102, 126, 234, 0.08)',
  },
  keyButtonText: {
    fontSize: 20,
    fontWeight: "600",
    color: '#374151',
  },
  emptySpace: {
    width: hp("7.5%"),
    height: hp("7.5%"),
  },
});
export default OTPInput;