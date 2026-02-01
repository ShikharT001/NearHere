import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  StatusBar,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path, Circle, Defs, LinearGradient, Stop, G } from 'react-native-svg';

const { width } = Dimensions.get('window');

// --- BEAUTIFUL SVG ICONS ---

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

const SearchIconSVG = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <Circle cx="11" cy="11" r="8" stroke="#6B7280" strokeWidth="2" />
    <Path d="M21 21l-4.35-4.35" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

const PersonIconSVG = ({ size = 28, color = "#E91E63" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="8" r="4" fill={`${color}30`} stroke={color} strokeWidth="2" />
    <Path 
      d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
    />
  </Svg>
);

const CameraIconSVG = () => (
  <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <Path 
      d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" 
      fill="#E91E6320"
      stroke="#E91E63" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <Circle cx="12" cy="13" r="4" stroke="#E91E63" strokeWidth="2" />
  </Svg>
);

const CheckIconSVG = () => (
  <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <Path 
      d="M20 6L9 17l-5-5" 
      stroke="white" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
  </Svg>
);

const CloseIconSVG = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" fill="#FF6B6B20" stroke="#FF6B6B" strokeWidth="2" />
    <Path d="M15 9l-6 6M9 9l6 6" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

const HeartIconSVG = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <Path
      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
      fill="#E91E63"
      stroke="#E91E63"
      strokeWidth="1.5"
    />
  </Svg>
);

// --- ANIMATED TAB BUTTON ---
const TabButton = ({ title, isActive, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(isActive ? 1 : 0.95)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: isActive ? 1 : 0.95,
      tension: 50,
      friction: 5,
      useNativeDriver: true,
    }).start();
  }, [isActive]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Animated.View 
        style={[
          styles.tabButton, 
          isActive && styles.activeTabButton,
          { transform: [{ scale: scaleAnim }] }
        ]}
      >
        <Text style={[styles.tabButtonText, isActive && styles.activeTabText]}>
          {title}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

// --- MESSAGE ROW COMPONENT ---
const MessageRow = ({ username, time, preview, index, onPress }) => {
  const slideAnim = useRef(new Animated.Value(50)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay: index * 50,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        delay: index * 50,
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
        style={styles.messageRow}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={styles.avatarContainer}>
          <PersonIconSVG size={32} color="#E91E63" />
          <View style={styles.onlineDot} />
        </View>
        
        <View style={styles.messageTextContainer}>
          <View style={styles.rowBetween}>
            <Text style={styles.username}>{username}</Text>
            <Text style={styles.timeText}>{time}</Text>
          </View>
          <Text style={styles.messagePreview} numberOfLines={1}>
            {preview}
          </Text>
        </View>
        
        <View style={styles.cameraIconWrapper}>
          <CameraIconSVG />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

// --- REQUEST ITEM COMPONENT ---
const RequestItem = ({ name, index }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      delay: index * 80,
      tension: 50,
      friction: 7,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View 
      style={[
        styles.requestItem,
        { transform: [{ scale: scaleAnim }] }
      ]}
    >
      <View style={styles.avatarContainer}>
        <PersonIconSVG size={28} color="#E91E63" />
      </View>
      <Text style={styles.requestName}>{name}</Text>
      <TouchableOpacity style={styles.confirmBtn} activeOpacity={0.8}>
        <CheckIconSVG />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8}>
        <CloseIconSVG />
      </TouchableOpacity>
    </Animated.View>
  );
};

// --- GRID CARD COMPONENT ---
const GridCard = ({ username, viewType, index }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      delay: index * 60,
      tension: 50,
      friction: 7,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View 
      style={[
        styles.gridCard,
        { transform: [{ scale: scaleAnim }] }
      ]}
    >
      <View style={styles.gridIconContainer}>
        <HeartIconSVG />
      </View>
      <View style={styles.gridOverlay}>
        <Text style={styles.gridOverlayText}>
          {viewType === 'ViewedYou' ? "Interested in you" : "You explored this"}
        </Text>
      </View>
      <Text style={styles.gridName}>@{username}</Text>
    </Animated.View>
  );
};

