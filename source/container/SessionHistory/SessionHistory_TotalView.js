import React from 'react';
import {Colors} from '../../commoncomponents/Colors';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {strings} from '../../strings/i18n';
import {Dialog, DialogContent} from 'react-native-popup-dialog';
import SessionHistory_Popup_ListData from './SessionHistory_Popup_ListData';
import {parseISO, format} from 'date-fns';
import {useTheme} from '@react-navigation/native';

export default SessionHistory_TotalView = props => {
  const color = useTheme().colors;
  console.log(props, 'session data');
  const getData = data => {
    if (data) {
      return data;
    } else {
      return '0';
    }
  };
  const styles = StyleSheet.create({
    container1: {
      flex: 0.2,
      flexDirection: 'row',
      marginTop: -10,
      backgroundColor: Colors.color_A93888,
      justifyContent: 'center',
    },
    container: {
      flex: 0.5,
      flexDirection: 'row',
      marginTop: -10,
      backgroundColor: Colors.color_A93888,
      justifyContent: 'center',
    },
    dataHeaderContainer: {
      flex: 0.5,
      flexDirection: 'row',
      marginTop: -10,
      justifyContent: 'center',
      borderColor: Colors.grey_A9A9A9,
      borderLeftWidth: 1,
      borderBottomWidth: 1,
      borderTopWidth: 1,
      height: 40,
      alignItems: 'center',
    },
    dataHeaderContainer1: {
      flex: 0.5,
      flexDirection: 'row',
      marginTop: -10,
      justifyContent: 'center',
      borderColor: Colors.grey_A9A9A9,
      borderWidth: 1,
      height: 40,
      alignItems: 'center',
    },
    textStyle: {
      fontFamily: 'Titillium-Semibold',
      color: Colors.white,
      fontSize: 10,
    },
    datatextStyle: {
      fontFamily: 'Titillium-Semibold',
      color: color.text,
      fontSize: 11,
      padding: 5,
      textAlign: 'center',
    },
    dataHeadertextStyle: {
      fontFamily: 'Titillium-Semibold',
      color: Colors.white,
      fontSize: 11,
      textAlign: 'center',
      padding: 5,
    },
  });

  if (props.showTotalHeader) {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={styles.container}>
          <Text style={styles.textStyle}>
            {strings('SessionHistory.Sessions')}
          </Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.textStyle}>
            {strings('SessionHistory.Upload')}
          </Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.textStyle}>
            {strings('SessionHistory.Download')}
          </Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.textStyle}>
            {strings('SessionHistory.Usage')}
          </Text>
        </View>
      </View>
    );
  } else if (props.showTotalHeaderData) {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
        <View style={styles.dataHeaderContainer1}>
          <Text style={styles.datatextStyle}>
            {getData(props.data?.Total_sessions)}
          </Text>
        </View>
        <View style={styles.dataHeaderContainer1}>
          <Text style={styles.datatextStyle}>
            {getData(props.data?.Total_upload?.toFixed(1)) +
              ' ' +
              strings('SessionHistory.GB')}
          </Text>
        </View>
        <View style={styles.dataHeaderContainer1}>
          <Text style={styles.datatextStyle}>
            {getData(props.data?.Total_download?.toFixed(2)) +
              ' ' +
              strings('SessionHistory.GB')}
          </Text>
        </View>
        <View style={styles.dataHeaderContainer1}>
          <Text style={styles.datatextStyle}>
            {getData(props.data?.Total_data_usage?.toFixed(1)) +
              ' ' +
              strings('SessionHistory.GB')}
          </Text>
        </View>
      </View>
    );
  } else if (props.showDataHeader) {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 30}}>
        <View style={styles.container}>
          <Text style={styles.dataHeadertextStyle}>
            {strings('SessionHistory.Date')}
          </Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.dataHeadertextStyle}>
            {strings('SessionHistory.StartTime')}
          </Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.dataHeadertextStyle}>
            {strings('SessionHistory.EndTime')}
          </Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.dataHeadertextStyle}>
            {strings('SessionHistory.TotalGB')}
          </Text>
        </View>
        <View style={styles.container1}>
          <Text style={styles.dataHeadertextStyle}></Text>
        </View>
      </View>
    );
  } else if (props.showSessionDetailedView) {
    var itemdate = format(parseISO(props.data.date), 'd MMM, yyyy');
    // var itemdate = format(new Date(props.data.date), 'd MMM, yyyy');
    return (
      <Dialog visible={props.showDialogVisible} width={0.9}>
        <DialogContent
          style={{padding: 10, backgroundColor: Colors.color_e0e0e0}}>
          <View style={{flexDirection: 'column'}}>
            <SessionHistory_Popup_ListData
              showPopupData
              title={strings('SessionHistory.Date')}
              value={itemdate}
            />

            <SessionHistory_Popup_ListData
              showPopupData
              title={strings('SessionHistory.StartTime')}
              value={props.data.start_Time}
            />

            <SessionHistory_Popup_ListData
              showPopupData
              title={strings('SessionHistory.EndTime')}
              value={props.data.stop_time}
            />

            <SessionHistory_Popup_ListData
              showPopupData
              title={strings('SessionHistory.OnlineTime')}
              value={props.data.online_time}
            />

            <SessionHistory_Popup_ListData
              showPopupData
              title={strings('SessionHistory.UploadGB')}
              value={
                props.data?.upload_GB?.toFixed(2) +
                ' ' +
                strings('SessionHistory.GB')
              }
            />

            <SessionHistory_Popup_ListData
              showPopupData
              title={strings('SessionHistory.DownloadGB')}
              value={
                props.data?.download_GB?.toFixed(2) +
                ' ' +
                strings('SessionHistory.GB')
              }
            />

            <SessionHistory_Popup_ListData
              showPopupData
              title={strings('SessionHistory.TotalGB')}
              value={
                props.data?.total_GB?.toFixed(2) +
                ' ' +
                strings('SessionHistory.GB')
              }
            />

            <SessionHistory_Popup_ListData
              showPopupData
              title={strings('SessionHistory.SessionID')}
              value={props.data.session_id}
            />

            <SessionHistory_Popup_ListData
              showPopupData
              title={strings('SessionHistory.IPAddress')}
              value={props.data.ipaddress}
            />

            <View style={{alignSelf: 'center', marginTop: 20}}>
              <TouchableOpacity
                onPress={() => props.closeDialog()}
                style={{
                  backgroundColor: Colors.color_5E0F8B,
                  borderRadius: 20,
                }}>
                <View style={{flexDirection: 'column', padding: 7, width: 120}}>
                  <Text
                    style={{
                      fontFamily: 'Titillium-Semibold',
                      color: '#ffffff',
                      fontSize: 16,
                      alignSelf: 'center',
                    }}>
                    Close
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </DialogContent>
      </Dialog>
    );
  }
};
