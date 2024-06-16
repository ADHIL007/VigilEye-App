import React, { useState } from 'react';
import { StyleSheet, Switch, Text, View, TextInput, Button, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../Firebase';

const Settings = () => {
  const [lockEnabled, setLockEnabled] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const toggleLock = () => {
    setLockEnabled(previousState => !previousState);
  };

  const updatePassword = () => {
    if (newPassword.length === 4) {

      const passwordCollectionRef = collection(db, 'Password');
      const passwordDocRef = doc(passwordCollectionRef, 'password');
      setDoc(passwordDocRef, { pass: newPassword }, { merge: true });
      setNewPassword('');
    } else {
      Alert.alert("Password must be 4 digits long");
    }
  };

  const updateUrl = () => {
    // Assuming URL must be non-empty for simplicity
    if (newUrl.trim() !== '') {
      const urlCollectionRef = collection(db, 'url');
      const urlDocRef = doc(urlCollectionRef, 'url');
      setDoc(urlDocRef, { url: newUrl }, { merge: true });
      setNewUrl('');
    } else {
      Alert.alert("Please enter a valid URL");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.lockContainer}>
        <Text style={styles.text}>
          Enable Lock{' '}
          <MaterialIcons
            name="lock-outline"
            size={heightPercentageToDP('3.5%')}
            color="#1e90ff"
          />
        </Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={lockEnabled ? "#1e90ff" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleLock}
          value={lockEnabled}
        />
      </View>
      <View style={styles.passwordContainer}>
        <Text style={styles.text}>Update Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setNewPassword(text)}
          value={newPassword}
          placeholder="Enter new 4-digit password"
          keyboardType="numeric"
          maxLength={4}
          placeholderTextColor={'#000'}
        />
        <Button
          title="Update"
          onPress={updatePassword}
          color="#1e90ff"
          disabled={newPassword.length !== 4}
          accessibilityLabel="Update Password"
        />
      </View>
      <View style={styles.passwordContainer}>
        <Text style={styles.text}>Update URL</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setNewUrl(text)}
          value={newUrl}
          placeholder="Enter new URL"
          placeholderTextColor={'#000'}
        />
        <Button
          title="Update"
          onPress={updateUrl}
          color="#1e90ff"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  lockContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: widthPercentageToDP('5%'),
    paddingVertical: heightPercentageToDP('3%'),
  },
  passwordContainer: {
    paddingHorizontal: widthPercentageToDP('5%'),
    paddingTop: heightPercentageToDP('3%'),
  },
  text: {
    color: '#1e90ff',
    fontSize: heightPercentageToDP('3.1%'),
    fontFamily: 'Quicksand',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: heightPercentageToDP('1%'),
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'black',
  },
});

export default Settings;
