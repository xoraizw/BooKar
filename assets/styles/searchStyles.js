import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#00170C',
      paddingHorizontal: 10, // Add paddingHorizontal to container
    },
    searchBar: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(133, 56, 2, 0.75)', 
      paddingHorizontal: 10,
      borderRadius: 10,
      marginVertical: 10,
      width: 355,
      height: 40,
      marginTop: 60,
      marginLeft: 10,
    },
    searchInput: {
      flex: 1,
      color: '#C4C4C4',
      fontSize: 14,
      fontFamily: 'UrbanistRegular',
      marginLeft: 10,
    },
    pillContainer: {
      marginTop: 10,
      paddingHorizontal: 5,
      height: 40,
      marginBottom: 12,
      marginLeft: 7,
    },
    pill: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 16,
      borderWidth: 1,
      borderColor: '#D45A01',
      backgroundColor: '#00170C',
    },
    selectedPill: {
      backgroundColor: '#D45A01',
    },
    pillText: {
      fontFamily: 'UrbanistSemiBold',
      color: '#C4C4C4',
      fontSize: 14,
    },
    selectedPillText: {
      fontFamily: 'UrbanistRegular',
      color: '#FFFFFF',
    },
    arenaContainer: {
      position: 'absolute',
      top: 155,
      left: 10,
      width: '100%',
      height: '73%',
    },
    arenaCard: {
      backgroundColor: 'rgba(133, 57, 2, 0.75)', 
      borderRadius: 12,
      margin: 12,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 1,
      width: 164,
      height: 240,
    },
    arenaImage: {
      width: 141,
      height: 130,
      aspectRatio: 1,
      borderRadius: 12,
      marginTop: 10,
      marginBottom: 5,
      zIndex: 1,
    },
    detailsContainer: {
      alignItems: 'flex-start',
      alignSelf: 'flex-start',
      marginBottom: 10,
      marginLeft: 17,
    },
    name: {
      fontFamily: 'UrbanistBold',
      fontSize: 17,
      marginTop: 4,
      color: '#C4C4C4',
      textAlign: 'left',
    },
    distance: {
      fontSize: 14,
      marginTop: 2,
      color: '#C4C4C4',
      fontFamily: 'UrbanistRegular',
      textAlign: 'left',
    },
    bottomRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 5,
      paddingHorizontal: 10,
      width: '100%',
    },
    leftSection: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    starIcon: {
      width: 20,
      height: 20,
      marginRight: 5,
      marginLeft: 5,
      marginBottom: 5,
    },
    rating: {
      fontFamily: 'UrbanistRegular',
      fontSize: 14,
      marginLeft: -2,
    },
    price: {
      fontFamily: 'UrbanistRegular',
      fontSize: 14,
      color: '#C4C4C4',
    },
    navbar: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      width: '106%',
      height: '8%', // Adjust the height as needed
      backgroundColor: '#00170C',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      borderTopLeftRadius: 12, // Rounded top left corner
      borderTopRightRadius: 12, // Rounded top right corner
    },
    navbarTab: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    navbarTabSelected: {
      justifyContent: 'center',
      alignItems: 'center',
      color: 'orange',
    },
    navbarText: {
      fontSize: 10,
      marginTop: 4,
      color: '#C4C4C4',
    },
  });