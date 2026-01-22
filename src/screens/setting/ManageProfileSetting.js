import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Switch,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native'; // Added for navigation

const ManageProfileSetting = () => {
  const navigation = useNavigation(); // Initialize navigation

  // Toggle States
  const [autoFollow, setAutoFollow] = useState(true);
  const [autoApprove, setAutoApprove] = useState(true);
  const [hidePosts, setHidePosts] = useState(false);
  const [hideComments, setHideComments] = useState(false);
  const [hideZodiac, setHideZodiac] = useState(false);
  const [hideCity, setHideCity] = useState(false);
  const [showInfinity, setShowInfinity] = useState(true);

  // Helper for Navigable Rows (Pink Style)
  const NavRow = ({ label }) => (
    <TouchableOpacity style={styles.innerRow}>
      <Text style={styles.rowText}>{label}</Text>
      <ChevronRight color="#000" size={20} />
    </TouchableOpacity>
  );

  // Helper for Switch Rows (Pink Style)
  const ToggleRow = ({ label, value, onValueChange }) => (
    <View style={styles.innerRow}>
      <Text style={styles.rowText}>{label}</Text>
      <Switch
        trackColor={{ false: '#d1d1d1', true: '#ec008c' }} // Matching the pink branding
        thumbColor={'#fff'}
        onValueChange={onValueChange}
        value={value}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()} // GO BACK FUNCTION
        >
          <ChevronLeft color="#000" size={28} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Manage Profile</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* PRIVACY SECTION */}
        <View style={styles.bubbleContainer}>
          <Text style={styles.sectionTitle}>PRIVACY</Text>
          <NavRow label="Profile Visibility" />
          <NavRow label="Incoming Requests" />
          <NavRow label="Blocked Souls" />
        </View>

        {/* CONNECTIONS SECTION */}
        <View style={styles.bubbleContainer}>
          <Text style={styles.sectionTitle}>CONNECTIONS</Text>
          <ToggleRow 
            label="Auto-Follow All Matches" 
            value={autoFollow} 
            onValueChange={setAutoFollow} 
          />
          <ToggleRow 
            label="Auto-Approve All Followers" 
            value={autoApprove} 
            onValueChange={setAutoApprove} 
          />
        </View>

        {/* PROFILE VISIBILITY SECTION */}
        <View style={styles.bubbleContainer}>
          <Text style={styles.sectionTitle}>PROFILE VISIBILITY</Text>
          <ToggleRow label="Hide My Posts on Profile" value={hidePosts} onValueChange={setHidePosts} />
          <ToggleRow label="Hide My Comments on Profile" value={hideComments} onValueChange={setHideComments} />
          <ToggleRow label="Hide Zodiac on Profiles" value={hideZodiac} onValueChange={setHideZodiac} />
          <ToggleRow label="Hide City" value={hideCity} onValueChange={setHideCity} />
          
          <View style={styles.divider} />
          
          <Text style={styles.subSectionTitle}>MY BOO INFINITY</Text>
          <ToggleRow 
            label="Show Boo Infinity Status" 
            value={showInfinity} 
            onValueChange={setShowInfinity} 
          />
        </View>

        {/* NINJA MODE SECTION */}
        <View style={styles.bubbleContainer}>
          <Text style={styles.sectionTitle}>NINJA MODE</Text>
          <ToggleRow label="Hide My Message Read Status" value={false} />
          <ToggleRow label="Hide My Age on Profile" value={false} />
          <ToggleRow label="Don't Show Others I Viewed Profiles" value={false} />
          <ToggleRow label="Enter Spirit Realm" value={false} />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6c9c9', // Pink background from original design
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  headerTitle: {
    color: '#000',
    fontSize: 22,
    fontWeight: '800',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  bubbleContainer: {
    backgroundColor: '#fff', // White bubbles
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#000', // Black borders from original design
    padding: 20,
    marginBottom: 20,
    // Add subtle shadow for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    color: '#ec008c', // Pink branding color
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 10,
    letterSpacing: 1,
  },
  subSectionTitle: {
    color: '#ec008c',
    fontSize: 11,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  innerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  rowText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 15,
  },
  backButton: {
    padding: 5,
  }
});

export default ManageProfileSetting;