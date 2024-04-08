import React, { useState, useEffect, useCallback} from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import ImageCard from './ImageCard';
import {ipAddr} from './ipconfig';

export default function HomePage({ navigation, route }) {

  const [selectedTab, setSelectedTab] = useState('home');
  const [user, setUser] = useState(null);
  const {email} = route.params; 

  const [loaded] = useFonts({
    UrbanistRegular: require('../../assets/fonts/Urbanist/static/Urbanist-Regular.ttf'),
    UrbanistBold: require('../../assets/fonts/Urbanist/static/Urbanist-SemiBold.ttf'),
    UrbanistMedium: require('../../assets/fonts/Urbanist/static/Urbanist-Medium.ttf'),
    MontserratBold: require('../../assets/fonts/Montserrat/static/Montserrat-Bold.ttf'),
    MontserratExtraLight: require('../../assets/fonts/Montserrat/static/Montserrat-ExtraLight.ttf'),
    MontserratSemiBold: require('../../assets/fonts/Montserrat/static/Montserrat-SemiBold.ttf'),
    MontserratLight : require('../../assets/fonts/Montserrat/static/Montserrat-Light.ttf')
  });

  const userDetails = async () => {
    try {
      const response = await fetch(`http://${ipAddr}:3000/get-user?userEmail=${emailProp}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };
  
  useEffect(() => {
    userDetails(); // This should be called correctly
  }, []);

  if (!loaded) {
    return null;
  }

  const handleTabPress = (tabName) => {
    if (tabName === selectedTab) {
      setSelectedTab(null);
    } else {
      setSelectedTab(tabName);
  
      switch (tabName) {
        case 'home':
          // Handle home tab press if needed
          break;
        case 'list':
          navigation.navigate('OwnerBookings', {
            emailProp: email,
            currentUser: user
          })
          // Navigate to bookings or other related screen for 'list' tab
          break;
        case 'cart':
          // Navigate to 'OwnerInventory' screen when cart tab is pressed
          navigation.navigate('OwnerInventory', { emailProp: email });
          break;
        case 'person':
          navigation.navigate('StatScreen', { emailProp: email });
          // Navigate to earnings or other related screen for 'person' tab
          break;
        default:
          // Handle default case or no tab selected
          break;
      }
    }
  };

  const navigateToCreateListing = () => {
    // Navigate to the screen where you create a new listing
    navigation.navigate('CreateListingOwner', { email: email }); // Replace 'CreateListing' with the name of your screen
  };
  
  const navigateToManageListing = () => {
    // Navigate to the screen where you create a new listing
    navigation.navigate('ManageListingsOwner', {email: email});
  };
  

  

  // Mock data for ImageCard
  const imageData = [
    {
      title: '5th Gen Sports Complex',
      location: 'DHA Phase 6, Lahore',
      price: 'PKR 2500 /hr',
      rating: '5.0',
      image: require('../../assets/images/image_2.png'),
    },
    {
      title: 'Play On',
      location: 'Bedian Rd, Lahore',
      price: 'PKR 2000 /hr',
      rating: '5.0',
      image: require('../../assets/images/image_1.png'),
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Image source={require('../../assets/images/Logo.png')} style={styles.logo} />
              <Text style={styles.logoText}>BookKar</Text>
            </View>
            <TouchableOpacity onPress={() => {}}>
              <Image source={require('../../assets/images/Settings.png')} style={styles.notificationBell} />
            </TouchableOpacity>
          </View>
          <View style={styles.listingsBox}>
            <View style={styles.newListingColumn}>
              <TouchableOpacity style={styles.newListingButton} onPress={navigateToCreateListing}>
                <Text style={styles.newListingButtonText}>
                  <Text>Create</Text>{'\n'}
                  <Text>A</Text>{'\n'}
                  <Text>New</Text>{'\n'}
                  <Text>Listing</Text>
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.manageButtonsColumn}>
              <TouchableOpacity style={styles.manageButton} onPress={navigateToManageListing}>
                <Text style={styles.manageButtonText}>Manage Listings</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.reviewButton} 
                onPress={() => navigation.navigate('OwnerReview', {emailProp: email})}>
                <Text style={styles.reviewButtonText}>Manage Reviews</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.greetingText}>My Listings</Text>
          {imageData.length > 0 ? (
            <ScrollView horizontal contentContainerStyle={styles.imageContainer}>
              <ImageCard data={imageData} />
            </ScrollView>
          ) : (
            <View style={styles.emptyImageCard}>
              <Image source={require('../../assets/images/warning.png')} style={styles.warningIcon} />
              <Text style={styles.emptyImageCardText}>You have currently no listings!</Text>
            </View>
          )}
        </ScrollView>
      </View>
      <View style={styles.navbar}>
      <TouchableOpacity
          style={selectedTab === 'home' ? styles.navbarTabSelected : styles.navbarTab}
          onPress={() => handleTabPress('home')}
        >
          <Ionicons
            name={selectedTab === 'home' ? 'home' : 'home-outline'}
            size={24}
            color={selectedTab === 'home' ? '#D45A01' : '#7D7D7D'}
          />
          <Text style={styles.navbarText}>Listings</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={selectedTab === 'list' ? styles.navbarTabSelected : styles.navbarTab}
            onPress={() => handleTabPress('list')}
        >
            <Ionicons
                name={selectedTab === 'calender' ? 'calendar' : 'calendar-outline'} 
                size={24}
                color={selectedTab === 'list' ? '#D45A01' : '#7D7D7D'}
            />
            <Text style={styles.navbarText}>Bookings</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={selectedTab === 'cart' ? styles.navbarTabSelected : styles.navbarTab}
            onPress={() => handleTabPress('cart')}
        >
            <Ionicons
            name={selectedTab === 'cart' ? 'cart' : 'cart-outline'}
            size={24}
            color={selectedTab === 'cart' ? '#D45A01' : '#7D7D7D'}
            />
            <Text style={styles.navbarText}>Inventory</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={selectedTab === 'person' ? styles.navbarTabSelected : styles.navbarTab}
            onPress={() => handleTabPress('person')}
            >
            <Ionicons
                name={selectedTab === 'person' ? 'logo-usd' : 'logo-usd'} 
                size={24}
                color={selectedTab === 'person' ? '#D45A01' : '#7D7D7D'}
            />
            <Text style={styles.navbarText}>Earnings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    width: '100%',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginLeft: -5,
  },
  logoText: {
    fontFamily: 'MontserratExtraLight',
    fontSize: 24,
    textAlign: 'center',
    color: '#C4C4C4',
  },
  notificationBell: {
    width: 25,
    height: 25,
    marginRight: 5,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: '10%',
    backgroundColor: '#000000',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 12, 
    borderTopRightRadius: 12,
  },
  navbarTab: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  navbarTabSelected: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'orange',
  },
  navbarText: {
    fontSize: 10,
    marginTop: 4,
    color: '#C4C4C4',
  },
  greetingText: {
    fontSize: 28,
    color: '#C4C4C4',
    fontFamily: 'MontserratBold',
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 8,
    marginBottom: 20,
  },
  listingsBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 348,
    height: 220,
    marginTop: 10,
    marginBottom: 10,
  },
  newListingButton: {
    width: 156,
    height: 203,
    backgroundColor: 'rgba(133, 56, 2, 0.75)',
    justifyContent: 'flex-end', 
    alignItems: 'flex-start',
    borderRadius: 25,
    marginLeft: 20,
    padding: 30, 
    paddingBottom: 5,
    paddingRight: 60,
    paddingLeft: 15,
  },
  newListingButtonText: {
    fontSize: 18,
    color: '#C4C4C4',
    fontFamily: 'MontserratLight',
    borderColor: 'white',
    borderRadius: 1,
    textAlign: 'left',
    marginBottom: 10,
    lineHeight: 24,
  },
  manageButton: {
    width: 130,
    height: 90,
    backgroundColor: 'rgba(53, 56, 63, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginBottom: 23,
    marginRight:20,
    padding: 10,
  },
  manageButtonText: {
    fontSize: 14,
    color: '#C4C4C4',
    fontFamily: 'MontserratLight',
  },
  reviewButton: {
    width: 130,
    height: 90,
    backgroundColor: 'rgba(2, 58, 25, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  reviewButtonText: {
    fontSize: 14,
    color: '#C4C4C4',
    fontFamily: 'MontserratLight',
    padding: 10,
  },
  imageContainer: {
    paddingLeft: 20,
  },
  emptyImageCard: {
    width: 252,
    height: 58,
    backgroundColor: '#35383F',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 10,
    borderRadius: 25,
    marginTop: 10,
    marginBottom: 10,
  },
  warningIcon: {
    width: 18,
    height: 18,
    marginRight: 10,
    marginLeft: 20,
  },
  emptyImageCardText: {
    fontFamily: 'UrbanistRegular',
    fontSize: 11,
    color: '#FF7878',
  },
});

