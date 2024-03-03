// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import LoadingScreen from './src/screens/LoadingScreen'; // Adjust the path as necessary
// import Login from './src/screens/Login'; // Adjust the path as necessary

// const Stack = createNativeStackNavigator();

// // export default function App() {
// //   return (
// //     <NavigationContainer>
// //       <Stack.Navigator>
// //         <Stack.Screen
// //           name="Loading"
// //           component={LoadingScreen}
// //           options={{ headerShown: false }}
// //         />
// //         {/* You can add more screens here */}
// //       </Stack.Navigator>
// //     </NavigationContainer>
// //   );
// // }



// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           name="Loading"
//           component={LoadingScreen}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="Login"
//           component={Login}
//           options={{ headerShown: false }} // You can set this to true if you want a header for the Login screen
//         />
//         {/* Other screens can be added here */}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import LoadingScreen from './src/screens/LoadingScreen';
import Login from './src/screens/Login';

const Stack = createNativeStackNavigator();

const fetchFonts = () => {
  return Font.loadAsync({
    'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
    'Urbanist-Medium': require('./assets/fonts/Urbanist-Medium.ttf'),
    'Urbanist-Bold': require('./assets/fonts/Urbanist-Bold.ttf'),
    // Load other fonts here
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
          name="Loading"
          component={LoadingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        {/* You can add more screens here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
