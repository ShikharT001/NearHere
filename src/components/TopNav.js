import { View, TouchableOpacity, StyleSheet,Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TopNav() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const IconWrapper = ({ children, onPress }) => (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.iconWrapper}
    >
      {children}
    </TouchableOpacity>
  );

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top + 12 },
      ]}
    >
      {/* LEFT ICON */}
      {/* <IconWrapper onPress={() => navigation.goBack()}> */}
        <IconWrapper onPress={()=> navigation.navigate('Filter')}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={48}
          height={48}
          viewBox="0 0 24 24"
          style={{ color: '#111' }}   // 🔒 locked color
        >
          <path
            fill="currentColor"
            d="M14 12v7.88c.04.3-.06.62-.29.83a.996.996 0 0 1-1.41 0l-2.01-2.01a.99.99 0 0 1-.29-.83V12h-.03L4.21 4.62a1 1 0 0 1 .17-1.4c.19-.14.4-.22.62-.22h14c.22 0 .43.08.62.22a1 1 0 0 1 .17 1.4L14.03 12z"
          />
        </svg>
      </IconWrapper>
        <Text style={styles.text}>Near Here</Text>

      {/* RIGHT ICON */}
      <IconWrapper onPress={() => navigation.navigate('Profile')}>
      <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 20 20"><path fill="currentColor" d="M10 0c5.342 0 10 4.41 10 9.5c0 5.004-4.553 8.942-10 8.942a11 11 0 0 1-3.43-.546c-.464.45-.623.603-1.608 1.553c-.71.536-1.378.718-1.975.38c-.602-.34-.783-1.002-.66-1.874l.4-2.319C.99 14.002 0 11.842 0 9.5C0 4.41 4.657 0 10 0m0 1.4c-4.586 0-8.6 3.8-8.6 8.1c0 2.045.912 3.928 2.52 5.33l.02.017l.297.258l-.067.39l-.138.804l-.037.214l-.285 1.658a3 3 0 0 0-.03.337v.095q0 .007-.002.008c.007-.01.143-.053.376-.223l2.17-2.106l.414.156a9.6 9.6 0 0 0 3.362.605c4.716 0 8.6-3.36 8.6-7.543c0-4.299-4.014-8.1-8.6-8.1M5.227 7.813a1.5 1.5 0 1 1 0 2.998a1.5 1.5 0 0 1 0-2.998m4.998 0a1.5 1.5 0 1 1 0 2.998a1.5 1.5 0 0 1 0-2.998m4.997 0a1.5 1.5 0 1 1 0 2.998a1.5 1.5 0 0 1 0-2.998"></path></svg></IconWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingHorizontal: 16,

    backgroundColor: 'transparent',
    zIndex: 1000,
  },
  text: {
    fontFamily: 'Urbanist-Regular',
    fontSize: 32,
    fontWeight:700,
  },

  iconWrapper: {
    width: 44,          // ✅ perfect touch target
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
