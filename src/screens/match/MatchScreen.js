import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Animated,
} from 'react-native';
import Svg, { Path, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

// Enhanced SVG Heart with gradient
const HeartIcon = () => (
  <Svg width="40" height="40" viewBox="0 0 24 24" fill="none">
    <Defs>
      <SvgGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#FF1744" />
        <Stop offset="100%" stopColor="#FF007F" />
      </SvgGradient>
    </Defs>
    <Path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      fill="url(#heartGradient)"
    />
  </Svg>
);

// Close/X Icon for reject button
const CloseIcon = () => (
  <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 6L6 18M6 6l12 12"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </Svg>
);

// Check/Love Icon
const CheckIcon = () => (
  <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 6L9 17l-5-5"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default function MatchScreen() {
  // Animation values
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));
  const [scaleAnim] = useState(new Animated.Value(0.9));
  const [heartPulse] = useState(new Animated.Value(1));

  useEffect(() => {
    // Entry animations
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

    // Heart pulse animation (loop)
    Animated.loop(
      Animated.sequence([
        Animated.timing(heartPulse, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(heartPulse, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Decorative background elements */}
      <View style={styles.backgroundCircle1} />
      <View style={styles.backgroundCircle2} />
      <View style={styles.backgroundCircle3} />
      
      <SafeAreaView style={styles.safeArea}>
        
        {/* Main White Content Area */}
        <View style={styles.whiteOverlay}>
          
          {/* Decorative top bar */}
          <View style={styles.topBar}>
            <View style={styles.topBarIndicator} />
          </View>

          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
          >
            <View style={styles.headerContainer}>
              <Text style={styles.headerLabel}>DISCOVER</Text>
              <Text style={styles.headerText}>Find Your Match</Text>
              <Text style={styles.headerSubtext}>
                Swipe to connect with amazing people
              </Text>
            </View>
          </Animated.View>

          {/* Profile Card */}
          <Animated.View 
            style={[
              styles.profileCard,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
              }
            ]}
          >
            <View style={styles.cardGlow} />
            
            {/* Image Container with overlay */}
            <View style={styles.imageContainer}>
              <Image
                source={require('../../../assets/images/Photos-cuate-2.png')}
                style={styles.illustration}
                resizeMode="cover"
              />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.7)']}
                style={styles.imageGradient}
              />
              
              {/* Username badge on image */}
              <View style={styles.usernameBadge}>
                <View style={styles.onlineIndicator} />
                <Text style={styles.usernameOnCard}>@username</Text>
              </View>
            </View>

            {/* Quick Info Pills */}
            <View style={styles.infoPills}>
              <View style={styles.infoPill}>
                <Text style={styles.infoPillText}>📍 2 km away</Text>
              </View>
              <View style={styles.infoPill}>
                <Text style={styles.infoPillText}>✨ Active now</Text>
              </View>
            </View>
          </Animated.View>

          {/* Action Buttons */}
          <Animated.View 
            style={[
              styles.buttonRow,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              }
            ]}
          >
            {/* Reject Button */}
            <TouchableOpacity 
              style={[styles.actionButton, styles.rejectBtn]}
              activeOpacity={0.8}
            >
              <View style={styles.buttonGradientOverlay} />
              <CloseIcon />
              <Text style={styles.buttonText}>Nope</Text>
            </TouchableOpacity>

            {/* Heart Button (Center) */}
            <Animated.View
              style={{
                transform: [{ scale: heartPulse }],
              }}
            >
              <TouchableOpacity 
                style={styles.heartCircle}
                activeOpacity={0.9}
              >
                <View style={styles.heartGlow} />
                <HeartIcon />
              </TouchableOpacity>
            </Animated.View>

            {/* Love Button */}
            <TouchableOpacity 
              style={[styles.actionButton, styles.loveBtn]}
              activeOpacity={0.8}
            >
              <View style={styles.buttonGradientOverlay} />
              <CheckIcon />
              <Text style={styles.buttonText}>Like</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Swipe hint */}
          <Animated.View
            style={[
              styles.swipeHint,
              {
                opacity: fadeAnim,
              }
            ]}
          >
            <Text style={styles.swipeHintText}>← Swipe or tap to decide →</Text>
          </Animated.View>

        </View>

        {/* Bottom pink strip with decorative element */}
        <View style={styles.bottomPinkStrip}>
          <View style={styles.bottomDecor} />
        </View>
        
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4C2C2',
    position: 'relative',
  },
  
  // Background decorative elements
  backgroundCircle1: {
    position: 'absolute',
    top: -100,
    right: -80,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  backgroundCircle2: {
    position: 'absolute',
    top: 150,
    left: -100,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  backgroundCircle3: {
    position: 'absolute',
    bottom: 100,
    right: -50,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  
  safeArea: {
    flex: 1,
  },
  
  whiteOverlay: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  
  // Top decorative bar
  topBar: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 8,
  },
  topBarIndicator: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#E0E0E0',
  },
  
  // Header Section
  headerContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  headerLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    color: '#FF007F',
    marginBottom: 8,
  },
  headerText: {
    fontFamily: 'Urbanist-Regular',
    fontSize: 28,
    fontWeight: '800',
    color: '#2c3e50',
    marginBottom: 6,
  },
  headerSubtext: {
    fontFamily: 'Urbanist-Regular',
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  
  // Profile Card
  profileCard: {
    width: width * 0.9,
    height: height * 0.5,
    backgroundColor: 'white',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
    position: 'relative',
    marginBottom: 30,
  },
  cardGlow: {
    position: 'absolute',
    top: -5,
    left: -5,
    right: -5,
    bottom: -5,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 0, 127, 0.1)',
    zIndex: -1,
  },
  
  // Image Container
  imageContainer: {
    flex: 1,
    position: 'relative',
  },
  illustration: {
    width: '100%',
    height: '100%',
  },
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  
  // Username Badge on Card
  usernameBadge: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  onlineIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#27ae60',
    marginRight: 8,
    borderWidth: 2,
    borderColor: 'white',
  },
  usernameOnCard: {
    fontFamily: 'Urbanist-Regular',
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
  },
  
  // Info Pills
  infoPills: {
    position: 'absolute',
    top: 16,
    right: 16,
    gap: 8,
  },
  infoPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  infoPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2c3e50',
  },
  
  // Button Row
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  
  actionButton: {
    width: width * 0.28,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    position: 'relative',
    overflow: 'hidden',
  },
  
  buttonGradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  
  rejectBtn: {
    backgroundColor: '#FF4757',
  },
  
  loveBtn: {
    backgroundColor: '#5F27CD',
  },
  
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  
  // Heart Button (Center)
  heartCircle: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF007F',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
    position: 'relative',
  },
  heartGlow: {
    position: 'absolute',
    width: 85,
    height: 85,
    borderRadius: 42.5,
    backgroundColor: 'rgba(255, 0, 127, 0.2)',
    top: -5,
    left: -5,
  },
  
  // Swipe Hint
  swipeHint: {
    marginTop: 'auto',
    marginBottom: 10,
  },
  swipeHintText: {
    fontFamily: 'Urbanist-Regular',
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  
  // Bottom Strip
  bottomPinkStrip: {
    height: 30,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomDecor: {
    width: 60,
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
});