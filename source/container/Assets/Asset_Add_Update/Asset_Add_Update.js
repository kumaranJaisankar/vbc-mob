import React, {useRef} from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Colors} from '../../../commoncomponents/Colors';
import {strings} from '../../../strings/i18n';
import FormField from '../FormFields/Asset_FormField';
import {formData} from '../../../commoncomponents/formData';
import DialogView from '../../../commoncomponents/DialogView';
import {GetHeaderData} from '../../../apiwebservices/APIServiceHeader';
import axios from 'axios';
import Headerview from '../../../commoncomponents/HeaderView';
import apiConfig from '../../../apiwebservices/apiConfig';

const Asset_Add_Update = ({navigation, route}) => {
  const [isLoading, setLoading] = React.useState(false);

  const [isAlertDialogShow, setAlertDialogShow] = React.useState(false);

  const [isAlertMessage, setAlertMessage] = React.useState('');

  var data = {
    hardware_category: '',
    hardware_name: '',
    serial_no: '',
    device_model: '',
    no_of_ports: '',
    available_ports: '',
    dpe_per_oltport: '',
    olt_use_criteria: '',
    specificaition: '',
    notes: '',
    house_no: '',
    street: '',
    landmark: '',
    city: '',
    district: '',
    pincode: '',
    state: '',
    country: 'India',
    latitude: '18.105276',
    longitude: '83.388720',
    make: '',
    snmp_port: '',
    nas: '',
  };

  const [formValues, handleFormValueChange, setFormValues] = formData(data);

  const onSaveClicked = async () => {
    if (!formValues.hardware_category) {
      setAlertMessage('Please Select Hardware Category');
      setAlertDialogShow(true);
      return;
    } else if (!formValues.hardware_name) {
      setAlertMessage('Please Select Hardware Name');
      setAlertDialogShow(true);
      return;
    } else if (!formValues.make) {
      setAlertMessage('Please Select Make');
      setAlertDialogShow(true);
      return;
    } else if (!formValues.serial_no) {
      setAlertMessage('Please Enter Serial Number');
      setAlertDialogShow(true);
      return;
    } else if (!formValues.snmp_port) {
      setAlertMessage('Please Enter SNMP Port');
      setAlertDialogShow(true);
      return;
    } else if (!formValues.nas) {
      setAlertMessage('Please Enter NAS');
      setAlertDialogShow(true);
      return;
    } else if (!formValues.device_model) {
      setAlertMessage('Please Enter Device Model');
      setAlertDialogShow(true);
      return;
    } else if (!formValues.no_of_ports) {
      setAlertMessage('Please Enter Number of Ports');
      setAlertDialogShow(true);
      return;
    } else if (!formValues.available_ports) {
      setAlertMessage('Please Enter Available Ports');
      setAlertDialogShow(true);
      return;
    } else if (!formValues.dpe_per_oltport) {
      setAlertMessage('Please Enter DPE');
      setAlertDialogShow(true);
      return;
    } else if (!formValues.olt_use_criteria) {
      setAlertMessage('Please Enter OLT Criteria');
      setAlertDialogShow(true);
      return;
    } else if (!formValues.specificaition) {
      setAlertMessage('Please Enter Specification');
      setAlertDialogShow(true);
      return;
    } else if (!formValues.notes) {
      setAlertMessage('Please Enter Notes');
      setAlertDialogShow(true);
      return;
    } else if (!formValues.house_no) {
      setAlertMessage('Please Enter House Number');
      setAlertDialogShow(true);
      return;
    } else if (!formValues.street) {
      setAlertMessage('Please Enter Street');
      setAlertDialogShow(true);
      return;
    } else if (!formValues.city) {
      setAlertMessage('Please Enter City');
      setAlertDialogShow(true);
      return;
    } else if (!formValues.pincode) {
      setAlertMessage('Please Enter Pincode');
      setAlertDialogShow(true);
      return;
    } else if (!formValues.district) {
      setAlertMessage('Please Enter District');
      setAlertDialogShow(true);
      return;
    } else if (!formValues.state) {
      setAlertMessage('Please Enter State');
      setAlertDialogShow(true);
      return;
    } else {
      var body = {
        hardware_category: formValues.hardware_category,
        hardware_name: formValues.hardware_name,
        serial_no: formValues.serial_no,
        device_model: formValues.device_model,
        no_of_ports: formValues.no_of_ports,
        available_ports: formValues.available_ports,
        dpe_per_oltport: formValues.dpe_per_oltport,
        olt_use_criteria: formValues.olt_use_criteria,
        specificaition: formValues.specificaition,
        notes: formValues.notes,
        house_no: formValues.house_no,
        street: formValues.street,
        landmark: formValues.landmark,
        city: formValues.city,
        district: formValues.district,
        pincode: formValues.pincode,
        state: formValues.state,
        country: formValues.country,
        latitude: formValues.latitude,
        longitude: formValues.longitude,
        make: formValues.make,
        snmp_port: formValues.snmp_port,
        nas: formValues.nas,
      };
      var header = GetHeaderData();
      var url = `${apiConfig.REACT_APP_API_URL_NETWORK}/network/olt/create`;
      await axios
        .post(url, JSON.stringify(body), header)
        .then(response => {
          console.log(JSON.stringify(response));
        })
        .catch((_error, response) => {
          const errorresponse = _error.toString();
          console.log(errorresponse + '//////' + JSON.stringify(_error));
        });
    }
  };

  const onHardwareCategory = params => {
    setFormValues({
      ...formValues,
      hardware_category: params.id,
    });
  };

  const onMake = params => {
    setFormValues({
      ...formValues,
      make: params.id,
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: Colors.grey_E2E2E2}}>
        <Headerview
          showHeader
          showBackButton
          showSaveIcon
          title={'Create New Hardware'}
          onBackClicked={() => {
            navigation.goBack(null);
          }}
          onSaveClicked={() => {
            onSaveClicked();
          }}
        />

        <View style={{flex: 1, backgroundColor: Colors.color_5E0F8B}}>
          <ScrollView
            style={{backgroundColor: Colors.grey_E2E2E2, padding: 10}}>
            <Text
              style={{
                color: Colors.blue_003366,
                fontSize: 16,
                fontFamily: 'Titillium-Semibold',
                textDecorationLine: 'underline',
              }}>
              Hardware
            </Text>

            <FormField
              title={'Hardware Category'}
              formKey={'hardware_category'}
              isMandatory={true}
              showDropDown
              isEnabled={true}
              value={formValues.hardware_category}
              onDropDownClick={() => {
                navigation.navigate('HardwareCategory', {
                  onHardwareCategory: onHardwareCategory.bind(this),
                });
              }}
            />

            <FormField
              title={'Hardware Name'}
              formKey={'hardware_name'}
              isMandatory={true}
              showInput
              isEnabled={true}
              length={10}
              value={formValues.hardware_name}
              handleFormValueChange={handleFormValueChange}
            />

            <FormField
              title={'Make'}
              formKey={'make'}
              isMandatory={true}
              showDropDown
              isEnabled={true}
              value={formValues.make}
              onDropDownClick={() => {
                navigation.navigate('Make', {
                  onMake: onMake.bind(this),
                });
              }}
            />

            <FormField
              title={'Serial No'}
              formKey={'serial_no'}
              isMandatory={true}
              showInput
              isEnabled={true}
              length={10}
              value={formValues.serial_no}
              handleFormValueChange={handleFormValueChange}
            />

            <FormField
              title={'SNMP Port'}
              formKey={'snmp_port'}
              isMandatory={true}
              showInput
              isEnabled={true}
              length={10}
              value={formValues.snmp_port}
              handleFormValueChange={handleFormValueChange}
            />

            <FormField
              title={'NAS'}
              formKey={'nas'}
              isMandatory={true}
              showInput
              isEnabled={true}
              length={10}
              value={formValues.nas}
              handleFormValueChange={handleFormValueChange}
            />

            <FormField
              title={'Device Model'}
              formKey={'device_model'}
              isMandatory={true}
              showInput
              isEnabled={true}
              length={10}
              value={formValues.device_model}
              handleFormValueChange={handleFormValueChange}
            />

            <FormField
              title={'No. of Ports'}
              formKey={'no_of_ports'}
              isMandatory={true}
              showInput
              isEnabled={true}
              length={1}
              keyboardType={'numeric'}
              value={formValues.no_of_ports}
              handleFormValueChange={handleFormValueChange}
            />

            <FormField
              title={'Available Ports'}
              formKey={'available_ports'}
              isMandatory={true}
              showInput
              isEnabled={true}
              length={1}
              keyboardType={'numeric'}
              value={formValues.available_ports}
              handleFormValueChange={handleFormValueChange}
            />

            <FormField
              title={'DPE'}
              formKey={'dpe_per_oltport'}
              isMandatory={true}
              showInput
              isEnabled={true}
              length={10}
              value={formValues.dpe_per_oltport}
              handleFormValueChange={handleFormValueChange}
            />

            <FormField
              title={'OLT Criteria'}
              formKey={'olt_use_criteria'}
              isMandatory={true}
              showInput
              isEnabled={true}
              length={10}
              value={formValues.olt_use_criteria}
              handleFormValueChange={handleFormValueChange}
            />

            <FormField
              title={'Specifications'}
              formKey={'specificaition'}
              isMandatory={true}
              showInput
              isEnabled={true}
              length={10}
              value={formValues.specificaition}
              handleFormValueChange={handleFormValueChange}
            />

            <FormField
              title={'Notes'}
              formKey={'notes'}
              isMandatory={true}
              showInput
              isEnabled={true}
              length={10}
              value={formValues.notes}
              handleFormValueChange={handleFormValueChange}
            />

            <Text
              style={{
                color: Colors.blue_003366,
                fontSize: 16,
                fontFamily: 'Titillium-Semibold',
                marginTop: 10,
                textDecorationLine: 'underline',
              }}>
              Address
            </Text>

            <FormField
              title={strings('KYC_Form.HNo')}
              formKey={'house_no'}
              isMandatory={true}
              showInput
              isEnabled={true}
              length={40}
              value={formValues.house_no}
              handleFormValueChange={handleFormValueChange}
            />

            <FormField
              title={strings('KYC_Form.Landmark')}
              formKey={'landmark'}
              isMandatory={false}
              showInput
              isEnabled={true}
              length={40}
              value={formValues.landmark}
              handleFormValueChange={handleFormValueChange}
            />

            <FormField
              title={strings('KYC_Form.Street')}
              formKey={'street'}
              isMandatory={true}
              showInput
              isEnabled={true}
              length={40}
              value={formValues.street}
              handleFormValueChange={handleFormValueChange}
            />

            <FormField
              title={strings('KYC_Form.City')}
              formKey={'city'}
              isMandatory={true}
              showInput
              isEnabled={true}
              length={40}
              value={formValues.city}
              handleFormValueChange={handleFormValueChange}
            />

            <FormField
              title={strings('KYC_Form.Pincode')}
              formKey={'pincode'}
              isMandatory={true}
              showInput
              isEnabled={true}
              length={6}
              keyboardType={'numeric'}
              value={formValues.pincode}
              handleFormValueChange={handleFormValueChange}
            />

            <FormField
              title={strings('KYC_Form.District')}
              formKey={'district'}
              isMandatory={true}
              showInput
              isEnabled={true}
              length={40}
              value={formValues.district}
              handleFormValueChange={handleFormValueChange}
            />

            <FormField
              title={strings('KYC_Form.State')}
              formKey={'state'}
              isMandatory={true}
              showInput
              isEnabled={true}
              length={40}
              value={formValues.state}
              handleFormValueChange={handleFormValueChange}
            />

            <FormField
              title={strings('KYC_Form.Country')}
              formKey={'country'}
              isMandatory={true}
              showInput
              isEnabled={false}
              length={40}
              value={formValues.country}
              handleFormValueChange={handleFormValueChange}
            />

            <FormField
              title={'Latitude'}
              formKey={'latitude'}
              isMandatory={true}
              showInput
              isEnabled={false}
              length={40}
              value={formValues.latitude}
              handleFormValueChange={handleFormValueChange}
            />

            <FormField
              title={'Latitude'}
              formKey={'longitude'}
              isMandatory={true}
              showInput
              isEnabled={false}
              length={40}
              value={formValues.longitude}
              handleFormValueChange={handleFormValueChange}
            />

            <View style={{marginBottom: 50}}></View>
          </ScrollView>
        </View>

        <DialogView
          showAlertDialog
          confirmText={strings('Dialog.ok')}
          visible={isAlertDialogShow}
          text={isAlertMessage}
          onConfirm={() => {
            setAlertDialogShow(false);
          }}></DialogView>
      </View>
    </SafeAreaView>
  );
};

export default Asset_Add_Update;

const styles = StyleSheet.create({
  parent: {
    height: 100,
    width: '100%',
    backgroundColor: Colors.color_5E0F8B,
    flexDirection: 'row',
  },
  child: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  child1: {
    flex: 1,
    justifyContent: 'center',
  },
  child2: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  switchContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    margin: 10,
  },
  textStyle_attachment: {
    color: Colors.black,
    fontSize: 15,
    fontFamily: 'Titillium-Semibold',
  },
  textStyle_close_attachment: {
    color: Colors.red_FF0000,
    fontSize: 16,
    fontFamily: 'Titillium-Semibold',
  },
});
