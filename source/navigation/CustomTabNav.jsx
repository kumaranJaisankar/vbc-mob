import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import {showAppInstruction} from '../commoncomponents/Common';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomTabNav = ({active}) => {
  const color = useTheme().colors;
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    activeTab: {
      fontFamily: 'Titillium-Semibold',
      color: color.primary,
      fontSize: 15,
      textAlign: 'center',
    },
    inactiveTab: {
      fontFamily: 'Titillium-Semibold',
      color: '#666666',
      fontSize: 15,
      textAlign: 'center',
    },
    activeIcon: {
      color: color.primary,
      alignSelf: 'center',
      height: 25,
      width: 25,
    },
    inactiveIcon: {
      color: '#666666',
      alignSelf: 'center',
      height: 25,
      width: 25,
    },
  });

  return (
    <View
      style={{
        height: 60,
        backgroundColor: color.card,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowRadius: 2,
        margin: 1,
        shadowOffset: {
          width: 0,
          height: -1,
        },
        shadowColor: '#000000',
        elevation: 4,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 5,
        }}>
        <View style={{flex: 0.5, flexDirection: 'column'}}>
          <TouchableOpacity onPress={() => navigation.navigate('NewDashboard')}>
            <Ionicons
              name={'home'}
              size={22}
              style={
                active === 'Home' ? styles.activeIcon : styles.inactiveIcon
              }
            />
            {/* <Image
            source={require('../assets/images/homeicon.png')}
            style={{
                alignSelf: 'center',
                height: 25,
                width: 25,
            }}></Image> */}
            <Text
              style={active === 'Home' ? styles.activeTab : styles.inactiveTab}>
              Home
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 0.5, flexDirection: 'column'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('InvoiceHistory');
            }}>
            <Ionicons
              name={'newspaper-outline'}
              size={22}
              style={
                active === 'Bills' ? styles.activeIcon : styles.inactiveIcon
              }
            />
            <Text
              style={
                active === 'Bills' ? styles.activeTab : styles.inactiveTab
              }>
              Bills
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 0.5, flexDirection: 'column'}}>
          <TouchableOpacity
            onPress={() => {
              showAppInstruction();
            }}>
            <MaterialCommunityIcons
              name={'shopping-outline'}
              size={25}
              style={
                active === 'Shop' ? styles.activeIcon : styles.inactiveIcon
              }
            />
            <Text
              style={active === 'Shop' ? styles.activeTab : styles.inactiveTab}>
              Shop
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 0.5, flexDirection: 'column'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Profile');
            }}>
            <Image
              source={require('../assets/images/profileicon.png')}
              style={{
                alignSelf: 'center',
                height: 27,
                width: 27,
              }}></Image>
            <Text
              style={
                active === 'Profile' ? styles.activeTab : styles.inactiveTab
              }>
              Profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CustomTabNav;
