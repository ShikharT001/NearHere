
// RootLayout.js
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppNavigator from './AppNavigator';

export default function RootLayout() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <AppNavigator />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { flex: 1 },
});
