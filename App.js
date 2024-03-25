import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

import LoadingScreen from './src/screens/LoadingScreen';
import Login from './src/screens/Login';

import UserType from './src/screens/UserType';
import SignUp1 from './src/screens/SignUp1';
import SignUp2 from './src/screens/SignUp2';

import Search from './src/screens/Search';

import Verification from './src/screens/Verification';
import HomePage from './src/screens/Homepage';

import RecentlyBooked from './src/screens/RecentlyBooked';
import UserProfile from './src/screens/UserProfile';

import Booking from './src/screens/BookSlot'
import MapScreen from './src/screens/mapScreen'

const Stack = createNativeStackNavigator();

const fetchFonts = () => {
  return Font.loadAsync({
    'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
    'Urbanist-Medium': require('./assets/fonts/Urbanist-Medium.ttf'),
    'Urbanist-Bold': require('./assets/fonts/Urbanist-Bold.ttf'),
  });
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Booking"
          component={Booking}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Loading"
          component={LoadingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="UserType" 
          component={UserType} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="SignUp1" 
          component={SignUp1}  
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="SignUp2" 
          component={SignUp2} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Verification" 
          component={Verification} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="HomePage" 
          component={HomePage} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Search" 
          component={Search} 
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RecentlyBooked"
          component={RecentlyBooked}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserProfile"
          component={UserProfile}
          options={{ headerShown: false }}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
