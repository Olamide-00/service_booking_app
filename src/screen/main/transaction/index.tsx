import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ExtraBoldText, MediumText } from "@/src/component/text/indext";
import { MaterialIcons } from "@expo/vector-icons";
import Spacer from "@/src/component/common/spacer";
import { 
  heightPercentageToDP as hp,
  widthPercentageToDP as wp 
} from "react-native-responsive-screen";
import DateSelector from "@/src/component/common/dateSelector";
import BillsComponent from "./component/bills";
import TransferComponent from "./component/transferComponent";
import Header from "@/src/component/common/header";
import { COLORS } from "@/src/constant/COLORS";
import { styles } from "./style";

const Transaction = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [activeMenu, setActiveMenu] = useState<string>("Bills");

  const menuData = [
    { key: "Bills", label: "Bills & Payments", icon: "receipt-long" },
    { key: "Funding", label: "Funding", icon: "swap-horiz" }
  ];

  return (
    <>
      <Header label="Transactions" showBackButton={true} height={10} />
      <SafeAreaView style={styles.root}>
        {/* Background decorative dots */}
        <View style={styles.backgroundDots}>
          <View style={styles.dot1} />
          <View style={styles.dot2} />
          <View style={styles.dot3} />
        </View>

        {/* Date Filter Section */}
        <View style={styles.dateSection}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="date-range" size={20} color={COLORS.primary} />
            <MediumText size="medium" style={styles.sectionTitle}>
              Filter by Date
            </MediumText>
          </View>
          <DateSelector
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
          />
        </View>

        <Spacer size={hp(2)} direction="vertical" />

        {/* Menu Navigation */}
        <View style={styles.menuSection}>
          <View style={styles.menuContainer}>
            {menuData.map((menu) => (
              <TouchableOpacity
                key={menu.key}
                onPress={() => setActiveMenu(menu.key)}
                style={[
                  styles.menuItem,
                  activeMenu === menu.key && styles.activeMenuItem,
                ]}
                activeOpacity={0.8}
              >
                <MaterialIcons 
                  name={menu.icon} 
                  size={18} 
                  color={activeMenu === menu.key ? "#ffffff" : COLORS.primary}
                  style={styles.menuIcon}
                />
                <MediumText
                  size="medium"
                  style={
                    activeMenu === menu.key ? styles.activeMenuText : styles.menuText
                  }
                >
                  {menu.label}
                </MediumText>
              </TouchableOpacity>
            ))}
          </View>
          
          {/* Active indicator line */}
          <View style={styles.indicatorContainer}>
            <View style={[
              styles.activeIndicator,
              { left: activeMenu === "Bills" ? "2%" : "52%" }
            ]} />
          </View>
        </View>

        <Spacer size={hp(1)} direction="vertical" />

        {/* Content */}
        <View style={styles.contentContainer}>
          {activeMenu === "Bills" ? (
            <BillsComponent selectedDate={selectedDate} />
          ) : (
            <TransferComponent selectedDate={selectedDate} />
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

export default Transaction;
