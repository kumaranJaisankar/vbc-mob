import React, {useEffect, useState} from 'react';
import {
  PermissionsAndroid,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {Colors} from '../commoncomponents/Colors';
import {useNavigation, useTheme} from '@react-navigation/native';
import APIServices from '../apiwebservices/APIServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiConfig from '../apiwebservices/apiConfig';

const SplashScreen = () => {
  const navigation = useNavigation();
  const color = useTheme().colors;

  const getLoginData = async () => {
    const token = await AsyncStorage.getItem('token');

    if (token) {
      await APIServices.getDashboardData(
        response => {
          if (response.status == 200) {
            console.log(response.data);
            navigation.reset({
              index: 0,
              routes: [{name: 'Dash', params: {screen: 'NewDashboard'}}],
            });
            GetAllPermissions();
            // navigation.navigate('Dash', {screen: 'NewDashboard'});
            // redirectScreen('NewDashboard');
          } else {
            GetAllPermissions();
            redirectScreen('LandingPage');
          }
        },
        error => {
          GetAllPermissions();
          redirectScreen('LandingPage');
        },
      );
    } else {
      redirectScreen('LandingPage');
    }
  };

  useEffect(() => {
    getLoginData();
  }, []);

  const GetAllPermissions = async () => {
    try {
      if (Platform.OS === 'android') {
        const userResponse = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ]);
        const locationPermission = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        return userResponse;
      }
    } catch (err) {}
    return null;
  };

  const redirectScreen = screen => {
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{name: screen}],
      });
    }, 500);
  };

  const Body = () => {
    return (
      <View style={[styles.container, {backgroundColor: color.background}]}>
        <View
          style={{
            flexDirection: 'column',
            backgroundColor: Colors.grey_F8F7FD,
            width: 200,
            height: 200,
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image source={apiConfig.Logo_Name} style={styles.logo_style}></Image>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Body />
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  logo_style: {
    alignSelf: 'center',
  },
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
