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
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');

const TABS = ['Premium', 'Super Love', 'Boost'];

const TAB_CONTENT = {
  'Premium': {
    subTitle: 'Premium Membership',
    footer: 'Match faster. Flirt harder. Thank us later.',
    carousel: [
      { id: 'p1', title: 'Get unlimited likes', img: require('../../../assets/images/EZZE-Design-Image.png') },
      { id: 'p2', title: 'Check who viewed your profile', img: { uri: 'https://via.placeholder.com/300x150/E6E6FA/000000?text=Profile+Views' } },
    ],
    pricing: [
      { duration: '1 year', price: '₹1699', badge: 'Best value', desc: 'Premium Membership', discount: '27%off 27%off 27' },
      { duration: '3 month', price: '₹349', badge: 'Most Popular', desc: 'Premium Membership', discount: '13%off 13%off 13' },
      { duration: '1 month', price: '₹199', desc: 'Premium Membership for', discount: '' },
    ]
  },
  'Super Love': {
    subTitle: 'Super Love',
    footer: 'Wanna level up your love game? Start here.',
    staticImage: { uri: 'https://via.placeholder.com/300x200/FFD700/000000?text=Super+Love+Avatar' },
    pricing: [
      { duration: '60 super loves for', price: '₹149', badge: 'Best value', discount: '27%off 27%off 27' },
      { duration: '20 super loves for', price: '₹59', badge: 'Most Popular', discount: '13%off 13%off 13' },
      { duration: '5 super loves for', price: '₹17', discount: '' },
    ]
  },
  'Boost': {
    subTitle: 'BOOOOOOST',
    footer: 'Top spot? Taken. By you. After Boost.',
    staticImage: require('../../../assets/images/Launching-bro-1.png'),
    pricing: [
      { duration: '10 boost for', price: '₹693', badge: 'Best value', discount: '30%off 30%off 30' },
      { duration: '5 boost for', price: '₹345', badge: 'Most Popular', discount: '30%off 30%off 30' },
      { duration: '1 boost for', price: '₹99', discount: '' },
    ]
  }
};

const BackIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M15 18l-6-6 6-6" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export default function SubscriptionScreen({ navigation }) {
  const [currentTab, setCurrentTab] = useState('Premium');
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);
  const currentData = TAB_CONTENT[currentTab];

  useEffect(() => {
    if (currentTab !== 'Premium' || !currentData.carousel || currentData.carousel.length <= 1) return;
    const interval = setInterval(() => {
      let nextIndex = activeIndex === currentData.carousel.length - 1 ? 0 : activeIndex + 1;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setActiveIndex(nextIndex);
    }, 2000);
    return () => clearInterval(interval);
  }, [activeIndex, currentTab]);

  const renderCarouselItem = ({ item }) => (
    <View style={styles.carouselCard}>
      <Image source={typeof item.img === 'string' ? { uri: item.img } : item.img} style={styles.carouselImage} />
      <Text style={styles.carouselTitle}>{item.title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation?.goBack()}><BackIcon /></TouchableOpacity>
        <View style={styles.tabContainer}>
          {TABS.map((tab) => (
            <TouchableOpacity 
              key={tab} 
              style={[styles.tab, currentTab === tab && styles.activeTab]}
              onPress={() => { setCurrentTab(tab); setActiveIndex(0); }}
            >
              <Text style={currentTab === tab ? styles.activeTabText : styles.tabText}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.mainContent}>
        <Text style={styles.brandName}>near here</Text>
        <Text style={[styles.subTitle, currentTab === 'Boost' && {color: '#D11C96'}]}>{currentData.subTitle}</Text>

        <View style={styles.mediaContainer}>
          {currentTab === 'Premium' ? (
            <View style={{flex: 1}}>
              <FlatList
                ref={flatListRef}
                data={currentData.carousel}
                renderItem={renderCarouselItem}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
              />
              <View style={styles.pagination}>
                {currentData.carousel.map((_, i) => (
                  <View key={i} style={[styles.dot, i === activeIndex && styles.activeDot]} />
                ))}
              </View>
            </View>
          ) : (
            <View style={styles.staticImageWrapper}>
              <Image source={currentData.staticImage} style={styles.staticImage} />
              {currentTab === 'Super Love' && <Text style={styles.avatarLabel}>avatar</Text>}
            </View>
          )}
        </View>

        <View style={styles.pricingRow}>
          {currentData.pricing.map((item, index) => (
            <PriceCard key={index} {...item} />
          ))}
        </View>

        <Text style={styles.footerPromo}>{currentData.footer}</Text>
        <TouchableOpacity style={styles.continueBtn}><Text style={styles.continueText}>Continue</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const PriceCard = ({ duration, price, badge, desc, discount }) => (
  <View style={styles.card}>
    {badge && (
      <View style={[styles.badge, badge === 'Most Popular' && {backgroundColor: '#D11C96'}]}>
        <Text style={styles.badgeText}>{badge}</Text>
      </View>
    )}
    <View style={styles.cardContent}>
        <Text style={styles.cardDurationNumber}>{duration.split(' ')[0]}</Text>
        <Text style={styles.cardDurationText}>{duration.split(' ').slice(1).join(' ')}</Text>
        <Text style={styles.cardDescText}>{desc}</Text>
        {discount ? <Text style={styles.discountText}>{discount}</Text> : <View style={{height: 12}}/>}
        <Text style={styles.cardPrice}>{price}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFEBEF' },
  headerRow: { flexDirection: 'row', alignItems: 'center', padding: 15 },
  tabContainer: { flexDirection: 'row', flex: 1, marginLeft: 15, justifyContent: 'space-around' },
  tab: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8 },
  activeTab: { backgroundColor: '#E91E63' },
  tabText: { color: '#000', fontWeight: '600' },
  activeTabText: { color: '#FFF', fontWeight: '600' },
  
  mainContent: { alignItems: 'center', flex: 1, paddingHorizontal: 15 },
  brandName: { fontSize: 32, fontWeight: 'bold', color: '#000', marginTop: 10 },
  subTitle: { fontSize: 28, color: '#E91E63', fontWeight: 'bold', marginVertical: 5 },

  mediaContainer: { height: 200, width: '100%' },
  carouselCard: { width: width - 30, alignItems: 'center' },
  carouselImage: { width: '95%', height: 150, borderRadius: 20 },
  carouselTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 10 },
  staticImageWrapper: { alignItems: 'center' },
  staticImage: { width: '80%', height: 150, resizeMode: 'contain' },
  avatarLabel: { fontSize: 32, fontWeight: '300', marginTop: 10 },

  pagination: { flexDirection: 'row', marginTop: 10, alignSelf: 'center' },
  dot: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#CCC', marginHorizontal: 2 },
  activeDot: { backgroundColor: '#000', width: 15 },

  pricingRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 30 },
  card: { width: '31%', backgroundColor: '#FBCFD0', borderRadius: 20, paddingTop: 20, paddingBottom: 15, alignItems: 'center' },
  badge: { position: 'absolute', top: -12, backgroundColor: '#000', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  badgeText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
  cardContent: { alignItems: 'center' },
  cardDurationNumber: { fontSize: 32, fontWeight: 'bold', lineHeight: 32 },
  cardDurationText: { fontSize: 14, fontWeight: '600', marginBottom: 2 },
  cardDescText: { fontSize: 9, color: '#444', textAlign: 'center' },
  discountText: { fontSize: 8, color: '#4CAF50', fontWeight: 'bold', marginVertical: 4 },
  cardPrice: { fontSize: 24, fontWeight: 'bold' },

  footerPromo: { marginTop: 20, fontSize: 12, color: '#555' },
  continueBtn: { backgroundColor: '#E91E63', width: '100%', padding: 18, borderRadius: 40, position: 'absolute', bottom: 30 },
  continueText: { color: '#FFF', fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
});