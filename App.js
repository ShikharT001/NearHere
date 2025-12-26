import { NavigationContainer } from '@react-navigation/native';
import RootLayout from './src/navigation/RootLayout';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import {Text} from 'react-native';
export default function App() {
    const [fontsLoaded] = useFonts({
    'Urbanist-Regular': require('./assets/fonts/Urbanist-Regular.ttf'),
    'Urbanist-Medium': require('./assets/fonts/Urbanist-Medium.ttf'),
    'Urbanist-SemiBold': require('./assets/fonts/Urbanist-SemiBold.ttf'),
    'Urbanist-Bold': require('./assets/fonts/Urbanist-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null; // or splash loader
  }

  // 🔥 GLOBAL DEFAULT FONT
  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.style = {
    fontFamily: 'Urbanist-Regular',
  };
  return (
     <SafeAreaProvider>
      <NavigationContainer>
        <RootLayout />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
