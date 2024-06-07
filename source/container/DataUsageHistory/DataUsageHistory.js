import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList,
  RefreshControl,
} from 'react-native';
import {Colors} from '../../commoncomponents/Colors';
import Toast from 'react-native-toast-message';
import Headerview from '../../commoncomponents/HeaderView1';
import APIServices from '../../apiwebservices/APIServices';
import DialogView from '../../commoncomponents/DialogView';
import {strings} from '../../strings/i18n';
import {LineChart} from 'react-native-chart-kit';
import Header from './DataUsageHistoryTotalView';
import DataUsageHistoryList from './DataUsageHistoryListCell';
import {format, parseISO} from 'date-fns';
import moment from 'moment';
import {useTheme as useMdtheme} from 'react-native-paper';
import {useTheme} from '@react-navigation/native';

var datesArray = [];
var uploadsArray = [];
var downloadsArray = [];
var maxValue = [];
var maxReadingValue = [];
var firstDate;
var lastDate;

const DashBoard = ({navigation}) => {
  const color = useTheme().colors;
  const materialColor = useMdtheme().colors;
  const [isLoading, setLoading] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [isDataAvailable, setDataAvailable] = React.useState(false);
  const [isNoDataAvailable, setNoDataAvailable] = React.useState(false);
  const [isData, setData] = React.useState({});
  const [isHistoryData, setHistoryData] = React.useState([]);
  const [totalUpload, setTotalUpload] = React.useState(0.0);
  const [totalDownload, setTotalDownload] = React.useState(0.0);
  const [totalUsage, setTotalUsage] = React.useState(0.0);
  const [endDate, setEndDate] = React.useState(
    format(new Date(), 'yyyy-MM-dd'),
  );
  var start_Date = moment(new Date(endDate)).subtract(6, 'months');
  const [startDate, setStartDate] = React.useState(
    format(new Date(start_Date), 'yyyy-MM-dd'),
  );
  const [startOffset, setStartOffset] = React.useState(0);
  const [endOffset, setEndOffset] = React.useState(20);

  const [totalUpData, setTotalUpData] = React.useState('');
  const [totalDwData, setTotalDwData] = React.useState('');
  const [totalUgData, setTotalUgData] = React.useState({});

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDataUsageHistoryData();
      getDashboardData();
    });
    return unsubscribe;
  }, [navigation]);

  const getDashboardData = async () => {
    console.log('hi');
    setLoading(true);
    await APIServices.getDashboardData(
      response => {
        console.log('res', response);
        if (response.status == 200) {
          console.log('solution');

          const historyData =
            response?.data?.total_data_usage_history.reverse();
          console.log(historyData);
          setHistoryData(historyData);
          setTotalUgData(response?.data?.total_data_usage);
          // console.log('DASH DATA', response.data?.adress?.id);
          // console.log('expected data', response?.data);
          // setPlan(response?.data);
          // setData(response?.data);
          // var formattedExpDate = format(
          //   new Date(response?.data?.plan_end),
          //   'd MMM, yyyy',
          // );
          // setFormatExpDate(formattedExpDate);
          // var currentMonthUsage =
          //   response.data.current_month_usage_from_monthy_date[0]
          //     .total_data_consumed;
          // setCurrentMonthConsumption(
          //   Number(currentMonthUsage?.split('GB')[0]).toFixed(1),
          // );
          // var todaysConsumption =
          //   response.data.today_consumption[0].data.toFixed(1);
          // setTodayConsumption(todaysConsumption);

          // let todaysUpload =
          //   response.data.today_consumption[0].upload.toFixed(1);
          // setTodayUpload(todaysUpload);
          // let todaysDownload =
          //   response.data.today_consumption[0].download.toFixed(1);
          // setTodayDownload(todaysDownload);
          // setCStatus(response.data.customer_status);

          // var totalMdataAssign =
          //   response.data.current_month_usage_from_monthy_date[0]
          //     .total_assigned;

          // setCurrentMonthAssign(
          //   Number(totalMdataAssign.split('GB')[0]).toFixed(1),
          // );
          // var uploadMonth =
          //   response.data.current_month_usage_from_monthy_date[0].total_upload;
          // setCurrentMonthUpload(Number(uploadMonth.split('GB')[0]).toFixed(1));
          // var downloadMonth =
          //   response.data.current_month_usage_from_monthy_date[0]
          //     .total_download;
          // setCurrentMonthDownload(
          //   Number(downloadMonth.split('GB')[0]).toFixed(1),
          // );
          // AsyncStorage.setItem('customerID', response.data.username);
          // AsyncStorage.setItem(
          //   'areaID',
          //   response.data?.customer_area_id?.toString(),
          // );

          // var exp_date = response.data.expiry_date;
          // var msDiff = new Date(exp_date).getTime() - new Date().getTime();
          // var daysExp = Math.floor(msDiff / (1000 * 60 * 60 * 24));
          // setExpDate(daysExp);
          setLoading(false);
        } else {
          console.log('jjsjsj');
          setLoading(false);
        }
      },
      error => {
        setLoading(false);
      },
    );
  };

  const getDataUsageHistoryData = async () => {
    setLoading(true);
    setStartOffset(0);
    setEndOffset(20);
    datesArray = [];
    uploadsArray = [];
    downloadsArray = [];
    maxValue = [];
    maxReadingValue = [];
    console.log('endDate', endDate);
    await APIServices.getDataUsageHistory(
      startDate,
      endDate,
      0,
      20,
      response => {
        if (response.status == 200) {
          console.log('history', response);
          setData(response.data.result.total);
          setHistoryData([
            ...response.data.result.history.sort((a, b) =>
              a.Date < b.Date ? 1 : -1,
            ),
          ]);
          var history = response.data.result.history;
          console.log('history', history);
          var totalUpGB = parseFloat(response.data.result.total.Total_upload);
          var totalDownGB = parseFloat(
            response.data.result.total.Total_download,
          );
          var totalUsageGB = parseFloat(totalDownGB + totalUpGB);
          setTotalUpload(totalUpGB);
          setTotalDownload(totalDownGB);
          setTotalUsage(totalUsageGB);
          console.log('kumaran');
          console.log(history);
          if (history.length > 0) {
            for (let i = 0; i < history.length; i++) {
              var date = history[i].Date;
              var Total_upload = history[i].Total_upload;
              var Total_download = history[i].Total_download;
              datesArray.push(date);
              uploadsArray.push(parseFloat(Total_upload));
              downloadsArray.push(parseFloat(Total_download));
              maxValue.push(parseFloat(Total_download));
              maxValue.push(parseFloat(Total_upload));
            }
          }

          console.log(datesArray[0]);
          firstDate = format(parseISO(datesArray[0]), 'd MMM, yyyy');
          lastDate = format(
            parseISO(datesArray[datesArray.length - 1]),
            'd MMM, yyyy',
          );
          var maxReading = Math.max.apply(null, maxValue);
          maxReadingValue.push(maxReading);

          var usageData = response.data.result.history;
          if (usageData.length > 0) {
            setDataAvailable(true);
          } else {
            setDataAvailable(false);
          }

          setLoading(false);
        } else {
          setNoDataAvailable(true);
          setDataAvailable(false);
          setLoading(false);
        }
      },
      error => {
        setNoDataAvailable(true);
        setDataAvailable(false);
        setLoading(false);
      },
    );
  };

  // const lodeMoreData = async () => {
  //   setLoading(true);
  //   datesArray = [];
  //   uploadsArray = [];
  //   downloadsArray = [];
  //   maxValue = [];
  //   maxReadingValue = [];
  //   await APIServices.getDataUsageHistory(
  //     startDate,
  //     endDate + 20,
  //     startOffset + 20,
  //     endOffset,
  //     response => {
  //       console.log(response);
  //       if (response.status == 200) {
  //         if (response?.data?.result?.history?.length < 1) {
  //           Toast.show({
  //             type: 'info',
  //             text1: 'No More Data Available!',
  //             position: 'bottom',
  //           });
  //           setLoading(false);
  //         } else {
  //           setStartOffset(startOffset + 20);
  //           setEndOffset(endOffset + 20);
  //           console.log('called this', response.data);
  //           setData(response.data.result.total);
  //           setHistoryData([
  //             ...isHistoryData,
  //             ...response.data.result.history.sort((a, b) =>
  //               a.Date < b.Date ? 1 : -1,
  //             ),
  //           ]);
  //           var history = response.data.result.history;
  //           var totalUpGB = parseFloat(response.data.result.total.Total_upload);
  //           var totalDownGB = parseFloat(
  //             response.data.result.total.Total_download,
  //           );
  //           var totalUsageGB = parseFloat(totalDownGB + totalUpGB);
  //           setTotalUpload(totalUpGB);
  //           setTotalDownload(totalDownGB);
  //           setTotalUsage(totalUsageGB);
  //           if (history.length > 0) {
  //             for (let i = 0; i < history.length; i++) {
  //               var date = history[i].Date;
  //               var Total_upload = history[i].Total_upload;
  //               var Total_download = history[i].Total_download;
  //               datesArray.push(date);
  //               uploadsArray.push(parseFloat(Total_upload));
  //               downloadsArray.push(parseFloat(Total_download));
  //               maxValue.push(parseFloat(Total_download));
  //               maxValue.push(parseFloat(Total_upload));
  //             }
  //           }
  //           firstDate = format(new Date(datesArray[0]), 'd MMM, yyyy');
  //           lastDate = format(
  //             new Date(datesArray[datesArray.length - 1]),
  //             'd MMM, yyyy',
  //           );
  //           var maxReading = Math.max.apply(null, maxValue);
  //           maxReadingValue.push(maxReading);

  //           var usageData = response.data.result.history;
  //           if (usageData.length > 0) {
  //             setDataAvailable(true);
  //           } else {
  //             setDataAvailable(false);
  //           }
  //         }
  //         setLoading(false);
  //       } else {
  //         setLoading(false);
  //       }
  //     },
  //     error => {
  //       setNoDataAvailable(true);
  //       setDataAvailable(false);
  //       setLoading(false);
  //     },
  //   );
  // };
  // const renderFooter = () => {
  //   return (
  //     <View style={styles.footer}>
  //       <TouchableOpacity
  //         activeOpacity={0.9}
  //         onPress={lodeMoreData}
  //         style={styles.loadMoreBtn}>
  //         <Text style={styles.btnText}>Load More</Text>
  //       </TouchableOpacity>
  //     </View>
  //   );

  //   return null;
  // };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: color.background}}>
        <Headerview
          showHeader
          showRefreshIcon
          title={strings('DataUsageHistory.DataUsageHistory')}
          onMenuClick={() => {
            navigation.openDrawer();
          }}
          onRefreshClicked={() => {
            getDashboardData();
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
                  <Text
                    style={{
                      fontFamily: 'Titillium-Semibold',
                      color: color.text,
                      fontSize: 16,
                      textAlign: 'center',
                    }}>
                    {lastDate}-{firstDate}
                  </Text>
                  <View style={{alignItems: 'center'}}>
                    {uploadsArray.length > 0 ? (
                      <LineChart
                        bezier
                        fromZero
                        verticalLabelRotation={90}
                        data={{
                          labels: datesArray,
                          datasets: [
                            {
                              data: uploadsArray,
                              strokeWidth: 4,
                              color: (opacity = 1) =>
                                `rgba(0,0,255,${opacity})`, // optional
                            },
                            {
                              data: downloadsArray,
                              strokeWidth: 4,
                              color: (opacity = 1) =>
                                `rgba(0,128,0, ${opacity})`, // optional
                            },
                            {
                              data: [0], // min
                            },
                            {
                              data: maxReadingValue,
                              strokeWidth: 0, // max
                              color: (opacity = 0) => `rgba(0,128,0, 0)`, // optional
                            },
                          ],
                          legend: ['Upload', 'Download'],
                        }}
                        width={Dimensions.get('window').width - 80}
                        height={450}
                        yAxisInterval={1}
                        chartConfig={{
                          backgroundColor: '#1cc910',
                          backgroundGradientFrom: '#eff3ff',
                          backgroundGradientTo: '#efefef',
                          decimalPlaces: 1,
                          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                          labelColor: (opacity = 1) =>
                            `rgba(0, 0, 0, ${opacity})`,
                          style: {
                            borderRadius: 16,
                          },
                        }}
                        style={{
                          marginVertical: 8,
                          borderRadius: 16,
                        }}
                      />
                    ) : null}
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      // alignItems: 'center',
                      marginVertical: 5,
                    }}>
                    <View style={{flex: 0.5, flexDirection: 'row'}}>
                      <View>
                        <Text
                          style={{
                            fontFamily: 'Titillium-Semibold',
                            color: color.text,
                            fontSize: 12,
                            marginLeft: 5,
                          }}>
                          Total Upload :
                        </Text>
                      </View>
                      <View
                        style={{
                          // flex: 0.3,
                          flexDirection: 'row',
                          // justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            fontFamily: 'Titillium-Semibold',
                            color: color.text,
                            fontSize: 12,
                            // marginLeft: 5,
                          }}>
                          {totalUgData?.Total_upload
                            ? totalUgData?.Total_upload.toFixed(2)
                            : '0'}
                          {/* {totalUpload.toFixed(1) == 'NaN'
                            ? '--'
                            : totalUpload.toFixed(1)} */}
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'Titillium-Semibold',
                            color: color.text,
                            fontSize: 12,
                            marginLeft: 5,
                          }}>
                          GB
                        </Text>
                      </View>
                    </View>
                    <View style={{flex: 0.5, flexDirection: 'row'}}>
                      <View>
                        <Text
                          style={{
                            fontFamily: 'Titillium-Semibold',
                            color: color.text,
                            fontSize: 12,
                            marginLeft: 5,
                          }}>
                          Total Download :{' '}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 0.3,
                          flexDirection: 'row',
                          // justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            fontFamily: 'Titillium-Semibold',
                            color: color.text,
                            fontSize: 12,
                            // marginLeft: 5,
                          }}>
                          {totalUgData?.Total_download
                            ? totalUgData?.Total_download.toFixed(2)
                            : '0'}
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'Titillium-Semibold',
                            color: color.text,
                            fontSize: 12,
                            marginLeft: 5,
                          }}>
                          GB
                        </Text>
                      </View>
                    </View>
                    <View style={{flex: 0.5, flexDirection: 'row'}}>
                      <View>
                        <Text
                          style={{
                            fontFamily: 'Titillium-Semibold',
                            color: color.text,
                            fontSize: 12,
                            marginLeft: 5,
                          }}>
                          Total Usage :{' '}
                        </Text>
                      </View>
                      <View
                        style={{
                          // flex: 0.3,
                          flexDirection: 'row',
                          // justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            fontFamily: 'Titillium-Semibold',
                            color: color.text,
                            fontSize: 12,
                            // marginLeft: 5,
                          }}>
                          {totalUgData
                            ? (
                                totalUgData?.Total_upload +
                                totalUgData?.Total_download
                              ).toFixed(2)
                            : '0'}
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'Titillium-Semibold',
                            color: color.text,
                            fontSize: 12,
                            marginLeft: 5,
                          }}>
                          GB
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View>
                    <Header showTotalHeader />
                    <FlatList
                      data={isHistoryData}
                      keyExtractor={(item, index) => index}
                      enableEmptySections={true}
                      renderItem={({item, index}) => (
                        <DataUsageHistoryList itemdata={isHistoryData[index]} />
                      )}
                      // ListFooterComponent={renderFooter}

                      refreshControl={
                        <RefreshControl
                          // refreshing={isLoading}
                          onRefresh={getDataUsageHistoryData}
                        />
                      }
                    />
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
      <DialogView
        showLoadingDialog
        visible={isLoading}
        text={strings('DataUsageHistory.LoadingUsageHistory')}></DialogView>
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
