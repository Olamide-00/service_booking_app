import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  TextInputProps,
  Modal,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Contacts from "expo-contacts";
import { RegularText } from "../text/indext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Spacer from "./spacer";
import { COLORS } from "@/src/constant/COLORS";

interface CustomTextInputProps extends TextInputProps {
  title?: string;
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
  keyboardType?: "default" | "numeric" | "email-address" | "visible-password";
  maxLength?: number;
  secureTextEntry?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  isPassword?: boolean;
  isPassword2?: boolean;
  isConfirmPassword?: boolean;
  error?: string;
  acceptContact?: boolean;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  title,
  value,
  setValue,
  placeholder,
  keyboardType,
  maxLength,
  secureTextEntry = true,
  multiline = false,
  numberOfLines = 1,
  isPassword = false,
  isPassword2 = false,
  isConfirmPassword = false,
  error = "",
  acceptContact = false,
  ...otherProps
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(secureTextEntry);
  const [isPassword2Visible, setIsPassword2Visible] = useState(secureTextEntry);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(secureTextEntry);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);
  const [contactList, setContactList] = useState<Contacts.Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contacts.Contact[]>(
    []
  );
  const [searchQuery, setSearchQuery] = useState("");

  const togglePasswordVisibility = () => {
    if (isPassword) {
      setIsPasswordVisible(!isPasswordVisible);
    } else if (isPassword2) {
      setIsPassword2Visible(!isPassword2Visible);
    } else if (isConfirmPassword) {
      setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
    }
  };

  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const getStrengthColor = (strength: number) => {
    const colors = [
      "#FF0000",
      "rgba(255, 0, 0, 0.5)",
      "rgba(144, 238, 144, 0.5)",
      "#4CAF50",
    ];
    return colors[strength] || "#ccc";
  };

  const handleTextChange = (text: string) => {
    setValue(text);
    if (isPassword) {
      setPasswordStrength(checkPasswordStrength(text));
    }
  };

  const loadContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });
      if (data.length > 0) {
        setContactList(data);
        setFilteredContacts(data);
      }
    }
  };

  const handleContactSelect = (contact: Contacts.Contact) => {
    const phoneNumber = contact.phoneNumbers?.[0]?.number || "";
    setValue(phoneNumber);
    setModalVisible(false);
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    const filtered = contactList.filter((contact) =>
      (contact.name ?? "").toLowerCase().includes(text.toLowerCase())
    );
    setFilteredContacts(filtered);
  };

  return (
    <View style={styles.container}>
      {title && <RegularText size="medium">{title}</RegularText>}
      <Spacer size={hp(1)} />
      <View
        style={[styles.inputContainer, { borderColor: error ? "red" : "#ccc" }]}
      >
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={handleTextChange}
          placeholder={placeholder}
          keyboardType={keyboardType}
          maxLength={maxLength}
          placeholderTextColor={"#CCC"}
          allowFontScaling={false}
          secureTextEntry={
            isPassword
              ? isPasswordVisible
              : isPassword2
              ? isPassword2Visible
              : isConfirmPassword
              ? isConfirmPasswordVisible
              : false
          }
          multiline={multiline}
          numberOfLines={numberOfLines}
          {...otherProps}
        />
        {(isPassword || isPassword2 || isConfirmPassword) && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.icon}
          >
            <Ionicons
              name={
                (isPassword && isPasswordVisible) ||
                (isPassword2 && isPassword2Visible) ||
                (isConfirmPassword && isConfirmPasswordVisible)
                  ? "eye"
                  : "eye-off"
              }
              size={24}
              color="#666"
            />
          </TouchableOpacity>
        )}
        {acceptContact && (
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
              loadContacts();
            }}
            style={styles.icon}
          >
            <Ionicons name="person-circle" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        )}
      </View>

      {error ? (
        <RegularText size="small" color="primary">
          {error}
        </RegularText>
      ) : null}

      {isPassword && value.length > 0 && (
        <View style={styles.strengthIndicatorContainer}>
          {Array.from({ length: 4 }).map((_, index) => (
            <View
              key={index}
              style={[
                styles.strengthBar,
                {
                  backgroundColor:
                    index < passwordStrength ? getStrengthColor(index) : "#ccc",
                },
              ]}
            />
          ))}
        </View>
      )}

      {/* Contact Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View
          style={{
            flex: 1,
            padding: 20,
            backgroundColor: "#fff",
            marginTop: hp("10%"),
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <TextInput
              placeholder="Search contact..."
              value={searchQuery}
              onChangeText={handleSearch}
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                padding: 10,
              }}
            />
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{ marginLeft: 10 }}
            >
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <FlatList
            data={filteredContacts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleContactSelect(item)}
                style={{
                  padding: 15,
                  borderBottomWidth: 1,
                  borderBottomColor: "#eee",
                }}
              >
                <RegularText size="small" color="primary">
                  {item.name}
                </RegularText>
                <RegularText size="small" color="primary">
                  {item.phoneNumbers?.[0]?.number}
                </RegularText>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    height: hp("6%"),
    width: wp("90%"),
  },
  input: {
    flex: 1,
    fontSize: 14,
    paddingLeft: hp("2%"),
    width: wp("100%"),
  },
  icon: {
    paddingRight: 6,
  },

  strengthIndicatorContainer: {
    flexDirection: "row",
    marginTop: 14,
    alignSelf: "flex-start",
  },
  strengthBar: {
    height: 4,
    width: wp("21%"),
    marginRight: 5,
    borderRadius: 2,
  },
});

export default CustomTextInput;
