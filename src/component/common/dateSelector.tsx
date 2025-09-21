import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Modal,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import { Calendar, CalendarEdit } from "iconsax-react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS } from "@/src/constant/COLORS";
import { MediumText, RegularText } from "../text/indext";

type DateSelectorProps = {
  selectedDate: string;
  onDateChange: (date: string) => void;
  label?: string;
};

const DateSelector: React.FC<DateSelectorProps> = ({
  selectedDate,
  onDateChange,
  label,
}) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const handleConfirm = (event: any, newDate?: Date) => {
    if (newDate) {
      const formattedDate = format(newDate, "yyyy-MM-dd");
      setDate(newDate);
      onDateChange(formattedDate);
    }
  };

  // Format display date nicely
  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return "Select a date";
    try {
      const parsedDate = new Date(dateStr);
      return format(parsedDate, "MMM dd, yyyy");
    } catch {
      return dateStr;
    }
  };

  return (
    <View style={styles.container}>
      {/* Label */}
      {label && (
        <View style={styles.labelContainer}>
          <MediumText size="medium" style={styles.labelText}>
            {label}
          </MediumText>
        </View>
      )}

      {/* Date Input */}
      <TouchableOpacity
        style={[
          styles.dateInput,
          selectedDate && styles.dateInputFilled
        ]}
        onPress={() => setShow(true)}
        activeOpacity={0.8}
      >
        {/* Calendar icon */}
        <View style={styles.iconContainer}>
          <Calendar 
            size={20} 
            color={selectedDate ? COLORS.primary : "#9ca3af"} 
          />
        </View>
        
        {/* Date text */}
        <View style={styles.textContainer}>
          <RegularText 
            size="medium" 
            style={[
              styles.dateText,
              selectedDate ? styles.dateTextFilled : styles.dateTextPlaceholder
            ]}
          >
            {formatDisplayDate(selectedDate)}
          </RegularText>
        </View>
        
        {/* Dropdown arrow */}
        <View style={styles.arrowContainer}>
          <MaterialIcons 
            name="keyboard-arrow-down" 
            size={24} 
            color="#9ca3af" 
          />
        </View>
      </TouchableOpacity>

      {/* iOS Modal */}
      {show && Platform.OS === "ios" && (
        <Modal transparent animationType="slide" visible={show}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              {/* Modal header */}
              <View style={styles.modalHeader}>
                <TouchableOpacity 
                  onPress={() => setShow(false)}
                  style={styles.cancelButton}
                >
                  <RegularText size="medium" style={styles.cancelText}>
                    Cancel
                  </RegularText>
                </TouchableOpacity>
                
                <MediumText size="medium" style={styles.modalTitle}>
                  Select Date
                </MediumText>
                
                <TouchableOpacity
                  style={styles.doneButton}
                  onPress={() => setShow(false)}
                >
                  <RegularText size="medium" style={styles.doneText}>
                    Done
                  </RegularText>
                </TouchableOpacity>
              </View>
              
              {/* Date picker */}
              <View style={styles.pickerWrapper}>
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="spinner"
                  onChange={handleConfirm}
                  style={styles.datePicker}
                />
              </View>
            </View>
          </View>
        </Modal>
      )}

      {/* Android picker */}
      {show && Platform.OS === "android" && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, newDate) => {
            setShow(false);
            if (newDate) {
              handleConfirm(event, newDate);
            }
          }}
        />
      )}
    </View>
  );
};

export default DateSelector;

const styles = StyleSheet.create({
  container: {
    marginVertical: hp("1%"),
  },
  labelContainer: {
    marginBottom: hp("1%"),
    marginLeft: wp("1%"),
  },
  labelText: {
    color: '#374151',
    fontWeight: '600',
  },
  dateInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: wp("4%"),
    height: hp("6.5%"),
  },
  dateInputFilled: {
    borderColor: COLORS.primary,
    backgroundColor: '#ffffff',
  },
  iconContainer: {
    marginRight: wp("3%"),
  },
  textContainer: {
    flex: 1,
  },
  dateText: {
    fontWeight: '500',
  },
  dateTextFilled: {
    color: '#374151',
  },
  dateTextPlaceholder: {
    color: '#9ca3af',
  },
  arrowContainer: {
    marginLeft: wp("2%"),
  },
  
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: hp("4%"),
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp("5%"),
    paddingVertical: hp("2%"),
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  cancelButton: {
    paddingVertical: hp("1%"),
    paddingHorizontal: wp("3%"),
  },
  cancelText: {
    color: '#6b7280',
  },
  modalTitle: {
    color: '#1f2937',
    fontWeight: '700',
  },
  doneButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: hp("1%"),
    paddingHorizontal: wp("4%"),
    borderRadius: 8,
  },
  doneText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  pickerWrapper: {
    paddingHorizontal: wp("5%"),
    paddingTop: hp("2%"),
  },
  datePicker: {
    backgroundColor: '#ffffff',
  },
});