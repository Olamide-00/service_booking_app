import { StyleSheet, View, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/src/component/common/header";
import Spacer from "@/src/component/common/spacer";
import { BoldText, RegularText } from "@/src/component/text/indext";
import { COLORS } from "@/src/constant/COLORS";
import CustomBtn from "@/src/component/common/customBtn";

const TermsAndPolicies = () => {
  return (
    <>
      <Header showLogo label="TERMS & POLICIES" />
      <View style={styles.root}>
        <Spacer size={20} direction="vertical" />
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <BoldText size="large">Welcome to Remit Technologies Ltd.</BoldText>
          <RegularText size="small">
            Remit Technologies Ltd. was founded by Olamide Oladele and
            co-founded by Igbalaye Gabriel. Our company is committed to
            providing seamless digital payment solutions while ensuring user
            privacy and security. We are dedicated to maintaining a transparent
            and user-friendly platform for all our customers.
          </RegularText>
          <Spacer size={15} direction="vertical" />

          <BoldText size="medium">Data Privacy</BoldText>
          <RegularText size="small">
            We do not collect, store, or share personal user data. Our platform
            is designed to respect user privacy, ensuring that your information
            remains secure at all times. Any data processing is strictly limited
            to what is necessary to provide a smooth and secure experience.
          </RegularText>
          <Spacer size={15} direction="vertical" />

          <BoldText size="medium">User Agreement</BoldText>
          <RegularText size="small">
            By using our services, you agree to comply with all applicable laws
            and regulations. We reserve the right to update these terms at any
            time to improve our services. It is your responsibility to stay
            informed about any changes. Continued use of our services after
            modifications implies acceptance of the updated terms.
          </RegularText>
          <Spacer size={15} direction="vertical" />

          <BoldText size="medium">Third-Party Services</BoldText>
          <RegularText size="small">
            Our platform may integrate with third-party services, but we do not
            take responsibility for their policies. Please review their terms
            separately. We encourage users to exercise caution and read the
            privacy policies of any external services they choose to engage
            with.
          </RegularText>
          <Spacer size={15} direction="vertical" />

          <BoldText size="medium">Security Measures</BoldText>
          <RegularText size="small">
            We take security seriously and implement industry-standard protocols
            to protect your data and transactions. Our team continuously
            monitors and updates security features to mitigate any potential
            risks.
          </RegularText>
          <Spacer size={15} direction="vertical" />

          <BoldText size="medium">Limitation of Liability</BoldText>
          <RegularText size="small">
            While we strive to provide a reliable and uninterrupted service, we
            cannot guarantee that our platform will be free from errors or
            downtime. Remit Technologies Ltd. shall not be liable for any losses
            resulting from service interruptions, cyber threats, or external
            circumstances beyond our control.
          </RegularText>
          <Spacer size={15} direction="vertical" />

          <BoldText size="medium">Contact Us</BoldText>
          <RegularText size="small">
            If you have any questions regarding these terms, please contact our
            support team at Customer.Remit@gmail.com We are here to assist you
            and ensure a smooth experience while using our services.
          </RegularText>
        </ScrollView>

        <View style={styles.footer}></View>
      </View>
    </>
  );
};

export default TermsAndPolicies;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
  },
  content: {
    paddingBottom: 30,
  },
  footer: {
    paddingVertical: 15,
  },
});
