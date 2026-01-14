
// AppNavigator.js
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GetStartedScreen from '../screens/Onboarding/GetStartedScreen';
import OnboardingScreen from '../screens/Onboarding/OnboardingScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import RadarScreen from '../screens/radar/RadarScreen';
import PostScreen from '../screens/post/PostScreen';
import ConfessionsScreen from '../screens/confessions/ConfessionsScreen';
import MatchScreen from '../screens/match/MatchScreen';
import FilterScreen from '../screens/filter/FilterScreen';
import OnboardingQuestion from '../screens/Onboarding/OnboardingQuestion';
import BottomNav from '../components/BottomNav';
import TopNav from '../components/TopNav';
import PersonalityDetailScreenn from '../screens/presonality/common';
import NearHereMain from '../screens/message/message';
import ChatDetailScreen from '../screens/message/messagedetail';
import CallScreen from '../screens/message/call';
import ProfileMessage from '../screens/message/profile';
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
      <Stack.Screen name="OnboardingQuestion" component={OnboardingQuestion} />
      <Stack.Screen name="Filter" component={FilterScreen} />
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
            <ProfileScreen />
            <BottomNav />
          </>
        )}
      </Stack.Screen>

      <Stack.Screen name="Personality">
        {() => (
          <>
            <PersonalityDetailScreenn/>
          </>
        )}
      </Stack.Screen>
      <Stack.Screen name="Message">
        {() => (
          <>
            <NearHereMain/>
          </>
        )}
      </Stack.Screen>
      <Stack.Screen name="Messagedetail">
        {() => (
          <>
            <ChatDetailScreen/>
          </>
        )}
      </Stack.Screen>
      <Stack.Screen name="Call">
        {() => (
          <>
            <CallScreen/>
          </>
        )}
      </Stack.Screen>
      <Stack.Screen name="ProfileView">
        {() => (
          <>
            <ProfileMessage/>
          </>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
