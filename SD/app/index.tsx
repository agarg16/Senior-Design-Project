import React, { useState, useEffect } from 'react'
import { Text, View, ScrollView, StyleSheet, TextInput, SafeAreaView, FlatList, Dimensions, Platform, TouchableOpacity, Image, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Modal } from "react-native"
import { getMonthName } from '../additionalFiles/getMonthName.js' // Returns the name of the current month being considered
import { getEntry, updateJournalEntry, filterByDate } from '../database/database'
import { Ionicons } from '@expo/vector-icons';

const calendarFlexSize = 4 // The flex size for the portion of the tab dedicated to the calendar
var daysBoxHeight = 0      // Height of the boxes holding the days of the current month

var width = Dimensions.get('screen').width   // Width of device screen
var height = Dimensions.get('screen').height // Height of device screen

daysBoxHeight = width <= height ? (width * 0.0725) - (width * 0.005) : (height * 0.035) - (height * 0.0001)

const curDate = new Date() // Currently selected date to be displayed (defaults to actual date)

// All of the potential boxes that could be displayed on the calendar (6 possible weeks of 7 days = 42)
const DAYS_BOXES = 
 [{  id: 1 }, {  id: 2 }, {  id: 3 }, {  id: 4 }, {  id: 5 }, {  id: 6 }, {  id: 7 },
  {  id: 8 }, {  id: 9 }, { id: 10 }, { id: 11 }, { id: 12 }, { id: 13 }, { id: 14 },
  { id: 15 }, { id: 16 }, { id: 17 }, { id: 18 }, { id: 19 }, { id: 20 }, { id: 21 },
  { id: 22 }, { id: 23 }, { id: 24 }, { id: 25 }, { id: 26 }, { id: 27 }, { id: 28 },
  { id: 29 }, { id: 30 }, { id: 31 }, { id: 32 }, { id: 33 }, { id: 34 }, { id: 35 },
  { id: 36 }, { id: 37 }, { id: 38 }, { id: 39 }, { id: 40 }, { id: 41 }, { id: 42 }]



