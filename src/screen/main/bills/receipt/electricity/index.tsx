import { Dimensions, StyleSheet, View } from "react-native";
import React, { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ViewShot from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import Header from "@/src/component/common/header";
import Card from "@/src/component/common/card";
import { BoldText, MediumText, RegularText } from "@/src/component/text/indext";
import { useNavigation, useRoute } from "@react-navigation/native";
import Divider from "@/src/component/common/divider";
import Item from "../../component/item";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import CustomBtn from "@/src/component/common/customBtn";
import LottieView from "lottie-react-native";
import { COLORS } from "@/src/constant/COLORS";

const ElectReceipt = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { data }: any = route.params;
  const viewShotRef = useRef(null);

  // Format amount in Nigerian Naira (₦)
  const formattedAmount = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(data?.amount || 0);

  // Format date
  const formattedDate = data?.transaction_date
    ? new Date(data.transaction_date).toLocaleDateString()
    : "N/A";

  // Safely extract token
  const [name, token] = data?.token?.split(":") ?? ["", ""];

  // Capture and share as image
  const handleShareImage = async () => {
    try {
      const uri = await viewShotRef.current.capture();
      await Sharing.shareAsync(uri, { mimeType: "image/png" });
    } catch (error) {
      console.log("Error sharing image:", error);
    }
  };

  const { width, height } = Dimensions.get("window");

  return (
    <SafeAreaView style={styles.root}>
      <Header showLogo />

      {/* Capture this entire section as an image */}
      <ViewShot ref={viewShotRef} options={{ format: "png", quality: 1 }}>
        <Card style={styles.card}>
          <View style={styles.container}>
            <BoldText size="large" color="primary">
              {formattedAmount}
            </BoldText>
            <MediumText size="medium">
              {data?.response_description === "TRANSACTION SUCCESSFUL"
                ? "SUCCESS"
                : "FAILED"}
            </MediumText>
            <RegularText size="small">{formattedDate}</RegularText>
          </View>
          <Divider />
          <Item label="Unit" value={data?.units || "N/A"} />
          <Item label="Token" value={token || "N/A"} showIcon />
          {/* {data?.content?.transactions?.type === "Electricity Bill" && (
            <Item label="Type" value={data?.content?.transactions?.type} />
          )} */}
          {data?.content?.transactions?.product_name && (
            <Item
              label="Provider"
              value={data?.content?.transactions?.product_name}
            />
          )}
          <Item
            label="Meter Number"
            value={data?.content?.transactions?.unique_element || "N/A"}
          />
          <Item
            label="Transaction ID"
            value={data?.content?.transactions?.transactionId || "N/A"}
          />
          <View style={{ alignSelf: "center" }}>
            <RegularText size="medium" color="primary">
              Remit
            </RegularText>
          </View>
        </Card>
      </ViewShot>

      <LottieView
        autoPlay
        loop
        source={require("@/assets/json/4.json")}
        style={[
          styles.lottie,
          {
            width: width * 0.8,
            height: height * 0.4,
            transform: [
              { translateX: -(width * 0.4) },
              { translateY: -(height * 0.2) },
            ],
          },
        ]}
      />

      {/* Share & Close Buttons */}
      <View style={styles.btn}>
        <CustomBtn width={wp(43)} label="Share" onPress={handleShareImage} />
        <CustomBtn
          width={wp(43)}
          label="Close"
          onPress={() => navigation.navigate("BottomTabs")}
        />
      </View>
    </SafeAreaView>
  );
};

export default ElectReceipt;
const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: wp(5),
    backgroundColor: COLORS.white,
  },
  card: {
    paddingHorizontal: wp(5),
    paddingVertical: hp(3),
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    gap: hp(0.5),
  },
  btn: {
    flexDirection: "row",
    gap: wp(3),
    justifyContent: "center",
    marginTop: hp(2),
  },
  lottie: {
    position: "absolute",
    top: "40%", // Adjusted for better responsiveness
    left: "50%",
    width: wp(80), // Use percentage for responsiveness
    height: hp(40),
    transform: [{ translateX: -wp(40) }, { translateY: -hp(20) }],
  },
});
