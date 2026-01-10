import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
  Dimensions,
  Animated
} from 'react-native';

const { width } = Dimensions.get('window');

const MultiStepForm = () => {
  // 1. Data Array
  const steps = [
    {
      id: 1,
      heading: "Heart: taken, open, or tangled? 😉",
      subHeading: "What makes you smile? Pick your passions",
      options: ["Single", "Married", "Complicated"],
      image: require('../../../assets/images/Long_distance_relationship-pana_1.png'),
      bgColor: '#F8BBD0'
    },
    {
      id: 2,
      heading: "What's your vibe?",
      subHeading: "Help us find people like you",
      options: ["Adventurous", "Homebody", "Workaholic"],
      image: require('../../../assets/images/Research-paper-rafiki-1.png'),
      bgColor: '#D1C4E9'
    },
    {
      id: 3,
      heading: "Work style?",
      subHeading: "How do you handle the grind?",
      options: ["Remote Pro", "Office Enthusiast", "Coffee Shop Nomad"],
      image: require('../../../assets/images/Working-remotely-bro.png'),
      bgColor: '#C5CAE9'
    },
    {
      id: 4,
      heading: "Spiritual, religious, or Netflix loyal?",
      subHeading: "Do you follow a religion or just your heart?",
      options: ["Spiritual", "Religious", "Atheist", "Netflix is my religion"],
      image: require('../../../assets/images/Thoughts-rafiki.png'),
      bgColor: '#B3E5FC'
    },
    {
      id: 5,
      heading: "Cocktails, mocktails, or none? 🍻",
      subHeading: "What's your preferred drink?",
      options: ["Frequent", "Socially", "Never"],
      image: require('../../../assets/images/drinking-shots-amico.png'),
      bgColor: '#B2DFDB'
    },
    {
      id: 6,
      heading: "Puff 🚬 or pass 🚭",
      subHeading: "Do you smoke or stay smoke-free?",
      options: ["Smoker", "Non-Smoker", "Trying to quit"],
      image: require('../../../assets/images/Bad-idea-cuate.png'),
      bgColor: '#DCEDC8'
    },
    {
      id: 7,
      heading: "Stuff that makes you, YOU.",
      subHeading: "What keeps you sane (or insane)? 😜",
      options: ["Gaming", "Cooking", "Traveling", "Art"],
      image: require('../../../assets/images/Select-player-bro 1.png'),
      bgColor: '#FFF9C4'
    },
    {
      id: 8,
      heading: "Sweat or spectate?",
      subHeading: "Are you into sports or the couch?",
      options: ["Athlete", "Fan", "Neither"],
      image: require('../../../assets/images/Gym-bro.png'),
      bgColor: '#FFECB3'
    },
    {
      id: 9,
      heading: "Affection — how do you serve it?",
      subHeading: "How do you show love — or flirt 👀?",
      options: ["Physical Touch", "Words of Affirmation", "Quality Time"],
      image: require('../../../assets/images/Holding-hands-bro1.png'),
      bgColor: '#FFE0B2'
    },
    {
      id: 10,
      heading: "Your weekend, your rules 😎🤩",
      subHeading: "What’s your weekend mood?",
      options: ["Party Mode", "Recharge", "Family Time"],
      image: require('../../../assets/images/Going-offline-bro.png'),
      bgColor: '#F5F5F5'
    },
    {
      id: 11,
      heading: "Fitness Vibe?💪",
      subHeading: "Gym, jog, or just walking to the fridge?",
      options: ["Party Mode", "Recharge", "Family Time"],
      image: require('../../../assets/images/Fitness-tracker-amico.png'),
      bgColor: '#F5F5F5'
    },
    {
      id: 12,
      heading: "Drama, thrill, or chill?🫣",
      subHeading: " What kind of movies do you vibe with?",
      options: ["Party Mode", "Recharge", "Family Time"],
      image: require('../../../assets/images/Home-cinema-amico.png'),
      bgColor: '#F5F5F5'
    },
    {
      id: 13,
      heading: "Flavor speaks louder than words😋",
      subHeading: " Veg, Non-Veg, or just vibes with fries?",
      options: ["Party Mode", "Recharge", "Family Time"],
      image: require('../../../assets/images/Eating-together-bro.png'),
      bgColor: '#F5F5F5'
    },
    {
      id: 14,
      heading: "Desi vs Videsi🤪",
      subHeading: " Are you all about masala or minimalism?",
      options: ["Party Mode", "Recharge", "Family Time"],
      image: require('../../../assets/images/Order-food-bro.png'),
      bgColor: '#F5F5F5'
    },
    {
      id: 15,
      heading: "Still secretly bingeing?👻",
      subHeading: "Be honest… still watching Doraemon or anime?",
      options: ["Party Mode", "Recharge", "Family Time"],
      image: require('../../../assets/images/Movie-Night-cuate.png'),
      bgColor: '#F5F5F5'
    },
    {
      id: 16,
      heading: "Dream Date Style🙈🙊",
      subHeading: " If you went on a date, what would you pick?",
      options: ["Party Mode", "Recharge", "Family Time"],
      image: require('../../../assets/images/Night-date-rafiki.png'),
      bgColor: '#F5F5F5'
    },
    {
      id: 17,
      heading: "Zodiac Believer?🤔",
      subHeading: " Do you blame your mood on Mercury Retrograde?",
      options: ["Party Mode", "Recharge", "Family Time"],
      image: require('../../../assets/images/Questions-pana.png'),
      bgColor: '#F5F5F5'
    },
    {
      id: 18,
      heading: "Your emotional support  system🥸",
      subHeading: "  Dogs, cats, or just plants and peace?",
      options: ["Party Mode", "Recharge", "Family Time"],
      image: require('../../../assets/images/Adopt-pet-rafiki.png'),
      bgColor: '#F5F5F5'
    },
    {
      id: 19,
      heading: "When do you function like a human?",
      subHeading: "  Dogs, cats, or just plants and peace?",
      options: ["Party Mode", "Recharge", "Family Time"],
      image: require('../../../assets/images/Lo-fi-concept-pana.png'),
      bgColor: '#F5F5F5'
    },
    {
      id: 20,
      heading: "Your chaos, your category🐣",
      subHeading: "   What kind of chaos are you? 😏",
      options: ["Party Mode", "Recharge", "Family Time"],
      image: require('../../../assets/images/Choose-pana.png'),
      bgColor: '#F5F5F5'
    },
    {
      id: 21,
      heading: "Late Text Dilemma🤦‍♀️",
      subHeading: "   Your crush texts you 'wyd?' at 2 AM. You... 😏",
      options: ["Party Mode", "Recharge", "Family Time"],
      image: require('../../../assets/images/Texting-pana.png'),
      bgColor: '#F5F5F5'
    },
    {
      id: 22,
      heading: " 📍Location : First Date",
      subHeading: "  What’s your idea of a perfect first date?😗👉👈",
      options: ["Party Mode", "Recharge", "Family Time"],
      image: require('../../../assets/images/Romantic-Getaway-cuate.png'),
      bgColor: '#F5F5F5'
    },
    {
      id: 23,
      heading: " Unexpected Rain🌧️",
      subHeading: "It suddenly rains during your date. You...",
      options: ["Party Mode", "Recharge", "Family Time"],
      image: require('../../../assets/images/Weather-rafiki.png'),
      bgColor: '#F5F5F5'
    },
    {
      id: 24,
      heading: " They Order Pineapple Pizza🙂",
      subHeading: "Your date orders pineapple pizza. Your reaction?",
      options: ["Party Mode", "Recharge", "Family Time"],
      image: require('../../../assets/images/Pizza-sharing-rafiki.png'),
      bgColor: '#F5F5F5'
    },
    {
      id: 25,
      heading: " The bill drama begins…",
      subHeading: "First date, the bill drops. What’s your move?",
      options: ["Party Mode", "Recharge", "Family Time"],
      image: require('../../../assets/images/Payment-Information-bro.png'),
      bgColor: '#F5F5F5'
    },
    {
      id: 26,
      heading: " Texting Style🫡",
      subHeading: "How do you usually text your crush?",
      options: ["Party Mode", "Recharge", "Family Time"],
      image: require('../../../assets/images/Texting.png'),
      bgColor: '#F5F5F5'
    },
    
    {
      id: 27,
      heading: " Holiday mood check✅",
      subHeading: "You both get a surprise week off. Where are you going together?",
      options: ["Party Mode", "Recharge", "Family Time"],
      image: require('../../../assets/images/London.png'),
      bgColor: '#F5F5F5'
    },{
      id: 28,
      heading: " Let’s talk damage control🤨",
      subHeading: "Gym, jog, or just walking to the fridge?",
      options: ["Party Mode", "Recharge", "Family Time"],
      image: require('../../../assets/images/Blaming.png'),
      bgColor: '#F5F5F5'
    },
    {
      id: 29,
      heading: " Ideal Weekend Together🤠",
      subHeading: " It’s Sunday with your partner. What's the plan?",
      options: ["Party Mode", "Recharge", "Family Time"],
      image: require('../../../assets/images/People.png'),
      bgColor: '#F5F5F5'
    },
    {
      id: 30,
      heading: " Crushing? Confessing? Ghosting??😬",
      subHeading: "You’re catching feelings fast. What now?",
      options: ["Party Mode", "Recharge", "Family Time"],
      image: require('../../../assets/images/Questions-amico.png'),
      bgColor: '#F5F5F5'
    },
    {
      id: 31,
      heading: " 😎 BONUS Round: 'Pick Your Type'",
      subHeading: "Which one makes your heart skip a beat? 💗",
      options: ["Party Mode", "Recharge", "Family Time"],
      image: require('../../../assets/images/Couple-bro.png'),
      bgColor: '#F5F5F5'
    },
  ];

 
  // 2. STATE MANAGEMENT
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const stepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;
  const isQuestionScreen = stepData.options.length > 0;

  // 3. HANDLERS
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsFinished(true); // Replaces alert for professional flow
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
    return (
      <SafeAreaView style={styles.finishContainer}>
        <Text style={styles.heading}>Profile Created! 🎉</Text>
        <Text style={styles.subText}>Ready to find your match?</Text>
        <TouchableOpacity style={styles.nextButton} onPress={() => {}}>
          <Text style={styles.nextText}>Start Exploring</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: stepData.bgColor }]}>
      
      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <Animated.View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>

      {/* Dynamic Heading */}
      <Text style={[styles.heading, !isQuestionScreen && styles.introHeading]}>
        {stepData.heading}
      </Text>
      
      {/* Question Sub-box */}
      {isQuestionScreen && (
        <View style={styles.subContainer}>
          <Text style={styles.subHeading}>{stepData.subHeading}</Text>
        </View>
      )}

      {/* Select Box */}
      {isQuestionScreen && (
        <TouchableOpacity 
          style={styles.dropdown} 
          onPress={() => setPickerVisible(true)}
          activeOpacity={0.8}
        >
          <Text style={styles.dropdownLabel}>
            {formData[currentStep] || "Select"}
          </Text>
          <Text style={styles.dropdownArrow}>v</Text>
        </TouchableOpacity>
      )}

      {/* Image Section */}
      {stepData.image ? (
        <Image source={stepData.image} style={styles.illustration} resizeMode="contain" />
      ) : (
        <View style={styles.spacer} />
      )}

      {/* Footer Navigation */}
      <View style={styles.footer}>
        {currentStep > 0 ? (
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
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

      {/* Professional Selection Modal */}
      <Modal visible={isPickerVisible} transparent animationType="slide">
        <TouchableOpacity 
            style={styles.modalOverlay} 
            activeOpacity={1} 
            onPress={() => setPickerVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeaderBar} />
            <Text style={styles.modalTitle}>Choose an option</Text>
            {stepData.options.map((item, index) => (
              <TouchableOpacity key={index} style={styles.optionItem} onPress={() => handleSelect(item)}>
                <Text style={[
                    styles.optionText,
                    formData[currentStep] === item && styles.optionSelected
                ]}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center' },
  finishContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  progressBarContainer: { width: '100%', height: 4, backgroundColor: 'rgba(0,0,0,0.05)' },
  progressBar: { height: '100%', backgroundColor: '#8E44AD' },
  
  // Typography
  heading: { 
    fontSize: 26, 
    fontWeight: '800', 
    textAlign: 'center', 
    marginTop: 30, 
    paddingHorizontal: 30,
    lineHeight: 34,
    color: '#1A1A1A'
  },
  introHeading: { marginTop: '20%', fontSize: 30, lineHeight: 42 },
  subText: { fontSize: 16, color: '#666', marginBottom: 30 },

  // Question Elements
  subContainer: { 
    backgroundColor: '#8B5A8C', 
    padding: 16, 
    borderRadius: 12, 
    width: '85%', 
    marginTop: 20,
    elevation: 4
  },
  subHeading: { color: 'white', fontSize: 17, textAlign: 'center', fontWeight: '500' },
  dropdown: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    backgroundColor: '#3498DB', 
    padding: 14, 
    borderRadius: 10, 
    width: '85%',
    marginTop: 20,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#000'
  },
  dropdownLabel: { color: '#000', fontSize: 16, fontWeight: '600' },
  dropdownArrow: { color: '#000', fontWeight: 'bold' },

  // Visuals
  illustration: { width: '90%', height: width * 0.7, marginTop: 'auto', marginBottom: 40 },
  spacer: { flex: 1 },

  // Buttons
  footer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '90%', 
    marginBottom: 20,
    alignItems: 'center'
  },
  nextButton: { backgroundColor: '#1A1A1A', paddingVertical: 14, paddingHorizontal: 40, borderRadius: 30 },
  nextText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  buttonDisabled: { opacity: 0.3 },
  skipButton: { 
    backgroundColor: '#F8BBD0', 
    paddingVertical: 14, 
    paddingHorizontal: 35, 
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: '#000'
  },
  skipText: { color: '#000', fontSize: 18, fontWeight: '600' },
  footerHint: { color: '#888', fontStyle: 'italic' },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { 
    backgroundColor: 'white', 
    padding: 25, 
    borderTopLeftRadius: 25, 
    borderTopRightRadius: 25,
    minHeight: 300 
  },
  modalHeaderBar: { width: 50, height: 5, backgroundColor: '#ddd', alignSelf: 'center', marginBottom: 15, borderRadius: 5 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  optionItem: { paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  optionText: { fontSize: 18, textAlign: 'center', color: '#333' },
  optionSelected: { color: '#8E44AD', fontWeight: 'bold' }
});

export default MultiStepForm;