import React from 'react';
import {Colors} from '../commoncomponents/Colors';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import {strings} from '../strings/i18n';
import Search from '../commoncomponents/Search';
import {useNavigation} from '@react-navigation/native';
import {Dialog, DialogContent, SlideAnimation} from 'react-native-popup-dialog';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Text, Button, TextInput} from 'react-native-paper';

export default LoginOTPView = props => {
  const [search, setSearch] = React.useState('');

  const navigation = useNavigation();

  const [logoutVisible, setLogoutVisible] = React.useState(false);

  const [otpUsername, setOtpUsername] = React.useState('');

  const searchData = text => {};

  if (props.showOTPView) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.mobilenotitleStyle}>
          {strings('Login.EnterMobileNumber')}
        </Text>
        <Text style={styles.otpmessageStyle}>
          {strings('Login.otpMessage')}
        </Text>
        <View style={styles.searchSection}>
          <AntDesign
            name={'mobile1'}
            size={25}
            color={Colors.black}
            style={{
              marginTop: 6,
              padding: 11,
              backgroundColor: Colors.grey_C0C0C0,
              borderTopLeftRadius: 5,
              borderBottomLeftRadius: 5,
            }}
          />
          <TextInput
            mode="outlined"
            label={strings('Login.Mobileno')}
            value={otpUsername}
            returnKeyType="next"
            autoCapitalize="none"
            keyboardType={'numeric'}
            maxLength={10}
            placeholderStyle={{fontSize: 20}}
            underlineColorAndroid="transparent"
            style={{
              fontSize: 15,
              width: 250,
              fontFamily: 'Titillium-Semibold',
              fontWeight: 'normal',
              height: 45,
              backgroundColor: Colors.white,
              marginLeft: -2,
            }}
            onChangeText={text => setOtpUsername(text)}
            theme={{
              colors: {
                placeholder: Colors.grey_888888,
                text: Colors.black,
                primary: Colors.grey_C0C0C0,
                underlineColor: 'transparent',
                backgroundColor: Colors.white,
              },
              fonts: {
                regular: {
                  fontFamily: 'Titillium-Semibold',
                  fontWeight: 'normal',
                },
              },
            }}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            props.onOtpClicked(otpUsername);
          }}>
          <Ionicons
            name={'eye'}
            size={18}
            color={'#000000'}
            style={{marginTop: 2}}
          />
        </TouchableOpacity>

        <Button
          mode="contained"
          onPress={props.onOtpClicked(otpUsername)}
          uppercase={false}
          style={{backgroundColor: '#C0C0C0', width: 300, marginTop: 30}}>
          <Text
            style={{
              autoCapitalize: 'none',
              fontSize: 16,
              fontFamily: 'Titillium-Semibold',
              fontWeight: 'normal',
              color: Colors.black,
            }}>
            {strings('Login.SendOtp')}
          </Text>
        </Button>

        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 30}}>
          <View
            style={{
              width: 100,
              height: 1,
              backgroundColor: Colors.grey_888888,
            }}></View>
          <View>
            <Text
              style={{
                autoCapitalize: 'none',
                fontSize: 16,
                fontFamily: 'Titillium-Semibold',
                fontWeight: 'normal',
                color: Colors.black,
                margin: 10,
              }}>
              {strings('Login.Or')}
            </Text>
          </View>
          <View
            style={{
              width: 100,
              height: 1,
              backgroundColor: Colors.grey_888888,
            }}></View>
        </View>

        <Button
          mode="contained"
          onPress={props.onOtpClicked(otpUsername)}
          uppercase={false}
          style={{
            backgroundColor: '#FFFFFF',
            width: 300,
            marginTop: 10,
            borderColor: 'blue',
            borderWidth: 1,
          }}>
          <Text
            style={{
              autoCapitalize: 'none',
              fontSize: 16,
              fontFamily: 'Titillium-Semibold',
              fontWeight: 'normal',
              color: Colors.black,
            }}>
            {strings('Login.LoginWithUsername')}
          </Text>
        </Button>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  mobilenotitleStyle: {
    fontFamily: 'Titillium-Semibold',
    color: Colors.black,
    fontSize: 18,
    textAlign: 'center',
  },
  mobilenotitleStyle1: {
    fontFamily: 'Titillium-Semibold',
    color: Colors.black,
    fontSize: 16,
    textAlign: 'center',
  },
  otpmessageStyle: {
    fontFamily: 'Titillium-Semibold',
    color: Colors.grey_888888,
    fontSize: 16,
    textAlign: 'center',
  },
  messageStyle: {
    fontFamily: 'Titillium-Semibold',
    color: Colors.black,
    fontSize: 18,
    textAlign: 'center',
    width: 280,
    marginTop: 20,
  },
  loginButtonStyle: {
    backgroundColor: '#4C6DD8',
    width: 280,
    marginVertical: 20,
  },
  loginButtonTextStyle: {
    fontSize: 20,
    fontFamily: 'Titillium-Semibold',
    fontWeight: 'normal',
    color: Colors.white,
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 30,
  },
  searchSection1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 10,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
  },
  hyperlinkStyle: {
    color: 'blue',
    fontFamily: 'Titillium-Semibold',
    fontSize: 14,
  },
  hyperlinkStyle1: {
    color: 'black',
    fontFamily: 'Titillium-Semibold',
    fontSize: 13,
  },
});
