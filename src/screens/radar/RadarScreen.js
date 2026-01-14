import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function RadarScreen() {
  return (
    <View style={styles.container}>
      {/* Translucent StatusBar to let the map flow underneath */}
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      
      {/* MAP BACKGROUND SECTION */}
      <ImageBackground
        source={require('../../../assets/images/snap-chatmap.png')}
        style={styles.illustration}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.safeArea}>
          
        
          {/* SCANNING CARD SECTION - Positioned near the bottom */}
          <View style={styles.cardContainer}>
            <View style={styles.scanCard}>
              <Text style={styles.scanText}>Scanning for new friends nearby...</Text>
              
              <TouchableOpacity 
                style={styles.expandBtn} 
                activeOpacity={0.8}
              >
                <Text style={styles.expandText}>Expand Radius</Text>
              </TouchableOpacity>
            </View>
          </View>

        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  illustration: {
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: 'black',
    // Added a subtle glow to ensure text is visible on any map part
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  cardContainer: {
    position: 'absolute',
    bottom: 50, // Adjusted because the bottom nav was removed
    width: '100%',
    alignItems: 'center',
  },
  scanCard: {
    backgroundColor: 'white',
    width: width * 0.88,
    borderRadius: 30,
    padding: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'black',
    // Professional Neumorphic/Bold Shadow
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8,
  },
  scanText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  expandBtn: {
    backgroundColor: '#FF7494', // Theme Pink
    paddingVertical: 14,
    paddingHorizontal: 45,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: 'black',
  },
  expandText: {
    fontSize: 18,
    fontWeight: '900',
    color: 'black',
    textTransform: 'none',
  },
});