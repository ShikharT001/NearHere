import { View, Text, StyleSheet, Image, TextInput, SafeAreaView } from 'react-native';
import React, { useState } from 'react';

export default function DateStep() {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
      
            {/* 2. IMAGE SECTION */}
            <View style={styles.imageContainer}>
            <Image
                source={require('../../../assets/images/Calendar-pana.png')} 
                style={styles.illustrationImage}
                resizeMode="contain"
            />
            </View>

        {/* 3. INPUT SECTION */}
        <View style={styles.selectionContainer}>
          <Text style={styles.label}>Select your DoB</Text>

          <View style={styles.row}>
            {/* Day */}
            <View style={styles.inputBox}>
              <TextInput
                style={styles.inputText}
                placeholder="D"
                keyboardType="numeric"
                maxLength={2}
                value={day}
                onChangeText={setDay}
              />
            </View>

            <Text style={styles.separator}>-</Text>

            {/* Month */}
            <View style={styles.inputBox}>
              <TextInput
                style={styles.inputText}
                placeholder="M"
                keyboardType="numeric"
                maxLength={2}
                value={month}
                onChangeText={setMonth}
              />
            </View>

            <Text style={styles.separator}>-</Text>

            {/* Year */}
            <View style={[styles.inputBox, { minWidth: 90 }]}>
              <TextInput
                style={styles.inputText}
                placeholder="Year"
                keyboardType="numeric"
                maxLength={4}
                value={year}
                onChangeText={setYear}
              />
            </View>
          </View>
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
    paddingHorizontal: 25,
    paddingTop: 40,
  },
  heading: {
    // Note: If app stays blank, remove fontFamily temporarily to check
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
    lineHeight: 35,
  },
  imageContainer: {
    width: '100%',
    height: '45%', // Using percentage ensures it shows up
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  illustrationImage: {
    width: '200%',
    height: '200%',
  },
  selectionContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  label: {
    fontFamily: 'Indie-Flower',
    fontSize: 22,
    marginBottom: 15,
    color: '#000',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#000',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2, // Slight shadow for depth
  },
  inputText: {
    fontFamily: 'Indie-Flower',
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    width: '100%',
  },
  separator: {
    fontSize: 25,
    marginHorizontal: 12,
    fontWeight: 'bold',
  },
});