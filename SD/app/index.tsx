import React, { useState } from 'react'
import { Text, View, StyleSheet, SafeAreaView, FlatList, Dimensions, Platform, TouchableOpacity, Image } from "react-native"
import { getMonthName } from '../additionalFiles/getMonthName.js' // Returns the name of the current month being considered

const calendarFlexSize = 4 // The flex size for the portion of the tab dedicated to the calendar

let width = 0 // Width of screen
let height = 0 // Height of screen
let daysBoxHeight = 0 // Height of the boxes holding the days of the current month

// Determines the width and height of the screen and sets the boxes holding the days of the calendar month to a size
if(Platform.OS === 'web') {
  width = Dimensions.get('window').width
  height = Dimensions.get('window').height

  daysBoxHeight = width <= height? width / 30 : height / 30
}
else {
  width = Dimensions.get('screen').width
  height = Dimensions.get('screen').height

  daysBoxHeight = width <= height? (width * 0.0725) - (width * 0.005): (height * 0.035) - (height * 0.0001)
}

const curDate = new Date() // Currently selected date to be displayed (defaults to actual date)

// All of the potential boxes that could be displayed on the calendar (6 possible weeks of 7 days = 42)
const DAYS_BOXES = [
  {id: 1},
  {id: 2},
  {id: 3},
  {id: 4},
  {id: 5},
  {id: 6},
  {id: 7},
  {id: 8},
  {id: 9},
  {id: 10},
  {id: 11},
  {id: 12},
  {id: 13},
  {id: 14},
  {id: 15},
  {id: 16},
  {id: 17},
  {id: 18},
  {id: 19},
  {id: 20},
  {id: 21},
  {id: 22},
  {id: 23},
  {id: 24},
  {id: 25},
  {id: 26},
  {id: 27},
  {id: 28},
  {id: 29},
  {id: 30},
  {id: 31},
  {id: 32},
  {id: 33},
  {id: 34},
  {id: 35},
  {id: 36},
  {id: 37},
  {id: 38},
  {id: 39},
  {id: 40},
  {id: 41},
  {id: 42},
]

const Index = () => {
  const [curDay, setCurDay] = useState(curDate.getDate())       // Updates the current day to be the day selected by the user
  const [curMonth, setCurMonth] = useState(curDate.getMonth())  // Updates the current month to be the month selected by the user
  const [curYear, setCurYear] = useState(curDate.getFullYear()) // Updates the current year to be the year selected by the user

  // Updates Calendar Header when one of the arrow buttons are pressed
  const updateCalendarHeader = (directionChanged: number) => {
    setCurMonth((curMonth + directionChanged) % 12)

    if(curMonth < 0) {
      setCurMonth(11)
      setCurYear(curYear - 1)
    }
    else if(curMonth > 11) {
      setCurMonth(0)
      setCurYear(curYear + 1)
    }
  }

  // Updates the day of the week of the month that was selected by the user's first day
  const [curStartingDayOfWeek, setCurStartingDayOfWeek] = useState(new Date(curDate.getFullYear(), curDate.getMonth(), 1).getDay())

  // Updates the number of days in the month that was selected by the user
  const [numDaysInCurMonth, setNumDaysInCurMonth] = useState(new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0).getDate())

  return (
    <SafeAreaView style={styles.container}>
      {/* Calendar */}
      <View style={{flex: calendarFlexSize, paddingLeft: '5%', paddingRight: '5%', marginBottom: '5%', justifyContent: 'flex-start'}}>
        {/* Displays the month name and year above the calendar */}
        <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
          {/* Left Arrow Button */}
          <TouchableOpacity style={styles.arrowButtonsLocation} onPress={() => {
            curDate.setMonth(curDate.getMonth() - 1)
            {updateCalendarHeader(-1)}
            setCurStartingDayOfWeek(new Date(curDate.getFullYear(), curDate.getMonth(), 1).getDay())
            setNumDaysInCurMonth(new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0).getDate())
          }}>
            <Image style={styles.arrowButtonsImgs} source={require('../assets/images/leftArrow.png')} accessibilityLabel='Left Arrow' />
          </TouchableOpacity>

          {/* Calendar Header (of Month and Year) */}
          <Text style={{fontSize: 38, textAlign: 'center', width: 280}}>{getMonthName(curDate.getMonth())} {curDate.getFullYear()}</Text>
        
          {/* Right Arrow Button */}
          <TouchableOpacity style={styles.arrowButtonsLocation} onPress={() => {
            curDate.setMonth(curDate.getMonth() + 1)
            {updateCalendarHeader(1)}
            setCurStartingDayOfWeek(new Date(curDate.getFullYear(), curDate.getMonth(), 1).getDay())
            setNumDaysInCurMonth(new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0).getDate())
          }}>
            <Image style={styles.arrowButtonsImgs} source={require('../assets/images/rightArrow.png')} />
          </TouchableOpacity>
        </View>


        {/* Displays the days of the week and days in the calendar */}
        <View>
          {/* Displays the days of the week at the top of the calendar */}
          <View style={styles.calendarWeeksContainer}>
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
            data={DAYS_BOXES.slice(0, Math.ceil((numDaysInCurMonth + curStartingDayOfWeek) / 7) * 7)} // Ensures only the necesary weeks are displayed (entire blank weeks prevented)
            renderItem={({index}) => {
              return(
                index >= curStartingDayOfWeek ? 
                  index < (numDaysInCurMonth + curStartingDayOfWeek) ? 
                    <TouchableOpacity style={styles.calendarDayOutlines} onPress={() => {
                      curDate.setDate((index - curStartingDayOfWeek) + 1)
                      {setCurDay((index - curStartingDayOfWeek) + 1)}
                    }}>
                      <Text style={styles.calendarDayText}>{(index - curStartingDayOfWeek) + 1}</Text>
                    </TouchableOpacity>
                  : <View style={styles.calendarDayOutlines}><Text></Text></View>
                : <View style={styles.calendarDayOutlines}><Text></Text></View>
              )
            }}
            scrollEnabled={false}
            numColumns={7}
            contentContainerStyle={{}}
          />
        </View>
      </View>


      {/* Summary */}
      <View style={styles.summary}>
        <Text style={styles.summaryDate}>{getMonthName(curDate.getMonth())} {curDate.getDate()}, {curDate.getFullYear()}</Text>

        <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna 
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis 
          aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
          cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
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
    justifyContent: 'center',
    flex: 1
  },
  arrowButtonsLocation: {
    height: 80,
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  arrowButtonsImgs: {
    width: 24,
    height: 24,
  },
  calendarDaysOfWeek: {
    fontSize: 20,
    textAlign: 'center',
    alignContent: 'center',
    flex: 1
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
    flex: 4.5
  },
  modifyDaySection: {
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    flexDirection: 'row',
    height: '100%',
    flex: 0.75
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
