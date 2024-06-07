import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  BackHandler,
  Linking,
} from 'react-native';
import React from 'react';
import {Modal} from 'react-native-paper';
import VersionCheck from 'react-native-version-check';

export default function AppUpdate(props) {
  const hideModal = () => {
    props.hideModal();
  };

  const updateApp = () => {
    console.log(props.versionDetails);
    BackHandler.exitApp();
    Linking.openURL(props.versionDetails.storeUrl);
  };
  return (
    <Modal
      style={{margin: 10}}
      dismissable={false}
      visible={props.visible}
      onDismiss={hideModal}
      contentContainerStyle={style.modelcontainer}>
      <View style={style.appContainer}>
        <Image
          source={require('../assets/images/vbc_logo.png')}
          style={style.imageStyle}
        />
        <View>
          <Text style={{color: '#908e8e', maxWidth: 300}}>
            <Text style={{fontWeight: 'bold', color: '#747272', fontSize: 15}}>
              VBC ON FIBER
            </Text>{' '}
            needs an update?
          </Text>
        </View>
      </View>
      <View
        style={{
          borderBottomColor: 'black',
          borderBottomWidth: StyleSheet.hairlineWidth,
          marginVertical: 10,
        }}
      />
      <View style={style.btnContainer}>
        <TouchableOpacity onPress={hideModal}>
          <Text style={{fontWeight: 'bold', color: '#747272', fontSize: 15}}>
            Cancel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={updateApp} style={style.updatebtn}>
          <Text style={style.btnFont}>Update</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const style = StyleSheet.create({
  appContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  imageStyle: {width: 80, resizeMode: 'contain'},
  modelcontainer: {backgroundColor: 'white', padding: 20, borderRadius: 10},
  updatebtn: {
    backgroundColor: '#33A844',
    padding: 10,
    borderRadius: 10,
    marginLeft: 10,
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  btnFont: {
    color: 'white',
  },
});
