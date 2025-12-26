import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Dimensions
} from 'react-native';

const { height } = Dimensions.get('window');

export default function GetStartedScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../../../assets/images/hero.jpg')} 
      style={styles.container}
      resizeMode="cover"
    >
      {/* Ensures the status bar doesn't create extra gaps */}
      <StatusBar barStyle="dark-content" transparent backgroundColor="transparent" />
      
      
        
        {/* LOGO SECTION */}
        <View style={styles.logoSection}>
          <Image 
            source={require('../../../assets/images/logo.png')} 
            style={styles.logo} 
            resizeMode="contain"
          />
        </View>

        {/* SPACER - flex: 1 keeps this area dynamic but fixed */}
        <View style={styles.spacer} />

        {/* BOTTOM CONTENT AREA */}
        <View style={styles.bottomContent}>
            {/* STATS SECTION */}
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Image 
                  source={require('../../../assets/icons/star.png')} 
                  style={styles.statIcon} 
                />
                <Text style={styles.statValue}>4.5</Text>
                <Text style={styles.statLabel}>Rating</Text>
              </View>

              <View style={styles.statItem}>
                <Image 
                  source={require('../../../assets/icons/verified.png')} 
                  style={styles.statIcon} 
                />
                <Text style={styles.statValue}>100%</Text>
                <Text style={styles.statLabel}>verified profiles</Text>
              </View>
            </View>

            {/* BUTTON */}
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.9}
              onPress={() => navigation.replace('Onboarding')}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
        </View>
        
      
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height, // Forces the container to exactly the window height
  },
  overlay: {
    flex: 1,
    paddingHorizontal: 25,
    paddingBottom: 20, // Reduced padding to ensure it fits
  },
  logoSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  logo: {
    width: 320,  // Reduced from 200 to ensure it fits on smaller screens
    height: 320,
  },
  spacer: {
    flex: 1, 
  },
  bottomContent: {
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 25,
  },
  statItem: {
    alignItems: 'center',
  },
  statIcon: {
    width: 40,
    height: 40,
    marginBottom: 5,
    resizeMode: 'contain',
  },
  statValue: {
    fontWeight: '700',
    fontSize: 16,
    color: '#000',
  },
  statLabel: {
    fontSize: 13,
    color: '#000',
    textAlign: 'center',
  },
  button: {
  backgroundColor: '#FF7494',
  borderRadius: 15, // Matches the rounded look of your screenshot
  paddingVertical: 15,
  alignItems: 'center',
  
  // WIDTH CONTROL
  width: '80%',           // Reduces width to 80% of the screen
  alignSelf: 'center',    // Centers the button horizontally
  
  borderWidth: 1,
  borderColor: '#000',
  
  // Shadow / Neumorphic effect
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 1,
  shadowRadius: 0,
  elevation: 5,
},
  buttonText: {
    fontWeight: '500',
    fontSize: 24, // Reduced from 32 to prevent overflow
    color: '#000',
  },
});