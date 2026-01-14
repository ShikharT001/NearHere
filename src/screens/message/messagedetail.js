import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Modal,
  TouchableWithoutFeedback
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ChatDetailScreen() {
  const navigation = useNavigation();
  const [message, setMessage] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const [attachMenuVisible, setAttachMenuVisible] = useState(false);

  const toggleMenu = () => setMenuVisible(!menuVisible);
  const toggleAttachMenu = () => setAttachMenuVisible(!attachMenuVisible);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* --- Aesthetic Header --- */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
            <Ionicons name="arrow-back" size={26} color="black" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.userInfoRow} 
            onPress={() => navigation.navigate('ProfileView')}
            activeOpacity={0.7}
          >
            <View style={styles.avatarContainer}>
              <Ionicons name="person-outline" size={22} color="black" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.usernameText}>username</Text>
              <Text style={styles.statusText}>online</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Call')}>
            <Ionicons name="call-outline" size={22} color="black" />
          </TouchableOpacity>
          
          {/* VIDEO CALL ICON ADDED BACK */}
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="videocam-outline" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} onPress={toggleMenu}>
            <Ionicons name="ellipsis-vertical" size={22} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* --- Vertical Attachment Menu --- */}
      {attachMenuVisible && (
        <View style={styles.attachMenuWrapper}>
          <View style={styles.attachMenuPill}>
            <TouchableOpacity style={styles.attachBtn}><Ionicons name="location" size={26} color="#2D3436" /></TouchableOpacity>
            <TouchableOpacity style={styles.attachBtn}><Ionicons name="mic" size={26} color="#2D3436" /></TouchableOpacity>
            <TouchableOpacity style={styles.attachBtn}><Ionicons name="image" size={26} color="#2D3436" /></TouchableOpacity>
          </View>
        </View>
      )}

      {/* --- Chat Content Area --- */}
      <ScrollView 
        contentContainerStyle={styles.chatArea} 
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.receivedBubble}>
          <Text style={styles.messageText}>Hey! How are you doing today?</Text>
          <Text style={styles.timeTextReceived}>10:00 AM</Text>
        </View>
        
        <View style={styles.sentBubble}>
          <Text style={styles.sentMessageText}>I'm doing great! Just working on this new UI.</Text>
          <Text style={styles.timeTextSent}>10:02 AM</Text>
        </View>
      </ScrollView>

      {/* --- Responsive Input Bar --- */}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.cameraBtn}>
            <Ionicons name="camera-outline" size={26} color="#2D3436" />
          </TouchableOpacity>
          
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Type a message..."
              value={message}
              onChangeText={setMessage}
              placeholderTextColor="#A0A0A0"
            />
            <TouchableOpacity onPress={toggleAttachMenu} style={styles.plusIcon}>
              <Ionicons 
                name={attachMenuVisible ? "close-circle" : "add-circle-outline"} 
                size={28} 
                color="black" 
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.sendBtn}>
              <Ionicons name="send" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>

      {/* --- 3-Dot Options Modal --- */}
      <Modal transparent visible={menuVisible} animationType="fade">
        <TouchableWithoutFeedback onPress={toggleMenu}>
          <View style={styles.modalOverlay}>
            <View style={styles.menuBox}>
              <MenuOption icon="notifications-outline" label="Mute Notifications" />
              <MenuOption icon="trash-outline" label="Clear Chat" />
              <MenuOption icon="alert-circle-outline" label="Report User" />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
}

const MenuOption = ({ icon, label }) => (
  <TouchableOpacity style={styles.menuOption}>
    <Ionicons name={icon} size={20} color="black" style={{ marginRight: 12 }} />
    <Text style={styles.menuText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4C2C2' },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 16, 
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)'
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  userInfoRow: { flexDirection: 'row', alignItems: 'center', marginLeft: 8 },
  avatarContainer: { 
    width: 42, 
    height: 42, 
    borderRadius: 21, 
    borderWidth: 1.5, 
    borderColor: 'black', 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'white' 
  },
  textContainer: { marginLeft: 10 },
  usernameText: { fontSize: 17, fontWeight: '700', color: 'black' },
  statusText: { fontSize: 12, color: '#444', fontWeight: '500' },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  iconButton: { marginLeft: 18 },

  // Attachment Menu Style
  attachMenuWrapper: { position: 'absolute', bottom: 90, right: 60, zIndex: 1000 },
  attachMenuPill: { 
    backgroundColor: '#F4C2C2', 
    width: 58, 
    borderRadius: 30, 
    paddingVertical: 12, 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 10
  },
  attachBtn: { marginVertical: 12 },

  // Chat Bubbles
  chatArea: { flexGrow: 1, padding: 16, justifyContent: 'flex-end' },
  receivedBubble: { 
    backgroundColor: 'white', 
    padding: 14, 
    borderRadius: 20, 
    borderBottomLeftRadius: 4,
    alignSelf: 'flex-start', 
    marginBottom: 16, 
    maxWidth: '80%',
    elevation: 1
  },
  sentBubble: { 
    backgroundColor: '#2D3436', 
    padding: 14, 
    borderRadius: 20, 
    borderBottomRightRadius: 4,
    alignSelf: 'flex-end', 
    marginBottom: 16, 
    maxWidth: '80%',
    elevation: 2
  },
  messageText: { fontSize: 15, color: 'black', lineHeight: 20 },
  sentMessageText: { fontSize: 15, color: 'white', lineHeight: 20 },
  timeTextReceived: { fontSize: 10, color: '#888', marginTop: 4, alignSelf: 'flex-end' },
  timeTextSent: { fontSize: 10, color: '#AAA', marginTop: 4, alignSelf: 'flex-end' },

  // Footer Input
  footer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 16, 
    paddingBottom: Platform.OS === 'ios' ? 30 : 16,
    paddingTop: 10
  },
  cameraBtn: { 
    width: 48, 
    height: 48, 
    borderRadius: 24, 
    backgroundColor: '#E5E9EB', 
    justifyContent: 'center', 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#BCC2C5'
  },
  inputWrapper: { 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: 'white', 
    borderRadius: 28, 
    marginLeft: 12,
    paddingHorizontal: 16, 
    height: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3
  },
  input: { flex: 1, fontSize: 16, color: '#2D3436' },
  plusIcon: { paddingHorizontal: 6 },
  sendBtn: { marginLeft: 4 },

  // Modal Style
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.15)' },
  menuBox: { 
    position: 'absolute', 
    top: 60, 
    right: 20, 
    backgroundColor: 'white', 
    borderRadius: 16, 
    padding: 8, 
    width: 210,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2
  },
  menuOption: { flexDirection: 'row', alignItems: 'center', padding: 14 },
  menuText: { fontSize: 15, color: '#2D3436', fontWeight: '500' }
});