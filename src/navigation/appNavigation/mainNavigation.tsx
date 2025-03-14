import { createStackNavigator } from "@react-navigation/stack";
import BottomTabs from "./bottomTabs";
import StackNavigation from "./stackNavigation";

const Stack = createStackNavigator();

export default function MainNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Bottom Tabs as the main screen */}
      <Stack.Screen name="BottomTabs" component={BottomTabs} />

      {/* Stack Screens */}
      <Stack.Screen name="StackNavigation" component={StackNavigation} />
    </Stack.Navigator>
  );
}
