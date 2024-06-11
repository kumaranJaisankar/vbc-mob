import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Switch,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {Colors} from '../../commoncomponents/Colors';
import {strings} from '../../strings/i18n';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import DialogView from '../../commoncomponents/DialogView';
import {
  TextInput,
  Checkbox,
  RadioButton,
  useTheme as useMDtheme,
} from 'react-native-paper';

import RBSheet from 'react-native-raw-bottom-sheet';
import Camera from '../../commoncomponents/Camera';
import styles from './styles';
import {showMessage} from 'react-native-flash-message';
import {useNavigation, useTheme} from '@react-navigation/native';

import Toast from 'react-native-toast-message';
import {connect} from 'react-redux';
import HeaderView1 from '../../commoncomponents/HeaderView1';
import FormFieldInput from '../KYC_Form/FormFields/KYC_FormField1';
import {formData} from '../../commoncomponents/formData';
import APIServices from '../../apiwebservices/APIServices';
import {
  getDocumentsListData,
  updateDocumentsListData,
} from '../../apiwebservices/APIRequestQueryCreator';
const DocumentList = props => {
  const color = useTheme().colors;
  const materialColor = useMDtheme().colors;
  console.log(props?.planData?.customer_id, 'props?.basicData');
  const navigation = useNavigation();
  const [text, setText] = React.useState('');
  const [isLoading, setLoading] = React.useState({text: '', visible: false});
  const [isEnabled, setIsEnabled] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [idType, setIdType] = useState('Aadhar_Card_No');
  const [newDocuments, setNewDocuments] = useState({});
  const [documentID, setDocumentID] = useState('');
  const [showSuccessfulAlertDialog, setShowSuccessfulAlertDialog] =
    React.useState(false);

  const [isRenewRecent, setRenewRecent] = React.useState({
    text: '',
    visible: false,
  });
  const [isError, setError] = React.useState({
    text: '',
    visible: false,
  });
  const [card, setCard] = React.useState('adharCard');
  var data = {
    Aadhar_Card_No: '',
    pan_card: '',
  };

  const [isFocus, setIsFocus] = React.useState(false);

  const [requiredMsg, setRequiredMsg] = React.useState({});
  const [permanentAddreessChecked, setpermanentAddreessChecked] =
    React.useState(false);
  const [isProfilePicUri, setProfilePicUri] = React.useState(
    props?.basicData?.customer_documents?.customer_pic_preview
      ? props?.basicData?.customer_documents?.customer_pic_preview
      : '',
  );
  const profilePicRBSheet = useRef();
  const signTermsRBSheet = useRef();
  const paymentMethodRBSheet = useRef();
  const [isCameraClick, setCamerClick] = React.useState('');

  const [isAddressProofUri, setAddressProofUri] = React.useState(
    props?.basicData?.customer_documents?.address_proof_preview
      ? props?.basicData?.customer_documents?.address_proof_preview
      : '',
  );
  const [isIDProofUri, setIDProofUri] = React.useState(
    props?.basicData?.customer_documents?.id_proof_preview
      ? props?.basicData?.customer_documents?.id_proof_preview
      : '',
  );
  const [isSignatureProofUri, setSignatureProofUri] = React.useState(
    props?.basicData?.customer_documents?.signature_preview
      ? props?.basicData?.customer_documents?.signature_preview
      : '',
  );
  const [isSignatureDisplay, setSignatureDisplay] = React.useState(false);
  const [checked, setChecked] = React.useState('phone');

  const [isChecked, setIsChecked] = React.useState(false);
  const [formValues, handleFormValueChange, setFormValues] = formData(data);

  useEffect(() => {
    getDocumentList();
  }, []);
  useEffect(() => {
    console.log(isSignatureProofUri, 'isSignatureProofUri');
  }, [isSignatureProofUri]);
  const getDocumentList = async () => {
    await APIServices.getDocumentsListData(
      props?.planData?.customer_id,
      response => {
        console.log('res', response);
        if (response.status == 200) {
          console.log(response?.data?.signature_preview);
          setFormValues({
            ...formValues,
            Aadhar_Card_No: response?.data?.Aadhar_Card_No
              ? response?.data?.Aadhar_Card_No
              : '',
            pan_card: response?.data?.pan_card ? response?.data?.pan_card : '',
          });
          setSignatureProofUri(response?.data?.signature_preview);
          setAddressProofUri(response?.data?.address_proof_preview);
          setProfilePicUri(response?.data?.customer_pic_preview);
          setIDProofUri(response?.data?.id_proof_preview);
          setDocumentID(response?.data?.id);
        } else {
          console.log('else');
        }
      },
      error => {
        console.log(error);
      },
    );
  };
  const profilePicclicked = () => {
    setCamerClick('profilePic');
    profilePicRBSheet.current.open();
  };

  const receiptUpClicked = () => {
    setCamerClick('receipt');
    profilePicRBSheet.current.open();
  };

  const nextNav = () => {
    navigation.navigate('NewDashboard');
  };

  const handleUpdate = async () => {
    console.log(formValues, 'formValues');
    console.log(formValues.Aadhar_Card_No, 'formValues.Aadhar_Card_No');
    if (formValues.Aadhar_Card_No && formValues.Aadhar_Card_No.trim() !== '') {
      let valid = validateAadharCard(formValues.Aadhar_Card_No);
      console.log(valid, 'valid or not aadhar');
      if (!valid) {
        setRenewRecent({text: 'AAdhar entered are not valid', visible: true});
        return;
      }
    }
    if (formValues.pan_card && formValues.pan_card.trim() !== '') {
      let valid = validatePanCard(formValues.pan_card);
      console.log(valid, 'valid or not');
      if (!valid) {
        setRenewRecent({text: 'PAN entered is not valid', visible: true});
        return;
      }
    }

    let data = {...newDocuments};
    data.id = documentID;
    data.Aadhar_Card_No = formValues.Aadhar_Card_No
      ? formValues.Aadhar_Card_No
      : '';
    data.pan_card = formValues.pan_card ? formValues.pan_card : '';
    console.log(data, 'data');
    let customerId = props?.planData?.customer_id;
    console.log(customerId, 'customerId');
    await APIServices.updateDocumentsListData(
      customerId,
      data,
      response => {
        console.log(response, 'update Response');
        if (response.status == 200) {
          setLoading({text: '', loading: false});
          navigation.navigate('NewDashboard');
          Toast.show({
            type: 'success',
            text1: 'Documents Updated Successfully!',
          });
        } else {
          setLoading({text: '', loading: false});
          Toast.show({
            type: 'error',
            text1: 'Documents Update Failed!',
          });
        }
      },
      error => {
        const errorresponse = error.toString();
        setLoading({text: '', loading: false});
        Toast.show({
          type: 'error',
          text1: 'Documents Update Failed!',
        });
      },
    );
  };

  const signProofclicked = () => {
    setCamerClick('signProof');
    signTermsRBSheet.current.open();
  };

  const addressProofclicked = () => {
    setCamerClick('addressProof');
    profilePicRBSheet.current.open();
  };

  const idProofclicked = () => {
    setCamerClick('idProof');
    profilePicRBSheet.current.open();
  };

  const onCameraClicked = async () => {
    const hasPermission = await requestCameraPermission();
    if (hasPermission) {
      await Camera.openCameraPanel(
        isCameraClick,
        imageResponse => {
          console.log(imageResponse, 'imageResponse');
          profilePicRBSheet.current.close();
          if (imageResponse.picStatus == 'signProof') {
            setSignatureProofUri(
              'data:image/png;base64,' + imageResponse.imageData.data,
            );
          } else if (imageResponse.picStatus == 'addressProof') {
            setAddressProofUri(
              'data:image/png;base64,' + imageResponse.imageData.data,
            );
            setNewDocuments(prev => ({
              ...prev,
              address_proof_preview:
                'data:image/png;base64,' + imageResponse.imageData.data,
              address_proof:
                'data:image/png;base64,' + imageResponse.imageData.data,
            }));
          } else if (imageResponse.picStatus == 'profilePic') {
            setProfilePicUri(
              'data:image/png;base64,' + imageResponse.imageData.data,
            );
            setNewDocuments(prev => ({
              ...prev,
              customer_pic_preview:
                'data:image/png;base64,' + imageResponse.imageData.data,
              customer_pic:
                'data:image/png;base64,' + imageResponse.imageData.data,
            }));
          } else if (imageResponse.picStatus == 'idProof') {
            setIDProofUri(
              'data:image/png;base64,' + imageResponse.imageData.data,
            );
            setNewDocuments(prev => ({
              ...prev,
              id_proof_preview:
                'data:image/png;base64,' + imageResponse.imageData.data,
              identity_proof:
                'data:image/png;base64,' + imageResponse.imageData.data,
            }));
          } else if (imageResponse.picStatus == 'receipt') {
            setReceipt('data:image/png;base64,' + imageResponse.imageData.data);
          }
        },
        error => {
          const errorresponse = error.toString();
        },
      );
    }
  };

  const onGalleryClicked = async () => {
    await Camera.openGallery(
      isCameraClick,
      imageResponse => {
        profilePicRBSheet.current.close();
        if (imageResponse.picStatus == 'signProof') {
          setSignatureProofUri(
            'data:image/png;base64,' + imageResponse.imageData.data,
          );
        } else if (imageResponse.picStatus == 'addressProof') {
          setAddressProofUri(
            'data:image/png;base64,' + imageResponse.imageData.data,
          );
          setNewDocuments(prev => ({
            ...prev,
            address_proof_preview:
              'data:image/png;base64,' + imageResponse.imageData.data,
            address_proof:
              'data:image/png;base64,' + imageResponse.imageData.data,
          }));
        } else if (imageResponse.picStatus == 'profilePic') {
          setProfilePicUri(
            'data:image/png;base64,' + imageResponse.imageData.data,
          );
          setNewDocuments(prev => ({
            ...prev,
            customer_pic_preview:
              'data:image/png;base64,' + imageResponse.imageData.data,
            customer_pic:
              'data:image/png;base64,' + imageResponse.imageData.data,
          }));
        } else if (imageResponse.picStatus == 'idProof') {
          setIDProofUri(
            'data:image/png;base64,' + imageResponse.imageData.data,
          );
          setNewDocuments(prev => ({
            ...prev,
            id_proof_preview:
              'data:image/png;base64,' + imageResponse.imageData.data,
            identity_proof:
              'data:image/png;base64,' + imageResponse.imageData.data,
          }));
        } else if (imageResponse.picStatus == 'receipt') {
          setReceipt('data:image/png;base64,' + imageResponse.imageData.data);
        }
      },
      error => {
        const errorresponse = error.toString();
      },
    );
  };

  // const [validationStatus, setValidationStatus] = useState({
  //   pan_card: true,
  //   Aadhar_Card_No: true,
  // });

  // const handleValidationChange = (formKey, isValid) => {
  //   setValidationStatus((prevStatus) => ({
  //     ...prevStatus,
  //     [formKey]: isValid,
  //   }));
  // };
  const validatePanCard = panCard => {
    const panRegex = /^[A-Z]{5}\d{4}[A-Z]{1}$/;
    return panRegex.test(panCard);
  };

  // Aadhar card should have 12 digits
  const validateAadharCard = aadharCard => {
    const aadharRegex = /^\d{12}$/;
    return aadharRegex.test(aadharCard);
  };

  // Request camera permission
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app requires access to your camera to take photos.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (error) {
        console.warn('Failed to request camera permission:', error);
        return false;
      }
    }
    return true; // iOS does not require explicit permission handling
  };

  // Request read storage permission for SDK 33 and above
  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES, // For SDK 33+
          {
            title: 'Storage Permission',
            message: 'This app requires access to your storage to view images.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (error) {
        console.warn('Failed to request storage permission:', error);
        return false;
      }
    }
    return true;
  };

  // mac address format

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: color.background}}>
        <HeaderView1
          showHeader
          // showRefreshIcon
          title="Documents"
          onMenuClick={() => {
            navigation.openDrawer();
          }}
          // onRefreshClicked={() => {
          //   getInvoiceHistoryData(true);
          // }}
        />
        <View style={{flex: 1}}>
          <View style={{marginTop: -80}}>
            <View
              style={{
                backgroundColor: materialColor.onSecondary,
                borderRadius: 10,
                padding: 20,
                margin: 20,
              }}>
              <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                <ScrollView>
                  <View>
                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                          }}>
                          <RadioButton
                            value="Aadhar_Card_No"
                            status={
                              idType === 'Aadhar_Card_No'
                                ? 'checked'
                                : 'unchecked'
                            }
                            onPress={() => {
                              setIdType('Aadhar_Card_No');
                              // getCustomerUpgradePlanDataaadhar_no();
                            }}
                          />
                          <Text
                            style={{
                              fontFamily: 'Titillium-Semibold',
                              color: color.text,
                              fontSize: 16,
                              // marginRight: 10,
                              marginTop: 5,
                            }}>
                            Aadhar
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                          }}>
                          <RadioButton
                            value="pan_card"
                            status={
                              idType === 'pan_card' ? 'checked' : 'unchecked'
                            }
                            onPress={() => {
                              setIdType('pan_card');
                              // getCustomerUpgradePlanDataDays();
                            }}
                          />
                          <Text
                            style={{
                              fontFamily: 'Titillium-Semibold',
                              color: color.text,
                              fontSize: 16,
                              // marginRight: 10,
                              marginTop: 5,
                            }}>
                            Pan Card
                          </Text>
                        </View>
                      </View>
                      {idType === 'Aadhar_Card_No' ? (
                        <FormFieldInput
                          title={'Aadhar Card No. *'}
                          formKey={'Aadhar_Card_No'}
                          isMandatory={true}
                          showInputField
                          isEnabled={true}
                          length={12}
                          keyboardType={'numeric'}
                          value={formValues.Aadhar_Card_No}
                          handleFormValueChange={handleFormValueChange}
                          validationFunction={validateAadharCard}
                        />
                      ) : (
                        <FormFieldInput
                          title={'PAN Card*'}
                          formKey={'pan_card'}
                          isMandatory={true}
                          showInputField
                          isEnabled={true}
                          length={10}
                          value={formValues.pan_card}
                          handleFormValueChange={handleFormValueChange}
                          validationFunction={validatePanCard}
                        />
                      )}
                      {/* <Text
                        style={{
                          color: Colors.orange_295CBF,
                          fontSize: 15,
                          fontFamily: 'Titillium-Semibold',
                          padding: 10,
                        }}>
                        Signature
                      </Text> */}
                      {/* <View
                        style={{
                          flex: 1,
                          flexDirection: 'column',
                          backgroundColor: Colors.white,
                          alignItems: 'center',
                          marginTop: 10,
                        }}>
                        <Image
                          source={{uri: isSignatureProofUri}}
                          style={{
                            width: 250,
                            height: 150,
                            borderRadius: 5,
                            borderColor: Colors.grey_D0D0D0,
                            resizeMode: 'contain',
                          }}
                        />
                      </View> */}
                      <Text
                        style={{
                          color: Colors.orange_295CBF,
                          fontSize: 15,
                          fontFamily: 'Titillium-Semibold',
                          padding: 10,
                        }}>
                        Profile Picture *
                      </Text>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'column',
                          backgroundColor: materialColor.onSecondary,
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            height: 200,
                            width: '70%',
                            margin: 10,
                            borderStyle: 'dashed',
                            borderRadius: 2,
                            borderWidth: 3,
                            borderColor: Colors.grey_D0D0D0,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 10,
                          }}>
                          {isProfilePicUri.length <= 0 && (
                            <View style={{alignItems: 'center'}}>
                              <Image
                                source={require('../../assets/images/docicon1.png')}></Image>
                              <Text
                                style={{
                                  color: Colors.grey_D0D0D0,
                                  fontSize: 14,
                                  fontFamily: 'Titillium-Semibold',
                                  padding: 10,
                                }}>
                                Profile Picture *
                              </Text>
                            </View>
                          )}

                          {isProfilePicUri.length > 0 && (
                            <Image
                              source={{uri: isProfilePicUri}}
                              style={{width: 200, height: 200, borderRadius: 5}}
                            />
                          )}
                        </View>

                        <TouchableOpacity
                          onPress={profilePicclicked}
                          style={{
                            marginTop: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '40%',
                            backgroundColor: '#FFCAAD',
                            padding: 5,
                            borderRadius: 5,
                            height: 40,
                            padding: 5,
                          }}>
                          <Text
                            style={{
                              color: Colors.black,
                              fontSize: 16,
                              fontFamily: 'Titillium-Semibold',
                            }}>
                            Upload
                          </Text>
                        </TouchableOpacity>
                      </View>

                      <Text
                        style={{
                          color: Colors.orange_295CBF,
                          fontSize: 15,
                          fontFamily: 'Titillium-Semibold',
                          padding: 10,
                        }}>
                        ID Proof
                      </Text>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'column',
                          backgroundColor: materialColor.onSecondary,
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            height: 250,
                            width: '70%',
                            margin: 10,
                            borderStyle: 'dashed',
                            borderRadius: 2,
                            borderWidth: 3,
                            borderColor: Colors.grey_D0D0D0,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 20,
                          }}>
                          {isIDProofUri.length <= 0 && (
                            <View style={{alignItems: 'center'}}>
                              <Image
                                source={require('../../assets/images/docicon1.png')}></Image>
                              <Text
                                style={{
                                  color: Colors.grey_D0D0D0,
                                  fontSize: 14,
                                  fontFamily: 'Titillium-Semibold',
                                  padding: 10,
                                }}>
                                Add ID Proof
                              </Text>
                            </View>
                          )}
                          {isIDProofUri.length > 0 && (
                            <Image
                              source={{uri: isIDProofUri}}
                              style={{
                                width: 200,
                                height: 200,
                                borderRadius: 5,
                                resizeMode: 'contain',
                              }}
                            />
                          )}
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 20,
                            marginHorizontal: 20,
                          }}>
                          <TouchableOpacity
                            onPress={idProofclicked}
                            style={{
                              marginTop: 10,
                              justifyContent: 'center',
                              alignItems: 'center',
                              width: '40%',
                              backgroundColor: '#FFCAAD',
                              padding: 5,
                              borderRadius: 5,
                              height: 40,
                              padding: 5,
                            }}>
                            <Text
                              style={{
                                color: Colors.black,
                                fontSize: 16,
                                fontFamily: 'Titillium-Semibold',
                              }}>
                              Upload
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>

                      <Text
                        style={{
                          color: Colors.orange_295CBF,
                          fontSize: 15,
                          fontFamily: 'Titillium-Semibold',
                          padding: 10,
                        }}>
                        {strings('KYC_Form.AddressProof')}
                      </Text>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'column',
                          backgroundColor: materialColor.onSecondary,
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            height: 250,
                            width: '70%',
                            margin: 10,
                            borderStyle: 'dashed',
                            borderRadius: 2,
                            borderWidth: 3,
                            borderColor: Colors.grey_D0D0D0,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 20,
                          }}>
                          {isAddressProofUri.length <= 0 && (
                            <View style={{alignItems: 'center'}}>
                              <Image
                                source={require('../../assets/images/docicon1.png')}></Image>
                              <Text
                                style={{
                                  color: Colors.grey_D0D0D0,
                                  fontSize: 14,
                                  fontFamily: 'Titillium-Semibold',
                                  padding: 10,
                                }}>
                                Add Address Proof
                              </Text>
                            </View>
                          )}

                          {isAddressProofUri.length > 0 && (
                            <Image
                              source={{uri: isAddressProofUri}}
                              style={{width: 200, height: 200, borderRadius: 5}}
                            />
                          )}
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 20,
                            marginHorizontal: 20,
                          }}>
                          <TouchableOpacity
                            onPress={addressProofclicked}
                            style={{
                              marginTop: 10,
                              justifyContent: 'center',
                              alignItems: 'center',
                              width: '40%',
                              backgroundColor: '#FFCAAD',
                              padding: 5,
                              borderRadius: 5,
                              height: 40,
                              padding: 5,
                            }}>
                            <Text
                              style={{
                                color: Colors.black,
                                fontSize: 16,
                                fontFamily: 'Titillium-Semibold',
                              }}>
                              Upload
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>

                      <Text
                        style={{
                          color: Colors.orange_295CBF,
                          fontSize: 15,
                          fontFamily: 'Titillium-Semibold',
                          padding: 10,
                        }}>
                        Signature
                      </Text>

                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'column',
                          backgroundColor: materialColor.onSecondary,
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            height: 250,
                            width: '90%',
                            margin: 10,
                            borderStyle: 'dashed',
                            borderRadius: 2,
                            borderWidth: 3,
                            borderColor: Colors.grey_D0D0D0,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 20,
                          }}>
                          {isSignatureProofUri.length <= 0 && (
                            <View style={{alignItems: 'center'}}>
                              <Image
                                source={require('../../assets/images/docicon1.png')}></Image>
                              <Text
                                style={{
                                  color: Colors.grey_D0D0D0,
                                  fontSize: 14,
                                  fontFamily: 'Titillium-Semibold',
                                  padding: 10,
                                }}>
                                Add Signature
                              </Text>
                            </View>
                          )}

                          {isSignatureProofUri.length > 0 && (
                            <Image
                              source={{uri: isSignatureProofUri}}
                              style={{
                                width: 200,
                                height: 200,
                                borderRadius: 5,
                                resizeMode: 'contain',
                              }}
                            />
                          )}
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 20,
                            marginHorizontal: 20,
                          }}>
                          <TouchableOpacity
                            onPress={signProofclicked}
                            style={{
                              marginTop: 10,
                              justifyContent: 'center',
                              alignItems: 'center',
                              width: '40%',
                              backgroundColor: '#FFCAAD',
                              padding: 5,
                              borderRadius: 5,
                              height: 40,
                              padding: 5,
                            }}>
                            <Text
                              style={{
                                color: Colors.black,
                                fontSize: 16,
                                fontFamily: 'Titillium-Semibold',
                              }}>
                              Signature
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                </ScrollView>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            height: 60,
            backgroundColor: materialColor.onSecondary,
            //shadowRadius: 2,
            margin: 1,
            // shadowOffset: {
            //   width: 0,
            //   height: -1,
            // },
            // shadowColor: '#000000',
            //elevation: 4,
            marginTop: 15,
          }}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
            <TouchableOpacity style={{flex: 0.5, height: 40}} onPress={nextNav}>
              <Text
                style={{
                  flex: 1,
                  fontFamily: 'Titillium-Semibold',
                  color: color.text,
                  fontSize: 14,
                  textAlign: 'center',
                  backgroundColor: materialColor.onSecondary,
                  borderRadius: 10,
                  padding: 10,
                  borderColor: '#DC631F',
                  borderWidth: 1,
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{flex: 0.5, height: 40}}
              onPress={handleUpdate}>
              <Text
                style={{
                  flex: 1,
                  marginLeft: 10,
                  fontFamily: 'Titillium-Semibold',
                  color: '#ffffff',
                  fontSize: 14,
                  textAlign: 'center',
                  backgroundColor: '#DC631F',
                  borderRadius: 10,
                  padding: 10,
                  borderColor: '#DC631F',
                  borderWidth: 1,
                }}>
                Update
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <RBSheet
          ref={profilePicRBSheet}
          height={180}
          closeOnDragDown={true}
          closeOnPressMask={false}
          customStyles={{
            wrapper: {
              backgroundColor: 'transparent',
            },
            draggableIcon: {
              backgroundColor: '#000',
            },
          }}>
          <View
            style={{
              padding: 10,
              flexDirection: 'column',
              backgroundColor: Colors.grey_D0D0D0,
            }}>
            <TouchableOpacity
              style={{alignItems: 'flex-end'}}
              onPress={() => profilePicRBSheet.current.close()}>
              <Text style={styles.textStyle_close_attachment}>
                {strings('KYC_Form.Close')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={onCameraClicked}>
              <Image
                source={require('../../assets/images/camera_icon.png')}
                style={{width: 30, height: 30}}></Image>
              <Text style={[styles.textStyle_attachment, {marginLeft: 10}]}>
                {strings('KYC_Form.Camera')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
              }}
              onPress={onGalleryClicked}>
              <Image
                source={require('../../assets/images/gallery_icon1.png')}
                style={{width: 30, height: 30}}></Image>
              <Text style={[styles.textStyle_attachment, {marginLeft: 10}]}>
                {strings('KYC_Form.Gallery')}
              </Text>
            </TouchableOpacity>
          </View>
        </RBSheet>
        <RBSheet
          ref={signTermsRBSheet}
          height={600}
          closeOnDragDown={true}
          closeOnPressMask={false}
          customStyles={{
            wrapper: {
              backgroundColor: 'transparent',
            },
            container: {
              borderRadius: 20,
              backgroundColor: '#ffffff',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: -20,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
              elevation: 20,
            },
            draggableIcon: {
              backgroundColor: '#000',
            },
          }}>
          <View style={{flex: 3, marginVertical: 20}}>
            <View
              style={{flex: 2, flexDirection: 'row', paddingHorizontal: 20}}>
              <ScrollView
                showsVerticalScrollIndicator={true}
                persistentScrollbar={true}>
                <TouchableOpacity activeOpacity={1}>
                  <Text
                    style={[
                      styles.textStyle,
                      {marginTop: 10},
                      {fontWeight: 'bold'},
                    ]}>
                    By accessing or using the Service you agree to be bound by
                    these Terms. If you disagree with any part of the terms then
                    you may not access the Service.
                  </Text>
                  <Text
                    style={[
                      styles.textStyle,
                      {marginTop: 10},
                      {fontWeight: 'bold'},
                    ]}>
                    1. Changes
                  </Text>
                  <Text style={[styles.normalTextStyle, {marginTop: 5}]}>
                    We reserve the right, at our sole discretion, to modify or
                    replace these Terms at any time. If a revision is material
                    we will try to provide at least 30 (change this)​ day's
                    notice prior to any new terms taking effect. What
                    constitutes a material change will be determined at our sole
                    discretion.
                  </Text>
                  <Text
                    style={[
                      styles.textStyle,
                      {marginTop: 10},
                      {fontWeight: 'bold'},
                    ]}>
                    2.Purchases
                  </Text>
                  <Text style={[styles.normalTextStyle, {marginTop: 5}]}>
                    If you wish to purchase any product or service made
                    available through the Service ("Purchase"), you may be asked
                    to supply certain information relevant to your Purchase
                    including, without limitation
                  </Text>
                  <Text
                    style={[
                      styles.textStyle,
                      {marginTop: 10},
                      {fontWeight: 'bold'},
                    ]}>
                    3.Contact Us
                  </Text>
                  <Text style={[styles.normalTextStyle, {marginTop: 5}]}>
                    If you have any questions about these Terms, please contact
                    us.
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Checkbox
                color={Colors.black}
                status={isChecked ? 'checked' : 'unchecked'}
                onPress={() => {
                  setIsChecked(!isChecked);
                }}
              />
              <Text
                style={{
                  color: Colors.black,
                  fontSize: 15,
                  fontFamily: 'Titillium-Semibold',
                }}>
                I have read and agree to the Terms and Conditions
              </Text>
            </View>
            <View style={{alignSelf: 'center', marginTop: 15}}>
              <TouchableOpacity
                onPress={() => {
                  if (isChecked) {
                    signTermsRBSheet.current.close();
                    setSignatureDisplay(true);
                  }
                }}
                style={{
                  backgroundColor: Colors.orange_295CBF,
                  borderRadius: 20,
                }}>
                <View style={{flexDirection: 'column', padding: 7, width: 120}}>
                  <Text style={styles.button_text_style}>Accept</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </RBSheet>

        <DialogView
          showAlertDialog
          visible={isError.visible}
          text={isError.text}
          onConfirm={() => {
            setError({text: '', visible: false});
          }}
          textConfirm={'Okay'}></DialogView>

        <DialogView
          showAlertDialog
          visible={isRenewRecent.visible}
          text={isRenewRecent.text}
          // onCancel={() => {
          //   setRenewRecent({text: '', visible: false});
          // }}
          // textCancel={'No'}
          onConfirm={() => {
            setRenewRecent({text: '', visible: false});
          }}
          textConfirm={'Okay'}></DialogView>
        <DialogView
          showSignatureDialog
          visible={isSignatureDisplay}
          onCancel={() => {
            setSignatureDisplay(false);
          }}
          onSignatureCapture={result => {
            setSignatureProofUri('data:image/png;base64,' + result);
            setNewDocuments(prev => ({
              ...prev,
              signature: 'data:image/png;base64,' + result,
              signature_preview: 'data:image/png;base64,' + result,
            }));
            setSignatureDisplay(false);
          }}></DialogView>
        <DialogView
          showLoadingDialog
          visible={isLoading.visible}
          text={isLoading.text}></DialogView>
        {modalVisible && (
          <HeaderView1
            showSideMenu
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};
function mapStateToProps(state, props) {
  return {
    userInfo: state.mainReducers.main.userInfo,
  };
}

export default DocumentList;
// export default KYC_Add_Update;
