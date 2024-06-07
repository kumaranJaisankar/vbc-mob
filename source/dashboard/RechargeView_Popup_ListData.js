import React from 'react';
import {View, Text} from 'react-native';
import {Colors} from '../commoncomponents/Colors';

export default RechargeView_Popup_ListData = props => {
  if (props.showPopupData) {
    return (
      <View style={{flexDirection: 'row', marginVertical: 5}}>
        <View style={{flex: 0.7, flexDirection: 'row'}}>
          <Text
            style={{
              fontFamily: 'Titillium-Semibold',
              color: Colors.black,
              fontSize: 14,
            }}>
            {props.title}
          </Text>
        </View>
        <View style={{flex: 0.1, flexDirection: 'row'}}>
          <Text
            style={{
              fontFamily: 'Titillium-Semibold',
              color: Colors.black,
              fontSize: 14,
            }}>
            :
          </Text>
        </View>
        <View
          style={{
            flex: 1.5,
            flexDirection: 'row',
            justifyContent: 'flex-start',
          }}>
          <Text
            style={{
              fontFamily: 'Titillium-Semibold',
              color: Colors.black,
              fontSize: 14,
              marginLeft: 5,
            }}>
            {props.value}
          </Text>
        </View>
      </View>
    );
  }
};
