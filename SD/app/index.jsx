import React from 'react'
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native"

var currentDay = new Date().getDate()
var currentMonth = new Date().getMonth()
var currentMonthName = getMonthName(currentMonth)
var currentYear = new Date().getFullYear()

// Returns the name of the current month being considered
function getMonthName(month) {
  switch(month) {
    case 0:
      return "January"
    case 1:
      return "February"
    case 2:
      return "March"
    case 3:
      return "April"
    case 4:
      return "May"
    case 5:
      return "June"
    case 6:
      return "July"
    case 7:
      return "August"
    case 8:
      return "September"
    case 9:
      return "October"
    case 10:
      return "November"
    case 11:
      return "December"
    default:
      return "N/A"
  }
}

const Index = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.homeCalendar}>
        <Text style={{fontSize: 34, textAlign: 'center'}}>{currentMonthName} {currentYear}</Text>
        <Text style={{textAlign: 'center'}}>[Calendar]</Text>
      </View>

      <View style={styles.summary}>
        <Text style={styles.summaryDate}>{currentMonthName} {currentDay}, {currentYear}</Text>

        <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
      </View>

      <View style={styles.modifyDaySection}>
        <View style={{height: '100%', borderRightWidth: 1, flex: 1}}>
          <TouchableOpacity style={styles.modifyDayBox}>
            <Text style={{textAlign: 'center'}}>[Add to Day]</Text>
          </TouchableOpacity>
        </View>
        <View style={{height: '100%', flex: 1}}>
          <TouchableOpacity style={{justifyContent: 'center', height: '100%'}}>
            <Text style={{textAlign: 'center'}}>[Edit Day]</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  homeCalendar: {
    padding: 4,
    flex: 7
  },
  summary: {
    backgroundColor: 'azure',
    borderColor: 'black',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    fontSize: '14',
    paddingTop: '4%',
    paddingLeft: '6%',
    paddingRight: '6%',
    flex: 5
  },
  modifyDaySection: {
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    flexDirection: 'row',
    flex: 1
  },
  modifyDayBox: {
    height: '100%',
    justifyContent: 'center'
  },
  summaryDate: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 16
  }
})

export default Index
