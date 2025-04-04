import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen'); // Width and height of the screen

// Height of the boxes holding the days of the current month
const daysBoxHeight = width <= height
  ? (width * 0.0725) - (width * 0.005)
  : (height * 0.035) - (height * 0.0001);

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    flex: 1,
  },
  arrowButtonsLocation: {
    height: 80,
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowButtonsImgs: {
    width: 24,
    height: 24,
  },
  calendarDaysOfWeek: {
    fontSize: 20,
    textAlign: 'center',
    alignContent: 'center',
    flex: 1,
  },
  calendarDayOutlines: {
    borderWidth: 0.5,
    borderColor: '#898989',
    height: daysBoxHeight,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  calendarWeeksContainer: {
    backgroundColor: 'azure',
    borderColor: '#898989',
    borderWidth: 1,
    height: 36,
    alignItems: 'center',
    flexDirection: 'row',
  },
  calendarDayText: {
    textAlign: 'center',
  },
  selectedDay: {
    backgroundColor: '#add8e6', // Light blue background to highlight selected day
    borderRadius: 50,
    width: daysBoxHeight * 0.8,
    height: daysBoxHeight * 0.8,
    justifyContent: 'center',
  },
  todayButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#b1d8ff',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 0.5,
  },
  todayButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textShadowColor: 'black',
    textShadowOffset: { width: 0.3, height: 0.3 },
    textShadowRadius: 1,
  },
  modifyDaySection: {
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    flexDirection: 'row',
    height: '100%',
    flex: 0.75,
  },
  modifyDayBox: {
    height: '100%',
    justifyContent: 'center',
  },
  journalInput: {
    height: 120,
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: 'white',
    textAlignVertical: 'top',
  },
});

// StyleSheet for Journal Entry Viewing Modal
export const journalEntryModalStyles = StyleSheet.create({
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
});

// StyleSheet for Search Modal
export const searchModalStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
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
  yearMonthDayBox: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderRadius: 20,
    padding: 8,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  yearMonthDayText: {
    fontSize: 24,
    textAlign: 'right',
    marginBottom: 4,
  },
  yearMonthDayInputText: {
    color: '#b1d8ff',
    textShadowColor: 'black',
    fontSize: 24,
    textAlign: 'center',
    textShadowOffset: { width: 0.25, height: 0.25 },
    textShadowRadius: 1,
    borderWidth: 0.5,
    borderRadius: 10,
    width: 70,
    marginBottom: 4,
  },
  keywordBox: {
    backgroundColor: 'white',
    fontSize: 16,
    borderWidth: 0.5,
    borderRadius: 5,
    width: 245,
    padding: 6,
  },
  searchButton: {
    width: '50%',
    alignItems: 'center',
    marginTop: 4,
    paddingTop: 8,
    paddingBottom: 8,
  },
  searchResultBoxes: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
    marginTop: 8,
  },
});

