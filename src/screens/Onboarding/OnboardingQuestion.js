import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
  Dimensions,
  Animated,
  ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ScrollBlock from '../../components/ScrollBlock';
const { width } = Dimensions.get('window');

const MultiStepForm = ({ navigation }) => {
  // 1. Data Array - All 34 IDs preserved with corrected options from PDF
  const steps = [
    {
      id: 1,
      heading: "Just the Basics Real You - No Filters No Fluff.",
      subHeading: "Answer a few fun questions to build your profile",
      options: [],
      image: null,
      bgGradient: ['#FFE5E5', '#FFF4E0', '#E8F4FD']
    },
    {
      id: 2,
      heading: "Heart: taken, open, or tangled? 😉",
      subHeading: "What makes you smile? Pick your passions",
      options: ["Single", "Married", "Divorced", "It's complicated", "It's toxic, send help"],
      image: require('../../../assets/images/Long_distance_relationship-pana_1.png'),
      bgGradient: ['#FFD6E8', '#FFE4F0', '#FFF0F8']
    },
    {
      id: 3,
      heading: "What's your vibe?",
      subHeading: "Help us find people like you",
      options: ["High School", "Bachelor's Degree", "Master's / MBA", "PhD (Big brain stuff)", "Still studying, send coffee"],
      image: require('../../../assets/images/Research-paper-rafiki-1.png'),
      bgGradient: ['#E0F7FA', '#E1F5FE', '#F1F8FF']
    },
    {
      id: 4,
      heading: "Work style?",
      subHeading: "How do you handle the grind?",
      options: ["Full-time job", "Freelancer life", "Startup hustle", "Student", "Between jobs but manifesting"],
      image: require('../../../assets/images/Working-remotely-bro.png'),
      bgGradient: ['#FFF3E0', '#FFECB3', '#FFF8E1']
    },
    {
      id: 5,
      heading: "Spiritual, religious, or Netflix loyal?",
      subHeading: "Do you follow a religion or just your heart?",
      options: ["Hindu", "Muslim", "Christian", "Sikh", "Spiritual", "Not religious"],
      image: require('../../../assets/images/Thoughts-rafiki.png'),
      bgGradient: ['#F3E5F5', '#EDE7F6', '#F8F5FF']
    },
    {
      id: 6,
      heading: "Cocktails, mocktails, or none? 🍻",
      subHeading: "What's your preferred drink?",
      options: ["I don't drink", "Occasionally", "Socially", "On weekends", "Regularly (cheers!)"],
      image: require('../../../assets/images/drinking-shots-amico.png'),
      bgGradient: ['#FFE0B2', '#FFECB3', '#FFF3E0']
    },
    {
      id: 7,
      heading: "Puff 🚬 or pass 🚭",
      subHeading: "Do you smoke or stay smoke-free?",
      options: ["Never smoked", "Just tried it", "Occasionally", "Regularly", "Trying to quit"],
      image: require('../../../assets/images/Bad-idea-cuate.png'),
      bgGradient: ['#E0F2F1', '#E1F5FE', '#F0F9FF']
    },
    {
      id: 8,
      heading: "Stuff that makes you, YOU.",
      subHeading: "What keeps you sane (or insane)? 😜",
      options: ["Dancing", "Music", "Gaming", "Reading", "Traveling", "Watching memes"],
      image: require('../../../assets/images/Select-player-bro 1.png'),
      bgGradient: ['#FCE4EC', '#F8BBD0', '#FFE4F0']
    },
    {
      id: 9,
      heading: "Sweat or spectate?",
      subHeading: "Are you into sports or the couch?",
      options: ["Total athlete", "Gym freak", "Weekend cricket", "Just a fan", "Not into sports at all"],
      image: require('../../../assets/images/Gym-bro.png'),
      bgGradient: ['#C8E6C9', '#DCEDC8', '#F1F8E9']
    },
    {
      id: 10,
      heading: "Affection — how do you serve it?",
      subHeading: "How do you show love — or flirt 👀?",
      options: ["Words of affirmation", "Quality time", "Gifts", "Acts of service", "Physical touch"],
      image: require('../../../assets/images/Holding-hands-bro1.png'),
      bgGradient: ['#FFCCBC', '#FFE0B2', '#FFF3E0']
    },
    {
      id: 11,
      heading: "Your weekend, your rules 😎🤩",
      subHeading: "What's your weekend mood?",
      options: ["Netflix & chill", "Party time!", "Long walks or gym", "Sleep like there's no tomorrow", "Trying new food spots"],
      image: require('../../../assets/images/Going-offline-bro.png'),
      bgGradient: ['#B2DFDB', '#B2EBF2', '#E0F7FA']
    },
    {
      id: 12,
      heading: "Your Flavour Zone What you vibe with, crave, and binge on!",
      options: [],
      image: null,
      bgGradient: ['#FFF9C4', '#FFECB3', '#FFE0B2']
    },
    {
      id: 13,
      heading: "Fitness Vibe?💪",
      subHeading: "Gym, jog, or just walking to the fridge?",
      options: ["Gym is life", "I walk sometimes", "Fitness is in the soul", "Lazy but cute", "My thumb gets cardio from scrolling"],
      image: require('../../../assets/images/Fitness-tracker-amico.png'),
      bgGradient: ['#C5CAE9', '#E8EAF6', '#F5F5FF']
    },
    {
      id: 14,
      heading: "Drama, thrill, or chill?🫣",
      subHeading: "What kind of movies do you vibe with?",
      options: ["Rom-coms all day", "Horror = date night...", "Action & thrillers", "Animated or fantasy+++", "Anything but boring documentaries"],
      image: require('../../../assets/images/Home-cinema-amico.png'),
      bgGradient: ['#D1C4E9', '#E1BEE7', '#F3E5F5']
    },
    {
      id: 15,
      heading: "Flavor speaks louder than words😋",
      subHeading: "Veg, Non-Veg, or just vibes with fries?",
      options: ["Pure Veg", "Non-Veg Lover", "Eggetarian", "I eat anything that looks tasty", "Fries before guys"],
      image: require('../../../assets/images/Eating-together-bro.png'),
      bgGradient: ['#FFCDD2', '#F8BBD0', '#FCE4EC']
    },
    {
      id: 16,
      heading: "Desi vs Videsi🤪",
      subHeading: "Are you all about masala or minimalism?",
      options: ["Spicy desi drama all the way", "Mostly desi, but I explore", "A balanced thali best of both", "Videsi clean plate club++", "Whatever hits the mood, feed me"],
      image: require('../../../assets/images/Order-food-bro.png'),
      bgGradient: ['#FFF9C4', '#FFF59D', '#FFECB3']
    },
    {
      id: 17,
      heading: "Still secretly bingeing?👻",
      subHeading: "Be honest… still watching Doraemon or anime?",
      options: ["I'll never outgrow cartoons", "Anime is my therapy", "Occasionally", "Only for nostalgia", "Nope, grown-up content only"],
      image: require('../../../assets/images/Movie-Night-cuate.png'),
      bgGradient: ['#B2DFDB', '#80CBC4', '#A7FFEB']
    },
    {
      id: 18,
      heading: "Dream Date Style🙈🙊",
      subHeading: "If you went on a date, what would you pick?",
      options: ["Movie + popcorn", "Long walk + deep talk", "Candlelight dinner", "Netflix + chill (literally)", "Adventure date! Skydiving or go-kart?"],
      image: require('../../../assets/images/Night-date-rafiki.png'),
      bgGradient: ['#F8BBD0', '#F48FB1', '#FCE4EC']
    },
    {
      id: 19,
      heading: "Zodiac Believer?🤔",
      subHeading: "Do you blame your mood on Mercury Retrograde?",
      options: ["Astrology is my religion", "I read horoscopes for fun", "Only zodiac memes", "Not really into it", "What's retrograde again?"],
      image: require('../../../assets/images/Questions-pana.png'),
      bgGradient: ['#E1BEE7', '#CE93D8', '#F3E5F5']
    },
    {
      id: 20,
      heading: "Your emotional support system🥸",
      subHeading: "Dogs, cats, or just plants and peace?",
      options: ["Dog lover", "Cat cuddler", "Both!", "No pets, just plants", "I'm the pet"],
      image: require('../../../assets/images/Adopt-pet-rafiki.png'),
      bgGradient: ['#DCEDC8', '#C5E1A5', '#F1F8E9']
    },
    {
      id: 21,
      heading: "When do you function like a human?",
      subHeading: "Rise & shine or sleep & scroll?",
      options: ["Total morning bird", "Certified night owl", "Sleepy all the time", "Depends on caffeine", "I don't even know anymore"],
      image: require('../../../assets/images/Lo-fi-concept-pana.png'),
      bgGradient: ['#BBDEFB', '#90CAF9', '#E3F2FD']
    },
    {
      id: 22,
      heading: "Your chaos, your category🐣",
      subHeading: "What kind of chaos are you? 😏",
      options: ["Unbothered but observant", "Funny but secretly emotional", "Cute but mentally elsewhere", "Peaceful until provoked", "Deep but disappears often"],
      image: require('../../../assets/images/Choose-pana.png'),
      bgGradient: ['#FFE0B2', '#FFCC80', '#FFF3E0']
    },
    {
      id: 23,
      heading: "Date Energy: Unlocked - For: Reactions, flirty behavior, date choices, emotional responses",
      subHeading: "Answer a few fun questions to build your profile",
      options: [],
      image: null,
      bgGradient: ['#F3E5F5', '#E1BEE7', '#FCE4EC']
    },
    {
      id: 24,
      heading: "Late Text Dilemma🤦‍♀️",
      subHeading: "Your crush texts you 'wyd?' at 2 AM. You... 😏",
      options: ["Reply instantly: 'Thinking about you'", "Leave them on read", "Type... then delete", "Pretend you're asleep zz", "Panic and ask your friends what to say"],
      image: require('../../../assets/images/Texting-pana.png'),
      bgGradient: ['#B2EBF2', '#80DEEA', '#E0F7FA']
    },
    {
      id: 25,
      heading: "📍Location : First Date",
      subHeading: "What's your idea of a perfect first date?😗👉👈",
      options: ["Rooftop dinner under the stars", "Netflix, pizza & comfy clothes", "Theme park & adrenaline rush", "Long walk & deep convo", "Pottery class or axe throwing"],
      image: require('../../../assets/images/Romantic-Getaway-cuate.png'),
      bgGradient: ['#FFCCBC', '#FFAB91', '#FFE0B2']
    },
    {
      id: 26,
      heading: "Unexpected Rain🌧️",
      subHeading: "It suddenly rains during your date. You...",
      options: ["Dance in the rain", "Rush for cover", "Pull out your mini umbrella like a boss", "Cancel the date, I'm not getting wet", "Say 'It's a sign from the universe'"],
      image: require('../../../assets/images/Weather-rafiki.png'),
      bgGradient: ['#B3E5FC', '#81D4FA', '#E1F5FE']
    },
    {
      id: 27,
      heading: "They Order Pineapple Pizza🙂",
      subHeading: "Your date orders pineapple pizza. Your reaction?",
      options: ["Ew, bye", "Okay... we can work through this", "It's fine, I'll take the cheese", "Secretly love it too", "That's it, we're soulmates now"],
      image: require('../../../assets/images/Pizza-sharing-rafiki.png'),
      bgGradient: ['#FFECB3', '#FFE082', '#FFF9C4']
    },
    {
      id: 28,
      heading: "The bill drama begins…",
      subHeading: "First date, the bill drops. What's your move?",
      options: ["I insist on paying", "We split it", "Let them treat me", "Whoever invited, pays", "Pretend to go to the washroom"],
      image: require('../../../assets/images/Payment-Information-bro.png'),
      bgGradient: ['#C8E6C9', '#A5D6A7', '#DCEDC8']
    },
    {
      id: 29,
      heading: "Texting Style🫡",
      subHeading: "How do you usually text your crush?",
      options: ["Paragraphs with deep thoughts", "Just memes and vibes", "One-word replies", "Voice notes and chaos", "I don't text, I vanish 👻"],
      image: require('../../../assets/images/Texting.png'),
      bgGradient: ['#D1C4E9', '#B39DDB', '#E8EAF6']
    },
    {
      id: 30,
      heading: "Holiday mood check✅",
      subHeading: "You both get a surprise week off. Where are you going together?",
      options: ["Goa, beach & breezy drinks 🌴", "Mountains, peace & chai ☕", "Foreign city, adventure & shopping ✈️", "Staycation with back-to-back movies 🎥", "Road trip with no plan 🚗"],
      image: require('../../../assets/images/London.png'),
      bgGradient: ['#FFE0B2', '#FFCC80', '#FFE5CC']
    },
    {
      id: 31,
      heading: "Let's talk damage control🤨",
      subHeading: "A big fight happens. How do you handle it?",
      options: ["Talk immediately and fix it ️", "Take space & cool off ️", "Cry, then talk 😭", "Ignore them until they text first 🙄", "Send a meme to lighten the mood 😅"],
      image: require('../../../assets/images/Blaming.png'),
      bgGradient: ['#FFCDD2', '#EF9A9A', '#FFEBEE']
    },
    {
      id: 32,
      heading: "Ideal Weekend Together🤠",
      subHeading: "It's Sunday with your partner. What's the plan?",
      options: ["Sleep in, cuddle, order food ️🍔", "Brunch date with cute outfits 🥞", "Hiking and nature selfies ️", "Game night + pizza 🎮", "DIY something together 🎨"],
      image: require('../../../assets/images/People.png'),
      bgGradient: ['#B2DFDB', '#80CBC4', '#E0F2F1']
    },
    {
      id: 33,
      heading: "Crushing? Confessing? Ghosting??😬",
      subHeading: "You're catching feelings fast. What now?",
      options: ["Confess directly", "Drop subtle hints", "Panic and ghost them 😬", "Write about it in notes app 📝", "Ask your friends if it's 'too soon'"],
      image: require('../../../assets/images/Questions-amico.png'),
      bgGradient: ['#F8BBD0', '#F48FB1', '#FCE4EC']
    },
    {
      id: 34,
      heading: "😎 BONUS Round: 'Pick Your Type'",
      subHeading: "Which one makes your heart skip a beat? 💗",
      options: ["Nerdy and deep thinkers 🤓", "Funny and loud 😂", "Calm and mature 🌱", "Wild and unpredictable 🔥", "The mysterious one who barely posts 👀"],
      image: require('../../../assets/images/Couple-bro.png'),
      bgGradient: ['#E1BEE7', '#CE93D8', '#F3E5F5']
    },
  ];

  // 2. STATE MANAGEMENT
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));
  const [scaleAnim] = useState(new Animated.Value(0.95));
  const [pulseAnim] = useState(new Animated.Value(1));

  const stepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;
  const isQuestionScreen = stepData.options.length > 0;

  // Pulse animation for progress bar
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Animation on step change
  useEffect(() => {
    fadeAnim.setValue(0);
    slideAnim.setValue(50);
    scaleAnim.setValue(0.95);
    
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, [currentStep]);

  // 3. HANDLERS
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
       navigation.replace('Radar');
    }
  };

  const handleSkip = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSelect = (option) => {
    setFormData({ ...formData, [currentStep]: option });
    setPickerVisible(false);
  };

  // 4. COMPLETION SCREEN
  if (isFinished) {
    navigation.replace('Radar');
  }

  return (
    <ScrollView 
  scrollEnabled={false}   // <--- This disables user scrolling
  contentContainerStyle={{ flex: 1 }} // Ensures it fills height
>
    <LinearGradient
      colors={stepData.bgGradient}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.safeArea}>
        
        {/* Animated decorative circles */}
        <View style={styles.decorativeCircle1} />
        <View style={styles.decorativeCircle2} />
        <View style={styles.decorativeCircle3} />
        
        {/* Decorative top accent with gradient */}
        <LinearGradient
          colors={['#FF6B6B', '#FF8E53', '#FFA07A']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.topAccent}
        />
        
        {/* Progress Bar with animated gradient */}
        <View style={styles.progressBarContainer}>
          <Animated.View style={{ width: '100%', transform: [{ scaleX: pulseAnim }] }}>
            <LinearGradient
              colors={['#667eea', '#764ba2', '#f093fb']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.progressBar, { width: `${progress}%` }]}
            />
          </Animated.View>
          <View style={styles.progressTrail} />
        </View>

        {/* Step Counter with gradient background */}
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.stepCounter}
        >
          <Text style={styles.stepCounterText}>
            {currentStep + 1} / {steps.length}
          </Text>
        </LinearGradient>

        {/* Dynamic Heading with animation */}
        <Animated.View 
          style={{
            opacity: fadeAnim,
            transform: [
              { translateY: slideAnim },
              { scale: scaleAnim }
            ]
          }}
        >
          <Text style={[styles.heading, !isQuestionScreen && styles.introHeading]}>
            {stepData.heading}
          </Text>
        </Animated.View>
        
        {/* Question Sub-box with gradient */}
        {isQuestionScreen && (
          <Animated.View 
            style={{
              width: '85%',
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }}
          >
            <LinearGradient
              colors={['#f093fb', '#f5576c']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.subContainer}
            >
              <View style={styles.shimmerOverlay} />
              <Text style={styles.subHeading}>{stepData.subHeading}</Text>
            </LinearGradient>
          </Animated.View>
        )}

        {/* Select Box with gradient */}
        {isQuestionScreen && (
          <Animated.View 
            style={{
              width: '85%',
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }}
          >
            <TouchableOpacity 
              onPress={() => setPickerVisible(true)}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={formData[currentStep] 
                  ? ['#11998e', '#38ef7d'] 
                  : ['#4facfe', '#00f2fe']
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.dropdown}
              >
                <View style={styles.dropdownContent}>
                  <Text style={[
                    styles.dropdownLabel,
                    !formData[currentStep] && styles.dropdownPlaceholder
                  ]}>
                    {formData[currentStep] || "✨ Tap to select"}
                  </Text>
                  <LinearGradient
                    colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)']}
                    style={styles.dropdownIconContainer}
                  >
                    <Text style={styles.dropdownArrow}>▼</Text>
                  </LinearGradient>
                </View>
                {formData[currentStep] && (
                  <View style={styles.dropdownCheckmark}>
                    <Text style={styles.checkmarkText}>✓</Text>
                  </View>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        )}

        {/* Image Section with enhanced shadow */}
        {stepData.image ? (
          <Animated.View 
            style={[
              styles.imageContainer,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }]
              }
            ]}
          >
            <View style={styles.imageGlow} />
            <Image source={stepData.image} style={styles.illustration} resizeMode="contain" />
          </Animated.View>
        ) : (
          <View style={styles.spacer} />
        )}

        {/* Footer Navigation - Buttons unchanged */}
        <View style={styles.footer}>
          {currentStep > 0 ? (
            <TouchableOpacity onPress={handleNext} style={styles.skipButton}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          ) : (
              <Text style={styles.footerHint}>Let's create your profile.</Text>
          )}

          <TouchableOpacity 
            onPress={handleNext} 
            style={[
              styles.nextButton, 
              (isQuestionScreen && !formData[currentStep]) && styles.buttonDisabled
            ]}
            disabled={isQuestionScreen && !formData[currentStep]}
          >
            <Text style={styles.nextText}>
              {currentStep === steps.length - 1 ? "Finish" : "Next"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Enhanced Selection Modal */}
        <Modal visible={isPickerVisible} transparent animationType="slide">
          <TouchableOpacity 
              style={styles.modalOverlay} 
              activeOpacity={1} 
              onPress={() => setPickerVisible(false)}
          >
            <LinearGradient
              colors={['#ffffff', '#f8f9fa']}
              style={styles.modalContent}
            >
              <View style={styles.modalHeader}>
                <View style={styles.modalHeaderBar} />
                <Text style={styles.modalTitle}>Choose an option</Text>
                <Text style={styles.modalSubtitle}>Select what best describes you ✨</Text>
              </View>
              
              <ScrollView 
                showsVerticalScrollIndicator={false}
                style={styles.modalScrollView}
              >
                {stepData.options.map((item, index) => (
                  <TouchableOpacity 
                    key={index} 
                    onPress={() => handleSelect(item)}
                    activeOpacity={0.7}
                  >
                    <LinearGradient
                      colors={formData[currentStep] === item 
                        ? ['#667eea', '#764ba2']
                        : ['#ffffff', '#f8f9fa']
                      }
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={[
                        styles.optionItem,
                        index === stepData.options.length - 1 && styles.optionItemLast
                      ]}
                    >
                      <View style={styles.optionItemContent}>
                        <Text style={[
                            styles.optionText,
                            formData[currentStep] === item && styles.optionSelected
                        ]}>{item}</Text>
                        {formData[currentStep] === item && (
                          <View style={styles.optionCheckmark}>
                            <Text style={styles.optionCheckmarkText}>✓</Text>
                          </View>
                        )}
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </LinearGradient>
          </TouchableOpacity>
        </Modal>
        
      </SafeAreaView>
    </LinearGradient>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,
  },
  safeArea: {
    flex: 1,
    alignItems: 'center',
  },
  
  // Decorative elements
  decorativeCircle1: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  decorativeCircle2: {
    position: 'absolute',
    bottom: 100,
    left: -80,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  decorativeCircle3: {
    position: 'absolute',
    top: '40%',
    right: -30,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
  },
  
  topAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
  },
  
  // Progress Bar
  progressBarContainer: { 
    width: '100%', 
    height: 8, 
    backgroundColor: 'rgba(255,255,255,0.3)',
    position: 'relative',
    overflow: 'hidden',
  },
  progressBar: { 
    height: '100%',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  progressTrail: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  
  // Step Counter
  stepCounter: {
    position: 'absolute',
    top: 20,
    right: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 25,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  stepCounterText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  
  // Typography
  heading: { 
    fontSize: 28, 
    fontWeight: '900', 
    textAlign: 'center', 
    marginTop: 60, 
    paddingHorizontal: 30,
    lineHeight: 38,
    color: '#1A1A1A',
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  introHeading: { 
    marginTop: '20%', 
    fontSize: 32, 
    lineHeight: 44,
  },
  
  // Question Elements
  subContainer: { 
    padding: 20, 
    borderRadius: 20, 
    marginTop: 28,
    shadowColor: '#f5576c',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
    overflow: 'hidden',
  },
  shimmerOverlay: {
    position: 'absolute',
    top: 0,
    left: -100,
    width: 100,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    transform: [{ skewX: '-20deg' }],
  },
  subHeading: { 
    color: 'white', 
    fontSize: 18, 
    textAlign: 'center', 
    fontWeight: '700',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  
  // Dropdown/Select Box
  dropdown: { 
    padding: 18, 
    borderRadius: 18, 
    marginTop: 24,
    shadowColor: '#00f2fe',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    overflow: 'hidden',
  },
  dropdownContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownLabel: { 
    color: '#FFFFFF', 
    fontSize: 17, 
    fontWeight: '800',
    flex: 1,
    letterSpacing: 0.3,
  },
  dropdownPlaceholder: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '600',
  },
  dropdownIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownArrow: { 
    color: '#FFFFFF', 
    fontWeight: 'bold',
    fontSize: 14,
  },
  dropdownCheckmark: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFD700',
    borderWidth: 3,
    borderColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  checkmarkText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Image Section
  imageContainer: {
    marginTop: 'auto',
    marginBottom: 40,
    width: '90%',
    position: 'relative',
  },
  imageGlow: {
    position: 'absolute',
    bottom: -30,
    left: '5%',
    right: '5%',
    height: 60,
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
    borderRadius: 150,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  illustration: { 
    width: '100%', 
    height: width * 0.7,
  },
  spacer: { flex: 1 },

  // Buttons (unchanged as requested)
  footer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '90%', 
    marginBottom: 20,
    alignItems: 'center'
  },
  nextButton: { 
    backgroundColor: '#1A1A1A', 
    paddingVertical: 14, 
    paddingHorizontal: 40, 
    borderRadius: 30 
  },
  nextText: { 
    color: 'white', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  buttonDisabled: { 
    opacity: 0.3 
  },
  skipButton: { 
    backgroundColor: '#F8BBD0', 
    paddingVertical: 14, 
    paddingHorizontal: 35, 
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: '#000'
  },
  skipText: { 
    color: '#000', 
    fontSize: 18, 
    fontWeight: '600' 
  },
  footerHint: { 
    color: '#666', 
    fontStyle: 'italic',
    fontSize: 15,
    fontWeight: '500',
  },

  // Modal
  modalOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.7)', 
    justifyContent: 'flex-end' 
  },
  modalContent: { 
    borderTopLeftRadius: 35, 
    borderTopRightRadius: 35,
    maxHeight: '75%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 15,
  },
  modalHeader: {
    paddingTop: 18,
    paddingHorizontal: 25,
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(102, 126, 234, 0.1)',
  },
  modalHeaderBar: { 
    width: 70, 
    height: 6, 
    backgroundColor: '#667eea', 
    alignSelf: 'center', 
    marginBottom: 20, 
    borderRadius: 3,
    opacity: 0.6,
  },
  modalTitle: { 
    fontSize: 24, 
    fontWeight: '900', 
    textAlign: 'center', 
    marginBottom: 6,
    color: '#1A1A1A',
    letterSpacing: 0.5,
  },
  modalSubtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '500',
  },
  modalScrollView: {
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  optionItem: { 
    paddingVertical: 20, 
    paddingHorizontal: 20,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  optionItemLast: {
    marginBottom: 25,
  },
  optionItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionText: { 
    fontSize: 17, 
    textAlign: 'left', 
    color: '#333',
    fontWeight: '600',
    flex: 1,
    paddingRight: 15,
  },
  optionSelected: { 
    color: '#FFFFFF', 
    fontWeight: '800',
  },
  optionCheckmark: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  optionCheckmarkText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MultiStepForm;