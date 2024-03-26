import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from '../../assets/styles/signup2Styles'

const Screen3 = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');
  const [age, setAge] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validateAndNavigate = () => {
    if (!fullName || !dateOfBirth || !gender || !city || !age) {
      setErrorMessage('All fields are required.');
    } else if (isNaN(Number(age))) {
      setErrorMessage('Age must be a number.');
    } else {
      setErrorMessage(''); // Clear error message if validation passes
      // Assuming your server endpoint for posting user information is '/signup'
      fetch('http://192.168.100.15:3000/create-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          // dateOfBirth,
          // gender,
          // city,
          age: Number(age),
        }),
      })
        .then(response => {
          if (response.ok) {
            navigation.navigate('Verification');
          } else {
            throw new Error('Failed to create user');
          }
        })
        .catch(error => {
          console.error('Signup error:', error);
          Alert.alert('Error', 'Failed to create user. Please try again later.');
        });
    }
  };
  return (
    <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Screen2')}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <Image source={require('../../assets/images/profilepic.png')} style={styles.image} />
      <Text style={styles.subheading}>Add Profile Picture</Text>
      <View style={styles.errorContainer}>
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputIcon}>
          <TextInput style={styles.input} placeholder="Full Name" placeholderTextColor="rgba(255, 255, 255, 0.75)" onChangeText={setFullName} />
          <Image source={require('../../assets/images/fullname-icon.png')} style={styles.icon} />
        </View>
        <View style={styles.inputIcon}>
          <TextInput style={styles.input} placeholder="Date of Birth" placeholderTextColor="rgba(255, 255, 255, 0.75)" onChangeText={setDateOfBirth} />
          <Image source={require('../../assets/images/calender-icon.png')} style={styles.icon} />
        </View>
        <View style={styles.inputIcon}>
          <TextInput style={styles.input} placeholder="Gender" placeholderTextColor="rgba(255, 255, 255, 0.75)" onChangeText={setGender} />
          <Image source={require('../../assets/images/gender-icon.png')} style={styles.icon} />
        </View>
        <View style={styles.inputIcon}>
          <TextInput style={styles.input} placeholder="City" placeholderTextColor="rgba(255, 255, 255, 0.75)" onChangeText={setCity} />
          <Image source={require('../../assets/images/city-icon.png')} style={styles.icon} />
        </View>
        <View style={styles.inputIcon}>
          <TextInput style={styles.input} placeholder="Age" placeholderTextColor="rgba(255, 255, 255, 0.75)" onChangeText={setAge} />
          <Image source={require('../../assets/images/username-icon.png')} style={styles.icon} />
        </View>
      </View>
      <TouchableOpacity
        style={[styles.button, styles.buttonBackground, styles.nextButton]}
        onPress={validateAndNavigate}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Screen3;
