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
import Svg, { Path, Circle, Rect, G } from 'react-native-svg';

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
      stroke="#E91E63" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
  </Svg>
);

const ShieldIconSVG = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path 
      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" 
      fill="#E91E6320"
      stroke="#E91E63" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
  </Svg>
);

const UsersIconSVG = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Circle cx="9" cy="7" r="4" fill="#3B82F620" stroke="#3B82F6" strokeWidth="2" />
    <Circle cx="17" cy="9" r="3" fill="#3B82F620" stroke="#3B82F6" strokeWidth="2" />
    <Path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" stroke="#3B82F6" strokeWidth="2" />
  </Svg>
);

const EyeIconSVG = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path 
      d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" 
      fill="#9333EA20"
      stroke="#9333EA" 
      strokeWidth="2" 
    />
    <Circle cx="12" cy="12" r="3" fill="#9333EA" />
  </Svg>
);

const NinjaIconSVG = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path 
      d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" 
      fill="#64748B20"
      stroke="#64748B" 
      strokeWidth="2" 
    />
    <Circle cx="9" cy="10" r="1.5" fill="#64748B" />
    <Circle cx="15" cy="10" r="1.5" fill="#64748B" />
    <Path d="M8 14h8" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

const InfinityIconSVG = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path 
      d="M17 12c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zM7 12c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zM17 12h4M7 12H3" 
      stroke="#F59E0B" 
      strokeWidth="2" 
      strokeLinecap="round" 
    />
    <Path 
      d="M15.5 9c1.5 0 2.5 1 3.5 3-1 2-2 3-3.5 3M8.5 15c-1.5 0-2.5-1-3.5-3 1-2 2-3 3.5-3" 
      stroke="#F59E0B" 
      strokeWidth="2" 
      strokeLinecap="round" 
    />
  </Svg>
);

// --- ANIMATED SECTION CONTAINER ---
const SectionContainer = ({ children, index, icon: Icon, title }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay: index * 100,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        delay: index * 100,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View 
      style={[
        styles.bubbleContainer,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        }
      ]}
    >
      <View style={styles.sectionHeaderContainer}>
        {Icon && (
          <View style={styles.sectionIconContainer}>
            <Icon />
          </View>
        )}
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {children}
    </Animated.View>
  );
};

// --- NAV ROW COMPONENT ---
const NavRow = ({ label }) => (
  <TouchableOpacity style={styles.innerRow} activeOpacity={0.7}>
    <Text style={styles.rowText}>{label}</Text>
    <ChevronRightSVG />
  </TouchableOpacity>
);

// --- TOGGLE ROW COMPONENT ---
const ToggleRow = ({ label, value, onValueChange }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleToggle = (newValue) => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        useNativeDriver: true,
        speed: 50,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        speed: 50,
      }),
    ]).start();
    onValueChange(newValue);
  };

  return (
    <Animated.View style={[styles.innerRow, { transform: [{ scale: scaleAnim }] }]}>
      <Text style={styles.rowText}>{label}</Text>
      <Switch
        trackColor={{ false: '#D1D5DB', true: '#FDB4D0' }}
        thumbColor={value ? '#E91E63' : '#F3F4F6'}
        onValueChange={handleToggle}
        value={value}
        style={styles.switch}
      />
    </Animated.View>
  );
};

// --- MAIN COMPONENT ---
const ManageProfileSetting = () => {
  const navigation = useNavigation();

  // Toggle States
  const [autoFollow, setAutoFollow] = useState(true);
  const [autoApprove, setAutoApprove] = useState(true);
  const [hidePosts, setHidePosts] = useState(false);
  const [hideComments, setHideComments] = useState(false);
  const [hideZodiac, setHideZodiac] = useState(false);
  const [hideCity, setHideCity] = useState(false);
  const [showInfinity, setShowInfinity] = useState(true);
  const [hideReadStatus, setHideReadStatus] = useState(false);
  const [hideAge, setHideAge] = useState(false);
  const [hideViewed, setHideViewed] = useState(false);
  const [spiritRealm, setSpiritRealm] = useState(false);

  const headerFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(headerFade, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

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
        <Text style={styles.headerTitle}>Manage Profile</Text>
        <View style={{ width: 28 }} />
      </Animated.View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        
        {/* PRIVACY SECTION */}
        <SectionContainer index={0} icon={ShieldIconSVG} title="PRIVACY">
          <NavRow label="Profile Visibility" />
          <NavRow label="Incoming Requests" />
          <NavRow label="Blocked Users" />
        </SectionContainer>

        {/* CONNECTIONS SECTION */}
        <SectionContainer index={1} icon={UsersIconSVG} title="CONNECTIONS">
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
        </SectionContainer>

        {/* PROFILE VISIBILITY SECTION */}
        <SectionContainer index={2} icon={EyeIconSVG} title="PROFILE VISIBILITY">
          <ToggleRow 
            label="Hide My Posts on Profile" 
            value={hidePosts} 
            onValueChange={setHidePosts} 
          />
          <ToggleRow 
            label="Hide My Comments on Profile" 
            value={hideComments} 
            onValueChange={setHideComments} 
          />
          <ToggleRow 
            label="Hide Zodiac on Profiles" 
            value={hideZodiac} 
            onValueChange={setHideZodiac} 
          />
          <ToggleRow 
            label="Hide City" 
            value={hideCity} 
            onValueChange={setHideCity} 
          />
          
          <View style={styles.divider} />
          
          <View style={styles.subSectionHeader}>
            <InfinityIconSVG />
            <Text style={styles.subSectionTitle}>NEAR-HERE PREMIUM</Text>
          </View>
          <ToggleRow 
            label="Show Premium Status" 
            value={showInfinity} 
            onValueChange={setShowInfinity} 
          />
        </SectionContainer>

        {/* NINJA MODE SECTION */}
        <SectionContainer index={3} icon={NinjaIconSVG} title="STEALTH MODE">
          <ToggleRow 
            label="Hide My Message Read Status" 
            value={hideReadStatus}
            onValueChange={setHideReadStatus}
          />
          <ToggleRow 
            label="Hide My Age on Profile" 
            value={hideAge}
            onValueChange={setHideAge}
          />
          <ToggleRow 
            label="Don't Show Others I Viewed Profiles" 
            value={hideViewed}
            onValueChange={setHideViewed}
          />
          <ToggleRow 
            label="Enter Invisible Mode" 
            value={spiritRealm}
            onValueChange={setSpiritRealm}
          />
        </SectionContainer>

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
  
  headerTitle: {
    color: '#1a1a1a',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  
  scrollContent: {
    paddingHorizontal: 18,
    paddingBottom: 40,
  },
  
  bubbleContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  
  sectionHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#F3F4F6',
  },
  
  sectionIconContainer: {
    marginRight: 12,
  },
  
  sectionTitle: {
    color: '#E91E63',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  
  subSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  
  subSectionTitle: {
    color: '#F59E0B',
    fontSize: 12,
    fontWeight: '800',
    marginLeft: 10,
    letterSpacing: 0.8,
  },
  
  innerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#F9FAFB',
  },
  
  rowText: {
    color: '#1F2937',
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
    letterSpacing: -0.2,
  },
  
  divider: {
    height: 1.5,
    backgroundColor: '#E5E7EB',
    marginVertical: 18,
    borderRadius: 1,
  },
  
  switch: {
    transform: [{ scale: Platform.OS === 'ios' ? 0.9 : 1 }],
  },
});

export default ManageProfileSetting;