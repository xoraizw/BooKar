import moment from 'moment';

function makeCurrentBookingArray(checkInTime, checkOutTime, date) {
    const startTime = moment(`${date} ${checkInTime}`, 'YYYY-MM-DD HH:mm');
    const endTime = moment(`${date} ${checkOutTime}`, 'YYYY-MM-DD HH:mm');
    const momentArray = [];
  
    // Loop from check-in time to check-out time and add each moment to the array
    while (startTime.isBefore(endTime)) {
      momentArray.push(startTime.clone());
      startTime.add(1, 'hour'); // Increment by 1 hour
    }
  
    return momentArray;
  }

const openHours = '11:00-03:00';
const pricePerHour = 2000;
const alreadyBooked = ["11:00", "16:00", "17:00", "18:00"]

console.log(makeCurrentBookingArray(checkInTime,checkOutTime,selectedDate))
