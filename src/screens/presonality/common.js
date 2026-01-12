import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // 1. Import useNavigation

export default function PersonalityDetailScreen() {
  const navigation = useNavigation(); // 2. Initialize navigation

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* 3. Add onPress to navigate back */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Personality Types</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.topSection}>
          <Text style={styles.mainTitle}>The Hopeless{"\n"}Romantic</Text>
          <Image 
            source={require('../../../assets/images/Romantic-Getaway-rafiki.png')}  
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>

        <View style={styles.infoCard}>
          <InfoSection title="Vibe:" content="Sentimental, sincere, and believes in soulmates." />
          <InfoSection title="Ideal Date:" content="Rooftop candlelight dinner or slow dancing at home." />
          <InfoSection title="Communication:" content="Thoughtful texts, surprise messages, voice notes with soft music." />
          <InfoSection title="Looking for:" content="Loyalty, emotional warmth, someone who doesn't ghost." />
          <InfoSection title="Watch out for:" content="May fall in love too fast and get easily hurt." isLast />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const InfoSection = ({ title, content, isLast }) => (
  <View style={[styles.sectionContainer, isLast && { marginBottom: 0 }]}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <Text style={styles.sectionContent}>{content}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4C2C2' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, paddingVertical: 10 },
  headerTitle: { fontFamily: 'Urbanist-Regular', fontSize: 24, fontWeight: '600' },
  scrollContent: { padding: 20, paddingBottom: 40 },
  topSection: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  mainTitle: { fontFamily: 'Urbanist-Regular', fontSize: 28, fontWeight: 'bold', flex: 1, lineHeight: 34 },
  illustration: { width: 150, height: 150 },
  infoCard: { backgroundColor: '#8E4064', borderRadius: 20, padding: 25, borderWidth: 1, borderColor: 'rgba(0,0,0,0.1)' },
  sectionContainer: { marginBottom: 20 },
  sectionTitle: { fontFamily: 'Urbanist-Regular', fontSize: 24, color: 'black', fontWeight: 'bold', marginBottom: 4 },
  sectionContent: { fontFamily: 'Urbanist-Regular', fontSize: 18, color: 'white', lineHeight: 22 },
});