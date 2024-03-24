import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    backButton: {
      position: 'absolute',
      top: 27,
      left: 10,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#00170C', // Black background
      paddingTop: 40,
    },
    subheading: {
      fontSize: 16,
      marginBottom: 10,
      fontFamily: 'Urbanist', // Montserrat font
      color: '#C4C4C4', // Orange color from Screen1
      opacity: 0.75,
    },
    errorContainer: {
      alignItems: 'center',
      marginBottom: 10,
    },
    errorText: {
      color: 'red',
      marginBottom: 10,
    },
    inputContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputIcon: {
      flexDirection: 'row',
      // alignItems: 'center',
      marginBottom: 14,
    },
    icon: {
      width: 20,
      height: 20,
      marginRight: 15,
      position: 'absolute',
      left: 7, // Adjust left position to place the icon inside the TextInput
      marginTop: 21,
    },
    image: {
      width: 113, // Adjust this value
      height: 113, // Adjust this value
      marginTop: 10,
    },
    input: {
      fontSize: 16,
      height: 59,
      borderColor: '#853902',
      borderWidth: 1,
      marginBottom: 1,
      paddingLeft: 50, // Adjust paddingLeft to create space for the icon
      color: '#C4C4C4',
      backgroundColor: '#853902',
      borderRadius: 13,
      fontFamily: 'Urbanist',
      width: '95%' // Adjust paddingLeft to create space for the icon
    },
    button: {
      backgroundColor: '#853902',
      borderRadius: 56.5,
      padding: 13,
      bottom: -65,
      borderRadius: 25,
      borderWidth: 2,
      borderColor: '#FF6347', // Orange color from Screen1
      width: '99%', // Adjusted width to fit the screen
    },
    buttonBackground: {
      backgroundColor: '#D45A01', // Orange color from Screen1
    },
    buttonText: {
      color: '#C4C4C4',
      textAlign: 'center',
      fontFamily: 'Urbanist',
      fontSize: 17, // Urbanist font
    },
  
  });