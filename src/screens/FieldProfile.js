import React, { useState, useRef, useEffect } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Modal, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { styles2 } from '../../assets/styles/fieldprofileStyles'

const CompanyProfile = ({ companyName, imageUrl, location, images, moreDetails, descriptionText, facilityIcons, facilityTexts, mapImage, reviewRating, reviewName, reviewDate, reviewContent, reviewPicture,Prices}) => {
  const [loaded] = useFonts({
    UrbanistRegular: require('../../assets/fonts/Urbanist/static/Urbanist-Regular.ttf'),
    UrbanistBold: require('../../assets/fonts/Urbanist/static/Urbanist-SemiBold.ttf'),
    UrbanistMedium: require('../../assets/fonts/Urbanist/static/Urbanist-Medium.ttf'),
    UrbanistSemiBold: require('../../assets/fonts/Urbanist/static/Urbanist-SemiBold.ttf'),
    UrbanistLight: require('../../assets/fonts/Urbanist/static/Urbanist-Light.ttf'), // Added UrbanistLight font
    MontserratBold: require('../../assets/fonts/Montserrat/static/Montserrat-Bold.ttf'),
    MontserratExtraLight: require('../../assets/fonts/Montserrat/static/Montserrat-ExtraLight.ttf'),
    MontserratSemiBold: require('../../assets/fonts/Montserrat/static/Montserrat-SemiBold.ttf'),
  });

  const [expanded, setExpanded] = useState(false); // State to track expansion of description
  const [expandedReviewIndex, setExpandedReviewIndex] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // State to track selected image

  const toggleDescription = () => {
    setExpanded(!expanded); // Toggle the expansion state
  };

  const toggleExpandReview = (index) => {
    setExpandedReviewIndex(index === expandedReviewIndex ? null : index); // Toggle the expanded review index
  };

  const handleImageClick = (image) => {
    setSelectedImage(image); // Set the selected image
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setSelectedImage(null); // Clear the selected image
  };

  return (
    <ScrollView contentContainerStyle={styles2.scrollView}>
      <View style={[styles2.container, { backgroundColor: '#00170C' }]}>
        <Image
          source={imageUrl}
          style={styles2.image}
          resizeMode="contain"
        />
        <View style={styles2.textContainer}>
          <Text style={styles2.companyName}>{companyName}</Text>
          <View style={styles2.locationTextContainer}>
            <Image
              source={require('../../assets/images/Location.png')}
              style={styles2.locationIcon}
              resizeMode="contain"
            />
            <Text style={styles2.locationText}>{location}</Text>
          </View>
          <View style={styles2.galleryContainer}>
            <Text style={styles2.galleryText}>Gallery Photos</Text>
            <Text style={styles2.seeAllText}>See All</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles2.imageContainer}>
            {images.map((image, index) => (
              <TouchableOpacity key={index} onPress={() => handleImageClick(image)}>
                <Image source={image} style={styles2.imageThumbnail} />
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Modal visible={selectedImage !== null} transparent={true} onRequestClose={handleCloseModal}>
            <View style={styles2.modalContainer}>
              <TouchableOpacity onPress={handleCloseModal} style={styles2.closeButton}>
                <Text style={styles2.closeButtonText}>Close</Text>
              </TouchableOpacity>
              <Image source={selectedImage} style={styles2.selectedImage} resizeMode="contain" />
            </View>
          </Modal>

          <View style={styles2.detailsContainer}>
            <Text style={styles2.detailsText}>Details</Text>
          </View>
          {/* More details container */}
          <View style={styles2.moreDetailsContainer}>
            {moreDetails.map((detail, index) => (
              <View key={index} style={styles2.detailItem}>
                <Image source={detail.image} style={styles2.detailImage} />
                <Text style={styles2.detailText}>{detail.text}</Text>
              </View>
            ))}
          </View>
          <View style={styles2.descriptionContainer}>
            <Text style={styles2.descriptionTitle}>Description</Text>
            <View style={[styles2.descriptionTextBox, expanded ? { height: 'auto' } : null]}>
              <Text style={styles2.descriptionText}>{descriptionText}</Text>
            </View>
            {descriptionText.length > 200 && (
              <TouchableOpacity onPress={toggleDescription} style={styles2.readMoreButton}>
                <Text style={styles2.readMoreButtonText}>{expanded ? 'Read Less' : 'Read More'}</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles2.facilitiesHeaderContainer}>
            <Text style={styles2.facilitiesHeaderText}>Facilities</Text>
          </View>
          <View style={styles2.facilityContainer}>
            {facilityIcons.map((icon, index) => (
              <View key={index} style={styles2.facilityItem}>
                <Image source={icon} style={styles2.facilityIcon} />
                <Text style={styles2.facilityText}>{facilityTexts[index]}</Text>
              </View>
            ))}
          </View>
          <View style={styles2.locationPopupContainer}>
            <Text style={styles2.locationPopupText}>Location</Text>
            <Image source={mapImage} style={styles2.mapImage} resizeMode="contain" />
          </View>
          <View style={styles2.reviewsContainer}>
            <Text style={styles2.reviewsText}>Reviews</Text>
            <Image
              source={require('../../assets/images/gold_star.png')}
              style={styles2.starIcon}
              resizeMode="contain"
            />
            <Text style={styles2.reviewRating}>{reviewRating}</Text>
            <TouchableOpacity style={styles2.seeAllButton}>
              <Text style={styles2.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles2.reviewContainer}>
            {reviewName.map((name, index) => (
              <View key={index} style={styles2.reviewWrapper}>
                <View style={styles2.review}>
                  <Image source={reviewPicture[index]} style={styles2.reviewPicture} />
                  <View style={styles2.reviewTextContainer}>
                    <Text style={styles2.reviewName}>{name}</Text>
                    <Text style={styles2.reviewDate}>{reviewDate[index]}</Text>
                    <View style={styles2.reviewContentContainer}>
                      <Text style={styles2.reviewContent} numberOfLines={expandedReviewIndex === index ? null : 2} ellipsizeMode="tail">
                        {reviewContent[index]}
                      </Text>
                      {reviewContent[index].length > 90 && (
                        <TouchableOpacity onPress={() => toggleExpandReview(index)} style={styles2.readMoreButton}>
                          <Text style={styles2.readMoreButtonText}>{expandedReviewIndex === index ? 'Read Less' : 'Read More'}</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const CompanyProfilesScreen = ({route, navigation}) => {
  console.log('Route:', route); // Log the entire route object
  const { companyName, companyEmail, Location, email, contact_name, user_email, currentUser} = route.params;
  const images = [
    require('../../assets/images/swimmer.png'),
    require('../../assets/images/Lord.png'),
    require('../../assets/images/Fusion.png'),
    require('../../assets/images/swimmer.png'),
    require('../../assets/images/Lord.png'),
    require('../../assets/images/Fusion.png')
  ];

  const moreDetails = [
    { image: require('../../assets/images/football.png'), text: 'Football' },
    { image: require('../../assets/images/cricket.png'), text: 'Cricket' },
    { image: require('../../assets/images/basketball.png'), text: 'Basketball' },
    { image: require('../../assets/images/pool.png'),    text: 'Pool' },
  ];

  const facilityIcons = [
    require('../../assets/images/pool.png'),
    require('../../assets/images/wifi.png'),
    require('../../assets/images/restaurant.png'),
    require('../../assets/images/parking.png'),
    require('../../assets/images/meeting_room.png'),
    require('../../assets/images/elevator.png'),
    require('../../assets/images/dumbell.png'),
    require('../../assets/images/24hr.png'),
  ];

  const facilityTexts = [
    'Swimming Pool',
    'Wi-fi',
    'Restaurant',
    'Parking',
    'Meeting Room',
    'Elevator',
    'Fitness Centre',
    '24-Hour Service',
  ];

  const mapImage = require('../../assets/images/map.png');
  const starImage = require('../../assets/images/gold_star.png');
  const reviewRating = '5.0 (4,345 reviews)';

  const descriptionText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt aliqua. Read more...Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt aliqua. Read more...";

  const reviewName = ['John Doe', 'Alice Smith', 'Robert Johnson', 'Emily Brown'];
  const reviewDate = ['Jan 20, 2025', 'Feb 15, 2025', 'Mar 10, 2025', 'Apr 5, 2025'];
  const reviewContent = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
  ];
  const reviewPicture = [
    require('../../assets/images/pp1.png'),
    require('../../assets/images/pp2.png'),
    require('../../assets/images/pp3.png'),
    require('../../assets/images/pp4.png')
  ];

  const Prices = ['2500']
  // const companyName = ['Play On']

  const [showTopScreen, setShowTopScreen] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const [modalVisible, setModalVisible] = useState(false);
  const [textInputValue, setTextInputValue] = useState('');
  const [selectedStar, setSelectedStar] = useState(0);
  const [errorVisible, setErrorVisible] = useState(false);

  const postReview = async () => 
  {
    try {
      const response = await fetch('http://192.168.100.15:3000/addreview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Rating: selectedStar, // Example rating value
          UserName: currentUser.Name, // Example user name
          CompanyEmailGiven: companyEmail, // Example company email
          Comments: textInputValue, // Example comments
        }),
      });
  
      if (response.ok) 
      {
        console.log('Review added successfully');
        // Handle success, navigate to a different screen, etc.
      } 
      else {
        throw new Error('Failed to add review');
      }
    } 
    catch (error) {
      console.error('Error while posting review:', error.message);
      // Handle error, display an error message, etc.
    }
  };

  
  useEffect(() => {
    if (showTopScreen) {
      Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: 500, // Adjust the duration as needed
          useNativeDriver: true,
        }
      ).start();
    } else {
      Animated.timing(
        fadeAnim,
        {
          toValue: 0,
          duration: 500, // Adjust the duration as needed
          useNativeDriver: true,
        }
      ).start();
    }
  }, [showTopScreen]);

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    if (scrollPosition > 380) {
      setShowTopScreen(true);
    } else {
      setShowTopScreen(false);
    }
  };

  const handleBackButtonPress = () => {
    navigation.navigate('HomePage', {
      emailProp: email,
    });
    // You can add functionality here if needed in the future
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleTextInputChange = (text) => {
    setTextInputValue(text);
  };

  const handleBackgroundPress = () => {
    Keyboard.dismiss();
  };

  const handleStarPress = (index) => {
    setSelectedStar(index + 1);
  };

  return (
  <>
    <Animated.View style={[styles2.topScreen, { opacity: fadeAnim }]}>
      <TouchableOpacity onPress={handleBackButtonPress}>
        <Image
          source={require('../../assets/images/white_back_arrow.png')}
          style={styles2.backArrow}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <Text style={styles2.companyNameTop}>{companyName}</Text>
    </Animated.View>
    <ScrollView
      contentContainerStyle={styles2.scrollView}
      onScroll={handleScroll}
      scrollEventThrottle={16}
    >
      <CompanyProfile
        companyName={companyName}
        imageUrl={require('../../assets/images/5_gen.png')}
        location="M Block, Phase 5 D.H.A, Lahore"
        images={images}
        moreDetails={moreDetails}
        descriptionText={descriptionText}
        facilityIcons={facilityIcons}
        facilityTexts={facilityTexts}
        mapImage={mapImage}
        starImage={starImage}
        reviewRating={reviewRating}
        reviewName={reviewName}
        reviewDate={reviewDate}
        reviewContent={reviewContent}
        reviewPicture={reviewPicture}
        Prices={Prices}
      />
    </ScrollView>
    <View style={styles2.fixedContainer}>
      {/* <TouchableOpacity style={styles2.button} onPress={openModal}>
        <Text style={styles2.buttonText}>Review</Text>
      </TouchableOpacity> */}
      <TouchableOpacity style={styles2.bookButton}
      onPress={() => {
        navigation.navigate('SelectField', {
          // companyName, companyEmail, Location, email, contact_name, user_email, currentUser
          passedCompanyName: companyName,
          passedCompanyEmail: companyEmail,
          passedLocation: Location,
          passedEmail: email,
          passedContactName: contact_name,
          passedUserEmail: user_email,
          passedCurrentUser: currentUser
        });
      }}>
        <Text style={styles2.bookButtonText}>Book Kar!</Text>
      </TouchableOpacity>
    </View>
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <TouchableWithoutFeedback onPress={handleBackgroundPress}>
        <View style={styles2.centeredView}>
          <View style={styles2.modalView}>
            <TouchableOpacity onPress={closeModal} style={styles2.closeButton}>
              <Image source={require('../../assets/images/close.png')} style={styles2.backArrow} />
            </TouchableOpacity>
            <Text style={styles2.modalText}>How was your experience at {companyName}?</Text>
            <View style={styles2.textInputContainer}>
              <TextInput
                style={styles2.textInput}
                placeholder="Add Comment (Optional)"
                onChangeText={handleTextInputChange}
                value={textInputValue}
                multiline={true}
                numberOfLines={4}
                maxLength={1100}
              />
            </View>
            <View style={styles2.starContainer}>
              {[1, 2, 3, 4, 5].map((index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleStarPress(index)}
                >
                  <Ionicons
                    name={selectedStar >= index + 1 ? 'star' : 'star-outline'}
                    size={36}
                    color={selectedStar >= index + 1 ? '#D45A01' : '#7D7D7D'}
                    style={styles2.starIcon}
                  />
                </TouchableOpacity>
              ))}
            </View>
            {errorVisible && (
                <View style={styles2.errorContainer}>
                  <Text style={styles2.errorText}>Please choose a rating before submitting the review.</Text>
                </View>
            )}    
            <View style={styles2.submitButtonContainer}>
              <TouchableOpacity
                style={styles2.submitButton}
                onPress={() => {
                  if (selectedStar > 0) {
                    postReview(); // Call the postReview function when the button is pressed
                    closeModal(); // Close the modal after posting the review
                  } else {
                    // Show an error message that stars are mandatory
                    // You can implement this using an Alert or a custom modal
                      setErrorVisible(true);
                    // alert('Please choose a rating before submitting the review.');
                  }
                }}
              >
                <Text style={styles2.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  </>
);

};

export default CompanyProfilesScreen;


