import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ExtraBoldText, MediumText } from "@/src/component/text/indext";
import { styles } from "./style";
import Spacer from "@/src/component/common/spacer";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import DateSelector from "@/src/component/common/dateSelector";
import BillsComponent from "./component/bills";
import TransferComponent from "./component/transferComponent";

const Transaction = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [activeMenu, setActiveMenu] = useState<string>("Bills");

  const menuData = ["Bills", "Funding"];

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.title}>
        <ExtraBoldText size="large">Transactions</ExtraBoldText>
      </View>
      <Spacer size={hp(1)} />

      {/* Date Selector */}
      <DateSelector
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />

      {/* Menu Navigation */}
      <View style={styles.menuContainer}>
        {menuData.map((menu) => (
          <TouchableOpacity
            key={menu}
            onPress={() => setActiveMenu(menu)}
            style={[
              styles.menuItem,
              activeMenu === menu && styles.activeMenuItem,
            ]}
          >
            <MediumText
              size="medium"
              style={
                activeMenu === menu ? styles.activeMenuText : styles.menuText
              }
            >
              {menu}
            </MediumText>
          </TouchableOpacity>
        ))}
      </View>

      {/* Pass selectedDate to components */}
      {activeMenu === "Bills" ? (
        <BillsComponent selectedDate={selectedDate} />
      ) : (
        <TransferComponent selectedDate={selectedDate} />
      )}
    </SafeAreaView>
  );
};

export default Transaction;
