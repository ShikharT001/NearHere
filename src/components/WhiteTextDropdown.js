import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function WhiteTextDropdown({ value, onChange, options }) {
  return (
    <View style={styles.wrapper}>
      <Picker
        selectedValue={value}
        onValueChange={onChange}
        dropdownIconColor="#fff"     // ✅ icon white
        style={styles.picker}
        itemStyle={styles.item}
      >
        {options.map((item) => (
          <Picker.Item
            key={item}
            label={item}
            value={item}
            color="#fff"              // ✅ selected text white
          />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  picker: {
    color: '#fff',                  // ✅ selected value white
  },
  item: {
    color: '#fff',
  },
});
