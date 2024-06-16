import React from 'react';
import AsyncStorage,{ ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
type SplashProps = NativeStackScreenProps<RootStackParamList ,'Splash' >
const Splash = ({navigation}:SplashProps) => {

  setTimeout(()=>{
    navigation.replace('Lock')
  },4000)
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/graphics/splash.json')}
        autoPlay
        loop
        style={styles.animation}
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>Your Peace of Mind, Always in Sight.</Text>

      </View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',

  },
  animation: {
    flex: 1,
  },
  textContainer: {
    position: 'absolute',
   width:'100%'
  },
  text: {
    color: '#1e272e',
    fontSize: 24,
    textAlign: 'center',
    marginTop:500,
 marginBottom:50
  },
});
