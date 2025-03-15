import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import {db} from '../Firebase'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
const AddCamera = ({ setStatus ,fetchCameras  }) => {
    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('');
    const [location, setLocation] = useState('');
    const [ipAddress, setIpAddress] = useState('');
    const [port,setPort] = useState('')
    const [rtsplink,setrtsplink] = useState('')
    const handleUsernameChange = (text) => {
        if (text.trim() === 'admin') {
            setUsername('admin');
        } else {
            setUsername(text);
        }
    };

    const handlePasswordChange = (text) => {
        setPassword(text);
    };

    const handleLocationChange = (text) => {
        setLocation(text);
    };

    const handleIpAddressChange = (text) => {
        setIpAddress(text);
    };
    const handlertspChange = (text) => {
        setrtsplink(text);
    };
    const handlePortChange = (text)=>{
        setPort(text)
    }

    const handleSubmit = async () => {
        try {
            // Construct the RTSP URL
            const rtsp =
            rtsplink !== '' ? rtsplink :
                `rtsp://${username}:${password}@${ipAddress}/ch1/main`;


            // Log the details
            console.log('Username:', username);
            console.log('Password:', password);
            console.log('Location:', location);
            console.log('IP Address:', ipAddress);

            console.log('RTSP URL:', rtsp);

            // Prepare data object
            const data = {
                url: rtsp,
                Location: location,

            };

            // Add the document to Firestore collection
            const docRef = await addDoc(collection(db, 'Cameras'), data);
            console.log('Document added with ID: ', docRef.id);

            // Reset form and status
            setUsername('');
            setPassword('');
            setLocation('');
            setIpAddress('');
            setStatus(false); // Assuming setStatus is a state updater function
            fetchCameras();
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Camera
            <Icons name="camera-plus-outline" size={30} color="#fff" />
            </Text>
            <TextInput
            style={styles.input}
            placeholder="Username (default admin)"
            onChangeText={handleUsernameChange}
            value={username}
            placeholderTextColor="rgba(0,0,0,0.4)"
        />
            <TextInput
                style={styles.input}
                placeholder="Verification Code"
                onChangeText={handlePasswordChange}
                value={password}
                secureTextEntry={false}
                placeholderTextColor="rgba(0,0,0,0.4)"
            />
            <TextInput
                style={styles.input}
                placeholder="Location (Eg - Kitchen)"
                onChangeText={handleLocationChange}
                value={location}
                placeholderTextColor="rgba(0,0,0,0.4)"
            />
            <TextInput
                style={styles.input}
                placeholder="IP Address (Eg - 192.168.1.1)"
                onChangeText={handleIpAddressChange}
                value={ipAddress}
                placeholderTextColor="rgba(0,0,0,0.4)"
                keyboardType='numeric'
            />
             <TextInput
                style={styles.input}
                placeholder="Port Number"
                onChangeText={handlePortChange}
                value={port}
                placeholderTextColor="rgba(0,0,0,0.4)"

            />
            <Text style={styles.or}>
                OR
            </Text>
             <TextInput
                style={styles.input}
                placeholder="RTSP Link (optional)"
                onChangeText={handlertspChange}
                value={rtsplink}
                placeholderTextColor="rgba(0,0,0,0.4)"

            />

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.cancelButton]}
                    onPress={() => { setStatus(false); }}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.submitButton]}
                    onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Add Camera</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        height: heightPercentageToDP('100%'),
        width: widthPercentageToDP('100%'),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,.6)',
    },
    title: {
        fontFamily: 'Quicksand',
        fontSize: heightPercentageToDP('3.5%'),
        marginBottom: 20,
        color: '#ffffff',
    },
    or: {
       color: '#ffffff',
       fontSize:heightPercentageToDP('2.5%'),
       marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 15,
        marginBottom: 20,
        paddingLeft: 10,
        color: '#303952',
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-around',
    },
    button: {
        width: '40%',
        height: 50,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#33d9b2',
    },
    submitButton: {
        backgroundColor: '#3dc1d3',
    },
    buttonText: {
        color: '#ffffff',
        fontSize:21,
    },
});

export default AddCamera;
