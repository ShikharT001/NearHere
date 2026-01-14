import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  StatusBar 
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function CallScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { userName } = route.params || { userName: 'username' };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header with Back Arrow and Username */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerUsername}>{userName}</Text>
      </View>

      {/* Central Avatar Area */}
      <View style={styles.avatarContainer}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarPlaceholderText}>Avatar or user's{"\n"}current image</Text>
        </View>
      </View>

      {/* Call Action Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.callButton, styles.acceptButton]}>
          <MaterialCommunityIcons name="phone-plus" size={32} color="white" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.callButton, styles.declineButton]}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons name="phone-cancel" size={32} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4C2C2' },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 20 
  },
  headerUsername: { 
    fontSize: 22, 
    fontWeight: '500', 
    marginLeft: 15 
  },
  avatarContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  avatarCircle: { 
    width: 250, 
    height: 250, 
    borderRadius: 125, 
    backgroundColor: 'white', 
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 20
  },
  avatarPlaceholderText: { 
    textAlign: 'center', 
    fontSize: 16, 
    color: 'black' 
  },
  buttonRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    paddingBottom: 60 
  },
  callButton: { 
    width: 70, 
    height: 70, 
    borderRadius: 35, 
    justifyContent: 'center', 
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  acceptButton: { backgroundColor: '#2D8C3C' },
  declineButton: { backgroundColor: '#A61D1D' }
});