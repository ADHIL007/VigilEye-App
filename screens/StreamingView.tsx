import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {React, useState} from 'react';
import Stream from '../components/Stream';


const StreamingView = ({url ,setConnection,setloading}) => {
   console.log('url', url)
  return (
    <View style={styles.body}>
      <Stream  url ={url} setConnection = {setConnection} setloading = {setloading}/>

    </View>
  );
};

export default StreamingView;

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
});
