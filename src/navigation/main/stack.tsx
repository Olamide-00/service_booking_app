import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from '@/src/screen/main/home';
import ServiceDetails from '@/src/screen/main/serviceDetails';


export type RootStackParamList = {
  Home: undefined;
  ServiceDetails: {
    service: {
      id: number;
      name: string;
      rating: number;
      pricePerHour: number;
      experienceYears: number;
      description: string;
      image: string;
      location: {
        lat: number;
        lng: number;
        city: string;
      };
      gallery: string[];
    };
  };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function StackNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ headerShown: false }} 
        initialRouteName="Home"
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ServiceDetails" component={ServiceDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}