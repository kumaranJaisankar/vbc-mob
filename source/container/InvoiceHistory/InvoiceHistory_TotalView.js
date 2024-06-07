import React from 'react';
import {Colors} from '../../commoncomponents/Colors';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
  Dimensions,
} from 'react-native';
import {strings} from '../../strings/i18n';
import {Dialog, DialogContent} from 'react-native-popup-dialog';
import PDFView from 'react-native-view-pdf';
import RNFetchBlob from 'rn-fetch-blob';
import {Platform} from 'react-native';

const SessionHistory_TotalView = props => {
  const checkPermission = props => {
    if (Platform.OS === 'ios') {
      downloadInvoice(props);
    } else {
      if (Platform.OS === 'android' && Platform.Version >= 33) {
        downloadInvoice(props);
      } else {
        try {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'storage title',
              message: 'storage_permission',
            },
          ).then(granted => {
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              console.log('Storage Permission Granted.');
              downloadInvoice(props);
            } else {
              Alert.alert('storage_permission');
            }
          });
        } catch (err) {
          console.log('error', err);
        }
      }
      // try {
      //   PermissionsAndroid.request(
      //     PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      //     // {
      //     //   title: 'storage title',
      //     //   message: 'storage_permission',
      //     // },
      //   ).then(granted => {
      //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      //       console.log('Storage Permission Granted.');
      //       downloadInvoice(props);
      //     }
      //     // else {
      //     //   Alert.alert('storage_permission');
      //     // }
      //   });
      // } catch (err) {
      //   console.log('error', err);
      // }
    }
  };

  const downloadInvoice = props => {
    const {config, fs} = RNFetchBlob;
    let DownloadDir = fs.dirs.DownloadDir;
    let date = new Date();
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        //Related to the Android only
        useDownloadManager: true,
        notification: true,
        path: DownloadDir + '/Invoice_' + props.data.invoice_id + '.pdf',
        description: 'Invoice',
      },
    };
    config(options)
      .fetch('GET', props.data.invoice.inv_download)
      .then(res => {
        // console.log('res -> ', JSON.stringify(res));
        Alert.alert(
          'Download Successful!',
          'Invoice downloaded successfully to your device.',
        );
        props.closeDialog();
      });
  };

  if (props.showTotalHeader) {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={styles.container}>
          <Text style={styles.textStyle}>{strings('InvoiceHistory.Date')}</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.textStyle}>
            {strings('InvoiceHistory.Amount')}
          </Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.textStyle}>
            {strings('InvoiceHistory.Invoice')}
          </Text>
        </View>
      </View>
    );
  } else if (props.showPdfPreView) {
    return (
      <View style={{width: '100%', height: '75%', padding: 10}}>
        <PDFView
          style={{width: '100%', height: '85%'}}
          onError={error => console.log('onError', error)}
          onLoad={() => console.log('PDF rendered from url')}
          resource={props.data.invoice.inv_preview}
          resourceType="url"
        />
        <View style={{alignSelf: 'center', marginTop: 10}}>
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
    );
  } else if (props.showPdfDownloadView) {
    {
      checkPermission(props);
    }
  }
  return null;
};
export default SessionHistory_TotalView;
const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    flexDirection: 'row',
    //marginTop: -10,
    backgroundColor: Colors.color_A93888,
    justifyContent: 'center',
  },
  textStyle: {
    fontFamily: 'Titillium-Semibold',
    color: Colors.white,
    fontSize: 12,
  },
});
