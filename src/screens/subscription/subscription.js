import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
  StatusBar,
  Animated,
  Platform,
} from 'react-native';
import Svg, { Path, Circle, Polygon } from 'react-native-svg';

const { width, height } = Dimensions.get('window');
const isSmallDevice = width < 375;

const TABS = ['Premium', 'Super Love', 'Boost'];

const TAB_CONTENT = {
  'Premium': {
    themeColor: '#E91E63',
    gradientColors: ['#E91E63', '#C2185B'],
    subTitle: 'Premium Membership',
    footer: 'Match faster. Flirt harder. Thank us later.',
    carousel: [
      { id: 'p1', title: 'Get unlimited likes', img: { uri: 'https://img.icons8.com/fluency/200/hearts.png' } },
      { id: 'p2', title: 'See who likes you', img: { uri: 'https://img.icons8.com/fluency/200/visible.png' } },
      { id: 'p3', title: 'Passport to anywhere', img: { uri: 'https://img.icons8.com/fluency/200/earth-globe.png' } },
      { id: 'p4', title: 'Control your profile', img: { uri: 'https://img.icons8.com/fluency/200/settings.png' } },
    ],
    pricing: [
      { id: 'p1y', duration: '1 year', price: '₹1699', badge: 'BEST VALUE', discount: '27% OFF' },
      { id: 'p3m', duration: '3 month', price: '₹349', badge: 'MOST POPULAR', discount: '13% OFF' },
      { id: 'p1m', duration: '1 month', price: '₹199', discount: '' },
    ]
  },
  'Super Love': {
    themeColor: '#FFC107',
    gradientColors: ['#FFC107', '#FFA000'],
    subTitle: 'Super Love',
    footer: 'Stand out from the crowd and get noticed.',
    carousel: [
      { id: 's1', title: '3x more likely to match', img: { uri: 'https://img.icons8.com/fluency/200/star.png' } },
      { id: 's2', title: 'Message before matching', img: { uri: 'https://img.icons8.com/fluency/200/filled-sent.png' } },
      { id: 's3', title: 'Priority in their inbox', img: { uri: 'https://img.icons8.com/fluency/200/crown.png' } },
    ],
    pricing: [
      { id: 's60', duration: '60 super loves', price: '₹149', badge: 'BEST VALUE', discount: '27% OFF' },
      { id: 's20', duration: '20 super loves', price: '₹59', badge: 'MOST POPULAR', discount: '13% OFF' },
      { id: 's5', duration: '5 super loves', price: '₹17', discount: '' },
    ]
  },
  'Boost': {
    themeColor: '#8E44AD',
    gradientColors: ['#8E44AD', '#6C3483'],
    subTitle: 'Boost Your Profile',
    footer: 'Be the top profile in your area for 30 mins.',
    carousel: [
      { id: 'b1', title: '10x more profile views', img: { uri: 'https://img.icons8.com/fluency/200/flash-on.png' } },
      { id: 'b2', title: 'Skip the line instantly', img: { uri: 'https://img.icons8.com/fluency/200/fast-forward.png' } },
      { id: 'b3', title: 'Real-time visibility stats', img: { uri: 'https://img.icons8.com/fluency/200/area-chart.png' } },
    ],
    pricing: [
      { id: 'b10', duration: '10 boost', price: '₹693', badge: 'BEST VALUE', discount: '30% OFF' },
      { id: 'b5', duration: '5 boost', price: '₹345', badge: 'MOST POPULAR', discount: '30% OFF' },
      { id: 'b1', duration: '1 boost', price: '₹99', discount: '' },
    ]
  }
};

