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
import { Calendar } from "iconsax-react-native";
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

  return (
    <View>
      <View style={styles.label}>
        <MediumText size="medium">{label}</MediumText>
      </View>
      <TouchableOpacity
        style={styles.dateContainer}
        onPress={() => setShow(true)}
      >
        <RegularText size="small">{selectedDate || "Select Date"}</RegularText>
        <Calendar size={20} color={COLORS.primary} />
      </TouchableOpacity>

      {show && Platform.OS === "ios" && (
        <Modal transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.pickerContainer}>
              <DateTimePicker
                value={date}
                mode="date"
                display="spinner"
                onChange={handleConfirm}
              />
              <TouchableOpacity
                style={styles.doneButton}
                onPress={() => setShow(false)}
              >
                <RegularText size="small" color="primary">
                  Select
                </RegularText>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {show && Platform.OS === "android" && (
        <DateTimePicker
          value={date}
          mode="date"
          display="spinner"
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
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 0.5,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: wp(5),
    height: hp(6.5),
    marginHorizontal: wp(1),
  },
  label: {
    marginBottom: hp(1.5),
    marginLeft: wp(1),
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  pickerContainer: {
    backgroundColor: COLORS.primary,
    padding: 20,
    borderRadius: 10,
  },
  doneButton: {
    marginTop: 10,
    alignSelf: "center",
    paddingHorizontal: 18,
    paddingVertical: 8,
    backgroundColor: COLORS.white,
    borderRadius: 10,
  },
});
