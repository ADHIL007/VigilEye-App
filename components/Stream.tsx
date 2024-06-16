import React, {useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {VLCPlayer, VlCPlayerView} from 'react-native-vlc-media-player';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Orientation from 'react-native-orientation-locker';
import {useNavigation} from '@react-navigation/native';

const calcVLCPlayerHeight = (windowWidth, aspectRatio) => {
  return windowWidth * aspectRatio;
};

const Stream = ({url,setConnection ,setloading}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
 console.log('url', url)
  const navigation = useNavigation();

  useEffect(() => {
    if (isFullScreen) {
      StatusBar.setHidden(true);
      Orientation.lockToLandscape();
      navigation.setOptions({headerShown: false});
    } else {
      StatusBar.setHidden(false);
      Orientation.lockToPortrait();
      navigation.setOptions({headerShown: true});
    }
    return () => {
      Orientation.unlockAllOrientations();
    };
  }, [isFullScreen, navigation]);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.fullScreenButton}
        onPress={toggleFullScreen}>
        <MaterialIcons
          name={'screen-rotation'}
          size={28}
          color="#FFF"
        />
      </TouchableOpacity>
      <VlCPlayerView
        url={url}
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
        showRightButton={true}
        style={isFullScreen ? styles.fullScreenPlayer : styles.vlcPlayer}
        onVLCError={(error) => {
          console.log("Error Occured"+error);
          setConnection(false);
        }}
       isPlaying={() => {
         setloading(false)
       }}
      />

      <View style={{width: '100%', height: 100}}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
    borderBottomRightRadius: 50,
  },
  fullScreenButton: {
    position: 'absolute',
    top: heightPercentageToDP('2%'),
    right: 10,
    zIndex: 1,
  },
  activityIndicator: {
    position: 'absolute',
    zIndex: 1,
    width: 80,
    height: 80,
    top: heightPercentageToDP('10%'),
  },
  vlcPlayer: {
    height: calcVLCPlayerHeight(Dimensions.get('window').width, 3 / 4),
    width: '100%',
  },
  fullScreenPlayer: {
    width: Dimensions.get('window').height, // Swapping width and height for landscape mode
    height: Dimensions.get('window').width,
    transform: [{scale: 1.16}],
  },
  liveLabel: {
    position: 'absolute',
    top: heightPercentageToDP('2%'),
    left: 10,
    color: '#FFF',
    fontSize: 16,
  },
});

export default Stream;
