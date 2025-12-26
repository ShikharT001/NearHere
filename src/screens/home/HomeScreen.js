
// src/screens/home/HomeScreen.js
// src/screens/home/HomeScreen.js
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Urbanist-Regular', // ✅ Urbanist font
    fontSize: 28,
  },
});
