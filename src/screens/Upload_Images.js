import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const UploadImagesScreen = ({route}) => {
  const navigation = useNavigation();
  const {email} = route.params;

  const handleUpload = (type) => {
    // Handle the upload action (e.g., opening the image picker)
    console.log(`Upload for ${type}`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#C4C4C4" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Upload Images</Text>
      </View>
      
      <View style={styles.uploadSection}>
        <Text style={styles.sectionTitle}>Cover Image</Text>
        <TouchableOpacity
          style={styles.uploadBox}
          onPress={() => handleUpload('cover')}
        >
          <Text style={styles.uploadText}>Click To Upload</Text>
          <TouchableOpacity style={styles.browseButton}>
            <Text style={styles.browseButtonText}>Browse</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>

      <View style={styles.uploadSection}>
        <Text style={styles.sectionTitle}>Gallery Images</Text>
        <TouchableOpacity
          style={styles.uploadBox}
          onPress={() => handleUpload('gallery')}
        >
          <Text style={styles.uploadText}>Click To Upload</Text>
          <TouchableOpacity style={styles.browseButton}>
            <Text style={styles.browseButtonText}>Browse</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
      <Image source={require('../../assets/images/bar3.png')} style={styles.barImage} />

      <TouchableOpacity style={styles.continueButton}onPress={() => navigation.navigate('CreateSuccess', { email: email })}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    barImage: {
        marginLeft: 60,
        marginTop: 75,
      },
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  headerTitle: {
    color: '#D45A01',
    fontSize: 16,
    marginLeft: 10,
    fontFamily: 'Montserrat-Regular',
  },
  uploadSection: {
    padding: 20,
  },
  sectionTitle: {
    color: '#C4C4C4',
    fontSize: 12,
    marginBottom: 30,
    fontFamily: 'Montserrat-Regular',

  },
  uploadBox: {
    borderColor: '#D45A01',
    borderWidth: 0.3,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft  : 50,
    width: 274, // Add this line
    height: 210,
  },
  uploadText: {
    color: '#C4C4C4',
    marginBottom: 10,
    fontFamily: 'Montserrat-Regular',
fontSize: 14.33,
  },
  browseButton: {
    backgroundColor: '#D45A01',
    padding: 10,
    borderRadius: 5,
  },
  browseButtonText: {
    color: '#C4C4C4',
    fontFamily: 'Montserrat-Regular',
    fontSize: 13.33,

  },
  continueButton: {
    backgroundColor: 'rgba(212, 90, 1, 0.5)',
    paddingVertical: 15, // Adjust this to control the button's height
    paddingHorizontal: 20, // Adjust this to control the button's width
    margin: 20,
    marginHorizontal: 60,   
    borderRadius: 26.5,
    alignItems: 'center',
    marginTop: 18,
    width: 238,
     // Keep this if you want a fixed width
     marginLeft : 90,
  },
  continueButtonText: {
    color: '#C4C4C4',
    fontFamily: 'Urbanist-Bold',
    fontSize: 17,
  },
});

export default UploadImagesScreen;
