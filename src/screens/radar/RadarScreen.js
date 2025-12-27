
// src/screens/home/HomeScreen.js
// src/screens/home/HomeScreen.js
import { View, Text, StyleSheet } from 'react-native';

export default function RadarScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Radar Screen</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4C96F0', // 🔥 SCREEN COLOR
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Urbanist-Regular',
    fontSize: 22,
  },
});
