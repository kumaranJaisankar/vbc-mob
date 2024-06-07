import React from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  FlatList,
  RefreshControl,
} from 'react-native';
import {Colors} from '../../commoncomponents/Colors';
import {strings} from '../../strings/i18n';
import Headerview from '../../commoncomponents/HeaderView';
import Search from '../../commoncomponents/Search';
import APIServices from '../../apiwebservices/APIServices';
import DialogView from '../../commoncomponents/DialogView';
import NoData from '../../commoncomponents/NoData';
import KYC_ListCell from './KYC_ListCell';

const KYC_List = ({navigation}) => {
  const [isLoading, setLoading] = React.useState(false);

  const [search, setSearch] = React.useState('');

  const [isData, setData] = React.useState([]);

  const [isFilteredData, setFilteredData] = React.useState([]);

  const [isDataAvailable, setDataAvailable] = React.useState(false);

  const [isNoDataAvailable, setNoDataAvailable] = React.useState(false);

  React.useEffect(() => {
    getLeadsData();
  }, [navigation]);

  const getLeadsData = async () => {
    setLoading(true);
    setSearch('');
    await APIServices.getLeadsData(
      response => {
        if (response.status == 200) {
          var responseData = response.data;
          if (responseData.length > 0) {
            for (let i = 0; i < responseData.length; i++) {
              var id = responseData[i].id;
              responseData[i].id = 'L00' + id;
            }
          }
          setData(response.data);
          setFilteredData(response.data);
          setDataAvailable(true);
          setNoDataAvailable(false);
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

  const searchData = text => {
    if (text) {
      let workFlowData = isData.filter(object => {
        let searchTextStatus =
          object.id.toLowerCase().includes(text.toLowerCase()) ||
          object.first_name.toLowerCase().includes(text.toLowerCase()) ||
          object.last_name.toLowerCase().includes(text.toLowerCase()) ||
          object.mobile_no.toLowerCase().includes(text.toLowerCase()) ||
          object.email.toLowerCase().includes(text.toLowerCase());
        return searchTextStatus;
      });
      setFilteredData(workFlowData);
      setSearch(text);
      if (workFlowData.length > 0) {
        setNoDataAvailable(false);
        setDataAvailable(true);
      } else {
        setNoDataAvailable(true);
        setDataAvailable(false);
      }
    } else {
      setFilteredData(isData);
      setSearch(text);
      if (isData.length > 0) {
        setNoDataAvailable(false);
        setDataAvailable(true);
      } else {
        setNoDataAvailable(true);
        setDataAvailable(false);
      }
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: Colors.grey_E2E2E2}}>
        <Headerview
          showHeader
          showAddIcon
          showRefreshIcon
          title={strings('KYC_Form.KYC_Form')}
          onAddClicked={() => {
            navigation.navigate('KYC_Add_Update', {
              status: 'add',
            });
          }}
          onRefreshClicked={() => {
            getLeadsData();
          }}
        />

        <View style={{flex: 1, margin: 15}}>
          <Search
            value={search}
            onChangeText={text => searchData(text)}
            onClearText={() => searchData('')}
            onMICClicked={() => {}}
          />

          {isDataAvailable ? (
            <FlatList
              data={isFilteredData}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index}
              renderItem={({item, index}) => (
                <KYC_ListCell
                  itemdata={isFilteredData[index]}
                  onItemClick={() => {
                    //navigation.navigate('MaintenancePlanDetailedView',{item});
                  }}
                />
              )}
              refreshControl={
                <RefreshControl
                  refreshing={isLoading}
                  onRefresh={getLeadsData}
                />
              }
              style={{marginTop: 5}}
            />
          ) : null}

          {isNoDataAvailable ? <NoData /> : null}
        </View>

        <DialogView
          showLoadingDialog
          visible={isLoading}
          text={strings('KYC_Form.LoadingLeads')}></DialogView>
      </View>
    </SafeAreaView>
  );
};

export default KYC_List;
