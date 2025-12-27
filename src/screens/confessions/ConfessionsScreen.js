import { View, Text, StyleSheet } from 'react-native';

export default function ConfessionsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={{ fontFamily: 'Poppins-SemiBold' }}>Confessions Screen</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B1919', // 🔥 SCREEN COLOR
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Urbanist-Regular',
    fontSize: 22,
  },
});
