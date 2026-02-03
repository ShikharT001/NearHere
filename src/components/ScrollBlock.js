import React from 'react';
import { View, StyleSheet } from 'react-native';

const ScrollBlock = ({ children, style }) => {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,              // Forces it to fill the available screen space
    overflow: 'hidden',   // Clips any content that overflows (prevents scroll behavior)
    width: '100%',
    position: 'relative', // Ensures absolute positioning inside works relative to this
  },
});

export default ScrollBlock;