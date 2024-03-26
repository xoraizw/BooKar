import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Modal } from 'react-native';
import { styles } from '../../assets/styles/recentlybookedStyles'

export default function RecentlyBooked({ navigation, route }) {
    const { email } = route.params;
    console.log(email)
    const [bookings, setBookings] = useState([])
    
    const [loaded] = useFonts({
        UrbanistRegular: require('../../assets/fonts/Urbanist/static/Urbanist-Regular.ttf'),
        UrbanistBold: require('../../assets/fonts/Urbanist/static/Urbanist-Bold.ttf'),
        UrbanistSemiBold: require('../../assets/fonts/Urbanist/static/Urbanist-SemiBold.ttf'),
        UrbanistMedium: require('../../assets/fonts/Urbanist/static/Urbanist-Medium.ttf'),
        MontserratBold: require('../../assets/fonts/Montserrat/static/Montserrat-Bold.ttf'),
        MontserratExtraLight: require('../../assets/fonts/Montserrat/static/Montserrat-ExtraLight.ttf'),
        MontserratSemiBold: require('../../assets/fonts/Montserrat/static/Montserrat-SemiBold.ttf'),
        });

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedVenue, setSelectedVenue] = useState(null);
    
    const showConfirmationModal = (venueName) => {
        setSelectedVenue(venueName);
        setModalVisible(true);
    };
    
    const hideConfirmationModal = () => {
        setModalVisible(false);
    };
    
    const BookAgainButton = ({ venueName }) => (
        <TouchableOpacity
        style={styles.bookAgainButton}
        onPress={() => showConfirmationModal(venueName)}
        >
        <Text style={styles.bookAgainText}>Book Again</Text>
        </TouchableOpacity>
    );
      
      useEffect(() => {
        fetchMyBookings();
      }, []);
    const fetchMyBookings = async () => {
      try {
        const response = await fetch(`http://192.168.100.15:3000/my-bookings?userEmail=${route.params.email}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBookings(data);
        setShowBookings(true);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
    
    const goBack = () => {navigation.goBack();};
    const renderItem = ({ item }) => (
      <View style={styles.card}>
          <Image source={require('../../assets/images/Fusion.png')} style={styles.venueImage} />
          <View style={styles.infoContainer}>
              <Text style={styles.venueName}>{item.Company_Name}</Text>
              <Text style={styles.location}>{item.Field_Name}</Text>
              <View style={styles.bookingTimeContainer}>
                  <Ionicons name="time-outline" size={14} color="#C4C4C4" />
                  <Text style={styles.bookingTime}>{item.Booking_time}</Text>
              </View>
              <View style={styles.ratingContainer}>
                  <Image source={require('../../assets/images/gold_star.png')} style={styles.starIcon} />
                  <Text style={styles.venueRating}>{item.venue_rating}</Text>
              </View>
              <BookAgainButton venueName={item.venue_name} />
          </View>
      </View>
  );

  return (
      <View style={styles.container}>
          <View style={styles.headerContainer}>
              <TouchableOpacity onPress={goBack} style={styles.backButton}>
                  <Ionicons name="arrow-back-outline" size={24} color="#C4C4C4" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Recently Booked</Text>
          </View>
          <FlatList
              data={bookings}
              renderItem={renderItem}
              keyExtractor={item => item.id}
          />
          <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
          >
              <View style={styles.centeredModalView}>
                <View style={styles.modalView}>
                <Text style={styles.modalTitle}>Book Again</Text>
                <View style={styles.modalTitleLine} />
                <Text style={styles.modalText}>
                    Are you sure you want to make another appointment at{' '}
                    <Text style={styles.venueNameInModal}>{selectedVenue}</Text>?
                </Text>
                <Text style={styles.modalSubText}>
                    Only 80% of the money you can refund from your payment according to our policy.
                </Text>
                <View style={styles.modalButtonGroup}>
                    <TouchableOpacity
                    onPress={hideConfirmationModal}
                    style={styles.modalCancelButton}
                    >
                    <Text style={styles.modalButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={hideConfirmationModal}
                    style={styles.modalConfirmButton}
                    >
                    <Text style={styles.modalButtonText}>Yes, Continue</Text>
                    </TouchableOpacity>
                </View>
                </View>
              </View>
        </Modal>
        </View>
      );
}