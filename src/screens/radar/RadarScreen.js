import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';


export default function RadarScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Container for the map/radar illustration */}
      <View style={styles.illustrationContainer}>
        <Image
          // Ensure this path is 100% correct relative to this file
          source={require('../../../assets/images/snap-chatmap.png')}
          style={styles.illustration}
          resizeMode="cover" // Changed to cover to fill the screen like a map
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4C96F0', // Blue background
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  illustration: {
    // Now 'width' is defined, so this won't error
    width: '100%', 
    height: '100%', // Makes the map fill the whole screen height
  },
});