// --- MAIN COMPONENT ---
export default function NearHereMain() {
  const [activeTab, setActiveTab] = useState('Messages');
  const [viewToggle, setViewToggle] = useState('ViewedYou');
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const messages = [
    { username: 'sarah_designs', time: '2 hr', preview: '7+ messages received from this user.' },
    { username: 'alex_photo', time: '5 hr', preview: 'Hey! Thanks for connecting 😊' },
    { username: 'mike_dev', time: '1 day', preview: 'Would love to chat sometime!' },
    { username: 'emma_art', time: '2 days', preview: 'Your profile is amazing! ✨' },
    { username: 'john_fit', time: '3 days', preview: 'What brings you to Near-here?' },
  ];

  const requests = ['angel_priya', 'yasu__001', 'royal_king_', 'jenny_lee'];
  const gridUsers = ['alex_photo', 'sarah_m', 'mike_dev', 'emma_art', 'john_fit', 'lisa_k'];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFE5E5" />
      
      {/* Header */}
      <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <BackIconSVG />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>Near</Text>
          <Text style={styles.logoAccent}>-here</Text>
        </View>
        <View style={{ width: 40 }} /> 
      </Animated.View>

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        {['Messages', 'Requests', 'Views'].map((tab) => (
          <TabButton
            key={tab}
            title={tab}
            isActive={activeTab === tab}
            onPress={() => setActiveTab(tab)}
          />
        ))}
      </View>

      {/* Content Container */}
      <View style={styles.whiteCard}>
        {activeTab === 'Messages' && (
          <MessagesContent 
            messages={messages}
            searchText={searchText}
            setSearchText={setSearchText}
            navigation={navigation}
          />
        )}
        {activeTab === 'Requests' && <RequestsContent requests={requests} />}
        {activeTab === 'Views' && (
          <ViewsContent 
            viewToggle={viewToggle} 
            setViewToggle={setViewToggle}
            users={gridUsers}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

// --- CONTENT COMPONENTS ---

const MessagesContent = ({ messages, searchText, setSearchText, navigation }) => (
  <ScrollView showsVerticalScrollIndicator={false}>
    {/* Search Bar */}
    <View style={styles.searchBar}>
      <SearchIconSVG />
      <TextInput 
        placeholder="Search conversations..." 
        placeholderTextColor="#9CA3AF"
        style={styles.searchInput}
        value={searchText}
        onChangeText={setSearchText}
      />
    </View>

    {messages.map((msg, i) => (
      <MessageRow
        key={i}
        index={i}
        username={msg.username}
        time={msg.time}
        preview={msg.preview}
        onPress={() => navigation.navigate('Messagedetail', { user: msg.username })}
      />
    ))}
  </ScrollView>
);

const RequestsContent = ({ requests }) => (
  <ScrollView showsVerticalScrollIndicator={false}>
    <Text style={styles.sectionTitle}>Connection Requests</Text>
    {requests.map((name, i) => (
      <RequestItem key={i} name={name} index={i} />
    ))}
  </ScrollView>
);

const ViewsContent = ({ viewToggle, setViewToggle, users }) => (
  <View style={{ flex: 1 }}>
    {/* Toggle Switcher */}
    <View style={styles.switchContainer}>
      <TouchableOpacity 
        onPress={() => setViewToggle('ViewedYou')}
        style={styles.switchButton}
      >
        <Text style={[styles.switchText, viewToggle === 'ViewedYou' && styles.switchActive]}>
          Viewed you
        </Text>
        {viewToggle === 'ViewedYou' && <View style={styles.switchIndicator} />}
      </TouchableOpacity>
      
      <View style={styles.verticalDivider} />
      
      <TouchableOpacity 
        onPress={() => setViewToggle('YouViewed')}
        style={styles.switchButton}
      >
        <Text style={[styles.switchText, viewToggle === 'YouViewed' && styles.switchActive]}>
          You viewed
        </Text>
        {viewToggle === 'YouViewed' && <View style={styles.switchIndicator} />}
      </TouchableOpacity>
    </View>

    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.grid}>
        {users.map((username, i) => (
          <GridCard 
            key={i} 
            username={username} 
            viewType={viewToggle} 
            index={i}
          />
        ))}
      </View>
    </ScrollView>
  </View>
);

// --- STYLES ---

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFE5E5' 
  },
  
  // Header
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20,
    paddingVertical: 16, 
    alignItems: 'center' 
  },
  
  backButton: { 
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(233, 30, 99, 0.2)',
  },
  
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  
  logoText: { 
    fontSize: 30, 
    fontWeight: '900', 
    color: '#1a1a1a',
    letterSpacing: -0.5,
  },
  
  logoAccent: {
    fontSize: 30,
    fontWeight: '400',
    color: '#E91E63',
    fontStyle: 'italic',
  },
  
  // Tab Bar
  tabBar: { 
    flexDirection: 'row', 
    paddingHorizontal: 20, 
    marginBottom: 20,
    gap: 12,
  },
  
  tabButton: { 
    paddingVertical: 12, 
    paddingHorizontal: 24, 
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  
  activeTabButton: { 
    backgroundColor: 'white',
    shadowColor: '#E91E63',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  
  tabButtonText: { 
    fontSize: 15, 
    fontWeight: '600', 
    color: '#9CA3AF' 
  },
  
  activeTabText: { 
    color: '#E91E63',
    fontWeight: '800',
  },

  // White Card Container
  whiteCard: { 
    flex: 1, 
    backgroundColor: '#FAFAFA', 
    marginHorizontal: 16, 
    borderTopLeftRadius: 32, 
    borderTopRightRadius: 32, 
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },

  // Search Bar
  searchBar: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#F3F4F6', 
    paddingHorizontal: 16, 
    paddingVertical: 14, 
    borderRadius: 16, 
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
  },
  
  searchInput: { 
    flex: 1, 
    marginLeft: 12, 
    fontSize: 15, 
    color: '#1F2937',
    fontWeight: '500',
  },

  // Message Rows
  messageRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 16, 
    borderBottomWidth: 1, 
    borderBottomColor: '#F3F4F6',
    backgroundColor: 'white',
    marginBottom: 2,
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  
  avatarContainer: { 
    width: 56, 
    height: 56, 
    borderRadius: 28, 
    borderWidth: 2.5, 
    borderColor: '#FFE5E5', 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#FFF5F7',
    position: 'relative',
  },
  
  onlineDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: 'white',
  },
  
  messageTextContainer: { 
    flex: 1, 
    marginLeft: 14 
  },
  
  rowBetween: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 4,
  },
  
  username: { 
    fontSize: 16, 
    fontWeight: '700', 
    color: '#1F2937',
    letterSpacing: -0.3,
  },
  
  timeText: { 
    fontSize: 12, 
    color: '#9CA3AF',
    fontWeight: '600',
  },
  
  messagePreview: { 
    color: '#6B7280', 
    fontSize: 14,
    fontWeight: '500',
  },
  
  cameraIconWrapper: {
    marginLeft: 12,
    opacity: 0.6,
  },

  // Requests
  requestItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: '#F3F4F6',
    shadowColor: '#E91E63',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  
  requestName: { 
    flex: 1, 
    marginLeft: 14, 
    fontWeight: '700', 
    fontSize: 16,
    color: '#1F2937',
  },
  
  confirmBtn: { 
    backgroundColor: '#E91E63', 
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    shadowColor: '#E91E63',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 20,
    letterSpacing: -0.5,
  },

  // Views Switcher
  switchContainer: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 24,
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    padding: 6,
  },
  
  switchButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    position: 'relative',
  },
  
  switchText: { 
    fontSize: 15, 
    color: '#9CA3AF', 
    fontWeight: '600' 
  },
  
  switchActive: { 
    color: '#E91E63', 
    fontWeight: '800' 
  },
  
  switchIndicator: {
    position: 'absolute',
    bottom: 0,
    width: '80%',
    height: 3,
    backgroundColor: '#E91E63',
    borderRadius: 2,
  },
  
  verticalDivider: { 
    width: 1, 
    height: 24, 
    backgroundColor: '#E5E7EB',
  },

  // Grid
  grid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between' 
  },
  
  gridCard: { 
    width: '48%', 
    height: 220, 
    backgroundColor: '#1F2937',
    borderRadius: 20, 
    padding: 16, 
    marginBottom: 16,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  
  gridIconContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  
  gridOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  gridOverlayText: { 
    color: '#9CA3AF', 
    fontSize: 12, 
    textAlign: 'center',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  
  gridName: { 
    color: 'white', 
    fontSize: 15, 
    fontWeight: '800',
    position: 'absolute',
    bottom: 16,
    left: 16,
  },
});