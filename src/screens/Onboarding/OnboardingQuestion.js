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
      bgColor: '#F6EFDC'
    },
    {
      id: 2,
      heading: "Heart: taken, open, or tangled? 😉",
      subHeading: "What makes you smile? Pick your passions",
      options: ["Single", "Married", "Divorced", "It's complicated", "It's toxic, send help"],
      image: require('../../../assets/images/Long_distance_relationship-pana_1.png'),
      bgColor: '#F8BBD0'
    },
    {
      id: 3,
      heading: "What's your vibe?",
      subHeading: "Help us find people like you",
      options: ["High School", "Bachelor's Degree", "Master's / MBA", "PhD (Big brain stuff)", "Still studying, send coffee"],
      image: require('../../../assets/images/Research-paper-rafiki-1.png'),
      bgColor: '#F8BBD0'
    },
    {
      id: 4,
      heading: "Work style?",
      subHeading: "How do you handle the grind?",
      options: ["Full-time job", "Freelancer life", "Startup hustle", "Student", "Between jobs but manifesting"],
      image: require('../../../assets/images/Working-remotely-bro.png'),
      bgColor: '#F8BBD0'
    },
    {
      id: 5,
      heading: "Spiritual, religious, or Netflix loyal?",
      subHeading: "Do you follow a religion or just your heart?",
      options: ["Hindu", "Muslim", "Christian", "Sikh", "Spiritual", "Not religious"],
      image: require('../../../assets/images/Thoughts-rafiki.png'),
      bgColor: '#F8BBD0'
    },
    {
      id: 6,
      heading: "Cocktails, mocktails, or none? 🍻",
      subHeading: "What's your preferred drink?",
      options: ["I don't drink", "Occasionally", "Socially", "On weekends", "Regularly (cheers!)"],
      image: require('../../../assets/images/drinking-shots-amico.png'),
      bgColor: '#F8BBD0'
    },
    {
      id: 7,
      heading: "Puff 🚬 or pass 🚭",
      subHeading: "Do you smoke or stay smoke-free?",
      options: ["Never smoked", "Just tried it", "Occasionally", "Regularly", "Trying to quit"],
      image: require('../../../assets/images/Bad-idea-cuate.png'),
      bgColor: '#F8BBD0'
    },
    {
      id: 8,
      heading: "Stuff that makes you, YOU.",
      subHeading: "What keeps you sane (or insane)? 😜",
      options: ["Dancing", "Music", "Gaming", "Reading", "Traveling", "Watching memes"],
      image: require('../../../assets/images/Select-player-bro 1.png'),
      bgColor: '#F8BBD0'
    },
    {
      id: 9,
      heading: "Sweat or spectate?",
      subHeading: "Are you into sports or the couch?",
      options: ["Total athlete", "Gym freak", "Weekend cricket", "Just a fan", "Not into sports at all"],
      image: require('../../../assets/images/Gym-bro.png'),
      bgColor: '#F8BBD0'
    },
    {
      id: 10,
      heading: "Affection — how do you serve it?",
      subHeading: "How do you show love — or flirt 👀?",
      options: ["Words of affirmation", "Quality time", "Gifts", "Acts of service", "Physical touch"],
      image: require('../../../assets/images/Holding-hands-bro1.png'),
      bgColor: '#F8BBD0'
    },
    {
      id: 11,
      heading: "Your weekend, your rules 😎🤩",
      subHeading: "What's your weekend mood?",
      options: ["Netflix & chill", "Party time!", "Long walks or gym", "Sleep like there's no tomorrow", "Trying new food spots"],
      image: require('../../../assets/images/Going-offline-bro.png'),
      bgColor: '#F8BBD0'
    },
    {
      id: 12,
      heading: "Your Flavour Zone What you vibe with, crave, and binge on!",
      options: [],
      image: null,
      bgColor: '#F6EFDC'
    },
    {
      id: 13,
      heading: "Fitness Vibe?💪",
      subHeading: "Gym, jog, or just walking to the fridge?",
      options: ["Gym is life", "I walk sometimes", "Fitness is in the soul", "Lazy but cute", "My thumb gets cardio from scrolling"],
      image: require('../../../assets/images/Fitness-tracker-amico.png'),
      bgColor: '#F8BBD0'
    },
    {
      id: 14,
      heading: "Drama, thrill, or chill?🫣",
      subHeading: "What kind of movies do you vibe with?",
      options: ["Rom-coms all day", "Horror = date night...", "Action & thrillers", "Animated or fantasy+++", "Anything but boring documentaries"],
      image: require('../../../assets/images/Home-cinema-amico.png'),
      bgColor: '#F8BBD0'
    },
    {
      id: 15,
      heading: "Flavor speaks louder than words😋",
      subHeading: "Veg, Non-Veg, or just vibes with fries?",
      options: ["Pure Veg", "Non-Veg Lover", "Eggetarian", "I eat anything that looks tasty", "Fries before guys"],
      image: require('../../../assets/images/Eating-together-bro.png'),
      bgColor: '#F8BBD0'
    },
    {
      id: 16,
      heading: "Desi vs Videsi🤪",
      subHeading: "Are you all about masala or minimalism?",
      options: ["Spicy desi drama all the way", "Mostly desi, but I explore", "A balanced thali best of both", "Videsi clean plate club++", "Whatever hits the mood, feed me"],
      image: require('../../../assets/images/Order-food-bro.png'),
      bgColor: '#F8BBD0'
    },
    {
      id: 17,
      heading: "Still secretly bingeing?👻",
      subHeading: "Be honest… still watching Doraemon or anime?",
      options: ["I'll never outgrow cartoons", "Anime is my therapy", "Occasionally", "Only for nostalgia", "Nope, grown-up content only"],
      image: require('../../../assets/images/Movie-Night-cuate.png'),
      bgColor: '#F8BBD0'
    },
    {
      id: 18,
      heading: "Dream Date Style🙈🙊",
      subHeading: "If you went on a date, what would you pick?",
      options: ["Movie + popcorn", "Long walk + deep talk", "Candlelight dinner", "Netflix + chill (literally)", "Adventure date! Skydiving or go-kart?"],
      image: require('../../../assets/images/Night-date-rafiki.png'),
      bgColor: '#F8BBD0'
    },
    {
      id: 19,
      heading: "Zodiac Believer?🤔",
      subHeading: "Do you blame your mood on Mercury Retrograde?",
      options: ["Astrology is my religion", "I read horoscopes for fun", "Only zodiac memes", "Not really into it", "What's retrograde again?"],
      image: require('../../../assets/images/Questions-pana.png'),
      bgColor: '#F8BBD0'
    },
    {
      id: 20,
      heading: "Your emotional support system🥸",
      subHeading: "Dogs, cats, or just plants and peace?",
      options: ["Dog lover", "Cat cuddler", "Both!", "No pets, just plants", "I'm the pet"],
      image: require('../../../assets/images/Adopt-pet-rafiki.png'),
      bgColor: '#F8BBD0'
    },
    {
      id: 21,
      heading: "When do you function like a human?",
      subHeading: "Rise & shine or sleep & scroll?",
      options: ["Total morning bird", "Certified night owl", "Sleepy all the time", "Depends on caffeine", "I don't even know anymore"],
      image: require('../../../assets/images/Lo-fi-concept-pana.png'),
      bgColor: '#F8BBD0'
    },
    {
      id: 22,
      heading: "Your chaos, your category🐣",
      subHeading: "What kind of chaos are you? 😏",
      options: ["Unbothered but observant", "Funny but secretly emotional", "Cute but mentally elsewhere", "Peaceful until provoked", "Deep but disappears often"],
      image: require('../../../assets/images/Choose-pana.png'),
      bgColor: '#F8BBD0'
    },
    {
      id: 23,
      heading: "Date Energy: Unlocked - For: Reactions, flirty behavior, date choices, emotional responses",
      subHeading: "Answer a few fun questions to build your profile",
      options: [],
      image: null,
      bgColor: '#F6EFDC'
    },
    {
      id: 24,
      heading: "Late Text Dilemma🤦‍♀️",
      subHeading: "Your crush texts you 'wyd?' at 2 AM. You... 😏",
      options: ["Reply instantly: 'Thinking about you'", "Leave them on read", "Type... then delete", "Pretend you're asleep zz", "Panic and ask your friends what to say"],
      image: require('../../../assets/images/Texting-pana.png'),
      bgColor: '#F8BBD0'
    },
    {
      id: 25,
      heading: "📍Location : First Date",
      subHeading: "What's your idea of a perfect first date?😗👉👈",
      options: ["Rooftop dinner under the stars", "Netflix, pizza & comfy clothes", "Theme park & adrenaline rush", "Long walk & deep convo", "Pottery class or axe throwing"],
      image: require('../../../assets/images/Romantic-Getaway-cuate.png'),
      bgColor: '#F8BBD0'
    },
    {
      id: 26,
      heading: "Unexpected Rain🌧️",
      subHeading: "It suddenly rains during your date. You...",
      options: ["Dance in the rain", "Rush for cover", "Pull out your mini umbrella like a boss", "Cancel the date, I'm not getting wet", "Say 'It's a sign from the universe'"],
      image: require('../../../assets/images/Weather-rafiki.png'),
      bgColor: '#F8BBD0'
    },
    {
      id: 27,
      heading: "They Order Pineapple Pizza🙂",
      subHeading: "Your date orders pineapple pizza. Your reaction?",
      options: ["Ew, bye", "Okay... we can work through this", "It's fine, I'll take the cheese", "Secretly love it too", "That's it, we're soulmates now"],
      image: require('../../../assets/images/Pizza-sharing-rafiki.png'),
      bgColor: '#F8BBD0'
    },
    {
      id: 28,
      heading: "The bill drama begins…",
      subHeading: "First date, the bill drops. What's your move?",
      options: ["I insist on paying", "We split it", "Let them treat me", "Whoever invited, pays", "Pretend to go to the washroom"],
      image: require('../../../assets/images/Payment-Information-bro.png'),
      bgColor: '#F8BBD0'
    },
    {
      id: 29,
      heading: "Texting Style🫡",
      subHeading: "How do you usually text your crush?",
      options: ["Paragraphs with deep thoughts", "Just memes and vibes", "One-word replies", "Voice notes and chaos", "I don't text, I vanish 👻"],
      image: require('../../../assets/images/Texting.png'),
      bgColor: '#F8BBD0'
    },
    {
      id: 30,
      heading: "Holiday mood check✅",
      subHeading: "You both get a surprise week off. Where are you going together?",
      options: ["Goa, beach & breezy drinks 🌴", "Mountains, peace & chai ☕", "Foreign city, adventure & shopping ✈️", "Staycation with back-to-back movies 🎥", "Road trip with no plan 🚗"],
      image: require('../../../assets/images/London.png'),
      bgColor: '#F8BBD0'
    },
    {
      id: 31,
      heading: "Let's talk damage control🤨",
      subHeading: "A big fight happens. How do you handle it?",
      options: ["Talk immediately and fix it ️", "Take space & cool off ️", "Cry, then talk 😭", "Ignore them until they text first 🙄", "Send a meme to lighten the mood 😅"],
      image: require('../../../assets/images/Blaming.png'),
      bgColor: '#F8BBD0'
    },
    {
      id: 32,
      heading: "Ideal Weekend Together🤠",
      subHeading: "It's Sunday with your partner. What's the plan?",
      options: ["Sleep in, cuddle, order food ️🍔", "Brunch date with cute outfits 🥞", "Hiking and nature selfies ️", "Game night + pizza 🎮", "DIY something together 🎨"],
      image: require('../../../assets/images/People.png'),
      bgColor: '#F8BBD0'
    },
    {
      id: 33,
      heading: "Crushing? Confessing? Ghosting??😬",
      subHeading: "You're catching feelings fast. What now?",
      options: ["Confess directly", "Drop subtle hints", "Panic and ghost them 😬", "Write about it in notes app 📝", "Ask your friends if it's 'too soon'"],
      image: require('../../../assets/images/Questions-amico.png'),
      bgColor: '#F8BBD0'
    },
    {
      id: 34,
      heading: "😎 BONUS Round: 'Pick Your Type'",
      subHeading: "Which one makes your heart skip a beat? 💗",
      options: ["Nerdy and deep thinkers 🤓", "Funny and loud 😂", "Calm and mature 🌱", "Wild and unpredictable 🔥", "The mysterious one who barely posts 👀"],
      image: require('../../../assets/images/Couple-bro.png'),
      bgColor: '#F8BBD0'
    },
  ];

  // 2. STATE MANAGEMENT
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));

  const stepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;
  const isQuestionScreen = stepData.options.length > 0;

  // Animation on step change
  useEffect(() => {
    fadeAnim.setValue(0);
    slideAnim.setValue(50);
    
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
    <SafeAreaView style={[styles.container, { backgroundColor: stepData.bgColor }]}>
      
      {/* Decorative top accent */}
      <View style={styles.topAccent} />
      
      {/* Progress Bar with glow effect */}
      <View style={styles.progressBarContainer}>
        <Animated.View style={[styles.progressBar, { width: `${progress}%` }]} />
        <View style={[styles.progressGlow, { width: `${progress}%` }]} />
      </View>

      {/* Step Counter */}
      <View style={styles.stepCounter}>
        <Text style={styles.stepCounterText}>
          {currentStep + 1} / {steps.length}
        </Text>
      </View>

      {/* Dynamic Heading with animation */}
      <Animated.View 
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }}
      >
        <Text style={[styles.heading, !isQuestionScreen && styles.introHeading]}>
          {stepData.heading}
        </Text>
      </Animated.View>
      
      {/* Question Sub-box with enhanced design */}
      {isQuestionScreen && (
        <Animated.View 
          style={[
            styles.subContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <View style={styles.subContainerGlow} />
          <Text style={styles.subHeading}>{stepData.subHeading}</Text>
        </Animated.View>
      )}

      {/* Select Box with enhanced styling */}
      {isQuestionScreen && (
        <Animated.View 
          style={{
            width: '85%',
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }}
        >
          <TouchableOpacity 
            style={[
              styles.dropdown,
              formData[currentStep] && styles.dropdownSelected
            ]} 
            onPress={() => setPickerVisible(true)}
            activeOpacity={0.8}
          >
            <View style={styles.dropdownContent}>
              <Text style={[
                styles.dropdownLabel,
                !formData[currentStep] && styles.dropdownPlaceholder
              ]}>
                {formData[currentStep] || "Tap to select"}
              </Text>
              <View style={styles.dropdownIconContainer}>
                <Text style={styles.dropdownArrow}>▼</Text>
              </View>
            </View>
            {formData[currentStep] && <View style={styles.dropdownCheckmark} />}
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* Image Section with shadow */}
      {stepData.image ? (
        <Animated.View 
          style={[
            styles.imageContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: fadeAnim }]
            }
          ]}
        >
          <View style={styles.imageShadow} />
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
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={styles.modalHeaderBar} />
              <Text style={styles.modalTitle}>Choose an option</Text>
              <Text style={styles.modalSubtitle}>Select what best describes you</Text>
            </View>
            
            <ScrollView 
              showsVerticalScrollIndicator={false}
              style={styles.modalScrollView}
            >
              {stepData.options.map((item, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={[
                    styles.optionItem,
                    formData[currentStep] === item && styles.optionItemSelected,
                    index === stepData.options.length - 1 && styles.optionItemLast
                  ]} 
                  onPress={() => handleSelect(item)}
                  activeOpacity={0.7}
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
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center',
  },
  
  // Decorative elements
  topAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#8E44AD',
  },
  
  // Progress Bar
  progressBarContainer: { 
    width: '100%', 
    height: 6, 
    backgroundColor: 'rgba(0,0,0,0.08)',
    position: 'relative',
  },
  progressBar: { 
    height: '100%', 
    backgroundColor: '#8E44AD',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  progressGlow: {
    position: 'absolute',
    height: '100%',
    backgroundColor: '#8E44AD',
    opacity: 0.3,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: '#8E44AD',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  
  // Step Counter
  stepCounter: {
    position: 'absolute',
    top: 15,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  stepCounterText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#8E44AD',
  },
  
  // Typography
  heading: { 
    fontSize: 26, 
    fontWeight: '800', 
    textAlign: 'center', 
    marginTop: 50, 
    paddingHorizontal: 30,
    lineHeight: 34,
    color: '#1A1A1A',
    textShadowColor: 'rgba(0, 0, 0, 0.05)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  introHeading: { 
    marginTop: '20%', 
    fontSize: 30, 
    lineHeight: 42,
  },
  
  // Question Elements
  subContainer: { 
    backgroundColor: '#8B5A8C', 
    padding: 18, 
    borderRadius: 16, 
    width: '85%', 
    marginTop: 24,
    shadowColor: '#8B5A8C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    position: 'relative',
    overflow: 'hidden',
  },
  subContainerGlow: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    opacity: 0.5,
  },
  subHeading: { 
    color: 'white', 
    fontSize: 17, 
    textAlign: 'center', 
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  
  // Dropdown/Select Box
  dropdown: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    backgroundColor: '#3498DB', 
    padding: 16, 
    borderRadius: 14, 
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#2C3E50',
    shadowColor: '#2C3E50',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
    position: 'relative',
  },
  dropdownSelected: {
    backgroundColor: '#27AE60',
    borderColor: '#1E8449',
  },
  dropdownContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  dropdownLabel: { 
    color: '#000', 
    fontSize: 16, 
    fontWeight: '700',
    flex: 1,
  },
  dropdownPlaceholder: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontWeight: '600',
  },
  dropdownIconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownArrow: { 
    color: '#000', 
    fontWeight: 'bold',
    fontSize: 12,
  },
  dropdownCheckmark: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFD700',
    borderWidth: 2,
    borderColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Image Section
  imageContainer: {
    marginTop: 'auto',
    marginBottom: 40,
    width: '90%',
    position: 'relative',
  },
  imageShadow: {
    position: 'absolute',
    bottom: -20,
    left: '10%',
    right: '10%',
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 100,
    opacity: 0.5,
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
    color: '#888', 
    fontStyle: 'italic',
    fontSize: 14,
  },

  // Modal
  modalOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.6)', 
    justifyContent: 'flex-end' 
  },
  modalContent: { 
    backgroundColor: 'white', 
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30,
    maxHeight: '75%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  modalHeader: {
    paddingTop: 15,
    paddingHorizontal: 25,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalHeaderBar: { 
    width: 60, 
    height: 5, 
    backgroundColor: '#ddd', 
    alignSelf: 'center', 
    marginBottom: 20, 
    borderRadius: 5 
  },
  modalTitle: { 
    fontSize: 22, 
    fontWeight: '800', 
    textAlign: 'center', 
    marginBottom: 5,
    color: '#1A1A1A',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalScrollView: {
    paddingHorizontal: 25,
    paddingTop: 10,
  },
  optionItem: { 
    paddingVertical: 18, 
    borderBottomWidth: 1, 
    borderBottomColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 4,
  },
  optionItemSelected: {
    backgroundColor: '#F0F8FF',
    borderBottomColor: '#8E44AD',
    borderBottomWidth: 2,
  },
  optionItemLast: {
    borderBottomWidth: 0,
    marginBottom: 20,
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
    fontWeight: '500',
    flex: 1,
    paddingRight: 10,
  },
  optionSelected: { 
    color: '#8E44AD', 
    fontWeight: '700',
  },
  optionCheckmark: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#8E44AD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionCheckmarkText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MultiStepForm;