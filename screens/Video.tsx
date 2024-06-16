import { StyleSheet, View, Text } from 'react-native';
import React, { useRef, useEffect, useState } from 'react';
import { VlCPlayerView } from 'react-native-vlc-media-player';
import Orientation from 'react-native-orientation-locker';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../Navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../Firebase';

type VideoProps = NativeStackScreenProps<RootStackParamList, 'Video'>;

const Video: React.FC<VideoProps> = ({ route }: VideoProps) => {
  const playerRef = useRef(null);
  const navigation = useNavigation();
  const url = route.params.url;
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    if (url) {
      const fetchUrl = async () => {
        try {
          const urlDoc = await getDoc(doc(collection(db, 'url'), 'url'));
          if (urlDoc.exists()) {
            const urlData = urlDoc.data();
            return urlData.url;
          } else {
            return 'DEFAULT_SERVER_URL';
          }
        } catch (error) {
          console.error('Error fetching URL:', error);
          return null;
        }
      };

      fetchUrl().then(serverUrl => {
        if (serverUrl) {
          const parts = url.split('/');
          const filenameWithExtension = parts[parts.length - 1];
          const file = filenameWithExtension.substring(
            0,
            filenameWithExtension.lastIndexOf('.'),
          );
          const constructedUrl = `${serverUrl.trim()}/videos/${file}.avi`;
          console.log('Constructed URL:', constructedUrl);
          setVideoUrl(constructedUrl);
        } else {
          console.error('URL is undefined or null');
        }
      });
    } else {
      console.error('URL is undefined or null');
    }
  }, [url]);

  const handlePause = () => {
    if (playerRef.current) {
      playerRef.current.pause();
    }
  };

  const handleSeek = () => {
    if (playerRef.current) {
      playerRef.current.seek(0.5); // Seek to the middle of the video
    }
  };

  const handleBackPress = () => {
    navigation.navigate('Recent'); // Navigate to the 'Recent' screen
  };

  return (
    <View style={styles.container}>
      {videoUrl ? (
        <VlCPlayerView
          ref={playerRef}
          url={videoUrl}
          autoplay={true}
          isGG={false}
          showGG={false}
          Orientation={Orientation}
          autoAspectRatio={true}
          resizeMode="cover"
          repeat={true}
          isFull={true}
          seek={0}
          realShowLoding={true}
          showControls={true}
          showRightButton={false}
        />
      ) : (
        <Text>No video URL available</Text>
      )}
    </View>
  );
};

export default Video;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
