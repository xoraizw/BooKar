import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';

// Mock database entries
const mockListings = [
  // {
  //   field_name: 'Indoor Court',
  //   field_display: require('../../assets/images/5_gen.png'),
  // },
  // {
  //   field_name: 'Outdoor Court Small',
  //   field_display: require('../../assets/images/5_gen.png'),
  // },
  // {
  //   field_name: 'Outdoor Court Large',
  //   field_display: require('../../assets/images/5_gen.png'),
  // },
];

const ManageListingsScreen = () => {
  const handleBackPress = () => {
    // Implement functionality for back press here
  };

  const navigation = useNavigation();

  const [loaded] = useFonts({
    LatoBold: require('../../assets/fonts/Lato/static/Lato-Bold.ttf'), // Import Lato Bold font
    LatoRegular: require('../../assets/fonts/Lato/static/Lato-Regular.ttf'),
    UrbanistRegular: require('../../assets/fonts/Urbanist/static/Urbanist-Regular.ttf'),
    UrbanistBold: require('../../assets/fonts/Urbanist/static/Urbanist-SemiBold.ttf'),
    UrbanistMedium: require('../../assets/fonts/Urbanist/static/Urbanist-Medium.ttf'),
    UrbanistSemiBold: require('../../assets/fonts/Urbanist/static/Urbanist-SemiBold.ttf'),
    UrbanistLight: require('../../assets/fonts/Urbanist/static/Urbanist-Light.ttf'), // Added UrbanistLight font
    MontserratBold: require('../../assets/fonts/Montserrat/static/Montserrat-Bold.ttf'),
    MontserratExtraLight: require('../../assets/fonts/Montserrat/static/Montserrat-ExtraLight.ttf'),
    MontserratSemiBold: require('../../assets/fonts/Montserrat/static/Montserrat-SemiBold.ttf'),
    MontserratRegular: require('../../assets/fonts/Montserrat/static/Montserrat-Regular.ttf')
  });

  // State variable to manage pop-up visibility
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  // Animation value for sliding-up effect
  const slideUpAnimation = new Animated.Value(400); // Start from 400 (below screen)

  if (!loaded) {
    return null; // Render nothing while font is loading
  }

  if (mockListings.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackPress}>
            <Image
              source={require('../../assets/images/white_back_arrow.png')}
              style={styles.backArrow}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>Manage Listings</Text>
        </View>
        <View style={styles.warningContainer}>
          <View style={styles.warningPill}>
            <Image source={require('../../assets/images/warning.png')} style={styles.warningImage} />
            <Text style={styles.warningText}>You have currently no listings!</Text>
          </View>
        </View>
      </View>
    );
  }

  // Function to handle delete button click
  const handleDeleteListing = () => {
    setShowDeleteConfirmation(true);
    Animated.timing(slideUpAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Function to handle close button click
  const handleClose = () => {
    Animated.timing(slideUpAnimation, {
      toValue: 400,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setShowDeleteConfirmation(false));
  };

  const handleEditListing = () => {
    navigation.navigate('create'); // Navigate to CreateListings screen
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress}>
          <Image
            source={require('../../assets/images/white_back_arrow.png')}
            style={styles.backArrow}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Manage Listings</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {mockListings.map((listing, index) => (
          <View key={index} style={styles.listingContainer}>
            <Image
              source={listing.field_display}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.bottomHalf}>
              <Text style={styles.fieldName}>{listing.field_name}</Text>
              <Text style={styles.fieldLocation}>{listing.field_location}</Text>
              <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button, styles.editButton]} onPress={handleEditListing}>
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDeleteListing}>
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
        <View style={{ height: 50 }} />
      </ScrollView>
      {showDeleteConfirmation && (
        <Animated.View style={[styles.deleteConfirmation, { transform: [{ translateY: slideUpAnimation }] }]}>
          <View style={styles.popup}>
            <Text style={styles.popupTitle}>Delete Listing</Text>
            <View style={styles.line}></View>
            <Text style={styles.confirmationText}>
              Are you sure you want to{' '}
              <Text style={styles.permanentlyText}>permanently</Text>{' '}
              delete your listing?
            </Text>
            <Text style={styles.additionalText}>
              Your listing and all its data will completely be lost. You cannot undo this action.
            </Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity onPress={handleClose} style={[styles.buttonNew, { backgroundColor: '#433434' }]}>
                <Text style={styles.buttonTextNew}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleClose} style={[styles.buttonNew, { backgroundColor: '#1AB65C' }]}>
                <Text style={styles.buttonTextNew}>Yes, Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  backArrow: {
    width: 28,
    height: 28,
    marginRight: 10,
  },
  headerText: {
    color: '#D45A01',
    fontSize: 16,
    fontFamily: 'MontserratRegular',
  },
  scrollContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  listingContainer: {
    width: 310,
    height: 272,
    marginBottom: 40,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  bottomHalf: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
    backgroundColor: 'rgba(212, 90, 1, 0.8)',
    borderRadius: 20,
    padding: 20,
    paddingTop: 15,
  },
  fieldName: {
    color: '#C4C4C4',
    fontSize: 20,
    fontFamily: 'LatoBold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: 124,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C4C4C4',
    borderWidth: 1,
    borderRadius: 8,
  },
  buttonText: {
    color: '#C4C4C4',
    fontFamily: 'LatoRegular',
    fontSize: 15,
  },
  editButton: {
    marginRight: 10,
  },
  deleteButton: {
    marginLeft: 10,
  },
  deleteConfirmation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 281,
    backgroundColor: 'transparent', // Transparent initially
    zIndex: 100, // Ensure pop-up appears above other content
  },
  popup: {
    width: 390,
    height: 281,
    backgroundColor: '#0B0B0B',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  popupTitle: {
    fontSize: 22,
    fontFamily: 'UrbanistBold',
    color: '#F75555',
    textAlign: 'center',
    marginBottom: 20,
  },
  line: {
    width: 348,
    height: 1,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
  },
  confirmationText: {
    fontFamily: 'UrbanistSemiBold',
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  permanentlyText: {
    color: '#FF7878',
  },
  additionalText: {
    color: '#FFFFFF',
    fontFamily: 'UrbanistRegular',
    fontSize: 12,
    textAlign: 'center',
    width: 331,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  closeButtonText: {
    color: '#F75555',
    fontFamily: 'UrbanistRegular',
    fontSize: 18,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  buttonNew: {
    width: 164,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  buttonTextNew: {
    color: '#FFFFFF',
    fontFamily: 'UrbanistSemiBold',
    fontSize: 14,
  },
  warningContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  warningPill: {
    backgroundColor: '#35383F',
    borderRadius: 29,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  warningImage: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  warningText: {
    fontFamily: 'UrbanistRegular',
    fontSize: 11,
    color: '#FF7878',
  },
});

export default ManageListingsScreen;
