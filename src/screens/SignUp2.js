
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, Animated} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from '../../assets/styles/signup2Styles';
import { ipAddr } from './ipconfig';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const Screen3 = ({ navigation, route }) => {
  const { userType, username, email, phoneNumber, password } = route.params;
  const [fullName, setFullName] = useState('');
  // const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');
  const [age, setAge] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [slideDownAnim] = useState(new Animated.Value(-50));
  const [fadeAnim] = useState(new Animated.Value(0));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [dateSelected, setDateSelected] = useState(false);
  const [isGenderPickerVisible, setIsGenderPickerVisible] = useState(false);
  const [isCityPickerVisible, setIsCityPickerVisible] = useState(false);

  // Function to calculate age from date of birth
  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age.toString(); // Return age as a string to set it directly in the age input
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(false); // Hide the date picker
    setDateOfBirth(currentDate);
    setDateSelected(true); // Update state to indicate the user has selected a date
    setAge(calculateAge(currentDate)); // Automatically calculate and set age
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  };

  const slideDown = () => {
    Animated.timing(slideDownAnim, {
      toValue: Platform.OS === 'ios' ? -350 : 0, // Adjust this value to slide to the correct position from the top
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  
  const slideUp = () => {
    Animated.timing(slideDownAnim, {
      toValue: -1000, // Start off-screen, above the view
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  
  
  const setErrorMessageWithAnimation = (message) => {
    setErrorMessage(message);
    fadeIn();
    slideDown();
  
    setTimeout(() => {
      fadeOut();
      slideUp();
    }, 3000); // Adjust timing as needed
  };

  const errorBubbleStyle = {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: 'red', // Red bubble
    borderRadius: 20, // Rounded corners
    padding: 10,
    paddingHorizontal: 20,
    zIndex: 10, // Ensure it's above other components
  };

  const isValidFullName = (fullName) => {
    const nameRegex = /^[A-Za-z ]{5,20}$/;
    return nameRegex.test(fullName);
  };
  

  const validateAndNavigate = () => {
    if (!fullName || !dateOfBirth || !gender || !city || !age) {
      setErrorMessageWithAnimation('All fields are required.');
    } else if (!isValidFullName(fullName)) {
      setErrorMessageWithAnimation('Full name must be between 5 and 20 alphabetic characters.');
    } else if (isNaN(Number(age))) {
      setErrorMessageWithAnimation('Age must be a number.');
    } else {
      fetch(`http://${ipAddr}:3000/create-profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName, userType, username, email, phoneNumber, password, age: Number(age), gender, city
        }),
      })
      .then(response => {
        if (response.status === 201) {
          navigation.navigate('Verification', { email: email , userType: userType});
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
      <Animated.View
          style={[
            errorBubbleStyle,
            { 
              opacity: fadeAnim,
              transform: [{ translateY: slideDownAnim }] // Animate vertical position
            }
          ]}
        >
          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      </Animated.View>
      <View style={styles.inputContainer}>
        <View style={styles.inputIcon}>
          <TextInput style={styles.input} placeholder="Full Name" placeholderTextColor="rgba(255, 255, 255, 0.75)" onChangeText={setFullName} />
          <Image source={require('../../assets/images/fullname-icon.png')} style={styles.icon} />
        </View>

        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.inputIcon}>
        <View style={styles.ageContainer}>  
          <Text style={styles.ageText}>{dateSelected ? dateOfBirth.toDateString() : 'Set Birth Date'}</Text>
          <Image source={require('../../assets/images/calender-icon.png')} style={styles.icon} />
        </View>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={dateOfBirth}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onDateChange}
          />
        )}
      
        <View style={styles.inputIcon}>
          <TouchableOpacity 
            style={styles.pickerContainer} 
            onPress={() => setIsGenderPickerVisible(true)}
          >
            <Image source={require('../../assets/images/gender-icon.png')} style={styles.icon} />
            <View style={styles.pickerInnerContainer}>
              <Text style={styles.pickerText}>
                {gender || ""}
              </Text>
              <Ionicons name="chevron-down" size={24} color="gray" style={styles.downArrowIcon} />
            </View>
          </TouchableOpacity>
          {isGenderPickerVisible && (
            <View style={styles.pickerWrapper}>
              <RNPickerSelect
                onValueChange={(value) => {
                  setGender(value);
                  setIsGenderPickerVisible(false); // Hide picker after selection
                }}
                items={[
                  { label: 'Male', value: 'Male' },
                  { label: 'Female', value: 'Female' },
                ]}
                style={pickerSelectStyles}
                placeholder={{ label: "Gender", value: 'Male' }}
                value={gender}
                useNativeAndroidPickerStyle={false}
              />
            </View>
          )}
        </View>

        <View style={styles.inputIcon}>
          <TouchableOpacity 
            style={styles.pickerContainer} 
            onPress={() => setIsCityPickerVisible(true)}
          >
            <Image source={require('../../assets/images/city-icon.png')} style={styles.icon} />
            <View style={styles.pickerInnerContainer}>
              <Text style={styles.pickerText}>
                {city || "City"}
              </Text>
              <Ionicons name="chevron-down" size={24} color="gray" style={styles.downArrowIcon} />
            </View>
          </TouchableOpacity>
          {isCityPickerVisible && (
            <View style={styles.pickerWrapper}>
              <RNPickerSelect
                onValueChange={(value) => {
                  setCity(value);
                  setIsCityPickerVisible(false); // Hide picker after selection
                }}
                items={[
                  { label: 'Lahore', value: 'Lahore' },
                  { label: 'Karachi', value: 'Karachi' },
                  { label: 'Islamabad', value: 'Islamabad' },
                ]}
                style={pickerSelectStyles}
                placeholder={{ label: "City", value: 'Lahore' }}
                value={city}
                useNativeAndroidPickerStyle={false}
              />
            </View>
          )}
        </View>

        <View style={styles.inputIcon}>
          <View style={styles.ageContainer}>
            <Text style={styles.ageText}>
              {age ? `${age} years` : 'Age'}
            </Text>
            <Image source={require('../../assets/images/username-icon.png')} style={styles.icon} />
          </View>
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

const pickerSelectStyles = StyleSheet.create({
  // ... other styles

  // Style for the view that RNPickerSelect uses to wrap the picker
  viewContainer: {
    alignSelf: 'stretch', // Stretch to fill the width of the parent

  },
  
  // This style is applied to the input field (the placeholder in this case)
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#853902',
    backgroundColor: '#853902',
    borderRadius: 13,
    color: '#C4C4C4',
    paddingRight: 30, // to ensure the text is never behind the icon
    width: '100%', // Match the width of the input field
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#853902',
    backgroundColor: '#853902',
    borderRadius: 13,
    color: '#C4C4C4',
    paddingRight: 30, // to ensure the text is never behind the icon
    width: '100%', // Match the width of the input field
  },
});



export default Screen3;
