import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ProfileMessage() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* --- Aesthetic Header --- */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backBtn}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>username</Text>
      </View>

      <View style={styles.content}>
        {/* --- Profile Avatar with Border --- */}
        <View style={styles.avatarWrapper}>
          <View style={styles.avatarCircle}>
            <Ionicons name="person-outline" size={85} color="black" />
          </View>
        </View>

        <TouchableOpacity activeOpacity={0.6}>
          <Text style={styles.viewText}>View Profile</Text>
        </TouchableOpacity>
        
        {/* --- Action Buttons (Report, Block, Unfollow) --- */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionItem} activeOpacity={0.7}>
            <View style={styles.iconCircle}>
              <MaterialCommunityIcons name="alert-octagon" size={32} color="black" />
            </View>
            <Text style={styles.actionLabel}>Report</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem} activeOpacity={0.7}>
            <View style={styles.iconCircle}>
              <MaterialCommunityIcons name="account-off" size={32} color="black" />
            </View>
            <Text style={styles.actionLabel}>Block</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem} activeOpacity={0.7}>
            <View style={styles.iconCircle}>
              <MaterialCommunityIcons name="minus-box-outline" size={32} color="black" />
            </View>
            <Text style={styles.actionLabel}>Unfollow</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F4C2C2' // Matching design pink
  },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: { 
    fontSize: 22, 
    fontWeight: '700', 
    marginLeft: 15,
    letterSpacing: 0.5 
  },
  backBtn: {
    padding: 5
  },
  content: { 
    flex: 1, 
    alignItems: 'center', 
    paddingTop: 40 
  },
  avatarWrapper: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 25
  },
  avatarCircle: { 
    width: 150, 
    height: 150, 
    borderRadius: 75, 
    borderWidth: 2, 
    borderColor: 'black', 
    backgroundColor: 'white',
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  viewText: { 
    fontSize: 24, 
    fontWeight: '500', 
    marginBottom: 70,
    color: '#2D3436'
  },
  actionRow: { 
    flexDirection: 'row', 
    width: '100%', 
    justifyContent: 'space-evenly',
    paddingHorizontal: 10
  },
  actionItem: { 
    alignItems: 'center',
    width: 80 
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Subtle transparency for depth
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  actionLabel: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: 'black' 
  }
});