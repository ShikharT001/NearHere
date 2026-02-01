import React, { useState, useRef, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Switch, 
  SafeAreaView, 
  ScrollView,
  Animated,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path, Circle, Rect, G, Defs, LinearGradient, Stop } from 'react-native-svg';

// --- CUSTOM SVG ICONS ---

const BackIconSVG = () => (
  <Svg width="26" height="26" viewBox="0 0 24 24" fill="none">
    <Path 
      d="M15 18l-6-6 6-6" 
      stroke="#1a1a1a" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
  </Svg>
);

const ChevronRightSVG = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <Path 
      d="M9 18l6-6-6-6" 
      stroke="#6B7280" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
  </Svg>
);

const ExternalLinkSVG = () => (
  <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <Path 
      d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" 
      stroke="#6B7280" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
  </Svg>
);

const UserIconSVG = () => (
  <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="8" r="4" stroke="#E91E63" strokeWidth="2" />
    <Path 
      d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" 
      stroke="#E91E63" 
      strokeWidth="2" 
      strokeLinecap="round" 
    />
  </Svg>
);

const BoltIconSVG = () => (
  <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <Path 
      d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" 
      fill="#FFA500"
      stroke="#FF8C00" 
      strokeWidth="1.5" 
      strokeLinejoin="round" 
    />
  </Svg>
);

