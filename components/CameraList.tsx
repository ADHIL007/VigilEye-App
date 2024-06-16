import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';


const CameraList = ({ cameraList, selected ,setLongPressIndex,longPressIndex }) => {
  const navigation = useNavigation();


  const handleLongPress = (index) => {
    setLongPressIndex(index);
    selected({
      index : index,
      id : cameraList[index].id
    });
  };

  const handlePressIn = (index) => {
    setLongPressIndex(index);
  };

  const handlePressOut = () => {
    // Empty function to prevent touch event from bubbling up to the parent container
  };

  const handlePress = (index, item) => {
    navigation.navigate('Live', {
      url: item.url,
      location: item.Location,
    });
  };

  const handleContainerPress = () => {
    setLongPressIndex(null);
    selected({
      index:'',
      id:''
    })
  };

  return (
    <ScrollView style={styles.container} onTouchStart={handleContainerPress}>
      {cameraList.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.cameraItem,
            longPressIndex === index && { borderColor: '#1e90ff' }, // Change border color when long-pressed
          ]}
          onPressIn={() => handlePressIn(index)}
          onPressOut={handlePressOut}
          onPress={() => handlePress(index, item)}
          onLongPress={() => handleLongPress(index)}
        >
          <Icon name="videocamera" size={24} color="#1e90ff" />
          <View style={styles.cameraInfo}>
            <Text style={styles.cameraIndex}>Camera {index + 1}</Text>
            <Text style={styles.cameraLocation}>{item.Location}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  cameraItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1, // Add border width
    borderColor: 'rgba(0,0,0,0.03)', // Set default border color
    elevation: 2, // Add shadow on Android
    shadowColor: '#000', // Add shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  cameraInfo: {
    marginLeft: 15,
  },
  cameraIndex: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e272e',
  },
  cameraLocation: {
    fontSize: 14,
    color: '#1e272e',
  },
});

export default CameraList;
