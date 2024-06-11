import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {Button, RadioButton, useTheme as useMDtheme} from 'react-native-paper';
import {Colors} from '../../commoncomponents/Colors';
import Headerview from '../../commoncomponents/HeaderView1';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Dialog, DialogContent, SlideAnimation} from 'react-native-popup-dialog';
import APIServices from '../../apiwebservices/APIServices';
import NoData from '../../commoncomponents/NoData';
import {strings} from '../../strings/i18n';
import DialogView from '../../commoncomponents/DialogView';
import CurrentPlanTable from './CurrentPlanTable';
import AllPlanTable from './AllPlanTable';
import PlanDetails from './PlanDetails';
import {w3cwebsocket as W3CWebSocket} from 'websocket';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {operations} from '../../redux/Main';
import Toast from 'react-native-toast-message';
import {GetUserPlanData} from '../../apiwebservices/APIRequestQueryCreator';
import apiConfig from '../../apiwebservices/apiConfig';
import {useTheme} from '@react-navigation/native';

const DashBoard = ({plan, user, navigation}) => {
  const color = useTheme().colors;
  const materialColor = useMDtheme().colors;
  const [modalVisible, setModalVisible] = React.useState(false);
  console.log('plan.customer_id', plan.customer_id);
  console.log('details', plan);

  const [isCurrentDataLoading, setCurrentDataLoading] = React.useState(true);

  const [isAllDataLoading, setAllDataLoading] = React.useState(false);
  const [paymentLoading, setPaymenLoading] = React.useState(false);

  const [currentPlanData, setCurrentPlanData] = React.useState({});

  const [allPlanData, setAllPlanData] = React.useState([]);

  const [isCurrentPlanDataAvailable, setCurrentPlanDataAvailable] =
    React.useState(false);

  const [isNoCurrentPlanDataAvailable, setNoCurrentPlanDataAvailable] =
    React.useState(false);

  const [isAllPlanDataAvailable, setAllPlanDataAvailable] =
    React.useState(false);

  const [isNoAllPlanDataAvailable, setNoAllPlanDataAvailable] =
    React.useState(false);
  const [currentItemData, setCurrentItemData] = React.useState({});
  const [isCurrentDialogVisible, setCurrentDialogVisible] =
    React.useState(false);

  const [pData, setPData] = React.useState({});
  const [isDataAvailable, setIsDataAvailable] = React.useState(false);
  const [noDataAvailable, setNoDataAvailable] = React.useState(true);
  const [isPLoading, setPLoading] = React.useState(true);
  const [isShowMore, setIsShowMore] = React.useState(true);

  const [isShowLess, setIsShowLess] = React.useState(false);
  const [isAllDialogVisible, setAllDialogVisible] = React.useState(false);
  const [allItemData, setAllItemData] = React.useState([]);
  const [customerID, setCustomerID] = React.useState(null);
  const [offset, setOffset] = React.useState(1);
  const [upgradeBtn, setUpgradeBtn] = React.useState(false);
  const [upgradeType, setUpgradeType] = useState('gb');
  const [paymentType, setPaymentType] = useState('');

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getCustomerCurrentPlanData();
    });
    return unsubscribe;
  }, [navigation, plan]);

  useEffect(() => {
    getCustomerCurrentPlanData();
  }, [plan]);

  //    useEffect(()=>{
  //     getPlandata();
  //    },[])

  //    const getPlandata = async ()=>{

  //       await APIServices.GetUserDataForPlan(
  //         plan.customer_id,
  //         response => {
  //           if (response.status == 200) {
  //             console.log(response,"plan data from APi")
  //           }
  //         },
  //         error => {
  //          console.log(error)
  //         },
  //       );
  // }
  // Upgrade Plan
  const getCustomerUpgradePlanDataGB = async () => {
    setAllPlanData([]);
    setAllDataLoading(true);
    // const areaID = await AsyncStorage?.getItem('areaID');
    console.log('customer_area_id', plan?.customer_area_id);
    await APIServices.getUpgradePlansGB(
      plan?.customer_area_id,
      plan?.plan_id,
      response => {
        console.log('TOTAL RESPONSE OF PLAN', response.data);
        if (response.status == 200) {
          console.log(response?.data[0]);
          setAllPlanData(
            response.data?.sort((a, b) =>
              parseFloat(a.total_plan_cost) > parseFloat(b.total_plan_cost)
                ? 1
                : -1,
            ),
          );
          if (allPlanData.length > 0) {
            setAllPlanDataAvailable(true);
          } else {
            setNoAllPlanDataAvailable(false);
          }
          setAllDataLoading(false);
        } else {
          setNoAllPlanDataAvailable(true);
          setAllPlanDataAvailable(false);
          setAllDataLoading(false);
        }
      },
      error => {
        console.log('errr', error);
        setNoAllPlanDataAvailable(true);
        setAllPlanDataAvailable(false);
        setAllDataLoading(false);
      },
    );
  };

  const getCustomerUpgradePlanDataDays = async () => {
    setAllPlanData([]);
    setAllDataLoading(true);
    // const areaID = await AsyncStorage?.getItem('areaID');
    console.log('customer_area_id', plan?.customer_area_id);
    await APIServices.getUpgradePlansDays(
      plan?.customer_area_id,
      plan?.plan_id,
      response => {
        console.log('TOTAL RESPONSE OF PLAN', response.data);
        if (response.status == 200) {
          console.log(response?.data[0]);
          setAllPlanData(
            response.data?.sort((a, b) =>
              parseFloat(a.total_plan_cost) > parseFloat(b.total_plan_cost)
                ? 1
                : -1,
            ),
          );
          if (allPlanData.length > 0) {
            setAllPlanDataAvailable(true);
          } else {
            setNoAllPlanDataAvailable(false);
          }
          setAllDataLoading(false);
        } else {
          setNoAllPlanDataAvailable(true);
          setAllPlanDataAvailable(false);
          setAllDataLoading(false);
        }
      },
      error => {
        console.log('errr', error);
        setNoAllPlanDataAvailable(true);
        setAllPlanDataAvailable(false);
        setAllDataLoading(false);
      },
    );
  };

  //Change Plan

  const getCustomerCurrentPlanData = async () => {
    setCurrentDataLoading(true);
    console.log('hi');
    await APIServices.getCustomerCurrentPlan(
      plan?.plan_id,
      response => {
        console.log('resp', response);
        if (response.status == 200) {
          console.log('aaaaaa', response.data);
          setCurrentPlanData(response.data);
          setCustomerID(response.data.customer_id);
          setCurrentPlanDataAvailable(true);
          setNoCurrentPlanDataAvailable(false);
          setCurrentDataLoading(false);
        } else {
          setNoCurrentPlanDataAvailable(true);
          setCurrentPlanDataAvailable(false);
          setCurrentDataLoading(false);
        }
      },
      error => {
        setNoCurrentPlanDataAvailable(true);
        setCurrentPlanDataAvailable(false);
        setCurrentDataLoading(false);
      },
    );
  };

  const getAllPlanData = async () => {
    setAllDataLoading(true);
    // const areaID = await AsyncStorage?.getItem('areaID');
    console.log('customer_area_id', plan?.customer_area_id);
    await APIServices.getAreaPlans(
      plan?.customer_area_id,
      plan?.customer_id,
      response => {
        console.log('TOTAL RESPONSE OF PLAN', response.data);
        if (response.status == 200) {
          console.log(response?.data[0]);
          setAllPlanData(
            response.data?.sort((a, b) =>
              parseFloat(a.total_plan_cost) > parseFloat(b.total_plan_cost)
                ? 1
                : -1,
            ),
          );
          if (allPlanData.length > 0) {
            setAllPlanDataAvailable(true);
          } else {
            setNoAllPlanDataAvailable(false);
          }
          setAllDataLoading(false);
        } else {
          setNoAllPlanDataAvailable(true);
          setAllPlanDataAvailable(false);
          setAllDataLoading(false);
        }
      },
      error => {
        console.log('errr', error);
        setNoAllPlanDataAvailable(true);
        setAllPlanDataAvailable(false);
        setAllDataLoading(false);
      },
    );
  };
  const showCurrentPlanHistoryPopup = itemData => {
    setCurrentItemData(itemData);
    setCurrentDialogVisible(true);
  };
  const showAllPlansHistoryPopup = itemData => {
    setAllItemData(itemData);
    setAllDialogVisible(true);
  };
  const showButton = () => {
    if (isShowMore) {
      setPaymentType('change');
      getAllPlanData();
      setIsShowMore(false);
      setIsShowLess(true);
      setUpgradeBtn(false);
    } else if (isShowLess) {
      setAllPlanData([]);
      setIsShowMore(true);
      setIsShowLess(false);
      setUpgradeBtn(false);
    }
  };

  const showUpgradeButton = () => {
    setPaymentType('upgrade');
    setUpgradeBtn(true);
    getCustomerUpgradePlanDataGB();
    if (upgradeBtn) {
      setUpgradeBtn(false);
    }
  };

  const connectPaymentGateWayChnage = async (
    getCalculations,
    planID,
    amount,
    radius_info,
    use_wallet,
    area,
    customer_id,
    balance,
    props,
  ) => {
    setPLoading(true);
    setPaymenLoading(true);
    await APIServices.priorcheckAPI(
      area,
      props,
      async response => {
        if (response.status == 200) {
          console.log(response.data);
          console.log('succc', response);
          if (response.data.check) {
            await connectPaymentGateWayUpdate(
              getCalculations,
              planID,
              amount,
              radius_info,
              use_wallet,
              customer_id,
              balance ? balance : '',
              props,
            );
          } else {
            setPLoading(false);
            setPaymenLoading(false);
            Toast.show({
              type: 'error',
              text1: 'You do not have enough balance!',
              position: 'top',
            });
          }
        } else {
          setPLoading(false);
          setPaymenLoading(false);
        }
      },
      error => {
        console.log('ewror', error);
        setPLoading(false);
        setPaymenLoading(false);
      },
    );
  };

  const connectPaymentGateWay = async (
    getCalculations,
    planID,
    amount,
    cgst,
    sgst,
    radius_info,
    area,
    walletAmount,
    props,
  ) => {
    console.log('gateway', area);
    console.log(props, 'props');
    console.log(walletAmount, 'walletAmount');
    setPLoading(true);
    setPaymenLoading(true);
    await APIServices.priorcheckAPI(
      area,
      props,
      async response => {
        if (response.status == 200) {
          console.log(response.data);
          console.log('succc', response);
          if (response.data.check) {
            // setPaymenLoading(false);
            await callPaymentGateway(
              getCalculations,
              planID,
              amount,
              cgst,
              sgst,
              radius_info,
              walletAmount,
              props,
            );
          } else {
            setPaymenLoading(false);

            Toast.show({
              type: 'error',
              text1: 'You do not have enough balance!',
              position: 'top',
            });
          }
        } else {
          setPaymenLoading(false);

          setPLoading(false);
        }
      },
      error => {
        console.log('ewror', error);
        setPLoading(false);
        setPaymenLoading(false);
      },
    );
  };

  const callPaymentGateway = async (
    getCalculations,
    planID,
    amount,
    cgst,
    sgst,
    radius_info,
    walletAmount,
    props,
  ) => {
    console.log('call');

    await APIServices.openPaymentGateWay(
      getCalculations,
      planID,
      amount,
      cgst,
      sgst,
      radius_info,
      plan.customer_id,
      walletAmount,
      props,
      response => {
        console.log(' mela neeha ');
        const isSuccessString = response.status.toString();
        const isSuccessBool = isSuccessString[0] == 2;

        if (response.status == 200) {
          console.log('success neeha');
          console.log('aaaaa', response.data);
          setPData(response.data);
          setIsDataAvailable(true);
          setNoDataAvailable(false);
          setPLoading(true);
          setPaymenLoading(true);
          console.log('pdata', pData);
          if (pData) {
            console.log('pData neeha');
            setPLoading(false);
            setPaymenLoading(false);
            console.log('payment gateway');
            navigation.navigate('PaymentGateWayWebView', {
              url: response.data.next,
            });
          }
          var p_Id = response.data.payment_id;
          openWSConnection(p_Id);
          console.log('is success  da');
          console.log(isSuccessBool);
        } else if (isSuccessBool) {
          console.log('is success ha da');
          navigation.reset({
            index: 0,
            routes: [{name: 'NewDashboard'}],
          });
          Toast.show({
            type: 'success',
            text1: 'Successfull!! You have to refresh the dashboard!',
            position: 'top',
          });
        } else {
          setIsDataAvailable(false);
          setNoDataAvailable(true);
          setPLoading(false);
          setPaymenLoading(false);
          Toast.show({
            type: 'error',
            text1: `Something went wrong, Please try again later`,
            position: 'top',
          });
        }
      },
      error => {
        console.log('payment error', error);
        setIsDataAvailable(false);
        setNoDataAvailable(true);
        setPLoading(false);
        setPaymenLoading(false);
        Toast.show({
          type: 'error',
          text1: 'Something went wrong, Please try again later',
          position: 'top',
        });
      },
    );
  };

  const connectPaymentGateWayUpdate = async (
    getCalculations,
    planID,
    amount,
    radiusinfo,
    use_wallet,
    customer_id,
    balance,
    props,
  ) => {
    console.log('values', planID);
    console.log('values', amount);
    console.log('values', use_wallet);
    console.log('values', radiusinfo);
    console.log('values', customer_id);
    setPaymenLoading(true);
    setPLoading(true);
    await APIServices.openPaymentGateWayUpdate(
      getCalculations,
      planID,
      amount,
      radiusinfo,
      use_wallet,
      customer_id,
      balance ? balance : '',
      props,
      response => {
        console.log('gatewway response', response);
        if (response.status == 200) {
          setPData(response.data);
          setIsDataAvailable(true);
          setNoDataAvailable(false);
          setPLoading(false);
          setPaymenLoading(false);
          if (pData) {
            setPaymenLoading(false);
            setPaymenLoading(false);
            navigation.navigate('PaymentGateWayWebView', {
              url: response.data.next,
            });
          }
          var p_Id = response.data.payment_id;
          openWSConnection(p_Id);
        } else if (response.status == 204) {
          navigation.reset({
            index: 0,
            routes: [{name: 'NewDashboard'}],
          });
          Toast.show({
            type: 'success',
            text1: 'Successfull!! You have to refresh the dashboard!',
            position: 'top',
          });
        } else {
          setIsDataAvailable(false);
          setNoDataAvailable(true);
          setPLoading(false);
          setPaymenLoading(false);
        }
      },
      error => {
        console.log('gatewway response', error);
        setIsDataAvailable(false);
        setNoDataAvailable(true);
        setPLoading(false);
        setPaymenLoading(false);
        Toast.show({
          type: 'error',
          text1: 'Payment failed, Please try again later',
          position: 'top',
        });
      },
    );
  };

  const openWSConnection = payment_id => {
    console.log('payment_id', payment_id);
    var client = new W3CWebSocket(
      `${apiConfig.wssURL}:7006/ws/${payment_id}/listen/payment/status`,
    );
    console.log(
      `${apiConfig.wssURL}:7006/ws/${payment_id}/listen/payment/status`,
      'websocket url',
    );
    client.onopen = () => {};
    client.onmessage = message => {
      const dataFromServer = JSON.parse(message.data);
      console.log(payment_id);
      console.log('dataFromServer', dataFromServer);
      if (dataFromServer.status === 1) {
        // setTimeout(() => {
        //   navigation.navigate('NewDashboard');
        //   Toast.show({
        //     type: 'success',
        //     text1: 'Payment Successfull!',
        //     position: 'bottom',
        //   });
        // }, 5000);
        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [{name: 'NewDashboard'}],
          });
          Toast.show({
            type: 'success',
            text1: 'Successfull!! You have to refresh the dashboard!',
            position: 'top',
          });
        }, 2000);
      } else if (dataFromServer.status === 2) {
        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [{name: 'NewDashboard'}],
          });
          Toast.show({
            type: 'warning',
            text1: 'Payment Pending!',
            position: 'top',
          });
        }, 2000);
      } else {
        setTimeout(() => {
          navigation.navigate('PlanRenewal');
          Toast.show({
            type: 'error',
            text1: 'Payment Error!',
            position: 'top',
          });
        }, 2000);
      }
    };
    client.onclose = () => {};
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: color.background}}>
        <Headerview
          showHeader
          showRefreshIcon
          title="Plan Renewal"
          onMenuClick={() => {
            navigation.openDrawer();
          }}
          onRefreshClicked={() => {
            getCustomerCurrentPlanData();
            setAllPlanData([]);
            setNoAllPlanDataAvailable(true);
            setAllPlanDataAvailable(false);
            setIsShowMore(true);
            setIsShowLess(false);
          }}
        />
        <View style={{flex: 1}}>
          <View style={{marginTop: -80}}>
            <ScrollView
              style={{}}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}>
              <View
                style={{
                  backgroundColor: materialColor.onSecondary,
                  borderRadius: 10,
                  padding: 20,
                  margin: 20,
                }}>
                <View
                  style={{flexDirection: 'column', justifyContent: 'center'}}>
                  {!isCurrentDataLoading ? (
                    <View>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            marginTop: -10,
                            backgroundColor: '#A93888',
                          }}>
                          <Text
                            style={{
                              fontFamily: 'Titillium-Semibold',
                              color: '#ffffff',
                              fontSize: 14,
                              padding: 5,
                            }}>
                            Current Plan
                          </Text>
                        </View>
                      </View>
                      <CurrentPlanTable
                        itemdata={currentPlanData}
                        onItemClick={() => {
                          showCurrentPlanHistoryPopup(currentPlanData);
                        }}
                      />
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                          }}>
                          <View>
                            <Button
                              mode="contained"
                              onPress={showButton}
                              uppercase={false}
                              style={{
                                backgroundColor: materialColor.primary,
                                width: 120,
                                marginTop: 10,
                                borderRadius: 10,
                              }}>
                              <Text
                                style={{
                                  autoCapitalize: 'none',
                                  fontSize: 12,
                                  fontFamily: 'Titillium-Semibold',
                                  fontWeight: 'normal',
                                  color: materialColor.primaryContainer,
                                }}>
                                {isShowMore ? 'Change Plan' : 'Show Less'}
                              </Text>
                            </Button>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                          }}>
                          <View>
                            <Button
                              mode="contained"
                              onPress={showUpgradeButton}
                              uppercase={false}
                              style={{
                                backgroundColor: materialColor.primary,
                                width: 120,
                                marginTop: 10,
                                borderRadius: 10,
                              }}>
                              <Text
                                style={{
                                  autoCapitalize: 'none',
                                  fontSize: 12,
                                  fontFamily: 'Titillium-Semibold',
                                  fontWeight: 'normal',
                                  color: materialColor.primaryContainer,
                                }}>
                                {!upgradeBtn ? 'Upgrade Plans' : 'Show Less'}
                              </Text>
                            </Button>
                          </View>
                        </View>
                      </View>
                      {upgradeBtn && (
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                            }}>
                            <RadioButton
                              value="gb"
                              status={
                                upgradeType === 'gb' ? 'checked' : 'unchecked'
                              }
                              onPress={() => {
                                setUpgradeType('gb');
                                getCustomerUpgradePlanDataGB();
                              }}
                            />
                            <Text
                              style={{
                                fontFamily: 'Titillium-Semibold',
                                color: color.text,
                                fontSize: 16,
                                // marginRight: 10,
                                marginTop: 5,
                              }}>
                              GB
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                            }}>
                            <RadioButton
                              value="days"
                              status={
                                upgradeType === 'days' ? 'checked' : 'unchecked'
                              }
                              onPress={() => {
                                setUpgradeType('days');
                                getCustomerUpgradePlanDataDays();
                              }}
                            />
                            <Text
                              style={{
                                fontFamily: 'Titillium-Semibold',
                                color: color.text,
                                fontSize: 16,
                                // marginRight: 10,
                                marginTop: 5,
                              }}>
                              Days
                            </Text>
                          </View>
                        </View>
                      )}

                      {allPlanData.length > 0 && (
                        <>
                          <View
                            style={{
                              flex: 1,
                              flexDirection: 'row',
                              marginTop: 20,
                              backgroundColor: '#A93888',
                            }}>
                            <Text
                              style={{
                                fontFamily: 'Titillium-Semibold',
                                color: '#ffffff',
                                fontSize: 14,
                                padding: 5,
                              }}>
                              All Plans
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginVertical: 5,
                            }}>
                            <View style={{flex: 0.6, flexDirection: 'row'}}>
                              <Text
                                style={{
                                  fontFamily: 'Titillium-Semibold',
                                  color: color.text,
                                  fontSize: 12,
                                }}>
                                Plan Name
                              </Text>
                            </View>
                            <View
                              style={{
                                flex: 0.5,
                                flexDirection: 'row',
                                justifyContent: 'center',
                              }}>
                              <Text
                                style={{
                                  fontFamily: 'Titillium-Semibold',
                                  color: color.text,
                                  fontSize: 12,
                                }}>
                                Price
                              </Text>
                            </View>
                            <View
                              style={{
                                flex: 0.5,
                                flexDirection: 'row',
                                justifyContent: 'center',
                              }}>
                              <Text
                                style={{
                                  fontFamily: 'Titillium-Semibold',
                                  color: color.text,
                                  fontSize: 12,
                                }}>
                                Speed
                              </Text>
                            </View>
                            <View
                              style={{
                                flex: 0.6,
                                flexDirection: 'row',
                                justifyContent: 'center',
                              }}>
                              <Text
                                style={{
                                  fontFamily: 'Titillium-Semibold',
                                  color: color.text,
                                  fontSize: 12,
                                }}>
                                Data Type
                              </Text>
                            </View>
                            <View
                              style={{
                                flex: 0.5,
                                flexDirection: 'row',
                                justifyContent: 'center',
                              }}>
                              <Text
                                style={{
                                  fontFamily: 'Titillium-Semibold',
                                  color: color.text,
                                  fontSize: 12,
                                }}>
                                Select
                              </Text>
                            </View>
                          </View>
                          <View
                            style={{
                              backgroundColor: Colors.grey_A9A9A9,
                              height: 2,
                              marginTop: 5,
                            }}></View>
                        </>
                      )}

                      <FlatList
                        data={allPlanData}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index}
                        enableEmptySections={true}
                        renderItem={({item, index}) => (
                          <AllPlanTable
                            itemdata={allPlanData[index]}
                            onItemClick={() => {
                              showAllPlansHistoryPopup(allPlanData[index]);
                            }}
                          />
                        )}
                        refreshControl={
                          <RefreshControl
                            refreshing={isCurrentDataLoading}
                            onRefresh={getCustomerCurrentPlanData}
                          />
                        }
                      />
                    </View>
                  ) : (
                    <View style={{height: '100%'}}>
                      {isNoAllPlanDataAvailable && <NoData />}
                    </View>
                  )}
                </View>
              </View>
            </ScrollView>
          </View>
        </View>

        {isCurrentDialogVisible ? (
          <PlanDetails
            showCurrentPlanRechargeView
            showDialogVisible={isCurrentDialogVisible}
            data={currentItemData}
            planData={plan}
            closeDialog={() => {
              setCurrentDialogVisible(false);
            }}
            openWebView={(
              getCalculations,
              planID,
              plan_cost,
              cgst,
              sgst,
              radius_info,
              areaId,
              walletAmount,
              props,
            ) => {
              console.log('areaId', areaId);
              console.log(props, 'props');
              console.log(walletAmount, 'walletAmount in service');
              connectPaymentGateWay(
                getCalculations,
                planID,
                plan_cost,
                cgst,
                sgst,
                radius_info,
                areaId,
                walletAmount,
                props,
              );
            }}
          />
        ) : null}
        {isAllDialogVisible ? (
          <PlanDetails
            showAllPlanRechargeView
            showDialogVisible={isAllDialogVisible}
            data={allItemData}
            plan={plan}
            upgradeType={upgradeType}
            paymentType={paymentType}
            closeDialog={() => {
              setAllDialogVisible(false);
            }}
            openWebView={(
              getCalculations,
              planID,
              plan_cost,
              radius_info,
              use_wallet,
              area,
              customer_id,
              balance,
              props,
            ) => {
              console.log('here', area);
              console.log('here', planID);
              connectPaymentGateWayChnage(
                getCalculations,
                planID,
                plan_cost,
                radius_info,
                use_wallet,
                area,
                customer_id,
                balance ? balance : '',
                props,
              );
            }}
          />
        ) : null}
      </View>
      <DialogView
        showLoadingDialog
        visible={isCurrentDataLoading}
        text={strings('Plan.LoadingPlan')}></DialogView>
      <DialogView
        showLoadingDialog
        visible={isAllDataLoading}
        text={strings('Plan.LoadingPlan')}></DialogView>
      <DialogView
        showLoadingDialog
        visible={paymentLoading}
        text={'Connecting to Payment Gateway'}></DialogView>
      {modalVisible && (
        <Headerview
          showSideMenu
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        />
      )}
    </SafeAreaView>
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

const styles = StyleSheet.create({
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: Colors.color_5E0F8B,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Titillium-Semibold',
  },
});
