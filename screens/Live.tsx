import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import StreamingView from './StreamingView'
import { RootStackParamList } from '../Navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CamDetails from '../components/CamDetails';
type LiveProps = NativeStackScreenProps<RootStackParamList, 'Live'>;
const Live = ({route}: LiveProps) => {
   const {url, location} = route.params
    console.log(url, location)
    const [Connection ,setConnection] = useState(true)
    const [loading, setLoading] = useState(false)
  return (
    <ScrollView style={styles.container}>
<StreamingView url = {url} setConnection = {setConnection} setloading = {setLoading}/>
<CamDetails location = {location} Connection = {Connection} loading = {loading}/>
    </ScrollView>
  )
}

export default Live

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  }
})