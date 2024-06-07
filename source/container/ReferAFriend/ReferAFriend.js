import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  Share,
} from 'react-native';
import {Colors} from '../../commoncomponents/Colors';
import Headerview from '../../commoncomponents/HeaderView1';
import apiConfig from '../../apiwebservices/apiConfig';
const DashBoard = ({navigation}) => {
  const [modalVisible, setModalVisible] = React.useState(false);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'VBC: Use Referral Code: 686942. Get Upto Rs.300 off',
        url: 'http://www.vbctv.in/index.html',
        title: apiConfig.REACT_APP_CLIENT_NAME,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: Colors.grey_F8F7FD}}>
        <Headerview
          showHeader
          title="Refer A Friend"
          onMenuClick={() => {
            setModalVisible(true);
          }}
        />

        <View style={{flex: 1}}>
          <View style={{marginTop: -80}}>
            <View
              style={{
                backgroundColor: Colors.white,
                borderRadius: 10,
                padding: 20,
                margin: 20,
                height: '94%',
              }}>
              <ScrollView
                style={{}}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
                <View
                  style={{flexDirection: 'column', justifyContent: 'center'}}>
                  <Image
                    source={require('../../assets/images/referafriendimage.png')}
                    style={{alignSelf: 'center'}}></Image>

                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 300,
                      marginTop: 20,
                      alignSelf: 'center',
                    }}>
                    <Text style={styles.hyperlinkStyle1}>
                      Refer a friend and earn 300 reward points when they take a
                      new connection using your code or link.{' '}
                      <Text
                        style={styles.hyperlinkStyle}
                        onPress={() => {
                          //Linking.openURL('https://www.google.com');
                          navigation.navigate('TermsOfService');
                        }}>
                        Learn More
                      </Text>
                    </Text>
                  </View>

                  <Text style={styles.yourrefcode}>Your Referral Code</Text>

                  <Text style={styles.refcode}>6 8 6 9 4 2</Text>

                  <TouchableOpacity>
                    <Text style={styles.copyrefcode}>Tap on code to copy</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={onShare}
                    style={{
                      marginHorizontal: 10,
                      marginTop: 40,
                      marginBottom: 50,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontFamily: 'Titillium-Semibold',
                        color: '#ffffff',
                        fontSize: 16,
                        backgroundColor: '#3F79E9',
                        padding: 10,
                        borderRadius: 5,
                      }}>
                      Refer a friend
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </View>

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
  hyperlinkStyle: {
    color: 'blue',
    fontFamily: 'Titillium-Semibold',
    fontSize: 14,
  },
  hyperlinkStyle1: {
    color: 'black',
    fontFamily: 'Titillium-Semibold',
    fontSize: 15,
    textAlign: 'center',
  },
  yourrefcode: {
    color: '#777777',
    fontFamily: 'Titillium-Semibold',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  refcode: {
    color: '#3F79E9',
    fontFamily: 'Titillium-Semibold',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
    borderRadius: 10,
    borderStyle: 'dashed',
    borderColor: '#777777',
    borderWidth: 2,
    width: 200,
    height: 40,
    alignSelf: 'center',
    textAlignVertical: 'center',
    backgroundColor: '#F5F8FE',
  },
  copyrefcode: {
    color: 'blue',
    fontFamily: 'Titillium-Semibold',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 10,
  },
});
