import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Animated,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function RadarScreen() {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideUpAnim] = useState(new Animated.Value(50));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(slideUpAnim, {
        toValue: 0,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      
      <ImageBackground
        source={require('../../../assets/images/snap-chatmap.png')}
        style={styles.illustration}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.safeArea}>
          
          <View style={styles.cardContainer}>
            <Animated.View 
              style={[
                styles.scanCard,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideUpAnim }],
                }
              ]}
            >
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons name="radar" size={40} color="#FF4567" />
              </View>

              <Text style={styles.scanText}>Scanning for new friends nearby...</Text>

              <View style={styles.infoRow}>
                <View style={styles.infoItem}>
                  <Ionicons name="people" size={16} color="#666" />
                  <Text style={styles.infoText}>12 nearby</Text>
                </View>
                <View style={styles.infoDivider} />
                <View style={styles.infoItem}>
                  <Ionicons name="location" size={16} color="#666" />
                  <Text style={styles.infoText}>5 km</Text>
                </View>
              </View>
              
              <TouchableOpacity 
                style={styles.expandBtn} 
                activeOpacity={0.8}
              >
                <Text style={styles.expandText}>Expand Radius</Text>
                <Ionicons name="arrow-forward" size={18} color="white" />
              </TouchableOpacity>
            </Animated.View>
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
  cardContainer: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    alignItems: 'center',
  },
  scanCard: {
    backgroundColor: 'white',
    width: width * 0.9,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FFE5E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  scanText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 16,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  infoDivider: {
    width: 1,
    height: 16,
    backgroundColor: '#DDD',
    marginHorizontal: 16,
  },
  expandBtn: {
    backgroundColor: '#FF4567',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '100%',
    justifyContent: 'center',
    shadowColor: '#FF4567',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  expandText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
});