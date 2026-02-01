import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Modal, Pressable, TextInput, Dimensions } from 'react-native';
import { ArrowLeft, RotateCcw, ChevronRight, Check } from 'lucide-react-native';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const isSmallScreen = SCREEN_WIDTH < 375;

export default function FilterScreen() {
  // State for selections
  const [friendsSelection, setFriendsSelection] = useState([]);
  const [datingSelection, setDatingSelection] = useState([]);
  const [ageRange, setAgeRange] = useState(18);
  const [relationshipStatus, setRelationshipStatus] = useState('All');
  const [datingPreference, setDatingPreference] = useState('All');
  const [relationshipType, setRelationshipType] = useState('All');
  const [activeDropdown, setActiveDropdown] = useState(null);
  
  // Location
  const [nearestFirst, setNearestFirst] = useState(false);
  const [sameCity, setSameCity] = useState(false);
  const [sameState, setSameState] = useState(false);
  const [farthestDistance, setFarthestDistance] = useState('');
  
  // Interests
  const [interests, setInterests] = useState('All');
  
  // Opposite
  const [opposite, setOpposite] = useState(false);
  
  // Distance modal
  const [distanceModalVisible, setDistanceModalVisible] = useState(false);
  const [tempDistance, setTempDistance] = useState('');

  const navigation = useNavigation();

  // Toggle function for tags
  const toggleSingleSelection = (setList, value) => {
    setList([value]);
  };

  // Reset all filters
  const resetFilters = () => {
    setFriendsSelection([]);
    setDatingSelection([]);
    setAgeRange(18);
    setRelationshipStatus('All');
    setDatingPreference('All');
    setRelationshipType('All');
    setNearestFirst(false);
    setSameCity(false);
    setSameState(false);
    setFarthestDistance('');
    setInterests('All');
    setOpposite(false);
  };

  // Save distance
  const saveDistance = () => {
    const distance = parseFloat(tempDistance);
    if (!isNaN(distance) && distance > 0) {
      setFarthestDistance(tempDistance);
      setDistanceModalVisible(false);
    }
  };

  const ToggleRow = ({ label, value, onToggle }) => (
    <View style={styles.toggleRow}>
      <Text style={styles.toggleText}>{label}</Text>
      <TouchableOpacity
        onPress={() => onToggle(!value)}
        style={[styles.toggleSwitch, value && styles.toggleActive]}
        activeOpacity={0.7}
      >
        {value && <View style={styles.toggleDot} />}
      </TouchableOpacity>
    </View>
  );

  const GenderButtons = ({ selectedList, setSelectedList }) => (
    <View style={styles.buttonRow}>
      {['MEN', 'WOMEN', 'NON-BINARY'].map((gender) => (
        <TouchableOpacity
          key={gender}
          style={[
            styles.tagButton,
            selectedList.includes(gender) && styles.tagButtonSelected,
          ]}
          onPress={() => toggleSingleSelection(setSelectedList, gender)}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.tagText,
              selectedList.includes(gender) && styles.tagTextSelected,
            ]}
          >
            {gender}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const SelectBox = ({ label, value, options, onSelect }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{label}</Text>
      <TouchableOpacity
        style={styles.selectInput}
        onPress={() => setActiveDropdown(label)}
        activeOpacity={0.7}
      >
        <Text style={[styles.selectText, value !== 'All' && styles.selectTextActive]}>
          {value}
        </Text>
        <ChevronRight color="black" size={24} />
      </TouchableOpacity>

      <Modal
        visible={activeDropdown === label}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setActiveDropdown(null)}
      >
        <Pressable style={styles.modalBackdrop} onPress={() => setActiveDropdown(null)}>
          <View style={styles.dropdownModal}>
            <View style={styles.dropdownHeader}>
              <Text style={styles.dropdownHeaderText}>{label}</Text>
            </View>
            {options.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.dropdownItem,
                  value === item && styles.dropdownItemSelected,
                ]}
                onPress={() => {
                  onSelect(item);
                  setActiveDropdown(null);
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.dropdownText}>{item}</Text>
                {value === item && <Check color="#0094FF" size={20} strokeWidth={3} />}
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Radar')}
            style={styles.headerButton}
            activeOpacity={0.7}
          >
            <ArrowLeft color="black" size={28} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Filter Matches</Text>
          <TouchableOpacity
            onPress={resetFilters}
            style={styles.headerButton}
            activeOpacity={0.7}
          >
            <RotateCcw color="black" size={24} />
          </TouchableOpacity>
        </View>

        <Text style={styles.subLabel}>LOOKING FOR</Text>

        {/* Friends Section */}
        <View style={styles.section}>
          <Text style={styles.mainTitle}>Friends</Text>
          <GenderButtons selectedList={friendsSelection} setSelectedList={setFriendsSelection} />
        </View>

        {/* Dating Section */}
        <View style={styles.section}>
          <Text style={styles.mainTitle}>Dating</Text>
          <GenderButtons selectedList={datingSelection} setSelectedList={setDatingSelection} />
        </View>

        {/* Dropdowns */}
        <SelectBox
          label="Relationship status"
          value={relationshipStatus}
          onSelect={setRelationshipStatus}
          options={['All', 'Single', 'In a relationship', 'Married']}
        />

        <SelectBox
          label="Dating preference"
          value={datingPreference}
          onSelect={setDatingPreference}
          options={['All', 'Men', 'Women', 'Everyone']}
        />

        <SelectBox
          label="Relationship type"
          value={relationshipType}
          onSelect={setRelationshipType}
          options={['All', 'Casual', 'Serious', 'Long-term']}
        />

        {/* Age Range */}
        <View style={styles.section}>
          <View style={styles.ageTitleRow}>
            <Text style={styles.mainTitle}>Age range</Text>
            <View style={styles.ageValueBadge}>
              <Text style={styles.ageValueText}>{Math.round(ageRange)} years</Text>
            </View>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={18}
            maximumValue={75}
            step={1}
            minimumTrackTintColor="#0094FF"
            maximumTrackTintColor="#FFE0E0"
            thumbTintColor="#0094FF"
            value={ageRange}
            onValueChange={setAgeRange}
          />
          <View style={styles.ageLabels}>
            <Text style={styles.ageText}>18</Text>
            <Text style={styles.ageText}>75+</Text>
          </View>
        </View>

        <Text style={styles.mainTitle}>Location</Text>

        <View style={styles.card}>
          <ToggleRow label="Show nearest first" value={nearestFirst} onToggle={setNearestFirst} />
          <ToggleRow label="Same city" value={sameCity} onToggle={setSameCity} />
          <ToggleRow label="Same State" value={sameState} onToggle={setSameState} />

          <View style={styles.distanceRow}>
            <Text style={styles.toggleText}>Farthest Distance</Text>
            <TouchableOpacity
              style={styles.distanceInput}
              onPress={() => {
                setTempDistance(farthestDistance);
                setDistanceModalVisible(true);
              }}
              activeOpacity={0.7}
            >
              <Text style={[styles.distanceText, farthestDistance && styles.distanceTextActive]}>
                {farthestDistance ? `${farthestDistance} mi` : 'enter value'}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.helperText}>How far? (in miles)</Text>
        </View>

        <SelectBox
          label="Interests"
          value={interests}
          onSelect={setInterests}
          options={['All', 'Music', 'Sports', 'Travel', 'Fitness', 'Art', 'Food']}
        />

        <Text style={styles.mainTitle}>Opposite</Text>

        <View style={styles.card}>
          <View style={styles.oppositeRow}>
            <View style={styles.oppositeContent}>
              <Text style={styles.oppositeTitle}>💎 Completely Opposite</Text>
              <Text style={styles.helperText}>
                No common likes. Pure chaos. 100% unlike you
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setOpposite(!opposite)}
              style={[styles.toggleSwitch, opposite && styles.toggleActive]}
              activeOpacity={0.7}
            >
              {opposite && <View style={styles.toggleDot} />}
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.applyButton}
          activeOpacity={0.8}
          onPress={() => {
            // Apply filters logic here
            navigation.goBack();
          }}
        >
          <Text style={styles.applyText}>Apply filter</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Distance Modal */}
      <Modal
        visible={distanceModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setDistanceModalVisible(false)}
      >
        <Pressable style={styles.modalBackdrop} onPress={() => setDistanceModalVisible(false)}>
          <View style={styles.distanceModal}>
            <Text style={styles.distanceModalTitle}>Farthest Distance</Text>
            <TextInput
              style={styles.distanceModalInput}
              value={tempDistance}
              onChangeText={setTempDistance}
              keyboardType="numeric"
              placeholder="Enter distance in miles"
              placeholderTextColor="#999"
              autoFocus
            />
            <View style={styles.distanceModalButtons}>
              <TouchableOpacity
                style={[styles.distanceModalButton, styles.cancelButton]}
                onPress={() => setDistanceModalVisible(false)}
                activeOpacity={0.7}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.distanceModalButton, styles.saveButton]}
                onPress={saveDistance}
                activeOpacity={0.7}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4C2C2',
  },
  scrollContent: {
    paddingHorizontal: isSmallScreen ? 16 : 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: isSmallScreen ? 24 : 28,
    fontFamily: 'Urbanist-Bold',
    fontWeight: '700',
    color: '#000',
  },
  subLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
    letterSpacing: 1,
    opacity: 0.6,
  },
  mainTitle: {
    fontSize: isSmallScreen ? 22 : 26,
    fontWeight: '700',
    marginBottom: 12,
    fontFamily: 'Urbanist-Bold',
    color: '#000',
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: isSmallScreen ? 18 : 22,
    fontWeight: '600',
    marginBottom: 10,
    color: '#000',
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tagButton: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: isSmallScreen ? 14 : 18,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: 'black',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tagButtonSelected: {
    backgroundColor: '#000',
    transform: [{ scale: 1.05 }],
  },
  tagText: {
    fontSize: isSmallScreen ? 13 : 14,
    fontWeight: '700',
    color: '#000',
  },
  tagTextSelected: {
    color: '#fff',
  },
  selectInput: {
    backgroundColor: 'white',
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectText: {
    fontSize: 17,
    color: '#999',
    fontWeight: '500',
  },
  selectTextActive: {
    color: '#000',
    fontWeight: '700',
  },
  ageTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  ageValueBadge: {
    backgroundColor: '#0094FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#0094FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  ageValueText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  ageLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 0,
  },
  ageText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
    borderWidth: 2,
    borderColor: '#000',
    marginBottom: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  toggleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    flex: 1,
  },
  toggleSwitch: {
    width: 52,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  toggleActive: {
    backgroundColor: '#0094FF',
  },
  toggleDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignSelf: 'flex-end',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  distanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  distanceInput: {
    backgroundColor: '#F4C2C2',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 100,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFB8B8',
  },
  distanceText: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
  },
  distanceTextActive: {
    color: '#000',
    fontWeight: '700',
  },
  helperText: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
  },
  oppositeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  oppositeContent: {
    flex: 1,
    marginRight: 12,
  },
  oppositeTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  applyButton: {
    backgroundColor: '#0094FF',
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
    shadowColor: '#0094FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 2,
    borderColor: '#0080E0',
  },
  applyText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  dropdownModal: {
    backgroundColor: '#fff',
    borderRadius: 24,
    width: '100%',
    maxWidth: 400,
    maxHeight: '70%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  dropdownHeader: {
    backgroundColor: '#000',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  dropdownHeaderText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  dropdownItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownItemSelected: {
    backgroundColor: '#F0F8FF',
  },
  dropdownText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  distanceModal: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  distanceModalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
    marginBottom: 20,
  },
  distanceModalInput: {
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#F9F9F9',
  },
  distanceModalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  distanceModalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F0F0F0',
  },
  saveButton: {
    backgroundColor: '#0094FF',
  },
  cancelButtonText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 16,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});