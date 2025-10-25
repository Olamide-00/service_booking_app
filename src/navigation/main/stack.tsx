import { createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from '@/src/screen/main/home';
import ServiceDetails from '@/src/screen/main/serviceDetails';



const Stack = createStackNavigator()

export default function StackNavigation() {
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false}} initialRouteName='Home'>
                <Stack.Screen name='Home' component={Home}/>
                <Stack.Screen name='ServiceDetails' component={ServiceDetails}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}