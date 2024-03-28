import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { Platform } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from '../../assets/styles/signup1Styles';


const Screen2 = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [reEnterPassword, setReEnterPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validateAndNavigate = async () => {
    if (!username || !email || !phoneNumber || !password || !reEnterPassword) {
      setErrorMessage('All fields are required.');
    } else if (password !== reEnterPassword) {
      setErrorMessage('Passwords do not match.');
    } else if (!isValidEmail(email)) {
      setErrorMessage('Invalid email address.');
    } else if (!isValidPassword(password)) {
      setErrorMessage('Password must be at least 8 characters long.');
    } else {
      setErrorMessage(''); // Clear error message if validation passes
      try {
        const response = await fetch('http://10.130.42.94:3000/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            email,
            password,
            phoneNumber: phoneNumber,
          }),
        });
  
        if (response.ok) {
          navigation.navigate('SignUp2');
        } else {
          throw new Error('Failed to sign up');
        }
      } catch (error) {
        console.error('Signup error:', error);
        Alert.alert('Error', 'Failed to sign up');
      }
    }
  };
  
  const isValidEmail = (email) => {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const isValidPassword = (password) => {
    // Password must be at least 8 characters long
    return password.length >= 8;
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >

    <View style={styles.container}>

      <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Signup')}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
        <Text style={styles.settingYou}>Setting you</Text>
        <Text style={styles.up}>up</Text>
      </View>
      <View style={styles.errorContainer}>
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputIcon}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="rgba(255, 255, 255, 0.75)"
            onChangeText={setUsername}
          />
          <Image source={require('../../assets/images/username-icon.png')} style={styles.icon} />
        </View>
        <View style={styles.inputIcon}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="rgba(255, 255, 255, 0.75)"
            onChangeText={setEmail}
          />
          <Image source={require('../../assets/images/email-icon.png')} style={styles.icon} />
        </View>
        <View style={styles.inputIcon}>
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="rgba(255, 255, 255, 0.75)"
            onChangeText={setPhoneNumber}
          />
          <Image source={require('../../assets/images/phone-icon.png')} style={styles.icon} />
        </View>
        <View style={styles.inputIcon}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="rgba(255, 255, 255, 0.75)"
            secureTextEntry
            onChangeText={setPassword}
          />
          <Image source={require('../../assets/images/pw-lock-icon.png')} style={styles.icon} />
        </View>
        <View style={styles.inputIcon}>
          <TextInput
            style={styles.input}
            placeholder="Re-enter Password"
            placeholderTextColor="rgba(255, 255, 255, 0.75)"
            secureTextEntry
            onChangeText={setReEnterPassword}
          />
          <Image source={require('../../assets/images/pw-lock-icon.png')} style={styles.icon} />
        </View>
      </View>
      <View style={styles.termsContainer}>
  <TouchableOpacity style={styles.checkbox} />

  <Text style={styles.acceptText}>Accept</Text>
  <Text style={styles.termsText}>Terms & Conditions</Text>
</View>
      <TouchableOpacity
        style={[styles.button, styles.buttonBackground]}
        onPress={validateAndNavigate}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
    </KeyboardAvoidingView>
  );
  };  
  Screen2.navigationOptions = {
    headerShown: false,
  };

export default Screen2;
