import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from '../../commoncomponents/Colors';
import {strings} from '../../strings/i18n';
import Ionicons from 'react-native-vector-icons/Ionicons';

const UserLogListCell = props => {
  var itemData = props.itemdata;

  return (
    <TouchableOpacity
      style={{
        flexDirection: 'column',
        shadowOffset: {height: 1, width: 1},
        elevation: 5,
        padding: 7,
        borderRadius: 10,
        shadowRadius: 2,
        shadowOpacity: 0.8,
        shadowColor: Colors.black,
        backgroundColor: Colors.white,
        flex: 1,
        marginVertical: 8,
      }}
      onPress={() => props.onItemClick()}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flexDirection: 'column', flex: 0.9}}>
          <Text style={styles.text_style}>{itemData.id}</Text>
          <Text style={styles.text_style1}>{itemData.first_name}</Text>
          <Text style={styles.text_style1}>{itemData.email}</Text>
          <Text style={styles.text_style1}>{itemData.mobile_no}</Text>
        </View>

        <View
          style={{
            flexDirection: 'column',
            flex: 0.1,
            justifyContent: 'center',
          }}>
          <Ionicons
            name={'chevron-forward-outline'}
            size={30}
            color={Colors.grey_444444}
          />
        </View>
      </View>
    </TouchableOpacity>
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
