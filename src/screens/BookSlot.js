import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, SafeAreaView, Image, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useFonts } from 'expo-font';
import moment from 'moment';
import { styles } from '../../assets/styles/bookslotStyles';

const TimePicker = ({ selectedValue, onValueChange, visible, onClose, availableTimeSlots }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.pickerContainer}>
          <FlatList
            data={availableTimeSlots}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => onValueChange(item)} style={styles.option}>
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const CalendarComponent = () => {
  const [loaded] = useFonts({
    UrbanistRegular: require('../../assets/fonts/Urbanist/static/Urbanist-Regular.ttf'),
    UrbanistBold: require('../../assets/fonts/Urbanist/static/Urbanist-SemiBold.ttf'),
    UrbanistMedium: require('../../assets/fonts/Urbanist/static/Urbanist-Medium.ttf'),
    UrbanistSemiBold: require('../../assets/fonts/Urbanist/static/Urbanist-SemiBold.ttf'),
    MontserratBold: require('../../assets/fonts/Montserrat/static/Montserrat-Bold.ttf'),
    MontserratExtraLight: require('../../assets/fonts/Montserrat/static/Montserrat-ExtraLight.ttf'),
    MontserratSemiBold: require('../../assets/fonts/Montserrat/static/Montserrat-SemiBold.ttf'),
  });

  

  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');
  const [showCheckInPicker, setShowCheckInPicker] = useState(false);
  const [showCheckOutPicker, setShowCheckOutPicker] = useState(false);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [bookedTimeSlots, setBookedTimeSlots] = useState([]);
  const [timeDifference, setTimeDifference] = useState(0);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [continueButtonVisible, setContinueButtonVisible] = useState(true);
  const [currentHour, setCurrentHour] = useState('');
  const [openHours, setOpenHours] = useState('');

  const fieldEX = "Indoor court";
  const companyEX = "5th gen";
  const pricePerHour = 2000;

  useEffect(() => {
    getBookings();
    getOpenHours();
  }, []);

  const getBookings = async () => {
    try {
      const response = await fetch(`http://192.168.100.15:3000/already-booked?field=${fieldEX}&company=${companyEX}`);
      const data = await response.json(); // Parse the JSON response
      if (data) {
        setBookedTimeSlots(data); // Set the parsed data to bookedTimeSlots
      } else {
        setBookedTimeSlots([]);
      }
    } catch (error) {
      console.error('Error fetching booked time slots:', error.message);
    }
  };

  const getOpenHours = async () => {
    try {
      const response = await fetch(`http://192.168.100.15:3000/open-hours?field=${fieldEX}&company=${companyEX}`);
      const data = await response.json(); // Parse the JSON response
      if (data) {
        setOpenHours(data); // Set the parsed data to openHours
      } else {
        console.log("No open hours");
        setOpenHours(""); // Set openHours to empty string or whatever default value you want
      }
    } catch (error) {
      console.error('Error fetching open hours:', error.message);
    }
  };


  const generateTimeSlots = (openHours, selectedCheckOutTime, alreadyBooked) => {
    const [open, close] = openHours.split('-');
    const openTime = moment(open, 'HH:mm');
    let closeTime = moment(close, 'HH:mm');
  
    // Adjust close time based on the selected check-out time
    if (selectedCheckOutTime) {
      const selectedCheckOutMoment = moment(selectedCheckOutTime, 'HH:mm');
      if (selectedCheckOutMoment.isBefore(closeTime)) {
        closeTime = selectedCheckOutMoment;
      }
    }
  
    if (closeTime.isBefore(openTime)) {
      closeTime.add(1, 'day');
    }
  
    const timeSlots = [];
    let currentTimeSlot = openTime.clone();
  
    // Get the current time
    const currentTime = moment();
  
    while (currentTimeSlot.isBefore(closeTime)) {
      // Check if the current time slot is in the future
      if (currentTimeSlot.isAfter(currentTime)) {
        // Limit check-in time to one hour less than the selected check-out time
        if (
          selectedCheckOutTime &&
          moment(currentTimeSlot).add(1, 'hour').isAfter(moment(selectedCheckOutTime, 'HH:mm'))
        ) {
          break;
        }
  
        // If check-in time is 23:00, limit check-out time to 00:00 on the next day
        if (
          currentTimeSlot.hour() === 23 &&
          currentTimeSlot.minutes() === 0 &&
          currentTime.hour() === 23 &&
          (!selectedCheckOutTime || selectedCheckOutTime !== '00:00')
        ) {
          break; // Stop loop after excluding 23:00
        }
  
        const currentTimeSlotStr = currentTimeSlot.format('YYYY-MM-DD HH:mm');
        if (!alreadyBooked.includes(currentTimeSlotStr)) {
          timeSlots.push(currentTimeSlotStr);
        }
      }
  
      currentTimeSlot.add(1, 'hour');
    }
  
    return timeSlots;
  };
  
  const removePastBookings = (momentArray) => {
    const currentDate = moment(); // Current date and time
    return momentArray.filter(momentStr => moment(momentStr, 'YYYY-MM-DD HH:mm').isAfter(currentDate));
  };


  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     await Promise.all([getBookings(), getOpenHours()]);
  //     // After both fetching functions are complete, generate the time slots
  //     const generatedTimeSlots = generateTimeSlots(openHours, checkOutTime, removePastBookings(bookedTimeSlots));
  //     setCurrentHour(moment().format('HH:mm'));
  //     setAvailableTimeSlots(generatedTimeSlots);
  //   };
  
  //   fetchData();
  // }, [checkOutTime]);
  
  useEffect(() => {
    const generatedTimeSlots = generateTimeSlots(openHours, checkOutTime, removePastBookings(bookedTimeSlots));
    setCurrentHour(moment().format('HH:mm'));
    setAvailableTimeSlots(generatedTimeSlots);
    // setAvailableTimeSlots(generatedTimeSlots.filter(slot => slot > moment().format('HH:mm')));
    console.log("checkin time slots useEffect: ", availableTimeSlots)
  }, [checkOutTime]);

  useEffect(() => {
    if (checkInTime && checkOutTime) {
      const checkInMoment = moment(checkInTime, 'YYYY-MM-DD HH:mm');
      const checkOutMoment = moment(checkOutTime, 'YYYY-MM-DD HH:mm');
      const differenceHours = checkOutMoment.diff(checkInMoment, 'hours', true);
      setTimeDifference(differenceHours);
  
      // Generate an array of all hours between check-in and check-out times
      const hoursInRange = [];
      let currentHour = checkInMoment.clone();
      while (currentHour.isBefore(checkOutMoment)) {
        hoursInRange.push(currentHour.format('YYYY-MM-DD HH:mm'));
        currentHour.add(1, 'hour');
      }
  
      // Check if any of the hours in range are already booked
      const isAnyHourBooked = hoursInRange.some(hour => bookedTimeSlots.includes(hour));
  
      if (isAnyHourBooked) {
        setErrorModalVisible(true); // Show the error modal
        setContinueButtonVisible(false); // Hide the continue button
      } else {
        setErrorModalVisible(false); // Hide the error modal
        setContinueButtonVisible(true); // Show the continue button
      }
    }
  }, [checkInTime, checkOutTime, bookedTimeSlots]);

  if (!loaded) {
    // Return a loading indicator or null if fonts are not loaded yet
    return null; // Or render a loading spinner, etc.
  }
  const onDayPress = (day) => {
    const selected = moment(day.dateString);
    if (selected.isSameOrAfter(moment(), 'day')) {
      setSelectedDate(selected.format('YYYY-MM-DD'));
    }
  };

  const handleCheckInChange = (time) => {
    setCheckInTime(time);
    setShowCheckInPicker(false);

    // Reset checkout time
    setCheckOutTime('');
  };

  const handleCheckOutChange = (time) => {
    setCheckOutTime(time);
    setShowCheckOutPicker(false);
  };

  const filteredCheckOutTimeSlots = [];
  let i = availableTimeSlots.indexOf(checkInTime) + 1;
  let lastSlot = '';

  while (i < availableTimeSlots.length) {
    const currentSlot = availableTimeSlots[i];
    const previousSlot = availableTimeSlots[i - 1];

    if (checkInTime && currentSlot && previousSlot) {
      const currentSlotHours = parseInt(currentSlot.split(':')[0]);
      const previousSlotHours = parseInt(previousSlot.split(':')[0]);

      if (currentSlotHours - previousSlotHours >= 2) {
        lastSlot = previousSlot;
        break;
      }
    }

    filteredCheckOutTimeSlots.push(currentSlot);
    i++;
  }

  if (lastSlot) {
    const lastHour = parseInt(lastSlot.split(':')[0]) + 1;
    if (lastHour < 24) {
      filteredCheckOutTimeSlots.push(`${lastHour.toString().padStart(2, '0')}:00`);
    }
  }

  const generateHourlySlots = (checkInTime, checkOutTime) => {
    const startTime = moment(checkInTime, 'YYYY-MM-DD HH:mm');
    const endTime = moment(checkOutTime, 'YYYY-MM-DD HH:mm');
    const timeSlots = [];
  
    // Add the check-in time
    timeSlots.push(startTime.format('YYYY-MM-DD HH:mm'));
  
    // Check if the check-out time is on the same day
    if (endTime.isSame(startTime, 'day')) {
      let currentHour = startTime.clone().add(1, 'hour');
      while (currentHour.isBefore(endTime)) {
        timeSlots.push(currentHour.format('YYYY-MM-DD HH:mm'));
        currentHour.add(1, 'hour');
      }
    } else {
      // Check-out time is on the next day
      let currentHour = startTime.clone().startOf('day').add(1, 'hour');
      while (currentHour.isBefore(endTime)) {
        timeSlots.push(currentHour.format('YYYY-MM-DD HH:mm'));
        currentHour.add(1, 'hour');
      }
    }
  
    // Add the check-out time
    timeSlots.push(endTime.format('YYYY-MM-DD HH:mm'));
  
    return timeSlots;
  };
  
  
  const ContinueButton = () => {
    const handleContinue = () => {
      console.log("Checkin time: ", checkInTime)
      console.log("Checkout time: ", checkOutTime)
      console.log("Array generated: ", generateHourlySlots(checkInTime, checkOutTime))
    };

    return (
      <TouchableOpacity onPress={handleContinue} style={styles.continueButton}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {}}>
          <Image source={require('../../assets/images/white_back_arrow.png')} style={styles.arrowIcon} />
        </TouchableOpacity>
        <Text style={styles.selectDateText}>Select Date</Text>
      </View>
      <View style={styles.calendarContainer}>
        <View style={styles.calendar}>
          <Calendar
            current={selectedDate}
            minDate={new Date().toString()} // Set minimum date to today
            maxDate={new Date().toString()} // Set maximum date to selectedDate
            onDayPress={onDayPress}
            markingType={'custom'}
            markedDates={{
              [selectedDate]: {
                customStyles: {
                  container: { backgroundColor: '#D45A01', borderRadius: 20 },
                  text: { color: '#C4C4C4', fontFamily: 'UrbanistBold' },
                },
              },
            }}
            theme={{
              backgroundColor: '#00170C',
              calendarBackground: '#00170C',
              textSectionTitleColor: '#C4C4C4',
              textDayHeaderFontWeight: 'bold',
              selectedDayBackgroundColor: '#D45A01',
              selectedDayTextColor: '#C4C4C4',
              todayTextColor: '#D45A01',
              dayTextColor: '#C4C4C4',
              textDisabledColor: '#666666',
              arrowColor: '#C4C4C4',
              monthTextColor: '#C4C4C4',
              textMonthFontFamily: 'UrbanistBold',
            }}
          />
        </View>
      </View>

      <View style={styles.timePickerContainer}>
        <View style={styles.timePicker}>
          <Text style={[styles.label, styles.checkInLabel]}>Start time</Text>
          <TouchableOpacity onPress={() => setShowCheckInPicker(true)} style={[styles.button, styles.checkInButton]}>
            <Text style={styles.buttonText}>{checkInTime || '00:00'}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => {}} style={styles.backArrowContainer}>
          <Image source={require('../../assets/images/forward_arrow.png')} style={styles.backArrowImage} />
        </TouchableOpacity>

        <View style={styles.timePicker}>
          <Text style={[styles.label, styles.checkOutLabel]}>End time</Text>
          <TouchableOpacity onPress={() => setShowCheckOutPicker(true)} style={[styles.button, styles.checkOutButton]}>
            <Text style={styles.buttonText}>{checkOutTime || '00:00'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TimePicker
        visible={showCheckInPicker}
        selectedValue={checkInTime}
        onValueChange={handleCheckInChange}
        onClose={() => setShowCheckInPicker(false)}
        availableTimeSlots={availableTimeSlots}
      />

      <TimePicker
        visible={showCheckOutPicker}
        selectedValue={checkOutTime}
        onValueChange={handleCheckOutChange}
        onClose={() => setShowCheckOutPicker(false)}
        availableTimeSlots={filteredCheckOutTimeSlots}
      />

      {checkInTime && checkOutTime && continueButtonVisible && (
        <View style={styles.guestsContainer}>
          <Text style={styles.guestsText}>Total amount: {timeDifference.toFixed(2) * pricePerHour} PKR</Text>
        </View>
      )}

      <Modal visible={errorModalVisible} transparent={true} animationType="fade">
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.errorText}>Error: Next hour is already booked!</Text>
            <TouchableOpacity onPress={() => setErrorModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>


      {continueButtonVisible && <ContinueButton />}
    </SafeAreaView>
  );
};

export default CalendarComponent;

// Fetch alreadyBooked array (array of moment objects) from DB
// apply removePastBookings and get new updated array of alreadyBooked time slots
// render available times with this array => const generateTimeSlots = (openHours, selectedCheckOutTime, alreadyBooked)
// select checkInTime, checkOutTime, selectedDate & create a moment array with it using makeCurrentBookingArray.
// move this array onto payments page.
// The attributes below will be fetched from DB.