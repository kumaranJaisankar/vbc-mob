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
  Dimensions,
} from 'react-native';
import {Colors} from '../../commoncomponents/Colors';
import Headerview from '../../commoncomponents/HeaderView1';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Dialog, DialogContent, SlideAnimation} from 'react-native-popup-dialog';
import FormFieldInput from '../KYC_Form/FormFields/KYC_FormField1';
import {formData} from '../../commoncomponents/formData';
import APIServices from '../../apiwebservices/APIServices';
import DialogView from '../../commoncomponents/DialogView';
import NoData from '../../commoncomponents/NoData';
import {connect} from 'react-redux';
import Toast from 'react-native-toast-message';
import {Alert} from 'react-native';
import CustomTabNav from '../../navigation/CustomTabNav';
import {useTheme as useMDtheme} from 'react-native-paper';
import {useTheme} from '@react-navigation/native';

const DashBoard = ({navigation, user}) => {
  const color = useTheme().colors;
  const materialColor = useMDtheme().colors;
  var data = {
    first_name: '',
    last_name: '',
    register_mobile: '',
    registered_email: '',
    house_no: '',
    street: '',
    landmark: '',
    city: '',
    district: '',
    pincode: '',
    state: '',
    country: '',
  };
  const [formValues, handleFormValueChange, setFormValues] = formData(data);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [isLoading, setLoading] = React.useState({text: '', loading: false});
  const [isData, setData] = React.useState({});
  const [isDataAvailable, setIsDataAvailable] = React.useState(false);
  const [enabled, setEnabled] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getProfileData();
    });
    return unsubscribe;
  }, [navigation]);

  const getProfileData = async () => {
    setLoading({text: 'Loading Profile...', loading: true});
    await APIServices.getCustomerProfile(
      user.id,
      response => {
        if (response.status == 200) {
          setData(response.data);
          setFormValues({
            first_name: response.data.first_name,
            last_name: response.data.last_name,
            register_mobile: response.data.register_mobile,
            registered_email: response.data.registered_email,
            house_no: response.data.address.house_no,
            district: response.data.address.district,
            country: response.data.address.country,
            street: response.data.address.street,
            state: response.data.address.state,
            city: response.data.address.city,
            landmark: response.data.address.landmark,
            pincode: response.data.address.pincode,
          });
          setIsDataAvailable(true);
          setLoading({text: '', loading: false});
        } else {
          setIsDataAvailable(false);
          setLoading({text: '', loading: false});
        }
      },
      error => {
        setIsDataAvailable(false);
        setLoading({text: '', loading: false});
      },
    );
  };

  const updateCustomerProfile = async () => {
    setLoading({text: 'Updating Profile...', loading: true});
    let body = {
      address: {
        id: isData?.address?.id,
        house_no: isData?.address?.house_no,
        landmark: isData?.address?.landmark,
        street: isData?.address?.street,
        city: isData?.address?.city,
        pincode: isData?.address?.pincode,
        district: isData?.address?.district,
        state: isData?.address?.state,
        country: isData?.address?.country,
      },
      first_name: formValues.first_name,
      last_name: formValues.last_name,
      register_mobile: formValues.register_mobile,
      alternate_mobile: isData?.alternate_mobile,
      registered_email: formValues.registered_email,
      user_advance_info: {
        id: isData?.user_advance_info?.id,
        installation_charges: isData?.user_advance_info?.installation_charges,
        security_deposit: isData?.user_advance_info?.security_deposit,
        GSTIN: isData?.user_advance_info?.GSTIN,
        street: isData?.address?.state,
      },
      radius_info: {
        id: isData?.radius_info?.id,
        static_ip_bind: isData?.radius_info?.static_ip_bind,
        static_ip_cost: isData?.radius_info?.static_ip_cost,
        street: isData?.address?.state,
      },
      stb_serial_no: isData?.stb_serial_no,
      extension_no: isData?.extension_no,
    };
    await APIServices.updateProfile(
      isData?.id,
      body,
      response => {
        if (response.status == 200) {
          setLoading({text: '', loading: false});
          Toast.show({
            type: 'success',
            text1: 'Profile Updated Successfully!',
          });
          getProfileData();
          setEnabled(false);
        } else {
          setLoading({text: '', loading: false});
          Toast.show({
            type: 'error',
            text1: 'Profile Update Failed!',
          });
        }
      },
      error => {
        const errorresponse = error.toString();
        setLoading({text: '', loading: false});
        Toast.show({
          type: 'error',
          text1: 'Profile Update Failed!',
        });
      },
    );
  };

  const onEditClick = () => {
    Alert.alert(
      'Profile Update',
      'Please contact helpdesk for any modifications on your profile.',
      [{text: 'OK', onPress: () => {}}],
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: color.background}}>
        <Headerview
          showHeader
          title="Profile"
          onMenuClick={() => {
            navigation.openDrawer();
          }}
        />
        <View style={{flex: 1}}>
          <View style={{marginTop: -80}}>
            <View>
              {isDataAvailable ? (
                <ScrollView
                  style={{}}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}>
                  <View
                    style={{
                      backgroundColor: materialColor.onSecondary,
                      borderRadius: 10,
                      padding: 20,
                      margin: 20,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          //setEnabled(true);
                          onEditClick();
                        }}>
                        <Feather
                          name={'edit'}
                          size={25}
                          color={Colors.orange_295CBF}
                          style={{padding: 10}}
                        />
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        borderRadius:
                          Math.round(
                            Dimensions.get('window').width +
                              Dimensions.get('window').height,
                          ) / 2,
                        width: Dimensions.get('window').width * 0.5,
                        height: Dimensions.get('window').width * 0.5,
                        borderWidth: 2,
                        borderColor: color.primary,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: 60,
                      }}>
                      <Image
                        source={{
                          uri: isData?.customer_documents?.customer_pic_preview,
                        }}
                        style={{
                          borderRadius:
                            Math.round(
                              Dimensions.get('window').width +
                                Dimensions.get('window').height,
                            ) / 2,
                          width: Dimensions.get('window').width * 0.45,
                          height: Dimensions.get('window').width * 0.45,
                        }}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                      }}>
                      <FormFieldInput
                        title={'First Name'}
                        formKey={'first_name'}
                        isMandatory={false}
                        showInputField
                        isEnabled={false}
                        length={20}
                        value={
                          enabled ? formValues.first_name : isData?.first_name
                        }
                        handleFormValueChange={handleFormValueChange}
                      />

                      <FormFieldInput
                        title={'Last Name'}
                        formKey={'last_name'}
                        isMandatory={false}
                        showInputField
                        isEnabled={false}
                        length={20}
                        value={
                          enabled ? formValues.last_name : isData?.last_name
                        }
                        handleFormValueChange={handleFormValueChange}
                      />

                      <FormFieldInput
                        title={'Mobile Number'}
                        formKey={'register_mobile'}
                        isMandatory={false}
                        showInputField
                        isEnabled={false}
                        keyboardType={'numeric'}
                        length={20}
                        value={
                          enabled
                            ? formValues.register_mobile
                            : isData?.register_mobile
                        }
                        handleFormValueChange={handleFormValueChange}
                      />

                      <FormFieldInput
                        title={'Email ID'}
                        formKey={'registered_email'}
                        isMandatory={false}
                        showInputField
                        isEnabled={false}
                        length={30}
                        value={
                          enabled
                            ? formValues.registered_email
                            : isData?.registered_email
                        }
                        handleFormValueChange={handleFormValueChange}
                      />
                      {/* <View style={{flex: 2, flexDirection: 'row'}}>
                        <View style={{flex: 1}}>
                          <FormFieldInput
                            title={'H.No'}
                            formKey={'house_no'}
                            isMandatory={true}
                            showInputField
                            isEnabled={enabled}
                            value={
                              enabled
                                ? formValues.house_no
                                : isData?.address?.house_no
                            }
                            handleFormValueChange={handleFormValueChange}
                          />
                        </View>
                        <View style={{flex: 1}}>
                          <FormFieldInput
                            title={'Street'}
                            formKey={'street'}
                            isMandatory={true}
                            showInputField
                            isEnabled={enabled}
                            value={
                              enabled
                                ? formValues.street
                                : isData?.address?.street
                            }
                            handleFormValueChange={handleFormValueChange}
                          />
                        </View>
                      </View>
                      <View style={{flex: 2, flexDirection: 'row'}}>
                        <View style={{flex: 1}}>
                          <FormFieldInput
                            title={'Landmark'}
                            formKey={'landmark'}
                            isMandatory={true}
                            showInputField
                            isEnabled={enabled}
                            value={
                              enabled
                                ? formValues.landmark
                                : isData?.address?.landmark
                            }
                            handleFormValueChange={handleFormValueChange}
                          />
                        </View>
                        <View style={{flex: 1}}>
                          <FormFieldInput
                            title={'City'}
                            formKey={'city'}
                            isMandatory={true}
                            showInputField
                            isEnabled={enabled}
                            value={
                              enabled ? formValues.city : isData?.address?.city
                            }
                            handleFormValueChange={handleFormValueChange}
                          />
                        </View>
                      </View>
                      <View style={{flex: 2, flexDirection: 'row'}}>
                        <View style={{flex: 1}}>
                          <FormFieldInput
                            title={'District'}
                            formKey={'district'}
                            isMandatory={true}
                            showInputField
                            isEnabled={enabled}
                            value={
                              enabled
                                ? formValues.district
                                : isData?.address?.district
                            }
                            handleFormValueChange={handleFormValueChange}
                          />
                        </View>
                        <View style={{flex: 1}}>
                          <FormFieldInput
                            title={'State'}
                            formKey={'state'}
                            isMandatory={true}
                            showInputField
                            isEnabled={enabled}
                            value={
                              enabled
                                ? formValues.state
                                : isData?.address?.state
                            }
                            handleFormValueChange={handleFormValueChange}
                          />
                        </View>
                      </View>
                      <View style={{flex: 2, flexDirection: 'row'}}>
                        <View style={{flex: 1}}>
                          <FormFieldInput
                            title={'Pincode'}
                            formKey={'pincode'}
                            isMandatory={true}
                            showInputField
                            isEnabled={enabled}
                            keyboardType={'numeric'}
                            value={
                              enabled
                                ? formValues.pincode
                                : isData?.address?.pincode
                            }
                            handleFormValueChange={handleFormValueChange}
                          />
                        </View>
                        <View style={{flex: 1}}>
                          <FormFieldInput
                            title={'Country'}
                            formKey={'country'}
                            isMandatory={true}
                            showInputField
                            isEnabled={enabled}
                            value={
                              enabled
                                ? formValues.country
                                : isData?.address?.country
                            }
                            handleFormValueChange={handleFormValueChange}
                          />
                        </View>
                      </View> */}
                      {/* {enabled && (
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            padding: 10,
                          }}>
                          <View style={{alignSelf: 'flex-end', marginTop: 20}}>
                            <TouchableOpacity
                              onPress={() => {
                                setEnabled(false);
                              }}
                              style={{
                                backgroundColor: '#ffffff',
                                borderColor: Colors.color_5E0F8B,
                                borderRadius: 10,
                                borderWidth: 1,
                              }}>
                              <View
                                style={{
                                  flexDirection: 'column',
                                  padding: 7,
                                  width: 100,
                                }}>
                                <Text
                                  style={{
                                    fontFamily: 'Titillium-Semibold',
                                    color: Colors.black,
                                    fontSize: 14,
                                    alignSelf: 'center',
                                  }}>
                                  Cancel
                                </Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                          <View
                            style={{alignSelf: 'flex-start', marginTop: 20}}>
                            <TouchableOpacity
                              onPress={() => {
                                updateCustomerProfile();
                              }}
                              style={{
                                backgroundColor: Colors.color_5E0F8B,
                                borderRadius: 10,
                              }}>
                              <View
                                style={{
                                  flexDirection: 'column',
                                  padding: 7,
                                  width: 110,
                                }}>
                                <Text
                                  style={{
                                    fontFamily: 'Titillium-Semibold',
                                    color: '#ffffff',
                                    fontSize: 14,
                                    alignSelf: 'center',
                                  }}>
                                  Save
                                </Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                        </View>
                      )} */}
                    </View>
                  </View>
                </ScrollView>
              ) : (
                <View style={{height: '100%'}}>
                  {!isLoading.loading && <NoData />}
                </View>
              )}
            </View>
          </View>
        </View>
        <CustomTabNav active={'Profile'} />
      </View>
      <DialogView
        showLoadingDialog
        visible={isLoading.loading}
        text={isLoading.text}></DialogView>
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

function mapStateToProps(state, props) {
  return {
    user: state.mainReducers.main.user,
  };
}

export default connect(mapStateToProps)(DashBoard);
