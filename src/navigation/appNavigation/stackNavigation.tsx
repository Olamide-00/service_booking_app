import AirtimeScreen from "@/src/screen/main/bills/airtime";
import DataScreen from "@/src/screen/main/bills/data";
import ElectricityScreen from "@/src/screen/main/bills/electricity";
import ElectReceipt from "@/src/screen/main/bills/receipt/electricity";
import ReviewScreen1 from "@/src/screen/main/bills/review1";
import TVScreen from "@/src/screen/main/bills/tv";
import ComingSoon from "@/src/screen/main/comingSoon";
import FundWallet from "@/src/screen/main/fundAccount";
import ConfirmPin from "@/src/screen/main/kyc/confirmPin";
import CreatePin from "@/src/screen/main/kyc/createPin";
import KYC1 from "@/src/screen/main/kyc/kyc1";
import PIN from "@/src/screen/main/PIN";
import TermsAndPolicies from "@/src/screen/main/polices";
import SendBank from "@/src/screen/main/sendBank";
import SendRemit from "@/src/screen/main/sendRemit";
import SendReview from "@/src/screen/main/sendReview";
import Success from "@/src/screen/main/success";
import TransactionDetails from "@/src/screen/main/transaction/transactionDetails";
import TransferPIN from "@/src/screen/main/transferPIN";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function StackNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="KYC1" component={KYC1} />
      <Stack.Screen name="CreatePin" component={CreatePin} />
      <Stack.Screen name="ConfirmPin" component={ConfirmPin} />
      <Stack.Screen name="Success" component={Success} />
      <Stack.Screen name="SendRemit" component={SendRemit} />
      <Stack.Screen name="SendBank" component={SendBank} />
      <Stack.Screen name="SendReview" component={SendReview} />
      <Stack.Screen name="PIN" component={PIN} />
      <Stack.Screen name="TransferPIN" component={TransferPIN} />
      <Stack.Screen name="DataScreen" component={DataScreen} />
      <Stack.Screen name="AirtimeScreen" component={AirtimeScreen} />
      <Stack.Screen name="ElectricityScreen" component={ElectricityScreen} />
      <Stack.Screen name="TVScreen" component={TVScreen} />
      <Stack.Screen name="ReviewScreen1" component={ReviewScreen1} />
      <Stack.Screen name="ComingSoon" component={ComingSoon} />
      <Stack.Screen name="FundWallet" component={FundWallet} />
      <Stack.Screen name="TransactionDetails" component={TransactionDetails} />
      <Stack.Screen name="ElectReceipt" component={ElectReceipt} />
      <Stack.Screen name="TermsAndPolicies" component={TermsAndPolicies} />
    </Stack.Navigator>
  );
}
