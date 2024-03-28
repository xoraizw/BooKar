import React, { useEffect, useRef } from 'react';
import { Animated, View, Image, Dimensions } from 'react-native';
import { styles } from '../../assets/styles/loadingscreenStyles';

const screenWidth = Dimensions.get('window').width;
const loadingLineWidth = screenWidth * 0.8;

const LoadingScreen = ({ navigation }) => {
  const widthAnim = useRef(new Animated.Value(loadingLineWidth)).current;

  useEffect(() => {
    const animateLoading = () => {
      Animated.timing(widthAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false,
      }).start(() => {
        navigation.navigate('Login');
        // Reset the animation to its initial value when navigation completes
        widthAnim.setValue(loadingLineWidth);
      });
    };

    // Start the animation on initial render
    animateLoading();

    // Run the animation again when the component re-renders
    const unsubscribe = navigation.addListener('focus', () => {
      animateLoading();
    });

    // Clean up the listener when the component unmounts
    return unsubscribe;
  }, [navigation, widthAnim]);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/Logo.png')} style={styles.logo} />
      <Animated.View
        style={[
          styles.loadingLine,
          {
            width: widthAnim,
          },
        ]}
      />
    </View>
  );
};
export default LoadingScreen;