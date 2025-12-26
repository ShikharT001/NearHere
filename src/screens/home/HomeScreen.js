// src/screens/home/HomeScreen.js
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (

  <View style={{ flex: 1 }}>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
    </View>

   
  </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});
