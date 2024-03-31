import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#00170C',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingVertical: 16,
    backgroundColor: '#00170C',
    borderBottomWidth: 1,
    borderBottomColor: '#00170C',
  },
  backButton: {
    marginRight: 20,
  },
  headerTitle: {
    color: '#c4c4c4',
    fontSize: 24,
    fontFamily: 'Urbanist-Bold',
  },
  container: {
    flex: 1,
  },
  notificationCard: {
    flexDirection: 'row',
    padding: 20,
    margin: 10,
    backgroundColor: '#C4C4C4',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 10, // Add this line
    borderColor: '#D45A01', //
  },
  notificationTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  notificationTitle: {
    color: '#212121',
    fontSize: 18,
    fontFamily: 'Urbanist-Bold',
  },
  notificationDescription: {
    color: '#757575',
    fontSize: 15,
    fontFamily: 'Montserrat-Regular',
  },
  crossButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
