import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
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
    if (Platform.OS === "android") setShow(false);
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

      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="spinner"
          onChange={handleConfirm}
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
});
