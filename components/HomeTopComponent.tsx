import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const HomeTopComponent = () => {
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
    <View>
      <View style={styles.container}>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>
            {hours < 10 ? '0' + hours : hours}:
            {minutes < 10 ? '0' + minutes : minutes}:
            {seconds < 10 ? '0' + seconds : seconds}
          </Text>
          <View>
            <Text style={styles.dayText}>{days[day]}</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          left: widthPercentageToDP('32%'),
          top: heightPercentageToDP('-5%'),
          flexDirection: 'column',
          alignItems: 'center',
          height: heightPercentageToDP('20%'),
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',

          }}>
          <Text
            style={{
              fontSize: heightPercentageToDP('15%'),
              fontWeight: 'bold',
              color: '#1e272e',
              left: widthPercentageToDP('5%'),
              top: heightPercentageToDP('2.5%'),
            }}>
            0
          </Text>
          <Text
            style={{
              fontSize: heightPercentageToDP('2%'),
              color: '#1e272e',
              left: widthPercentageToDP('6%'),
              top: heightPercentageToDP('5.5%'),
            }}>
            minutes ago
          </Text>
        </View>
        <Text style={[styles.timeText,{marginTop:-heightPercentageToDP("1%")}]}>Last Detected</Text>
      </View>
    </View>
  );
};

export default HomeTopComponent;

const styles = StyleSheet.create({
  container: {},
  timeContainer: {
    position: 'absolute',
    top: -70,
    right: 10,
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
