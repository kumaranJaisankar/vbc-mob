import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  Text,
  Button,
  TextInput,
  useTheme as useMDtheme,
} from 'react-native-paper';
import {Colors} from '../commoncomponents/Colors';
import {strings} from '../strings/i18n';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import APIServices from '../apiwebservices/APIServices';
import OTPTextInput from 'react-native-otp-textinput';
import DialogView from '../commoncomponents/DialogView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {operations} from '../redux/Main';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Toast from 'react-native-toast-message';
import apiConfig from '../apiwebservices/apiConfig';
import _BackgroundTimer from 'react-native-background-timer';
import {useTheme} from '@react-navigation/native';

function LoginScreen({navigation, setUser, updateAuthentication}) {
  const color = useTheme().colors;
  const materialColor = useMDtheme().colors;
  const [username, setUsername] = useState({
    value: '',
    error: '',
  });
  const [password, setPassword] = useState({value: '', error: ''});
  const [showmobilenoview, SetMobileNoView] = useState(true);
  const [showuserloginview, SetUserLoginView] = useState(false);
  const [showotpview, SetOtpView] = useState(false);
  const [otpUsername, setOtpUsername] = useState('');
  const [isAlertDialogShow, setAlertDialogShow] = useState(false);
  const [isAlertMessage, setAlertMessage] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isLoadingText, setLoadingText] = useState('');
  const [otpText, setOTPText] = useState('');
  const [timeLeft, setTimeLeft] = useState(null);
  const [otpExpiry, setOtpExpiry] = useState(null);
  const [enteredotpText, setEnteredOTPText] = useState('');
  const [showOTPErrorMessage, setShowOTPErrorMessage] = useState(false);
  const [error, setError] = useState(false);
  const [showPassword, setShowpassword] = useState(false);

  useEffect(() => {
    if (timeLeft === 0) {
      setTimeLeft(null);
    }
    if (!timeLeft) return;

    const intervalId = _BackgroundTimer.setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => _BackgroundTimer.clearInterval(intervalId);
  }, [timeLeft]);

  useEffect(() => {
    if (otpExpiry === 0) {
      setOtpExpiry(null);
    }
    if (!otpExpiry) return;
    const intervalId = _BackgroundTimer.setInterval(() => {
      setOtpExpiry(otpExpiry - 1);
    }, 1000);
    return () => _BackgroundTimer.clearInterval(intervalId);
  }, [otpExpiry]);

  const onMobileLoginPressed = () => {
    SetMobileNoView(false);
    SetUserLoginView(true);
    SetOtpView(false);
  };

  const onUserLoginPressed = () => {
    SetMobileNoView(true);
    SetUserLoginView(false);
    SetOtpView(false);
  };

  const onOTPPressed = () => {
    if (otpUsername.length > 0) {
      setLoading(true);
      setLoadingText(strings('Login.SendingOTP'));
      sendOTP();
    } else {
      setAlertMessage(strings('Login.EnterUsername'));
      setAlertDialogShow(true);
    }
  };

  const sendOTP = async () => {
    await APIServices.sendOTP(
      otpUsername,
      response => {
        setOTPText(strings('Login.PleaseEnter') + ' ' + response.data.message);
        setTimeout(() => {
          setShowOTPErrorMessage(false);
          setLoading(false);
          SetMobileNoView(false);
          SetUserLoginView(false);
          SetOtpView(true);
          setTimeLeft(60);
          setOtpExpiry(300);
        }, 100);
      },
      error => {
        setError(true);
        setLoading(false);
        SetMobileNoView(false);
        SetUserLoginView(false);
        SetOtpView(false);
        SetMobileNoView(true);
        setTimeout(() => {
          setError(false);
        }, 5000);
      },
    );
  };

  const onOTPLoginPressed = async () => {
    if (enteredotpText.length > 0) {
      setLoading(true);
      setShowOTPErrorMessage(false);
      setLoadingText(strings('Login.VerifyingOTP'));
      verifyOTP();
    }
  };

  const verifyOTP = async () => {
    await APIServices.verifyOTP(
      otpUsername,
      enteredotpText,
      response => {
        if (response.status == 200) {
          if (response.data.message == 'OTP matched') {
            loginOTP();
          } else {
            setLoading(false);
            setShowOTPErrorMessage(true);
          }
        } else {
          setLoading(false);
          setShowOTPErrorMessage(true);
        }
      },
      error => {
        setLoading(false);
        setShowOTPErrorMessage(true);
      },
    );
  };

  const loginOTP = async () => {
    await APIServices.loginOTP(
      otpUsername,
      enteredotpText,
      response => {
        // if (response.status == 200) {
        //   try {
        //     AsyncStorage.setItem('token', response.data.access);
        //     AsyncStorage.setItem('refreshtoken', response.data.refresh);
        //   } catch (exception) {}
        //   setLoading(false);
        //   navigation.reset({
        //     index: 0,
        //     routes: [{name: 'NewDashboard'}],
        //   });
        // } else {
        //   setLoading(false);
        // }
        if (response.status == 200) {
          console.log('login response', response.data.id);
          AsyncStorage.setItem('token', response.data.access);
          AsyncStorage.setItem('refreshtoken', response.data.refresh);
          AsyncStorage.setItem('username', response.data.username);
          AsyncStorage.setItem('id', response?.data?.id.toString());
          updateAuthentication(true);
          setUser(response?.data);
          setLoading(false);
          setLoadingText('');
          navigation.reset({
            index: 0,
            routes: [{name: 'Dash', params: {screen: 'NewDashboard'}}],
          });
          //APIServices.localDisplayNotification();
        } else {
          const errorresponse = response;
          setLoading(false);
          setLoadingText('');
          setError(true);
        }
      },
      error => {
        setLoading(false);
      },
    );
  };

  const onLoginPressed = () => {
    if (username.value.length > 0 && password.value.length > 0) {
      sendLogin();
    } else {
      setAlertMessage(strings('Login.EnterUsernamePass'));
      setAlertDialogShow(true);
    }
  };

  const handleShowPassword = () => {
    setShowpassword(!showPassword);
  };

  const sendLogin = async () => {
    setLoading(true);
    setLoadingText('Loading...');
    await APIServices.postLogin(
      username,
      password,
      response => {
        if (response.status == 200) {
          console.log('login1 response', response.data.id);
          AsyncStorage.setItem('token', response.data.access);
          AsyncStorage.setItem('refreshtoken', response.data.refresh);
          AsyncStorage.setItem('username', response.data.username);
          AsyncStorage.setItem('id', response?.data?.id.toString());
          updateAuthentication(true);
          setUser(response?.data);
          setLoading(false);
          setLoadingText('');
          navigation.reset({
            index: 0,
            routes: [{name: 'Dash', params: {screen: 'NewDashboard'}}],
          });
          //APIServices.localDisplayNotification();
        } else {
          const errorresponse = response;
          setLoading(false);
          setLoadingText('');
          setError(true);
        }
      },
      error => {
        const errorresponse = error.toString();
        setLoading(false);
        setLoadingText('');
        setError(true);
      },
    );
  };
  const formatTime = timeInSeconds => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  const styles = StyleSheet.create({
    container: {
      height: '100%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: color.card,
    },
    mobilenotitleStyle: {
      fontFamily: 'Titillium-Semibold',
      color: color.text,
      fontSize: 18,
      textAlign: 'center',
      marginTop: 10,
    },
    mobilenotitleStyle1: {
      fontFamily: 'Titillium-Semibold',
      color: color.text,
      fontSize: 16,
      textAlign: 'center',
    },
    otperrormessageStyle: {
      fontFamily: 'Titillium-Semibold',
      color: Colors.red_FF0000,
      fontSize: 16,
      textAlign: 'center',
      marginTop: 10,
    },
    otpmessageStyle: {
      fontFamily: 'Titillium-Semibold',
      color: Colors.grey_888888,
      fontSize: 16,
      textAlign: 'center',
      margin: 10,
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
    searchSection: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: color.card,
      marginTop: 30,
    },
    searchSection1: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: color.card,
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
      backgroundColor: color.card,
      color: color.text,
    },
    hyperlinkStyle: {
      color: color.primary,
      fontFamily: 'Titillium-Semibold',
      fontSize: 14,
      textAlign: 'center',
    },
    hyperlinkStyle1: {
      color: color.text,
      fontFamily: 'Titillium-Semibold',
      fontSize: 13,
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView
        style={{
          marginTop: 30,
          height: '100%',
        }}>
        <SafeAreaView style={{flex: 1, justifyContent: 'center', padding: 10}}>
          {/* <StatusBar translucent backgroundColor={color.card} /> */}

          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={{
                flex: 0.2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image source={apiConfig.Logo_Name}></Image>
            </View>

            {showmobilenoview ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
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
                    color={materialColor.primary}
                    style={{
                      marginTop: 6,
                      padding: 11,
                      backgroundColor: color.border,
                      borderTopLeftRadius: 5,
                      borderBottomLeftRadius: 5,
                    }}
                  />
                  <TextInput
                    mode="outlined"
                    label="User ID"
                    value={otpUsername}
                    returnKeyType="next"
                    autoCapitalize="none"
                    keyboardType={'default'}
                    // maxLength={10}
                    placeholderStyle={{fontSize: 20}}
                    underlineColorAndroid="transparent"
                    style={{
                      fontSize: 15,
                      width: 250,
                      fontFamily: 'Titillium-Semibold',
                      fontWeight: 'normal',
                      // height: 45,
                      backgroundColor: color.card,
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

                <Button
                  mode="contained"
                  onPress={onOTPPressed}
                  uppercase={false}
                  style={{
                    backgroundColor: materialColor.primary,
                    width: 300,
                    marginTop: 30,
                  }}>
                  <Text
                    style={{
                      autoCapitalize: 'none',
                      fontSize: 16,
                      fontFamily: 'Titillium-Semibold',
                      fontWeight: 'normal',
                      color: Colors.white,
                    }}>
                    {strings('Login.SendOtp')}
                  </Text>
                </Button>
                <Text
                  style={{
                    fontFamily: 'Titillium-Semibold',
                    color: Colors.red_FF0000,
                    fontSize: 14,
                  }}>
                  {error ? 'Please enter valid username' : ''}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 30,
                  }}>
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
                        color: color.text,
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
                  onPress={onMobileLoginPressed}
                  uppercase={false}
                  style={{
                    backgroundColor: color.border,
                    width: 300,
                    marginTop: 10,
                    borderColor: color.primary,
                    borderWidth: 1,
                    marginBottom: 10,
                  }}>
                  <Text
                    style={{
                      autoCapitalize: 'none',
                      fontSize: 16,
                      fontFamily: 'Titillium-Semibold',
                      fontWeight: 'normal',
                      color: color.text,
                    }}>
                    {strings('Login.LoginWithUsername')}
                  </Text>
                </Button>
              </View>
            ) : null}

            {showotpview ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.mobilenotitleStyle}>
                  {strings('Login.EnterOtpVerify')}
                </Text>
                <Text style={styles.otpmessageStyle}>{otpText}</Text>

                <OTPTextInput
                  handleTextChange={e => {
                    setEnteredOTPText(e);
                  }}
                  textInputStyle={{
                    borderColor: Colors.red_FF0000,
                    borderWidth: 2,
                    fontFamily: 'Titillium-Semibold',
                    color: color.text,
                    fontSize: 18,
                  }}
                  offTintColor={Colors.grey_E5E5E5}
                  inputCount={6}
                  tintColor={Colors.grey_E5E5E5}
                />

                {showOTPErrorMessage && (
                  <Text style={[styles.otperrormessageStyle]}>
                    {strings('Login.entervalidotp')}
                  </Text>
                )}

                <Button
                  mode="contained"
                  onPress={onOTPLoginPressed}
                  uppercase={false}
                  style={{
                    backgroundColor: materialColor.primary,
                    width: 300,
                    marginTop: 20,
                  }}>
                  <Text
                    style={{
                      autoCapitalize: 'none',
                      fontSize: 16,
                      fontFamily: 'Titillium-Semibold',
                      fontWeight: 'normal',
                      color: Colors.white,
                    }}>
                    {strings('Login.OtpVerify')}
                  </Text>
                </Button>
                {otpExpiry != null && (
                  <View>
                    <Text style={[styles.otpmessageStyle, {marginTop: 20}]}>
                      {'OTP will Expire in' +
                        ' ' +
                        formatTime(otpExpiry) +
                        ' ' +
                        strings('Login.seconds')}
                    </Text>
                  </View>
                )}
                {/* {timeLeft != null && (
                  <View>
                    <Text style={[styles.otpmessageStyle, {marginTop: 20}]}>
                      {strings('Login.resendotpcode') +
                        ' ' +
                        timeLeft +
                        ' ' +
                        strings('Login.seconds')}
                    </Text>
                  </View>
                )} */}

                {/* {timeLeft == null && (
                  <View>
                    <Text style={[styles.otpmessageStyle, {marginTop: 20}]}>
                      {strings('Login.didnotreceiveOtp')}
                    </Text>
                    <TouchableOpacity onPress={onOTPPressed}>
                      <Text
                        style={[
                          styles.otpmessageStyle,
                          {color: 'blue', marginTop: -5},
                        ]}>
                        {strings('Login.resendnow')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )} */}

                <View>
                  <Text style={[styles.otpmessageStyle, {marginTop: 20}]}>
                    {strings('Login.didnotreceiveOtp')}
                  </Text>
                  <TouchableOpacity onPress={onOTPPressed}>
                    <Text
                      style={[
                        styles.otpmessageStyle,
                        {color: color.primary, marginTop: -5},
                      ]}>
                      {strings('Login.resendnow')}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 30,
                  }}>
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
                        color: color.text,
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
                  onPress={onMobileLoginPressed}
                  uppercase={false}
                  style={{
                    backgroundColor: color.border,
                    width: 300,
                    marginTop: 10,
                    borderColor: color.primary,
                    borderWidth: 1,
                  }}>
                  <Text
                    style={{
                      autoCapitalize: 'none',
                      fontSize: 16,
                      fontFamily: 'Titillium-Semibold',
                      fontWeight: 'normal',
                      color: color.text,
                    }}>
                    {strings('Login.LoginWithUsername')}
                  </Text>
                </Button>
              </View>
            ) : null}

            {showuserloginview ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.mobilenotitleStyle}>
                  {strings('Login.EnterUsernamePassLogin')}
                </Text>
                {showotpview && (
                  <Text style={styles.otpmessageStyle}>
                    {strings('Login.otpMessage')}
                  </Text>
                )}
                <View style={styles.searchSection}>
                  <AntDesign
                    name={'user'}
                    size={30}
                    color={materialColor.primary}
                    style={{
                      marginTop: 6,
                      padding: 11,
                      backgroundColor: color.border,
                      borderTopLeftRadius: 5,
                      borderBottomLeftRadius: 5,
                    }}
                  />
                  <TextInput
                    mode="outlined"
                    label="User ID"
                    value={username.value}
                    returnKeyType="next"
                    autoCapitalize="none"
                    keyboardType="default"
                    placeholderStyle={{fontSize: 20}}
                    underlineColorAndroid="transparent"
                    style={{
                      fontSize: 15,
                      width: 250,
                      fontFamily: 'Titillium-Semibold',
                      fontWeight: 'normal',
                      // height: 45,
                      backgroundColor: color.card,
                      marginLeft: -2,
                      paddingBottom: 0,
                    }}
                    onChangeText={text => setUsername({value: text, error: ''})}
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

                <View style={[styles.searchSection1]}>
                  <Ionicons
                    name={'key-outline'}
                    size={30}
                    color={materialColor.primary}
                    style={{
                      marginTop: 6,
                      padding: 11,
                      backgroundColor: color.border,
                      borderTopLeftRadius: 5,
                      borderBottomLeftRadius: 5,
                    }}
                  />
                  <TextInput
                    mode="outlined"
                    label={strings('Login.Password')}
                    value={password.value}
                    returnKeyType="next"
                    autoCapitalize="none"
                    keyboardType="default"
                    secureTextEntry={showPassword ? false : true}
                    placeholderStyle={{fontSize: 20}}
                    underlineColorAndroid="transparent"
                    style={{
                      fontSize: 15,
                      width: 250,
                      fontFamily: 'Titillium-Semibold',
                      fontWeight: 'normal',
                      // height: 45,
                      backgroundColor: color.card,
                      marginLeft: -2,
                      paddingBottom: 0,
                    }}
                    onChangeText={text => setPassword({value: text, error: ''})}
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
                  <TouchableOpacity
                    onPress={handleShowPassword}
                    style={{
                      marginTop: 2,
                      position: 'absolute',
                      alignItems: 'flex-end',
                      right: 10,
                    }}>
                    {showPassword ? (
                      <Ionicons name={'eye'} size={18} color={color.primary} />
                    ) : (
                      <Ionicons
                        name={'eye-off'}
                        size={18}
                        color={color.primary}
                      />
                    )}
                  </TouchableOpacity>
                </View>
                <Text
                  style={{
                    fontFamily: 'Titillium-Semibold',
                    color: Colors.red_FF0000,
                    fontSize: 14,
                  }}>
                  {error ? 'Wrong username or password!' : ''}
                </Text>
                <Button
                  mode="contained"
                  onPress={onLoginPressed}
                  uppercase={false}
                  style={{
                    backgroundColor: materialColor.primary,
                    width: 300,
                    marginTop: 30,
                  }}>
                  <Text
                    style={{
                      autoCapitalize: 'none',
                      fontSize: 18,
                      fontFamily: 'Titillium-Semibold',
                      fontWeight: 'normal',
                      color: Colors.white,
                    }}>
                    {strings('Login.Login')}
                  </Text>
                </Button>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 30,
                  }}>
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
                        color: color.text,
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
                  onPress={onUserLoginPressed}
                  uppercase={false}
                  style={{
                    backgroundColor: color.border,
                    width: 300,
                    marginTop: 10,
                    borderColor: color.primary,
                    borderWidth: 1,
                    marginBottom: 10,
                  }}>
                  <Text
                    style={{
                      autoCapitalize: 'none',
                      fontSize: 16,
                      fontFamily: 'Titillium-Semibold',
                      fontWeight: 'normal',
                      color: color.text,
                    }}>
                    {strings('Login.LoginWithPhone')}
                  </Text>
                </Button>
              </View>
            ) : null}

            <View
              style={{
                flex: 0.2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.hyperlinkStyle1}>
                By Providing my mobile number, I hereby agree and accept{' '}
                <Text
                  style={styles.hyperlinkStyle}
                  onPress={() => {
                    //Linking.openURL('https://www.google.com');
                    navigation.navigate('TermsOfService');
                  }}>
                  Terms and Conditions
                </Text>
                <Text style={styles.hyperlinkStyle1}> and </Text>
                <Text
                  style={styles.hyperlinkStyle}
                  onPress={() => {
                    navigation.navigate('PrivacyPolicy');
                  }}>
                  Privacy Policy
                </Text>
                <Text style={styles.hyperlinkStyle1}> in use of the app. </Text>
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>

      <DialogView
        showAlertDialog
        confirmText={strings('Dialog.ok')}
        visible={isAlertDialogShow}
        text={isAlertMessage}
        onConfirm={() => {
          setAlertDialogShow(false);
        }}></DialogView>

      <DialogView
        showLoadingDialog
        visible={isLoading}
        text={isLoadingText}></DialogView>
    </View>
  );
}

function mapStateToProps(state, props) {
  return {
    user: state.mainReducers.main.user,
    updateAuthentication: state.mainReducers.main.updateAuthentication,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(operations, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
