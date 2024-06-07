import React from 'react';
import {Colors} from './Colors';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import {strings} from '../strings/i18n';

export default HeaderView = props => {
  if (props.showHeader) {
    return (
      <View style={styles.container}>
        <View
          style={{flexDirection: 'row', height: '100%', alignItems: 'center'}}>
          <View style={{flex: 0.3, alignItems: 'center'}}>
            {props.showBackButton ? (
              <TouchableOpacity onPress={() => props.onBackClicked()}>
                <Ionicons
                  name={'md-arrow-back-sharp'}
                  size={30}
                  color={Colors.white}
                  style={{marginTop: 22, padding: 5}}
                />
              </TouchableOpacity>
            ) : null}
          </View>

          <View style={{flex: 1.3}}>
            <Text
              style={{
                fontFamily: 'Titillium-Semibold',
                color: '#FFFFFF',
                alignSelf: 'center',
                fontSize: 18,
                marginTop: 25,
              }}>
              {props.title}
            </Text>
          </View>

          <View
            style={{
              flex: 0.4,
              justifyContent: 'flex-end',
              alignItems: 'center',
              flexDirection: 'row',
              marginRight: 15,
            }}>
            {props.showSaveIcon ? (
              <TouchableOpacity onPress={() => props.onSaveClicked()}>
                <Ionicons
                  name={'checkmark-sharp'}
                  size={33}
                  color={Colors.white}
                  style={{marginTop: 22, padding: 5}}
                />
              </TouchableOpacity>
            ) : null}
            {!props.showRefreshIcon ? (
              <TouchableOpacity onPress={() => props.onRefreshClicked()}>
                <Feather
                  name={'refresh-ccw'}
                  size={26}
                  color={Colors.white}
                  style={{marginTop: 22, padding: 5}}
                />
              </TouchableOpacity>
            ) : null}
            {props.showSendIcon ? (
              <TouchableOpacity onPress={() => props.onSendClicked()}>
                <Ionicons
                  name={'send-sharp'}
                  size={30}
                  color={Colors.white}
                  style={{marginTop: 22, padding: 5}}
                />
              </TouchableOpacity>
            ) : null}
            {props.showAddIcon ? (
              <TouchableOpacity onPress={() => props.onAddClicked()}>
                <Feather
                  name={'plus-square'}
                  size={26}
                  color={Colors.white}
                  style={{
                    marginTop: 22,
                    padding: 5,
                    marginLeft: 10,
                    marginRight: -10,
                  }}
                />
              </TouchableOpacity>
            ) : null}
            {props.showFilterIcon ? (
              <TouchableOpacity onPress={() => props.onFilterClicked()}>
                <Feather
                  name={'filter'}
                  size={26}
                  color={Colors.white}
                  style={{
                    marginTop: 22,
                    padding: 5,
                    marginLeft: 10,
                    marginRight: -10,
                  }}
                />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    backgroundColor: Colors.color_5E0F8B,
  },
  dashboard_header_container: {
    height: 100,
  },
});
