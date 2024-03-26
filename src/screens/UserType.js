import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../assets/styles/usertypeStyles';

const SignupScreen = () => {
  const [userType, setUserType] = useState('');
  const navigation = useNavigation();

  const handleNext = () => {
    navigation.navigate('SignUp1');
  };

  return (
    <View style={{ backgroundColor: '#00170C', flex: 1, justifyContent: 'space-between' }}>
      <View style={[styles.joinFamilyContainer, { left: 27, top: 58, width: 286, height: 258 }]}>
        <Text style={styles.joinFamilyText}>Join the Family</Text>
      </View>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

          <TouchableOpacity
            onPress={() => setUserType('Guest')}
            style={[styles.touchableOpacity, userType === 'Guest' && styles.selected]}
          >
            <Image
              source={require('../../assets/images/xxxxx.jpg')}
              // source={require('../assets/images/xxxxx.jpg')}
              style={[
                styles.icon,
                { width: 138, height: 140 },
                userType === 'Guest' && styles.selectedImage,
              ]}
            />
          </TouchableOpacity>
          <TouchableOpacity
          onPress={() => setUserType('Host')}
          style={[
            styles.touchableOpacity,
            userType === 'Host' && styles.selected,
            { backgroundColor: 'transparent' } // Set background color to transparent
          ]}
        >
          <Image
            source={require('../../assets/images/xxxx.jpg')}
            style={[
              styles.icon,
              { width: 138, height: 140 },
              userType === 'Host' && styles.selectedImage,
            ]}
          />
        </TouchableOpacity>
        </View>
      </View>
      {userType === 'Host' || userType === 'Guest' ? (
        <TouchableOpacity
          onPress={handleNext}
          style={[styles.nextButton, { backgroundColor: '#D45A01', borderRadius: 26.5 }]}
        >
          <Text style={{ color: '#FFF' }}>Next</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default SignupScreen;