const Index = () => {
  const [modalType, setModalType] = useState(0)

  const [curDay, setCurDay] = useState(curDate.getDate())       // Updates the current day to be the day selected by the user
  const [curMonth, setCurMonth] = useState(curDate.getMonth())  // Updates the current month to be the month selected by the user
  const [curYear, setCurYear] = useState(curDate.getFullYear()) // Updates the current year to be the year selected by the user

  const [viewModalVisible, setViewModalVisible] = useState(false) // Whether or not the view modal is visible to the user
  const [modalTypeSelected, setModalTypeSelected] = useState("")  // A numerical representation of the modal type that the user selected

  // Updates Calendar Header when one of the arrow buttons are pressed
  const updateCalendarHeader = (directionChanged: number) => {
    setCurMonth((curMonth + directionChanged) % 12)

    if (curMonth < 0) {
      setCurMonth(11)
      setCurYear(curYear - 1)
    }
    else if (curMonth > 11) {
      setCurMonth(0)
      setCurYear(curYear + 1)
    }
  }

  // Updates the day of the week of the month that was selected by the user's first day
  const [curStartingDayOfWeek, setCurStartingDayOfWeek] = useState(new Date(curDate.getFullYear(), curDate.getMonth(), 1).getDay())

  // Updates the number of days in the month that was selected by the user
  const [numDaysInCurMonth, setNumDaysInCurMonth] = useState(new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0).getDate())

  const [userYearText, setUserYearText] = useState(curDate.getFullYear())

  const [userEntryText, setUserEntryText] = useState("") // The text entered into the TextInput by the user
  const [visibleEntry, setVisibleEntry] = useState("")   // The journal entry that corresponds to the day that was selected for viewing

  // Finds the entry for a given date
  const getCurDateEntry = async (date: string) => {
    const entry = await getEntry(date)

    if(entry === "") { setVisibleEntry("") }
    else { setVisibleEntry(entry) }
  }

  // Updates the entry for the current date
  const updateEntry = async (date: Date, entry: string) => {
    const currentEnteredDate = (new Date(date.getFullYear(), date.getMonth(), date.getDate())).toISOString().split("T")[0]

    updateJournalEntry(currentEnteredDate, entry) 

    getCurDateEntry(currentEnteredDate)
  }

  // Finds the current day's entry when either the view modal is visible or the current day is modified
  useEffect(() => {getCurDateEntry((new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate())).toISOString().split("T")[0])}, [viewModalVisible === true, curDay])

  // Ensures the correct modal (journal entry or search) is opened on the first press of the selected button
  useEffect(() => {
    if(modalType === 0) { setModalTypeSelected("journal-entry") }
    else { setModalTypeSelected("search") }
  }, [modalType])

  /* Stores search feature's start year, month, day, and the full date converted into the database's string format */
  const [startYear, setStartYear] = useState(2020) // The year the user selects as the start year in the filter (default as arbitrary year)
  const [startMonth, setStartMonth] = useState(0)  // The month the user selects as the start month in the filter (default as January)
  const [startDay, setStartDay] = useState(1)      // The day the user selects as the start day in the filter (default as the 1st day of the month)
  const [startDateString, setStartDateString] = useState(new Date(startYear, startMonth, startDay).toISOString().split("T")[0]) // The string representation of the user's selected start date in the filter
  
  const [endYear, setEndYear] = useState(new Date().getFullYear()) // The year the user selects as the end year in the filter (default as current year)
  const [endMonth, setEndMonth] = useState(11)                     // The month the user selects as the end month in the filter (default as December)
  const [endDay, setEndDay] = useState(31)                         // The day the user selects as the end day in the filter (default as the 31st day for the month of December)
  const [endDateString, setEndDateString] = useState(new Date(endYear, endMonth, endDay).toISOString().split("T")[0]) // The string representation of the user's selected end date in the filter

  const [keyword, setKeyword] = useState("") // The keyword the user selects as part of what to filter in the journal entries
  const [updateUsingSearchButton, setUpdateUsingSearchButton] = useState(false) // Switches between true and false when search button is pressed to trigger useEffect for updating start and end dates

  const [filteredJournalEntries, setFilteredJournalEntries] = useState<{date: string, journalEntry: string}[]>([]) // The returned values after the filter query has been applied to the journal entries

  /* Updates the date for the filter Start date that the user enters */
  useEffect(() => {
    var year = startYear
    var month = startMonth - 1
    var day = startDay

    /* Values to use in place of empty boxes for the end year, month, or day */
    if(startYear === -1) { year = 2020 }
    if(startMonth === -1) {  month = 0 }
    if(startDay === -1) { day = 1 }

    setStartDateString((new Date(year, month, day)).toISOString().split("T")[0])
  }, [startDay, startMonth, startYear])

  /* Updates the date for the filter End date that the user enters */
  useEffect(() => {
    var year = endYear
    var month = endMonth - 1
    var day = endDay

    /* Values to use in place of empty boxes for the end year, month, or day */
    if(endYear === -1) { year = new Date().getFullYear() }
    if(endMonth === -1) {  month = 11 }
    if(endDay === -1) {
      month += 1
      day = 0
    }

    setEndDateString((new Date(year, month, day)).toISOString().split("T")[0])
  }, [endDay, endMonth, endYear])

  /* Filters journal entries by a starting and ending date */
  const filterJournalEntries = async () => {
    if(startDateString != "" && endDateString != "") {
      const entries = await filterByDate(startDateString, endDateString, keyword)

      setFilteredJournalEntries(entries)
    }
  }
  useEffect(() => { filterJournalEntries() }, [updateUsingSearchButton])

  return (
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : undefined} style={{flex: 1}}>
            {/* Search Button */}
            <TouchableOpacity style={{backgroundColor: 'azure', borderWidth: 1, flexDirection: 'row', height: 38}} onPress={() => {
              {setViewModalVisible(true)}
              {setModalType(1)}
              }}>
              <Text style={{color: 'gray', fontSize: 18, width: '100%', textAlign: 'center', alignSelf: 'center'}}>Search for Entry</Text>
              <Ionicons style={{color: 'gray', fontSize: 28, padding: 4, position: 'absolute', right: 0}} name='search-outline' />
            </TouchableOpacity>
            
            {/* Calendar */}
            <View style={{ flex: calendarFlexSize, paddingLeft: '5%', paddingRight: '5%', marginBottom: '5%', justifyContent: 'flex-start' }}>
              {/* Displays the month name and year above the calendar */}
              <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                {/* Left Arrow Button */}
                <TouchableOpacity style={styles.arrowButtonsLocation} onPress={() => {
                  curDate.setMonth(curDate.getMonth() - 1)
                  { updateCalendarHeader(-1) }
                  setCurStartingDayOfWeek(new Date(curDate.getFullYear(), curDate.getMonth(), 1).getDay())
                  setNumDaysInCurMonth(new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0).getDate())
                }}>
                  <Image style={styles.arrowButtonsImgs} source={require('../assets/images/leftArrow.png')} accessibilityLabel='Left Arrow' />
                </TouchableOpacity>

                {/* Calendar Header (of Month and Year) */}
                <Text style={{ fontSize: 38, textAlign: 'center', width: 280 }}>{getMonthName(curDate.getMonth())} {curDate.getFullYear()}</Text>

                {/* Right Arrow Button */}
                <TouchableOpacity style={styles.arrowButtonsLocation} onPress={() => {
                  curDate.setMonth(curDate.getMonth() + 1)
                  { updateCalendarHeader(1) }
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


                {/* Displays the minimum weeks-worth of days needed to display all days of the month and a filler number for text in each day */}
                <FlatList
                  data={DAYS_BOXES.slice(0, Math.ceil((numDaysInCurMonth + curStartingDayOfWeek) / 7) * 7)} // Ensures only the necesary weeks are displayed (entire blank weeks prevented)
                  renderItem={({ index }) => {
                    const day = index - curStartingDayOfWeek + 1;
                    const isSelected = curDate.getDate() === day;
                    return (
                      index >= curStartingDayOfWeek ?
                        index < (numDaysInCurMonth + curStartingDayOfWeek) ?
                          <TouchableOpacity
                            style={styles.calendarDayOutlines}
                            onPress={() => {
                              curDate.setDate((index - curStartingDayOfWeek) + 1)
                              { setCurDay((index - curStartingDayOfWeek) + 1) }
                            }}>
                              <View style={isSelected && styles.selectedDay}>
                            <Text style={[styles.calendarDayText]}>{(index - curStartingDayOfWeek) + 1}</Text>
                            </View>
                          </TouchableOpacity>
                          : <View style={styles.calendarDayOutlines}><Text></Text></View>
                        : <View style={styles.calendarDayOutlines}><Text></Text></View>
                    )
                  }}
                  scrollEnabled={false}
                  numColumns={7}
                />
              </View>

              {/* Today Button */}
              <TouchableOpacity
                style={styles.todayButton}
                onPress={() => {
                  const today = new Date()
                  curDate.setFullYear(today.getFullYear(), today.getMonth(), today.getDate())
                  setCurDay(today.getDate())
                  setCurMonth(today.getMonth())
                  setCurYear(today.getFullYear())
                  setCurStartingDayOfWeek(new Date(curDate.getFullYear(), curDate.getMonth(), 1).getDay())
                  setNumDaysInCurMonth(new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0).getDate())
                }}>
                <Text style={styles.todayButtonText}>Today</Text>
              </TouchableOpacity>
            </View>

            {/* Summary */}
            <View style={{ backgroundColor: 'azure', padding: 10, borderWidth: 1 }}>
              {/* Current Date, Delete Button, and Whether or Not There Are Journal Entries */}
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                {/* Current Date */}
                <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
                  {curDate.toLocaleString('default', { month: 'long' })} {curDate.getDate()}, {curDate.getFullYear()}
                </Text>

                {/* View Button */}
                <TouchableOpacity style={{width: '25%', alignItems: 'flex-end', justifyContent: 'center'}} onPress={() => {
                  {setViewModalVisible(true)}
                  {setModalType(0)}
                  {getCurDateEntry((new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate())).toISOString().split("T")[0])}
                }}>
                  <Text style={{color: '#555555', fontSize: 14, textDecorationLine: 'underline', marginTop: '1%', marginRight: '6%'}}>View</Text>
                </TouchableOpacity>
              </View>

              {/* Whether or Not There Are Journal Entries */}
              <Text style={{marginBottom: 5, width: '90%'}} numberOfLines={1}>{visibleEntry ? visibleEntry : "No journal entry for this day."}</Text>

              {/* Entry Input */}
              <ScrollView style={styles.journalInput} automaticallyAdjustKeyboardInsets={false}>
                <TextInput
                  style={{padding: 8, height: 120}}
                  multiline
                  placeholder={visibleEntry ? visibleEntry : "Write your journal entry here..."}
                  placeholderTextColor={visibleEntry ? "black" : "gray"}
                  defaultValue={visibleEntry}
                  onChangeText={newText => {setUserEntryText(newText)}}
                />
              </ScrollView>

              {/* Insert Entry Button */}
              <TouchableOpacity style={{ marginTop: 10, padding: 10, backgroundColor: "#b1d8ff", borderColor: '#aaa', borderRadius: 5, borderWidth: 0.25 }} onPress={() => updateEntry(curDate, userEntryText)}>
                <Text style={{ textAlign: "center" }}>Insert Entry</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
      
      {/* Displays Selected Modal (Journal Entry or Search) */}
      {modalTypeSelected === "journal-entry" ?
        /* Journal Entry Modal */
        <Modal visible={viewModalVisible} onRequestClose={() => setViewModalVisible(false)} animationType='slide' presentationStyle='pageSheet'>
          <SafeAreaView style={journalEntryModalStyles.container}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : undefined} style={{ flex: 1 }}>
                {/* Back Button */}
                <TouchableOpacity style={journalEntryModalStyles.backButton} onPress={() => setViewModalVisible(false)}>
                  <Ionicons name="chevron-back" color={'#18576D'} size={20} />
                  <Text style={{color: '#18576D', fontSize: 16}}>Back</Text>
                </TouchableOpacity>

                <ScrollView style={{padding: 8, paddingLeft: 16, paddingRight: 16}}>
                  <Text>{visibleEntry}</Text>
                </ScrollView>
              </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
          </SafeAreaView>
        </Modal>

        /* Search Modal */
      : <Modal visible={viewModalVisible} onRequestClose={() => setViewModalVisible(false)} animationType='slide' presentationStyle='pageSheet'>
          <SafeAreaView style={searchModalStyles.container}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : undefined} style={{ flex: 1 }}>
                {/* Back Button */}
                <TouchableOpacity style={searchModalStyles.backButton} onPress={() => setViewModalVisible(false)}>
                  <Ionicons name="chevron-back" color={'#18576D'} size={20} />
                  <Text style={{color: '#18576D', fontSize: 16}}>Back</Text>
                </TouchableOpacity>

                {/* Search Options Box */}
                <View style={{backgroundColor: 'white', margin: 20, paddingTop: 8, paddingBottom: 8, borderWidth: 1, borderRadius: 20}}>
                  {/* Start and End Input Dates */}
                  <View style={{justifyContent: 'space-evenly', flexDirection: 'row'}}>
                    {/* Start Date Input */}
                    <View style={{alignItems: 'center'}}>
                      <Text style={{fontSize: 32, paddingBottom: 4}}>Start</Text>

                      <View style={searchModalStyles.yearMonthDayBox}>
                        <View style={{paddingRight: 4}}>
                          <Text style={searchModalStyles.yearMonthDayText}>Year:</Text>
                          <Text style={searchModalStyles.yearMonthDayText}>Month:</Text>
                          <Text style={searchModalStyles.yearMonthDayText}>Day:</Text>
                        </View>

                        <View>
                          <TextInput
                            style={searchModalStyles.yearMonthDayInputText}
                            placeholder='----'
                            placeholderTextColor={'lightblue'}
                            textAlign='center'
                            keyboardType='number-pad'
                            maxLength={4}
                            onChangeText={newText => {newText == "" ? setStartYear(-1) : setStartYear(Number(newText))}}
                          />

                          <TextInput
                            style={searchModalStyles.yearMonthDayInputText}
                            placeholder='--'
                            placeholderTextColor={'lightblue'}
                            textAlign='center'
                            keyboardType='number-pad'
                            maxLength={2}
                            onChangeText={newText => {newText == "" ? setStartMonth(-1) : setStartMonth(Number(newText))}}
                          />

                          <TextInput
                            style={searchModalStyles.yearMonthDayInputText}
                            placeholder='--'
                            placeholderTextColor={'lightblue'}
                            textAlign='center'
                            keyboardType='number-pad'
                            maxLength={2}
                            onChangeText={newText => {newText == "" ? setStartDay(-1) : setStartDay(Number(newText))}}
                          />
                        </View>
                      </View>
                    </View>

                    {/* End Date Input */}
                    <View style={{alignItems: 'center'}}>
                      <Text style={{fontSize: 32, paddingBottom: 4}}>End</Text>

                      <View style={searchModalStyles.yearMonthDayBox}>
                        <View style={{paddingRight: 4}}>
                          <Text style={{fontSize: 24, textAlign: 'right', marginBottom: 4}}>Year:</Text>
                          <Text style={{fontSize: 24, textAlign: 'right', marginBottom: 4}}>Month:</Text>
                          <Text style={{fontSize: 24, textAlign: 'right', marginBottom: 4}}>Day:</Text>
                        </View>

                        <View>
                          <TextInput
                            style={searchModalStyles.yearMonthDayInputText}
                            placeholder='----'
                            placeholderTextColor={'lightblue'}
                            textAlign='center'
                            keyboardType='number-pad'
                            maxLength={4}
                            onChangeText={newText => {newText == "" ? setEndYear(-1) : setEndYear(Number(newText))}}
                          />

                          <TextInput
                            style={searchModalStyles.yearMonthDayInputText}
                            placeholder='--'
                            placeholderTextColor={'lightblue'}
                            textAlign='center'
                            keyboardType='number-pad'
                            maxLength={2}
                            onChangeText={newText => {newText == "" ? setEndMonth(-1) : setEndMonth(Number(newText))}}
                          />

                          <TextInput
                            style={searchModalStyles.yearMonthDayInputText}
                            placeholder='--'
                            placeholderTextColor={'lightblue'}
                            textAlign='center'
                            keyboardType='number-pad'
                            maxLength={2}
                            onChangeText={
                              newText => {newText == "" ? setEndDay(-1) : setEndDay(Number(newText))}}
                          />
                        </View>
                      </View>
                    </View>
                  </View>

                  {/* Keyword Input */}
                  <View style={{paddingTop: 16, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                    <Text style={{fontSize: 20, paddingRight: 4}}>Keyword:</Text>
                    <TextInput 
                      style={searchModalStyles.keywordBox}
                      placeholder='Enter a Keyword to Start Search'
                      placeholderTextColor={'gray'}
                      onChangeText={newText => { setKeyword(newText) }}
                    />
                  </View>

                  {/* Search Button */}
                  <View style={{alignItems: 'center'}}>
                    <TouchableOpacity style={searchModalStyles.searchButton} onPress={() => {
                      {setUpdateUsingSearchButton(!updateUsingSearchButton)}
                    }}>
                      <Text style={{fontSize: 16, textDecorationLine: 'underline'}}>Search</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Entries that Meet Filter Criteria */}
                <View style={{flex: 1}}>
                  <FlatList 
                    data={filteredJournalEntries}
                    renderItem={({ item }) => {
                      var date = new Date(item.date)
                      var monthName = getMonthName(date.getMonth())

                      return (
                        <View>
                          <Text>{monthName} {date.getDate() + 1}, {date.getFullYear()}: {item.journalEntry}</Text>
                        </View>
                      )
                    }}
                    contentContainerStyle={{flex: 1}}
                  />
                </View>
              </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
          </SafeAreaView>
        </Modal>}
    </>
  );
}



