import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { styles } from '../../assets/styles/verificationStyles';

export default function App() {
  const [code, setCode] = useState(['', '', '', '']);
  const [statusText, setStatusText] = useState('Status');
  const [timer, setTimer] = useState(10);
  const [codeError, setCodeError] = useState(false);
  const inputRefs = useRef([]);
  const navigation = useNavigation();

  useEffect(() => {
    if (timer > 0) {
      const timerInterval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(timerInterval);
    } else {
      setStatusText('Resend Code?');
    }
  }, [timer]);

  const verifyCode = async () => {
    const enteredCode = code.join('');
    if (enteredCode.length === 4 && /^\d{4}$/.test(enteredCode)) { 
      console.log('Verification successful');
      navigation.navigate('HomePage');
    } 
    else 
    {
      setCodeError(true);
      console.log('Invalid code'); 
    }
  };

  const handleChangeText = (index, value) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setCodeError(false);

    if (value.length === 1 && index < code.length - 1) {
      inputRefs.current[index + 1].focus();
    }

    if (value.length === 0 && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const resendCode = () => {
    setTimer(10);
    setStatusText('Status');
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => {}}>
            <Text style={styles.backButtonText}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Almost There</Text>
        </View>
        <View style={styles.content}>
          <Image source={require('../../assets/images/checkmark.jpeg')} style={styles.checkmark} />
          <Text style={styles.subtitle}>Code has been sent to your Email</Text>
          <View style={styles.codeInputContainer}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.codeInput}
                onChangeText={(value) => handleChangeText(index, value)}
                value={digit}
                maxLength={1}
                keyboardType="numeric"
                ref={(ref) => (inputRefs.current[index] = ref)}
                onSubmitEditing={() => index === code.length - 1 && verifyCode()}
              />
            ))}
          </View>
          {codeError && (
              <Text style={styles.errorText}>Please enter a valid code</Text>
          )}
          {timer > 0 ? (
            <Text style={styles.status}>
              Time left:{' '}
              <Text style={{ color: '#ff6600' }}>{timer}</Text>
              s
            </Text>
          ) : (
            <TouchableOpacity style={styles.resendButton} onPress={resendCode}>
              <Text style={styles.resendButtonText}>Resend Code</Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={styles.button} onPress={verifyCode}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}