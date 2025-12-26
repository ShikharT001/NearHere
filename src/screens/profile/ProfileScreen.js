// src/screens/home/HomeScreen.js
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={{ fontFamily: 'Poppins-SemiBold' }}>Profile Screen</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
