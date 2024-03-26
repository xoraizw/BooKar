  // import React from 'react';
  import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView,SafeAreaView } from 'react-native';
  import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
  import icon from 'react-native-vector-icons/FontAwesome'; 
  import { Button } from 'react-native';
  import React, { useState } from 'react'; // Import useState
  import { useNavigation } from '@react-navigation/native'; // Import useNavigation from React Navigation



export default function UserProfileScreen({ route }) {
    const {email, name} = route.params;
    const [selectedTab, setSelectedTab] = useState('search');
  
    const navigation = useNavigation();
  
    const navigateToHome = () => {
      navigation.navigate('HomePage');
    };
      
    const handleTabPress = (tabName) => {
      if (tabName === selectedTab) {
        setSelectedTab(null);
      } else {
        setSelectedTab(tabName);
      }
    };
    return (
      <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/ds.png')} // Replace with the path to your logo
            style={styles.logo}
          />
          <Text style={styles.profileTitle}>Profile</Text>
        </View>
        <TouchableOpacity onPress={() => console.log('Image button pressed')}>
          <Image
            source={require('../../assets/images/gggg.png')} // Replace with the path to your button image
            style={styles.imageButton}
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.container}>

        <View style={styles.profileSection}>
          <Image
            style={styles.avatar}
            source={require('../../assets/images/fff.png')}
          />
          <Text style={styles.userName}>{name}</Text>
          <Text style={styles.userEmail}>{email}</Text>
        </View>
    <TouchableOpacity style={styles.button} onPress={() => {
            navigation.navigate('EditProfile', {
              emailRecvd : email,
              namercv: name
            }); // Navigate to the Profile page
          }}>
      <Icon name="account-edit" size={20} color="#C4C4C4" />
      <Text style={styles.buttonText}>Edit Profile</Text>
    </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Icon name="credit-card" size={20} color="#C4C4C4" />
          <Text style={styles.buttonText}>Payment</Text>
        </TouchableOpacity>
        {/* Additional buttons */}
        <TouchableOpacity style={styles.button}>
          <Icon name="bell-outline" size={20} color="#C4C4C4" />
          <Text style={styles.buttonText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Icon name="lock-outline" size={20} color="#C4C4C4" />
          <Text style={styles.buttonText}>Security</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Icon name="help-circle-outline" size={20} color="#C4C4C4" />
          <Text style={styles.buttonText}>Help</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonLogout}>
          <Icon name="logout" size={20} color="#FF3B30" />
          <Text style={[styles.buttonText, styles.buttonTextLogout]}>Logout</Text>
        </TouchableOpacity>
        {/* Tab Bar Icons */}
        {/* ...Your tab bar here */}
              {/* Bottom Tab Bar */}
      </ScrollView>

      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} 
          onPress= {() => {
            handleTabPress('home');
            navigation.navigate('HomePage', {
              emailProp: email,
            });
          }}
        >
            <Icon name="home-outline" size={24} color="#7D7D7D" />
            <Text style={styles.tabTitle}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <Icon name="magnify" size={24} color="#7D7D7D" />
            <Text style={styles.tabTitle}>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <Icon name="bookmark-outline" size={24} color="#7D7D7D" />
            <Text style={styles.tabTitle}>Booking</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <Icon name="account-outline" size={24} color="#D45A01" />
            <Text style={styles.tabTitle}>Profile</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#00170C',
    },
    safeArea: {
      flex: 1, // The SafeAreaView should expand to fill the entire screen
      backgroundColor: '#00170C',
    },
    header: {
      paddingLeft: 20, // Aligns title to the left
      paddingVertical: 16,
    },
    headerTitle: {
      color: '#FFF',
      fontSize: 24,
      fontFamily: 'Urbanist-Bold', // Make sure the Urbanist font is linked in your project
    },
    profileSection: {
      alignItems: 'center',
      marginTop: 32,
    },
    avatar: {
      width: 130,
      height: 130,
      borderRadius: 40,
    },
    userName: {
      color: '#FFF',
      fontSize: 24,
      fontFamily: 'Urbanist-Bold',
      marginTop: 8,
    },
    userEmail: {
      color: '#D45A01',
      fontSize: 14,
      fontFamily: 'Urbanist', // Or 'Urbanist-Regular' if available
      marginTop: 4,
      marginBottom: 86,
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
      paddingBottom: 16,
      
      // borderBottomWidth: 1,
      // borderBottomColor: '#303030',
    },
    buttonText: {
      color: '#C4C4C4',
      marginLeft: 16,
      fontFamily: 'Urbanist', // Apply Urbanist font
    },

    buttonLogout: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
      
    },
    buttonTextLogout: {
      color: '#FF3B30',
      fontFamily: 'Urbanist', // Apply Urbanist font
    },
    tabBar: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 10,
      backgroundColor: '#00170Cx',
      // borderTopColor: '#303030',
      // borderTopWidth: 1,
      
    },
    tabItem: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    tabTitle: {
      color: '#7D7D7D',
      fontSize: 12,
      fontFamily: 'Urbanist', // Make sure to load the font
      marginTop: 4,
    },
    logoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    },
    logo: {
      width: 50,
      height: 50,
    },
    profileTitle: {
      marginLeft: 4,
      fontSize: 20, // Change font size to 24
      fontWeight: 'bold',
      color: '#C4C4C4', // Change color to #C4C4C4
      fontFamily: 'Urbanist',
    },
    imageButton: {
      width: 22,
      height: 22,
      position: 'absolute', // Add this line
      top: -46, // Adjust as needed
      right: 10
    },
    // ...other styles
  });

