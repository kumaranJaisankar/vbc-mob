import React from 'react';
import {View, Text, Image} from 'react-native';
import {Colors} from '../commoncomponents/Colors';
import {strings} from '../strings/i18n';

const NoData = props => {
  const NoDataView = () => {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Image
          source={require('../assets/images/no_data_icon.png')}
          style={{width: 80, height: 80, alignSelf: 'center'}}
        />
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'Titillium-Semibold',
            color: Colors.red_FF0000,
            fontSize: 17,
          }}>
          {strings('NoData.no_data')}
        </Text>
      </View>
    );
  };

  return <NoDataView />;
};

export default NoData;
