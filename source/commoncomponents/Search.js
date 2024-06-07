import React from 'react';
import {Colors} from './Colors';
import {View, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {strings} from '../strings/i18n';
import {useNavigation} from '@react-navigation/native';
const Search = props => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 7,
        borderRadius: 10,
        backgroundColor: Colors.white,
        alignItems: 'center',
      }}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(props.value.replace(/\s/g, ''));
        }}>
        <Ionicons
          name={'ios-search-sharp'}
          size={26}
          color={Colors.grey_444444}
        />
      </TouchableOpacity>

      <TextInput
        style={styles.text_style}
        underlineColorAndroid="transparent"
        placeholder={strings('KYC_Form.Search')}
        value={props.value}
        onChangeText={text => props.onChangeText(text)}
      />

      <View style={{flex: 0.1}}>
        {props.value ? (
          <TouchableOpacity onPress={() => props.onClearText()}>
            <Ionicons
              name={'close-circle'}
              size={26}
              color={Colors.grey_444444}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  text_style: {
    fontFamily: 'Titillium-Semibold',
    color: Colors.black,
    fontSize: 16,
    height: 40,
    flex: 0.9,
    fontWeight: 'normal',
  },
});
