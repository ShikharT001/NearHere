import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function GetStartedScreen({ navigation }) {
  return (
    <LinearGradient
      colors={['#EAF4FF', '#FCE4EC']}
      style={styles.container}
    >
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.appName}>near{'\n'}here</Text>
      </View>

      {/* Hero Image */}
      <Image
        source={require('../../../assets/images/hero.png')}
        style={styles.heroImage}
        resizeMode="contain"
      />

      {/* Features */}
      <View style={styles.features}>
        <View style={styles.featureItem}>
          <Image
            source={require('../../../assets/icons/star.png')}
            style={styles.icon}
          />
          <Text style={styles.featureText}>4.5{'\n'}Rating</Text>
        </View>

        <View style={styles.featureItem}>
          <Image
            source={require('../../../assets/icons/verified.png')}
            style={styles.icon}
          />
          <Text style={styles.featureText}>
            100%{'\n'}verified profiles
          </Text>
        </View>
      </View>

      {/* Get Started Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
        activeOpacity={0.85}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },

  logoContainer: {
    alignItems: 'center',
    marginTop: 50,
  },

  logo: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },

  appName: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 36,
    textAlign: 'center',
    color: '#111',
    lineHeight: 40,
  },

  heroImage: {
    width: '100%',
    height: 220,
    marginVertical: 20,
  },

  features: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },

  featureItem: {
    alignItems: 'center',
  },

  icon: {
    width: 28,
    height: 28,
    marginBottom: 6,
  },

  featureText: {
    fontFamily: 'Urbanist-Medium',
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
  },

  button: {
    backgroundColor: '#FF6F9C',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 30,
  },

  buttonText: {
    fontFamily: 'Urbanist-SemiBold',
    fontSize: 18,
    color: '#000',
  },
});
