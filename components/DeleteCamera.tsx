import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {deleteDoc, doc} from 'firebase/firestore';
import {db} from '../Firebase';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const DeleteCamera = ({id, index, showConfirmDelete, fetchcameras,selectedid ,setLongPressIndex}) => {
  const handleDelete = async () => {
    try {
      // Show confirmation dialog
      Alert.alert(
        'Confirm Deletion',
        `Are you sure you want to delete camera${index + 1} ?`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => {showConfirmDelete(false),selectedid({
                index: '',
                id: '',
              })
              setLongPressIndex(null);
            } // Set showConfirmDelete to false when Cancel is pressed

          },
          {
            text: 'Delete',
            onPress: async () => {
              // Delete camera document from Firestore
              await deleteDoc(doc(db, 'Cameras', id));
              // Fetch updated camera list
              fetchcameras();
              showConfirmDelete(false);
              selectedid({
                index: '',
                id: '',
              })
              setLongPressIndex(null);
            },
          },
        ],
        {cancelable: false},
      );
    } catch (error) {
      console.error('Error deleting camera:', error);
    }
  };

 handleDelete();
};

export default DeleteCamera;

const styles = StyleSheet.create({});
