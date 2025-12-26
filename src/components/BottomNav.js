import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function BottomNav() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: Math.max(insets.bottom, 16) },
      ]}
    >
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Ionicons name="home-outline" size={24} color="#333" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Search')}>
        <Ionicons name="search-outline" size={24} color="#333" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
        <Ionicons name="cart-outline" size={24} color="#333" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Ionicons name="person-outline" size={24} color="#333" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
              // 🔑 ensures space
    borderTopWidth: 1,
    borderColor: '#e5e5e5',
    backgroundColor: '#fff',

    
  },
  
});


