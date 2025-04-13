import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen'); // Width and height of the screen

// Height of the boxes holding the days of the current month
const boxSize = width <= height ? (width * 0.32) : (height * 0.32)

export const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      flex: 1
    },
    title: {
      fontSize: 50,
      marginTop: 12,
      paddingBottom: 16,
      textAlign: 'center',
    },
    moreInfoSection: {
      backgroundColor: 'azure',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 4
    },
    infoItemBox: {
      backgroundColor: 'lightblue',
      borderColor: '#6c8790',
      borderWidth: 2,
      borderRadius: 20,
      width: width <= height ? boxSize * 2.2 : boxSize * 0.5,
      height: width <= height ? boxSize * 0.65 : boxSize,
      margin: (boxSize * 0.13),
      justifyContent: 'center'
    },
    infoItemText: {
      fontSize: (boxSize * 0.18),
      textAlign: 'center'
    }
});

// StyleSheet for All Modals
export const modalStyles = StyleSheet.create({
  container: {
    backgroundColor: 'azure',
    flex: 1,
  },
  backButton: {
    width: '45%',
    paddingTop: '4%',
    paddingBottom: '4%',
    paddingLeft: '1.5%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  licenseContainer: {
    backgroundColor: 'lightblue',
    borderBottomWidth: 1,
    height: '70%'
  },
  licenseText: {
    padding: 8,
    fontSize: 16
  }
});
