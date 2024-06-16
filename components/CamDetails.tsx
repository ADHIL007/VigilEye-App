import React, {useState, useEffect} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntIcons from 'react-native-vector-icons/AntDesign';
import {heightPercentageToDP} from 'react-native-responsive-screen';

const CamDetails = ({location, Connection, loading}) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const day = time.getDay();
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {location}
        <Icon
          name="location-on"
          size={heightPercentageToDP('3.5%')}
          color="#1e272e"
        />
      </Text>
      <View
        style={[
          styles.Live,
          Connection
            ? {backgroundColor: '#ef5777'}
            : {backgroundColor: '#808e9b'},
        ]}>
        {loading ? (
          <>
            <ActivityIndicator size="small" color="#fff" />
            <Text style={{color: '#fff',fontSize:heightPercentageToDP('1.8%')}}>Loading</Text>
          </>
        ) : Connection ? (
          <>
            <Icon
              name="fiber-manual-record"
              size={heightPercentageToDP('1.5%')}
              color="#fff"
            />
            <Text style={{color: '#fff'}}>Live</Text>
          </>
        ) : (
          <>
            <AntIcons
              name="disconnect"
              size={heightPercentageToDP('1.5%')}
              color="#fff"
            />
            <Text style={{color: '#fff'}}>Offline</Text>
          </>
        )}
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>
          {hours < 10 ? '0' + hours : hours}:
          {minutes < 10 ? '0' + minutes : minutes}:
          {seconds < 10 ? '0' + seconds : seconds}
        </Text>
        <Text style={styles.dayText}>{days[day]}</Text>
      </View>
    </View>
  );
};

export default CamDetails;

const styles = StyleSheet.create({
  container: {
    height: heightPercentageToDP('50%'),
  },
  heading: {
    fontSize: heightPercentageToDP('4.5%'),
    color: '#1e272e',
    marginTop: -80,
    marginLeft: 10,
    fontFamily: 'Quicksand-light',
  },
  Live: {
    fontSize: heightPercentageToDP('1.5%'),
    padding: 5,
    borderRadius: 5,
    width: 80,
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
    marginTop: 10,
    marginLeft: 10,
    fontFamily: 'Quicksand-light',
  },
  timeContainer: {
    position: 'absolute',
    top: -80,
    right: 20,
    flexDirection: 'column',
    alignItems: 'center',
  },
  timeText: {
    color: '#1e272e',
    fontSize: heightPercentageToDP('3%'),
  },
  dayText: {
    color: '#1e272e',
    fontSize: heightPercentageToDP('4.7%'),
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
  },
});
