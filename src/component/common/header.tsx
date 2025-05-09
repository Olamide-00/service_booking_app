import {
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { ArrowLeft2 } from "iconsax-react-native";
import { COLORS } from "@/src/constant/COLORS";
import { BoldText } from "../text/indext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

type Props = {
  label?: string;
  showIcon?: boolean;
  showLogo?: boolean;
  height?: number;
};

const Header = ({
  label,
  showIcon = true,
  showLogo = false,
  height = 15,
}: Props) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.header, { height: hp(height) }]}>
      <View style={styles.row}>
        <View style={styles.leftContainer}>
          {showLogo && (
            <TouchableOpacity
              style={styles.leftContainer}
              onPress={() => navigation.goBack()}
            >
              <ArrowLeft2 size="30" color={COLORS.white} />

              <Image
                source={require("../../../assets/images/RemitLogo.png")}
                resizeMode="contain"
                style={styles.logo}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.centerContainer}>
          {label && (
            <BoldText size="medium" color="white">
              {label}
            </BoldText>
          )}
        </View>

        <View style={styles.rightSpacer} />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.primary,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingHorizontal: wp(4),
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp("2%"),
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
  },
  rightSpacer: {
    flex: 1,
  },
  logo: {
    width: wp("9%"),
    height: 60,
  },
});
