// src/screens/profile/ProfileScreen.js
// src/screens/profile/PostScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Camera, Image as ImageIcon } from 'lucide-react-native'; // Import icons
import * as ImagePicker from 'expo-image-picker';

export default function PostScreen() {
  // State to hold the URI of the selected image
  const [selectedImage, setSelectedImage] = useState(null);

  // Function to open the phone's camera
  const takePhoto = async () => {
    // Request camera permissions
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Sorry, we need camera permissions to make this work!');
      return;
    }

    // Launch the camera
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true, // Allows the user to crop/edit before picking
      aspect: [4, 3],
      quality: 1,
    });

    handleImagePicked(result);
  };

  // Function to open the photo gallery
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    handleImagePicked(result);
  };

  // Helper function to handle the result from camera or gallery
  const handleImagePicked = (result) => {
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      // For now, we'll just show an alert. You can replace this with your upload logic.
      Alert.alert('Image Selected', `Image URI: ${result.assets[0].uri}`);
      console.log('Selected Image URI:', result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Section: Capture with camera */}
      <TouchableOpacity style={styles.topSection} onPress={takePhoto} activeOpacity={0.8}>
        <Camera color="black" size={64} strokeWidth={1.5} />
        <Text style={styles.text}>Capture with your camera</Text>
      </TouchableOpacity>

      {/* Bottom Section: Browse photos */}
      <TouchableOpacity style={styles.bottomSection} onPress={pickImage} activeOpacity={0.8}>
        <ImageIcon color="black" size={64} strokeWidth={1.5} />
        <Text style={styles.text}>Browse photos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSection: {
    flex: 1, // Takes up 50% of the screen
    backgroundColor: '#FFFFFF', // White background
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSection: {
    flex: 1, // Takes up the other 50%
    backgroundColor: '#F4C2C2', // 🔥 Pink background from your design
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Urbanist-Regular',
    fontSize: 20,
    color: 'black',
    marginTop: 15, // Space between icon and text
  },
});