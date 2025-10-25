import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { COLORS } from "../constant/color";
import { BoldText, RegularText } from "./common/text";
import TextInputField from "./common/textInput";

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
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [time, setTime] = useState<Date>(new Date());
  const [hours, setHours] = useState("");
  const [note, setNote] = useState("");
  const [selectedService, setSelectedService] = useState<string>("standard");

  const serviceTypes = [
    { id: "standard", name: "Standard", icon: "checkmark-circle", multiplier: 1 },
    { id: "priority", name: "Priority", icon: "flash", multiplier: 1.5 },
    { id: "emergency", name: "Emergency", icon: "alert-circle", multiplier: 2 },
  ];

  const calculateTotal = () => {
    const hrs = parseFloat(hours) || 0;
    const multiplier = serviceTypes.find((s) => s.id === selectedService)?.multiplier || 1;
    return (service.pricePerHour * hrs * multiplier).toFixed(2);
  };

  const handleConfirm = () => {
    onConfirm({
      date: date.toDateString(),
      time: time.toLocaleTimeString(),
      hours,
      note,
      serviceType: selectedService,
      total: calculateTotal(),
    });
    onClose();
    // Reset
    setHours("");
    setNote("");
    setSelectedService("standard");
  };

  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
      <View style={styles.modalOverlay}>
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          onPress={onClose}
          activeOpacity={1}
        />

        <View style={styles.modalContainer}>
          {/* Decorative background */}
          <View style={styles.decorPattern}>
            <View style={[styles.decorCircle, styles.circle1]} />
            <View style={[styles.decorCircle, styles.circle2]} />
          </View>

          {/* Modal Header */}
          <LinearGradient
            colors={['rgba(124, 82, 255, 0.08)', 'transparent']}
            style={styles.modalHeader}
          >
            <View style={styles.handleBar} />
            
            <View style={styles.headerContent}>
              <View style={styles.headerLeft}>
                <View style={styles.headerIconBox}>
                  <LinearGradient
                    colors={[COLORS.primary, '#8B5CF6']}
                    style={styles.headerIconGradient}
                  >
                    <Ionicons name="calendar" size={20} color={COLORS.white} />
                  </LinearGradient>
                </View>
                <View>
                  <BoldText size={22} color={COLORS.textDark}>
                    Book Service
                  </BoldText>
                  <RegularText size={12} color={COLORS.gray} style={{ marginTop: 2 }}>
                    Schedule your appointment
                  </RegularText>
                </View>
              </View>
              
              <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                <Ionicons name="close" size={24} color={COLORS.textDark} />
              </TouchableOpacity>
            </View>
          </LinearGradient>

          {/* Modal Content */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Service Summary Card */}
            <View style={styles.summaryCard}>
              <View style={styles.summaryContent}>
                <Ionicons name="person-circle" size={40} color={COLORS.primary} />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <BoldText size={16} color={COLORS.textDark}>
                    {service.name}
                  </BoldText>
                  <RegularText size={13} color={COLORS.gray}>
                    Professional Service Provider
                  </RegularText>
                </View>
                <View style={styles.priceTag}>
                  <BoldText size={16} color={COLORS.primary}>
                    ${service.pricePerHour}
                  </BoldText>
                  <RegularText size={10} color={COLORS.gray}>
                    /hour
                  </RegularText>
                </View>
              </View>
            </View>

            {/* Service Type Selection */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="layers" size={18} color={COLORS.primary} />
                <BoldText size={16} color={COLORS.textDark} style={{ marginLeft: 8 }}>
                  Service Type
                </BoldText>
              </View>
              <View style={styles.serviceTypeGrid}>
                {serviceTypes.map((type) => (
                  <TouchableOpacity
                    key={type.id}
                    style={[
                      styles.serviceTypeCard,
                      selectedService === type.id && styles.serviceTypeSelected,
                    ]}
                    onPress={() => setSelectedService(type.id)}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name={type.icon as any}
                      size={24}
                      color={selectedService === type.id ? COLORS.primary : COLORS.gray}
                    />
                    <BoldText
                      size={13}
                      color={selectedService === type.id ? COLORS.textDark : COLORS.gray}
                      style={{ marginTop: 6 }}
                    >
                      {type.name}
                    </BoldText>
                    {type.multiplier > 1 && (
                      <RegularText size={10} color={COLORS.gray}>
                        +{((type.multiplier - 1) * 100)}%
                      </RegularText>
                    )}
                    {selectedService === type.id && (
                      <View style={styles.selectedCheckmark}>
                        <Ionicons name="checkmark-circle" size={16} color={COLORS.primary} />
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Date Selection */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="calendar-outline" size={18} color={COLORS.primary} />
                <BoldText size={16} color={COLORS.textDark} style={{ marginLeft: 8 }}>
                  Select Date & Time
                </BoldText>
              </View>
              
              <View style={styles.dateTimeContainer}>
                <TouchableOpacity
                  onPress={() => setShowDatePicker(true)}
                  style={styles.dateTimeBtn}
                  activeOpacity={0.7}
                >
                  <View style={styles.dateTimeIcon}>
                    <Ionicons name="calendar" size={20} color={COLORS.primary} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <RegularText size={11} color={COLORS.gray}>
                      Date
                    </RegularText>
                    <BoldText size={14} color={COLORS.textDark}>
                      {date.toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </BoldText>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setShowTimePicker(true)}
                  style={styles.dateTimeBtn}
                  activeOpacity={0.7}
                >
                  <View style={styles.dateTimeIcon}>
                    <Ionicons name="time" size={20} color={COLORS.primary} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <RegularText size={11} color={COLORS.gray}>
                      Time
                    </RegularText>
                    <BoldText size={14} color={COLORS.textDark}>
                      {time.toLocaleTimeString('en-US', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </BoldText>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
                </TouchableOpacity>
              </View>

              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  minimumDate={new Date()}
                  onChange={(_, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) setDate(selectedDate);
                  }}
                />
              )}

              {showTimePicker && (
                <DateTimePicker
                  value={time}
                  mode="time"
                  display="default"
                  onChange={(_, selectedTime) => {
                    setShowTimePicker(false);
                    if (selectedTime) setTime(selectedTime);
                  }}
                />
              )}
            </View>

            {/* Duration */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="time-outline" size={18} color={COLORS.primary} />
                <BoldText size={16} color={COLORS.textDark} style={{ marginLeft: 8 }}>
                  Duration
                </BoldText>
              </View>
              
              <View style={styles.durationContainer}>
                <TextInputField
                  placeholder="Number of hours"
                  keyboardType="numeric"
                  value={hours}
                  onChangeText={setHours}
                  style={styles.hoursInput}
                />
                <View style={styles.quickHours}>
                  {['2', '4', '6', '8'].map((h) => (
                    <TouchableOpacity
                      key={h}
                      style={[
                        styles.quickHourBtn,
                        hours === h && styles.quickHourBtnActive,
                      ]}
                      onPress={() => setHours(h)}
                      activeOpacity={0.7}
                    >
                      <BoldText
                        size={13}
                        color={hours === h ? COLORS.white : COLORS.textDark}
                      >
                        {h}h
                      </BoldText>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>

            {/* Additional Notes */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="document-text-outline" size={18} color={COLORS.primary} />
                <BoldText size={16} color={COLORS.textDark} style={{ marginLeft: 8 }}>
                  Additional Notes
                </BoldText>
                <RegularText size={11} color={COLORS.gray} style={{ marginLeft: 8 }}>
                  (Optional)
                </RegularText>
              </View>
              
              <TextInputField
                placeholder="Add special instructions or requirements..."
                value={note}
                onChangeText={setNote}
                multiline
                style={styles.noteInput}
              />
            </View>

            {/* Price Summary */}
            <View style={styles.summarySection}>
              <LinearGradient
                colors={['rgba(124, 82, 255, 0.08)', 'rgba(139, 92, 246, 0.05)']}
                style={styles.priceSummaryCard}
              >
                <View style={styles.summaryRow}>
                  <RegularText size={14} color={COLORS.textLight}>
                    Service Rate
                  </RegularText>
                  <BoldText size={14} color={COLORS.textDark}>
                    ${service.pricePerHour}/hr
                  </BoldText>
                </View>
                
                {hours && (
                  <>
                    <View style={styles.summaryRow}>
                      <RegularText size={14} color={COLORS.textLight}>
                        Duration
                      </RegularText>
                      <BoldText size={14} color={COLORS.textDark}>
                        {hours} hour(s)
                      </BoldText>
                    </View>

                    {selectedService !== 'standard' && (
                      <View style={styles.summaryRow}>
                        <RegularText size={14} color={COLORS.textLight}>
                          Service Type
                        </RegularText>
                        <BoldText size={14} color={COLORS.primary}>
                          {serviceTypes.find((s) => s.id === selectedService)?.name}
                        </BoldText>
                      </View>
                    )}

                    <View style={styles.dividerLine} />
                    
                    <View style={styles.summaryRow}>
                      <BoldText size={16} color={COLORS.textDark}>
                        Total Amount
                      </BoldText>
                      <BoldText size={22} color={COLORS.primary}>
                        ${calculateTotal()}
                      </BoldText>
                    </View>
                  </>
                )}
              </LinearGradient>
            </View>
          </ScrollView>

          {/* Footer Actions */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <Ionicons name="close-circle" size={20} color={COLORS.gray} />
              <RegularText size={14} color={COLORS.gray} style={{ marginLeft: 6 }}>
                Cancel
              </RegularText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.confirmBtnWrapper}
              activeOpacity={0.8}
              onPress={handleConfirm}
              disabled={!hours || hours === '0'}
            >
              <LinearGradient
                colors={
                  !hours || hours === '0'
                    ? ['#CCCCCC', '#999999']
                    : [COLORS.primary, '#8B5CF6']
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.confirmBtn}
              >
                <BoldText size={15} color={COLORS.white}>
                  Confirm Booking
                </BoldText>
                <Ionicons name="checkmark-circle" size={20} color={COLORS.white} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    maxHeight: height * 0.92,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: 'hidden',
  },
  decorPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 150,
  },
  decorCircle: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: 'rgba(124, 82, 255, 0.04)',
  },
  circle1: {
    width: 100,
    height: 100,
    top: -30,
    right: 20,
  },
  circle2: {
    width: 70,
    height: 70,
    top: 50,
    left: -20,
  },
  modalHeader: {
    paddingTop: 12,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: '#D0D0D0',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerIconBox: {
    borderRadius: 14,
    overflow: 'hidden',
    marginRight: 12,
    elevation: 3,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  headerIconGradient: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  summaryCard: {
    backgroundColor: '#F8F9FD',
    borderRadius: 16,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(124, 82, 255, 0.1)',
  },
  summaryContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceTag: {
    alignItems: 'flex-end',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceTypeGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  serviceTypeCard: {
    flex: 1,
    backgroundColor: '#F8F9FD',
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  serviceTypeSelected: {
    backgroundColor: 'rgba(124, 82, 255, 0.08)',
    borderColor: COLORS.primary,
  },
  selectedCheckmark: {
    position: 'absolute',
    top: 6,
    right: 6,
  },
  dateTimeContainer: {
    gap: 12,
  },
  dateTimeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FD',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  dateTimeIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(124, 82, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  durationContainer: {
    gap: 12,
  },
  hoursInput: {
    backgroundColor: '#F8F9FD',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  quickHours: {
    flexDirection: 'row',
    gap: 10,
  },
  quickHourBtn: {
    flex: 1,
    backgroundColor: '#F8F9FD',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  quickHourBtnActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  noteInput: {
    backgroundColor: '#F8F9FD',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  summarySection: {
    marginTop: 8,
  },
  priceSummaryCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(124, 82, 255, 0.15)',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  dividerLine: {
    height: 1,
    backgroundColor: 'rgba(124, 82, 255, 0.2)',
    marginVertical: 8,
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 24,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: COLORS.white,
  },
  cancelBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  confirmBtnWrapper: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  confirmBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
});

export default BookingModal;