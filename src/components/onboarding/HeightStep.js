
import { View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native';
import React, { useState } from 'react';
export default function HeightStep() {
    const [feet, setFeet] = useState(5);
    const [inches, setInches] = useState(4);

    const increment = (type) => {
        if (type === 'feet') setFeet(prev => prev + 1);
        else setInches(prev => (prev < 11 ? prev + 1 : 0));
    };

    const decrement = (type) => {
        if (type === 'feet') setFeet(prev => (prev > 0 ? prev - 1 : 0));
        else setInches(prev => (prev > 0 ? prev - 1 : 11));
    };
  return (
    <View style={styles.container}>

    
      
      <View style={styles.row}>
        {/* FEET SECTION */}
        <Text style={styles.label}>Your height</Text>

        <View style={styles.column}>
          <View style={styles.box}>
            <Text style={styles.value}>{feet}</Text>
            <View style={styles.controls}>
              <TouchableOpacity onPress={() => increment('feet')}>
                <Text style={styles.arrow}>▲</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => decrement('feet')}>
                <Text style={styles.arrow}>▼</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.unit}>feet</Text>
        </View>

        <Text style={styles.dot}>.</Text>

        {/* INCHES SECTION */}
        <View style={styles.column}>
          <View style={styles.box}>
            <Text style={styles.value}>{inches}</Text>
            <View style={styles.controls}>
              <TouchableOpacity onPress={() => increment('inches')}>
                <Text style={styles.arrow}>▲</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => decrement('inches')}>
                <Text style={styles.arrow}>▼</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.unit}>inches</Text>
        </View>
      </View>

    {/* 1. IMAGE (Top) */}
    <View style={styles.imageContainer}>
        <Image 
        source={require('../../../assets/images/Curious-pana-1.png')} 
        style={styles.illustrationImage}
        resizeMode="contain"
        />
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },


  label: {
    fontFamily: 'Indie-Flower',
    fontSize: 24,
    marginBottom: 16,
    marginRight: 10,

  },

 row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  column: {
    alignItems: 'center',
  },
  box: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#000',
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    minWidth: 70,
    justifyContent: 'space-between',
  },
  value: {
    fontFamily: 'Indie-Flower',
    fontSize: 28,
    color: '#000',
  },
  controls: {
    marginLeft: 8,
    justifyContent: 'center',
  },
  arrow: {
    fontSize: 10,
    color: '#000',
    paddingVertical: 2,
  },
  dot: {
    fontSize: 30,
    fontWeight: 'bold',
    marginHorizontal: 5,
    marginTop: -20, // Align dot with the boxes
  },
  unit: {
    fontFamily: 'Indie-Flower',
    fontSize: 20,
    color: '#000',
    marginTop: 8,
  },
   imageContainer: {
    marginBottom: 30,
    alignItems: 'center',
    width: '90%', // Ensures the container allows the image to expand
  },
  illustrationImage: {
    width: '90%',     // Takes up the full width of the container
    aspectRatio: 1,    // Keeps the height exactly equal to the width (Square)
    borderRadius: 20,
  },
});
