import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';

// Add onNext and onGoToSignup props here
export default function LoginStep({ onNext, onGoToSignup }) {
  return (
    <View style={styles.container}>
      
      {/* 1. IMAGE (Top) */}
      <View style={styles.imageContainer}>
        <Image 
          source={require('../../../assets/images/Generating-new-leads-pana.png')} 
          style={styles.illustrationImage}
          resizeMode="contain"
        />
      </View>

      {/* 2. LOGIN FORM */}
      <View style={styles.formContainer}>
        <TextInput
          placeholder="Email"
          style={styles.input}
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#999"
        />

        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      {/* 3. LOGIN BUTTON - Now triggers onNext */}
      <TouchableOpacity 
        style={styles.loginBtn} 
        activeOpacity={0.8}
        onPress={onNext} 
      >
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      {/* 4. CREATE ACCOUNT - Now triggers onGoToSignup */}
      <TouchableOpacity onPress={onGoToSignup}>
        <Text style={styles.footer}>
          Don’t have an account? <Text style={styles.link}>Create account</Text>
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 20,
  },
  imageContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  illustrationImage: {
    width: 250,
    height: 250, 
    borderRadius: 20,
  },
  formContainer: {
    width: '100%',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 15,
    fontFamily: 'Urbanist-Regular',
    borderWidth: 1,
    borderColor: '#eee',
  },
  forgot: {
    alignSelf: 'flex-end',
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    fontFamily: 'Urbanist-Medium',
  },
  loginBtn: {
    width: '100%',
    backgroundColor: '#111',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  loginText: {
    color: '#fff',
    fontFamily: 'Indie-Flower',
    fontSize: 18,
  },
  footer: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'Urbanist-Regular',
    textAlign: 'center',
  },
  link: {
    color: '#6A5ACD',
    fontFamily: 'Indie-Flower',
    textDecorationLine: 'underline',
  },
});