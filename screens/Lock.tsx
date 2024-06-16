import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import { RootStackParamList } from '../App';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LottieView from 'lottie-react-native';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../Firebase';

type LockProps = NativeStackScreenProps<RootStackParamList, 'Lock'>;
const Lock = ({ navigation }: LockProps) => {
  const [enteredPin, setEnteredPin] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to manage whether password is shown or hidden
  const [success, setSuccess] = useState(false); // State to manage success message visibility
  const [correctPin, setCorrectPin] = useState(''); // Set your correct PIN here

  useEffect(() => {
    const getPassword = async () => {
      const collectionRef = collection(db, 'Password');
      const passwordDoc = await getDoc(doc(collectionRef, 'password'));
      if (passwordDoc.exists()) {
        const passwordData = passwordDoc.data();
        setCorrectPin(passwordData.pass); // Assuming pass is the attribute containing the password
        console.log(passwordData.pass);
      } else {
        setCorrectPin('1234'); // Default password if document doesn't exist
      }
    };

    getPassword();
  }, []);


  const handlePinChange = (pin: string) => {
    setEnteredPin(pin);
  };
  const [wrong, setWrong] = useState(false);
  const handleUnlock = () => {
    if (enteredPin === correctPin) {
      setSuccess(true); // Show success animation
      setTimeout(() => {
        navigation.replace('Home');
      }, 3000);
    } else {
      setEnteredPin('');
      setWrong(true);
      setTimeout(() => {
        setWrong(false);
      }, 2000);
    }
  };

  const handleForgotPassword = () => {
    // Implement your forgot password logic here
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Reference for each PIN input field
  const pinInputRefs = useRef<Array<TextInput | null>>([]);
  const pinInput1Ref = useRef<TextInput | null>(null);
  const pinInput2Ref = useRef<TextInput | null>(null);
  const pinInput3Ref = useRef<TextInput | null>(null);
  const pinInput4Ref = useRef<TextInput | null>(null);

  pinInputRefs.current = [
    pinInput1Ref,
    pinInput2Ref,
    pinInput3Ref,
    pinInput4Ref,
  ];

  const handlePinInput = (index: number, value: string) => {
    setEnteredPin(prevPin => {
      const pinArray = prevPin.split('');
      pinArray[index] = value;

      return pinArray.join('');
    });

    if (value === '' && index > 0) {
      // If backspace is pressed and it's not the first digit, focus the input of the previous digit
      const previousInput = pinInputRefs.current[index - 1];
      previousInput?.focus();
    } else if (value && index < 3) {
      // If value is entered and it's not the last digit, focus the input of the next digit
      const nextInput = pinInputRefs.current[index + 1];
      nextInput?.focus();
    }
  };

  return (
    <View style={styles.container}>
      <LottieView
            source={require('../assets/graphics/password.json')}
            autoPlay
            loop
            style={styles.animation}
          />
      <Text style={styles.title}>Enter PIN to unlock</Text>
      <View style={styles.pinContainer}>
        {[...Array(4)].map((_, index) => (
          <TextInput
            key={index}
            ref={ref => (pinInputRefs.current[index] = ref)}
            style={styles.pinInput}
            value={enteredPin[index] || ''}
            onChangeText={value => handlePinInput(index, value)}
            keyboardType="numeric"
            maxLength={1}
            secureTextEntry={!showPassword} // Toggle secure entry based on showPassword state
            autoFocus={index === 0}
            onSubmitEditing={index === 3 ? handleUnlock : undefined}
          />
        ))}

        <TouchableOpacity onPress={togglePasswordVisibility}>
          <FontAwesome5
            name={showPassword ? 'eye-slash' : 'eye'}
            size={24}
            color={showPassword ? 'black' : 'gray'}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.forgotPasswordButton} onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordButtonText}>Forgot Password?</Text>
      </TouchableOpacity>


      {wrong && (
        <View style={styles.animationContainer}>
          <LottieView
            source={require('../assets/graphics/failed.json')}
            autoPlay
            loop={false}
            style={styles.animation}
          />
        </View>
      )}

      {success && (
        <View style={styles.animationContainer}>
          <LottieView
            source={require('../assets/graphics/success.json')}
            autoPlay
            loop={false}
            style={styles.animation}
          />
        </View>
      )}
    </View>
  );
};

export default Lock;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: -150,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    color: '#1e272e',
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinInput: {
    width: 50,
    height: 90,
    marginHorizontal: 5,
    borderColor: 'rgba(0,0,0,0.2)',

    borderBottomWidth: 1,
    textAlign: 'center',
    fontSize: 40,
    color: '#1e272e',
  },
  forgotPasswordButton: {
    marginTop: 10,
  },
  forgotPasswordButtonText: {
    color: '#007bff',
    fontSize: 16,
  },
  animationContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 200,
    height: 200,
  },
});
