import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { ArrowLeft, RotateCcw, ChevronRight } from 'lucide-react-native'; // Icons
import Slider from '@react-native-community/slider'; // You'll need to install this
import { useNavigation } from '@react-navigation/native';

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

    const navigation = useNavigation(); 

    // Toggle function for tags
    const toggleSingleSelection = (setList, value) => {
    setList([value]); // always keep only ONE selected
    };

    const ToggleRow = ({ label, value, onToggle }) => (
  <View style={styles.toggleRow}>
    <Text style={styles.toggleText}>{label}</Text>
    <TouchableOpacity
      onPress={() => onToggle(!value)}
      style={[
        styles.toggleSwitch,
        value && styles.toggleActive,
      ]}
    />
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
    >
      <Text
        style={[
          styles.selectText,
          value !== 'All' && { color: '#000' }, // ✅ selected text white
        ]}
      >
        {value}
      </Text>
      <ChevronRight color="black" size={24} />
    </TouchableOpacity>

    {activeDropdown === label && (
      <View style={styles.dropdown}>
        {options.map((item) => (
          <TouchableOpacity
            key={item}
            style={styles.dropdownItem}
            onPress={() => {
              onSelect(item);
              setActiveDropdown(null);
            }}
          >
            <Text style={styles.dropdownText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    )}
  </View>
);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <View style={styles.header}>
          <ArrowLeft color="black" size={32} onPress={()=> navigation.navigate('Radar')}/>
          <Text style={styles.headerTitle}>Filter Matches</Text>
          <RotateCcw color="black" size={28} />
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
          <Text style={styles.mainTitle}>Age range</Text>
          <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={18}
            maximumValue={75}
            minimumTrackTintColor="#007AFF"
            maximumTrackTintColor="#FFFFFF"
            thumbTintColor="black"
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
        <ToggleRow
            label="Show nearest first"
            value={nearestFirst}
            onToggle={setNearestFirst}
        />
        <ToggleRow
            label="Same city"
            value={sameCity}
            onToggle={setSameCity}
        />
        <ToggleRow
            label="Same State"
            value={sameState}
            onToggle={setSameState}
        />

        <View style={styles.distanceRow}>
            <Text style={styles.toggleText}>Farthest Distance</Text>
            <TouchableOpacity style={styles.distanceInput}>
            <Text style={styles.distanceText}>
                {farthestDistance || 'enter value'}
            </Text>
            </TouchableOpacity>
        </View>

        <Text style={styles.helperText}>How far?</Text>
        </View>
        <SelectBox
        label="Interests"
        value={interests}
        onSelect={setInterests}
        options={['All', 'Music', 'Sports', 'Travel', 'Fitness']}
        />

        <Text style={styles.mainTitle}>Opposite</Text>

        <View style={styles.card}>
            <View style={styles.toggleRow}>
                <View>
                <Text style={styles.toggleText}>💎 Completely Opposite</Text>
                <Text style={styles.helperText}>
                    No common likes. Pure chaos. 100% unlike you
                </Text>
                </View>

                <TouchableOpacity
                onPress={() => setOpposite(!opposite)}
                style={[
                    styles.toggleSwitch,
                    opposite && styles.toggleActive,
                ]}
                />
            </View>
        </View>

        <TouchableOpacity style={styles.applyButton}>
        <Text style={styles.applyText}>Apply filter</Text>
        </TouchableOpacity>


      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4C2C2', // Exact color from your screenshot
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Urbanist-Bold', // Ensure fonts are linked
    fontWeight: '700',
  },
  subLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 10,
    fontFamily: 'Urbanist-Bold',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tagButton: {
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black',
  },
  tagButtonSelected: {
    backgroundColor: '#000', // Color change when selected
  },
  tagText: {
    fontSize: 14,
    fontWeight: '600',
  },
  selectInput: {
    backgroundColor: 'white',
    height: 55,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  selectText: {
    fontSize: 18,
    color: '#333',
  },
  ageLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -5,
  },
  ageText: {
    fontSize: 14,
    fontWeight: '500',
  },
  tagTextSelected: {
  color: '#fff',
},
dropdown: {
  backgroundColor: '#000',
  borderRadius: 20,
  marginTop: 10,
  overflow: 'hidden',
},

dropdownItem: {
  paddingVertical: 14,
  paddingHorizontal: 20,
  borderBottomWidth: 0.5,
  borderBottomColor: '#333',
},

dropdownText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: '600',
},
card: {
  backgroundColor: '#fff',
  borderRadius: 20,
  padding: 15,
  borderWidth: 1,
  borderColor: '#000',
  marginBottom: 25,
},

toggleRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 15,
},

toggleText: {
  fontSize: 16,
  fontWeight: '600',
},

toggleSwitch: {
  width: 26,
  height: 26,
  borderRadius: 13,
  backgroundColor: '#000',
  opacity: 0.3,
},

toggleActive: {
  opacity: 1,
},

distanceRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},

distanceInput: {
  backgroundColor: '#F4C2C2',
  paddingHorizontal: 15,
  paddingVertical: 6,
  borderRadius: 20,
},

distanceText: {
  fontSize: 14,
  color: '#777',
},

helperText: {
  fontSize: 12,
  color: '#555',
  marginTop: 5,
},

applyButton: {
  backgroundColor: '#0094FF',
  height: 55,
  borderRadius: 30,
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 40,
},

applyText: {
  color: '#fff',
  fontSize: 18,
  fontWeight: '700',
},


});