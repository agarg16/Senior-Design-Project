import { StyleSheet } from "react-native";

/* Styles for the main check-in screen */
export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  question: {
    backgroundColor: 'white',
    fontSize: 36,
    paddingLeft: '2%',
    paddingRight: '2%',
    paddingBottom: 12,
    textAlign: 'center'
  },
  activitiesTitleHeader: {
    backgroundColor: 'lightblue',
    borderColor: 'black',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    padding: 16,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  activitiesTitleText: {
    textAlign: 'center',
    fontSize: 36
  },
  textInActivityBox: {
    fontSize: 16,
    textAlign: 'center',
    padding: 8
  },
  defaultActivities: {
    backgroundColor: '#c2e2ec',
    borderRadius: 20,
    borderColor: '#82a2ac',
    borderWidth: 2,
    marginLeft: 5,
    width: 132
  }
})

/* Styles for the modal screen when an activity is selected */
export const modalStyles = StyleSheet.create({
  container: {
    backgroundColor: 'azure',
    flex: 1
  },
  backButton: {
    width: '45%',
    paddingTop: '4%',
    paddingBottom: '4%',
    paddingLeft: '1.5%',
    alignItems: 'center',
    flexDirection: 'row'
  },
  boxStyling: {
    backgroundColor: 'lightblue',
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingLeft: '4%',
    paddingRight: '4%',
    paddingTop: 8,
    paddingBottom: 24,
    marginLeft: 8,
    marginRight: 8
  },
  unitsLabel: {
    fontSize: 28,
    paddingBottom: '2%',
    justifyContent: 'center'
  },
  saveButton: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  saveButtonText: {
    color: '#3D3C3C',
    textDecorationLine: 'underline',
    fontSize: 14,
    paddingTop: '4%',
    paddingBottom: '4%'
  },
  inputBox: {
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    height: 36,
    padding: 8,
    width: '100%',
    alignSelf: 'center'
  },
  addButton: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  }
})
