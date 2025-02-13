import React from 'react'
import { Text, View, StyleSheet, SafeAreaView, Dimensions, Platform, TouchableOpacity } from "react-native"

var currentDay = new Date().getDate()
var currentMonth = new Date().getMonth()
var currentMonthName = getMonthName(currentMonth)
var currentYear = new Date().getFullYear()

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

// Determines the height of the calendar day boxes
var height = 0
if(Platform.OS === 'web') {
  height = Dimensions.get('window').height
}
else {
  height = Dimensions.get('screen').height
}
const calendarDayBoxHeight = height / 24

const Index = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Calendar */}
      <View style={{flex: 5.6, paddingLeft: '5%', paddingRight: '5%', paddingBottom: '5%', justifyContent: 'center'}}>
        {/* Displays the month name and year above the calendar */}
        <Text style={{fontSize: 34, textAlign: 'center', padding: 4}}>{currentMonthName} {currentYear}</Text>
        
        {/* Displays the days of the week at the top of the calendar */}
        <View style={{flexDirection: 'row', borderTopWidth: 1, borderLeftWidth: 1, borderRightWidth: 1}}>
          <Text style={styles.calendarDaysOfWeek}>Sun</Text>
          <Text style={styles.calendarDaysOfWeek}>Mon</Text>
          <Text style={styles.calendarDaysOfWeek}>Tues</Text>
          <Text style={styles.calendarDaysOfWeek}>Wed</Text>
          <Text style={styles.calendarDaysOfWeek}>Thurs</Text>
          <Text style={styles.calendarDaysOfWeek}>Fri</Text>
          <Text style={styles.calendarDaysOfWeek}>Sat</Text>
        </View>

        {/* Displays 6 weeks-worth of days and a filler number for text in each day */}
        <View>
          {/* Week 1 */}
          <View style={styles.calendarWeeksContainer}>
            <TouchableOpacity style={styles.calendarDayOutlines}> {/* Day 1 */}
              <Text style={styles.calendarDayText}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.calendarDayOutlines}> {/* Day 2 */}
              <Text style={styles.calendarDayText}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.calendarDayOutlines}> {/* Day 3 */}
              <Text style={styles.calendarDayText}>3</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.calendarDayOutlines}> {/* Day 4 */}
              <Text style={styles.calendarDayText}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.calendarDayOutlines}> {/* Day 5 */}
              <Text style={styles.calendarDayText}>5</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.calendarDayOutlines}> {/* Day 6 */}
              <Text style={styles.calendarDayText}>6</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.calendarDayOutlines}> {/* Day 7 */}
              <Text style={styles.calendarDayText}>7</Text>
            </TouchableOpacity>
          </View>

          {/* Week 2 */}
          <View style={styles.calendarWeeksContainer}>
            <TouchableOpacity style={styles.calendarDayOutlines}> {/* Day 1 */}
              <Text style={styles.calendarDayText}>8</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.calendarDayOutlines}> {/* Day 2 */}
              <Text style={styles.calendarDayText}>9</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.calendarDayOutlines}> {/* Day 3 */}
              <Text style={styles.calendarDayText}>10</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.calendarDayOutlines}> {/* Day 4 */}
              <Text style={styles.calendarDayText}>11</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.calendarDayOutlines}> {/* Day 5 */}
              <Text style={styles.calendarDayText}>12</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.calendarDayOutlines}> {/* Day 6 */}
              <Text style={styles.calendarDayText}>13</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.calendarDayOutlines}> {/* Day 7 */}
              <Text style={styles.calendarDayText}>14</Text>
            </TouchableOpacity>
          </View>

          {/* Week 3 */}
          <View style={styles.calendarWeeksContainer}>
            <TouchableOpacity style={styles.calendarDayOutlines}> {/* Day 1 */}
              <Text style={styles.calendarDayText}>15</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.calendarDayOutlines}> {/* Day 2 */}
              <Text style={styles.calendarDayText}>16</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.calendarDayOutlines}> {/* Day 3 */}
              <Text style={styles.calendarDayText}>17</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.calendarDayOutlines}> {/* Day 4 */}
              <Text style={styles.calendarDayText}>18</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.calendarDayOutlines}> {/* Day 5 */}
              <Text style={styles.calendarDayText}>19</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.calendarDayOutlines}> {/* Day 6 */}
              <Text style={styles.calendarDayText}>20</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.calendarDayOutlines}> {/* Day 7 */}
              <Text style={styles.calendarDayText}>21</Text>
            </TouchableOpacity>
          </View>

          {/* Week 4 */}
          <View style={styles.calendarWeeksContainer}>
            <TouchableOpacity style={styles.calendarDayOutlines}> {/* Day 1 */}
              <Text style={styles.calendarDayText}>22</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.calendarDayOutlines}> {/* Day 2 */}
              <Text style={styles.calendarDayText}>23</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.calendarDayOutlines}> {/* Day 3 */}
              <Text style={styles.calendarDayText}>24</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.calendarDayOutlines}> {/* Day 4 */}
              <Text style={styles.calendarDayText}>25</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.calendarDayOutlines}> {/* Day 5 */}
              <Text style={styles.calendarDayText}>26</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.calendarDayOutlines}> {/* Day 6 */}
              <Text style={styles.calendarDayText}>27</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.calendarDayOutlines}> {/* Day 7 */}
              <Text style={styles.calendarDayText}>28</Text>
            </TouchableOpacity>
          </View>

          {/* Week 5 */}
          <View style={styles.calendarWeeksContainer}>
            <TouchableOpacity style={styles.calendarDayOutlines}> {/* Day 1 */}
              <Text style={styles.calendarDayText}>29</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.calendarDayOutlines}> {/* Day 2 */}
              <Text style={styles.calendarDayText}>30</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.calendarDayOutlines}> {/* Day 3 */}
              <Text style={styles.calendarDayText}>31</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.calendarDayOutlines}> {/* Day 4 */}
              <Text style={styles.calendarDayText}>32</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.calendarDayOutlines}> {/* Day 5 */}
              <Text style={styles.calendarDayText}>33</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.calendarDayOutlines}> {/* Day 6 */}
              <Text style={styles.calendarDayText}>34</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.calendarDayOutlines}> {/* Day 7 */}
              <Text style={styles.calendarDayText}>35</Text>
            </TouchableOpacity>
          </View>

          {/* Week 6 */}
          <View style={styles.calendarWeeksContainer}>
            <TouchableOpacity style={styles.calendarDayOutlines}> {/* Day 1 */}
              <Text style={styles.calendarDayText}>36</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.calendarDayOutlines}> {/* Day 2 */}
              <Text style={styles.calendarDayText}>37</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.calendarDayOutlines}> {/* Day 3 */}
              <Text style={styles.calendarDayText}>38</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.calendarDayOutlines}> {/* Day 4 */}
              <Text style={styles.calendarDayText}>39</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.calendarDayOutlines}> {/* Day 5 */}
              <Text style={styles.calendarDayText}>40</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.calendarDayOutlines}> {/* Day 6 */}
              <Text style={styles.calendarDayText}>41</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.calendarDayOutlines}> {/* Day 7 */}
              <Text style={styles.calendarDayText}>42</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    backgroundColor: 'azure',
    fontSize: 20,
    textAlign: 'center',
    height: 36,
    alignContent: 'center',
    flex: 1
  },
  calendarDayOutlines: {
    borderWidth: 1,
    justifyContent: 'center',
    flex: 1
  },
  calendarWeeksContainer: {
    height: calendarDayBoxHeight,
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
