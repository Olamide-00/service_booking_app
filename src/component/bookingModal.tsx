import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { COLORS } from "../constant/color";
import { BoldText, RegularText } from "./common/text";
import TextInputField from "./common/textInput";
import Button from "./common/button";

const { width, height } = Dimensions.get("window");

interface BookingModalProps {
  visible: boolean;
  onClose: () => void;
  service: {
    name: string;
    pricePerHour: number;
    image: string;
  };
  onConfirm: (data: any) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({
  visible,
  onClose,
  service,
  onConfirm,
}) => {
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [hours, setHours] = useState("");
  const [note, setNote] = useState("");
  const [selectedService, setSelectedService] = useState<string>("standard");

  const serviceTypes = [
    { id: "standard", name: "Standard", icon: "checkmark-circle", multiplier: 1 },
    { id: "priority", name: "Priority", icon: "flash", multiplier: 1.5 },
    { id: "emergency", name: "alert-circle", multiplier: 2 },
  ];

  const calculateTotal = () => {
    const hrs = parseFloat(hours) || 0;
    const multiplier =
      serviceTypes.find((s) => s.id === selectedService)?.multiplier || 1;
    return (service.pricePerHour * hrs * multiplier).toFixed(2);
  };

  const handleConfirm = () => {
    onConfirm({
      date: date.toDateString(),
      time: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      hours,
      note,
      serviceType: selectedService,
      total: calculateTotal(),
    });

    // Reset fields
    setHours("");
    setNote("");
    setSelectedService("standard");
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
      <View style={styles.overlay}>
        <TouchableOpacity style={StyleSheet.absoluteFill} onPress={onClose} activeOpacity={1} />

        <View style={styles.sheet}>
          <LinearGradient colors={["#ffffff", "#f9f9ff"]} style={styles.gradientBg}>
            {/* Handle bar */}
            <View style={styles.handleBar} />

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Header */}
              <View style={styles.header}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <LinearGradient
                    colors={[COLORS.primary, "#8B5CF6"]}
                    style={styles.headerIcon}
                  >
                    <Ionicons name="calendar" size={18} color={COLORS.white} />
                  </LinearGradient>
                  <View style={{ marginLeft: 10 }}>
                    <BoldText size={20}>Book Service</BoldText>
                    <RegularText size={12} color={COLORS.gray}>
                      Schedule your appointment
                    </RegularText>
                  </View>
                </View>

                <TouchableOpacity onPress={onClose}>
                  <Ionicons name="close" size={22} color={COLORS.textDark} />
                </TouchableOpacity>
              </View>

              {/* Service Summary */}
              <View style={styles.summaryCard}>
                <Ionicons name="person-circle" size={44} color={COLORS.primary} />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <BoldText size={16}>{service.name}</BoldText>
                  <RegularText size={12} color={COLORS.gray}>
                    Professional Service Provider
                  </RegularText>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <BoldText size={16} color={COLORS.primary}>
                    ₦{service.pricePerHour}
                  </BoldText>
                  <RegularText size={11} color={COLORS.gray}>
                    per hour
                  </RegularText>
                </View>
              </View>

              {/* Service Type */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Ionicons name="layers" size={18} color={COLORS.primary} />
                  <BoldText size={15} style={{ marginLeft: 6 }}>
                    Service Type
                  </BoldText>
                </View>
                <View style={styles.typeRow}>
                  {serviceTypes.map((type) => (
                    <TouchableOpacity
                      key={type.id}
                      style={[
                        styles.typeCard,
                        selectedService === type.id && styles.typeCardSelected,
                      ]}
                      onPress={() => setSelectedService(type.id)}
                      activeOpacity={0.8}
                    >
                      <Ionicons
                        name={type.icon as any}
                        size={22}
                        color={
                          selectedService === type.id ? COLORS.primary : COLORS.gray
                        }
                      />
                      <BoldText
                        size={13}
                        color={
                          selectedService === type.id ? COLORS.primary : COLORS.textDark
                        }
                        style={{ marginTop: 4 }}
                      >
                        {type.name}
                      </BoldText>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Date & Time Pickers */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Ionicons name="time" size={18} color={COLORS.primary} />
                  <BoldText size={15} style={{ marginLeft: 6 }}>
                    Date & Time
                  </BoldText>
                </View>
                <View style={styles.dateRow}>
                  <TouchableOpacity
                    onPress={() => setShowDatePicker(true)}
                    style={styles.dateButton}
                  >
                    <Ionicons name="calendar-outline" size={18} color={COLORS.primary} />
                    <RegularText style={{ marginLeft: 6 }}>
                      {date.toDateString()}
                    </RegularText>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => setShowTimePicker(true)}
                    style={styles.dateButton}
                  >
                    <Ionicons name="time-outline" size={18} color={COLORS.primary} />
                    <RegularText style={{ marginLeft: 6 }}>
                      {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </RegularText>
                  </TouchableOpacity>
                </View>

                {showDatePicker && (
                  <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={(_, selected) => {
                      setShowDatePicker(false);
                      if (selected) setDate(selected);
                    }}
                  />
                )}

                {showTimePicker && (
                  <DateTimePicker
                    value={time}
                    mode="time"
                    display="default"
                    onChange={(_, selected) => {
                      setShowTimePicker(false);
                      if (selected) setTime(selected);
                    }}
                  />
                )}
              </View>

              {/* Input Fields */}
              <View style={styles.section}>
                <TextInputField
                  placeholder="Number of hours"
                  keyboardType="numeric"
                  value={hours}
                  onChangeText={setHours}
                />
                <TextInputField
                  placeholder="Additional note (optional)"
                  multiline
                  style={{ marginTop: 10, height: 80, textAlignVertical: "top" }}
                  value={note}
                  onChangeText={setNote}
                />
              </View>

              {/* Total */}
              <View style={styles.totalRow}>
                <RegularText color={COLORS.gray}>Total:</RegularText>
                <BoldText size={18} color={COLORS.primary}>
                  ₦{calculateTotal()}
                </BoldText>
              </View>

              {/* Confirm */}
              <Button
                title="Confirm Booking"
                onPress={handleConfirm}
                style={{ marginTop: 10, marginBottom: 25 }}
              />
            </ScrollView>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  sheet: {
    height: height * 0.8,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
  gradientBg: { flex: 1, paddingHorizontal: 20, paddingTop: 8 },
  handleBar: {
    alignSelf: "center",
    width: 50,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#ddd",
    marginBottom: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  headerIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  summaryCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    marginBottom: 20,
  },
  section: { marginBottom: 20 },
  sectionHeader: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  typeRow: { flexDirection: "row", justifyContent: "space-between" },
  typeCard: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
    marginHorizontal: 4,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  typeCardSelected: {
    backgroundColor: "#EDE9FE",
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
  dateRow: { flexDirection: "row", justifyContent: "space-between" },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.lightGray,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    flex: 1,
    marginHorizontal: 4,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    alignItems: "center",
  },
});

export default BookingModal;
