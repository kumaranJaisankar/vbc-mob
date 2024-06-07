import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Colors} from '../../commoncomponents/Colors';
import Headerview from '../../commoncomponents/HeaderView1';
import DialogView from '../../commoncomponents/DialogView';
import {strings} from '../../strings/i18n';
import APIServices from '../../apiwebservices/APIServices';
import TotalHeader from './SessionHistory_TotalView';
import SessionHistory_ListCell from './SessionHistory_ListCell';
import NoData from '../../commoncomponents/NoData';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RBSheet from 'react-native-raw-bottom-sheet';
import DateTimePicker from '@react-native-community/datetimepicker';
import {format} from 'date-fns';
import moment from 'moment';
import Toast from 'react-native-toast-message';
import {useTheme as useMdtheme} from 'react-native-paper';
import {useTheme} from '@react-navigation/native';

const DashBoard = ({navigation}) => {
  const color = useTheme().colors;
  const materialColor = useMdtheme().colors;
  const refRBSheet = useRef();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [isDialogVisible, setDialogVisible] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [isData, setData] = React.useState([]);
  const [isItemData, setItemData] = React.useState({});
  const [isHistoryData, setHistoryData] = React.useState([]);
  const [isDataAvailable, setDataAvailable] = React.useState(false);
  const [startOffset, setStartOffset] = React.useState(0);
  const [endOffset, setEndOffset] = React.useState(10);
  const [endDate, setEndDate] = useState(new Date());
  var from_date = moment(new Date(endDate)).subtract(6, 'months');
  const [startDate, setStartDate] = useState(new Date(from_date));
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [fromDateShow, setFromDateShow] = useState(false);
  const [toDateShow, setToDateShow] = useState(false);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getSessionHistoryDataOnPageLoad();
    });
    return unsubscribe;
  }, [navigation]);

  const showHistoryPopup = itemData => {
    setItemData(itemData);
    setDialogVisible(true);
  };

  const getSessionHistoryData = async () => {
    setLoading(true);
    console.log('start', startDate);
    console.log('end', endDate);
    await APIServices.getSessionHistory(
      startOffset + 10,
      endOffset + 10,
      format(startDate, 'yyyy-MM-dd'),
      format(endDate, 'yyyy-MM-dd'),

      response => {
        if (response.status == 200) {
          setData(response.data.result.data);
          setStartOffset(prevState => prevState + 10);
          setEndOffset(prevState => prevState + 10);
          if (response.data.result.history.length > 0) {
            setHistoryData([...isHistoryData, ...response.data.result.history]);
          } else {
            setLoading(false);
            Toast.show({
              type: 'info',
              text1: 'No More Data Available!',
              position: 'bottom',
            });
          }
          setDataAvailable(true);
          setLoading(false);
        } else {
          setDataAvailable(false);
          setLoading(false);
        }
      },
      error => {
        setDataAvailable(false);
        setLoading(false);
      },
    );
  };

  const getSessionHistoryDataOnPageLoad = async () => {
    setLoading(true);
    setEndDate(new Date());
    var from_date = moment(new Date()).subtract(6, 'months');
    setStartDate(new Date(from_date));
    setStartOffset(0);
    setEndOffset(10);
    await APIServices.getSessionHistory(
      0,
      10,
      format(new Date(from_date), 'yyyy-MM-dd'),
      format(new Date(), 'yyyy-MM-dd'),
      response => {
        console.log(response);
        if (response.status == 200) {
          setData(response.data.result.data);
          if (response.data.result.history.length > 0) {
            setHistoryData(response.data.result.history);
          }
          setDataAvailable(true);
          setLoading(false);
        } else {
          setDataAvailable(false);
          setLoading(false);
        }
      },
      error => {
        setDataAvailable(false);
        setLoading(false);
      },
    );
  };

  const getSessionHistoryFilteredData = async () => {
    setStartDate(fromDate);
    setEndDate(toDate);
    refRBSheet.current.close();
    if (fromDate > toDate) {
      Toast.show({
        type: 'error',
        text1: 'To Date Can not be less than From Date',
        position: 'bottom',
      });
    } else {
      setLoading(true);
      setStartOffset(0);
      setEndOffset(10);

      await APIServices.getSessionHistory(
        0,
        10,
        format(fromDate, 'yyyy-MM-dd'),
        format(toDate, 'yyyy-MM-dd'),
        response => {
          console.log(response);
          if (response.status == 200) {
            setData(response.data.result.data);
            console.log('response', response.data.result.history.length);
            if (response.data.result.history.length > 0) {
              setHistoryData(response.data.result.history);
            }
            setDataAvailable(true);
            setLoading(false);
          } else {
            setDataAvailable(false);
            setLoading(false);
          }
        },
        error => {
          setDataAvailable(false);
          setLoading(false);
        },
      );
    }
  };

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={getSessionHistoryData}
          style={[styles.loadMoreBtn, {backgroundColor: color.primary}]}>
          <Text style={styles.btnText}>Load More</Text>
          {/* {isLoading ? (
            <ActivityIndicator color="white" style={{marginLeft: 8}} />
          ) : null} */}
        </TouchableOpacity>
      </View>
    );
    return null;
  };

  const showFromDatePicker = () => {
    showFromDateMode();
  };
  const showFromDateMode = () => {
    setFromDateShow(true);
  };
  const showToDatePicker = () => {
    showToDateMode();
  };
  const showToDateMode = () => {
    setToDateShow(true);
  };
  const onFromDateChange = (event, selectedValue) => {
    console.log('From date', selectedValue);
    console.log('Today', new Date());
    if (selectedValue > new Date()) {
      Toast.show({
        type: 'error',
        text1: 'You can not select future date as from date',
        position: 'top',
      });
      setFromDate(new Date());
    }
    setFromDateShow(Platform.OS === 'ios');
    const selectedTime = selectedValue || new Date();
    setFromDate(selectedTime);
    setFromDateShow(Platform.OS === 'ios');
  };
  const onToDateChange = (event, selectedValue) => {
    if (selectedValue > new Date()) {
      Toast.show({
        type: 'error',
        text1: 'You can not select future date as to date',
        position: 'top',
      });
      setToDate(new Date());
    }
    setToDateShow(Platform.OS === 'ios');
    const selectedTime = selectedValue || new Date();
    setToDate(selectedTime);
    setToDateShow(Platform.OS === 'ios');
  };
  const onResetClick = () => {
    setFromDate(new Date());
    setToDate(new Date());
  };
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
      color: materialColor.primaryContainer,
      fontSize: 16,
      textAlign: 'center',
      fontFamily: 'Titillium-Semibold',
    },
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: color.background}}>
        <Headerview
          showHeader
          showRefreshIcon
          showFilterIcon
          title={strings('SessionHistory.SessionHistory')}
          filterText="Filters"
          onMenuClick={() => {
            navigation.openDrawer();
          }}
          onRefreshClicked={() => {
            getSessionHistoryDataOnPageLoad();
          }}
          onFilterClick={() => {
            refRBSheet.current.open();
          }}
        />
        <View style={{flex: 1}}>
          <View style={{marginTop: -80}}>
            <View
              style={{
                backgroundColor: materialColor.onSecondary,
                borderRadius: 10,
                padding: 20,
                margin: 20,
                height: '94%',
              }}>
              <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                {isDataAvailable ? (
                  <View>
                    <TotalHeader showTotalHeader />
                    <TotalHeader showTotalHeaderData data={isData} />
                    <TotalHeader showDataHeader />
                    <FlatList
                      data={isHistoryData}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      keyExtractor={(item, index) => index}
                      enableEmptySections={true}
                      renderItem={({item, index}) => (
                        <SessionHistory_ListCell
                          itemdata={isHistoryData[index]}
                          onItemClick={() => {
                            showHistoryPopup(isHistoryData[index]);
                          }}
                        />
                      )}
                      ListFooterComponent={renderFooter}
                      refreshControl={
                        <RefreshControl
                          // refreshing={isLoading}
                          onRefresh={getSessionHistoryDataOnPageLoad}
                        />
                      }
                      style={{marginTop: 5, height: '80%'}}
                    />
                  </View>
                ) : (
                  <View style={{height: '100%'}}>
                    <NoData />
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
        {isDialogVisible ? (
          <TotalHeader
            showSessionDetailedView
            showDialogVisible={isDialogVisible}
            data={isItemData}
            closeDialog={() => {
              setDialogVisible(false);
            }}
          />
        ) : null}
      </View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={400}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          container: {
            borderRadius: 20,
            backgroundColor: '#ffffff',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 20,
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <View style={{padding: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => {
                  refRBSheet.current.close();
                }}>
                <Ionicons name={'arrow-back'} size={23} color={Colors.black} />
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: 'Titillium-Semibold',
                    color: '#000000',
                    fontSize: 18,
                    marginLeft: 15,
                  }}>
                  Filters
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <View style={{flex: 0.5, flexDirection: 'column'}}>
              <Text
                style={{
                  fontFamily: 'Titillium-Semibold',
                  color: '#000000',
                  fontSize: 15,
                }}>
                Date From *
              </Text>
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  height: 50,
                  width: '100%',
                  backgroundColor: '#FAFAFA',
                  borderRadius: 10,
                  borderColor: '#E7EAEA',
                  borderWidth: 1,
                }}>
                <Text
                  style={{
                    fontFamily: 'Titillium-Semibold',
                    color: '#000000',
                    fontSize: 15,
                    flex: 0.8,
                  }}>
                  {fromDate ? format(new Date(fromDate), 'dd MMM, yyyy') : ''}
                </Text>
                <TouchableOpacity onPress={showFromDatePicker}>
                  <Ionicons
                    name={'calendar-outline'}
                    size={23}
                    color={Colors.black}
                    style={{flex: 0.5}}
                  />
                </TouchableOpacity>
              </View>
              {fromDateShow && (
                <DateTimePicker
                  value={fromDate}
                  mode={'date'}
                  display="default"
                  onChange={onFromDateChange}
                />
              )}
            </View>
            <View style={{flex: 0.5, flexDirection: 'column', marginLeft: 10}}>
              <Text
                style={{
                  fontFamily: 'Titillium-Semibold',
                  color: '#000000',
                  fontSize: 15,
                }}>
                Date To *
              </Text>
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  height: 50,
                  width: '100%',
                  backgroundColor: '#FAFAFA',
                  borderRadius: 10,
                  borderColor: '#E7EAEA',
                  borderWidth: 1,
                }}>
                <Text
                  style={{
                    fontFamily: 'Titillium-Semibold',
                    color: '#000000',
                    fontSize: 15,
                    flex: 0.8,
                  }}>
                  {toDate ? format(new Date(toDate), 'dd MMM, yyyy') : ''}
                </Text>
                <TouchableOpacity onPress={showToDatePicker}>
                  <Ionicons
                    name={'calendar-outline'}
                    size={23}
                    color={Colors.black}
                    style={{flex: 0.5}}
                  />
                </TouchableOpacity>
              </View>
              {toDateShow && (
                <DateTimePicker
                  value={toDate}
                  mode={'date'}
                  display="default"
                  onChange={onToDateChange}
                />
              )}
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 30,
              marginBottom: 80,
            }}>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: '#ffffff',
                borderRadius: 10,
                padding: 10,
                borderColor: Colors.color_5E0F8B,
                borderWidth: 2,
              }}
              onPress={onResetClick}>
              <Text
                style={{
                  fontFamily: 'Titillium-Semibold',
                  color: '#000000',
                  fontSize: 16,
                  textAlign: 'center',
                }}>
                Reset
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                marginLeft: 10,
                backgroundColor: Colors.color_5E0F8B,
                borderRadius: 10,
                padding: 10,
                borderColor: Colors.color_5E0F8B,
                borderWidth: 2,
              }}
              onPress={getSessionHistoryFilteredData}>
              <Text
                style={{
                  fontFamily: 'Titillium-Semibold',
                  color: '#ffffff',
                  fontSize: 16,
                  textAlign: 'center',
                }}>
                Apply
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </RBSheet>
      <DialogView
        showLoadingDialog
        visible={isLoading}
        text={strings('SessionHistory.LoadingSessionHistory')}></DialogView>
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

export default DashBoard;
