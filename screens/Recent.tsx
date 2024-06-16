import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  RefreshControlProps,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../Navigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { db } from '../Firebase';
import { collection, doc, getDoc } from 'firebase/firestore';

type RecentProps = NativeStackScreenProps<RootStackParamList, 'Recent'>;

const Recent = ({navigation}: RecentProps) => {
  const [serverUrl, setServerUrl] = useState('');
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const urlDoc = await getDoc(doc(collection(db, 'url'), 'url'));
        if (urlDoc.exists()) {
          const urlData = urlDoc.data();
          setServerUrl(urlData.url);
          console.log(urlData.url);
        } else {
          setServerUrl('DEFAULT_SERVER_URL');
        }
      } catch (error) {
        console.error('Error fetching URL:', error);
      }
    };

    fetchUrl();
  }, []);

  useEffect(() => {
    if (serverUrl) {
      const fetchVideos = async () => {
        try {
          const response = await fetch(`${serverUrl.trim()}/fetchvideos`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const videoFiles = await response.json();
          setVideos(videoFiles);
          console.log(videoFiles);
        } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
        }
      };

      fetchVideos();
    }
  }, [serverUrl]);

  // Function to extract filename, date, and time from the URL
  const extractFileInfo = url => {
    const parts = url.split('/');
    const filenameWithExtension = parts[parts.length - 1];
    const filename = filenameWithExtension.substring(
      0,
      filenameWithExtension.lastIndexOf('.'),
    );
    const [dateString, timeString] = filename.split('_');
    const [year, month, day] = dateString.split('-');
    const [hour, minute, second] = timeString.split('-');
    return {
      date: new Date(year, month - 1, day), // month - 1 because months are 0-based in JavaScript Date
      time: new Date(0, 0, 0, hour, minute, second), // Using a dummy date (Jan 1, 1900) to represent time
    };
  };

  // Sort videos by the latest occurrence first
  const sortedVideos = videos.slice().sort((a, b) => {
    const {date: dateA, time: timeA} = extractFileInfo(a.url);
    const {date: dateB, time: timeB} = extractFileInfo(b.url);

    // Compare dates first
    if (dateA.getTime() !== dateB.getTime()) {
      return dateB.getTime() - dateA.getTime(); // Latest date first
    }

    // If dates are the same, compare times
    return timeB.getTime() - timeA.getTime(); // Latest time first
  });

  const renderVideoItem = ({item}) => {
    const {date, time} = extractFileInfo(item.url);

    console.log(item);
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() =>
          navigation.navigate('Video', {
            url: item.url,
          })
        }>
        <MaterialCommunityIcons
          name="vlc"
          size={heightPercentageToDP(6.5)}
          color="#E85E00"
        />
        <View style={styles.videoDetails}>
          <Text style={styles.videoTitle}>{date.toLocaleDateString()}</Text>
          <Text style={styles.videoTimestamp}>
            {time.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            })}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recorded Videos</Text>
      <FlatList
        data={sortedVideos}
        renderItem={renderVideoItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
      />
    </View>
  );
};

export default Recent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 16,
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333333',
  },
  itemContainer: {
    flexDirection: 'column',
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: widthPercentageToDP('42%'),
    height: 150,
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 0.4, // Add border width
    borderRadius: 8, // Add border radius
    backgroundColor: '#FFFFFF', // Light grey background
  },
  videoDetails: {
    alignItems: 'center',
  },
  videoTitle: {
    marginTop: 10,
    fontSize: 16,
    color: '#333333',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  videoTimestamp: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
});
