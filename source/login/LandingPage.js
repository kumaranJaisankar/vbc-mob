import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  useColorScheme,
} from 'react-native';
import {Text, Button, useTheme as useMdtheme} from 'react-native-paper';
import {Colors} from '../commoncomponents/Colors';
import {strings} from '../strings/i18n';
import apiConfig from '../apiwebservices/apiConfig';
import {useTheme} from '@react-navigation/native';

export default function LoginScreen({navigation}) {
  const color = useTheme().colors;
  const materialColor = useMdtheme().colors;
  const onLoginPressed = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };
  let imageSource = apiConfig.Logo_Name;
  console.log(apiConfig.Logo_Name, '');
  const styles = StyleSheet.create({
    container: {
      height: '100%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: color.background,
    },
    welcomeStyle: {
      fontFamily: 'Titillium-Semibold',
      color: color.text,
      fontSize: 25,
      textAlign: 'center',
    },
    messageStyle: {
      fontFamily: 'Titillium-Semibold',
      color: color.text,
      fontSize: 18,
      textAlign: 'center',
      width: 280,
      marginTop: 20,
    },
    loginButtonStyle: {
      backgroundColor: color.primary,
      width: 280,
      marginVertical: 20,
    },
    loginButtonTextStyle: {
      fontSize: 20,
      fontFamily: 'Titillium-Semibold',
      fontWeight: 'normal',
      color: Colors.white,
    },
  });
  const colorTheme = useColorScheme();
  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 1, justifyContent: 'center', padding: 10}}>
        <StatusBar
          translucent
          backgroundColor={
            colorTheme === 'dark'
              ? materialColor.primary
              : materialColor.inversePrimary
          }
        />

        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor:
                colorTheme === 'dark'
                  ? materialColor.primary
                  : materialColor.inversePrimary,
            }}>
            <Image source={apiConfig.Logo_Name}></Image>
            <Image
              source={require('../assets/images/landingImage.png')}></Image>
          </View>
          <View
            style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={styles.welcomeStyle}>
              {strings('landingPage.Welcome')}
            </Text>
            <Text style={styles.messageStyle}>
              Login to {apiConfig.REACT_APP_CLIENT_NAME} Mobile App and get
              unlimited benefits
            </Text>
            <Button
              mode="contained"
              onPress={onLoginPressed}
              uppercase={false}
              style={styles.loginButtonStyle}>
              <Text style={styles.loginButtonTextStyle}>
                {strings('landingPage.Login')}
              </Text>
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