export default function SubscriptionScreen({ navigation, onBack }) {
  const [currentTab, setCurrentTab] = useState('Premium');
  const [selectedPlan, setSelectedPlan] = useState('p3m');
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);
  const currentData = TAB_CONTENT[currentTab];
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  // Handle back button press
  const handleBackPress = () => {
    // Try multiple navigation methods
    if (onBack && typeof onBack === 'function') {
      onBack();
    } else if (navigation?.goBack) {
      navigation.goBack();
    } else if (navigation?.pop) {
      navigation.pop();
    } else if (navigation?.navigate) {
      navigation.navigate('Home');
    } else {
      console.warn('No navigation method available. Please provide navigation prop or onBack callback.');
    }
  };

  // Animate on tab change
  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      tension: 50,
      friction: 7,
    }).start();
  }, [currentTab]);

  // Logic for automatic sliding
  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = activeIndex === currentData.carousel.length - 1 ? 0 : activeIndex + 1;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setActiveIndex(nextIndex);
    }, 4000);
    return () => clearInterval(interval);
  }, [activeIndex, currentTab]);

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
    setActiveIndex(0);
    setSelectedPlan(TAB_CONTENT[tab].pricing[1].id);
    slideAnim.setValue(20);
    // Reset carousel to first slide
    setTimeout(() => {
      flatListRef.current?.scrollToIndex({ index: 0, animated: false });
    }, 0);
  };

  const renderPriceCard = (item, index) => {
    const isSelected = selectedPlan === item.id;
    const isPopular = item.badge === 'MOST POPULAR';
    const isBestValue = item.badge === 'BEST VALUE';

    return (
      <TouchableOpacity 
        activeOpacity={0.85}
        onPress={() => setSelectedPlan(item.id)}
        style={[
          styles.card,
          isSelected && { 
            borderColor: currentData.themeColor, 
            borderWidth: 2.5,
            shadowColor: currentData.themeColor,
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.3,
            shadowRadius: 12,
            elevation: 12,
          }
        ]}
      >
        {item.badge && (
          <View style={[
            styles.badge, 
            { backgroundColor: isPopular ? currentData.themeColor : isBestValue ? '#4CAF50' : '#000' }
          ]}>
            <Text style={styles.badgeText}>{item.badge}</Text>
          </View>
        )}
        
        <View style={styles.cardContent}>
          <Text style={styles.cardDurationNumber}>{item.duration.split(' ')[0]}</Text>
          <Text style={styles.cardDurationText}>{item.duration.split(' ').slice(1).join(' ')}</Text>
          <Text style={styles.cardDescText}>Full Access</Text>
          
          <View style={styles.discountBox}>
            {item.discount ? (
              <View style={[styles.discountBadge, { backgroundColor: `${currentData.themeColor}15` }]}>
                <Text style={[styles.discountText, { color: currentData.themeColor }]}>
                  {item.discount}
                </Text>
              </View>
            ) : <View style={{ height: 22 }} />}
          </View>
          
          <Text style={styles.cardPrice}>{item.price}</Text>
          {isSelected && (
            <View style={[styles.checkmark, { backgroundColor: currentData.themeColor }]}>
              <Svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <Path 
                  d="M20 6L9 17L4 12" 
                  stroke="#FFF" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
              </Svg>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF5F7" />
      
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity 
          onPress={handleBackPress} 
          style={styles.backBtn}
        >
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path 
              d="M15 18l-6-6 6-6" 
              stroke="#000" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
          </Svg>
        </TouchableOpacity>
        
        <View style={styles.tabBar}>
          {TABS.map((tab) => (
            <TouchableOpacity 
              key={tab} 
              onPress={() => handleTabChange(tab)}
              style={[
                styles.tab, 
                currentTab === tab && { 
                  backgroundColor: TAB_CONTENT[tab].themeColor,
                  shadowColor: TAB_CONTENT[tab].themeColor,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 6,
                }
              ]}
            >
              <Text style={currentTab === tab ? styles.activeTabText : styles.tabText}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Main Content */}
      <Animated.View 
        style={[
          styles.mainContent, 
          { 
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.brandName}>Near Here</Text>
          <Text style={[styles.subTitle, { color: currentData.themeColor }]}>
            {currentData.subTitle}
          </Text>
        </View>

        {/* Carousel */}
        <View style={styles.mediaContainer}>
          <FlatList
            ref={flatListRef}
            data={currentData.carousel}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={(e) => {
              const index = Math.round(e.nativeEvent.contentOffset.x / width);
              if (index !== activeIndex && index >= 0 && index < currentData.carousel.length) {
                setActiveIndex(index);
              }
            }}
            scrollEventThrottle={16}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.slide}>
                <View style={[styles.imageBox, { 
                  shadowColor: currentData.themeColor,
                  borderColor: `${currentData.themeColor}20`,
                  borderWidth: 1,
                }]}>
                  <Image source={item.img} style={styles.slideImage} resizeMode="contain" />
                </View>
                <Text style={styles.slideTitle}>{item.title}</Text>
              </View>
            )}
          />
          <View style={styles.pagination}>
            {currentData.carousel.map((_, i) => (
              <View 
                key={i} 
                style={[
                  styles.dot, 
                  i === activeIndex && [
                    styles.activeDot, 
                    { backgroundColor: currentData.themeColor }
                  ]
                ]} 
              />
            ))}
          </View>
        </View>

        {/* Pricing Cards */}
        <View style={styles.pricingRow}>
          {currentData.pricing.map((item, index) => renderPriceCard(item, index))}
        </View>

        <Text style={styles.footerText}>{currentData.footer}</Text>
      </Animated.View>

      {/* Continue Button */}
      <TouchableOpacity 
        style={[styles.continueBtn, { backgroundColor: currentData.themeColor }]}
        activeOpacity={0.9}
      >
        <Text style={styles.continueBtnText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFF5F7' 
  },
  
  headerRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 10 : 5,
    paddingBottom: 10,
  },
  
  backBtn: { 
    padding: 10, 
    backgroundColor: '#FFF', 
    borderRadius: 14, 
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  
  tabBar: { 
    flexDirection: 'row', 
    flex: 1, 
    marginLeft: 12, 
    backgroundColor: '#F5F5F5', 
    borderRadius: 16, 
    padding: 3 
  },
  
  tab: { 
    flex: 1, 
    paddingVertical: isSmallDevice ? 8 : 10, 
    alignItems: 'center', 
    borderRadius: 13,
  },
  
  tabText: { 
    color: '#666', 
    fontWeight: '700', 
    fontSize: isSmallDevice ? 11 : 13 
  },
  
  activeTabText: { 
    color: '#FFF', 
    fontWeight: '800', 
    fontSize: isSmallDevice ? 11 : 13 
  },
  
  mainContent: { 
    alignItems: 'center', 
    flex: 1, 
    paddingHorizontal: 16 
  },
  
  titleContainer: {
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  
  brandName: { 
    fontSize: isSmallDevice ? 32 : 38, 
    fontWeight: '900', 
    color: '#000', 
    letterSpacing: -1.5,
    textShadowColor: 'rgba(0,0,0,0.08)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  
  subTitle: { 
    fontSize: isSmallDevice ? 22 : 26, 
    fontWeight: '800', 
    marginTop: 4,
  },

  mediaContainer: { 
    height: isSmallDevice ? 220 : 250, 
    width: width,
    marginVertical: 10,
  },
  
  slide: { 
    width: width, 
    alignItems: 'center', 
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  
  imageBox: { 
    width: width * 0.75, 
    height: isSmallDevice ? 140 : 160, 
    backgroundColor: '#FFF', 
    borderRadius: 28, 
    justifyContent: 'center', 
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
  },
  
  slideImage: { 
    width: isSmallDevice ? 90 : 110, 
    height: isSmallDevice ? 90 : 110 
  },
  
  slideTitle: { 
    fontSize: isSmallDevice ? 16 : 19, 
    fontWeight: '800', 
    marginTop: 16, 
    color: '#222',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  
  pagination: { 
    flexDirection: 'row', 
    marginTop: 8, 
    alignSelf: 'center' 
  },
  
  dot: { 
    width: 6, 
    height: 6, 
    borderRadius: 3, 
    backgroundColor: '#DDD', 
    marginHorizontal: 3 
  },
  
  activeDot: { 
    width: 24,
    borderRadius: 3,
  },

  pricingRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '100%', 
    marginTop: isSmallDevice ? 15 : 20,
    gap: 8,
  },
  
  card: { 
    flex: 1,
    backgroundColor: '#FFF', 
    borderRadius: 20, 
    paddingTop: 32, 
    paddingBottom: 16, 
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F5F5F5',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    position: 'relative',
  },
  
  cardContent: {
    alignItems: 'center',
    width: '100%',
  },
  
  badge: { 
    position: 'absolute', 
    top: -10, 
    paddingHorizontal: isSmallDevice ? 6 : 8, 
    paddingVertical: 4, 
    borderRadius: 8,
    elevation: 2,
  },
  
  badgeText: { 
    color: '#FFF', 
    fontSize: isSmallDevice ? 7 : 8, 
    fontWeight: '900',
    letterSpacing: 0.3,
  },
  
  cardDurationNumber: { 
    fontSize: isSmallDevice ? 28 : 34, 
    fontWeight: '900', 
    color: '#000',
    lineHeight: isSmallDevice ? 32 : 38,
  },
  
  cardDurationText: { 
    fontSize: isSmallDevice ? 13 : 15, 
    fontWeight: '700', 
    color: '#555',
    marginTop: -2,
  },
  
  cardDescText: { 
    fontSize: 9, 
    color: '#999', 
    marginTop: 2,
    fontWeight: '600',
  },
  
  discountBox: { 
    minHeight: 22, 
    marginVertical: 6, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  discountBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  
  discountText: { 
    fontSize: 10, 
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  
  cardPrice: { 
    fontSize: isSmallDevice ? 20 : 24, 
    fontWeight: '900', 
    color: '#000',
    marginTop: 2,
  },
  
  checkmark: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  footerText: { 
    marginTop: isSmallDevice ? 20 : 25, 
    fontSize: isSmallDevice ? 13 : 14, 
    color: '#666', 
    fontWeight: '600', 
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  
  continueBtn: { 
    marginHorizontal: 16,
    marginBottom: Platform.OS === 'ios' ? 20 : 16,
    padding: isSmallDevice ? 16 : 18, 
    borderRadius: 20, 
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  
  continueBtnText: { 
    color: '#FFF', 
    fontSize: isSmallDevice ? 20 : 22, 
    fontWeight: '800', 
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});