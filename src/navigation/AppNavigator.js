
// AppNavigator.js
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GetStartedScreen from '../screens/Onboarding/GetStartedScreen';
import OnboardingScreen from '../screens/Onboarding/OnboardingScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import RadarScreen from '../screens/radar/RadarScreen';
import PostScreen from '../screens/post/PostScreen';
import ConfessionsScreen from '../screens/confessions/ConfessionsScreen';
import MatchScreen from '../screens/match/MatchScreen';

import BottomNav from '../components/BottomNav';
import TopNav from '../components/TopNav';
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
      <Stack.Screen name="Radar">
        {() => (
          <>
            <TopNav/>
            <RadarScreen />
            <BottomNav />
          </>
        )}
      </Stack.Screen>

      <Stack.Screen name="Post">
        {() => (
          <>
              <TopNav/>
            <PostScreen />
            <BottomNav />
          </>
        )}
      </Stack.Screen>

      <Stack.Screen name="Confessions">
        {() => (
          <>
            <TopNav/>
            <ConfessionsScreen />
            <BottomNav />
          </>
        )}
      </Stack.Screen>
      <Stack.Screen name="Match">
        {() => (
          <>
            <TopNav/>
            <MatchScreen />
            <BottomNav />
          </>
        )}
      </Stack.Screen>

      <Stack.Screen name="Profile">
        {() => (
          <>
            <TopNav/>
            <ProfileScreen />
            <BottomNav />
          </>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
