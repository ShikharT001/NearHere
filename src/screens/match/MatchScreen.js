import { View, Text, StyleSheet } from 'react-native';

export default function MatchScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={{ fontFamily: 'Poppins-SemiBold' }}>Match Screen</Text>
      </View>

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
