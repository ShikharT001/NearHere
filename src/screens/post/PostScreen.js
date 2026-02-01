import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Alert,
  Animated,
  Image,
} from 'react-native';
import { Camera, Image as ImageIcon } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';

export default function PostScreen() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideTopAnim] = useState(new Animated.Value(-50));
  const [slideBottomAnim] = useState(new Animated.Value(50));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideTopAnim, {
        toValue: 0,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.spring(slideBottomAnim, {
        toValue: 0,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Sorry, we need camera permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    handleImagePicked(result);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    handleImagePicked(result);
  };

  const handleImagePicked = (result) => {
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      Alert.alert('Image Selected', `Image URI: ${result.assets[0].uri}`);
      console.log('Selected Image URI:', result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      
      {/* Top Section: Capture with camera */}
      <Animated.View 
        style={[
          styles.topSection,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideTopAnim }],
          }
        ]}
      >
        <TouchableOpacity 
          style={styles.sectionTouchable} 
          onPress={takePhoto} 
          activeOpacity={0.9}
        >
          <View style={styles.contentContainer}>
            
            {/* Camera Icon with decorative circle */}
            <View style={styles.iconWrapper}>
              <View style={styles.iconCircle}>
                <View style={styles.iconGlow} />
                <Camera color="#2c3e50" size={50} strokeWidth={1.8} />
              </View>
              
              {/* Small badge */}
              <View style={styles.badge}>
                <Text style={styles.badgeText}>NEW</Text>
              </View>
            </View>

            <Text style={styles.title}>Capture Photo</Text>
            <Text style={styles.subtitle}>Take a new photo with your camera</Text>

            {/* Decorative arrow */}
            <View style={styles.arrowHint}>
              <Text style={styles.arrowText}>Tap to open camera →</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Decorative elements */}
        <View style={styles.decorCircle1} />
        <View style={styles.decorCircle2} />
      </Animated.View>

      {/* Divider Line */}
      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <View style={styles.dividerCircle}>
          <Text style={styles.dividerText}>OR</Text>
        </View>
        <View style={styles.dividerLine} />
      </View>

      {/* Bottom Section: Browse photos */}
      <Animated.View 
        style={[
          styles.bottomSection,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideBottomAnim }],
          }
        ]}
      >
        <TouchableOpacity 
          style={styles.sectionTouchable} 
          onPress={pickImage} 
          activeOpacity={0.9}
        >
          <View style={styles.contentContainer}>
            
            {/* Gallery Icon with decorative circle */}
            <View style={styles.iconWrapper}>
              <View style={[styles.iconCircle, styles.iconCirclePink]}>
                <View style={[styles.iconGlow, styles.iconGlowPink]} />
                <ImageIcon color="#2c3e50" size={50} strokeWidth={1.8} />
              </View>
              
              {/* Small badge */}
              <View style={[styles.badge, styles.badgePink]}>
                <Text style={styles.badgeText}>POPULAR</Text>
              </View>
            </View>

            <Text style={styles.title}>Browse Gallery</Text>
            <Text style={styles.subtitle}>Choose from your photo library</Text>

            {/* Decorative arrow */}
            <View style={styles.arrowHint}>
              <Text style={styles.arrowText}>Tap to browse photos →</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Decorative elements */}
        <View style={styles.decorCircle3} />
        <View style={styles.decorCircle4} />
      </Animated.View>

      {/* Preview thumbnail if image is selected */}
      {selectedImage && (
        <Animated.View 
          style={[
            styles.previewContainer,
            {
              opacity: fadeAnim,
            }
          ]}
        >
          <View style={styles.previewCard}>
            <Image source={{ uri: selectedImage }} style={styles.previewImage} />
            <Text style={styles.previewText}>✓ Image ready to post</Text>
          </View>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  
  // Top Section (Camera)
  topSection: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    position: 'relative',
    overflow: 'hidden',
  },
  
  // Bottom Section (Gallery)
  bottomSection: {
    flex: 1,
    backgroundColor: '#F4C2C2',
    position: 'relative',
    overflow: 'hidden',
  },
  
  sectionTouchable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  contentContainer: {
    alignItems: 'center',
    zIndex: 10,
  },
  
  // Icon Styling
  iconWrapper: {
    position: 'relative',
    marginBottom: 24,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    position: 'relative',
  },
  iconCirclePink: {
    backgroundColor: '#FFE5E5',
    borderColor: '#FFB3B3',
  },
  iconGlow: {
    position: 'absolute',
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: 'rgba(52, 152, 219, 0.1)',
    top: -5,
    left: -5,
  },
  iconGlowPink: {
    backgroundColor: 'rgba(244, 194, 194, 0.3)',
  },
  
  // Badge
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#3498db',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    shadowColor: '#3498db',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  badgePink: {
    backgroundColor: '#FF4567',
    shadowColor: '#FF4567',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  
  // Text Styling
  title: {
    fontFamily: 'Urbanist-Regular',
    fontSize: 26,
    fontWeight: '800',
    color: '#2c3e50',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Urbanist-Regular',
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 40,
    marginBottom: 16,
  },
  
  // Arrow Hint
  arrowHint: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  arrowText: {
    fontFamily: 'Urbanist-Regular',
    fontSize: 13,
    color: '#999',
    fontStyle: 'italic',
  },
  
  // Divider
  divider: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
    transform: [{ translateY: -20 }],
  },
  dividerLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#DDD',
    maxWidth: 100,
  },
  dividerCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: '#DDD',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  dividerText: {
    fontFamily: 'Urbanist-Regular',
    fontSize: 13,
    fontWeight: '700',
    color: '#999',
  },
  
  // Decorative Circles
  decorCircle1: {
    position: 'absolute',
    top: -60,
    right: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(52, 152, 219, 0.08)',
  },
  decorCircle2: {
    position: 'absolute',
    bottom: -40,
    left: -80,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(52, 152, 219, 0.05)',
  },
  decorCircle3: {
    position: 'absolute',
    top: -80,
    left: -60,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  decorCircle4: {
    position: 'absolute',
    bottom: -50,
    right: -70,
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  
  // Preview Thumbnail
  previewContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    zIndex: 30,
    alignItems: 'center',
  },
  previewCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  previewImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  previewText: {
    fontFamily: 'Urbanist-Regular',
    fontSize: 14,
    fontWeight: '600',
    color: '#27ae60',
  },
});