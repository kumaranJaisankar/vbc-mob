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
import Asset_ListCell from './Asset_ListCell';

const Assets_List = ({navigation}) => {
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
    await APIServices.getAssetListData(
      response => {
        if (response.status == 200) {
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
          object.city.toLowerCase().includes(text.toLowerCase()) ||
          object.district.toLowerCase().includes(text.toLowerCase()) ||
          object.state.toLowerCase().includes(text.toLowerCase()) ||
          object.pincode.toLowerCase().includes(text.toLowerCase());
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
          showBackButton
          title={strings('Assets.Assets')}
          onAddClicked={() => {
            navigation.navigate('Asset_Add_Update', {
              status: 'add',
            });
          }}
          onRefreshClicked={() => {
            getAssetsListData();
          }}
          onBackClicked={() => {
            navigation.goBack(null);
          }}
        />

        <View style={{flex: 1, margin: 15}}>
          {/* <Search
                            value={search}
                            onChangeText ={(text) => searchData(text)}
                            onClearText ={() => searchData('')}
                            onMICClicked ={() => {}}/> */}

          {isDataAvailable ? (
            <FlatList
              data={isFilteredData}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index}
              renderItem={({item, index}) => (
                <Asset_ListCell
                  itemdata={isFilteredData[index]}
                  onItemClick={() => {
                    navigation.navigate('Map', {
                      status: 'add',
                    });
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

        <DialogView
          showLoadingDialog
          visible={isLoading}
          text={strings('Assets.LoadingAssets')}></DialogView>
      </View>
    </SafeAreaView>
  );
};

export default Assets_List;
