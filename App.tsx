import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import NavigationRoutes from './Navigation';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  useEffect(() => {
    const checkPermission = async () => {
      try {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
          console.log('Authorization status:', authStatus);
          const token = await messaging().getToken();
          console.log('Token:', token);
        } else {
          console.log('No permission granted');
        }
      } catch (error) {
        console.error('Error requesting permission:', error);
      }
    };

    checkPermission();

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'App opened via notification',
            remoteMessage.notification,
          );
        }
      });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('Alert',"Abnormal Activity Detected");
    });

    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <View style={styles.body}>
        <NavigationRoutes />
      </View>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
});
