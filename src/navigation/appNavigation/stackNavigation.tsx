import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function StackNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="KYC1"
        getComponent={() => require("@/src/screen/main/kyc/kyc1").default}
      />
      <Stack.Screen
        name="CreatePin"
        getComponent={() => require("@/src/screen/main/kyc/createPin").default}
      />
      <Stack.Screen
        name="ConfirmPin"
        getComponent={() => require("@/src/screen/main/kyc/confirmPin").default}
      />
      <Stack.Screen
        name="Success"
        getComponent={() => require("@/src/screen/main/success").default}
      />
      <Stack.Screen
        name="SendRemit"
        getComponent={() => require("@/src/screen/main/sendRemit").default}
      />
      <Stack.Screen
        name="SendBank"
        getComponent={() => require("@/src/screen/main/sendBank").default}
      />
      <Stack.Screen
        name="SendReview"
        getComponent={() => require("@/src/screen/main/sendReview").default}
      />
      <Stack.Screen
        name="PIN"
        getComponent={() => require("@/src/screen/main/PIN").default}
      />
      <Stack.Screen
        name="TransferPIN"
        getComponent={() => require("@/src/screen/main/transferPIN").default}
      />
      <Stack.Screen
        name="DataScreen"
        getComponent={() => require("@/src/screen/main/bills/data").default}
      />
      <Stack.Screen
        name="AirtimeScreen"
        getComponent={() => require("@/src/screen/main/bills/airtime").default}
      />
      <Stack.Screen
        name="ElectricityScreen"
        getComponent={() =>
          require("@/src/screen/main/bills/electricity").default
        }
      />
      <Stack.Screen
        name="TVScreen"
        getComponent={() => require("@/src/screen/main/bills/tv").default}
      />
      <Stack.Screen
        name="ReviewScreen1"
        getComponent={() => require("@/src/screen/main/bills/review1").default}
      />
      <Stack.Screen
        name="ComingSoon"
        getComponent={() => require("@/src/screen/main/comingSoon").default}
      />
      <Stack.Screen
        name="FundWallet"
        getComponent={() => require("@/src/screen/main/fundAccount").default}
      />
      <Stack.Screen
        name="TransactionDetails"
        getComponent={() =>
          require("@/src/screen/main/transaction/transactionDetails").default
        }
      />
      <Stack.Screen
        name="ElectReceipt"
        getComponent={() =>
          require("@/src/screen/main/bills/receipt/electricity").default
        }
      />
      <Stack.Screen
        name="TermsAndPolicies"
        getComponent={() => require("@/src/screen/main/polices").default}
      />
      <Stack.Screen
        name="Notification"
        getComponent={() => require("@/src/screen/main/notification").default}
      />
      <Stack.Screen
        name="Education"
        getComponent={() =>
          require("@/src/screen/main/bills/education").default
        }
      />
      <Stack.Screen
        name="Waec"
        getComponent={() =>
          require("@/src/screen/main/bills/education/waec").default
        }
      />
      <Stack.Screen
        name="Jamb"
        getComponent={() =>
          require("@/src/screen/main/bills/education/jamb").default
        }
      />
      <Stack.Screen
        name="Support"
        getComponent={() => require("@/src/screen/main/support/indext").default}
      />
    </Stack.Navigator>
  );
}
