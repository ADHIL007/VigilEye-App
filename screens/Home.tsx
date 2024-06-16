import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState, useMemo} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {heightPercentageToDP, widthPercentageToDP} from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';
import {collection, getDocs} from 'firebase/firestore';
import {db} from '../Firebase';
import CameraList from '../components/CameraList';
import AddCamera from '../components/AddCamera';
import DeleteCamera from '../components/DeleteCamera';
import ListBox from '../components/ListBox';
import { RootStackParamList } from '../Navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type MainProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
const Home = ({navigation}: MainProps) => {
  const [showInputField, setShowInputField] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [list, setList] = useState([]);
  const [selectedID, setselectedID] = useState({
    index: '',
    id: '',
  });
  const [showConfirmDelete, setshowConfirmDelete] = useState(false);
  const [longPressIndex, setLongPressIndex] = useState(null);
  const fetchCameras = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Cameras'));
      if (querySnapshot) {
        setLoading(false);
      }
      if (querySnapshot.empty) {
        setEmpty(true);
        setList([]);
      } else {
        setEmpty(false);
        setList(querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id})));
      }
    } catch (error) {
      console.error('Error fetching cameras:', error);
      // Handle error as needed, e.g., setEmpty(true) or display an error message
    }
  };
  useEffect(() => {
    fetchCameras();

    // Cleanup function to prevent memory leaks
    return () => {};
  }, []); // Empty dependency array to run the effect only once

  // Memoize the camera list to prevent unnecessary re-renders
  const memoizedList = useMemo(() => list, [list]);
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(true);
  return (
    <View style={styles.body}>
      <View style={styles.Topcontainer}>
        {selectedID.id != '' && (
          <TouchableOpacity onPress={() => setshowConfirmDelete(true)}>
            <MaterialIcons
              name="delete-outline"
              size={heightPercentageToDP('4%')}
              color="#FC427B"
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => setShowInputField(!showInputField)}>
          <MaterialIcons
            name="add-circle-outline"
            size={heightPercentageToDP('4%')}
            color="#1e90ff"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setShowMore(!showMore);
          }}>
          <MaterialIcons
            name="more-vert"
            size={heightPercentageToDP('4%')}
            color="#1e90ff"
          />
        </TouchableOpacity>
      </View>
      {showMore && (
        <View
        onTouchEnd ={() => setShowMore(false)}
          style={{
            flex: 1,
            position: 'absolute',
            zIndex: 10,
            right: widthPercentageToDP('.9%'),
            width: widthPercentageToDP('100%'),
            height: heightPercentageToDP('100%'),
          }}>
          <ListBox navigation ={navigation}/>
        </View>
      )}
      {loading ? (
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator
            size="large"
            color="#1e90ff"
            style={{top: heightPercentageToDP('15%')}}
          />
          <Text style={[styles.title, {color: '#1e90ff'}]}>Loading...</Text>
        </View>
      ) : empty ? (
        <View>
          <LottieView
            source={require('../assets/graphics/add.json')}
            autoPlay
            loop
            style={{
              height: heightPercentageToDP('40%'),
              top: heightPercentageToDP('15%'),
            }}
          />
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={styles.title}>
              Please add a camera to start surveillance. Tap the + button to get
              started
            </Text>
          </View>
        </View>
      ) : (
        <CameraList
          cameraList={memoizedList}
          selected={setselectedID}
          setLongPressIndex={setLongPressIndex}
          longPressIndex={longPressIndex}
        />
      )}

      {showInputField && (
        <AddCamera setStatus={setShowInputField} fetchCameras={fetchCameras} />
      )}

      {showConfirmDelete && (
        <DeleteCamera
          id={selectedID.id}
          index={selectedID.index}
          showConfirmDelete={setshowConfirmDelete}
          fetchcameras={fetchCameras}
          selectedid={setselectedID}
          setLongPressIndex={setLongPressIndex}
        />
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  Topcontainer: {
    backgroundColor: '#ffffff',
    height: heightPercentageToDP('7%'),
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2, // Adjust the opacity as needed
    shadowRadius: 2, // Adjust the radius as needed
    elevation: 5, // For Android
    gap: 10,
  },
  title: {
    color: '#1e272e',
    fontSize: heightPercentageToDP('2%'),
    textAlign: 'center',
    width: '70%',
    marginTop: heightPercentageToDP('15%'),
    fontFamily: 'Quicksand-Bold',
  },
});
