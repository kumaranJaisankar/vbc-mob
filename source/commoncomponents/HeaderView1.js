import React, {useEffect} from 'react';
import {Colors} from './Colors';
import {
  View,
  Text,
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
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import {strings} from '../strings/i18n';
import Search from '../commoncomponents/Search';
import {useNavigation} from '@react-navigation/native';
import {Dialog, DialogContent, SlideAnimation} from 'react-native-popup-dialog';
import {showAppInstruction} from './Common';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import {operations} from '../redux/Main';
import {bindActionCreators} from 'redux';
import apiConfig from '../apiwebservices/apiConfig';
import FlaticonAnimatedIcon from './FlatIconAnimatedIcon';
import messaging from '@react-native-firebase/messaging';

const HeaderView = props => {
  const [search, setSearch] = React.useState('');
  const [wish, setWish] = React.useState('');

  useEffect(() => {
    var day = new Date();
    var hr = day.getHours();
    if (hr >= 0 && hr < 12) {
      setWish('Good Morning!');
    } else if (hr == 12) {
      setWish('Good Noon!');
    } else if (hr >= 12 && hr <= 17) {
      setWish('Good Afternoon!');
    } else {
      setWish('Good Evening!');
    }
  }, []);

  const navigation = useNavigation();

  const [logoutVisible, setLogoutVisible] = React.useState(false);

  const onLogOutPress = async () => {
    const getData = async () => {
      const data = await AsyncStorage.getItem('username');
      console.log(data);
      console.log('unsubscribe');

      messaging()
        .unsubscribeFromTopic(`${data}`)
        .then(() => console.log('UnSubscribed to topic!'));
    };
    await getData();

    setLogoutVisible(false);
    props.onRequestClose(false);
    props.updateAuthentication(false);
    AsyncStorage.clear();
    navigation.navigate('Login');
  };

  const notificationList = () => {
    navigation.navigate('notification');
  };

  const searchData = text => {};

  if (props.showDashboardHeader) {
    return (
      <LinearGradient
        colors={[Colors.colorgradient1, Colors.colorgradient3]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        useAngle={true}
        angle={45}
        angleCenter={{x: 0.5, y: 0.5}}
        style={
          props.showName
            ? styles.dashboard_header_container_notification
            : styles.dashboard_header_container
        }>
        <View
          style={{
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'center',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 0.6, flexDirection: 'row', marginTop: -100}}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Image
                  source={require('../assets/images/menuicon1.png')}
                  style={{alignSelf: 'center', marginLeft: 10}}></Image>
              </TouchableOpacity>
              {props.showName ? (
                <View style={{flexDirection: 'column', marginLeft: 15}}>
                  <Text
                    numberOfLines={3}
                    style={{
                      fontFamily: 'Titillium-Semibold',
                      color: '#FFFFFF',
                      fontSize: 20,
                      marginTop: 10,
                      width: 180,
                    }}>
                    {props.username}
                  </Text>
                </View>
              ) : (
                <View style={{flexDirection: 'column', marginLeft: 15}}>
                  <Text
                    numberOfLines={3}
                    style={{
                      fontFamily: 'Titillium-Semibold',
                      color: '#FFFFFF',
                      fontSize: 15,
                      width: 180,
                    }}>
                    {'Hello 👋' + ' \n'}
                    {props.username}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontFamily: 'Titillium-Semibold1',
                      color: '#FFFFFF',
                      fontSize: 15,
                      marginTop: 5,
                      width: 180,
                    }}>
                    {wish
                      ? wish
                      : `Welcome to ${apiConfig.REACT_APP_CLIENT_NAME}`}
                  </Text>
                </View>
              )}
            </View>
            {props.showName ? (
              <View
                style={{
                  flex: 0.4,
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    showAppInstruction();
                  }}>
                  <FontAwesome
                    name={'bell-o'}
                    size={22}
                    color={Colors.white}
                    style={{padding: 5}}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={{
                  flex: 0.4,
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginTop: -80,
                }}>
                <TouchableOpacity
                  onPress={() => props.onRefreshClicked()}
                  style={{marginTop: -30, marginHorizontal: 10}}>
                  <Feather
                    name={'refresh-ccw'}
                    size={25}
                    color={Colors.white}
                    style={{padding: 5}}
                  />
                </TouchableOpacity>
                {/* <TouchableOpacity
                 onPress={() => {
                  navigation.navigate('Complaints');
                }}
                  style={{marginTop: -30, marginHorizontal: 10}}>
                  <FontAwesome
                      name={'ticket'}
                      size={22}
                    color={Colors.white}
                    style={{padding: 5}}
                    />
                </TouchableOpacity> */}
                {/* <FlaticonAnimatedIcon
      onPress={() => navigation.navigate('Complaints')}
    /> */}
                <TouchableOpacity
                  onPress={() => {
                    showAppInstruction();
                  }}
                  style={{marginTop: -30, marginHorizontal: 2}}>
                  <FontAwesome
                    name={'bell-o'}
                    size={22}
                    color={Colors.white}
                    style={{padding: 5}}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* <View
            style={{
              marginTop: 15,
              marginLeft: 20,
              marginRight: 20,
              marginBottom: 25,
            }}>
            <Search
              value={search}
              onChangeText={text => setSearch(text)}
              onClearText={() => setSearch('')}
              //onMICClicked={() => {}}
            />
          </View> */}
        </View>
      </LinearGradient>
    );
  } else if (props.showHeader) {
    return (
      <LinearGradient
        colors={[Colors.colorgradient1, Colors.colorgradient3]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        useAngle={true}
        angle={45}
        angleCenter={{x: 0.5, y: 0.5}}
        style={{
          height: 160,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}>
        <View
          style={{
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'center',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 0.6, flexDirection: 'row', marginTop: -35}}>
              <TouchableOpacity onPress={() => props.onMenuClick()}>
                <Image
                  source={require('../assets/images/menuicon1.png')}
                  style={{alignSelf: 'center', marginLeft: 10}}></Image>
              </TouchableOpacity>
              <View style={{flexDirection: 'column', marginLeft: 15}}>
                <Text
                  style={{
                    fontFamily: 'Titillium-Semibold',
                    color: '#FFFFFF',
                    fontSize: 18,
                    marginTop: 10,
                  }}>
                  {props.title}
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 0.4,
                justifyContent: 'flex-end',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              {props.showRefreshIcon ? (
                <TouchableOpacity
                  onPress={() => props.onRefreshClicked()}
                  style={{marginHorizontal: 10, marginTop: -30}}>
                  <Feather
                    name={'refresh-ccw'}
                    size={25}
                    color={Colors.white}
                    style={{padding: 5}}
                  />
                </TouchableOpacity>
              ) : null}
              {props.showFilterIcon ? (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    marginHorizontal: 10,
                    marginTop: -30,
                  }}>
                  <TouchableOpacity onPress={() => props.onFilterClick()}>
                    <View
                      style={{
                        borderWidth: 2,
                        borderColor: Colors.white,
                        flexDirection: 'row',
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <MaterialCommunityIcons
                        name={'filter'}
                        size={20}
                        color={Colors.white}
                        style={{padding: 3}}
                      />
                      <Text
                        style={{
                          textAlign: 'center',
                          fontFamily: 'Titillium-Semibold',
                          color: Colors.white,
                          fontSize: 15,
                          marginHorizontal: 10,
                        }}>
                        {props.filterText}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ) : null}
              {props.showCommentPlusIcon ? (
                <TouchableOpacity
                  onPress={() => props.onAddClicked()}
                  style={{marginHorizontal: 10, marginTop: -30}}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontFamily: 'Titillium-Semibold',
                      color: '#ffffff',
                      fontSize: 14,
                      backgroundColor: '#3F79E9',
                      height: 40,
                      padding: 10,
                      borderRadius: 5,
                      marginTop: 5,
                    }}>
                    Add Complaint
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </View>
      </LinearGradient>
    );
  } else if (props.showSideMenu) {
    return (
      <Modal
        animationType="slideInLeft"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => {
          props.onRequestClose(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => props.onRequestClose(false)}
                style={{flex: 1}}>
                <Text
                  style={{
                    textAlign: 'right',
                    fontFamily: 'Titillium-Semibold',
                    color: Colors.red_FF0000,
                    fontSize: 16,
                  }}>
                  Close
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1.5, flexDirection: 'row'}}>
                <Image
                  source={require('../assets/images/dashboard_user_icon.png')}
                  style={{
                    alignSelf: 'center',
                    marginLeft: 10,
                    height: 55,
                    width: 55,
                  }}></Image>
                <Text
                  style={{
                    fontFamily: 'Titillium-Semibold',
                    color: Colors.black,
                    fontSize: 18,
                    textAlignVertical: 'center',
                    marginLeft: 10,
                  }}>
                  Hello,{'\n'}
                  <TouchableOpacity
                    onPress={() => {
                      props.onRequestClose(false);
                      navigation.navigate('Profile');
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Titillium-Semibold',
                        color: Colors.black,
                        fontSize: 16,
                      }}>
                      {props.user.first_name + ' ' + props.user.last_name}
                    </Text>
                  </TouchableOpacity>
                </Text>
              </View>
              <View
                style={{
                  flex: 0.5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    props.onRequestClose(false);
                    navigation.navigate('Profile');
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      margin: 10,
                      alignContent: 'center',
                    }}>
                    {/* <MaterialIcons
                      name={'edit'}
                      size={20}
                      color={Colors.black}
                    /> */}
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                height: 1,
                width: '100%',
                backgroundColor: Colors.grey_A9A9A9,
                marginVertical: 10,
              }}></View>

            <View style={{flex: 1}}>
              <ScrollView>
                <TouchableOpacity
                  onPress={() => {
                    props.onRequestClose(false);
                    navigation.navigate('NewDashboard');
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      margin: 10,
                      alignContent: 'center',
                    }}>
                    <Ionicons name={'home'} size={20} color={Colors.black} />
                    <Text
                      style={{
                        fontFamily: 'Titillium-Semibold',
                        color: Colors.black,
                        fontSize: 16,
                        textAlignVertical: 'center',
                        marginLeft: 10,
                      }}>
                      Home
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    showAppInstruction();
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      margin: 10,
                      alignContent: 'center',
                    }}>
                    <MaterialIcons
                      name={'payment'}
                      size={22}
                      color={Colors.black}
                    />
                    <Text
                      style={{
                        fontFamily: 'Titillium-Semibold',
                        color: Colors.black,
                        fontSize: 16,
                        textAlignVertical: 'center',
                        marginLeft: 10,
                      }}>
                      Bill Payment
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    props.onRequestClose(false);
                    navigation.navigate('InvoiceHistory');
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      margin: 10,
                      alignContent: 'center',
                    }}>
                    <Ionicons
                      name={'newspaper-outline'}
                      size={22}
                      color={Colors.black}
                    />
                    <Text
                      style={{
                        fontFamily: 'Titillium-Semibold',
                        color: Colors.black,
                        fontSize: 16,
                        textAlignVertical: 'center',
                        marginLeft: 10,
                      }}>
                      Invoice History
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    props.onRequestClose(false);
                    navigation.navigate('DataUsageHistory');
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      margin: 10,
                      alignContent: 'center',
                    }}>
                    <MaterialIcons
                      name={'history'}
                      size={23}
                      color={Colors.black}
                    />
                    <Text
                      style={{
                        fontFamily: 'Titillium-Semibold',
                        color: Colors.black,
                        fontSize: 16,
                        textAlignVertical: 'center',
                        marginLeft: 10,
                      }}>
                      Data Usage History
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    props.onRequestClose(false);
                    navigation.navigate('SessionHistory');
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      margin: 10,
                      alignContent: 'center',
                    }}>
                    <MaterialCommunityIcons
                      name={'format-section'}
                      size={25}
                      color={Colors.black}
                    />
                    <Text
                      style={{
                        fontFamily: 'Titillium-Semibold',
                        color: Colors.black,
                        fontSize: 16,
                        textAlignVertical: 'center',
                        marginLeft: 10,
                      }}>
                      Session History
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    props.onRequestClose(false);
                    navigation.navigate('Complaints');
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      margin: 10,
                      alignContent: 'center',
                    }}>
                    <FontAwesome
                      name={'ticket'}
                      size={23}
                      color={Colors.black}
                    />
                    <Text
                      style={{
                        fontFamily: 'Titillium-Semibold',
                        color: Colors.black,
                        fontSize: 16,
                        textAlignVertical: 'center',
                        marginLeft: 10,
                      }}>
                      Complaints
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    props.onRequestClose(false);
                    navigation.navigate('PlanRenewal');
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      margin: 10,
                      alignContent: 'center',
                    }}>
                    <MaterialIcons
                      name={'autorenew'}
                      size={24}
                      color={Colors.black}
                    />
                    <Text
                      style={{
                        fontFamily: 'Titillium-Semibold',
                        color: Colors.black,
                        fontSize: 16,
                        textAlignVertical: 'center',
                        marginLeft: 10,
                      }}>
                      Plan Renewal
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    // props.onRequestClose(false);
                    // navigation.navigate('ReferAFriend');
                    showAppInstruction();
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      margin: 10,
                      alignContent: 'center',
                    }}>
                    <Feather
                      name={'user-check'}
                      size={24}
                      color={Colors.black}
                    />
                    <Text
                      style={{
                        fontFamily: 'Titillium-Semibold',
                        color: Colors.black,
                        fontSize: 16,
                        textAlignVertical: 'center',
                        marginLeft: 10,
                      }}>
                      Refer A Friend
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    showAppInstruction();
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      margin: 10,
                      alignContent: 'center',
                    }}>
                    <Feather name={'settings'} size={23} color={Colors.black} />
                    <Text
                      style={{
                        fontFamily: 'Titillium-Semibold',
                        color: Colors.black,
                        fontSize: 16,
                        textAlignVertical: 'center',
                        marginLeft: 10,
                      }}>
                      Settings
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    props.onRequestClose(false);
                    navigation.navigate('DocumentList');
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      margin: 10,
                      alignContent: 'center',
                    }}>
                    <Feather
                      name={'hard-drive'}
                      size={23}
                      color={Colors.black}
                    />
                    <Text
                      style={{
                        fontFamily: 'Titillium-Semibold',
                        color: Colors.black,
                        fontSize: 16,
                        textAlignVertical: 'center',
                        marginLeft: 10,
                      }}>
                      Documents
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setLogoutVisible(true);
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      margin: 10,
                      alignContent: 'center',
                    }}>
                    <MaterialIcons
                      name={'logout'}
                      size={23}
                      color={Colors.black}
                    />
                    <Text
                      style={{
                        fontFamily: 'Titillium-Semibold',
                        color: Colors.black,
                        fontSize: 16,
                        textAlignVertical: 'center',
                        marginLeft: 10,
                      }}>
                      Logout
                    </Text>
                  </View>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </View>

        <Dialog visible={logoutVisible} width={0.9}>
          <DialogContent
            style={{padding: 10, backgroundColor: Colors.color_e0e0e0}}>
            <View style={{flexDirection: 'column'}}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text
                  style={{
                    fontFamily: 'Titillium-Semibold',
                    color: '#000000',
                    fontSize: 18,
                  }}>
                  Do you want to logout?
                </Text>
              </View>

              <View
                style={{
                  alignSelf: 'center',
                  marginTop: 20,
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  onPress={() => setLogoutVisible(false)}
                  style={{
                    backgroundColor: Colors.color_5E0F8B,
                    borderRadius: 20,
                  }}>
                  <View
                    style={{flexDirection: 'column', padding: 7, width: 120}}>
                    <Text
                      style={{
                        fontFamily: 'Titillium-Semibold',
                        color: '#ffffff',
                        fontSize: 16,
                        alignSelf: 'center',
                      }}>
                      No
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    onLogOutPress();
                  }}
                  style={{
                    backgroundColor: Colors.color_5E0F8B,
                    borderRadius: 20,
                    marginLeft: 20,
                  }}>
                  <View
                    style={{flexDirection: 'column', padding: 7, width: 120}}>
                    <Text
                      style={{
                        fontFamily: 'Titillium-Semibold',
                        color: '#ffffff',
                        fontSize: 16,
                        alignSelf: 'center',
                      }}>
                      Yes
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </DialogContent>
        </Dialog>
      </Modal>
    );
  }
  if (props.showTermsHeader) {
    return (
      <LinearGradient
        colors={[Colors.colorgradient1, Colors.colorgradient3]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        useAngle={true}
        angle={45}
        angleCenter={{x: 0.5, y: 0.5}}
        style={{
          height: 160,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}>
        <View
          style={{
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'center',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 0.6, flexDirection: 'row', marginTop: -35}}>
              <TouchableOpacity onPress={() => props.onBackClicked()}>
                <Ionicons
                  name={'arrow-back'}
                  size={25}
                  color={Colors.white}
                  style={{alignSelf: 'center', marginLeft: 15}}
                />
              </TouchableOpacity>
              <View style={{flexDirection: 'column', marginLeft: 15}}>
                <Text
                  style={{
                    fontFamily: 'Titillium-Semibold',
                    color: '#FFFFFF',
                    fontSize: 18,
                    textAlign: 'center',
                  }}>
                  {props.title}
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 0.4,
                justifyContent: 'flex-end',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              {props.showRefreshIcon ? (
                <TouchableOpacity
                  onPress={() => props.onRefreshClicked()}
                  style={{marginTop: -30, marginHorizontal: 20}}>
                  <Feather
                    name={'refresh-ccw'}
                    size={25}
                    color={Colors.white}
                    style={{padding: 5}}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </View>
      </LinearGradient>
    );
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(HeaderView);

const styles = StyleSheet.create({
  container: {
    height: 100,
  },
  dashboard_header_container: {
    height: 250,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  dashboard_header_container_notification: {
    height: 90,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: '100%',
  },
  modalView: {
    backgroundColor: Colors.white,
    padding: 10,
    height: '100%',
    width: '80%',
    borderRadius: 10,
  },
  textStyle: {
    fontSize: 25,
    color: 'white',
    flex: 1,
  },
});
