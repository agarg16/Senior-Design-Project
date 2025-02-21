import React from 'react'
import { Text, View, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from "react-native"

var currentDay = new Date().getDate()
var currentMonth = new Date().getMonth()
var currentMonthName = getMonthName(currentMonth)
var currentYear = new Date().getFullYear()

const curStartingDayOfWeek: number = new Date(currentYear, currentMonth, 1).getDay()
var numDaysInCurMonth: number = new Date(currentYear, currentMonth + 1, 0).getDate()

// Returns the name of the current month being considered
function getMonthName(month: number) {
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

const DAYS_BOXES = [
  {title: 1},
  {title: 2},
  {title: 3},
  {title: 4},
  {title: 5},
  {title: 6},
  {title: 7},
  {title: 8},
  {title: 9},
  {title: 10},
  {title: 11},
  {title: 12},
  {title: 13},
  {title: 14},
  {title: 15},
  {title: 16},
  {title: 17},
  {title: 18},
  {title: 19},
  {title: 20},
  {title: 21},
  {title: 22},
  {title: 23},
  {title: 24},
  {title: 25},
  {title: 26},
  {title: 27},
  {title: 28},
  {title: 29},
  {title: 30},
  {title: 31},
  {title: 32},
  {title: 33},
  {title: 34},
  {title: 35},
  {title: 36},
  {title: 37},
  {title: 38},
  {title: 39},
  {title: 40},
  {title: 41},
  {title: 42},
]


const Index = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Calendar */}
      <View style={{flex: 5.6, paddingLeft: '5%', paddingRight: '5%', justifyContent: 'center'}}>
        {/* Displays the month name and year above the calendar */}
        <Text style={{fontSize: 36, textAlign: 'center', padding: 8}}>{currentMonthName} {currentYear}</Text>
        
        {/* Displays the days of the week at the top of the calendar */}
        <View style={{backgroundColor: 'azure', flexDirection: 'row', borderTopWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, height: 36, alignItems: 'center'}}>
          <Text style={styles.calendarDaysOfWeek}>Sun</Text>
          <Text style={styles.calendarDaysOfWeek}>Mon</Text>
          <Text style={styles.calendarDaysOfWeek}>Tues</Text>
          <Text style={styles.calendarDaysOfWeek}>Wed</Text>
          <Text style={styles.calendarDaysOfWeek}>Thurs</Text>
          <Text style={styles.calendarDaysOfWeek}>Fri</Text>
          <Text style={styles.calendarDaysOfWeek}>Sat</Text>
        </View>

        
        {/* Displays 6 weeks-worth of days and a filler number for text in each day */}
        <FlatList
          data={DAYS_BOXES}
          renderItem={({index}) => {
            return(
              /* DAYS_BOXES.length - (numDaysInCurMonth + curStartingDayOfWeek) < 7 ? */
                index >= curStartingDayOfWeek ? 
                  index < (numDaysInCurMonth + curStartingDayOfWeek) ? 
                    <TouchableOpacity style={styles.calendarDayOutlines}>
                      <Text style={styles.calendarDayText}>{(index - curStartingDayOfWeek) + 1}</Text>
                    </TouchableOpacity>
                  : <View style={styles.calendarDayOutlines}><Text></Text></View>
                : <View style={styles.calendarDayOutlines}><Text></Text></View>
              /* : null */
            )
          }}
          scrollEnabled={false}
          numColumns={7}
          contentContainerStyle={{}}
        />
      </View>
      

      {/* Summary */}
      <View style={styles.summary}>
        <Text style={styles.summaryDate}>{currentMonthName} {currentDay}, {currentYear}</Text>

        <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
      </View>

      {/* Add/Edit Day Buttons */}
      <View style={styles.modifyDaySection}>
        <View style={{height: '100%', borderRightWidth: 1, flex: 1}}>
          <TouchableOpacity style={styles.modifyDayBox}>
            <Text style={{textAlign: 'center'}}>[Add to Day]</Text>
          </TouchableOpacity>
        </View>
        <View style={{height: '100%', flex: 1}}>
          <TouchableOpacity style={styles.modifyDayBox}>
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
  calendarDaysOfWeek: {
    fontSize: 20,
    textAlign: 'center',
    alignContent: 'center',
    flex: 1
  },
  calendarDayOutlines: {
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  calendarWeeksContainer: {
    flexDirection: 'row'
  },
  calendarDayText: {
    textAlign: 'center'
  },
  summary: {
    backgroundColor: 'azure',
    borderColor: 'black',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    fontSize: 14,
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
    height: '100%',
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
