import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity,Image } from 'react-native';

export default function SignupStep() {
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
        {['Male', 'Female', 'Non-binary'].map((g) => (
          <TouchableOpacity key={g} style={styles.genderBtn}>
            <Text style={styles.genderText}>{g}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.genderRow}>
        {['Prefer not to say', 'Self-describe'].map((g) => (
          <TouchableOpacity key={g} style={styles.genderBtn}>
            <Text style={styles.genderText}>{g}</Text>
          </TouchableOpacity>
        ))}
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
  },

  genderText: {
    fontFamily: 'Urbanist-Medium',
    fontSize: 13,
  },
 imageContainer: {
    marginBottom: 30,
    alignItems: 'center',
    width: '90%', // Ensures the container allows the image to expand
  },
  illustrationImage: {
    width: '90%',     // Takes up the full width of the container
    aspectRatio: 1,    // Keeps the height exactly equal to the width (Square)
    borderRadius: 20,
  },
});
