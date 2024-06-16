import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from './screens/Splash';
import Home from './screens/Home';
import Lock from './screens/Lock';
import Live from './screens/Live';
import Recent from './screens/Recent';
import Dashboard from './screens/Dashboard';
import Settings from './screens/Settings';
import Testmode from './screens/About';
import Fullscreen from './screens/Video';
import About from './screens/About';
import Video from './screens/Video';

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  Lock: undefined;
  Live: {url: String; location: String};
  Recent: undefined;
  Dashboard: undefined;
  Settings: undefined;
  About: undefined;
  Video: {url: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const NavigationRoutes: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Lock"
        component={Lock}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Live"
        component={Live}
        options={{
          headerShown: true,
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name="Recent"
        component={Recent}
        options={{
          headerShown: true,
          title: '',
        }}
      />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: true,
          title: '',
        }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: true,
          title: '',
        }}
      />
      <Stack.Screen
        name="About"
        component={About}
        options={{
          headerShown: true,
          title: '',
        }}
      />
      <Stack.Screen
        name="Video"
        component={Video}
        options={{
          headerShown: true,
          title: '',
          headerStyle: {
            backgroundColor: 'rgb(0, 0, 0)',
          },
          headerTintColor: '#FFFFFF', // Set the arrow color to white
        }}
      />
    </Stack.Navigator>
  );
};

export default NavigationRoutes;
