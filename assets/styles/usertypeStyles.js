import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    joinFamilyContainer: {
      position: 'absolute',
      alignItems: 'flex-start',
    },
    joinFamilyText: {
      fontSize: 45
      ,
      color: '#D45A01',
      // fontWeight: 'bold',
      fontFamily: 'Montserrat',
    },
    icon: {
      width: 150,
      height: 150,
    },
    // ...
    buttonText: {
      color: '#FFF',
      fontFamily: 'Montserrat',
      fontSize: 19,
      backgroundColor: 'transparent', // Add this line
    },
    touchableOpacity: {
      alignItems: 'center',
      borderWidth: 2, // Outline width
      backgroundColor: 'transparent',
      width: 150, // Add this line
      height: 150,
      borderRadius: 10,
    },
    // ...
    // Add the same for the text underneath if it has a separate style
    textUnderneath: {
      // ...
      backgroundColor: 'transparent', // Add this line
    },
    // ...
  
    selected: {
      borderColor: '#D45A01',
      borderWidth: 5.5,
      borderRadius: 10, // Selected outline color
    },
    // selectedImage: {
    //   borderColor: '#FFB8B8', // Selected image outline color
    // },
    nextButton: {
      alignItems: 'center',
      backgroundColor: '#D45A01',
      padding: 13,
      marginBottom: 10,
      marginHorizontal: 10,
      borderRadius: 26.5,
      marginTop: -55,
      
      
    },
  });
  