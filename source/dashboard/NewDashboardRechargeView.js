import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Dialog, DialogContent} from 'react-native-popup-dialog';
import {Colors} from '../commoncomponents/Colors';
import {strings} from '../strings/i18n';
import RechargeView_Popup_ListData from './RechargeView_Popup_ListData';
import {parseISO, format} from 'date-fns';

export default NewDashboardRechargeView = props => {
  if (props.showDetailedRechargeView) {
    var expiryDate = format(
      parseISO(props.data.expiry_date),
      'd MMM, yyyy hh:mma',
    );
    return (
      <Dialog visible={props.showDialogVisible} width={0.9}>
        <DialogContent
          style={{padding: 10, backgroundColor: Colors.color_e0e0e0}}>
          <View style={{flexDirection: 'column'}}>
            <RechargeView_Popup_ListData
              showPopupData
              title={strings('Dashboard.PlanName')}
              value={props.data.package_name}
            />

            <RechargeView_Popup_ListData
              showPopupData
              title={strings('Dashboard.DownloadSpeed')}
              value={props.data.download_speed + ' ' + strings('Dashboard.MB')}
            />

            <RechargeView_Popup_ListData
              showPopupData
              title={strings('Dashboard.UploadSpeed')}
              value={props.data.upload_speed + ' ' + strings('Dashboard.MB')}
            />

            <RechargeView_Popup_ListData
              showPopupData
              title={strings('Dashboard.Validity')}
              value={props.data.time_unit + ' ' + props.data.unit_type + '(s)'}
            />

            <RechargeView_Popup_ListData
              showPopupData
              title={strings('Dashboard.PlanCost')}
              value={props.data.total_plan_cost}
            />

            <RechargeView_Popup_ListData
              showPopupData
              title={strings('Dashboard.Email')}
              value={props.data.email}
            />

            <RechargeView_Popup_ListData
              showPopupData
              title={strings('Dashboard.ExpiryDate')}
              value={expiryDate}
            />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{alignSelf: 'flex-start', marginTop: 20}}>
                <TouchableOpacity
                  onPress={() => props.openWebView()}
                  style={{
                    backgroundColor: Colors.color_5E0F8B,
                    borderRadius: 10,
                  }}>
                  <View
                    style={{flexDirection: 'column', padding: 7, width: 100}}>
                    <Text
                      style={{
                        fontFamily: 'Titillium-Semibold',
                        color: '#ffffff',
                        fontSize: 14,
                        alignSelf: 'center',
                      }}>
                      Renew
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{alignSelf: 'flex-end', marginTop: 20}}>
                <TouchableOpacity
                  onPress={() => props.closeDialog()}
                  style={{
                    backgroundColor: Colors.color_5E0F8B,
                    borderRadius: 10,
                  }}>
                  <View
                    style={{flexDirection: 'column', padding: 7, width: 100}}>
                    <Text
                      style={{
                        fontFamily: 'Titillium-Semibold',
                        color: '#ffffff',
                        fontSize: 14,
                        alignSelf: 'center',
                      }}>
                      Close
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </DialogContent>
      </Dialog>
    );
  }
};
