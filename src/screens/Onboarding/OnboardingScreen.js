import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { onboardingSteps } from '../../data/onboardingSteps';
import LanguageStep from '../../components/onboarding/LanguageSteps';
import LoginStep from '../../components/onboarding/LoginStep';
import SignupStep from '../../components/onboarding/SignupStep';
import HeightStep from '../../components/onboarding/HeightStep';
import DateStep from '../../components/onboarding/DateStep';

export default function OnboardingScreen({ navigation }) {
  const [stepIndex, setStepIndex] = useState(0);
  const step = onboardingSteps[stepIndex];

  // Inside OnboardingScreen.js
const renderStep = () => {
  switch (step.component) {
    case 'LANGUAGE':
      return <LanguageStep onNext={handleNext} />;
    
    case 'LOGIN':
      return (
        <LoginStep 
          onNext={handleNext} 
          onGoToSignup={() => {
            // Find the index of the SIGNUP step and go there
            const signupIndex = onboardingSteps.findIndex(s => s.component === 'SIGNUP');
            if (signupIndex !== -1) setStepIndex(signupIndex);
          }} 
        />
      );

    case 'SIGNUP':
      return <SignupStep onNext={handleNext} />;
      
    case 'HEIGHT':
      return <HeightStep onNext={handleNext} />;

    case 'DATE':
      return <DateStep onNext={handleNext} />;

    default:
      return null;
  }
};

  const handleNext = () => {
    if (stepIndex < onboardingSteps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      navigation.replace('Home');
    }
  };
  

  const getDynamicButtonStyle = () => {
    switch (step.component) {
      case 'LANGUAGE':
        return styles.languageBtn;
      case 'LOGIN':
        return styles.loginBtn;
      case 'SIGNUP':
        return styles.signupBtn;
      case 'HEIGHT':
        return styles.heightBtn;
      case 'DATE':
        return styles.dateBtn;
      default:
        return {};
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* TITLE */}
      <Text style={styles.title}>{step.title}</Text>

      {/* STEP CONTENT */}
      <View style={styles.content}>
        {renderStep()}
      </View>

      {/* DYNAMIC BUTTON - Removed if step is LOGIN */}
      {step.component !== 'LOGIN' && (
        <TouchableOpacity 
          style={[styles.button, getDynamicButtonStyle()]} 
          onPress={handleNext}
        >
          <Text style={styles.buttonText}>{step.buttonText}</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4C2C2',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 30,
  },
  title: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 31,
    marginBottom: 20,
  },
  content: {
    flex: 1,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Urbanist-SemiBold',
    fontSize: 18,
  },
  languageBtn: {
    backgroundColor: '#111',
    width: '50%',
    alignSelf: 'flex-end',
  },
  loginBtn: {
    backgroundColor: '#4A90E2',
    width: '100%',
    borderRadius: 10,
  },
  signupBtn: {
    backgroundColor: '#111',
    width: '50%',
    alignSelf: 'flex-end',
  },
  heightBtn: {
     backgroundColor: '#111',
    width: '50%',
    alignSelf: 'flex-end',
  },
   dateBtn: {
     backgroundColor: '#111',
    width: '50%',
    alignSelf: 'flex-end',
  },
});