import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Switch,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const NotificationSetting = () => {
  const navigation = useNavigation();

  // Activity States
  const [loves, setLoves] = useState(true);
  const [matches, setMatches] = useState(true);
  const [messages, setMessages] = useState(true);
  const [posts, setPosts] = useState(true);
  const [stories, setStories] = useState(true);

  // Likes/Comments States
  const [likeMatches, setLikeMatches] = useState(true);
  const [commentMatches, setCommentMatches] = useState(true);

  // Daily Push States
  const [dailyFacts, setDailyFacts] = useState(true);
  const [questionDay, setQuestionDay] = useState(true);

  // Helper for Toggle Rows
  const ToggleRow = ({ label, value, onValueChange }) => (
    <View style={styles.innerRow}>
      <Text style={styles.rowText}>{label}</Text>
      <Switch
        trackColor={{ false: '#d1d1d1', true: '#ec008c' }}
        thumbColor={'#fff'}
        onValueChange={onValueChange}
        value={value}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft color="#000" size={28} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* ACTIVITY SECTION */}
        <View style={styles.bubbleContainer}>
          <Text style={styles.sectionTitle}>ACTIVITY</Text>
          <Text style={styles.description}>Keep track of your loves and matches.</Text>
          <ToggleRow label="Loves" value={loves} onValueChange={setLoves} />
          <ToggleRow label="Matches" value={matches} onValueChange={setMatches} />
          <ToggleRow label="Messages" value={messages} onValueChange={setMessages} />
          <ToggleRow label="Posts" value={posts} onValueChange={setPosts} />
          <ToggleRow label="Stories" value={stories} onValueChange={setStories} />
        </View>

        {/* LIKES SECTION */}
        <View style={styles.bubbleContainer}>
          <Text style={styles.sectionTitle}>LIKES</Text>
          <Text style={styles.description}>Customize notifications when your posts are liked.</Text>
          <ToggleRow label="Matches" value={likeMatches} onValueChange={setLikeMatches} />
          <ToggleRow label="Other Souls" value={true} />
        </View>

        {/* COMMENTS SECTION */}
        <View style={styles.bubbleContainer}>
          <Text style={styles.sectionTitle}>COMMENTS</Text>
          <Text style={styles.description}>Notifications for comments and replies.</Text>
          <ToggleRow label="Matches" value={commentMatches} onValueChange={setCommentMatches} />
          <ToggleRow label="Other Souls" value={true} />
        </View>

        {/* DAILY PUSH SECTION */}
        <View style={styles.bubbleContainer}>
          <Text style={styles.sectionTitle}>DAILY PUSH</Text>
          <Text style={styles.description}>Enjoy daily insights and soul discoveries.</Text>
          <ToggleRow label="Daily Facts" value={dailyFacts} onValueChange={setDailyFacts} />
          <ToggleRow label="Question of the Day" value={questionDay} onValueChange={setQuestionDay} />
          <ToggleRow label="New Souls Nearby" value={true} />
        </View>

        {/* GENERAL NOTIFICATIONS */}
        <View style={styles.bubbleContainer}>
          <Text style={styles.sectionTitle}>NOTIFICATIONS</Text>
          <Text style={styles.description}>Control alerts for requests and updates.</Text>
          <ToggleRow label="Follow Requests" value={true} />
          <ToggleRow label="Email Notifications" value={false} />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6c9c9', // Pink background
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  headerTitle: {
    color: '#000',
    fontSize: 22,
    fontWeight: '800',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  bubbleContainer: {
    backgroundColor: '#fff', // White "bubble"
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#000', // Bold black border
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },
  sectionTitle: {
    color: '#ec008c', // Pink accent
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  description: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
    marginBottom: 15,
  },
  innerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  rowText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    padding: 5,
  }
});

export default NotificationSetting;