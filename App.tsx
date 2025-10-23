import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Button from './src/component/common/button';
import CustomTextInput from './src/component/common/textInput';
import Home from './src/screen/main/home';
import ServiceDetails from './src/screen/main/serviceDetails';

export default function App() {
  return (
    <View style={styles.container}>
      <Home/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
