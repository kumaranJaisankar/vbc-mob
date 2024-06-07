import notifee, {
  AndroidImportance,
  AndroidVisibility,
  AndroidStyle,
} from '@notifee/react-native';

export const onDisplayNotification = async data => {
  // Request permissions (required for iOS)
  await notifee.requestPermission();

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
    visibility: AndroidVisibility.PUBLIC,
    sound: 'doorbell',
  });

  // Display a notification

  // const parse = JSON.parse(data);
  console.log(data);
  console.log(JSON.parse(JSON.stringify(data)).data.title);
  console.log('lalalal');
  const parseData = JSON.parse(JSON.stringify(data)).data;
  await notifee.displayNotification({
    title: parseData.title,
    body: parseData.body,
    android: {
      channelId,
      smallIcon: 'ic_stat_notification', // optional, defaults to 'ic_launcher'.
      importance: AndroidImportance.HIGH,
      visibility: AndroidVisibility.PUBLIC,
      sound: 'doorbell',
      color: '#3793FC',
      largeIcon: 'ic_launcher_round',
      style: {type: AndroidStyle.BIGTEXT, text: parseData.body},

      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
    },
  });
};
