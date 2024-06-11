import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  NativeModules,
  Alert,
  BackHandler,
  Linking,
  PermissionsAndroid,
} from 'react-native';
import {Colors} from '../commoncomponents/Colors';
import Headerview from '../commoncomponents/HeaderView1';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DialogView from '../commoncomponents/DialogView';
import {strings} from '../strings/i18n';
import APIServices from '../apiwebservices/APIServices';
import {format} from 'date-fns';
import NewDashboardRechargeView from './NewDashboardRechargeView';
import {w3cwebsocket as W3CWebSocket} from 'websocket';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showAppInstruction} from '../commoncomponents/Common';
import {operations} from '../redux/Main';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {convertToTwoDecimals} from '../utils/NumberConversion';
import VersionCheck from 'react-native-version-check';
import messaging from '@react-native-firebase/messaging';

import {
  Divider,
  Modal,
  Portal,
  Provider,
  useTheme as useMDtheme,
  Text as Txt,
} from 'react-native-paper';
import AppUpdate from '../utils/AppUpdate.js';
import CustomTabNav from '../navigation/CustomTabNav.jsx';
import {useTheme} from '@react-navigation/native';
const DashBoard = ({navigation, user, setPlan}) => {
  const color = useTheme().colors;
  const materialColor = useMDtheme().colors;
  const [visible, setVisible] = React.useState(false);
  const [versionDetails, setVersionDetails] = React.useState({});
  const [modalVisible, setModalVisible] = React.useState(false);

  const [isLoading, setLoading] = React.useState(true);

  const [isData, setData] = React.useState([]);
  console.log(isData, 'isData');

  const [isExpDate, setExpDate] = React.useState('');
  const [formatExpDate, setFormatExpDate] = React.useState('');
  const [currentMonthConsumption, setCurrentMonthConsumption] =
    React.useState('');
  const [currentMonthAssign, setCurrentMonthAssign] = React.useState('');
  const [currentMonthUpload, setCurrentMonthUpload] = React.useState('');
  const [currentMonthDownload, setCurrentMonthDownload] = React.useState('');
  const [todayConsumption, setTodayConsumption] = React.useState('');
  const [todayUpload, setTodayUpload] = React.useState('');
  const [todayDownload, setTodayDownload] = React.useState('');
  const [cstatus, setCStatus] = React.useState('');
  const [isDialogVisible, setDialogVisible] = React.useState(false);
  const [isItemData, setItemData] = React.useState({});

  const [pData, setPData] = React.useState({});
  const [isDataAvailable, setIsDataAvailable] = React.useState(false);
  const [noDataAvailable, setNoDataAvailable] = React.useState(true);
  const [isPLoading, setPLoading] = React.useState(true);
  // const checkUpdateNeeded = async () => {
  //   try {
  //     console.log(VersionCheck.getCurrentVersion());

  //     const updateNeeded = await VersionCheck.needUpdate();
  //     console.log(updateNeeded);
  //     if (updateNeeded && updateNeeded.isNeeded) {
  //       await AsyncStorage.setItem('isUpdate', updateNeeded.isNeeded);

  //       // setVersionDetails(updateNeeded);
  //       setVisible(updateNeeded.isNeeded);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  React.useEffect(() => {
    getDashboardData();
    // checkUpdateNeeded();
  }, [navigation]);

  const checkEnvironment = () => {
    let environment = '';
    if (config.serverUrl == 'https://admin.sparkradius.in') {
      environment = 'prod';
    } else if (config.serverUrl == 'https://qa.sparkradius.in') {
      environment = 'qa';
    } else {
      environment = 'dev';
    }
    return environment;
  };

  const getDashboardData = async () => {
    console.log('hi');
    setLoading(true);
    await APIServices.getDashboardData(
      response => {
        console.log('res', response);
        if (response.status == 200) {
          console.log('DASH DATA', response.data?.adress?.id);
          console.log('expected data', response?.data);
          setPlan(response?.data);
          setData(response?.data);
          var formattedExpDate = format(
            new Date(response?.data?.plan_end),
            'd MMM, yyyy',
          );
          setFormatExpDate(formattedExpDate);
          var currentMonthUsage =
            response.data.current_month_usage_from_monthy_date[0]
              .total_data_consumed;
          setCurrentMonthConsumption(
            Number(currentMonthUsage?.split('GB')[0]).toFixed(1),
          );
          var todaysConsumption =
            response.data.today_consumption[0].data.toFixed(1);
          setTodayConsumption(todaysConsumption);

          let todaysUpload =
            response.data.today_consumption[0].upload.toFixed(1);
          setTodayUpload(todaysUpload);
          let todaysDownload =
            response.data.today_consumption[0].download.toFixed(1);
          setTodayDownload(todaysDownload);
          setCStatus(response.data.customer_status);

          var totalMdataAssign =
            response.data.current_month_usage_from_monthy_date[0]
              .total_assigned;

          setCurrentMonthAssign(
            Number(totalMdataAssign.split('GB')[0]).toFixed(1),
          );
          var uploadMonth =
            response.data.current_month_usage_from_monthy_date[0].total_upload;
          setCurrentMonthUpload(Number(uploadMonth.split('GB')[0]).toFixed(1));
          var downloadMonth =
            response.data.current_month_usage_from_monthy_date[0]
              .total_download;
          setCurrentMonthDownload(
            Number(downloadMonth.split('GB')[0]).toFixed(1),
          );
          AsyncStorage.setItem('customerID', response.data.username);
          AsyncStorage.setItem(
            'areaID',
            response.data?.customer_area_id?.toString(),
          );

          // var exp_date = response.data.expiry_date;
          // var msDiff = new Date(exp_date).getTime() - new Date().getTime();
          // var daysExp = Math.floor(msDiff / (1000 * 60 * 60 * 24));
          // setExpDate(daysExp);
          setLoading(false);
        } else {
          setLoading(false);
        }
      },
      error => {
        setLoading(false);
      },
    );
  };

  useEffect(() => {
    const getData = async () => {
      const data = await AsyncStorage.getItem('username');
      console.log(data);
      console.log('jjdcdsjs');
      messaging()
        .subscribeToTopic(`${data}`)
        .then(() => console.log('Subscribed to topic!'));
    };
    getData();
  }, []);

  const connectPaymentGateWay = async (planId, amount) => {
    setPLoading(true);
    await APIServices.openPaymentGateWay(
      planId,
      amount,
      response => {
        if (response.status == 200) {
          setPData(response.data);
          setIsDataAvailable(true);
          setNoDataAvailable(false);
          setPLoading(false);
          if (pData) {
            navigation.navigate('PaymentGateWayWebView', {
              url: response.data.next,
            });
          }
          var p_Id = response.data.payment_id;
          openWSConnection(p_Id);
        } else {
          setIsDataAvailable(false);
          setNoDataAvailable(true);
          setPLoading(false);
        }
      },
      error => {
        setIsDataAvailable(false);
        setNoDataAvailable(true);
        setPLoading(false);
      },
    );
  };

  const openWSConnection = payment_id => {
    var client = new W3CWebSocket(
      `${apiConfig.wssURL}:7006/ws/${payment_id}/listen/payment/status`,
    );
    client.onopen = () => {};
    client.onmessage = message => {
      const dataFromServer = JSON.parse(message.data);
      if (dataFromServer.status === 1) {
        setTimeout(() => {
          navigation.navigate('NewDashboard');
        }, 5000);
      } else if (dataFromServer.status === 2) {
        setTimeout(() => {
          navigation.navigate('NewDashboard');
        }, 5000);
      } else {
        setTimeout(() => {
          navigation.navigate('NewDashboard');
        }, 5000);
      }
    };
  };

  const showHistoryPopup = itemData => {
    setItemData(itemData);
    setDialogVisible(true);
  };

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const updateApp = () => {
    BackHandler.exitApp();

    Linking.openURL(
      'https://play.google.com/store/apps/details?id=sparkradiuscustomerinfo.in',
    );
  };
  return (
    <Provider>
      <Portal>
        <SafeAreaView style={{flex: 1}}>
          <Portal>
            {/* <AppUpdate
              visible={visible}
              hideModal={hideModal}
              versionDetails={versionDetails}
            /> */}
          </Portal>

          <View style={{flex: 1}}>
            <Headerview
              username={user.first_name + ' ' + user.last_name}
              showDashboardHeader
              onMenuClick={() => {
                setModalVisible(true);
              }}
              onRefreshClicked={() => {
                getDashboardData();
              }}
            />

            <View style={{flex: 1}}>
              <View style={{marginTop: -130}}>
                <ScrollView
                  style={{}}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}>
                  <View
                    style={{
                      backgroundColor: materialColor.onSecondary,
                      flex: 1,
                      borderRadius: 10,
                      padding: 20,
                      margin: 20,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row-reverse',
                        marginBottom: 10,
                        // justifyContent:'center'
                      }}>
                      {/* <View style={{flexDirection: 'row', flex: 1}}>
                    <Text
                      style={{
                        fontFamily: 'Titillium-Semibold',
                        color: '#000000',
                        fontSize: 16,
                        marginBottom: 10,
                      }}>
                      Account Status: {cstatus}{' '}
                    </Text>
                    <AntDesign
                      name={
                        cstatus == 'Active' ? 'checkcircle' : 'closecircleo'
                      }
                      size={18}
                      color={cstatus == 'Active' ? '#04AA6D' : '#E83023'}
                      style={{
                        marginLeft: 8,
                        marginTop: 3,
                      }}
                    />
                  </View> */}
                    </View>
                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View
                          style={{
                            flex: 0.5,
                            flexDirection: 'row',
                            marginTop: -10,
                          }}>
                          <Text
                            style={{
                              fontFamily: 'Titillium-Semibold',
                              color: color.text,
                              fontSize: 16,
                            }}>
                            Your Plan
                          </Text>
                        </View>
                        <View
                          style={{
                            flex: 0.5,
                            flexDirection: 'row',
                            marginTop: -10,
                            marginLeft: 80,
                          }}>
                          <Text
                            style={{
                              fontFamily: 'Titillium-Semibold',
                              color: color.text,
                              fontSize: 16,
                            }}>
                            Customer ID
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View
                          style={{
                            flex: 0.5,
                            flexDirection: 'row',
                            marginTop: -10,
                          }}>
                          <View
                            style={{
                              flexDirection: 'column',
                              alignItems: 'flex-start',
                              marginTop: 10,
                            }}>
                            <View
                              style={{
                                flex: 0.5,
                                flexDirection: 'column',
                                marginTop: -10,
                              }}>
                              <Text
                                style={{
                                  fontFamily: 'Titillium-Semibold',
                                  color: color.primary,
                                  fontSize: 15,
                                  marginTop: 10,
                                }}>
                                {isData?.plan_name}
                              </Text>
                            </View>
                            <View
                              style={{
                                flex: 1,
                                flexDirection: 'row',
                                //alignItems: 'flex-start',
                                marginTop: 5,
                              }}>
                              <FontAwesome
                                name={'rupee'}
                                size={20}
                                color={color.primary}
                                style={{marginTop: 7}}
                              />
                              <Text
                                style={{
                                  fontFamily: 'Titillium-Semibold',
                                  color: color.primary,
                                  fontSize: 22,
                                  marginLeft: 5,
                                }}>
                                {isData?.plan_cost
                                  ? parseFloat(isData?.plan_cost).toFixed(2)
                                  : '0'}
                              </Text>
                              <Text
                                style={{
                                  fontFamily: 'Titillium-Semibold',
                                  color: color.primary,
                                  fontSize: 15,
                                  marginTop: 7,
                                }}>
                                {' '}
                                /{' '}
                                {isData?.plan_time_unit +
                                  ' ' +
                                  isData.plan_unit_type}
                              </Text>
                            </View>
                          </View>
                        </View>

                        <View
                          style={{
                            flex: 0.5,
                            flexDirection: 'row',
                            marginTop: -10,
                            marginLeft: 80,
                          }}>
                          <Text
                            style={{
                              fontFamily: 'Titillium-Semibold',
                              color: color.primary,
                              fontSize: 16,
                            }}>
                            {isData.username}
                          </Text>
                        </View>
                      </View>
                      {/* 
                  <View
                    style={{
                      backgroundColor: Colors.grey_F8F7FD,
                      height: 2,
                      marginTop: 20,
                    }}></View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 10,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Titillium-Semibold',
                        color: '#000000',
                        fontSize: 16,
                        marginTop: 7,
                      }}>
                      Your Usage
                    </Text>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                      onPress={() => {
                        navigation.navigate('DataUsageHistory');
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Titillium-Semibold',
                          color: '#0000ff',
                          fontSize: 12,
                          marginTop: 10,
                          marginLeft: 10,
                        }}>
                        View History
                      </Text>
                      <Image
                        source={require('../assets/images/nexticon.png')}
                        style={{
                          alignSelf: 'center',
                          marginLeft: 5,
                          height: 18,
                          width: 18,
                          marginTop: 10,
                        }}></Image>
                    </TouchableOpacity>
                  </View> */}
                      <Divider bold style={{marginTop: 10}} />
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: 10,
                        }}>
                        <View
                          style={{
                            flex: 0.5,
                            flexDirection: 'row',
                            marginTop: 4,
                          }}>
                          <Text
                            style={{
                              fontFamily: 'Titillium-Semibold',
                              color: color.text,
                              fontSize: 16,
                              marginBottom: 5,
                            }}>
                            This Month
                          </Text>
                        </View>
                      </View>
                      <View>
                        <View
                          style={{
                            flexDirection: 'row',
                          }}>
                          <View style={{flex: 0.2, flexDirection: 'row'}}>
                            <MaterialIcons
                              name={'router'}
                              size={30}
                              color={'#E84577'}
                              // style={{marginTop: 25}}
                            />
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              flex: 1,
                            }}>
                            <View
                              style={{
                                flex: 0.4,
                                flexDirection: 'column',
                                marginTop: 2,
                              }}>
                              <Text
                                style={{
                                  fontFamily: 'Titillium-Semibold',
                                  color: color.text,
                                  fontSize: 15,
                                }}>
                                {isData?.thismonth_consumed_data
                                  ? isData?.thismonth_consumed_data?.toFixed(2)
                                  : '0'}{' '}
                                <Text
                                  style={{
                                    fontFamily: 'Titillium-Semibold',
                                    color: color.text,
                                    fontSize: 11,
                                  }}>
                                  {/* {'GB'} */}
                                </Text>
                                {/* {'/'}
                            {currentMonthAssign}{' '} */}
                                <Text
                                  style={{
                                    fontFamily: 'Titillium-Semibold',
                                    color: color.text,
                                    fontSize: 11,
                                  }}>
                                  {'GB'}
                                </Text>
                              </Text>
                            </View>
                            <View
                              style={{
                                flex: 0.4,
                                flexDirection: 'column',
                                marginTop: 2,
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  flex: 0.3,
                                }}>
                                <AntDesign
                                  name={'arrowup'}
                                  size={18}
                                  color={'#04AA6D'}
                                  style={{
                                    marginTop: 3,
                                  }}
                                />
                                <Text
                                  style={{
                                    fontFamily: 'Titillium-Semibold',
                                    color: color.text,
                                    fontSize: 15,
                                  }}>
                                  {isData?.this_month_upload_data
                                    ? isData?.this_month_upload_data?.toFixed(2)
                                    : '0'}{' '}
                                  <Text
                                    style={{
                                      fontFamily: 'Titillium-Semibold',
                                      color: color.text,
                                      fontSize: 11,
                                    }}>
                                    {'GB'}
                                  </Text>
                                </Text>
                              </View>
                            </View>
                            <View
                              style={{
                                flex: 0.4,
                                flexDirection: 'column',
                                marginTop: 2,
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  flex: 0.3,
                                }}>
                                <AntDesign
                                  name={'arrowdown'}
                                  size={18}
                                  color={'#04AA6D'}
                                  style={{
                                    marginTop: 3,
                                    marginLeft: 10,
                                  }}
                                />
                                <Text
                                  style={{
                                    fontFamily: 'Titillium-Semibold',
                                    color: color.text,
                                    fontSize: 15,
                                  }}>
                                  {isData?.this_month_download_data
                                    ? isData?.this_month_download_data?.toFixed(
                                        2,
                                      )
                                    : '0'}{' '}
                                  <Text
                                    style={{
                                      fontFamily: 'Titillium-Semibold',
                                      color: color.text,
                                      fontSize: 11,
                                    }}>
                                    {'GB'}
                                  </Text>
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: 10,
                        }}>
                        <View
                          style={{
                            flex: 0.5,
                            flexDirection: 'row',
                            marginTop: 4,
                          }}>
                          <Text
                            style={{
                              fontFamily: 'Titillium-Semibold',
                              color: color.text,
                              fontSize: 16,
                              marginBottom: 5,
                            }}>
                            Today
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: 15,
                        }}>
                        <View
                          style={{
                            flex: 0.3,
                            flexDirection: 'row',
                            marginTop: -10,
                          }}>
                          <FontAwesome5
                            name={'wifi'}
                            size={20}
                            color={'#37C9D1'}
                            style={{marginTop: 7}}
                          />
                        </View>
                        <View
                          style={{
                            flex: 0.6,
                            flexDirection: 'column',
                            marginTop: -10,
                          }}>
                          <Text
                            style={{
                              fontFamily: 'Titillium-Semibold',
                              color: color.text,
                              fontSize: 16,
                            }}>
                            Total
                          </Text>
                          <Text
                            style={{
                              fontFamily: 'Titillium-Semibold',
                              color: color.text,
                              fontSize: 18,
                            }}>
                            {isData?.today_consumed_data
                              ? isData?.today_consumed_data?.toFixed(2)
                              : 0}{' '}
                            <Text
                              style={{
                                fontFamily: 'Titillium-Semibold',
                                color: color.text,
                                fontSize: 11,
                              }}>
                              {'GB'}
                            </Text>
                          </Text>
                        </View>
                        <View
                          style={{
                            flex: 0.6,
                            flexDirection: 'column',
                            marginTop: -10,
                          }}>
                          <Text
                            style={{
                              fontFamily: 'Titillium-Semibold',
                              color: color.text,
                              fontSize: 16,
                            }}>
                            {/* Upload */}
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              flex: 0.3,
                            }}>
                            <AntDesign
                              name={'arrowup'}
                              size={18}
                              color={'#04AA6D'}
                              style={{
                                marginTop: 3,
                              }}
                            />
                            <Text
                              style={{
                                fontFamily: 'Titillium-Semibold',
                                color: color.text,
                                fontSize: 18,
                              }}>
                              {todayDownload ? todayDownload : 0}{' '}
                              <Text
                                style={{
                                  fontFamily: 'Titillium-Semibold',
                                  color: color.text,
                                  fontSize: 11,
                                }}>
                                {'GB'}
                              </Text>
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            flex: 0.6,
                            flexDirection: 'column',
                            marginTop: -10,
                          }}>
                          <Text
                            style={{
                              fontFamily: 'Titillium-Semibold',
                              color: color.text,
                              fontSize: 16,
                            }}>
                            {/* Download */}
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              flex: 0.3,
                            }}>
                            <AntDesign
                              name={'arrowdown'}
                              size={18}
                              color={'#04AA6D'}
                              style={{
                                marginTop: 3,
                                marginLeft: 10,
                              }}
                            />
                            <Text
                              style={{
                                fontFamily: 'Titillium-Semibold',
                                color: color.text,
                                fontSize: 18,
                              }}>
                              {todayDownload ? todayDownload : 0}{' '}
                              <Text
                                style={{
                                  fontFamily: 'Titillium-Semibold',
                                  color: color.text,
                                  fontSize: 11,
                                }}>
                                {'GB'}
                              </Text>
                            </Text>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row-reverse',
                          marginTop: 10,
                        }}>
                        {/* <TouchableOpacity
                      style={{}}
                      onPress={() => {
                        navigation.navigate('DataUsageHistory');
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Titillium-Semibold',
                          color: '#0000ff',
                          fontSize: 16,
                          marginTop: 10,
                          fontWeight: '700',
                        }}>
                        View History
                      </Text>
                    </TouchableOpacity> */}
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      backgroundColor: materialColor.primaryContainer,
                      borderRadius: 10,
                      padding: 10,
                      marginHorizontal: 20,
                      marginBottom: 25,
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View style={{flex: 1, flexDirection: 'column'}}>
                        <Text
                          style={{
                            fontFamily: 'Titillium-Semibold',
                            color: color.text,
                            fontSize: 14,
                          }}>
                          Expiry Date
                        </Text>
                        <View style={{flexDirection: 'row'}}>
                          <Text
                            style={{
                              fontFamily: 'Titillium-Semibold',
                              color: color.text,
                              fontSize: 16,
                            }}>
                            {formatExpDate}
                          </Text>
                        </View>
                        {/* <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          fontFamily: 'Titillium-Semibold',
                          color: '#000000',
                          fontSize: 14,
                          marginLeft: 10,
                          marginTop: 2,
                        }}>
                        {isExpDate + ' days left'}
                      </Text>
                    </View> */}
                      </View>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('PlanRenewal')}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                          }}>
                          <Text
                            style={{
                              fontFamily: 'Titillium-Semibold',
                              color: materialColor.primaryContainer,
                              fontSize: 16,
                              backgroundColor: materialColor.primary,
                              padding: 10,
                              borderRadius: 10,
                            }}>
                            Recharge Now
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View
                    style={{
                      backgroundColor: materialColor.secondaryContainer,
                      borderRadius: 10,
                      padding: 10,
                      marginHorizontal: 20,
                      marginBottom: 25,
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View style={{flex: 1, flexDirection: 'column'}}>
                        <Text
                          style={{
                            fontFamily: 'Titillium-Semibold',
                            color: color.text,
                            fontSize: 14,
                          }}>
                          Raise a Complaint
                        </Text>
                        {/* <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          fontFamily: 'Titillium-Semibold',
                          color: '#000000',
                          fontSize: 16,
                        }}>
                        {formatExpDate}
                      </Text>
                    </View> */}
                      </View>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('Complaints')}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                          }}>
                          <Text
                            style={{
                              fontFamily: 'Titillium-Semibold',
                              color: materialColor.primaryContainer,
                              fontSize: 16,
                              backgroundColor: materialColor.primary,
                              padding: 10,
                              borderRadius: 10,
                            }}>
                            Proceed
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View
                    style={{
                      backgroundColor: materialColor.tertiaryContainer,
                      borderRadius: 10,
                      padding: 10,
                      marginHorizontal: 20,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <View style={{flex: 1, flexDirection: 'column'}}>
                        <Txt
                          style={{
                            fontFamily: 'Titillium-Semibold',
                            color: color.text,
                            fontSize: 14,
                          }}>
                          Wallet Balance
                        </Txt>
                        <View style={{flexDirection: 'row'}}>
                          <Txt
                            style={{
                              fontFamily: 'Titillium-Semibold',
                              color: color.text,
                              fontSize: 16,
                            }}>
                            {convertToTwoDecimals(isData?.wallet_info)}
                          </Txt>
                        </View>
                        {/* <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          fontFamily: 'Titillium-Semibold',
                          color: '#000000',
                          fontSize: 14,
                          marginLeft: 10,
                          marginTop: 2,
                        }}>
                        {isExpDate + ' days left'}
                      </Text>
                    </View> */}
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          showAppInstruction();
                        }}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                          }}>
                          <Text
                            style={{
                              fontFamily: 'Titillium-Semibold',
                              color: '#ffffff',
                              fontSize: 16,
                              backgroundColor: materialColor.tertiary,
                              padding: 10,
                              borderRadius: 10,
                            }}>
                            Add Money
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={{margin: 20}}>
                    <Text
                      style={{
                        fontFamily: 'Titillium-Semibold',
                        color: color.text,
                        fontSize: 15,
                      }}>
                      Offers For You
                    </Text>
                  </View>

                  <View
                    style={{
                      marginTop: -10,
                      backgroundColor: color.card,
                      height: 120,
                      padding: 10,
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View
                        style={{
                          marginHorizontal: 5,
                          flex: 0.5,
                          padding: 5,
                          height: '100%',
                          flexDirection: 'column',
                          backgroundColor: '#D7FDFE',
                          borderRadius: 10,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Image
                          source={require('../assets/images/moviesicon.png')}
                          style={{
                            alignSelf: 'center',
                            marginLeft: 10,
                            height: 40,
                            width: 40,
                            marginTop: 10,
                          }}></Image>
                        <Text
                          style={{
                            fontFamily: 'Titillium-Semibold',
                            color: '#000000',
                            fontSize: 15,
                            alignSelf: 'center',
                            textAlign: 'center',
                            marginTop: 5,
                          }}>
                          Get OTT For Free
                        </Text>
                      </View>
                      <View
                        style={{
                          marginHorizontal: 5,
                          flex: 0.5,
                          padding: 5,
                          height: '100%',
                          flexDirection: 'column',
                          backgroundColor: '#DEFFEC',
                          borderRadius: 10,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Image
                          source={require('../assets/images/voipicon.png')}
                          style={{
                            alignSelf: 'center',
                            marginLeft: 10,
                            height: 40,
                            width: 40,
                            marginTop: 10,
                          }}></Image>
                        <Text
                          style={{
                            fontFamily: 'Titillium-Semibold',
                            color: '#000000',
                            fontSize: 15,
                            alignSelf: 'center',
                            textAlign: 'center',
                            marginTop: 5,
                          }}>
                          Get CABLE TV For Free
                        </Text>
                      </View>
                      <View
                        style={{
                          marginHorizontal: 5,
                          flex: 0.5,
                          padding: 5,
                          height: '100%',
                          flexDirection: 'column',
                          backgroundColor: '#FFF3D1',
                          borderRadius: 10,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Image
                          source={require('../assets/images/cctvicon.png')}
                          style={{
                            alignSelf: 'center',
                            marginLeft: 10,
                            height: 40,
                            width: 40,
                            marginTop: 10,
                          }}></Image>
                        <Text
                          style={{
                            fontFamily: 'Titillium-Semibold',
                            color: '#000000',
                            fontSize: 15,
                            alignSelf: 'center',
                            textAlign: 'center',
                            marginTop: 5,
                          }}>
                          Get CCTV Surveillance
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={{margin: 20}}>
                    <Text
                      style={{
                        fontFamily: 'Titillium-Semibold',
                        color: color.text,
                        fontSize: 15,
                        marginTop: -10,
                      }}>
                      Shop Items
                    </Text>
                  </View>

                  <View
                    style={{
                      marginTop: -10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: color.card,
                      padding: 10,
                    }}>
                    <View style={{flex: 0.5, flexDirection: 'row'}}>
                      <Image
                        source={require('../assets/images/router1_icon.png')}
                        style={{
                          alignSelf: 'center',
                          height: 100,
                          width: '100%',
                          borderRadius: 10,
                        }}></Image>
                    </View>
                    <View
                      style={{flex: 0.5, flexDirection: 'row', marginLeft: 10}}>
                      <Image
                        source={require('../assets/images/router2_icon.png')}
                        style={{
                          alignSelf: 'center',
                          height: 100,
                          width: '100%',
                          borderRadius: 10,
                        }}></Image>
                    </View>
                  </View>
                </ScrollView>
              </View>
            </View>
            {visible && (
              <View
                style={{
                  marginBottom: 5,
                  backgroundColor: 'black',
                  marginHorizontal: 5,
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 50,
                }}>
                <TouchableOpacity onPress={updateApp}>
                  <Text
                    style={{
                      // height: 50,
                      // textAlign: 'center',
                      fontSize: 16,
                      fontFamily: 'Titillium-Semibold',
                      color: Colors.blue_295CBF,
                    }}>
                    {/* {'Prod' + '-' + '28-02-2022 1:00'} */}
                    New version is Available {''}
                    <Text
                      style={{
                        // height: 50,
                        // textAlign: 'center',
                        fontSize: 16,
                        fontFamily: 'Titillium-Semibold',
                        color: Colors.white,
                        textDecorationLine: 'underline',
                      }}>
                      Download
                    </Text>
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            <CustomTabNav active={'Home'} />
            {isDialogVisible ? (
              <NewDashboardRechargeView
                showDetailedRechargeView
                showDialogVisible={isDialogVisible}
                data={isItemData}
                closeDialog={() => {
                  setDialogVisible(false);
                }}
                openWebView={() => {
                  connectPaymentGateWay(isData.id, isData.total_plan_cost);
                }}
              />
            ) : null}
          </View>

          {modalVisible && (
            <Headerview
              showSideMenu
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            />
          )}
          <DialogView
            showLoadingDialog
            visible={isLoading}
            text={strings('Dashboard.LoadingDashboard')}></DialogView>
        </SafeAreaView>
      </Portal>
    </Provider>
  );
};

function mapStateToProps(state, props) {
  return {
    user: state.mainReducers.main.user,
    plan: state.mainReducers.main.plan,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(operations, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);

const styles = StyleSheet.create({});
