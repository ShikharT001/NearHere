import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location'; // Import Expo Location

export default function LocationStep() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGetLocation = async () => {
    setLoading(true);
    try {
      // 1. Request Permission
      let { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'We need location access to show you people nearby.');
        setLoading(false);
        return;
      }

      // 2. Get Current Position
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      
      Alert.alert('Success', 'Location secured!');
      console.log('User Location:', currentLocation.coords);
      
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while fetching location.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* CLICKABLE LOCATION BUTTON */}
        <TouchableOpacity 
          style={styles.locationButton} 
          onPress={handleGetLocation}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={styles.locationText}>
              {location ? "Location Saved ✓" : "Select Your Location"}
            </Text>
          )}
        </TouchableOpacity>

        <View style={styles.imageContainer}>
          <Image 
            source={require('../../../assets/images/Globalization-pana 1.png')} 
            style={styles.illustrationImage}
            resizeMode="contain"
          />
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1, paddingHorizontal: 25, paddingTop: 40, alignItems: 'center' },
  heading: {
    fontSize: 28,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 38,
  },
  locationButton: {
    backgroundColor: '#FFF',
    width: '100%',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#000',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
  },
  locationText: { fontSize: 20, color: '#000', fontWeight: '500' },
  imageContainer: {
    width: '100%',
    height: '45%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationImage: { width: '120%', height: '120%' },
  
});