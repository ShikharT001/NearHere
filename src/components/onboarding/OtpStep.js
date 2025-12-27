import { View, Text, StyleSheet, Image, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

export default function OtpStep() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* 1. PHONE NUMBER INPUT */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.mainInput}
            placeholder="Enter phone number"
            placeholderTextColor="#444"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        {/* 2. SUBTEXT */}
        <View style={styles.textContainer}>
          <Text style={styles.subText}>Check your inbox, your OTP</Text>
          <Text style={styles.subText}>is waiting.</Text>
        </View>

        {/* 3. OTP INPUT */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.mainInput}
            placeholder="Enter OTP"
            placeholderTextColor="#444"
            keyboardType="numeric"
            value={otp}
            onChangeText={setOtp}
          />
        </View>

        {/* 4. ILLUSTRATION IMAGE */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../../../assets/images/Mobile encryption-cuate.png')} 
            style={styles.illustrationImage}
            resizeMode="contain"
          />
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, 
  },
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 60,
    alignItems: 'center',
  },
  inputWrapper: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 40, // High border radius for the pill shape
    borderWidth: 1,
    borderColor: '#000',
    paddingHorizontal: 25,
    height: 65,
    justifyContent: 'center',
    marginBottom: 25,
  },
  mainInput: {
    fontFamily: 'Indie-Flower', // Matches the handwritten font style
    fontSize: 22,
    color: '#000',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  subText: {
    fontFamily: 'Indie-Flower',
    fontSize: 18,
    color: '#666',
    lineHeight: 24,
  },
  imageContainer: {
    width: '100%',
    height: '40%',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationImage: {
    width: '120%',
    height: '120%',
  },
  nextButton: {
    backgroundColor: '#1A1A1A',
    paddingVertical: 15,
    paddingHorizontal: 45,
    borderRadius: 30,
    position: 'absolute',
    bottom: 40,
    right: 30,
  },
  nextText: {
    color: '#fff',
    fontSize: 24,
  },
});