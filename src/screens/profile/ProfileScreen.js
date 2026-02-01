import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  StatusBar,
  Dimensions,
  Animated
} from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfileScreen() {
  const navigation = useNavigation();
  
  // State for switching tabs
  const [activeTab, setActiveTab] = useState('PROFILE');
  
  // Animation values
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(30));
  const [scaleAnim] = useState(new Animated.Value(0.95));

  // Animate on mount
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Logic to render content inside the bottom box
  const renderTabContent = () => {
    switch (activeTab) {
      case 'POSTS':
        return (
          <View style={styles.tabCenterContent}>
            <View style={styles.emptyIconContainer}>
              <MaterialCommunityIcons name="view-grid-outline" size={48} color="#3498db" />
            </View>
            <Text style={styles.emptyText}>No posts yet.</Text>
            <Text style={styles.emptySubText}>Start sharing your moments!</Text>
          </View>
        );
      case 'COMMENTS':
        return (
          <View style={styles.tabCenterContent}>
            <View style={styles.emptyIconContainer}>
              <MaterialCommunityIcons name="message-outline" size={48} color="#3498db" />
            </View>
            <Text style={styles.emptyText}>No comments yet.</Text>
            <Text style={styles.emptySubText}>Join the conversation!</Text>
          </View>
        );
      default:
        return (
          <View style={styles.profileBio}>
            <View style={styles.bioHeader}>
              <Ionicons name="information-circle" size={20} color="#3498db" />
              <Text style={styles.bioTitle}>Bio</Text>
            </View>
            <Text style={styles.bioText}>
              Professional designation and details about the user's journey. 
              Keep moving forward! ✨
            </Text>
            
            <View style={styles.bioTags}>
              <View style={styles.bioTag}>
                <Ionicons name="briefcase-outline" size={14} color="#666" />
                <Text style={styles.bioTagText}>Professional</Text>
              </View>
              <View style={styles.bioTag}>
                <Ionicons name="sparkles-outline" size={14} color="#666" />
                <Text style={styles.bioTagText}>Motivated</Text>
              </View>
            </View>
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Decorative background elements */}
      <View style={styles.backgroundDecor1} />
      <View style={styles.backgroundDecor2} />
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        
        {/* Main Profile Card */}
        <Animated.View 
          style={[
            styles.card,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim }
              ]
            }
          ]}
        >
          {/* Gradient overlay at top */}
          <View style={styles.cardGradientTop} />
          
          <View style={styles.cardHeader}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
              <View style={styles.iconButton}>
                <Ionicons name="chevron-back" size={24} color="#333" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('setting')} style={styles.headerBtn}>
              <View style={styles.iconButton}>
                <Ionicons name="settings-outline" size={22} color="#333" />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.imageSection}>
            <View style={styles.coverImagePlaceholder}>
              <Ionicons name="images-outline" size={40} color="#ddd" />
              <Text style={styles.placeholderLarge}>Cover Photo</Text>
            </View>
            
            <View style={styles.avatarWrapper}>
              <View style={styles.avatarGlow} />
              <View style={styles.avatarCircle}>
                <Ionicons name="person" size={50} color="white" />
              </View>
              <View style={styles.badge}>
                <Ionicons name="checkmark-circle" size={12} color="white" style={{ marginRight: 2 }} />
                <Text style={styles.badgeText}>100%</Text>
              </View>
              <TouchableOpacity style={styles.editAvatarBtn}>
                <Ionicons name="camera" size={16} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.userDetails}>
            <View style={styles.nameRow}>
              <Text style={styles.handleText}>@name</Text>
              <View style={styles.verifiedBadge}>
                <MaterialCommunityIcons name="check-decagram" size={20} color="#3498db" />
              </View>
            </View>
            <Text style={styles.text}>designation</Text>
            <View style={styles.infoRow}>
              <Ionicons name="school-outline" size={16} color="#666" />
              <Text style={[styles.text, styles.infoText]}>education from</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="location-outline" size={16} color="#666" />
              <Text style={[styles.text, styles.infoText]}>location</Text>
            </View>

            <View style={styles.tagRow}>
              <View style={styles.pill}>
                <Ionicons name="calendar-outline" size={12} color="#666" />
                <Text style={styles.pillText}>age gender</Text>
              </View>
              <View style={styles.pill}>
                <Ionicons name="star-outline" size={12} color="#666" />
                <Text style={styles.pillText}>zodiac sign</Text>
              </View>
              
              <TouchableOpacity 
                onPress={() => navigation.navigate('Personality')} 
                activeOpacity={0.7}
                style={[styles.pill, styles.pillPrimary]}
              >
                <Ionicons name="bulb" size={12} color="white" />
                <Text style={[styles.pillText, styles.pillTextPrimary]}>personality type</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        {/* Visitors Bar with animation */}
        <Animated.View 
          style={[
            styles.visitorBar,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <View style={styles.visitorIconContainer}>
            <MaterialCommunityIcons name="account-multiple" size={22} color="#3498db" />
          </View>
          <View style={styles.visitorTextContainer}>
            <Text style={styles.visitorNumber}>00</Text>
            <Text style={styles.visitorLabel}>people visited your profile</Text>
          </View>
        </Animated.View>

        {/* Stats Grid with enhanced design */}
        <Animated.View 
          style={[
            styles.statsRow,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <View style={[styles.statBox, styles.statBoxFollowers]}>
            <View style={styles.statIconContainer}>
              <Ionicons name="people" size={24} color="#3498db" />
            </View>
            <Text style={styles.statNumber}>10</Text>
            <Text style={styles.statLabel}>followers</Text>
          </View>
          
          <View style={[styles.statBox, styles.statBoxHearts]}>
            <View style={styles.statIconContainer}>
              <Ionicons name="heart" size={24} color="#e74c3c" />
            </View>
            <Text style={styles.statNumber}>20</Text>
            <Text style={styles.statLabel}>hearts</Text>
          </View>
          
          <View style={[styles.statBox, styles.statBoxLevel]}>
            <View style={styles.statIconContainer}>
              <Ionicons name="trophy" size={24} color="#f39c12" />
            </View>
            <Text style={styles.levelSmall}>sabke niklenge</Text>
            <Text style={styles.statNumber}>level</Text>
          </View>
        </Animated.View>

        {/* Navigation Tabs with enhanced design */}
        <Animated.View 
          style={[
            styles.tabs,
            {
              opacity: fadeAnim,
            }
          ]}
        >
          {['PROFILE', 'POSTS', 'COMMENTS'].map((tab) => (
            <TouchableOpacity 
              key={tab} 
              onPress={() => setActiveTab(tab)}
              style={[
                styles.tabButton,
                activeTab === tab && styles.tabButtonActive
              ]}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.tabText, 
                activeTab === tab && styles.tabTextActive
              ]}>
                {tab}
              </Text>
              {activeTab === tab && <View style={styles.tabIndicator} />}
            </TouchableOpacity>
          ))}
        </Animated.View>

        {/* Dynamic Content Footer with enhanced design */}
        <Animated.View 
          style={[
            styles.footerBox,
            {
              opacity: fadeAnim,
            }
          ]}
        >
           {renderTabContent()}
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4C2C2',
  },
  
  // Decorative background elements
  backgroundDecor1: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  backgroundDecor2: {
    position: 'absolute',
    bottom: -150,
    left: -100,
    width: 350,
    height: 350,
    borderRadius: 175,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  
  // Main Card Styles
  card: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 20,
    borderWidth: 0,
    minHeight: 480,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  cardGradientTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: 'transparent',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  
  // Header
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    zIndex: 10,
  },
  headerBtn: {
    padding: 5,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  // Image Section
  imageSection: {
    height: 220,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    position: 'relative',
  },
  coverImagePlaceholder: {
    position: 'absolute',
    top: 0,
    left: -20,
    right: -20,
    height: 180,
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  placeholderLarge: {
    fontFamily: 'Urbanist-Regular',
    fontSize: 16,
    textAlign: 'center',
    color: '#fff',
    marginTop: 8,
    opacity: 0.8,
  },
  
  // Avatar
  avatarWrapper: {
    position: 'relative',
    marginLeft: 10,
    zIndex: 5,
  },
  avatarGlow: {
    position: 'absolute',
    width: 95,
    height: 95,
    borderRadius: 47.5,
    backgroundColor: 'rgba(52, 152, 219, 0.3)',
    top: -5,
    left: -5,
  },
  avatarCircle: {
    width: 85,
    height: 85,
    borderRadius: 42.5,
    backgroundColor: '#2c3e50',
    borderWidth: 4,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  badge: {
    position: 'absolute',
    bottom: -8,
    left: 0,
    right: 0,
    alignSelf: 'center',
    backgroundColor: '#27ae60',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#27ae60',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  badgeText: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
  },
  editAvatarBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  
  // User Details
  userDetails: {
    marginTop: 50,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  handleText: {
    fontFamily: 'Urbanist-Regular',
    fontSize: 24,
    fontWeight: '800',
    color: '#2c3e50',
  },
  verifiedBadge: {
    marginLeft: 6,
  },
  text: {
    fontFamily: 'Urbanist-Regular',
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  infoText: {
    marginLeft: 6,
    marginBottom: 0,
  },
  
  // Tags
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
    gap: 8,
  },
  pill: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  pillPrimary: {
    backgroundColor: '#3498db',
    borderColor: '#2980b9',
    shadowColor: '#3498db',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  pillText: {
    fontFamily: 'Urbanist-Regular',
    fontSize: 13,
    color: '#666',
    fontWeight: '600',
  },
  pillTextPrimary: {
    color: 'white',
  },
  
  // Visitor Bar
  visitorBar: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  visitorIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  visitorTextContainer: {
    marginLeft: 14,
    flex: 1,
  },
  visitorNumber: {
    fontFamily: 'Urbanist-Regular',
    fontSize: 20,
    fontWeight: '700',
    color: '#2c3e50',
  },
  visitorLabel: {
    fontFamily: 'Urbanist-Regular',
    fontSize: 13,
    color: '#666',
  },
  
  // Stats Grid
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    gap: 12,
  },
  statBox: {
    backgroundColor: 'white',
    flex: 1,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    position: 'relative',
    overflow: 'hidden',
  },
  statBoxFollowers: {
    borderTopWidth: 3,
    borderTopColor: '#3498db',
  },
  statBoxHearts: {
    borderTopWidth: 3,
    borderTopColor: '#e74c3c',
  },
  statBoxLevel: {
    borderTopWidth: 3,
    borderTopColor: '#f39c12',
  },
  statIconContainer: {
    marginBottom: 8,
  },
  statNumber: {
    fontFamily: 'Urbanist-Regular',
    fontSize: 24,
    fontWeight: '800',
    color: '#2c3e50',
    marginBottom: 2,
  },
  statLabel: {
    fontFamily: 'Urbanist-Regular',
    fontSize: 13,
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  levelSmall: {
    fontSize: 9,
    fontFamily: 'Urbanist-Regular',
    textAlign: 'center',
    color: '#999',
    marginBottom: 4,
  },
  
  // Tabs
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 24,
    marginBottom: 0,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    position: 'relative',
  },
  tabButtonActive: {
    backgroundColor: '#3498db',
  },
  tabText: {
    fontFamily: 'Urbanist-Regular',
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  tabTextActive: {
    color: 'white',
    fontWeight: '700',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    width: '80%',
    height: 0,
    backgroundColor: 'white',
  },
  
  // Footer Box
  footerBox: {
    backgroundColor: 'white',
    minHeight: 140,
    borderRadius: 16,
    marginTop: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  
  // Tab Content
  tabCenterContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyText: {
    fontFamily: 'Urbanist-Regular',
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
    marginBottom: 4,
  },
  emptySubText: {
    fontFamily: 'Urbanist-Regular',
    fontSize: 13,
    color: '#999',
  },
  
  // Profile Bio
  profileBio: {
    padding: 4,
  },
  bioHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  bioTitle: {
    fontFamily: 'Urbanist-Regular',
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
  },
  bioText: {
    fontFamily: 'Urbanist-Regular',
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
    marginBottom: 16,
  },
  bioTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  bioTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    gap: 6,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  bioTagText: {
    fontFamily: 'Urbanist-Regular',
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
});