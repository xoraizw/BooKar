// HomePage.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HomePage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Your Home Page</Text>
      <Text style={styles.subtitle}>This is a basic homepage component.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
  },
});
// import React from 'react';
// import { ScrollView, View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';

// const App = () => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Image source={require('../../assets/images/bookar-logo.png')} style={styles.logo} />
//         <Text style={styles.greeting}>Hello, Shajee</Text>
//       </View>
      
//       <View style={styles.searchContainer}>
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search fields near you"
//           placeholderTextColor="#C4C4C4"
//         />
//         <TouchableOpacity style={styles.searchIcon}>
//           {/* Include search icon image */}
//         </TouchableOpacity>
//       </View>
      
//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.categoriesContainer}>
//         {['Recommended', 'Popular', 'Trending', 'Book A Field'].map((category) => (
//           <TouchableOpacity key={category} style={styles.categoryTab}>
//             <Text style={styles.categoryText}>{category}</Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>
      
//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.featuredContainer}>
//         {/* Include images and details for each location */}
//       </ScrollView>
      
//       <View style={styles.recentlyBookedHeader}>
//         <Text style={styles.sectionTitle}>Recently Booked</Text>
//         <TouchableOpacity>
//           <Text style={styles.seeAllText}>See All</Text>
//         </TouchableOpacity>
//       </View>
      
//       {/* Include recently booked items */}
      
//       <View style={styles.bottomNav}>
//         {/* Include bottom navigation icons and labels */}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#00170C', // Dark theme background
//   },
//   header: {
//     marginTop: 50, // Adjust according to status bar height
//     marginLeft: 20,
//     marginRight: 20,
//   },
//   logo: {
//     width: 100,
//     height: 40,
//     resizeMode: 'contain',
//   },
//   greeting: {
//     fontSize: 26,
//     color: '#fff',
//     fontFamily: 'Montserrat-Regular',
//     marginTop: 10,
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     margin: 20,
//     backgroundColor: 'rgba(133, 57, 2, 0.75)', // Search bar color with opacity
//     borderRadius: 10,
//     padding: 10,
//   },
//   searchInput: {
//     flex: 1,
//     fontFamily: 'Montserrat-Regular',
//     color: '#fff',
//   },
//   searchIcon: {
//     // Style for search icon container
//   },
//   categoriesContainer: {
//     // Style for categories ScrollView
//   },
//   categoryTab: {
//     backgroundColor: '#D45A01', // Orange color for tabs
//     // Other styles like padding, margin, borderRadius, etc.
//   },
//   categoryText: {
//     fontFamily: 'Montserrat-Regular',
//     color: '#fff',
//   },
//   featuredContainer: {
//     // Style for featured locations ScrollView
//   },
//   recentlyBookedHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     margin: 20,
//   },
//   sectionTitle: {
//     fontFamily: 'Montserrat-Bold',
//     fontSize: 20,
//     color: '#fff',
//   },
//   seeAllText: {
//     fontFamily: 'Montserrat-Regular',
//     color: '#fff',
//   },
//   bottomNav: {
//     // Style for bottom navigation bar
//     backgroundColor: '#00170C', // Matching the background color
//   },
//   // Bottom navigation icon styles
//   navItem: {
//     // Style for each navigation item
//   },
//   navItemText: {
//     color: '#7D7D7D', // Default color
//     // Style for the text
//   },
//   navItemTextActive: {
//     color: '#D45A01', // Color when pressed
//     // Style for the text when active
//   },
// }); 