import React, {useRef} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Colors} from '../../commoncomponents/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import ComplaintsDetails from './ComplaintsDetails';
import APIServices from '../../apiwebservices/APIServices';
import {format} from 'date-fns';

const UserLogListCell = props => {
  var itemData = props.itemdata;
  var formattedDate = format(new Date(itemData.open_date), 'd MMM, yyyy');
  const sheetRef = useRef();
  const [isData, setData] = React.useState();
  var statusData;

  const getColor = status => {
    if (status == 'Closed') {
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
  const openBottomSheet = async () => {
    await APIServices.getRatingByTicketID(
      itemData.id,
      response => {
        if (response.status == 200) {
          setData(response.data);
        } else {
        }
      },
      error => {},
    );
    sheetRef.current.open();
  };
  return (
    <View
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        marginVertical: 5,
        borderBottomColor: Colors.grey_D0D0D0,
        borderBottomWidth: 1,
      }}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 0.6, flexDirection: 'row'}}>
          <Text
            style={{
              fontFamily: 'Titillium-Semibold',
              color: '#000000',
              fontSize: 15,
            }}>
            {itemData.customer_notes}
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
              color: '#000000',
              fontSize: 14,
              //   marginLeft: 5,
            }}>
            Status :{' '}
          </Text>
          <Text
            style={{
              fontFamily: 'Titillium-Semibold',
              color: getColor(itemData.status),
              fontSize: 14,
              //marginLeft: 5,
            }}>
            {changeStatusText(itemData.status)}
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text
            style={{
              fontFamily: 'Titillium-Semibold',
              color: '#000000',
              fontSize: 14,
            }}>
            Complaint ID :{' '}
          </Text>
          <Text
            style={{
              fontFamily: 'Titillium-Semibold',
              color: Colors.blue_3F79E9,
              fontSize: 14,
            }}>
            {itemData.id}
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', marginBottom: 10}}>
        <View style={{flex: 0.7, flexDirection: 'row'}}>
          <Text
            style={{
              fontFamily: 'Titillium-Semibold',
              color: Colors.grey_888888,
              fontSize: 14,
            }}>
            {formattedDate}
          </Text>
        </View>
        <View
          style={{
            flex: 0.4,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              openBottomSheet();
            }}
            style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontFamily: 'Titillium-Semibold',
                color: '#000000',
                fontSize: 15,
                // marginLeft: 5,
              }}>
              See More
            </Text>
            <FontAwesome
              name={'chevron-circle-right'}
              size={17}
              color={Colors.blue_3F79E9}
              style={{
                marginTop: 3,
                // marginLeft: 5,
              }}
            />
          </TouchableOpacity>
          <ComplaintsDetails
            sheetRef={sheetRef}
            data={itemData}
            ratingData={isData}
          />
        </View>
      </View>
    </View>
  );
};

export default UserLogListCell;
