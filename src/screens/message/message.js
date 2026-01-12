import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  StatusBar 
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function NearHereMain() {
  const [activeTab, setActiveTab] = useState('Messages');
  const [viewToggle, setViewToggle] = useState('ViewedYou'); // Switch for Views Tab
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Refined Header - Removed Menu Icon */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.logoText}>Near-here</Text>
        <View style={{ width: 40 }} /> 
      </View>

      {/* Main Tab Switcher */}
      <View style={styles.tabBar}>
        {['Messages', 'Requests', 'Views'].map((tab) => (
          <TouchableOpacity 
            key={tab} 
            onPress={() => setActiveTab(tab)}
            style={[styles.tabButton, activeTab === tab && styles.activeTabButton]}
          >
            <Text style={[styles.tabButtonText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content Container */}
      <View style={styles.whiteCard}>
        {activeTab === 'Messages' && <MessagesContent />}
        {activeTab === 'Requests' && <RequestsContent />}
        {activeTab === 'Views' && (
          <ViewsContent viewToggle={viewToggle} setViewToggle={setViewToggle} />
        )}
      </View>
    </SafeAreaView>
  );
}

const MessagesContent = () => (
  <ScrollView showsVerticalScrollIndicator={false}>
    {/* Professional Search Bar Color */}
    <View style={styles.searchBar}>
      <Ionicons name="search" size={20} color="#636E72" />
      <TextInput 
        placeholder="Search conversations..." 
        placeholderTextColor="#636E72"
        style={styles.searchInput} 
      />
    </View>

    {[1, 2, 3, 4, 5, 6].map((_, i) => (
      <TouchableOpacity key={i} style={styles.messageRow}>
        <View style={styles.avatarBorder}>
          <Ionicons name="person" size={26} color="#2D3436" />
        </View>
        <View style={styles.messageTextContainer}>
          <View style={styles.rowBetween}>
            <Text style={styles.username}>username</Text>
            <Text style={styles.timeText}>2 hr</Text>
          </View>
          <Text style={styles.messagePreview} numberOfLines={1}>7+ messages received from this user.</Text>
        </View>
        <Feather name="camera" size={20} color="#B2BEC3" style={{ marginLeft: 10 }} />
      </TouchableOpacity>
    ))}
  </ScrollView>
);

const RequestsContent = () => (
  <ScrollView showsVerticalScrollIndicator={false}>
    {['angel_Priya', 'yasu__001', 'royal_king_'].map((name, i) => (
      <View key={i} style={styles.requestItem}>
        <View style={styles.avatarBorder}><Ionicons name="person" size={24} color="black" /></View>
        <Text style={styles.requestName}>{name}</Text>
        <TouchableOpacity style={styles.confirmBtn}><Text style={styles.confirmText}>Confirm</Text></TouchableOpacity>
        <TouchableOpacity><Ionicons name="close-circle" size={28} color="#FF7675" /></TouchableOpacity>
      </View>
    ))}
  </ScrollView>
);

const ViewsContent = ({ viewToggle, setViewToggle }) => (
  <View style={{ flex: 1 }}>
    {/* Switchable Views Option */}
    <View style={styles.switchContainer}>
      <TouchableOpacity onPress={() => setViewToggle('ViewedYou')}>
        <Text style={[styles.switchText, viewToggle === 'ViewedYou' && styles.switchActive]}>Viewed you</Text>
      </TouchableOpacity>
      <View style={styles.verticalDivider} />
      <TouchableOpacity onPress={() => setViewToggle('YouViewed')}>
        <Text style={[styles.switchText, viewToggle === 'YouViewed' && styles.switchActive]}>You viewed</Text>
      </TouchableOpacity>
    </View>

    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.grid}>
        {[1, 2, 3, 4].map((_, i) => (
          <View key={i} style={styles.gridCard}>
            <Text style={styles.gridOverlayText}>
              {viewToggle === 'ViewedYou' ? "Interested in you" : "You explored this"}
            </Text>
            <Text style={styles.gridName}>@username</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4C2C2' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, alignItems: 'center' },
  backButton: { padding: 4 },
  logoText: { fontSize: 26, fontWeight: 'bold', fontFamily: 'serif' },
  
  tabBar: { flexDirection: 'row', paddingHorizontal: 16, marginBottom: 15 },
  tabButton: { paddingVertical: 10, paddingHorizontal: 18, borderRadius: 25 },
  activeTabButton: { backgroundColor: 'white', elevation: 2 },
  tabButtonText: { fontSize: 16, fontWeight: '600', color: '#636E72' },
  activeTabText: { color: 'black' },

  whiteCard: { flex: 1, backgroundColor: 'white', marginHorizontal: 12, borderTopLeftRadius: 35, borderTopRightRadius: 35, padding: 20 },

  // Professional Search Bar (Steel & Off-White)
  searchBar: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#DFE6E9', 
    paddingHorizontal: 15, 
    paddingVertical: 12, 
    borderRadius: 18, 
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#B2BEC3'
  },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16, color: '#2D3436' },

  // Message Rows with Professional Borders
  messageRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 15, 
    borderBottomWidth: 1, 
    borderBottomColor: '#F1F2F6' 
  },
  avatarBorder: { width: 50, height: 50, borderRadius: 25, borderWidth: 1.5, borderColor: '#B2BEC3', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F9F9F9' },
  messageTextContainer: { flex: 1, marginLeft: 15 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  username: { fontSize: 16, fontWeight: 'bold', color: '#2D3436' },
  timeText: { fontSize: 12, color: '#636E72' },
  messagePreview: { color: '#636E72', marginTop: 2 },

  // Requests
  requestItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  requestName: { flex: 1, marginLeft: 12, fontWeight: 'bold', fontSize: 15 },
  confirmBtn: { backgroundColor: '#0984E3', paddingVertical: 6, paddingHorizontal: 15, borderRadius: 10, marginRight: 10 },
  confirmText: { color: 'white', fontWeight: 'bold' },

  // Views Switcher Logic
  switchContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 25 },
  switchText: { fontSize: 18, color: '#B2BEC3', fontWeight: '500' },
  switchActive: { color: '#2D3436', fontWeight: 'bold' },
  verticalDivider: { width: 1, height: 20, backgroundColor: '#B2BEC3', marginHorizontal: 20 },

  // Grid
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  gridCard: { width: '48%', height: 200, backgroundColor: '#2D3436', borderRadius: 20, padding: 15, marginBottom: 15, justifyContent: 'flex-end' },
  gridOverlayText: { color: '#B2BEC3', fontSize: 11, textAlign: 'center', position: 'absolute', top: '40%', alignSelf: 'center' },
  gridName: { color: 'white', fontSize: 13, fontWeight: 'bold' }
});