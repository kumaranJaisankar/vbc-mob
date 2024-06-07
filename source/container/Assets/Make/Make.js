import React from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  FlatList,
  RefreshControl,
} from 'react-native';
import {Colors} from '../../../commoncomponents/Colors';
import {strings} from '../../../strings/i18n';
import Headerview from '../../../commoncomponents/HeaderView';
import Search from '../../../commoncomponents/Search';
import NoData from '../../../commoncomponents/NoData';
import Make_ListCell from './Make_ListCell';

const Assets_List = ({navigation, route}) => {
  const [isLoading, setLoading] = React.useState(false);

  const [search, setSearch] = React.useState('');

  const [isData, setData] = React.useState([]);

  const [isFilteredData, setFilteredData] = React.useState([]);

  const [isDataAvailable, setDataAvailable] = React.useState(false);

  const [isNoDataAvailable, setNoDataAvailable] = React.useState(false);

  React.useEffect(() => {
    getAssetsListData();
  }, [navigation]);

  const getAssetsListData = async () => {
    setLoading(true);
    setSearch('');

    var data = [
      {
        id: 'MTK',
        Name: 'Mikrotik',
      },
      {
        id: 'CIS',
        Name: 'Cisco',
      },
      {
        id: 'JUN',
        Name: 'Juniper',
      },
      {
        id: 'HUW',
        Name: 'Huawei',
      },
      {
        id: 'ATL',
        Name: 'Alcatel',
      },
      {
        id: 'HB',
        Name: 'HB',
      },
    ];

    setData(data);
    setFilteredData(data);
    setDataAvailable(true);
    setNoDataAvailable(false);
    setLoading(false);
  };

  const searchData = text => {
    if (text) {
      let workFlowData = isData.filter(object => {
        let searchTextStatus =
          object.id.toLowerCase().includes(text.toLowerCase()) ||
          object.Name.toLowerCase().includes(text.toLowerCase());
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
          showBackButton
          title={'Make'}
          onBackClicked={() => {
            navigation.goBack(null);
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
                <Make_ListCell
                  itemdata={isFilteredData[index]}
                  onItemClick={() => {
                    route.params.onMake({
                      id: item.id,
                      text: item.Name,
                    });
                    navigation.navigate('Asset_Add_Update');
                  }}
                />
              )}
              refreshControl={
                <RefreshControl
                  refreshing={isLoading}
                  onRefresh={getAssetsListData}
                />
              }
              style={{marginTop: 5}}
            />
          ) : null}

          {isNoDataAvailable ? <NoData /> : null}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Assets_List;
