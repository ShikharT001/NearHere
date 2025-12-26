import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  Image,
  SafeAreaView,
} from 'react-native';

const LANGUAGES = ['English', 'Hindi', 'Spanish', 'French', 'German'];

export default function LanguageStep({ onNext }) {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      
      {/* 1. DROPDOWN OPTION (Reduced Width & Centered) */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.dropdownTrigger}
          onPress={() => setVisible(true)}
        >
          <Text style={styles.selectText}>
            {selected || 'Select Your Language'}
          </Text>
          {/* Simple Chevron Arrow */}
          <Text style={styles.chevron}>▼</Text> 
        </TouchableOpacity>
      </View>

      {/* 2. IMAGE PLACEHOLDER (Square Width/Height) */}
      <View style={styles.imageContainer}>
        <Image 
          source={require('../../../assets/images/Learning-languages-bro-1.png')} 
          style={styles.illustrationImage}
          resizeMode="contain"
        />
      </View>

      {/* 3. NEXT BUTTON (Bottom Right) */}
     

      {/* DROPDOWN MODAL */}
      <Modal transparent visible={visible} animationType="fade">
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <View style={styles.dropdownMenu}>
            <FlatList
              data={LANGUAGES}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    setSelected(item);
                    setVisible(false);
                  }}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Light clean background
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
  },
  dropdownTrigger: {
    width: '75%', // Reduced width
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    // Soft Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectText: {
    fontFamily: 'Indie-Flower',
    fontSize: 20,
    color: '#111',
  },
  chevron: {
    fontSize: 12,
    color: '#666',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationImage: {
    width: 300,  // Square width
    height: 300, // Square height
    borderRadius: 20,
  },
  
 
  /* MODAL STYLES */
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownMenu: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: '80%',
    maxHeight: '40%',
    paddingVertical: 10,
    overflow: 'hidden',
  },
  option: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  optionText: {
    fontFamily: 'Urbanist-Regular',
    fontSize: 16,
    textAlign: 'center',
  },
});