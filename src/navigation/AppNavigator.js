
// AppNavigator.js
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';

import GetStartedScreen from '../screens/Onboarding/GetStartedScreen';
import OnboardingScreen from '../screens/Onboarding/OnboardingScreen';
import HomeScreen from '../screens/home/HomeScreen';
import SearchScreen from '../screens/search/SearchScreen';
import CartScreen from '../screens/cart/CartScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import BottomNav from '../components/BottomNav';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="GetStarted"
      screenOptions={{ headerShown: false }}
    >
      {/* NO BOTTOM NAV */}
      <Stack.Screen name="GetStarted" component={GetStartedScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      {/* WITH BOTTOM NAV */}
      <Stack.Screen name="Home">
        {() => (
          <>
            <HomeScreen />
            <BottomNav />
          </>
        )}
      </Stack.Screen>

      <Stack.Screen name="Search">
        {() => (
          <>
            <SearchScreen />
            <BottomNav />
          </>
        )}
      </Stack.Screen>

      <Stack.Screen name="Cart">
        {() => (
          <>
            <CartScreen />
            <BottomNav />
          </>
        )}
      </Stack.Screen>

      <Stack.Screen name="Profile">
        {() => (
          <>
            <ProfileScreen />
            <BottomNav />
          </>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
