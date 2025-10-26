import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';


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


export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;


export type ServiceDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ServiceDetails'
>;


export type ServiceDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'ServiceDetails'
>;


export type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
};

export type ServiceDetailsScreenProps = {
  navigation: ServiceDetailsScreenNavigationProp;
  route: ServiceDetailsScreenRouteProp;
};