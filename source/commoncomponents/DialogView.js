import React, {createRef} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../commoncomponents/Colors';
import {strings} from '../strings/i18n';
import {Dialog, DialogContent, SlideAnimation} from 'react-native-popup-dialog';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Headerview from '../commoncomponents/HeaderView';
import SignatureCapture from 'react-native-signature-capture';
import {useTheme} from '@react-navigation/native';
import {useTheme as useMdtheme} from 'react-native-paper';

const DialogView = props => {
  const color = useTheme().colors;
  const materialColor = useMdtheme().colors;
  const sign = createRef();

  const saveSign = () => {
    sign.current.saveImage();
    setTimeout(() => {
      props.onSignatureCapture();
    }, 300);
  };

  const onSignatureReset = () => {
    sign.current.resetImage();
  };

  // const _onSaveEvent = result => {
  //   //result.encoded - for the base64 encoded png
  //   //result.pathName - for the file path name
  //   //alert('Signature Captured Successfully');
  //   console.log(result);
  // };
  const _onSaveEvent = result => {
    setTimeout(() => {
      props.onSignatureCapture(result.encoded);
    }, 300);
  };

  const _onDragEvent = () => {
    // This callback will be called when the user enters signature
    //console.log('dragged');
  };

  const Dialogg = () => {
    const styles = StyleSheet.create({
      counter_text_style: {
        fontFamily: 'Titillium-Semibold',
        color: Colors.colorgradient3,
        fontSize: 50,
      },
      audio_controls_text_style: {
        fontFamily: 'Titillium-Semibold',
        color: Colors.black,
        fontSize: 20,
      },
      titletextStyle: {
        fontFamily: 'Titillium-Semibold',
        color: Colors.white,
        alignSelf: 'center',
        fontSize: 18,
        textAlign: 'center',
      },
      textStyle: {
        fontFamily: 'Titillium-Semibold',
        color: color.text,
        alignSelf: 'center',
        fontSize: 18,
        textAlign: 'center',
      },
      button_text_style: {
        fontFamily: 'Titillium-Semibold',
        color: Colors.white,
        alignSelf: 'center',
        fontSize: 18,
      },
      messag_text_style: {
        fontFamily: 'Titillium-Semibold',
        color: color.text,
        fontSize: 16,
      },
      text_style: {
        fontFamily: 'Titillium-Semibold',
        color: color.text,
        fontSize: 16,
        marginTop: 5,
      },
      status_dialog_style: {
        padding: 7,
        backgroundColor: Colors.white,
        marginHorizontal: 10,
        marginVertical: 5,
        shadowColor: Colors.black,
        shadowOpacity: 0.8,
        shadowRadius: 2,
        borderRadius: 10,
        elevation: 3,
        shadowOffset: {height: 1, width: 1},
        flexDirection: 'row',
      },
      container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
      },
      preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
      },
      signature: {
        height: 400,
        marginTop: 10,
      },
    });

    if (props.showAlertDialog) {
      return (
        <Dialog visible={props.visible} width={0.75} overlayOpacity={0.5}>
          <DialogContent style={{padding: 10, backgroundColor: color.border}}>
            <Image
              style={[
                styles.dialogIcon,
                {width: 45, height: 45, alignSelf: 'center', marginBottom: 20},
              ]}
              source={require('../assets/images/alert_icon.png')}
            />

            <Text style={styles.textStyle}>{props.text}</Text>

            <View style={{alignSelf: 'center', marginTop: 20}}>
              <TouchableOpacity
                onPress={() => props.onConfirm()}
                style={{
                  backgroundColor: color.primary,
                  borderRadius: 20,
                }}>
                <View style={{flexDirection: 'column', padding: 7, width: 120}}>
                  <Text style={styles.button_text_style}>Ok</Text>
                </View>
              </TouchableOpacity>
            </View>
          </DialogContent>
        </Dialog>
      );
    } else if (props.showLoadingDialog) {
      return (
        <Dialog visible={props.visible} width={0.75}>
          <DialogContent style={{padding: 10, backgroundColor: color.border}}>
            <ActivityIndicator size={60} color={color.primary} marginTop={10} />

            <Text style={[styles.textStyle, {marginTop: 15}]}>
              {props.text}
            </Text>
          </DialogContent>
        </Dialog>
      );
    } else if (props.showDecisionDialog) {
      return (
        <Dialog visible={props.visible} width={0.9}>
          <DialogContent
            style={{padding: 10, backgroundColor: Colors.color_e0e0e0}}>
            <Image
              style={[
                styles.dialogIcon,
                {width: 60, height: 60, alignSelf: 'center', marginBottom: 10},
              ]}
              source={require('../assets/images/alert_icon.png')}
            />

            <Text style={styles.textStyle}>{props.text}</Text>

            <View
              style={{
                alignSelf: 'center',
                marginTop: 20,
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                onPress={() => props.onCancel()}
                style={{
                  backgroundColor: Colors.color_5E0F8B,
                  borderRadius: 20,
                }}>
                <View style={{flexDirection: 'column', padding: 7, width: 100}}>
                  <Text style={styles.button_text_style}>
                    {props.textCancel}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => props.onConfirm()}
                style={{
                  backgroundColor: Colors.color_5E0F8B,
                  borderRadius: 20,
                  marginLeft: 10,
                }}>
                <View style={{flexDirection: 'column', padding: 7, width: 100}}>
                  <Text style={styles.button_text_style}>
                    {props.textConfirm}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </DialogContent>
        </Dialog>
      );
    } else if (props.showSignatureDialog) {
      return (
        <Dialog visible={props.visible} width={0.9}>
          <DialogContent
            style={{padding: 5, backgroundColor: Colors.grey_D0D0D0}}>
            <SignatureCapture
              style={styles.signature}
              ref={sign}
              onSaveEvent={_onSaveEvent}
              onDragEvent={_onDragEvent}
              showNativeButtons={false}
              showTitleLabel={false}
              backgroundColor={Colors.white}
              strokeColor={Colors.black}
              minStrokeWidth={10}
              maxStrokeWidth={10}
              viewMode={'portrait'}
            />

            <View
              style={{
                alignSelf: 'center',
                marginTop: 20,
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                onPress={() => props.onCancel()}
                style={{
                  backgroundColor: Colors.color_5E0F8B,
                  borderRadius: 20,
                }}>
                <View style={{flexDirection: 'column', padding: 7, width: 100}}>
                  <Text style={styles.button_text_style}>Cancel</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => onSignatureReset()}
                style={{
                  backgroundColor: Colors.color_5E0F8B,
                  borderRadius: 20,
                  marginLeft: 10,
                }}>
                <View style={{flexDirection: 'column', padding: 7, width: 100}}>
                  <Text style={styles.button_text_style}>Reset</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => saveSign()}
                style={{
                  backgroundColor: Colors.color_5E0F8B,
                  borderRadius: 20,
                  marginLeft: 10,
                }}>
                <View style={{flexDirection: 'column', padding: 7, width: 100}}>
                  <Text style={styles.button_text_style}>Ok</Text>
                </View>
              </TouchableOpacity>
            </View>
          </DialogContent>
        </Dialog>
      );
    }
  };

  return <Dialogg />;
};

export default DialogView;
