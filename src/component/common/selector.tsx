import React, { useState } from "react";
import {
  StyleSheet,
  Text,
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
}

const Selector = ({
  label,
  options,
  selectedValue,
  onSelect,
  testID,
}: SelectorProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionSelect = (option: Option) => {
    onSelect(option.value);
    setIsOpen(false);
  };

  const selectedOption = options.find(
    (option) => option.value === selectedValue
  );

  return (
    <View style={styles.container} testID={testID}>
      <RegularText style={styles.label}>{label}</RegularText>
      <TouchableOpacity
        style={styles.selectorContainer}
        onPress={toggleDropdown}
      >
        <Text style={styles.selectedOption}>
          {selectedOption ? selectedOption.label : "Select an option"}
        </Text>
        <Ionicons
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={24}
          color={COLORS.iconColor}
        />
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.optionsContainer}>
          <FlatList
            data={options}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.option}
                onPress={() => handleOptionSelect(item)}
              >
                <RegularText size="medium">{item.label}</RegularText>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp(90),
  },
  label: {
    marginBottom: hp(1),
  },
  selectorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 5,
    paddingHorizontal: wp(2),
    height: hp(6),
  },
  selectedOption: {
    fontSize: 14,
    color: COLORS.text,
  },
  optionsContainer: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 5,
    marginTop: hp(1),
    maxHeight: hp(35),
  },
  option: {
    padding: wp(2),
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
  },
});

export default Selector;
