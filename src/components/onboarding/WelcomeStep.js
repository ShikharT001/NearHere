import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function WelcomeStep({ onNext }) {
  return (
    <View style={styles.fullScreen}>
      {/* 1. Full Screen Fixed Background */}
      <Image 
        source={require('../../../assets/images/CreateProfile.png')} 
        style={styles.absoluteImage} 
        resizeMode="cover" 
      />

      {/* 2. Content Overlay */}
      <View style={styles.overlay}>
        <View style={styles.textSection}>
          <Text style={styles.outlineText}>Spare us a little time...</Text>
          <Text style={styles.lifetimeText}>LIFETIME</Text>
        </View>
        <View style={styles.footerRow}>
         <Text style={styles.footerText}>Lets Create Your Profile</Text>
         </View>

        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    width: width,
    height: height,
    position: 'fixed', // Breaks out of parent padding
    top: 0,
    left: 0,
  },
  absoluteImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingVertical: 60, // Adjust based on status bar
  },
  textSection: {
    marginTop: 40,
    alignItems: 'center',
  },
  outlineText: {
    fontSize: 24,
    color: '#9C7A7A',
    textAlign: 'center',
  },
  lifetimeText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#9C7A7A',
    letterSpacing: 2,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: '',
  },
  footerText: {
    flex: 1,
    fontSize: 18,
    color: '#333',
    textAlign:'center',
  },
  nextBtn: {
    backgroundColor: '#111',
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 30,
  },
  nextBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});