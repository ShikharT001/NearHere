import React, { useState } from 'react'; // Added useState
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';

export default function SignupStep() {
  // State to keep track of the selected gender
  const [selectedGender, setSelectedGender] = useState(null);

  const renderGenderButton = (g) => (
    <TouchableOpacity 
      key={g} 
      // Apply "selectedBtn" style if this button matches the state
      style={[styles.genderBtn, selectedGender === g && styles.selectedBtn]} 
      onPress={() => setSelectedGender(g)}
    >
      <Text style={[styles.genderText, selectedGender === g && styles.selectedGenderText]}>
        {g}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>

      {/* Name */}
      <TextInput
        placeholder="Enter your name"
        style={styles.input}
        placeholderTextColor="#999"
      />

      {/* Gender */}
      <Text style={styles.label}>Gender :</Text>

      <View style={styles.genderRow}>
        {['Male', 'Female', 'Non-binary'].map((g) => renderGenderButton(g))}
      </View>

      <View style={styles.genderRow}>
        {['Prefer not to say', 'Self-describe'].map((g) => renderGenderButton(g))}
      </View>

      {/* 1. IMAGE (Top) */}
      <View style={styles.imageContainer}>
        <Image 
          source={require('../../../assets/images/Gender-identity-rafiki-1.png')} 
          style={styles.illustrationImage}
          resizeMode="contain"
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {},

  input: {
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 20,
    fontFamily: 'Urbanist-Regular',
  },

  label: {
    fontFamily: 'Urbanist-SemiBold',
    marginBottom: 10,
  },

  genderRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },

  genderBtn: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'transparent', // Added to prevent layout jump on selection
  },

  // Style for the selected button
  selectedBtn: {
    backgroundColor: '#000', // Change this color to your brand color (e.g., Blue or Black)
    borderColor: '#000',
  },

  genderText: {
    fontFamily: 'Urbanist-Medium',
    fontSize: 13,
    color: '#000',
  },

  // Style for the selected text
  selectedGenderText: {
    color: '#fff',
  },

  imageContainer: {
    marginBottom: 30,
    alignItems: 'center',
    width: '90%', 
  },
  illustrationImage: {
    width: '90%',     
    aspectRatio: 1,    
    borderRadius: 20,
  },
});