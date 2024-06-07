import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors} from './Colors';
import {strings} from '../strings/i18n';
import {Dropdown} from 'react-native-element-dropdown';
import {format} from 'date-fns';

const data = [
  // {label: 'Last 7 Days', value: '7D'},
  {label: 'Last 1 Month', value: '1M'},
  {label: 'Last 3 Months', value: '3M'},
  {label: 'Last 6 Months', value: '6M'},
];
const DropdownComponent = props => {
  const [value, setValue] = React.useState(null);
  const [isFocus, setIsFocus] = React.useState(false);
  return (
    <View style={{alignItems: 'flex-end'}}>
      <Dropdown
        style={[styles.dropdown]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={data}
        maxHeight={200}
        labelField="label"
        valueField="value"
        placeholder="Select Time"
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          props.onItemClick(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
};
export default DropdownComponent;
const styles = StyleSheet.create({
  dropdown: {
    marginTop: 5,
    height: 30,
    width: 130,
    borderColor: Colors.color_5E0F8B,
    borderWidth: 5,
    borderRadius: 8,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontFamily: 'Titillium-Semibold',
    color: '#000000',
    fontSize: 14,
  },
  selectedTextStyle: {
    fontFamily: 'Titillium-Semibold',
    color: '#000000',
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
