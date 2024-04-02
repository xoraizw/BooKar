import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, SafeAreaView, FlatList } from 'react-native'; // Import FlatList component
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../assets/styles/homepageStyles';
import SearchField from '../screens/Search';
import ImageBox from './ImageBox';
import { Buffer } from 'buffer'; 

export default function HomePage({ route, navigation }) {
  const { emailProp } = route.params;
  console.log("hOME PAGe route: ", emailProp)
  const [selectedPill, setSelectedPill] = useState('Recommended');
  const [selectedTab, setSelectedTab] = useState('home');
  const [loaded] = useFonts({
    UrbanistRegular: require('../../assets/fonts/Urbanist/static/Urbanist-Regular.ttf'),
    UrbanistBold: require('../../assets/fonts/Urbanist/static/Urbanist-SemiBold.ttf'),
    UrbanistMedium: require('../../assets/fonts/Urbanist/static/Urbanist-Medium.ttf'),
    MontserratBold: require('../../assets/fonts/Montserrat/static/Montserrat-Bold.ttf'),
    MontserratExtraLight: require('../../assets/fonts/Montserrat/static/Montserrat-ExtraLight.ttf'),
    MontserratSemiBold: require('../../assets/fonts/Montserrat/static/Montserrat-SemiBold.ttf'),
  });

  // Define states for companies, bookings, user, and toggling bookings
  const [companies, setCompanies] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState({});
  const [showBookings, setShowBookings] = useState(false);
  const [query, setQuery] = useState('');
  const [fields, setFields] = useState([]);

  useEffect(() => {
    fetchCompanies();
    userDetails();
  }, []);
  
  const handlePillPress = (pill) => {
    setSelectedPill(pill);
  };

  const userDetails = async () => {
    try {
      const response = await fetch(`http://192.168.100.15:3000/get-user?userEmail=${emailProp}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const fetchCompanies = async () => {
    try {
      const response = await fetch('http://192.168.100.15:3000/get-companies');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCompanies(data);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  



  const handleTabPress = (tabName) => {
    if (tabName === selectedTab) {
      setSelectedTab(null);
    } else {
      setSelectedTab(tabName);
    }
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#00170C' }}>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Image source={require('../../assets/images/Logo.png')} style={styles.logo} />
              <Text style={styles.logoText}>BookKar</Text>
            </View>
            <TouchableOpacity onPress={() => {
              // handleTabPress('Notifications');
              navigation.navigate('Notifications', {
                email: emailProp,
              });
            }}>
              <Image source={require('../../assets/images/notification_bell.png')} style={styles.notificationBell} />
            </TouchableOpacity>
          </View>
          <Text style={styles.greetingText}>Hello, {user.Name}!</Text>
          <>
          <TouchableOpacity 
            onPress={() => {
              handleTabPress('search');
              navigation.navigate('Search', {
                emailPassed: emailProp,
              });
            }}
          >
            <View style={styles.searchContainer} onPress={() => {
              handleTabPress('search');
              navigation.navigate('Search', {
                emailPassed: emailProp,
              });
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../../assets/images/search.png')} style={styles.searchIcon} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search fields near you !"
                  placeholderTextColor="#FFFFFF"
                  editable={false} // Disable editing to prevent keyboard from showing on press
                />
              </View>
            </View>
          </TouchableOpacity>

          </>
          <ScrollView horizontal contentContainerStyle={styles.pillContainer}>
            <PillButton
              text="Recommended"
              size={{ width: 129, height: 31 }}
              isSelected={selectedPill === 'Recommended'}
              onPress={() => handlePillPress('Recommended')}
            />
            <PillButton
              text="Popular"
              size={{ width: 77, height: 31 }}
              isSelected={selectedPill === 'Popular'}
              onPress={() => handlePillPress('Popular')}
            />
            <PillButton
              text="Trending"
              size={{ width: 87, height: 31 }}
              isSelected={selectedPill === 'Trending'}
              onPress={() => handlePillPress('Trending')}
            />
            <PillButton
              text="Book Again"
              size={{ width: 107, height: 31 }}
              isSelected={selectedPill === 'Book Again'}
              onPress={() => handlePillPress('Book Again')}
            />
          </ScrollView>
          <ScrollView horizontal contentContainerStyle={styles.imageContainer}>
          {companies.map(company => {
            // Convert Buffer object to base64-encoded string
            const base64Image = Buffer.from(company.Image.data).toString('base64');
            
            // Use base64-encoded string as the URI for Image component
            return (
              <ImageBox
                key={company._id}
                imageSource={base64Image ? { uri: `data:image/png;base64,${base64Image}` } : require('../../assets/images/image_2.png')}
                title={company.Company_Name}
                location={company.Location}
                price={company.Email}
                rating={company.Contact_Name}
                navigation={navigation} 
                
                onPress={() => {
                 navigation.navigate('FieldProfile', {
                      companyName: company.Company_Name,
                      companyLocation: company.Location,
                      companyEmail: company.Email,
                      companyContactName: company.Contact_Name,
                      email: emailProp,    
                      currentUser: user                  
                  });}}
                  />
            );
          })}

          </ScrollView>
          <View style={styles.recentlyBookedContainer}>
            <Text style={styles.recentlyBookedText}>Recently Booked</Text>
            <TouchableOpacity style={styles.seeAllButton} onPress={() => navigation.navigate('RecentlyBooked', {email: emailProp,})}>
              <Text style={styles.seeAllButtonText}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal contentContainerStyle={styles.imageContainer}>
          {companies.map(company => (
            <ImageBox
              key={company._id}
              imageSource={require('../../assets/images/image_2.png')} // Hard-coded image source
              title={company.Company_Name} // Display company name as title
              location={company.Location} // Display company location
              price={company.Email} // Display company location
              rating={company.Contact_Name} // Display company location
              onPress={() => {
                // Handle click for first image
              }}
              // Pass any remaining details fetched for each company as props
            />
          ))}
          </ScrollView>
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
          <Text style={styles.navbarText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={selectedTab === 'search' ? styles.navbarTabSelected : styles.navbarTab}
          onPress={() => {
            handleTabPress('search');
            navigation.navigate('Search');
            navigation.navigate('Search', {
              emailPassed: emailProp,
            }); // Navigate to the Search page
          }}
        >
          <Ionicons
            name={selectedTab === 'search' ? 'search' : 'search-outline'}
            size={24}
            color={selectedTab === 'search' ? '#D45A01' : '#7D7D7D'}
          />
          <Text style={styles.navbarText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={selectedTab === 'list' ? styles.navbarTabSelected : styles.navbarTab}
          onPress={() => {
            handleTabPress('list');
            // navigation.navigate('UserProfile');
            navigation.navigate('MyBookings', {
              email: emailProp,    
              currentUser: user         
            })}} // Navigate to the Search page
        >
          <Ionicons
            name={selectedTab === 'list' ? 'list' : 'list-outline'}
            size={24}
            color={selectedTab === 'list' ? '#D45A01' : '#7D7D7D'}
          />
          <Text style={styles.navbarText}>Bookings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={selectedTab === 'person' ? styles.navbarTabSelected : styles.navbarTab}
          onPress={() => {
            handleTabPress('person');
            // navigation.navigate('UserProfile');
            navigation.navigate('UserProfile', {
              email: emailProp,
              name: user.Name
            }); // Navigate to the Search page
          }}
        >
          <Ionicons
            name={selectedTab === 'person' ? 'person' : 'person-outline'}
            size={24}
            color={selectedTab === 'person' ? '#D45A01' : '#7D7D7D'}
          />
          <Text style={styles.navbarText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const PillButton = ({ text, size, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.pill,
        { width: size.width, height: size.height, marginRight: 10 },
        isSelected ? styles.selectedPill : null
      ]}
      onPress={onPress}
    >
      <Text style={[styles.pillText, isSelected ? styles.selectedPillText : null]}>{text}</Text>
    </TouchableOpacity>
  );
};

