import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from '../../commoncomponents/Colors';
import {strings} from '../../strings/i18n';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {parse, format, parseISO} from 'date-fns';
import {useTheme} from '@react-navigation/native';

const UserLogListCell = props => {
  const color = useTheme().colors;
  parse;
  var itemData = props.itemdata;
  var itemDataDate = format(parseISO(itemData.date), 'd MMM, yyyy');
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        borderBottomColor: Colors.grey_D0D0D0,
        borderBottomWidth: 1,
      }}>
      <View style={{flex: 0.5, flexDirection: 'row'}}>
        <Text
          style={{
            fontFamily: 'Titillium-Semibold',
            color: color.text,
            fontSize: 12,
          }}>
          {itemDataDate}
        </Text>
      </View>
      <View style={{flex: 0.5, flexDirection: 'row', justifyContent: 'center'}}>
        <Text
          style={{
            fontFamily: 'Titillium-Semibold',
            color: color.text,
            fontSize: 12,
            marginLeft: 5,
          }}>
          {itemData?.start_Time?.substring(0, 5) +
            ' ' +
            itemData?.start_Time?.substring(9, 11)}
        </Text>
      </View>
      <View style={{flex: 0.5, flexDirection: 'row', justifyContent: 'center'}}>
        <Text
          style={{
            fontFamily: 'Titillium-Semibold',
            color: color.text,
            fontSize: 12,
            marginLeft: 5,
          }}>
          {itemData?.stop_time
            ? itemData?.stop_time?.substring(0, 5) +
              ' ' +
              itemData?.stop_time?.substring(9, 11)
            : 'Running'}
        </Text>
      </View>
      <View style={{flex: 0.5, flexDirection: 'row', justifyContent: 'center'}}>
        <Text
          style={{
            fontFamily: 'Titillium-Semibold',
            color: color.text,
            fontSize: 12,
            marginLeft: 5,
          }}>
          {itemData.total_GB.toFixed(2) + ' ' + strings('SessionHistory.GB')}
        </Text>
      </View>
      <View style={{flex: 0.2, flexDirection: 'row', justifyContent: 'center'}}>
        <TouchableOpacity
          onPress={() => {
            props.onItemClick();
          }}>
          <Ionicons
            name={'eye'}
            size={18}
            color={color.primary}
            style={{marginTop: 2}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserLogListCell;

const styles = StyleSheet.create({
  text_style: {
    fontFamily: 'Titillium-Semibold',
    color: Colors.color_5E0F8B,
    fontSize: 16,
  },
  text_style1: {
    fontFamily: 'Titillium-Semibold',
    color: Colors.black,
    fontSize: 15,
  },
});
