import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet, Image, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const loadingLineWidth = screenWidth * 0.8; // 80% of screen width to account for 10% margins on each side

const LoadingScreen = ({ navigation }) => {
  const widthAnim = useRef(new Animated.Value(loadingLineWidth)).current;

  // useEffect(() => {
  //   // Start the animation
  //   Animated.timing(widthAnim, {
  //     toValue: 0,
  //     duration: 3000, // Adjust the duration as needed
  //     useNativeDriver: false, // width is not supported by native driver, set to false
  //   }).start(() => {
  //     // If you want to navigate to a new screen after the animation completes
  //     navigation.navigate('NextScreen');
  //   });
  // }, [widthAnim]);

  useEffect(() => {
    // Start the animation
    const animation = Animated.timing(widthAnim, {
      toValue: 0,
      duration: 1000, // Adjust the duration as needed
      useNativeDriver: false, // width is not supported by native driver, set to false
    });
  
    animation.start(() => {
      navigation.navigate('Login'); // Use the 'Login' screen name
    });
  
    // Return a function to stop the animation if the component unmounts
    return () => animation.stop();
  }, [navigation, widthAnim]);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      <Animated.View
        style={[
          styles.loadingLine,
          {
            width: widthAnim, // Animated width
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00170C',
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 20, // Space below the logo
  },
  loadingLine: {
    height: 1.5,
    backgroundColor: '#D45A01',
    marginTop: 20, // Space above the line
  },
});

export default LoadingScreen;
