import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { RegularText, MediumText } from "../text/indext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { MotiView } from "moti";
import Spacer from "./spacer";
import { COLORS } from "@/src/constant/COLORS";

interface Option {
  label: string;
  value: string;
}

interface SelectorProps {
  label: string;
  options: Option[];
  selectedValue: string;
  onSelect: (value: string) => void;
  testID?: string;
  loading?: boolean;
  showSearch?: boolean;
  placeholder?: string;
}

const Selector = ({
  label,
  options,
  selectedValue,
  onSelect,
  testID,
  loading = false,
  showSearch = false,
  placeholder,
}: SelectorProps): JSX.Element => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleOptionSelect = (option: Option) => {
    onSelect(option.value);
    setIsModalVisible(false);
    setSearchQuery("");
  };

  const selectedOption = options.find(
    (option) => option.value === selectedValue
  );
  
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <View style={styles.container} testID={testID}>
        {/* Label */}
        {label && (
          <View style={styles.labelContainer}>
            <MediumText size="medium" style={styles.label}>
              {label}
            </MediumText>
          </View>
        )}

        {/* Selector Input */}
        <TouchableOpacity
          style={[
            styles.selectorContainer,
            selectedValue && styles.selectorContainerFilled
          ]}
          onPress={() => setIsModalVisible(true)}
          activeOpacity={0.8}
        >
          <View style={styles.inputContent}>
            <MaterialIcons 
              name="list" 
              size={18} 
              color={selectedValue ? COLORS.primary : "#9ca3af"} 
              style={styles.inputIcon}
            />
            <RegularText 
              size="medium"
              style={[
                styles.inputText,
                selectedValue ? styles.inputTextFilled : styles.inputTextPlaceholder
              ]}
            >
              {selectedOption ? selectedOption.label : (placeholder || `Select ${label}`)}
            </RegularText>
          </View>
          <MaterialIcons
            name="keyboard-arrow-down"
            size={22}
            color={selectedValue ? COLORS.primary : "#9ca3af"}
          />
        </TouchableOpacity>
      </View>

      {/* Modal for Options */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <KeyboardAvoidingView 
          style={styles.modalOverlay}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={[
            styles.modalContainer,
            showSearch && styles.modalContainerWithSearch
          ]}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <View style={styles.headerLeft}>
                <MaterialIcons 
                  name="list" 
                  size={22} 
                  color={COLORS.primary} 
                />
                <MediumText size="large" style={styles.modalTitle}>
                  {label || "Select Option"}
                </MediumText>
              </View>
              
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                style={styles.closeButton}
              >
                <MaterialIcons name="close" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>

            {/* Search Input */}
            {showSearch && (
              <View style={styles.searchSection}>
                <View style={styles.searchContainer}>
                  <MaterialIcons 
                    name="search" 
                    size={20} 
                    color="#9ca3af" 
                    style={styles.searchIcon}
                  />
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Search options..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholderTextColor="#9ca3af"
                    autoFocus
                  />
                  {searchQuery.length > 0 && (
                    <TouchableOpacity 
                      onPress={() => setSearchQuery("")}
                      style={styles.clearButton}
                    >
                      <MaterialIcons name="clear" size={18} color="#9ca3af" />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            )}

            {/* Options List */}
            <View style={styles.optionsSection}>
              {loading ? (
                <View style={styles.skeletonContainer}>
                  {[...Array(6)].map((_, index) => (
                    <MotiView
                      key={index}
                      from={{ opacity: 0.3 }}
                      animate={{ opacity: 0.7 }}
                      transition={{ 
                        loop: true, 
                        type: "timing", 
                        duration: 1000,
                        delay: index * 100 
                      }}
                      style={styles.skeletonOption}
                    />
                  ))}
                </View>
              ) : filteredOptions.length === 0 ? (
                <View style={styles.emptyContainer}>
                  <MaterialIcons name="search-off" size={32} color="#d1d5db" />
                  <RegularText size="small" style={styles.emptyText}>
                    No options found
                  </RegularText>
                </View>
              ) : (
                <FlatList
                  data={filteredOptions}
                  keyExtractor={(item) => item.value}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[
                        styles.modalOption,
                        selectedValue === item.value && styles.selectedModalOption
                      ]}
                      onPress={() => handleOptionSelect(item)}
                      activeOpacity={0.7}
                    >
                      <View style={styles.optionContent}>
                        <RegularText 
                          size="medium" 
                          style={[
                            styles.optionText,
                            selectedValue === item.value && styles.selectedOptionText
                          ]}
                        >
                          {item.label}
                        </RegularText>
                        {selectedValue === item.value && (
                          <MaterialIcons 
                            name="check-circle" 
                            size={20} 
                            color={COLORS.primary} 
                          />
                        )}
                      </View>
                    </TouchableOpacity>
                  )}
                  contentContainerStyle={styles.optionsList}
                />
              )}
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
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
  selectorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: wp("4%"),
    height: hp("6.5%"),
  },
  selectorContainerFilled: {
    borderColor: COLORS.primary,
  },
  inputContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  inputIcon: {
    marginRight: wp("3%"),
  },
  inputText: {
    flex: 1,
    fontWeight: '500',
  },
  inputTextFilled: {
    color: '#374151',
  },
  inputTextPlaceholder: {
    color: '#9ca3af',
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
    maxHeight: hp("75%"),
    minHeight: hp("50%"),
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  modalContainerWithSearch: {
    maxHeight: hp("85%"),
    minHeight: hp("60%"),
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
  headerLeft: {
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
  
  // Search section
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
  },
  searchIcon: {
    marginRight: wp("3%"),
  },
  searchInput: {
    flex: 1,
    height: hp("5.5%"),
    fontSize: 16,
    color: '#374151',
  },
  clearButton: {
    padding: wp("1%"),
  },

  // Options section
  optionsSection: {
    flex: 1,
    paddingTop: hp("1%"),
  },
  optionsList: {
    paddingHorizontal: wp("4%"),
    paddingBottom: hp("2%"),
  },
  modalOption: {
    paddingHorizontal: wp("4%"),
    paddingVertical: hp("2%"),
    marginVertical: hp("0.3%"),
    borderRadius: 12,
    backgroundColor: '#ffffff',
  },
  selectedModalOption: {
    backgroundColor: 'rgba(102, 126, 234, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(102, 126, 234, 0.2)',
  },
  optionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionText: {
    color: '#374151',
    flex: 1,
  },
  selectedOptionText: {
    color: COLORS.primary,
    fontWeight: '600',
  },

  // Empty state
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: hp("6%"),
    gap: hp("1.5%"),
  },
  emptyText: {
    color: '#9ca3af',
    textAlign: 'center',
  },

  // Skeleton loader
  skeletonContainer: {
    paddingHorizontal: wp("6%"),
    paddingVertical: hp("2%"),
  },
  skeletonOption: {
    width: "100%",
    height: hp("5%"),
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    marginBottom: hp("1.2%"),
  },
});

export default Selector;