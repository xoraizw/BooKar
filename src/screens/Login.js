// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [rememberMe, setRememberMe] = useState(false);
//   const [loginMessage, setLoginMessage] = useState('');

//   const handleUsernameChange = (text) => {
//     setUsername(text);
//   };

//   const handlePasswordChange = (text) => {
//     setPassword(text);
//   };

//   const handleRememberMeChange = () => {
//     setRememberMe(!rememberMe);
//   };

//   const handleLogin = async () => {
//     try {
//       const response = await fetch('http://localhost:3000/api/signup', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: username,
//           password,
//         }),
//       });
      
  
//       const data = await response.json();
  
//       console.log('Response:', response); // Log the entire response for debugging
  
//       if (response.ok) {
//         // Login successful
//         console.log('Login successful:', data.message);
//         setLoginMessage(data.message);
//       } else {
//         // Login failed
//         console.error('Login failed:', data.message);
//         setLoginMessage(data.message);
//       }
//     } catch (error) {
//       console.error('Error during login:', error.message);
//     }
//   };
  

//   return (
//     <View style={styles.body}>
//       <View style={styles.fullPageContainer}>
//         <Text style={styles.heading}>Login to BookKar</Text>

//         {loginMessage ? <Text style={styles.loginMessage}>{loginMessage}</Text> : null}

//         <View style={styles.inputGroup}>
//           <Text style={[styles.label, username ? styles.hiddenLabel : '']}>Username:</Text>
//           <TextInput
//             style={[styles.input, { width: '80%', color: '#fff' }]}
//             value={username}
//             onChangeText={handleUsernameChange}
//             required
//           />
//         </View>

//         <View style={styles.inputGroup}>
//           <Text style={[styles.label, password ? styles.hiddenLabel : '']}>Password:</Text>
//           <TextInput
//             style={[styles.input, { width: '80%', color: '#fff' }]}
//             secureTextEntry={true}
//             value={password}
//             onChangeText={handlePasswordChange}
//             required
//           />
//         </View>

//         <View style={[styles.inputGroup, styles.rememberMe]}>
//           <TouchableOpacity onPress={handleRememberMeChange}>
//             <View style={styles.checkbox} />
//           </TouchableOpacity>
//           <Text style={styles.rememberMeLabel}>Remember me</Text>
//         </View>

//         <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
//           <Text style={styles.loginBtnText}>Login</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   body: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#00170c',
//     color: '#D45A01',
//   },
//   fullPageContainer: {
//     alignItems: 'center',
//     textAlign: 'center',
//   },
//   heading: {
//     fontSize: 24,
//     color: '#D45A01',
//     marginBottom: 20,
//   },
//   inputGroup: {
//     marginBottom: 15,
//   },
//   label: {
//     textAlign: 'left',
//     marginBottom: 5,
//     fontWeight: 'bold',
//     color: '#D45A01',
//   },
//   input: {
//     width: '100%',
//     padding: 8,
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: '#D45A01',
//     borderRadius: 4,
//   },
//   rememberMe: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   checkbox: {
//     width: 20,
//     height: 20,
//     borderWidth: 1,
//     borderColor: '#D45A01',
//     marginRight: 10,
//     backgroundColor: '#fff',
//   },
//   rememberMeLabel: {
//     color: '#D45A01',
//   },
//   loginBtn: {
//     backgroundColor: '#D45A01',
//     padding: 10,
//     borderRadius: 4,
//     alignItems: 'center',
//   },
//   loginBtnText: {
//     color: '#fff',
//   },
//   hiddenLabel: {
//     display: 'none',
//   },
//   loginMessage: {
//     color: 'green', // Change the color to your preference
//     marginTop: 10,
//   },
// });

// export default Login;

