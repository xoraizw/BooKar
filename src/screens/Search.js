import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, FlatList, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { styles } from '../../assets/styles/searchStyles'

const SearchScreen = ({ route, navigation }) => {
  const [selectedTab, setSelectedTab] = useState('search');
  const [user, setUser] = useState(null);

  const [loaded] = useFonts({
    UrbanistRegular: require('../../assets/fonts/Urbanist/static/Urbanist-Regular.ttf'),
    UrbanistBold: require('../../assets/fonts/Urbanist/static/Urbanist-SemiBold.ttf'),
    UrbanistMedium: require('../../assets/fonts/Urbanist/static/Urbanist-Medium.ttf'),
    UrbanistSemiBold: require('../../assets/fonts/Urbanist/static/Urbanist-SemiBold.ttf'),
    MontserratBold: require('../../assets/fonts/Montserrat/static/Montserrat-Bold.ttf'),
    MontserratExtraLight: require('../../assets/fonts/Montserrat/static/Montserrat-ExtraLight.ttf'),
    MontserratSemiBold: require('../../assets/fonts/Montserrat/static/Montserrat-SemiBold.ttf'),
  });

  const userDetails = async () => {
    try {
      const response = await fetch(`http://192.168.100.15:3000/get-user?userEmail=${route.params.emailPassed}`);
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
    userDetails();
    }, []);

  const handleTabPress = (tabName) => {
    if (tabName === selectedTab) {
      setSelectedTab(null);
    } else {
      setSelectedTab(tabName);
    }
  };

  const [query, setQuery] = useState('');
  const [fields, setFields] = useState([]);

  const searchFields = async (searchQuery) => {
    try {
      if (!searchQuery) { // Check if searchQuery is empty
        setFields([]); // Clear fields if searchQuery is empty
        return;
      }
      const response = await fetch(`http://192.168.100.15:3000/search-fields?field=${searchQuery}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setFields(data);
    } catch (error) {
      console.error('Error fetching fields:', error);
    }
  };

  const handleArenaCardPress = (company) => {
    navigation.navigate('FieldProfile', {
      companyName: company.Company_Name,
      companyLocation: company.Location,
      companyEmail: company.Email,
      companyContactName: company.Contact_Name,
      email: route.params.emailPassed,    
      currentUser: user                  
    })
  };

  const renderItem = ({ item }) => {
    // console.log("Item: ", item)
    let ratingColor = '#C4C4C4'; // Default color
    const ratingValue = parseFloat(item.rating);
    if (ratingValue >= 3.5 && ratingValue <= 5) {
      ratingColor = 'green';
    } else if (ratingValue > 2.1 && ratingValue < 3.5) {
      ratingColor = 'yellow';
    } else if (ratingValue >= 0 && ratingValue <= 2) {
      ratingColor = 'red';
    }

    return (
      <TouchableOpacity onPress={() => handleArenaCardPress(item)}>
      <View style={styles.arenaCard}>
        <Image
          source={'../../assets/images/Fusion.png'}
          style={styles.arenaImage}
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{item.Company_Name}</Text>
          <Text style={styles.distance}>{item.Location}</Text>
        </View>
        <View style={styles.bottomRow}>
          <View style={styles.leftSection}>
            <Image source={require('../../assets/images/gold_star.png')} style={styles.starIcon} />
            <Text style={[styles.rating, { color: ratingColor }]}>{item.Email}</Text>
          </View>
          <Text style={styles.price}>{item.Website_URL}</Text>
        </View>
      </View>
    </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Search bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="black" />
        <TextInput 
          placeholder="Search" 
          placeholderTextColor="#C4C4C4" 
          style={styles.searchInput} 
          onChangeText={(text) => {
            setQuery(text);
            searchFields(text);
          }}
          value={query}
        />
      </View>
      <View style={styles.arenaContainer}>
        <View style={{ flex: 1, overflowY: 'scroll' }}>
          <FlatList
            data={fields}
            numColumns={2}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            style={{ marginTop: 10 }}
          />
        </View>
      </View>
      {/* Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity
          style={selectedTab === 'home' ? styles.navbarTabSelected : styles.navbarTab}
          onPress= {() => {
            handleTabPress('home');
            navigation.navigate('HomePage', {
              emailProp: route.params.emailPassed,
            });
          }}
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
          onPress={() => handleTabPress('search')}
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
          onPress={() => handleTabPress('list')}
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
          onPress={() => handleTabPress('person')}
        >
          <Ionicons
            name={selectedTab === 'person' ? 'person' : 'person-outline'}
            size={24}
            color={selectedTab === 'person' ? '#D45A01' : '#7D7D7D'}
          />
          <Text style={styles.navbarText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default SearchScreen;
