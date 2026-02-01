import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path, Circle, Defs, LinearGradient, Stop, G } from 'react-native-svg';

const { width } = Dimensions.get('window');

// --- ENHANCED SVG ICON COMPONENTS ---

const SubscriptionIconSVG = () => (
  <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <Defs>
      <LinearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#FFD700" />
        <Stop offset="100%" stopColor="#FFA500" />
      </LinearGradient>
    </Defs>
    <Path
      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
      fill="url(#starGrad)"
      stroke="#FFD700"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ProfilePlaceholderSVG = ({ color = "#333", size = 60 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="11" fill={`${color}15`} stroke={color} strokeWidth="1.5" />
    <Path
      d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
      fill={color}
    />
  </Svg>
);

const ChatIconSVG = ({ color = "#333" }) => (
  <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z"
      fill={`${color}20`}
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M8 9h8M8 13h5" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

const SendIconSVG = () => (
  <Svg width="26" height="26" viewBox="0 0 24 24" fill="none">
    <Path
      d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
      fill="rgba(255, 215, 0, 0.3)"
      stroke="#FFD700"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const HeartIconSVG = ({ filled = false, color = "#E91E63" }) => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <Path
      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
      fill={filled ? color : "transparent"}
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// --- ANIMATED CONFESSION CARD ---

const ConfessionCard = ({ index, message, time, location, reactions }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      delay: index * 100,
      tension: 50,
      friction: 7,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleLike = () => {
    setLiked(!liked);
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
  };

  return (
    <Animated.View 
      style={[
        styles.cardContainer,
        {
          transform: [{ scale: scaleAnim }],
          opacity: scaleAnim,
        }
      ]}
    >
      {/* Profile Placeholder */}
      <View style={styles.profileSection}>
        <ProfilePlaceholderSVG color="#5D4E37" size={55} />
      </View>

      {/* Message Bubble */}
      <View style={styles.messageBubble}>
        <Text style={styles.confessionText}>
          {message || "Any text or message user wants to post anonymously"}
        </Text>
        
        <View style={styles.cardFooter}>
          <View style={styles.footerLeft}>
            <Text style={styles.footerText}>{time || "1 hr ago"}</Text>
            <View style={styles.dot} />
            <Text style={styles.footerText}>{location || "nearby"}</Text>
          </View>
          
          <View style={styles.actionIcons}>
            <TouchableOpacity onPress={handleLike} style={styles.iconBtn}>
              <HeartIconSVG filled={liked} color={liked ? "#E91E63" : "#666"} />
              <Text style={[styles.reactionCount, liked && styles.reactionCountActive]}>
                {(reactions || 0) + (liked ? 1 : 0)}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.iconBtn}>
              <ChatIconSVG color="#666" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

export default function ConfessionsScreen() {
  const navigation = useNavigation();
  const [inputText, setInputText] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 40,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const confessions = [
    { id: 1, message: "I secretly love country music even though all my friends hate it 🤠", time: "2 min ago", location: "2km away", reactions: 12 },
    { id: 2, message: "Sometimes I pretend I'm busy just to avoid social events. Best excuse ever!", time: "15 min ago", location: "nearby", reactions: 24 },
    { id: 3, message: "I've been eating cereal for dinner for the past week and I'm not even ashamed", time: "1 hr ago", location: "1km away", reactions: 8 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Subscription Button */}
      <TouchableOpacity 
        style={styles.subscriptionBtn} 
        onPress={() => navigation.navigate('Subscription')}
      >
        <SubscriptionIconSVG />
        <View style={styles.subscriptionGlow} />
      </TouchableOpacity>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <Animated.View 
          style={[
            styles.header,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }
          ]}
        >
          <View style={styles.emojiContainer}>
            <Text style={styles.emojiPlaceholder}>🤫</Text>
            <View style={styles.emojiGlow} />
          </View>
          <Text style={styles.titleText}>
            Anonymous{'\n'}
            <Text style={styles.titleAccent}>confessions</Text>
          </Text>
          <Text style={styles.subtitle}>
            Share your thoughts without judgment
          </Text>
        </Animated.View>

        {/* Confession List */}
        {confessions.map((confession, index) => (
          <ConfessionCard 
            key={confession.id}
            index={index}
            message={confession.message}
            time={confession.time}
            location={confession.location}
            reactions={confession.reactions}
          />
        ))}

        <View style={{ height: 30 }} />
      </ScrollView>

      {/* Input Bar Section */}
      <View style={styles.inputWrapper}>
        <View style={styles.inputGlowEffect} />
        <View style={styles.inputContainer}>
          <View style={styles.profileInputWrapper}>
            <ProfilePlaceholderSVG color="#FFD700" size={45} />
          </View>
          <TextInput
            placeholder="share your thoughts anonymously..."
            placeholderTextColor="#888"
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={280}
          />
          <TouchableOpacity 
            style={[
              styles.sendButton,
              inputText.length > 0 && styles.sendButtonActive
            ]}
            disabled={inputText.length === 0}
          >
            <SendIconSVG />
          </TouchableOpacity>
        </View>
        {inputText.length > 0 && (
          <Text style={styles.charCount}>{inputText.length}/280</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0E0E',
  },
  
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 140,
  },
  
  // Header Styles
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  
  emojiContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  
  emojiPlaceholder: {
    fontSize: 80,
    textShadowColor: 'rgba(255, 215, 0, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  
  emojiGlow: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
    top: -10,
    left: -10,
    zIndex: -1,
  },
  
  titleText: {
    fontSize: 42,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '900',
    lineHeight: 46,
    letterSpacing: -1,
    textShadowColor: 'rgba(255, 215, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  
  titleAccent: {
    color: '#FFD700',
  },
  
  subtitle: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  
  // Card Styles
  cardContainer: {
    backgroundColor: '#E8DCC8',
    borderRadius: 22,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#3D3328',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  
  profileSection: {
    width: '18%',
    alignItems: 'center',
    paddingTop: 4,
  },
  
  messageBubble: {
    flex: 1,
    backgroundColor: '#F5E6D3',
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#3D3328',
    padding: 14,
    marginLeft: 8,
  },
  
  confessionText: {
    fontSize: 15,
    color: '#2C2416',
    lineHeight: 22,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(61, 51, 40, 0.15)',
  },
  
  footerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  
  footerText: {
    fontSize: 11,
    color: '#6B5D4F',
    fontWeight: '600',
  },
  
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#6B5D4F',
  },
  
  actionIcons: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  
  iconBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  
  reactionCount: {
    fontSize: 11,
    color: '#666',
    fontWeight: '700',
  },
  
  reactionCountActive: {
    color: '#E91E63',
  },
  
  // Input Bar Styles
  inputWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 30 : 20,
    paddingTop: 12,
    backgroundColor: '#0F0E0E',
  },
  
  inputGlowEffect: {
    position: 'absolute',
    top: -20,
    left: 0,
    right: 0,
    height: 40,
    background: 'linear-gradient(180deg, transparent, #0F0E0E)',
  },
  
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1816',
    borderWidth: 2.5,
    borderColor: '#FFD700',
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 10,
    minHeight: 70,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  
  profileInputWrapper: {
    marginRight: 10,
    marginTop: 4,
  },
  
  textInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '500',
    maxHeight: 80,
    paddingTop: Platform.OS === 'ios' ? 8 : 0,
  },
  
  sendButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    opacity: 0.5,
  },
  
  sendButtonActive: {
    opacity: 1,
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
  },
  
  charCount: {
    fontSize: 11,
    color: '#666',
    textAlign: 'right',
    marginTop: 6,
    marginRight: 8,
    fontWeight: '600',
  },
  
  // Subscription Button
  subscriptionBtn: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 55 : 50,
    right: 20,
    zIndex: 10,
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    padding: 10,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: 'rgba(255, 215, 0, 0.4)',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  
  subscriptionGlow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 14,
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
    top: 0,
    left: 0,
    zIndex: -1,
  },
});