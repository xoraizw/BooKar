// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView,SafeAreaView } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
// import { styles } from '../../assets/styles/userprofileStyles';

// export default funcion UserProfileScreen({routes}) {
//   const { email, name } = routes.params;
//   const navigation = useNavigation(); // Declare navigation using useNavigation hook

//   const navigateToHome = () => {
//     navigation.navigate('HomePage'); // Navigate to the Home screen
//   };


//   return (
//     <SafeAreaView style={styles.safeArea}>
//     <View style={styles.header}>
//       <View style={styles.logoContainer}>
//         <Image
//           source={require('../../assets/images/ds.png')} // Replace with the path to your logo
//           style={styles.logo}
//         />
//         <Text style={styles.profileTitle}>Profile</Text>
//       </View>
//       <TouchableOpacity onPress={() => console.log('Image button pressed')}>
//         <Image
//           source={require('../../assets/images/gggg.png')} // Replace with the path to your button image
//           style={styles.imageButton}
//         />
//       </TouchableOpacity>
//     </View>
//     <ScrollView style={styles.container}>

//       <View style={styles.profileSection}>
//         <Image
//           style={styles.avatar}
//           source={require('../../assets/images/fff.png')}
//         />
//         <Text style={styles.userName}>{name}</Text>
//         <Text style={styles.userEmail}>{email}</Text>
//       </View>
//       <TouchableOpacity style={styles.button}>
//         <Icon name="account-edit" size={20} color="#C4C4C4" />
//         <Text style={styles.buttonText}>Edit Profile</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.button}>
//         <Icon name="credit-card" size={20} color="#C4C4C4" />
//         <Text style={styles.buttonText}>Payment</Text>
//       </TouchableOpacity>
//       {/* Additional buttons */}
//       <TouchableOpacity style={styles.button}>
//         <Icon name="bell-outline" size={20} color="#C4C4C4" />
//         <Text style={styles.buttonText}>Notifications</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.button}>
//         <Icon name="lock-outline" size={20} color="#C4C4C4" />
//         <Text style={styles.buttonText}>Security</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.button}>
//         <Icon name="help-circle-outline" size={20} color="#C4C4C4" />
//         <Text style={styles.buttonText}>Help</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.buttonLogout}>
//         <Icon name="logout" size={20} color="#FF3B30" />
//         <Text style={[styles.buttonText, styles.buttonTextLogout]}>Logout</Text>
//       </TouchableOpacity>
//       {/* Tab Bar Icons */}
//       {/* ...Your tab bar here */}
//             {/* Bottom Tab Bar */}
//     </ScrollView>

//           <View style={styles.tabBar}>
//           <TouchableOpacity style={styles.button} onPress={navigateToHome}>
//             <View style={styles.buttonContent}>
//               <Icon name="home-outline" size={24} color="#7D7D7D" />
//               <Text style={styles.tabTitle}>Home</Text>
//             </View>
//           </TouchableOpacity>
//         <TouchableOpacity style={styles.tabItem}>
//           <Icon name="magnify" size={24} color="#7D7D7D" />
//           <Text style={styles.tabTitle}>Search</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.tabItem}>
//           <Icon name="bookmark-outline" size={24} color="#7D7D7D" />
//           <Text style={styles.tabTitle}>Booking</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.tabItem}>
//           <Icon name="account-outline" size={24} color="#D45A01" />
//           <Text style={styles.tabTitle}>Profile</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }

import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../assets/styles/userprofileStyles';

export default function UserProfileScreen({ route }) {
  const { email, name } = route.params;
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
            source={require('../../assets/images/ds.png')}
            style={styles.logo}
          />
          <Text style={styles.profileTitle}>Profile</Text>
        </View>
        <TouchableOpacity onPress={() => console.log('Image button pressed')}>
          <Image
            source={require('../../assets/images/gggg.png')}
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
        <TouchableOpacity style={styles.button}>
          <Icon name="account-edit" size={20} color="#C4C4C4" />
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Icon name="credit-card" size={20} color="#C4C4C4" />
          <Text style={styles.buttonText}>Payment</Text>
        </TouchableOpacity>
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
}
