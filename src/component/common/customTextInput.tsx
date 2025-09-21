import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  TextInputProps,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as Contacts from "expo-contacts";
import { RegularText, MediumText } from "../text/indext";
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
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(secureTextEntry);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [contactList, setContactList] = useState<Contacts.Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contacts.Contact[]>([]);
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
    const colors = ["#ef4444", "#f59e0b", "#eab308", "#10b981"];
    return colors[strength] || "#e5e7eb";
  };

  const getStrengthText = (strength: number) => {
    const labels = ["Weak", "Fair", "Good", "Strong"];
    return labels[strength - 1] || "";
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
    setSearchQuery("");
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
      {/* Label */}
      {title && (
        <View style={styles.labelContainer}>
          <MediumText size="medium" style={styles.label}>
            {title}
          </MediumText>
        </View>
      )}

      {/* Input Container */}
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
          error && styles.inputContainerError,
          value && styles.inputContainerFilled,
        ]}
      >
        {/* Text Input */}
        <TextInput
          style={[
            styles.input,
            multiline && styles.inputMultiline,
          ]}
          value={value}
          onChangeText={handleTextChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          keyboardType={keyboardType}
          maxLength={maxLength}
          placeholderTextColor="#9ca3af"
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

        {/* Right Icons */}
        <View style={styles.iconsContainer}>
          {/* Contact Icon */}
          {acceptContact && (
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
                loadContacts();
              }}
              style={styles.iconButton}
            >
              <MaterialIcons 
                name="contacts" 
                size={20} 
                color={COLORS.primary} 
              />
            </TouchableOpacity>
          )}

          {/* Password Toggle Icon */}
          {(isPassword || isPassword2 || isConfirmPassword) && (
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              style={styles.iconButton}
            >
              <Ionicons
                name={
                  (isPassword && isPasswordVisible) ||
                  (isPassword2 && isPassword2Visible) ||
                  (isConfirmPassword && isConfirmPasswordVisible)
                    ? "eye-outline"
                    : "eye-off-outline"
                }
                size={20}
                color="#6b7280"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Error Message */}
      {error ? (
        <View style={styles.errorContainer}>
          <MaterialIcons name="error-outline" size={14} color="#ef4444" />
          <RegularText size="small" style={styles.errorText}>
            {error}
          </RegularText>
        </View>
      ) : null}

      {/* Password Strength Indicator */}
      {isPassword && value.length > 0 && (
        <View style={styles.strengthContainer}>
          <View style={styles.strengthBars}>
            {Array.from({ length: 4 }).map((_, index) => (
              <View
                key={index}
                style={[
                  styles.strengthBar,
                  {
                    backgroundColor:
                      index < passwordStrength 
                        ? getStrengthColor(passwordStrength) 
                        : "#e5e7eb",
                  },
                ]}
              />
            ))}
          </View>
          {passwordStrength > 0 && (
            <RegularText size="small" style={styles.strengthText}>
              Password strength: {getStrengthText(passwordStrength)}
            </RegularText>
          )}
        </View>
      )}

      {/* Contact Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <KeyboardAvoidingView 
          style={styles.modalOverlay}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.modalContainer}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <View style={styles.modalTitleContainer}>
                <MaterialIcons name="contacts" size={22} color={COLORS.primary} />
                <MediumText size="large" style={styles.modalTitle}>
                  Select Contact
                </MediumText>
              </View>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <MaterialIcons name="close" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>

            {/* Search Input */}
            <View style={styles.searchSection}>
              <View style={styles.searchContainer}>
                <MaterialIcons name="search" size={20} color="#9ca3af" />
                <TextInput
                  placeholder="Search contacts..."
                  value={searchQuery}
                  onChangeText={handleSearch}
                  style={styles.searchInput}
                  placeholderTextColor="#9ca3af"
                  autoFocus
                />
                {searchQuery.length > 0 && (
                  <TouchableOpacity 
                    onPress={() => setSearchQuery("")}
                    style={styles.clearSearchButton}
                  >
                    <MaterialIcons name="clear" size={18} color="#9ca3af" />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {/* Contacts List */}
            <View style={styles.contactsSection}>
              {filteredContacts.length === 0 ? (
                <View style={styles.emptyContainer}>
                  <MaterialIcons name="contacts" size={48} color="#d1d5db" />
                  <RegularText size="medium" style={styles.emptyText}>
                    No contacts found
                  </RegularText>
                </View>
              ) : (
                <FlatList
                  data={filteredContacts}
                  keyExtractor={(item) => item.id}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => handleContactSelect(item)}
                      style={styles.contactItem}
                      activeOpacity={0.7}
                    >
                      <View style={styles.contactAvatar}>
                        <MaterialIcons name="person" size={20} color="#6b7280" />
                      </View>
                      <View style={styles.contactInfo}>
                        <MediumText size="medium" style={styles.contactName}>
                          {item.name || "Unknown"}
                        </MediumText>
                        <RegularText size="small" style={styles.contactPhone}>
                          {item.phoneNumbers?.[0]?.number || "No phone"}
                        </RegularText>
                      </View>
                      <MaterialIcons name="chevron-right" size={20} color="#d1d5db" />
                    </TouchableOpacity>
                  )}
                  contentContainerStyle={styles.contactsList}
                />
              )}
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: hp("0.5%"),
  },
  labelContainer: {
    marginBottom: hp("1%"),
    marginLeft: wp("1%"),
  },
  label: {
    color: '#374151',
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: wp("4%"),
    minHeight: hp("6.5%"),
  },
  inputContainerFocused: {
    borderColor: COLORS.primary,
  },
  inputContainerError: {
    borderColor: '#ef4444',
  },
  inputContainerFilled: {
    borderColor: 'rgba(102, 126, 234, 0.3)',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
    paddingVertical: hp("1%"),
  },
  inputMultiline: {
    textAlignVertical: 'top',
    paddingTop: hp("1.5%"),
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp("2%"),
  },
  iconButton: {
    padding: wp("1%"),
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp("1.5%"),
    marginTop: hp("0.5%"),
    marginLeft: wp("1%"),
  },
  errorText: {
    color: '#ef4444',
    flex: 1,
  },
  strengthContainer: {
    marginTop: hp("1%"),
    marginLeft: wp("1%"),
  },
  strengthBars: {
    flexDirection: "row",
    gap: wp("1%"),
    marginBottom: hp("0.5%"),
  },
  strengthBar: {
    height: 4,
    flex: 1,
    borderRadius: 2,
  },
  strengthText: {
    color: '#6b7280',
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: hp("85%"),
    minHeight: hp("60%"),
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp("6%"),
    paddingVertical: hp("2.5%"),
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  modalTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp("3%"),
  },
  modalTitle: {
    color: '#1f2937',
    fontWeight: '700',
  },
  closeButton: {
    padding: wp("2%"),
    borderRadius: 8,
    backgroundColor: '#f9fafb',
  },
  searchSection: {
    paddingHorizontal: wp("6%"),
    paddingVertical: hp("1.5%"),
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingHorizontal: wp("4%"),
    borderWidth: 1,
    borderColor: '#e5e7eb',
    gap: wp("3%"),
  },
  searchInput: {
    flex: 1,
    height: hp("5.5%"),
    fontSize: 16,
    color: '#374151',
  },
  clearSearchButton: {
    padding: wp("1%"),
  },
  contactsSection: {
    flex: 1,
  },
  contactsList: {
    paddingHorizontal: wp("4%"),
    paddingBottom: hp("2%"),
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp("1.5%"),
    paddingHorizontal: wp("4%"),
    borderRadius: 12,
    marginVertical: hp("0.3%"),
    gap: wp("3%"),
  },
  contactAvatar: {
    width: hp("5%"),
    height: hp("5%"),
    borderRadius: hp("2.5%"),
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactInfo: {
    flex: 1,
    gap: hp("0.2%"),
  },
  contactName: {
    color: '#1f2937',
  },
  contactPhone: {
    color: '#6b7280',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp("8%"),
    gap: hp("2%"),
  },
  emptyText: {
    color: '#9ca3af',
    textAlign: 'center',
  },
});

export default CustomTextInput;