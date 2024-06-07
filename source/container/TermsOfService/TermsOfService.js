import React from 'react';
import {View, StyleSheet, SafeAreaView, StatusBar, Text} from 'react-native';
import {Colors} from '../../commoncomponents/Colors';
import Headerview from '../../commoncomponents/HeaderView1';
import {strings} from '../../strings/i18n';
import {WebView} from 'react-native-webview';
import {useTheme} from '@react-navigation/native';

const TermsOfService = ({navigation}) => {
  const color = useTheme().colors;
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {});
    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: color.background}}>
        <Headerview
          showTermsHeader
          title={strings('TermsOfService.TermsOfService')}
          onBackClicked={() => {
            navigation.goBack();
          }}
        />

        <View style={{flex: 1}}>
          <View style={{marginTop: -80}}>
            <View
              style={{
                backgroundColor: Colors.white,
                borderRadius: 10,
                padding: 10,
                margin: 20,
                height: '94%',
              }}>
              <WebView
                source={{uri: 'http://www.vbctv.in/terms-and-conditions.html'}}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TermsOfService;

const styles = StyleSheet.create({});
