import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Colors} from '../../../commoncomponents/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TextInput, useTheme as useMDtheme} from 'react-native-paper';
import {useTheme} from '@react-navigation/native';

const FormField = props => {
  const color = useTheme().colors;
  const materialColor = useMDtheme().colors;
  if (props.showInput) {
    const borderStyle =
      props.isEnabled == true ? styles.textvalid : styles.textinvalid;
    return (
      <View style={{margin: 7}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {props.isMandatory == true ? (
            <AntDesign name={'star'} size={10} color={Colors.red_FF0000} />
          ) : null}
          <Text style={styles.title_style}>{props.title}</Text>
        </View>
        <TextInput
          onChange={event =>
            props.handleFormValueChange(props.formKey, event.nativeEvent.text)
          }
          value={props.value}
          multiline={true}
          maxLength={props.length}
          underlineColorAndroid="transparent"
          editable={props.isEnabled}
          keyboardType={props.keyboardType}
          style={[styles.textinput_style, borderStyle]}
          {...props.textInputProps}
        />
      </View>
    );
  }
  if (props.showInputField) {
    const isValid = props.validationFunction
      ? props.validationFunction(props.value)
      : true; // Default to true if no validation function is provided4

    const borderStyle =
      props.isEnabled == true ? styles.textvalid : styles.textinvalid;
    return (
      <View style={{margin: 8}}>
        <TextInput
          mode="outlined"
          label={props.title}
          value={props.value}
          maxLength={props.length}
          editable={props.isEnabled}
          keyboardType={props.keyboardType}
          placeholderStyle={{fontSize: 20}}
          underlineColorAndroid="transparent"
          style={{
            fontSize: 15,
            fontFamily: 'Titillium-Semibold',
            fontWeight: 'normal',
            paddingBottom: 0,
            backgroundColor: color.background,
          }}
          onChangeText={text =>
            props.handleFormValueChange(props.formKey, text)
          }
          theme={{
            colors: {
              placeholder: 'grey',
              text: 'black',
              primary: 'grey',
              underlineColor: 'transparent',
              backgroundColor: 'white',
            },
            fonts: {
              regular: {
                fontFamily: 'Titillium-Semibold',
                fontWeight: 'normal',
              },
            },
          }}
        />
        {!isValid && (
          <Text style={{color: 'red'}}>Invalid format</Text> // Validation message
        )}
      </View>
    );
  } else if (props.showDropDown) {
    const borderStyle =
      props.isEnabled == true ? styles.textvalid : styles.textinvalid;
    return (
      <View style={{margin: 8}}>
        <TouchableOpacity onPress={() => props.onDropDownClick()}>
          <TextInput
            mode="outlined"
            label={props.title}
            value={props.value}
            maxLength={props.length}
            editable={props.isEnabled}
            keyboardType={props.keyboardType}
            placeholderStyle={{fontSize: 20}}
            underlineColorAndroid="transparent"
            right={
              <TextInput.Icon
                name={() => (
                  <TouchableOpacity onPress={() => props.onDropDownClick()}>
                    <Ionicons
                      name={'caret-down-outline'}
                      size={25}
                      color={Colors.grey_A9A9A9}
                      style={{marginTop: 7}}
                    />
                  </TouchableOpacity>
                )}
              />
            }
            style={{
              fontSize: 15,
              fontFamily: 'Titillium-Semibold',
              fontWeight: 'normal',
              height: 50,
              backgroundColor: Colors.white,
            }}
            onChangeText={text =>
              props.handleFormValueChange(props.formKey, text)
            }
            theme={{
              colors: {
                placeholder: 'grey',
                text: 'black',
                primary: 'grey',
                underlineColor: 'transparent',
                backgroundColor: 'white',
              },
              fonts: {
                regular: {
                  fontFamily: 'Titillium-Semibold',
                  fontWeight: 'normal',
                },
              },
            }}
          />
        </TouchableOpacity>
      </View>
    );
  } else if (props.showDatePicker) {
    const borderStyle =
      props.isEnabled == true ? styles.textvalid : styles.textinvalid;
    return (
      <View style={{margin: 7}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {props.isMandatory == true ? (
            <AntDesign name={'star'} size={10} color={Colors.red_FF0000} />
          ) : null}
          <Text style={styles.title_style}>{props.title}</Text>
        </View>
        <TouchableOpacity
          style={styles.dropdown_style}
          onPress={() => props.onDatePickerClick()}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TextInput
              //onChange={(event) => props.handleFormValueChange(props.formKey, event.nativeEvent.text)}
              value={props.value}
              multiline={true}
              maxLength={props.length}
              underlineColorAndroid="transparent"
              editable={false}
              keyboardType={props.keyboardType}
              style={styles.dropdowntext_style}
              {...props.textInputProps}
            />
            <Ionicons
              name={'calendar-outline'}
              size={30}
              color={Colors.grey_444444}
              style={{width: '10%', textAlign: 'right', marginLeft: -15}}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  } else if (props.showCapture) {
    const borderStyle =
      props.isEnabled == true ? styles.textvalid : styles.textinvalid;
    return (
      <View style={{margin: 7}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {props.isMandatory == true ? (
            <AntDesign name={'star'} size={10} color={Colors.red_FF0000} />
          ) : null}
          <Text style={styles.title_style}>{props.title}</Text>
        </View>
        <TouchableOpacity
          style={styles.dropdown_style}
          onPress={() => props.onCaptureClick()}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', padding: 5}}>
            <View style={{width: '90%'}}>
              <Image
                source={{uri: props.value}}
                style={{width: 70, height: 70, marginLeft: 15, borderRadius: 5}}
              />
            </View>
            <Ionicons
              name={'scan-circle-outline'}
              size={33}
              color={Colors.grey_444444}
              style={{width: '10%', textAlign: 'right', marginLeft: -12}}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  } else if (props.showSignature) {
    const borderStyle =
      props.isEnabled == true ? styles.textvalid : styles.textinvalid;
    return (
      <View style={{margin: 7}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {props.isMandatory == true ? (
            <AntDesign name={'star'} size={10} color={Colors.red_FF0000} />
          ) : null}
          <Text style={styles.title_style}>{props.title}</Text>
        </View>
        <TouchableOpacity
          style={styles.dropdown_style}
          onPress={() => props.onSignatureCaptureClick()}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TextInput
              //onChange={(event) => props.handleFormValueChange(props.formKey, event.nativeEvent.text)}
              value={props.value}
              multiline={true}
              maxLength={props.length}
              underlineColorAndroid="transparent"
              editable={false}
              keyboardType={props.keyboardType}
              style={styles.dropdowntext_style}
              {...props.textInputProps}
            />
            <MaterialCommunityIcons
              name={'pencil-outline'}
              size={30}
              color={Colors.grey_444444}
              style={{width: '10%', textAlign: 'right', marginLeft: -12}}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  dropdown_style: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    textAlignVertical: 'top',
    borderStyle: 'solid',
    elevation: 5,
    borderColor: Colors.grey_D0D0D0,
    borderWidth: 1,
  },
  dropdowntext_style: {
    fontFamily: 'Titillium-Semibold',
    color: Colors.black,
    fontSize: 16,
    fontWeight: 'normal',
    width: '90%',
    padding: 8,
  },
  textinput_style: {
    fontFamily: 'Titillium-Semibold',
    color: Colors.black,
    fontSize: 15,
    fontWeight: 'normal',
    backgroundColor: Colors.white,
    borderRadius: 10,
    textAlignVertical: 'top',
    paddingVertical: 7,
    paddingHorizontal: 10,
    textAlignVertical: 'center',
  },
  title_style: {
    color: Colors.color_5E0F8B,
    fontSize: 15,
    fontFamily: 'Titillium-Semibold',
    marginLeft: 5,
  },
  textvalid: {
    borderStyle: 'solid',
    elevation: 5,
    borderColor: Colors.grey_D0D0D0,
    borderWidth: 1,
  },
  textinvalid: {
    borderStyle: 'dashed',
    borderColor: Colors.grey_888888,
    borderWidth: 1.7,
  },
});

export default FormField;
