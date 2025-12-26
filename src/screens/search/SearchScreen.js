import { View, Text, StyleSheet } from 'react-native';

export default function SearchScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={{ fontFamily: 'Poppins-SemiBold' }}>Search Screen</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
