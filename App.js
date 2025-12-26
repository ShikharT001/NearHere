import { NavigationContainer } from '@react-navigation/native';
import RootLayout from './src/navigation/RootLayout';
import { SafeAreaProvider } from 'react-native-safe-area-context';
export default function App() {
  return (
     <SafeAreaProvider>
      <NavigationContainer>
        <RootLayout />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
