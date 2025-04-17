import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('screen') // Width and height of the screen

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
})

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
  modalTypeTitle: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    fontSize: 32,
    textAlign: 'center',
    padding: 32,
    margin: 0.25
  },
  graphInputBox: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderRadius: 15,
    padding: 8,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 8,
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  graphDropdownButton: {
    borderWidth: 1,
    borderRadius: 4,
    width: 165,
    marginLeft: 40,
    paddingTop: 8,
    paddingBottom: 8,
    alignItems: 'center',
    flexDirection: 'row',
  },
  graphDropdownMenu: {
    backgroundColor: 'white',
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderBottomWidth: 0.5,
    width: 165,
    marginLeft: 40,
    zIndex: 1
  },
  graphDropdownMenuButton: {
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    width: 165,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute'
  },
  graphInputEnterButton: {
    backgroundColor: '#18576D',
    borderColor: '#43B0D8',
    borderWidth: 0.5,
    borderRadius: 20,
    width: 75,
    height: 30,
    justifyContent: 'center',
    marginRight: 20
  },
  graphBox: {
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1.25,
    borderRadius: 20,
    width: 350,
    height: 315,
    padding: 8,
    alignSelf: 'center'
  },
  yAxisImages: {
    width: 20,
    height: 20,
    margin: 3.5,
    marginLeft: 12,
    marginBottom: 6.5
  },
  packageButtons: {
    backgroundColor: 'lightblue',
    borderColor: 'gray',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    padding: 16,
    marginBottom: 4
  },
  licenseContainer: {
    backgroundColor: 'lightblue',
    borderBottomWidth: 1,
    height: '65%'
  },
  licenseText: {
    padding: 8,
    fontSize: 16
  },
  assessmentContainer: {
    flex: 1,
    padding: 16,
  },
  rangeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  rangeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#F0F4F8',
  },
  selectedRange: {
    backgroundColor: '#18576D',
  },
  rangeButtonText: {
    fontSize: 16,
    color: '#333',
  },
  selectedRangeText: {
    color: 'white',
  },
  insightsContainer: {
    paddingBottom: 20,
  },
  insightCard: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  insightEmoji: {
    fontSize: 32,
    marginRight: 16,
    width: 40, 
    textAlign: 'center',
  }, 
  insightTextContainer: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#18576D',
    marginBottom: 4,
  },
  insightValue: {
    fontSize: 14,
    color: '#666',
  },
  noDataText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  }
});
