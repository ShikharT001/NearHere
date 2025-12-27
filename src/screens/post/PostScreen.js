// src/screens/profile/ProfileScreen.js
import { View, Text, StyleSheet } from 'react-native';

export default function PostScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Post Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4C2C2', // 🔥 SCREEN COLOR
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Urbanist-Regular',
    fontSize: 22,
  },
});
