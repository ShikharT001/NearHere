import { View, Text, StyleSheet, Image, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Ensure you have vector-icons installed

export default function SigninStep() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* 1. TOP ILLUSTRATION */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../../../assets/images/Envelope-bro 1.png')} // Update with your actual file name
            style={styles.illustrationImage}
            resizeMode="contain"
          />
        </View>

        {/* 2. EMAIL INPUT */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.mainInput}
            placeholder="Enter your e-mail"
            placeholderTextColor="#444"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* 3. INFO SUBTEXT */}
        <View style={styles.infoContainer}>
          <MaterialCommunityIcons name="information" size={18} color="#666" />
          <Text style={styles.infoText}>Don't worry we won't spam you</Text>
        </View>

        {/* 4. PASSWORD INPUTS */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.mainInput}
            placeholder="Enter password"
            placeholderTextColor="#444"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.mainInput}
            placeholder="Confirm password"
            placeholderTextColor="#444"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        {/* 5. TERMS CHECKBOX */}
        <TouchableOpacity 
          style={styles.checkboxContainer} 
          onPress={() => setAgree(!agree)}
        >
          <View style={[styles.checkbox, agree && styles.checkboxSelected]}>
            {agree && <MaterialCommunityIcons name="check" size={14} color="#FFF" />}
          </View>
          <Text style={styles.termsText}>
            By signing up, you agree to our Terms.
          </Text>
        </TouchableOpacity>


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
    paddingTop: 20,
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  illustrationImage: {
    width: '140%',
    height: '140%',
  },
  inputWrapper: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#000',
    paddingHorizontal: 25,
    height: 55,
    justifyContent: 'center',
    marginBottom: 15,
  },
  mainInput: {
    fontFamily: 'Indie-Flower',
    fontSize: 20,
    color: '#000',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginBottom: 15,
  },
  infoText: {
    fontFamily: 'Indie-Flower',
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    marginLeft: 15,
    marginTop: 5,
    paddingRight: 40,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#FFF',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#1A1A1A',
  },
  termsText: {
    fontFamily: 'Indie-Flower',
    fontSize: 16,
    color: '#000',
    lineHeight: 20,
  },
});