import React from 'react';
import {Colors} from '../../commoncomponents/Colors';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {strings} from '../../strings/i18n';
import {Dialog, DialogContent} from 'react-native-popup-dialog';
import {useTheme} from '@react-navigation/native';

export default DataUsageHistoryTotalView = props => {
  const color = useTheme().colors;
  const getData = data => {
    if (data) {
      return data;
    } else {
      return '0';
    }
  };

  if (props.showTotalHeader) {
    return (
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
              fontSize: 15,
            }}>
            {strings('DataUsageHistory.DayWise')}
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
              fontSize: 15,
            }}>
            {'Upload'}{' '}
            <Text
              style={{
                fontFamily: 'Titillium-Semibold',
                color: color.text,
                fontSize: 9,
              }}>
              {' (MB)'}
            </Text>
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
              fontSize: 15,
            }}>
            {'Download'}{' '}
            <Text
              style={{
                fontFamily: 'Titillium-Semibold',
                color: color.text,
                fontSize: 9,
              }}>
              {'(MB)'}
            </Text>
          </Text>
        </View>
      </View>
    );
  }
};
