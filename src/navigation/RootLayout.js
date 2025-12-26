import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppNavigator from './AppNavigator';
import BottomNav from '../components/BottomNav';

export default function RootLayout() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        
        {/* Screens */}
        <View style={styles.content}>
          <AppNavigator />
        </View>

        {/* Constant Bottom Navigation */}
        <BottomNav />

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { flex: 1 },
  content: { flex: 1 },
});
