import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {connect} from 'react-redux';
import {operations} from '../redux/Main';
import {bindActionCreators} from 'redux';
import {Button, Dialog, Text as Txt} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {Colors} from './Colors';

const LogoutDialog = props => {
  console.log('logout');
  const navigation = useNavigation();
  const onLogOutPress = async () => {
    const getData = async () => {
      const data = await AsyncStorage.getItem('username');
      console.log(data);
      console.log('unsubscribe');

      messaging()
        .unsubscribeFromTopic(`${data}`)
        .then(() => console.log('UnSubscribed to topic!'));
    };
    console.log(props);
    await getData();

    // props.onRequestClose(false);
    props.updateAuthentication(false);
    AsyncStorage.clear();

    navigation.navigate('Login');
  };
  return (
    <Dialog visible={props.logoutVisible} dismissable={false}>
      <Dialog.Content>
        <Txt variant="titleLarge">Do you want to logout?</Txt>
      </Dialog.Content>
      <Dialog.Actions style={{justifyContent: 'space-between'}}>
        <Button onPress={() => props.setLogoutVisible(false)}>Cancel</Button>
        <Button
          mode="contained"
          style={{width: 60}}
          onPress={() => onLogOutPress()}>
          Yes
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
};

function mapStateToProps(state, props) {
  return {
    updateAuthentication: state.mainReducers.main.updateAuthentication,
    user: state.mainReducers.main.user,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(operations, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutDialog);
