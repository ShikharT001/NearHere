import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  StatusBar,
  Dimensions 
} from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const navigation = useNavigation();
  
  // State for switching tabs
  const [activeTab, setActiveTab] = useState('PROFILE');

  // Logic to render content inside the bottom box
  const renderTabContent = () => {
    switch (activeTab) {
      case 'POSTS':
        return (
          <View style={styles.tabCenterContent}>
            <MaterialCommunityIcons name="view-grid-outline" size={40} color="#ccc" />
            <Text style={styles.emptyText}>No posts yet.</Text>
          </View>
        );
      case 'COMMENTS':
        return (
          <View style={styles.tabCenterContent}>
            <MaterialCommunityIcons name="message-outline" size={40} color="#ccc" />
            <Text style={styles.emptyText}>No comments yet.</Text>
          </View>
        );
      default:
        return (
          <View style={styles.profileBio}>
            <Text style={styles.bioTitle}>Bio</Text>
            <Text style={styles.text}>
              Professional designation and details about the user's journey. 
              Keep moving forward! ✨
            </Text>
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* IMPORTANT: contentContainerStyle ensures the padding 
          is applied to the inner content so it's not cut off.
      */}
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        
        {/* Main Profile Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
              <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerBtn}>
              <MaterialCommunityIcons name="pencil" size={22} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.imageSection}>
            <Text style={styles.placeholderLarge}>User's profile picture</Text>
            
            <View style={styles.avatarWrapper}>
              <View style={styles.avatarCircle}>
                <Ionicons name="person" size={50} color="white" />
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>100%</Text>
              </View>
            </View>
          </View>

          <View style={styles.userDetails}>
            <View style={styles.nameRow}>
              <Text style={styles.handleText}>@name</Text>
              <MaterialCommunityIcons name="check-decagram" size={20} color="#3498db" style={{ marginLeft: 5 }} />
            </View>
            <Text style={styles.text}>designation</Text>
            <Text style={styles.text}>education from</Text>
            <Text style={styles.text}>location</Text>

            <View style={styles.tagRow}>
              <View style={styles.pill}><Text style={styles.pillText}>age gender</Text></View>
              <View style={styles.pill}><Text style={styles.pillText}>zodiac sign</Text></View>
              
              <TouchableOpacity 
                onPress={() => navigation.navigate('Personality')} 
                activeOpacity={0.7}
                style={[styles.pill, { backgroundColor: '#0077b6' }]}
              >
                <Text style={[styles.pillText, { color: 'white' }]}>personality type</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Visitors Bar */}
        <View style={styles.visitorBar}>
          <MaterialCommunityIcons name="account-plus" size={20} color="black" />
          <Text style={[styles.text, { marginLeft: 10 }]}>00 people visited your profile</Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>10</Text>
            <Text style={styles.text}>followers</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>20</Text>
            <Text style={styles.text}>hearts</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.levelSmall}>level sabke niklenge</Text>
            <Text style={styles.statNumber}>level</Text>
          </View>
        </View>

        {/* Navigation Tabs */}
        <View style={styles.tabs}>
          {['PROFILE', 'POSTS', 'COMMENTS'].map((tab) => (
            <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
              <Text style={[
                styles.text, 
                activeTab === tab ? styles.activeTab : styles.inactiveTab
              ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Dynamic Content Footer */}
        <View style={styles.footerBox}>
           {renderTabContent()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4C2C2',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40, // Extra space at bottom for better scrolling
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 20,
    borderWidth: 2,
    borderColor: '#3498db',
    minHeight: 480,
  },
  headerBtn: {
    padding: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageSection: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderLarge: {
    fontFamily: 'Urbanist-Regular',
    fontSize: 28,
    textAlign: 'center',
    color: '#ccc',
  },
  avatarWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  avatarCircle: {
    width: 85,
    height: 85,
    borderRadius: 42.5,
    backgroundColor: 'black',
    borderWidth: 4,
    borderColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    bottom: -5,
    alignSelf: 'center',
    backgroundColor: '#3498db',
    borderRadius: 10,
    paddingHorizontal: 8,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  userDetails: {
    marginTop: 40,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  handleText: {
    fontFamily: 'Urbanist-Regular',
    fontSize: 22,
    fontWeight: 'bold',
  },
  text: {
    fontFamily: 'Urbanist-Regular',
    fontSize: 18,
    color: 'black',
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 15,
  },
  pill: {
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginRight: 6,
    marginBottom: 6,
  },
  pillText: {
    fontFamily: 'Urbanist-Regular',
    fontSize: 12,
  },
  visitorBar: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 15,
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  statBox: {
    backgroundColor: 'white',
    width: '31%',
    padding: 12,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  statNumber: {
    fontFamily: 'Urbanist-Regular',
    fontSize: 20,
    fontWeight: 'bold',
  },
  levelSmall: {
    fontSize: 8,
    fontFamily: 'Urbanist-Regular',
    textAlign: 'center',
    color: '#666',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 25,
    marginBottom: 10,
  },
  activeTab: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  inactiveTab: {
    color: '#555',
  },
  footerBox: {
    backgroundColor: 'white',
    minHeight: 120,
    borderRadius: 20,
    marginTop: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  tabCenterContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  emptyText: {
    fontFamily: 'Urbanist-Regular',
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
  profileBio: {
    padding: 5,
  },
  bioTitle: {
    fontFamily: 'Urbanist-Regular',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});