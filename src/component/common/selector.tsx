import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RegularText } from "../text/indext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { MotiView } from "moti";
import Spacer from "./spacer";

const COLORS = {
  border: "#ccc",
  text: "#333",
  iconColor: "#666",
};

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
}

const Selector = ({
  label,
  options,
  selectedValue,
  onSelect,
  testID,
  loading = false,
  showSearch = false,
}: SelectorProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionSelect = (option: Option) => {
    onSelect(option.value);
    setIsOpen(false);
    setSearchQuery("");
  };

  const selectedOption = options.find(
    (option) => option.value === selectedValue
  );
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container} testID={testID}>
      <RegularText size="small">{label}</RegularText>
      <Spacer size={hp(1)} />
      <TouchableOpacity
        style={styles.selectorContainer}
        onPress={toggleDropdown}
      >
        <RegularText size="small">
          {selectedOption ? selectedOption.label : `Select ${label}`}
        </RegularText>
        <Ionicons
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={24}
          color={COLORS.iconColor}
        />
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.optionsContainer}>
          {showSearch && (
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          )}
          {loading ? (
            [...Array(3)].map((_, index) => (
              <MotiView
                key={index}
                from={{ opacity: 0.4 }}
                animate={{ opacity: 1 }}
                transition={{ loop: true, type: "timing", duration: 700 }}
                style={styles.skeletonOption}
              />
            ))
          ) : (
            <FlatList
              data={filteredOptions}
              keyExtractor={(item) => item.value}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleOptionSelect(item)}
                >
                  <RegularText size="medium">{item.label}</RegularText>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp("90%"),
  },
  selectorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 5,
    paddingHorizontal: wp("2%"),
    height: hp("6%"),
  },
  optionsContainer: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 5,
    marginTop: hp("5%"),
    maxHeight: hp("35%"),
    backgroundColor: "#fff",
    paddingHorizontal: wp("2%"),
    paddingVertical: hp("1%"),
  },
  searchInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 5,
    paddingHorizontal: wp("2%"),
    height: hp("5%"),
    marginBottom: hp("1%"),
  },
  option: {
    padding: wp("2%"),
    paddingVertical: hp("2%"),
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
  },
  skeletonOption: {
    width: "100%",
    height: hp("5%"),
    backgroundColor: "#E0E0E0",
    borderRadius: 5,
    marginBottom: hp("1%"),
  },
});

export default Selector;
