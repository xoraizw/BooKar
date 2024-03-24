import React, { useState } from 'react';
import { Image, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { styles } from '../../assets/styles/loginStyles'

const usernameIcon = require('../../assets/images/username-icon.png');
const passwordIcon = require('../../assets/images/pw-icon.png');
const googleIcon = require('../../assets/images/google-icon.png');

const Login = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');

  const handleUsernameChange = (text) => {
    setUsername(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.100.15:3000/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: username,
          password,
        }),
      })
      .then(response => {
        if (response.ok) {
          navigation.navigate('HomePage', {
            emailProp: username,
          });
        } 
        else {
          throw new Error('Failed to Login');
        }
      });
      
      const data = await response.json();
  
      console.log('Response:', response);
  
      if (response.ok) 
      {
        console.log('Login successful:', data.message);
        setLoginMessage(data.message);
      } 
      else 
      {
        console.error('Login failed:', data.message);
        setLoginMessage(data.message);
      }
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  };

  return (
    <View style={styles.body}>
      <Text style={styles.heading}>Login to Bookar</Text>
  
      {loginMessage ? <Text style={styles.loginMessage}>{loginMessage}</Text> : null}
  
      <View style={styles.inputGroup}>
        <Image source={usernameIcon} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#C4C4C4"
          value={username}
          onChangeText={handleUsernameChange}
        />
      </View>
  
      <View style={styles.inputGroup}>
        <Image source={passwordIcon} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#C4C4C4"
          secureTextEntry={true}
          value={password}
          onChangeText={handlePasswordChange}
        />
      </View>
  
      <View style={styles.rememberMeContainer}>
        <TouchableOpacity onPress={handleRememberMeChange} style={styles.checkbox}>
          {rememberMe && <Image source={passwordIcon} style={styles.checkIcon} />}
        </TouchableOpacity>
        <Text style={styles.rememberMeLabel}>Remember me</Text>
      </View>
  
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginBtnText}>Login</Text>
      </TouchableOpacity>
  
      <View style={styles.googleContainer}>
        <Text style={styles.continueWithText}>or continue with</Text>
        <TouchableOpacity style={styles.googleBtn}>
          <Image source={googleIcon} style={styles.googleIcon} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('UserType')}>
          <Text style={styles.signUpLink}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Login;