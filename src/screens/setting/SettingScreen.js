import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Switch, 
  SafeAreaView, 
  ScrollView,
  Image 
} from 'react-native';
import { ChevronLeft, ChevronRight, ExternalLink, Moon, Zap, Coins, Bookmark, Users, Bell, Globe, PlayCircle, HardDrive, MessageSquare, Info } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
const SettingsScreen = () => {
  const [metricSystem, setMetricSystem] = useState(false);
  const [disableVibrations, setDisableVibrations] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const navigation = useNavigation();
  // Row for navigation/external links
  const SettingRow = ({ label, subLabel, icon: Icon, isExternal,onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.row}>
      <View style={styles.rowLeft}>
        {Icon && <Icon color="#000" size={20} style={styles.iconMargin} />}
        <View>
          <Text style={styles.rowText}>{label}</Text>
          {subLabel && <Text style={styles.subText}>{subLabel}</Text>}
        </View>
      </View>
      {isExternal ? <ExternalLink color="#000" size={18} /> : <ChevronRight color="#000" size={20} />}
    </TouchableOpacity>
  );

  // Row for toggles
  const ToggleRow = ({ label, value, onValueChange, icon: Icon }) => (
    <View style={styles.row}>
      <View style={styles.rowLeft}>
        {Icon && <Icon color="#000" size={20} style={styles.iconMargin} />}
        <Text style={styles.rowText}>{label}</Text>
      </View>
      <Switch
        trackColor={{ false: '#767577', true: '#ec008c' }}
        thumbColor={'#f4f3f4'}
        onValueChange={onValueChange}
        value={value}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <ChevronLeft color="#000" size={28} />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
        <View style={{ width: 28 }} /> 
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* PROFILE SECTION */}
        <Text style={styles.sectionHeader}>PROFILE</Text>
        <SettingRow 
          label="Manage Profile" 
          subLabel="Manage your profile settings" 
          icon={Users} 
          onPress={() => navigation.navigate('managesetting')}
        />

        {/* HOW YOU USE BOO */}
        <Text style={styles.sectionHeader}>HOW YOU USE BOO</Text>
        <SettingRow label="Power Ups" icon={Zap} />
        <SettingRow label="My Coins" icon={Coins} />
        <SettingRow label="Saved Posts" icon={Bookmark} />
        <SettingRow label="Social Feed" icon={Users} />
        <SettingRow label="Notifications" icon={Bell} 
            onPress={() => navigation.navigate('notificationsetting')}
        />
        <SettingRow label="Language" icon={Globe} />
        <SettingRow label="View Tutorial" icon={PlayCircle} />

        {/* APPEARANCE & DISPLAY */}
        <Text style={styles.sectionHeader}>APPEARANCE & DISPLAY</Text>
        <ToggleRow 
          label="Dark Mode" 
          value={darkMode} 
          onValueChange={setDarkMode} 
          icon={Moon} 
        />
        <SettingRow label="Data Saving Mode" icon={HardDrive} />
        <SettingRow label="Messages Theme" icon={MessageSquare} />

        {/* GENERAL SECTION */}
        <Text style={styles.sectionHeader}>GENERAL</Text>
        <ToggleRow label="Use Metric System" value={metricSystem} onValueChange={setMetricSystem} />
        <ToggleRow label="Disable Vibrations" value={disableVibrations} onValueChange={setDisableVibrations} />
        <SettingRow label="My Account" onPress={()=> navigation.navigate('myaccount')} />
        <SettingRow label="Help & Support" />
        <SettingRow label="Take Survey" isExternal />
        <SettingRow label="FAQ" isExternal />
        <SettingRow label="Privacy Policy" isExternal />
        <SettingRow label="Terms and Conditions" isExternal />

        {/* APP VERSION INFO */}
        <View style={styles.versionContainer}>
            <View style={styles.versionIconBox}>
                <Info color="#fff" size={20} />
            </View>
            <Text style={styles.versionText}>Version 1.13.83</Text>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6c9c9', 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#000',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 25,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 15,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#000',
    marginBottom: 10,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconMargin: {
    marginRight: 12,
  },
  rowText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  subText: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  versionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#000',
    marginTop: 20,
    alignSelf: 'flex-start',
  },
  versionIconBox: {
    backgroundColor: '#20c997', // Teal color for version icon
    padding: 4,
    borderRadius: 8,
    marginRight: 10,
  },
  versionText: {
    fontWeight: '600',
    color: '#666',
  },
  logoutButton: {
    backgroundColor: '#ec008c',
    borderRadius: 30,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    borderWidth: 2,
    borderColor: '#000',
  },
  logoutText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;