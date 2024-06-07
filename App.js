import React, {useEffect, useRef} from 'react';
import {
  NavigationContainer,
  useNavigation,
  DefaultTheme,
  DarkTheme as DrkTheme,
} from '@react-navigation/native';
import MainNavigator from './source/navigation/MainNavigator';
import Toast from 'react-native-toast-message';
import {
  LogBox,
  Linking,
  Platform,
  PermissionsAndroid,
  Alert,
  useColorScheme,
} from 'react-native';
import {store, persistor} from './source/redux/Store/Store';
import {connect, Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import messaging from '@react-native-firebase/messaging';
import notifee, {
  AndroidImportance,
  AndroidVisibility,
  EventType,
} from '@notifee/react-native';
import {onDisplayNotification} from './source/notification/DisplayNotification';
import 'react-native-gesture-handler';
import AuthStack from './source/navigation/AuthStack';
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  adaptNavigationTheme,
} from 'react-native-paper';
import lightColors from './source/themes/lightColors';
import darkColors from './source/themes/darkColors';
import {bindActionCreators} from 'redux';
import AppProvider from './source/providers/AppProvider';

LogBox.ignoreLogs(['Remote debugger']);
LogBox.ignoreLogs(['Setting a timer']);
LogBox.ignoreLogs(['componentWillReceiveProps has']);
LogBox.ignoreLogs(['VirtualizedLists should']);
LogBox.ignoreLogs(['Failed prop type:']);
LogBox.ignoreLogs(['Each child in a list should have a unique "key" prop.']);
LogBox.ignoreLogs(['Require cycle']);
LogBox.ignoreLogs([
  `Can't perform a React state update on an unmounted component`,
]);
LogBox.ignoreLogs(['`new NativeEventEmitter()`']);

const App = () => {
  // const navigation = useNavigation();
  const navigationRef = useRef(null);

  useEffect(() => {
    const requestuserPermission = async () => {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
        await messaging().registerDeviceForRemoteMessages();
        const token = await messaging().getToken();
        console.log('Message token: ', token);
      }
    };
    requestuserPermission();
  }, []);

  //Firebase cloud messaging function
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      onDisplayNotification(remoteMessage);
    });

    return unsubscribe;
  }, []);

  // useEffect(() => {

  // }, []);

  useEffect(() => {
    // Foreground event handler
    const unsubscribe = notifee.onForegroundEvent(({type, detail}) => {
      const {notification, pressAction} = detail;

      if (type === EventType.DISMISSED) {
        console.log('User dismissed notification', notification);
      } else if (
        type === EventType.ACTION_PRESS &&
        pressAction.id === 'default'
      ) {
        console.log('User pressed notification', notification);
      }
    });

    // Handle deep linking when the app is opened from a link
    const handleDeepLink = async () => {
      const url = await Linking.getInitialURL();
      handleUrl(url);
    };

    const handleUrl = url => {
      // Check if the app was opened by a deep link
      if (url) {
        // Handle the deep link here, e.g., navigate to the appropriate screen
        console.log('Opened from deep link:', url);
        navigationRef?.current?.navigate('PlanRenewal');
      }
    };

    // Add event listener to handle incoming links
    Linking.addEventListener('url', ({url}) => handleUrl(url));

    // Check if the app was opened by a deep link when it starts
    handleDeepLink();

    // Clean up the event listener when the component unmounts
    return () => {
      unsubscribe();
      // Linking.removeEventListener('url', handleUrl);
    };
  }, []);

  const openAppStore = () => {
    Linking.openURL(
      'https://play.google.com/store/apps/details?id=sparkradiuscustomerinfo.in',
    );
  };

  const handleRenewalLink = () => {
    // Replace 'your_custom_scheme://your_domain/planrenewal' with your actual deep link URL
    const renewalUrl = 'vbccustomer://renewal';
    Linking.canOpenURL(renewalUrl)
      .then(supported => {
        if (supported) {
          Linking.openURL(renewalUrl);
        } else {
          openAppStore(); // Redirect to the Play Store if the app is not installed
        }
      })
      .catch(err => console.error('An error occurred', err));
  };
  console.log('dshfjshdjkfhskjdf');
  const navLightTheme = {
    ...MD3LightTheme,
    ...DefaultTheme,
    colors: {...DefaultTheme.colors, ...lightColors.colors},
  };
  const navDarkTheme = {
    ...MD3DarkTheme,
    ...DrkTheme,
    colors: {...DrkTheme.colors, ...darkColors.colors},
  };
  const lightTheme = {...MD3LightTheme, colors: lightColors.colors};
  const darkTheme = {
    ...MD3DarkTheme,
    colors: darkColors.colors,
  };
  const colorTheme = useColorScheme();
  const {LightTheme, DarkTheme} = adaptNavigationTheme({
    reactNavigationLight: navLightTheme,
    reactNavigationDark: navDarkTheme,
  });
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppProvider />
      </PersistGate>
    </Provider>
  );
};

export default App;
