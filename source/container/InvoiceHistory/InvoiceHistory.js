import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import {Colors} from '../../commoncomponents/Colors';
import Headerview from '../../commoncomponents/HeaderView1';
import APIServices from '../../apiwebservices/APIServices';
import DialogView from '../../commoncomponents/DialogView';
import {strings} from '../../strings/i18n';
import TotalHeader from './InvoiceHistory_TotalView';
import NoData from '../../commoncomponents/NoData';
import InvoiceHistory_ListCell from './InvoiceHistory_ListCell';
import CustomTabNav from '../../navigation/CustomTabNav';
import {useTheme as useMDtheme} from 'react-native-paper';
import {useTheme} from '@react-navigation/native';

const DashBoard = ({navigation}) => {
  const color = useTheme().colors;
  const materialColor = useMDtheme().colors;
  const [modalVisible, setModalVisible] = React.useState(false);

  const [invoiceVisible, setInvoiceVisible] = React.useState(false);

  const [downloadVisible, setDownLoadVisible] = React.useState(false);

  const [isData, setData] = React.useState([]);

  const [isLoading, setLoading] = React.useState(false);

  const [isDataAvailable, setDataAvailable] = React.useState(false);

  const [noDataAvailable, setNoDataAvailable] = React.useState(false);

  const [isItemData, setItemData] = React.useState({});

  const [invoiceListPageNo, setInvoiceListPageNo] = React.useState(1);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getInvoiceHistoryData(false, false);
    });
    return unsubscribe;
  }, [navigation]);

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          style={[styles.loadMoreBtn, {backgroundColor: materialColor.primary}]}
          onPress={e => {
            getInvoiceHistoryData(false, true);
          }}>
          <Text style={styles.btnText}>Load More</Text>
        </TouchableOpacity>
      </View>
    );

    return null;
  };

  const getInvoiceHistoryData = async (refreshed, loadMore) => {
    setLoading(true);
    if (refreshed) setInvoiceListPageNo(1);
    else if (loadMore) setInvoiceListPageNo(prevState => prevState + 1);
    console.log(' omalayya');
    await APIServices.getInvoiceHistoryForUser(
      refreshed ? 1 : invoiceListPageNo,
      response => {
        if (response.status == 200) {
          if (!refreshed && !loadMore) setData(response.data.results);
          else if (refreshed) setData(response.data.results);
          else if (loadMore)
            setData(prevState => [...prevState, ...response.data.results]);
          //var invoice = response.data.invoice;
          // if (invoice.length > 0) {
          setDataAvailable(true);
          // } else {
          //   setDataAvailable(false);
          // }
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

  const showHistoryPopup = itemData => {
    setItemData(itemData);
    setInvoiceVisible(true);
  };

  const downloadInvoice = itemData => {
    setItemData(itemData);
    setDownLoadVisible(true);
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
          title={strings('InvoiceHistory.InvoiceHistory')}
          onMenuClick={() => {
            navigation.openDrawer();
          }}
          onRefreshClicked={() => {
            getInvoiceHistoryData(true);
          }}
        />

        <View style={{flex: 1}}>
          <View style={!invoiceVisible && {marginTop: -80}}>
            <View
              style={{
                backgroundColor: materialColor.onSecondary,
                borderRadius: 10,
                padding: 20,
                margin: 20,
              }}>
              <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                {isDataAvailable ? (
                  <View>
                    <TotalHeader showTotalHeader />

                    <FlatList
                      data={isData}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      keyExtractor={(item, index) => index}
                      renderItem={({item, index}) => (
                        <InvoiceHistory_ListCell
                          itemdata={isData[index]}
                          onItemClick={() => {
                            showHistoryPopup(isData[index]);
                          }}
                          onDownloadClick={() => {
                            downloadInvoice(isData[index]);
                          }}
                        />
                      )}
                      refreshControl={
                        <RefreshControl
                          refreshing={isLoading}
                          onRefresh={e => {
                            setInvoiceListPageNo(1);
                            getInvoiceHistoryData(true, false);
                          }}
                        />
                      }
                      style={{marginTop: 5}}
                      ListFooterComponent={renderFooter}
                    />
                  </View>
                ) : (
                  <View style={{height: '100%'}}>
                    {noDataAvailable && <NoData />}
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>

        {invoiceVisible ? (
          <TotalHeader
            showPdfPreView
            showDialogVisible={invoiceVisible}
            data={isItemData}
            closeDialog={() => {
              setInvoiceVisible(false);
            }}
          />
        ) : null}
        {downloadVisible ? (
          <TotalHeader
            showPdfDownloadView
            showDialogVisible={downloadVisible}
            data={isItemData}
            closeDialog={() => {
              setDownLoadVisible(false);
              setItemData(null);
            }}
          />
        ) : null}
        <CustomTabNav active={'Bills'} />
      </View>

      <DialogView
        showLoadingDialog
        visible={isLoading}
        text={strings('InvoiceHistory.LoadingUsageHistory')}></DialogView>

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
