import React from 'react'
import { Text, View, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from "react-native"

var currentDay = new Date().getDate()
var currentMonth = new Date().getMonth()
var currentMonthName = getMonthName(currentMonth)
var currentYear = new Date().getFullYear()
// var totalDaysInCurrentMonth = new Date(currentYear, currentMonth + 1, 0)
// var firstDayDayOfWeek = ((new Date(currentYear, currentMonth, 1)).getDay())
// const ALL_POSSIBLE_DAYS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]

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

const DAYS_OF_WEEK = [ { title: 'Sun' }, { title: 'Mon' }, { title: 'Tues' }, { title: 'Wed' }, { title: 'Thurs' }, { title: 'Fri' }, { title: 'Sat' } ]

const DayOfWeek = ({title}) => (
  <View style={{margin: 10}}>
    <Text style={{width: 50, textAlign: 'center'}}>{title}</Text>
  </View>
)

const Index = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.homeCalendarSection}>
        <Text style={{fontSize: 34, textAlign: 'center'}}>{currentMonthName} {currentYear}</Text>
        
        {/* Displays the days of the week at the top of the calendar */}
        <FlatList 
          data={DAYS_OF_WEEK}
          renderItem={({item}) => <DayOfWeek title={item.title} />}
          scrollEnabled={false}
          numColumns={7}

          contentContainerStyle={styles.calendar}
        />
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
  homeCalendarSection: {
    padding: 4,
    flex: 7
  },
  calendar: {
    backgroundColor: 'azure',
    borderWidth: 1,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'
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
