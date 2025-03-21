import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/src/component/common/header";
import { COLORS } from "@/src/constant/COLORS";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Item from "./component/item";
import CustomBtn from "@/src/component/common/customBtn";
import Spacer from "@/src/component/common/spacer";
import { useNavigation, useRoute } from "@react-navigation/native";

// Define a type for the navigation parameters,
type ReviewScreenParams = {
  serviceID: string;
  variation_code: string;
  amount: string;
  phoneNumber: string;
  billersCode: string;
  type: string;
};

const ReviewScreen1: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { serviceID, variation_code, amount, phoneNumber, billersCode, type } =
    route.params as ReviewScreenParams;
  const electricity =
    variation_code === "prepaid" || variation_code === "postpaid";

  const dstv = serviceID === "dstv";

  return (
    <SafeAreaView style={styles.root}>
      {/* header */}
      <Header label="Review" showLogo />
      <Spacer size={hp(3)} direction="vertical" />
      <View style={styles.item}>
        <Item label="Provider" value={serviceID} />
        {variation_code && <Item label="Package" value={variation_code} />}
        {electricity && <Item label="Meter Number" value={billersCode} />}
        {dstv && <Item label="SmartCard Number" value={billersCode} />}
        <Item label="Phone Number" value={phoneNumber} />
        <Item label="Amount" value={`₦${amount}`} />
        <Item label="Transaction Fee" value="Free" />
        <Item label="Total" value={`₦${amount}`} />
      </View>
      <View style={styles.btn}>
        <CustomBtn
          label="Continue"
          onPress={() =>
            navigation.navigate("PIN", {
              serviceID,
              variation_code,
              amount,
              phoneNumber,
              billersCode,
              type,
            })
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default ReviewScreen1;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: wp(4),
  },
  btn: {
    position: "absolute",
    alignSelf: "center",
    bottom: hp(4),
  },
  item: {
    gap: hp(1),
  },
});