const CoinsIconSVG = () => (
  <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="8" fill="#FFD70020" stroke="#FFD700" strokeWidth="2" />
    <Circle cx="12" cy="12" r="5" fill="#FFD70040" stroke="#FFD700" strokeWidth="1.5" />
    <Path d="M12 8v8M8 12h8" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

const BookmarkIconSVG = () => (
  <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <Path 
      d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" 
      fill="#9333EA20"
      stroke="#9333EA" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
  </Svg>
);

const UsersIconSVG = () => (
  <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <Circle cx="9" cy="7" r="4" fill="#3B82F620" stroke="#3B82F6" strokeWidth="2" />
    <Circle cx="17" cy="9" r="3" fill="#3B82F620" stroke="#3B82F6" strokeWidth="2" />
    <Path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" stroke="#3B82F6" strokeWidth="2" />
  </Svg>
);

const BellIconSVG = () => (
  <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <Path 
      d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" 
      stroke="#EF4444" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
  </Svg>
);

const GlobeIconSVG = () => (
  <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke="#10B981" strokeWidth="2" />
    <Path 
      d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" 
      stroke="#10B981" 
      strokeWidth="2" 
    />
  </Svg>
);

const PlayIconSVG = () => (
  <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" fill="#06B6D420" stroke="#06B6D4" strokeWidth="2" />
    <Path d="M10 8l6 4-6 4V8z" fill="#06B6D4" />
  </Svg>
);

const MoonIconSVG = () => (
  <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <Path 
      d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" 
      fill="#64748B20"
      stroke="#64748B" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
  </Svg>
);

const DatabaseIconSVG = () => (
  <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <Rect x="3" y="3" width="18" height="18" rx="2" fill="#8B5CF620" stroke="#8B5CF6" strokeWidth="2" />
    <Path d="M12 8v8M8 12h8" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

const MessageIconSVG = () => (
  <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <Path 
      d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" 
      fill="#EC489920"
      stroke="#EC4899" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
  </Svg>
);

const InfoIconSVG = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" fill="#10B981" />
    <Path d="M12 16v-4M12 8h.01" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
  </Svg>
);

// --- ANIMATED SETTING ROW ---
const SettingRow = ({ label, subLabel, icon: Icon, isExternal, onPress, index }) => {
  const slideAnim = useRef(new Animated.Value(30)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay: index * 30,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        delay: index * 30,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View 
      style={{
        opacity: fadeAnim,
        transform: [{ translateX: slideAnim }],
      }}
    >
      <TouchableOpacity 
        onPress={onPress} 
        style={styles.row} 
        activeOpacity={0.7}
      >
        <View style={styles.rowLeft}>
          {Icon && (
            <View style={styles.iconContainer}>
              <Icon />
            </View>
          )}
          <View style={styles.textContainer}>
            <Text style={styles.rowText}>{label}</Text>
            {subLabel && <Text style={styles.subText}>{subLabel}</Text>}
          </View>
        </View>
        {isExternal ? <ExternalLinkSVG /> : <ChevronRightSVG />}
      </TouchableOpacity>
    </Animated.View>
  );
};

// --- TOGGLE ROW ---
const ToggleRow = ({ label, value, onValueChange, icon: Icon, index }) => {
  const slideAnim = useRef(new Animated.Value(30)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay: index * 30,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        delay: index * 30,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View 
      style={{
        opacity: fadeAnim,
        transform: [{ translateX: slideAnim }],
      }}
    >
      <View style={styles.row}>
        <View style={styles.rowLeft}>
          {Icon && (
            <View style={styles.iconContainer}>
              <Icon />
            </View>
          )}
          <Text style={styles.rowText}>{label}</Text>
        </View>
        <Switch
          trackColor={{ false: '#D1D5DB', true: '#FDB4D0' }}
          thumbColor={value ? '#E91E63' : '#F3F4F6'}
          onValueChange={onValueChange}
          value={value}
          style={styles.switch}
        />
      </View>
    </Animated.View>
  );
};

// --- MAIN COMPONENT ---
const SettingsScreen = () => {
  const [metricSystem, setMetricSystem] = useState(false);
  const [disableVibrations, setDisableVibrations] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  
  const navigation = useNavigation();
  const headerFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(headerFade, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  let rowIndex = 0;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Animated.View style={[styles.header, { opacity: headerFade }]}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <BackIconSVG />
        </TouchableOpacity>
        
        <Text style={styles.title}>Settings</Text>
        <View style={{ width: 28 }} /> 
      </Animated.View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        
        {/* PROFILE SECTION */}
        <Text style={styles.sectionHeader}>PROFILE</Text>
        <SettingRow 
          label="Manage Profile" 
          subLabel="Edit your profile and preferences" 
          icon={UserIconSVG} 
          onPress={() => navigation.navigate('managesetting')}
          index={rowIndex++}
        />

        {/* HOW YOU USE NEAR-HERE */}
        <Text style={styles.sectionHeader}>HOW YOU USE NEAR-HERE</Text>
        <SettingRow label="Power Ups" icon={BoltIconSVG} index={rowIndex++} />
        <SettingRow label="My Coins" icon={CoinsIconSVG} index={rowIndex++} />
        <SettingRow label="Saved Posts" icon={BookmarkIconSVG} index={rowIndex++} />
        <SettingRow label="Social Feed" icon={UsersIconSVG} index={rowIndex++} />
        <SettingRow 
          label="Notifications" 
          icon={BellIconSVG} 
          onPress={() => navigation.navigate('notificationsetting')}
          index={rowIndex++}
        />
        <SettingRow label="Language" icon={GlobeIconSVG} index={rowIndex++} />
        <SettingRow label="View Tutorial" icon={PlayIconSVG} index={rowIndex++} />

        {/* APPEARANCE & DISPLAY */}
        <Text style={styles.sectionHeader}>APPEARANCE & DISPLAY</Text>
        <ToggleRow 
          label="Dark Mode" 
          value={darkMode} 
          onValueChange={setDarkMode} 
          icon={MoonIconSVG}
          index={rowIndex++}
        />
        <SettingRow label="Data Saving Mode" icon={DatabaseIconSVG} index={rowIndex++} />
        <SettingRow label="Messages Theme" icon={MessageIconSVG} index={rowIndex++} />

        {/* GENERAL SECTION */}
        <Text style={styles.sectionHeader}>GENERAL</Text>
        <ToggleRow 
          label="Use Metric System" 
          value={metricSystem} 
          onValueChange={setMetricSystem}
          index={rowIndex++}
        />
        <ToggleRow 
          label="Disable Vibrations" 
          value={disableVibrations} 
          onValueChange={setDisableVibrations}
          index={rowIndex++}
        />
        <SettingRow 
          label="My Account" 
          onPress={() => navigation.navigate('myaccount')}
          index={rowIndex++}
        />
        <SettingRow label="Help & Support" index={rowIndex++} />
        <SettingRow label="Take Survey" isExternal index={rowIndex++} />
        <SettingRow label="FAQ" isExternal index={rowIndex++} />
        <SettingRow label="Privacy Policy" isExternal index={rowIndex++} />
        <SettingRow label="Terms and Conditions" isExternal index={rowIndex++} />

        {/* APP VERSION INFO */}
        <View style={styles.versionContainer}>
          <View style={styles.versionIconBox}>
            <InfoIconSVG />
          </View>
          <View>
            <Text style={styles.versionLabel}>App Version</Text>
            <Text style={styles.versionText}>1.13.83</Text>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} activeOpacity={0.85}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE5E5', 
  },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  
  backButton: {
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(233, 30, 99, 0.2)',
  },
  
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#1a1a1a',
    letterSpacing: -1,
  },
  
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  
  sectionHeader: {
    fontSize: 13,
    fontWeight: '800',
    color: '#6B7280',
    marginTop: 30,
    marginBottom: 12,
    letterSpacing: 1,
  },
  
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FAFAFA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  
  textContainer: {
    flex: 1,
  },
  
  rowText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    letterSpacing: -0.3,
  },
  
  subText: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 2,
    fontWeight: '500',
  },
  
  switch: {
    transform: [{ scale: Platform.OS === 'ios' ? 0.9 : 1 }],
  },
  
  versionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    marginTop: 25,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F0FDF4',
  },
  
  versionIconBox: {
    width: 44,
    height: 44,
    backgroundColor: '#10B981',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  
  versionLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '600',
    marginBottom: 2,
  },
  
  versionText: {
    fontWeight: '800',
    color: '#1F2937',
    fontSize: 16,
    letterSpacing: -0.3,
  },
  
  logoutButton: {
    backgroundColor: '#E91E63',
    borderRadius: 20,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 35,
    shadowColor: '#E91E63',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  
  logoutText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});

export default SettingsScreen;