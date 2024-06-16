import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const FlatCard = ({ text, label, goto, width, height }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (goto) {
      navigation.navigate(goto);
    }
  };

  return (
    <TouchableOpacity style={[styles.container, { width, height }]} onPress={handlePress}>
      {label === 'camera' ? (
        <MaterialIcons name="videocam" size={30} color="#fff" />
      ) : label === 'video' ? (
        <MaterialIcons name="ondemand-video" size={30} color="#fff" />
      ) : label === 'dash' ? (
        <MaterialIcons name="dashboard" size={30} color="#fff" />
      ) : label === 'settings' ? (
        <MaterialIcons name="settings" size={30} color="#fff" />
      ) : (
        <MaterialIcons name="camera" size={30} color="#fff" />
      )}
      <Text style={{ color: '#fff', fontSize: 20 }}>{text}</Text>
    </TouchableOpacity>
  );
};

export default FlatCard;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
