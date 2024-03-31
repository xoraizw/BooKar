import React, { useState, useRef, useEffect } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Modal, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../assets/styles/fieldprofileStyles'

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
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={[styles.container, { backgroundColor: '#00170C' }]}>
        <Image
          source={imageUrl}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.textContainer}>
          <Text style={styles.companyName}>{companyName}</Text>
          <View style={styles.locationTextContainer}>
            <Image
              source={require('../../assets/images/Location.png')}
              style={styles.locationIcon}
              resizeMode="contain"
            />
            <Text style={styles.locationText}>{location}</Text>
          </View>
          <View style={styles.galleryContainer}>
            <Text style={styles.galleryText}>Gallery Photos</Text>
            <Text style={styles.seeAllText}>See All</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.imageContainer}>
            {images.map((image, index) => (
              <TouchableOpacity key={index} onPress={() => handleImageClick(image)}>
                <Image source={image} style={styles.imageThumbnail} />
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Modal visible={selectedImage !== null} transparent={true} onRequestClose={handleCloseModal}>
            <View style={styles.modalContainer}>
              <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
              <Image source={selectedImage} style={styles.selectedImage} resizeMode="contain" />
            </View>
          </Modal>

          <View style={styles.detailsContainer}>
            <Text style={styles.detailsText}>Details</Text>
          </View>
          {/* More details container */}
          <View style={styles.moreDetailsContainer}>
            {moreDetails.map((detail, index) => (
              <View key={index} style={styles.detailItem}>
                <Image source={detail.image} style={styles.detailImage} />
                <Text style={styles.detailText}>{detail.text}</Text>
              </View>
            ))}
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Description</Text>
            <View style={[styles.descriptionTextBox, expanded ? { height: 'auto' } : null]}>
              <Text style={styles.descriptionText}>{descriptionText}</Text>
            </View>
            {descriptionText.length > 200 && (
              <TouchableOpacity onPress={toggleDescription} style={styles.readMoreButton}>
                <Text style={styles.readMoreButtonText}>{expanded ? 'Read Less' : 'Read More'}</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.facilitiesHeaderContainer}>
            <Text style={styles.facilitiesHeaderText}>Facilities</Text>
          </View>
          <View style={styles.facilityContainer}>
            {facilityIcons.map((icon, index) => (
              <View key={index} style={styles.facilityItem}>
                <Image source={icon} style={styles.facilityIcon} />
                <Text style={styles.facilityText}>{facilityTexts[index]}</Text>
              </View>
            ))}
          </View>
          <View style={styles.locationPopupContainer}>
            <Text style={styles.locationPopupText}>Location</Text>
            <Image source={mapImage} style={styles.mapImage} resizeMode="contain" />
          </View>
          <View style={styles.reviewsContainer}>
            <Text style={styles.reviewsText}>Reviews</Text>
            <Image
              source={require('../../assets/images/gold_star.png')}
              style={styles.starIcon}
              resizeMode="contain"
            />
            <Text style={styles.reviewRating}>{reviewRating}</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.reviewContainer}>
            {reviewName.map((name, index) => (
              <View key={index} style={styles.reviewWrapper}>
                <View style={styles.review}>
                  <Image source={reviewPicture[index]} style={styles.reviewPicture} />
                  <View style={styles.reviewTextContainer}>
                    <Text style={styles.reviewName}>{name}</Text>
                    <Text style={styles.reviewDate}>{reviewDate[index]}</Text>
                    <View style={styles.reviewContentContainer}>
                      <Text style={styles.reviewContent} numberOfLines={expandedReviewIndex === index ? null : 2} ellipsizeMode="tail">
                        {reviewContent[index]}
                      </Text>
                      {reviewContent[index].length > 90 && (
                        <TouchableOpacity onPress={() => toggleExpandReview(index)} style={styles.readMoreButton}>
                          <Text style={styles.readMoreButtonText}>{expandedReviewIndex === index ? 'Read Less' : 'Read More'}</Text>
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

  const postReview = async () => {
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
    <Animated.View style={[styles.topScreen, { opacity: fadeAnim }]}>
      <TouchableOpacity onPress={handleBackButtonPress}>
        <Image
          source={require('../../assets/images/white_back_arrow.png')}
          style={styles.backArrow}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <Text style={styles.companyNameTop}>{companyName}</Text>
    </Animated.View>
    <ScrollView
      contentContainerStyle={styles.scrollView}
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
    <View style={styles.fixedContainer}>
      <TouchableOpacity style={styles.button} onPress={openModal}>
        <Text style={styles.buttonText}>Review</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bookButton}
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
        <Text style={styles.bookButtonText}>Book Kar!</Text>
      </TouchableOpacity>
    </View>
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <TouchableWithoutFeedback onPress={handleBackgroundPress}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Image source={require('../../assets/images/close.png')} style={styles.backArrow} />
            </TouchableOpacity>
            <Text style={styles.modalText}>How was your experience at {companyName}?</Text>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Add Comment (Optional)"
                onChangeText={handleTextInputChange}
                value={textInputValue}
                multiline={true}
                numberOfLines={4}
                maxLength={1100}
              />
            </View>
            <View style={styles.starContainer}>
              {[1, 2, 3, 4, 5].map((index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleStarPress(index)}
                >
                  <Ionicons
                    name={selectedStar >= index + 1 ? 'star' : 'star-outline'}
                    size={36}
                    color={selectedStar >= index + 1 ? '#D45A01' : '#7D7D7D'}
                    style={styles.starIcon}
                  />
                </TouchableOpacity>
              ))}
            </View>
            {errorVisible && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>Please choose a rating before submitting the review.</Text>
                </View>
            )}    
            <View style={styles.submitButtonContainer}>
              <TouchableOpacity
                style={styles.submitButton}
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
                <Text style={styles.submitButtonText}>Submit</Text>
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


