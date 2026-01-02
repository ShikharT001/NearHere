import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');

// SVG Heart for the center button
const HeartIcon = () => (
  <Svg width="35" height="35" viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      fill="#FF007F"
    />
  </Svg>
);

export default function MatchScreen() {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        
        {/* Main White Content Area */}
        <View style={styles.whiteOverlay}>
          
          <Text style={styles.headerText}>
            user’s profile photo or{'\n'}post or reel
          </Text>

          {/* Corrected Image Implementation */}
          <View style={styles.illustrationContainer}>
            <Image
              source={require('../../../assets/images/Photos-cuate-2.png')}
              style={styles.illustration}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.username}>@username</Text>

          {/* Buttons Row */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.actionButton, styles.rejectBtn]}>
              <Text style={styles.buttonText}>Reject</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.heartCircle}>
              <HeartIcon />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.actionButton, styles.loveBtn]}>
              <Text style={styles.buttonText}>Love</Text>
            </TouchableOpacity>
          </View>

        </View>

        {/* This creates the F4C2C2 strip at the bottom */}
        <View style={styles.bottomPinkStrip} />
        
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4C2C2', // Full screen base color
  },
  safeArea: {
    flex: 1,
  },
  whiteOverlay: {
    flex: 1,
    backgroundColor: '#F9F9F9', // White content area
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  bottomPinkStrip: {
    height: 20, // Adjust this to show more or less of the pink background
    backgroundColor: 'transparent', // Let the container color show through
  },
  headerText: {
    fontFamily: 'Urbanist-Regular',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 100,
    color: '#000',
    lineHeight: 28,
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  illustration: {
    width: width * 0.85,
    height: width * 0.85,
  },
  username: {
    fontFamily: 'Urbanist-Regular',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 30,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingBottom: 20,
  },
  actionButton: {
    width: width * 0.3,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    
  },
  rejectBtn: {
    backgroundColor: '#FF4141',
  },
  loveBtn: {
    backgroundColor: '#007FFF',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  heartCircle: {
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});