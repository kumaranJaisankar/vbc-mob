import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  RefreshControl,
} from 'react-native';
import {Colors} from '../../commoncomponents/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import RBSheet from 'react-native-raw-bottom-sheet';
import {format} from 'date-fns';
import {Button, TextInput} from 'react-native-paper';
import {Dropdown} from 'react-native-element-dropdown';
import Toast from 'react-native-toast-message';
import APIServices from '../../apiwebservices/APIServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from '@react-navigation/native';
import {useTheme as useMDtheme} from 'react-native-paper';

const ComplaintsDetails = props => {
  const color = useTheme().colors;
  const materialColor = useMDtheme().colors;
  const [feedback, setFeedback] = React.useState('');
  const [value, setValue] = React.useState(null);
  const [isFocus, setIsFocus] = React.useState(false);
  const [requiredMsg, setRequiredMsg] = React.useState({});
  const data = [
    {label: 'Very Poor', value: 'VP'},
    {label: 'Poor', value: 'P'},
    {label: 'Average', value: 'AVG'},
    {label: 'Good', value: 'GD'},
    {label: 'Very Good', value: 'VG'},
  ];

  var itemData = props.data;
  var statusData;
  var ratingData = props?.ratingData;
  var sheetRef = props.sheetRef;
  var formattedCreatedDate = format(
    new Date(itemData.open_date),
    'd MMM, yyyy hh:mma',
  );
  var formattedUpdatedDate = format(
    new Date(itemData.modified),
    'd MMM, yyyy hh:mma',
  );

  const getRatingName = rating => {
    if (rating == 'VP') {
      return (
        <Text
          style={{
            fontFamily: 'Titillium-Semibold',
            color: '#000000',
            fontSize: 14,
          }}>
          Very Poor
        </Text>
      );
    } else if (rating == 'P') {
      return (
        <Text
          style={{
            fontFamily: 'Titillium-Semibold',
            color: '#000000',
            fontSize: 14,
          }}>
          Poor
        </Text>
      );
    } else if (rating == 'AVG') {
      return (
        <Text
          style={{
            fontFamily: 'Titillium-Semibold',
            color: '#000000',
            fontSize: 14,
          }}>
          Average
        </Text>
      );
    } else if (rating == 'GD') {
      return (
        <Text
          style={{
            fontFamily: 'Titillium-Semibold',
            color: '#000000',
            fontSize: 14,
          }}>
          Good
        </Text>
      );
    } else if (rating == 'VG') {
      return (
        <Text
          style={{
            fontFamily: 'Titillium-Semibold',
            color: '#000000',
            fontSize: 14,
          }}>
          Very Good
        </Text>
      );
    }
  };
  const getStars = rating => {
    return (
      <>
        <FontAwesome
          name={'star'}
          size={22}
          onPress={() => !ratingData && setValue('VP')}
          color={
            rating === 'VP' ||
            rating === 'P' ||
            rating === 'AVG' ||
            rating === 'GD' ||
            rating === 'VG'
              ? Colors.golden_FFD700
              : Colors.grey_888888
          }
        />
        <FontAwesome
          name={'star'}
          size={22}
          onPress={() => !ratingData && setValue('P')}
          color={
            rating === 'P' ||
            rating === 'AVG' ||
            rating === 'GD' ||
            rating === 'VG'
              ? Colors.golden_FFD700
              : Colors.grey_888888
          }
        />
        <FontAwesome
          name={'star'}
          size={22}
          onPress={() => !ratingData && setValue('AVG')}
          color={
            rating === 'AVG' || rating === 'GD' || rating === 'VG'
              ? Colors.golden_FFD700
              : Colors.grey_888888
          }
        />
        <FontAwesome
          name={'star'}
          size={22}
          onPress={() => !ratingData && setValue('GD')}
          color={
            rating === 'GD' || rating === 'VG'
              ? Colors.golden_FFD700
              : Colors.grey_888888
          }
        />
        <FontAwesome
          name={'star'}
          onPress={() => !ratingData && setValue('VG')}
          size={22}
          color={rating === 'VG' ? Colors.golden_FFD700 : Colors.grey_888888}
        />
      </>
    );
  };
  const getColor = status => {
    if (status == 'CLD') {
      return Colors.red_FF0000;
    } else if (status == 'Hold') {
      return Colors.brown_AF8720;
    } else if (status == 'In Progress') {
      return Colors.blue_295CBF;
    } else if (status == 'Open') {
      return Colors.green_36BE39;
    } else if (status == 'Resolved') {
      return Colors.grey_444444;
    }
  };
  const changeStatusText = status => {
    if (status == 'CLD') {
      statusData = 'Closed';
    } else if (status == 'Hold') {
      statusData = 'Hold';
    } else if (status == 'INP') {
      statusData = 'In Progress';
    } else if (status == 'OPN') {
      statusData = 'Open';
    } else if (status == 'RSL') {
      statusData = 'Resolved';
    } else if (status == 'ASN') {
      statusData = 'Assigned';
    } else {
      statusData = status;
    }
    return statusData;
  };
  const onSubmitPressed = async () => {
    var customerID;
    try {
      customerID = Number(await AsyncStorage.getItem('customerID'));
    } catch (e) {}
    if (value && feedback) {
      await APIServices.submitFeedback(
        value,
        feedback,
        itemData.id,
        customerID,
        response => {
          if (response.status == 200) {
            const responseMsg = response;
            console.log(response.data);
            sheetRef.current.close();
            Toast.show({
              type: 'success',
              text1: 'Rating Submitted!',
              position: 'bottom',
            });
          } else {
            const errorresponse = response;
          }
        },
        error => {
          const errorresponse = error.toString();
        },
      );
      setValue(null);
      setFeedback('');
      setRequiredMsg({});
    } else {
      setRequiredMsg({
        value: !value ? true : false,
        feedback: !feedback ? true : false,
      });
    }
  };
  return (
    <RBSheet
      ref={sheetRef}
      closeOnPressBack={true}
      draggable={true}
      closeOnDragDown={true}
      closeOnPressMask={false}
      dragOnContent={true}
      height={550}
      customStyles={{
        container: {
          borderTopEndRadius: 20,
          borderTopLeftRadius: 20,
          backgroundColor: materialColor.onSecondary,
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
          backgroundColor: color.text,
        },
      }}>
      <View style={{padding: 20}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 0.6, flexDirection: 'row'}}>
            <Text
              style={{
                fontFamily: 'Titillium-Semibold',
                color: color.text,
                fontSize: 14,
              }}>
              Complaint ID :{' '}
            </Text>
            <Text
              style={{
                fontFamily: 'Titillium-Semibold',
                color: materialColor.primary,
                fontSize: 14,
              }}>
              {itemData.id}
            </Text>
          </View>
          <View
            style={{
              flex: 0.4,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Titillium-Semibold',
                color: color.text,
                fontSize: 14,
                marginLeft: 5,
              }}>
              Status :{' '}
            </Text>
            <Text
              style={{
                fontFamily: 'Titillium-Semibold',
                color: getColor(itemData.status),
                fontSize: 14,
                marginLeft: 5,
              }}>
              {changeStatusText(itemData.status)}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <View style={{flex: 0.5, flexDirection: 'column'}}>
            <Text
              style={{
                fontFamily: 'Titillium-Semibold',
                color: color.text,
                fontSize: 14,
              }}>
              Complaint Type
            </Text>
            <Text
              style={{
                fontFamily: 'Titillium-Semibold',
                color: '#777777',
                fontSize: 14,
              }}>
              {itemData?.ticket_category?.category}
            </Text>
          </View>
          <View
            style={{
              flex: 0.5,
              flexDirection: 'column',
              justifyContent: 'flex-start',
            }}>
            <Text
              style={{
                fontFamily: 'Titillium-Semibold',
                color: color.text,
                fontSize: 14,
                marginLeft: 5,
              }}>
              User Feedback
            </Text>
            <Text
              style={{
                fontFamily: 'Titillium-Semibold',
                color: '#777777',
                fontSize: 14,
                marginLeft: 5,
              }}>
              {itemData.customer_notes}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <View style={{flex: 0.5, flexDirection: 'column'}}>
            <Text
              style={{
                fontFamily: 'Titillium-Semibold',
                color: color.text,
                fontSize: 14,
              }}>
              Created On
            </Text>
            <Text
              style={{
                fontFamily: 'Titillium-Semibold',
                color: '#777777',
                fontSize: 14,
              }}>
              {formattedCreatedDate}
            </Text>
          </View>
          <View
            style={{
              flex: 0.5,
              flexDirection: 'column',
              justifyContent: 'flex-start',
            }}>
            <Text
              style={{
                fontFamily: 'Titillium-Semibold',
                color: color.text,
                fontSize: 14,
                marginLeft: 5,
              }}>
              Updated On
            </Text>
            <Text
              style={{
                fontFamily: 'Titillium-Semibold',
                color: '#777777',
                fontSize: 14,
                marginLeft: 5,
              }}>
              {formattedUpdatedDate}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <Text
              style={{
                fontFamily: 'Titillium-Semibold',
                color: color.text,
                fontSize: 14,
                marginBottom: 6,
              }}>
              Your Rating
            </Text>
            <View>
              {ratingData ? (
                <>
                  <View style={{flexDirection: 'row'}}>
                    {getStars(ratingData?.rating)}
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    {getRatingName(ratingData?.rating)}
                    {/* </Text> */}
                  </View>
                </>
              ) : (
                <>
                  <View style={{flexDirection: 'row'}}>{getStars(value)}</View>
                  <View style={{flexDirection: 'row'}}>
                    {getRatingName(value)}
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
        {value && (
          <View>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <View style={{flex: 1, flexDirection: 'column'}}>
                <Text
                  style={{
                    fontFamily: 'Titillium-Semibold',
                    color: '#000000',
                    fontSize: 14,
                  }}>
                  Your Feedback
                </Text>
                <TextInput
                  mode="outlined"
                  returnKeyType="next"
                  autoCapitalize="none"
                  keyboardType="default"
                  multiline={true}
                  underlineColorAndroid="transparent"
                  value={feedback}
                  style={{
                    fontFamily: 'Titillium-Semibold',
                    color: '#777777',
                    fontSize: 14,
                    backgroundColor: Colors.white,
                    borderRadius: 5,
                    textAlignVertical: 'top',
                  }}
                  onChangeText={text => setFeedback(text)}
                  theme={{
                    colors: {
                      placeholder: Colors.grey_888888,
                      text: Colors.black,
                      primary: Colors.grey_C0C0C0,
                      underlineColor: 'transparent',
                      backgroundColor: Colors.white,
                    },
                    fonts: {
                      regular: {
                        fontFamily: 'Titillium-Semibold',
                        fontWeight: 'normal',
                      },
                    },
                  }}
                />
                <Text
                  style={{
                    fontFamily: 'Titillium-Semibold',
                    color: Colors.red_FF0000,
                    fontSize: 11,
                  }}>
                  {requiredMsg?.feedback && 'Feedback is required !!!'}
                </Text>
              </View>
            </View>
            <Button
              mode="contained"
              onPress={() => {
                onSubmitPressed();
              }}
              uppercase={false}
              style={{
                backgroundColor: '#476DFC',
                marginTop: 10,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Titillium-Semibold',
                  fontWeight: 'normal',
                  color: Colors.white,
                }}>
                Submit
              </Text>
            </Button>
          </View>
        )}
      </View>
    </RBSheet>
  );
};
export default ComplaintsDetails;
const styles = StyleSheet.create({
  dropdown: {
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontFamily: 'Titillium-Semibold',
    color: '#000000',
    fontSize: 14,
  },
  selectedTextStyle: {
    fontFamily: 'Titillium-Semibold',
    color: '#000000',
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
