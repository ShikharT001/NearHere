import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

// --- SVG ICON COMPONENTS ---

const ProfilePlaceholderSVG = ({ color = "#333" }) => (
  <Svg width="60" height="60" viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
      fill={color}
    />
  </Svg>
);

const ChatIconSVG = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z"
      stroke="#333"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M8 9h8M8 13h5" stroke="#333" strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

const SendIconSVG = () => (
  <Svg width="30" height="30" viewBox="0 0 24 24" fill="none">
    <Path
      d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// --- REUSABLE COMPONENTS ---

const ConfessionCard = () => (
  <View style={styles.cardContainer}>
    {/* Profile Placeholder Image Area */}
    <View style={styles.profileSection}>
      <ProfilePlaceholderSVG />
    </View>

    {/* Message Bubble */}
    <View style={styles.messageBubble}>
      <Text style={styles.confessionText}>
        Any text or message user wants to post anonymously
      </Text>
      
      <View style={styles.cardFooter}>
        <View style={styles.footerLeft}>
          <Text style={styles.footerText}>posted 1 hr ago</Text>
          <Text style={styles.footerText}>location</Text>
        </View>
        <ChatIconSVG />
      </View>
    </View>
  </View>
);

export default function ConfessionsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Header Section */}
        <View style={styles.header}>
          {/* Emoji Placeholder */}
          <View style={styles.emojiPlaceholder}>
             <Text style={{ fontSize: 70 }}>🤫</Text>
          </View>
          <Text style={styles.titleText}>Anonymous{'\n'}confessions</Text>
        </View>

        {/* Confession List */}
        <ConfessionCard />
        <ConfessionCard />
        <ConfessionCard />

      </ScrollView>

      {/* Input Bar Section */}
      <View style={styles.inputWrapper}>
        <View style={styles.inputContainer}>
          <View style={{ marginRight: 10 }}>
            <ProfilePlaceholderSVG color="white" />
          </View>
          <TextInput
            placeholder="share your thoughts anonymously..."
            placeholderTextColor="#999"
            style={styles.textInput}
          />
          <TouchableOpacity>
            <SendIconSVG />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B1919',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  header: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  emojiPlaceholder: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  titleText: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 36,
    color: 'white',
    textAlign: 'center',
    fontWeight: '900',
    lineHeight: 38,
  },
  cardContainer: {
    backgroundColor: '#EBE4D8', // Light cream 
    borderRadius: 25,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333',
  },
  profileSection: {
    width: '20%',
    alignItems: 'center',
  },
  messageBubble: {
    flex: 1,
    backgroundColor: '#F3DCC2', // Peach/Tan
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#333',
    padding: 12,
    marginLeft: 5,
  },
  confessionText: {
    fontFamily: 'Urbanist-Regular',
    fontSize: 14,
    color: '#333',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  footerLeft: {
    flexDirection: 'row',
    gap: 15,
  },
  footerText: {
    fontSize: 10,
    color: '#777',
  },
  // Input Bar
  inputWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 15,
    paddingBottom: 30,
    backgroundColor: '#1B1919',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    borderWidth: 2,
    borderColor: '#FFD700', // Gold border
    borderRadius: 20,
    paddingHorizontal: 8,
  
    height: 75,
  },
  textInput: {
    flex: 1,
    color: 'white',
    fontSize: 15,
  },
});