import React, { useState } from 'react';
import { Image, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import LoadingScreen from './LoadingScreen';

const usernameIcon = require('../../assets/images/username-icon.png');
const passwordIcon = require('../../assets/images/pw-icon.png');
const googleIcon = require('../../assets/images/google-icon.png');

const Login = () => {
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
      const response = await fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: username,
          password,
        }),
      });
      
  
      const data = await response.json();
  
      console.log('Response:', response); // Log the entire response for debugging
  
      if (response.ok) {
        // Login successful
        console.log('Login successful:', data.message);
        setLoginMessage(data.message);
      } else {
        // Login failed
        console.error('Login failed:', data.message);
        setLoginMessage(data.message);
      }
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  };

  return (
    <View style={styles.body}>
      <Text style={styles.heading}>Login to BookKar</Text>
  
      {loginMessage ? <Text style={styles.loginMessage}>{loginMessage}</Text> : null}
  
      <View style={styles.inputGroup}>
        <Image source={require('../../assets/images/username-icon.png')} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#C4C4C4"
          value={username}
          onChangeText={handleUsernameChange}
        />
      </View>
  
      <View style={styles.inputGroup}>
        <Image source={require('../../assets/images/pw-icon.png')} style={styles.icon} />
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
          {/* Add the tick mark image inside the checkbox if rememberMe is true */}
          {rememberMe && <Image source={require('../../assets/images/pw-icon.png')} style={styles.checkIcon} />} {/*change the pw-icon later*/}
        </TouchableOpacity>
        <Text style={styles.rememberMeLabel}>Remember me</Text>
      </View>
  
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginBtnText}>Login</Text>
      </TouchableOpacity>
  
      {/* Continue with Google button */}
      <View style={styles.googleContainer}>
        <Text style={styles.continueWithText}>or continue with</Text>
        <TouchableOpacity style={styles.googleBtn}>
          {/* Add the Google icon image */}
          <Image source={require('../../assets/images/google-icon.png')} style={styles.googleIcon} />
        </TouchableOpacity>
      </View>
  
      {/* Sign up link */}
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Don’t have an account? </Text>
        <TouchableOpacity onPress={LoadingScreen}> {/* Replace 'LoadingScreen' with the name of your sign up screen later. */}
          <Text style={styles.signUpLink}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00170C',
  },
  heading: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 45,
    color: '#D45A01',
    marginBottom: 60, // Adjust as per your design spacing
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 58, // Adjust height as per your design
    backgroundColor: 'rgba(133, 57, 2, 0.75)',
    borderRadius: 10,
    paddingLeft: 50, // Adjust based on your icon size and padding needs
    fontFamily: 'Urbanist-Medium',
    fontSize: 17,
    color: '#C4C4C4',
    marginRight: 20, // If you need space between input and screen edge
  },
  icon: {
    position: 'absolute',
    left: 15,
    width: 20,
    height: 20,
    zIndex: 1,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30, // Adjust as per your design spacing
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#D45A01',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkIcon: {
    width: 18,
    height: 18,
  },
  rememberMeLabel: {
    fontFamily: 'Urbanist-Medium',
    fontSize: 17,
    color: '#C4C4C4',
  },
  loginBtn: {
    width: '80%', // Match input width
    backgroundColor: 'rgba(133, 57, 2, 0.75)',
    borderRadius: 26.5,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 20, // Adjust as per your design spacing
  },
  loginBtnText: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 17,
    color: '#fff',
  },
  googleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  continueWithText: {
    fontFamily: 'Urbanist-Medium',
    fontSize: 17,
    color: '#C4C4C4',
    marginBottom: 10,
  },
  googleBtn: {
    width: 58, // Adjust as per your design
    height: 58, // Adjust as per your design
    backgroundColor: 'rgba(133, 57, 2, 0.75)',
    borderRadius: 26.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleIcon: {
    width: 24,
    height: 24,
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20, // Adjust as per your design spacing
  },
  signUpText: {
    fontFamily: 'Urbanist-Regular',
    fontSize: 14,
    color: '#C4C4C4',
  },
  signUpLink: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 14,
    color: '#D45A01',
  },
});


export default Login;