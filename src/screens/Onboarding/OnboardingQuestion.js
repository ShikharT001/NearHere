import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

const MultiStepForm = () => {
  // 1. Define your data array (This makes it easy to add 10+ screens)
  const steps = [
    {
      id: 1,
      heading: "Weart: taken, open, or tangled? 😉",
      subHeading: "What makes you smile? Pick your passions",
      options: ["Single", "Married", "Complicated"],
      image: require('../../../assets/images/Long_distance_relationship-pana_1.png'), // Replace with your local paths
      bgColor: '#F8BBD0'
    },
    {
      id: 2,
      heading: "What's your vibe?",
      subHeading: "Help us find people like you",
      options: ["Adventurous", "Homebody", "Workaholic"],
      image: require('../../../assets/images/Research-paper-rafiki-1.png'),
      bgColor: '#F8BBD0'
    },
     {
      id: 3,
      heading: "'s your vibe?",
      subHeading: "Help us find people like you",
      options: ["Adventurous", "Homebody", "Workaholic"],
      image: require('../../../assets/images/Research-paper-rafiki-1.png'),
      bgColor: '#F8BBD0'
    }
  ];

  // 2. State Management
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({}); // Stores selected values: {0: 'Single', 1: 'Adventurous'}

  const stepData = steps[currentStep];

  // 3. Navigation Logic
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSelect = (option) => {
    setFormData({ ...formData, [currentStep]: option });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: stepData.bgColor }]}>
      
      {/* Header Section */}
      <Text style={styles.heading}>{stepData.heading}</Text>
      
      <View style={styles.subContainer}>
        <Text style={styles.subHeading}>{stepData.subHeading}</Text>
      </View>

      {/* Select Dropdown / Buttons */}
      <TouchableOpacity style={styles.dropdown}>
        <Text style={styles.dropdownText}>
          {formData[currentStep] || "Select"}
        </Text>
        <Text>▼</Text>
      </TouchableOpacity>

      {/* Dynamic Image */}
      <Image source={stepData.image} style={styles.illustration} resizeMode="contain" />

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleBack} style={styles.skipButton}>
          <Text style={styles.skipText}>{currentStep === 0 ? "Skip" : "Back"}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.stepIndicator}>Step {currentStep + 1} of {steps.length}</Text>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20 },
  heading: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginTop: 40, marginBottom: 20 },
  subContainer: { backgroundColor: '#8E44AD', padding: 20, borderRadius: 20, width: '90%', marginBottom: 20 },
  subHeading: { color: 'white', fontSize: 18, textAlign: 'center' },
  dropdown: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    backgroundColor: '#3498DB', 
    padding: 15, 
    borderRadius: 25, 
    width: '80%',
    alignItems: 'center'
  },
  dropdownText: { color: 'white', fontWeight: 'bold' },
  illustration: { width: '100%', height: 300, marginVertical: 20 },
  footer: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: 'auto', marginBottom: 10 },
  nextButton: { backgroundColor: '#212121', paddingVertical: 15, paddingHorizontal: 40, borderRadius: 30 },
  nextText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  skipButton: { borderWidth: 1, borderColor: '#757575', paddingVertical: 15, paddingHorizontal: 40, borderRadius: 30 },
  skipText: { color: '#757575', fontSize: 18 },
  stepIndicator: { marginBottom: 20, color: '#757575' }
});

export default MultiStepForm;