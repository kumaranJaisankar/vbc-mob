import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Colors} from '../../commoncomponents/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {format, parseISO} from 'date-fns';
import {useTheme} from '@react-navigation/native';
import {Divider, useTheme as useMdtheme} from 'react-native-paper';

const UserLogListCell = props => {
  const color = useTheme().colors;
  var itemData = props.itemdata;
  var formattedDate = format(parseISO(itemData.created_at), 'd MMM, yyyy');
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 5,
          // borderBottomColor: Colors.grey_D0D0D0,
          // borderBottomWidth: 1,
        }}>
        <View style={{flex: 0.5, flexDirection: 'row'}}>
          <Text
            style={{
              fontFamily: 'Titillium-Semibold',
              color: color.text,
              fontSize: 14,
            }}>
            {formattedDate}
          </Text>
        </View>
        <View
          style={{
            flex: 0.5,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FontAwesome name={'rupee'} size={16} color={color.text} />
          <Text
            style={{
              fontFamily: 'Titillium-Semibold',
              color: color.text,
              fontSize: 14,
              marginLeft: 5,
            }}>
            {itemData.payment.amount}
          </Text>
        </View>
        <View
          style={{flex: 0.5, flexDirection: 'row', justifyContent: 'center'}}>
          {itemData?.invoice.inv_download && (
            <TouchableOpacity
              onPress={() => {
                props.onDownloadClick();
              }}>
              <Feather name={'download'} size={22} color={color.primary} />
            </TouchableOpacity>
          )}
          {itemData?.invoice.inv_preview && (
            <TouchableOpacity
              onPress={() => {
                props.onItemClick();
              }}>
              <Ionicons
                name={'eye'}
                size={22}
                color={color.primary}
                style={{marginTop: 2, marginLeft: 20}}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <Divider />
    </View>
  );
};

export default UserLogListCell;
