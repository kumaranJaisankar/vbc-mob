import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from '../../commoncomponents/Colors';
import {strings} from '../../strings/i18n';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {format, parseISO} from 'date-fns';
import {useTheme} from '@react-navigation/native';

const UserDataUsageListCell = props => {
  const color = useTheme().colors;
  var itemData = props.itemdata;

  const itemDataDate = format(parseISO(itemData.Date), 'd MMM, yyyy');
  return (
    <View>
      <View
        style={{
          backgroundColor: Colors.grey_A9A9A9,
          height: 1,
          marginTop: 5,
        }}></View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <View
          style={{
            flex: 0.5,
            flexDirection: 'row',
            marginTop: -10,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'Titillium-Semibold',
              color: color.text,
              fontSize: 14,
            }}>
            {itemDataDate}
          </Text>
        </View>
        <View
          style={{
            flex: 0.5,
            flexDirection: 'row',
            marginTop: -10,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'Titillium-Semibold',
              color: color.text,
              fontSize: 14,
            }}>
            {(itemData.Total_upload * 1000).toFixed(2)}
          </Text>
        </View>
        <View
          style={{
            flex: 0.5,
            flexDirection: 'row',
            marginTop: -10,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'Titillium-Semibold',
              color: color.text,
              fontSize: 14,
            }}>
            {(itemData.Total_download * 1000).toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default UserDataUsageListCell;
