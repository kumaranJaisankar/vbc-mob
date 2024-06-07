/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';
import {onDisplayNotification} from './source/notification/DisplayNotification';
import {store, persistor} from './source/redux/Store/Store';
import {connect, Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  onDisplayNotification(remoteMessage);
});

notifee.onBackgroundEvent(async ({type, detail}) => {
  const {notification, pressAction} = detail;

  // Handle the event
  if (type === EventType.ACTION_PRESS && pressAction.id === 'default') {
    console.log('User pressed the notification.');
    // You can navigate to a specific screen or perform any other action
  } else if (type === EventType.DISMISSED) {
    console.log('notification dismissed');
  }

  // Ensure the event is completed before exiting the background handler
  // await notifee.cancelNotification(notification.id);
});

AppRegistry.registerComponent(appName, () => App);
