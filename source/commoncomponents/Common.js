import React from 'react';
import {Colors} from './Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Alert} from 'react-native';
import {showMessage} from 'react-native-flash-message';

export const getComplaintsStatusBackgroundColor = status => {
  if (status == 'ASN') {
    return '#FFFDC3';
  } else if (status == 'OPN') {
    return '#EAB7B7';
  } else if (status == 'RSL') {
    return '#B8FABE';
  } else if (status == 'INP') {
    return '#B8FABE';
  } else if (status == 'CLD') {
    return '#EAB7B7';
  }
};

export const getComplaintsStatus = status => {
  if (status == 'ASN') {
    return 'Assigned';
  } else if (status == 'OPN') {
    return 'Open';
  } else if (status == 'RSL') {
    return 'Resolved';
  } else if (status == 'INP') {
    return 'In-Progress';
  } else if (status == 'CLD') {
    return 'Closed';
  }
};

export const getStars = rating => {
  if (rating == 'VP') {
    return (
      <>
        <FontAwesome name={'star'} size={22} color={Colors.golden_FFD700} />
        <FontAwesome name={'star'} size={22} color={Colors.grey_888888} />
        <FontAwesome name={'star'} size={22} color={Colors.grey_888888} />
        <FontAwesome name={'star'} size={22} color={Colors.grey_888888} />
        <FontAwesome name={'star'} size={22} color={Colors.grey_888888} />
      </>
    );
  } else if (rating == 'P') {
    return (
      <>
        <FontAwesome name={'star'} size={22} color={Colors.golden_FFD700} />
        <FontAwesome name={'star'} size={22} color={Colors.golden_FFD700} />
        <FontAwesome name={'star'} size={22} color={Colors.grey_888888} />
        <FontAwesome name={'star'} size={22} color={Colors.grey_888888} />
        <FontAwesome name={'star'} size={22} color={Colors.grey_888888} />
      </>
    );
  } else if (rating == 'AVG') {
    return (
      <>
        <FontAwesome name={'star'} size={22} color={Colors.golden_FFD700} />
        <FontAwesome name={'star'} size={22} color={Colors.golden_FFD700} />
        <FontAwesome name={'star'} size={22} color={Colors.golden_FFD700} />
        <FontAwesome name={'star'} size={22} color={Colors.grey_888888} />
        <FontAwesome name={'star'} size={22} color={Colors.grey_888888} />
      </>
    );
  } else if (rating == 'GD') {
    return (
      <>
        <FontAwesome name={'star'} size={22} color={Colors.golden_FFD700} />
        <FontAwesome name={'star'} size={22} color={Colors.golden_FFD700} />
        <FontAwesome name={'star'} size={22} color={Colors.golden_FFD700} />
        <FontAwesome name={'star'} size={22} color={Colors.golden_FFD700} />
        <FontAwesome name={'star'} size={22} color={Colors.grey_888888} />
      </>
    );
  } else if (rating == 'VG') {
    return (
      <>
        <FontAwesome name={'star'} size={22} color={Colors.golden_FFD700} />
        <FontAwesome name={'star'} size={22} color={Colors.golden_FFD700} />
        <FontAwesome name={'star'} size={22} color={Colors.golden_FFD700} />
        <FontAwesome name={'star'} size={22} color={Colors.golden_FFD700} />
        <FontAwesome name={'star'} size={22} color={Colors.golden_FFD700} />
      </>
    );
  }
};

export const showAppInstruction = () => {
  Alert.alert(
    'Under Development',
    'This feature is under development. It will be available soon.',
    [{text: 'OK', onPress: () => {}}],
  );
};
