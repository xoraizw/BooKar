import React, { useState, useEffect, useCallback} from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Image, FlatList, Modal } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { useFonts } from 'expo-font';
import { styles } from '../../assets/styles/mybookingsStyles';
import img from '../../assets/images/Logo.png';
const moment = require('moment');

const MyBookings = ({ route, navigation }) => {
    const { email } = route.params;
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [bookings, setBookings] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTab, setSelectedTab] = useState('list');

    const [selectedVenue, setSelectedVenue] = useState(null);
    const [selectedBooking, setSelectedBooking] = useState("");
    const [selectedPrice, setSelectedPrice] = useState(0);
    const [selectedUserEmail, setSelectedUserEmail] = useState("");
    const [selectedCompanyEmail, setSelectedCompanyEmail] = useState("");
    const [selectedFieldName, setSelectedFieldName] = useState("");

    const CancelButton = ({ venueName, bookingTime, useremail, companyemail, fieldname, price}) => (
      <TouchableOpacity
      style={styles.cancelButton}
      onPress={() => showConfirmationModal(venueName, bookingTime, useremail, companyemail, fieldname, price)}
      >
      <Text style={styles.cancelButtonText}>Cancel Booking</Text>
      </TouchableOpacity>
  );
  
  const showConfirmationModal = (venueName, bookingTime, useremail, companyemail, fieldname, price) => {
    setSelectedVenue(venueName);
    setSelectedBooking(bookingTime)
    setSelectedUserEmail(useremail)
    setSelectedCompanyEmail(companyemail)
    setSelectedFieldName(fieldname)
    setSelectedPrice(price)
    setModalVisible(true);
};

  const handleTabPress = (tabName) => {
    setSelectedTab(tabName);
    if (tabName === 'home') {
      navigation.navigate('HomePage');
      // Add other navigation logic for other tabs if necessary
    } else if (tabName === 'search') {
      navigation.navigate('Search');
    // } else if (tabName === 'person') {
    //   navigation.navigate('Profile');
    }
  };
    const [loaded] = useFonts({
        UrbanistRegular: require('../../assets/fonts/Urbanist/static/Urbanist-Regular.ttf'),
        UrbanistBold: require('../../assets/fonts/Urbanist/static/Urbanist-Bold.ttf'),
        UrbanistSemiBold: require('../../assets/fonts/Urbanist/static/Urbanist-SemiBold.ttf'),
        UrbanistMedium: require('../../assets/fonts/Urbanist/static/Urbanist-Medium.ttf'),
        MontserratBold: require('../../assets/fonts/Montserrat/static/Montserrat-Bold.ttf'),
        MontserratExtraLight: require('../../assets/fonts/Montserrat/static/Montserrat-ExtraLight.ttf'),
        MontserratSemiBold: require('../../assets/fonts/Montserrat/static/Montserrat-SemiBold.ttf'),
        MontserratMedium: require('../../assets/fonts/Montserrat/static/Montserrat-Medium.ttf'),
    });

    // useEffect(() => {
    //   fetchMyBookings();
    // }, []);
    useFocusEffect(
      useCallback(() => {
          fetchMyBookings();
      }, [])
  );

  // All functions: 
  /////////////////////////////////////////////////////////////////
  const Navbar = () => {
    return (
      <View style={styles.navbar}>
          <TouchableOpacity
            style={selectedTab === 'home' ? styles.navbarTabSelected : styles.navbarTab}
            onPress={() => {handleTabPress('home');
            navigation.navigate('HomePage');
              navigation.navigate('HomePage', {
                emailProp: email, });
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
            onPress={() => {
              handleTabPress('search');
              navigation.navigate('Search');
              navigation.navigate('Search', {
                emailProp: email,
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
            }}
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
      );
  };

  ////////////////////////ASYNC FUNCTIONS/////////////////////////////////////////
  const postNotification = async (noti) => {
    try {
      const response = await fetch('http://192.168.100.15:3000/addnotification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          User_Email: selectedUserEmail, // Example user email
          Msg: noti, // Example notification message
        }),
      });
  
      if (response.ok) {
        console.log('Notification added successfully');
        // Handle success, navigate to a different screen, etc.
      } else {
        throw new Error('Failed to add notification');
      }
    } catch (error) {
      console.error('Error while posting notification:', error.message);
      // Handle error, display an error message, etc.
    }
  };
  const cancelBooking = async (venueName, bookingTime, userEmail, companyEmail, fieldName, price) => {
    let msg = `
        Booking Canceled! \n 
        Booking venue: ${fieldName} - ${venueName}\n 
        Booking Time: ${bookingTime}.\n 
        Payment: ${price} \n
        80% of the money will be refunded within 48-hours.`

    postNotification(msg);

    Toast.show({
      type: 'success',
      text1: `
      Booking Canceled! \n 
      Booking venue: ${fieldName} - ${venueName}\n 
      Booking Time: ${bookingTime}.\n 
      Payment: ${price} \n
      80% of the money will be refunded within 48-hours.`
    });
    try {
        const response = await fetch('http://192.168.100.15:3000/cancelbooking', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ venueName, bookingTime, userEmail, companyEmail, fieldName }),
        });

        if (!response.ok) {
            throw new Error('Failed to cancel booking');
        }
        console.log('Booking canceled successfully');
    } catch (error) {
        console.error('Error while canceling booking:', error.message);
        // Handle error, display an error message, etc.
    }
      hideConfirmationModal()
      fetchMyBookings()
  };
  const fetchMyBookings = async () => {
      try {
        console.log("route param: ", route.params.email)
        const response = await fetch(`http://192.168.100.15:3000/my-bookings?userEmail=${route.params.email}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
          }
          const data = await response.json();
          console.log("data: ")
          console.log(data)

          setBookings(data);
      } catch (error) {
          console.error('Error fetching bookings:', error);
      }
  };
  const modifyBookedArray = async (companyEmail, fieldName, deleteBookings) => {
  try {
      const response = await fetch('http://192.168.100.15:3000/updatebookings', {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ companyEmail, fieldName, deleteBookings}),
      });

      if (!response.ok) {
          throw new Error('Failed to update booking array');
      }
      console.log('Booking array successfully updated');
      hideConfirmationModal();
  } catch (error) {
      console.error('Error while updating booking arrayy:', error.message);
      // Handle error, display an error message, etc.
  }
  };
  /////////////////////////////////////////////////////////////////////////////////

  const hideConfirmationModal = () => {
    setModalVisible(false);
  };
  const PillButton = ({ text, isSelected, onPress }) => {
      return (
          <TouchableOpacity
              style={[
                  styles.pill,
                  isSelected ? styles.selectedPill : styles.unselectedPill
              ]}
              onPress={onPress}
          >
              <Text style={[styles.pillText, isSelected ? styles.selectedPillText : styles.unselectedPillText]}>
                  {text}
              </Text>
          </TouchableOpacity>
      );
  };
  function checkEventStatus(eventString) {
      // Split the event string into start and end times
      const [timeRange, eventDate] = eventString.split(' ');
      const [startTime, endTime] = timeRange.split('-');
  
      // Parse start and end times
      const eventStartTime = new Date(`${eventDate}T${startTime}:00`);
      const eventEndTime = new Date(`${eventDate}T${endTime}:00`);
      const currentTime = new Date();
  
      if (currentTime >= eventStartTime && currentTime < eventEndTime) {
          return 'Ongoing';
      } else if (currentTime >= eventEndTime) {
          return 'Completed';
      } else {
          return 'Not Started';
      }
  }
  const BookingsCard = ({ venueName, bookingTime, cancelled, useremail, companyemail, fieldname, price }) => {

    if (selectedCategory === "All")
    {
      return AllBookings({ venueName, bookingTime, cancelled, useremail, companyemail, fieldname, price })
    }
    else if (selectedCategory === "Ongoing")
    {
      return OngoingBookings({ venueName, bookingTime, cancelled })
    }
    else if (selectedCategory === "Completed")
    {
      return CompletedBookings({ venueName, bookingTime, cancelled })
    }
    else if (selectedCategory === "UpComing")
    {
      return UpcomingBookings({ venueName, bookingTime, cancelled, useremail, companyemail, fieldname })
    }
    else 
    {
      return CanceledBookings({ venueName, bookingTime, cancelled })
    }
  };
  const OngoingBookings = ({ venueName, bookingTime, cancelled }) =>{
    if (!cancelled && checkEventStatus(bookingTime) === "Ongoing") return (<View style={styles.card}>
      <View style={styles.row}>
          <Image source={img} style={styles.cardImage} />
          <View style={styles.cardTextContent}>
              <Text style={styles.venueName}>{venueName}</Text>
              <Text style={styles.bookingTime}>{bookingTime}</Text>
              <View style={styles.paidContainer}>
                  <Text style={styles.paidText}>Paid</Text>
              </View>
          </View>
      </View>
      </View>
    )
  }
  const AllBookings = ({ venueName, bookingTime, cancelled, useremail, companyemail, fieldname, price }) => {
    return (
        <View style={styles.card}>
            <View style={styles.row}>
                <Image source={img} style={styles.cardImage} />
                <View style={styles.cardTextContent}>
                    <Text style={styles.venueName}>{venueName}</Text>
                    <Text style={styles.bookingTime}>{bookingTime}</Text>
                    <View style={styles.paidContainer}>
                        <Text style={styles.paidText}>Paid</Text>
                    </View>
                </View>
            </View>
            {cancelled && (
                <View style={[styles.tagContainer, styles.refundedTag]}>
                    <Text style={styles.tagText}>Canceled & Refunded</Text>
                    <View style={styles.line} />
                    <View style={styles.bottomTagContainer}>
                        <Ionicons name="alert-circle-outline" size={24} color="#FF7878" />
                        <Text style={styles.bottomTagText}>You canceled this booking</Text>
                    </View>
                </View>
            )}
            {!cancelled && checkEventStatus(bookingTime) === "Not Started" &&
              (
                <View style={styles.tagContainer}>
                    <Text style={styles.tagText}>Upcoming</Text>
                    <CancelButton venueName={venueName} bookingTime={bookingTime} useremail ={useremail} companyemail={companyemail} fieldname={fieldname} price={price}/>
                </View>
              )
            }
        </View>
    );
  };
  const CanceledBookings = ({ venueName, bookingTime, cancelled }) => {
      if (cancelled) return (
          ( <View style={styles.card}>
              <View style={styles.row}>
                  <Image source={img} style={styles.cardImage} />
                  <View style={styles.cardTextContent}>
                      <Text style={styles.venueName}>{venueName}</Text>
                      <Text style={styles.bookingTime}>{bookingTime}</Text>
                      <View style={styles.paidContainer}>
                          <Text style={styles.paidText}>Paid</Text>
                      </View>
                  </View>
              </View>
              <View style={[styles.tagContainer, styles.refundedTag]}>
                  <Text style={styles.tagText}>Canceled & Refunded</Text>
                  <View style={styles.line} />
                  <View style={styles.bottomTagContainer}>
                      <Ionicons name="alert-circle-outline" size={24} color="#FF7878" />
                      <Text style={styles.bottomTagText}>You canceled this booking</Text>
                  </View>
              </View>
              </View>
          )
      );
      else return (<></>)
  };
  const UpcomingBookings = ({ venueName, bookingTime, cancelled, useremail, companyemail, fieldname }) => {
    if (!cancelled && checkEventStatus(bookingTime) === "Not Started") return (
        <View style={styles.card}>
            <View style={styles.row}>
                <Image source={img} style={styles.cardImage} />
                <View style={styles.cardTextContent}>
                    <Text style={styles.venueName}>{venueName}</Text>
                    <Text style={styles.bookingTime}>{bookingTime}</Text>
                    <View style={styles.paidContainer}>
                        <Text style={styles.paidText}>Paid</Text>
                    </View>
                </View>
            </View>
            <View style={styles.tagContainer}>
                <Text style={styles.tagText}>Upcoming</Text>
                <CancelButton venueName={venueName} bookingTime={bookingTime} useremail ={useremail} companyemail={companyemail} fieldname={fieldname}/>
            </View>
        </View>
    );
};
  const CompletedBookings = ({ venueName, bookingTime, cancelled }) => {
    if (! cancelled && checkEventStatus(bookingTime) === "Completed") return (
        <View style={styles.card}>
            <View style={styles.row}>
                <Image source={img} style={styles.cardImage} />
                <View style={styles.cardTextContent}>
                    <Text style={styles.venueName}>{venueName}</Text>
                    <Text style={styles.bookingTime}>{bookingTime}</Text>
                    <View style={styles.paidContainer}>
                        <Text style={styles.paidText}>Paid</Text>
                    </View>
                </View>
            </View>
        </View>
    );
  };
  const generateHourlySlots = (timeRange) => {
    const [time, date] = timeRange.split(' ');
    const [checkInTime, checkOutTime] = time.split('-');
    const startTime = moment(date + ' ' + checkInTime, 'YYYY-MM-DD HH:mm');
    const endTime = moment(date + ' ' + checkOutTime, 'YYYY-MM-DD HH:mm');
    const timeSlots = [];

    // Add the check-in time
    timeSlots.push(startTime.format('YYYY-MM-DD HH:mm'));

    let currentHour = startTime.clone().add(1, 'hour');
    while (currentHour.isBefore(endTime)) {
        timeSlots.push(currentHour.format('YYYY-MM-DD HH:mm'));
        currentHour.add(1, 'hour');
    }

    // Add the check-out time
    timeSlots.push(endTime.format('YYYY-MM-DD HH:mm'));
    console.log("Time slots: ", timeSlots)
    return timeSlots;
  };
  /////////////////////////////////////////////////////////////////
  return (
      <SafeAreaView style={styles.container}>
          <View style={styles.header}>
              <Image
                  source={require('../../assets/images/Logo.png')}
                  style={styles.logo}
              />
              <Text style={styles.headerTitle}>My Bookings</Text>
          </View>
          <View style={styles.pillContainer}>
              <PillButton text="All" isSelected={selectedCategory === 'All'} onPress={() => setSelectedCategory('All')} />
              <PillButton text="Ongoing" isSelected={selectedCategory === 'Ongoing'} onPress={() => setSelectedCategory('Ongoing')} />
              <PillButton text="Completed" isSelected={selectedCategory === 'Completed'} onPress={() => setSelectedCategory('Completed')} />
              <PillButton text="Up-coming" isSelected={selectedCategory === 'UpComing'} onPress={() => setSelectedCategory('UpComing')} />
              <PillButton text="Canceled" isSelected={selectedCategory === 'Canceled'} onPress={() => setSelectedCategory('Canceled')} />
          </View>
          <FlatList
              data= {bookings}
              renderItem={({ item }) => {
                  return (
                      <BookingsCard
                          venueName={(item.Field_Name).toString() + " " + (item.Company_Name).toString()}
                          bookingTime={item.Booking_Time}
                          cancelled={item.Canceled}
                          useremail = {item.User_Email}
                          companyemail = {item.Company_Email}
                          fieldname = {item.Field_Name}
                          price = {item.Total}
                      />
                  );
              }}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.bookingsListContainer}
          />
          <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={hideConfirmationModal}
          >
              <View style={styles.centeredModalView}>
                  <View style={styles.modalView}>
                      <Text style={styles.modalTitle}>Cancel Booking</Text>
                      <View style={styles.modalTitleLine} />
                      <Text style={styles.modalText}>
                          Are you sure you want to cancel your booking at{' '}
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
                              onPress={() => {
                                hideConfirmationModal()
                                cancelBooking(selectedVenue, selectedBooking, selectedUserEmail, selectedCompanyEmail, selectedFieldName, selectedPrice)                                
                                modifyBookedArray(selectedCompanyEmail, selectedFieldName, generateHourlySlots(selectedBooking))
                                fetchMyBookings()
                              }}
                              style={styles.modalConfirmButton}
                          >
                              <Text style={styles.modalButtonText}>Yes, Continue</Text>
                          </TouchableOpacity>
                      </View>
                  </View>
              </View>
          </Modal>
          <Navbar />
      </SafeAreaView>
  );
};

export default MyBookings;
