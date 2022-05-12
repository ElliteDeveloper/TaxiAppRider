// import { Notifications } from 'expo';
import * as Notifications from 'expo-notifications'
// import Constants from 'expo-constants';
import { Constants } from 'react-native-unimodules';
import * as Permissions from 'expo-permissions';
import * as firebase from 'firebase'
import {Platform} from 'react-native';
import  languageJSON  from '../common/language';
export default async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;

  // POST the token to your backend server from where you can retrieve it to send push notifications.

}