/* StyleSheet for Main Index Screen */
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
    textAlign: 'center',
  },
  selectedDay: {
    backgroundColor: '#add8e6', // Light blue background to highlight selected day
    borderRadius: 50,
    width: daysBoxHeight * 0.8,
    height: daysBoxHeight * 0.8,
    justifyContent: 'center'
  },
  todayButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#b1d8ff',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 0.5
  },
  todayButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textShadowColor: 'black',
    textShadowOffset: { width: 0.3, height: 0.3 },
    textShadowRadius: 1
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
  journalInput: {
    height: 120,
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: 'white',
    textAlignVertical: 'top'
  }
})

/* StyleSheet for Journal Entry Viewing Modal */
const journalEntryModalStyles = StyleSheet.create({
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
  }
})

/* StyleSheet for Search Modal */
const searchModalStyles = StyleSheet.create({
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
  yearMonthDayBox: {
    backgroundColor: 'azure',
    borderWidth: 2,
    borderRadius: 20,
    padding: 8,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  yearMonthDayText: {
    fontSize: 24,
    textAlign: 'right',
    marginBottom: 4
  },
  yearMonthDayInputText: {
    backgroundColor: 'white',
    color: '#b1d8ff',
    textShadowColor: 'black',
    fontSize: 24,
    textAlign: 'center',
    textShadowOffset: { width: 0.25, height: 0.25 },
    textShadowRadius: 1,
    borderWidth: 0.5,
    borderRadius: 10,
    width: 70,
    marginBottom: 4
  },
  keywordBox: {
    backgroundColor: 'azure',
    fontSize: 16,
    borderWidth: 0.5,
    borderRadius: 5,
    width: 245,
    padding: 6
  },
  searchButton: {
    width: '50%',
    alignItems: 'center',
    marginTop: 4,
    paddingTop: 8,
    paddingBottom: 8
  }
})

export default Index
