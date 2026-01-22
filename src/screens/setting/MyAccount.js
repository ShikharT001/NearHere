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
import { useNavigation } from '@react-navigation/native';

const MyAccount = () => {
  const navigation = useNavigation();
  const [pauseAccount, setPauseAccount] = useState(false);

  // Helper for Navigable Rows (Pink Style)
  const NavRow = ({ label, subLabel, isDestructive }) => (
    <TouchableOpacity style={styles.innerRow}>
      <View style={{ flex: 1 }}>
        <Text style={[styles.rowText, isDestructive && { color: '#ff4444' }]}>
          {label}
        </Text>
        {subLabel && <Text style={styles.description}>{subLabel}</Text>}
      </View>
      <ChevronRight color={isDestructive ? "#ff4444" : "#000"} size={20} />
    </TouchableOpacity>
  );

  // Helper for Toggle Rows
  const ToggleRow = ({ label, subLabel, value, onValueChange }) => (
    <View style={styles.innerRow}>
      <View style={{ flex: 1 }}>
        <Text style={styles.rowText}>{label}</Text>
        {subLabel && <Text style={styles.description}>{subLabel}</Text>}
      </View>
      <Switch
        trackColor={{ false: '#d1d1d1', true: '#ec008c' }}
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
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft color="#000" size={28} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Account</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* ACCOUNT SETTINGS SECTION */}
        <View style={styles.bubbleContainer}>
          <Text style={styles.sectionTitle}>ACCOUNT SETTINGS</Text>
          <NavRow label="My Boo Infinity" />
          <NavRow label="Manage Subscription" />
          <NavRow label="Retry Pending Purchases" />
          <NavRow label="Change Email" />
        </View>

        {/* PRIVACY AND DATA SECTION */}
        <View style={styles.bubbleContainer}>
          <Text style={styles.sectionTitle}>PRIVACY AND DATA</Text>
          <NavRow label="Ads" />
          <NavRow label="Download My Information" />
          
          <ToggleRow 
            label="Pause Account" 
            subLabel="Deactivate your account temporarily without losing your data or settings."
            value={pauseAccount}
            onValueChange={setPauseAccount}
          />

          <View style={styles.divider} />

          <NavRow 
            label="Delete Account :(" 
            subLabel="Permanently delete your account and all associated data. This cannot be undone."
            isDestructive={true}
          />

          <TouchableOpacity style={[styles.innerRow, { marginTop: 10 }]}>
            <Text style={styles.rowText}>Logout</Text>
            <ChevronRight color="#000" size={20} />
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6c9c9', // Pink background
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
    backgroundColor: '#fff', // White "bubble"
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#000', // Bold black border
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },
  sectionTitle: {
    color: '#ec008c', // Pink accent
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 10,
  },
  description: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
    lineHeight: 18,
  },
  innerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  rowText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 10,
  },
  backButton: {
    padding: 5,
  }
});

export default MyAccount;