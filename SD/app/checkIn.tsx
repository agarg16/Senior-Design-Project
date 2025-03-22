import React, { useEffect, useState } from 'react'
import { Text, TextInput, View, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Modal, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Image } from "react-native"
import { Ionicons } from '@expo/vector-icons'

import { addDate,
         updateFood, getBreakfast,
         getLunch, getDinner,
         getSnacks, updateWater, 
         getWater, updateMood,
         getMorningMood, getMiddayMood, getNighttimeMood,
         getSleepTotal, updateSleepTotal,
         getUniqueActivities, addActivity, updateActivity, getUnitType, getActivityTypeAmnt
        } from '../database/database'

const CheckIn = () => {
  const [modalType, setModalType] = useState("update")
  const [listOfActivityButtons, setListOfActivityButtons] = useState<string[]>([]) // Stores the distinct activity names that the user has entered
  const [updateTextWith, setUpdateTextWith] = useState("") // A way to update the text useStates
  const [textInputVal, setTextInputVal] = useState("") // A default value to display in the activity input text box

  const [keyboardTypeName, setKeyboardTypeName] = useState("default")     // The keyboard type to bring up when the user goes to fill in an activity amount
  const [activityModalVisible, setActivityModalVisible] = useState(false) // Whether or not the modal is visible to the user
  const [selectedActivity, setSelectedActivity] = useState("")            // The name of the activity the user selected
  const [selectedActivityUnit, setSelectedActivityUnit] = useState("")    // The unit of measurement for the current activity being looked at
  const [selectedActivityText, setSelectedActivityText] = useState("")    // The text-based input of the activity being looked at (meals for example)
  const [selectedActivityVal, setSelectedActivityVal] = useState(0)       // The numerical-based input of the activity being looked at (mood and sleep for example)

  const [curDate, setCurDate] = useState(new Date().toISOString().split("T")[0]) // The current date

  // Adds the current date into the table (if it is not already there)
  const addDateIntoTable = async () => { await addDate(curDate) }

  // Updates the value for a meal (breakfast, lunch, dinner, or snack) for the current day
  const updateMeal = async (mealType: string) => { await updateFood(selectedActivityText, curDate, mealType) }

  // Updates the value for water for the current day
  const updateWaterValue = async () => { await updateWater(selectedActivityText, curDate) }

  // Updates the value for a mood (morning, midday, or nighttime) for the current day
  const updateMoodVal = async (timeOfDay: string) => { await updateMood(selectedActivityText, curDate, timeOfDay) }

  // Updates the value for the sleep total for a given day
  const updateSleepValue = async () => { await updateSleepTotal(selectedActivityText, curDate) }

  

  // Finds what breakfast the user has entered for the current day
  const getBreakfastValue = async () => {
    const breakfast = await getBreakfast(curDate)

    setSelectedActivityText(breakfast[0].breakfastMeal)
  }

  // Finds what lunch the user has entered for the current day
  const getLunchValue = async () => {
    const lunch = await getLunch(curDate)

    setSelectedActivityText(lunch[0].lunchMeal)
  }

  // Finds what dinner the user has entered for the current day
  const getDinnerValue = async () => {
    const dinner = await getDinner(curDate)

    setSelectedActivityText(dinner[0].dinnerMeal)
  }

  // Finds what snacks the user has entered for the current day
  const getSnackValue = async () => {
    const snack = await getSnacks(curDate)

    setSelectedActivityText(snack[0].snackMeal)
  }

  // Finds what water the user has entered for the current day
  const getWaterValue = async () => {
    const water = await getWater(curDate)

    // Ensures the user doesn't see "null" in the text input box when there is no water total for the given date
    if(water[0].waterTotal !== null) { setSelectedActivityVal(water[0].waterTotal) }
    else { setSelectedActivityVal(0) }
  }

  // Finds what mood the user has entered for the current day based on the mood selected
  const getMoodValue = async(timeOfDay: string) => {
    if(timeOfDay == "Morning Mood") {
      const morningVal = await getMorningMood(curDate)

      // Ensures the mood doesn't see "null" in the text input box when there is no value for the given date
      if(morningVal[0].morningMood !== null) { setSelectedActivityVal(morningVal[0].morningMood) }
      else { setSelectedActivityVal(0) }
    }
    else if (timeOfDay == "Midday Mood") {
      const middayVal = await getMiddayMood(curDate)

      // Ensures the mood doesn't see "null" in the text input box when there is no value for the given date
      if(middayVal[0].middayMood !== null) { setSelectedActivityVal(middayVal[0].middayMood) }
      else { setSelectedActivityVal(0) }
    }
    else {
      const nighttimeVal = await getNighttimeMood(curDate)

      // Ensures the mood doesn't see "null" in the text input box when there is no value for the given date
      if(nighttimeVal[0].nighttimeMood !== null) { setSelectedActivityVal(nighttimeVal[0].nighttimeMood) }
      else { setSelectedActivityVal(0) }
    }
  }



  // Finds what sleep total the user has entered for the current day
  const getSleepValue = async () => {
    const sleep = await getSleepTotal(curDate)

    // Ensures the user doesn't see "null" in the text input box when there is no water total for the given date
    if(sleep[0].sleepTotal !== null) { setSelectedActivityVal(sleep[0].sleepTotal) }
    else { setSelectedActivityVal(0) }
  }

  // Gets all previously entered custom activities
  const getPrevActivities = async () => {
    const activitiesFromDB = await getUniqueActivities()

    var onlyActivities: string[] = []
    for(var i = 0; i < activitiesFromDB.length; i++) {
      if(i === 0) {
        onlyActivities[0] = activitiesFromDB[0].exerciseName
      }
      else {
        onlyActivities = [...onlyActivities, activitiesFromDB[i].exerciseName]
      }
    }

    setListOfActivityButtons(onlyActivities)
  }

  var textBox1 = ""
  var textBox2 = ""
  const [finalTextBoxContent, setFinalTextBoxContent] = useState("") // Allows the selectedActivityText to be updated immediately upon change in numerical input from text input
  const [defaultMood, setDefaultMood] = useState(String(selectedActivityVal)) // Allows the selectedActivityText to be updated immediately upon change in mood selection

  // Gets the unit of the current activity and finds the current amount of the activity unit for the current day
  const getUnit = async (activityName: string) => {
    var unit = await getUnitType(activityName)
    if(unit !== null) {
      setSelectedActivityUnit(unit.exerciseUnit)
    }
    else {
      setSelectedActivityUnit("")
    }

    // Gets the current amount being stored in the database
    var amnt = await getActivityTypeAmnt(activityName, curDate)
    console.log(amnt)
    setTextInputVal(amnt.toString())
  }

  const addActivityButton = (activityName:string, activityUnit: string) => {
    if(listOfActivityButtons.find(name => name === activityName) !== null) {
      setListOfActivityButtons([...listOfActivityButtons, activityName])
      addActivity(curDate, activityName, activityUnit)
    }
    else {
      return (
        <Text style={{backgroundColor: 'yellow'}}>That activity has already been created</Text>
      )
    }
  }

  /* Updates the current custom activity to have the user-submitted amount */
  const updateActivityButton = async (activityName: string, activityAmnt: number) => { await updateActivity(curDate, activityName, activityAmnt) }

  /* The type of view that displays when the user selects an activity */
  type ViewType = { name: string }
  const ActivityView = (props: ViewType) => {
    if(props.name.includes("Mood")) {
      return (
        <View style={{alignItems: 'center'}}>
          {/* Mood Images to Choose From */}
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => {
              {setSelectedActivityText("1")}
            }}>
              <Image source={require('../assets/images/1.png')} style={{width: 45, height: 45, margin: 4}}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
              {setSelectedActivityText("2")}
            }}>
              <Image source={require('../assets/images/2.png')} style={{width: 45, height: 45, margin: 4}}/>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => {
              {setSelectedActivityText("3")}
            }}>
              <Image source={require('../assets/images/3.png')} style={{width: 45, height: 45, margin: 4}}/>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => {
              {setSelectedActivityText("4")}
            }}>
              <Image source={require('../assets/images/4.png')} style={{width: 45, height: 45, margin: 4}}/>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => {
              {setSelectedActivityText("5")}
            }}>
              <Image source={require('../assets/images/5.png')} style={{width: 45, height: 45, margin: 4}}/>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => {
              {setSelectedActivityText("6")}
            }}>
              <Image source={require('../assets/images/6.png')} style={{width: 45, height: 45, margin: 4}}/>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => {
              {setSelectedActivityText("7")}
            }}>
              <Image source={require('../assets/images/7.png')} style={{width: 45, height: 45, margin: 4}}/>
            </TouchableOpacity>
          </View>

          {/* The Current Selected Mood Displayed */}
          <View style={{backgroundColor: 'azure', marginTop: 16, padding: 4, alignItems: 'center', borderWidth: 1, borderRadius: 10, width: '75%'}}>
            <Text style={{fontSize: 20}}>Current Selected Mood:</Text>
              {(selectedActivityText=="" || selectedActivityText=="0") && <Text style={{fontSize: 16, margin: 17}}>None</Text>}
              {selectedActivityText=="1" && <Image source={require('../assets/images/1.png')} style={{width: 45, height: 45, margin: 4}}/>}
              {selectedActivityText=="2" && <Image source={require('../assets/images/2.png')} style={{width: 45, height: 45, margin: 4}}/>}
              {selectedActivityText=="3" && <Image source={require('../assets/images/3.png')} style={{width: 45, height: 45, margin: 4}}/>}
              {selectedActivityText=="4" && <Image source={require('../assets/images/4.png')} style={{width: 45, height: 45, margin: 4}}/>}
              {selectedActivityText=="5" && <Image source={require('../assets/images/5.png')} style={{width: 45, height: 45, margin: 4}}/>}
              {selectedActivityText=="6" && <Image source={require('../assets/images/6.png')} style={{width: 45, height: 45, margin: 4}}/>}
              {selectedActivityText=="7" && <Image source={require('../assets/images/7.png')} style={{width: 45, height: 45, margin: 4}}/>}
          </View>
        </View>
      )
    }
    else {
      return (
        /* Input Text Box */
        <TextInput style={modalStyles.inputBox} 
        onChangeText={ newText => { textBox1 = newText } }
        multiline
        keyboardType={keyboardTypeName == "default" ? 'default' : 'decimal-pad'}
        defaultValue={textInputVal}
      />
      )
    }
  }

  /* Determines what modal type is needed (an updating of the current day's activities or creating a new activity) */
  const [activityName, setActivityName] = useState("") // Stores the user's chosen activity name
  const [updateActivityName, setUpdateActivityName] = useState("")
  const [activityUnit, setActivityUnit] = useState("") // Stores the user's chosen activity unit
  const [updateActivityUnit, setUpdateActivityUnit] = useState("")

  type ModalType = { type: string }
  const ModalTypeToUse = (props: ModalType) => {
    if(props.type == "update") {
      /* Selected Activity's Name and Unit */
      return (
        <View>
            {/* Selected Activity's Unit */}
            <Text style={{fontSize: 48, padding: 20, alignSelf: 'center'}}>{selectedActivity}</Text>
            <View style={modalStyles.boxStyling}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                {/* Selected Activity's Unit */}
                <Text style={modalStyles.unitsLabel}>{selectedActivityUnit}:</Text>
                
                {/* Save Button */}
                <TouchableOpacity style={modalStyles.saveButton} onPress={() => {
                  if(selectedActivity == "Water")            { setFinalTextBoxContent(textBox1) }
                  else if(selectedActivity.includes("Mood")) { updateMoodVal(selectedActivity) }
                  else if(selectedActivity == "Sleep Total") { setFinalTextBoxContent(textBox1) }
                  else if(selectedActivityUnit == "Meal")    { updateMeal(selectedActivity) }                 /* STILL NEEDS TO BE UPDATED TO USE NUMERICAL VALUES SINCE WE CHANGED THE DATABASE */
                  else { // Selected activity is custom
                    console.log("CURRENT CUSTOM SELECTED ACTIVITY: " + selectedActivity)
                    updateActivityButton(selectedActivity, Number(textBox1))
                  }
                  /* else if(selectedActivity == "addCustom")   { addActivityButton() } */ /* Adding custom activities */
                  /* else { updateCustomActivity() }  Updating custom activities  */
                }}>
                  <Text style={modalStyles.saveButtonText}>Save</Text>
                </TouchableOpacity>
              </View>

              {/* Displays different layout on modal depending on whether or not a mood button was selected */}
              <ActivityView name={selectedActivity} />
            </View>
          </View>
      )
    }
    else { // (props.type == "create")
      /* Creating an Activity */
      return (
        <View>
          <Text style={{fontSize: 48, padding: 20, alignSelf: 'center'}}>New Activity</Text>
          <View style={modalStyles.boxStyling}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              {/* Where the user enters an activity name */}
              <Text style={modalStyles.unitsLabel}>Name:</Text>

              {/* Save Button */}
              <TouchableOpacity style={modalStyles.saveButton} onPress={() => {
                /* setFinalTextBoxContent(textBox) */
                /* setUpdateActivityName(updateActivityName => textBox1) */
                
                console.log(textBox1)
                console.log(textBox2)
                addActivityButton(textBox1, textBox2)
              }}>
                <Text style={modalStyles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>

            {/* Input Text Box */}
            <TextInput style={modalStyles.inputBox} 
            onChangeText={ newText => { textBox1 = newText } }
            multiline
            keyboardType={keyboardTypeName == "default" ? 'default' : 'decimal-pad'}
            defaultValue={textInputVal} />
            
            <View style={{marginTop: 16, flexDirection: 'row', justifyContent: 'space-between'}}>
              {/* Where the user enters an activity name */}
              <Text style={modalStyles.unitsLabel}>Unit:</Text>
            </View>

            {/* Input Text Box */}
            <TextInput style={modalStyles.inputBox} 
            onChangeText={ newText => { textBox2 = newText } }
            multiline
            keyboardType={keyboardTypeName == "default" ? 'default' : 'decimal-pad'}
            defaultValue={textInputVal} />
          </View>
        </View>
      )
    }
  }

  useEffect(() => { // Creates a new date for the current date (if it doesn't already exist) and gathers all previously entered custom activities
    addDateIntoTable()
    getPrevActivities()
  }, [])
  useEffect(() => { setTextInputVal(selectedActivityText) }, [selectedActivityText]) // Updates the default value in the text input to be a non-numerical value
  useEffect(() => { setTextInputVal(String(selectedActivityVal)) }, [selectedActivityVal]) // Updates the default value in the text input to be a numerical value (converted to string form)
  useEffect(() => {
    var activity = updateTextWith
    setSelectedActivity(activity)
  }, [updateTextWith]) // Updates the selected activity (so it is accurate with what the user selected immediately)
  useEffect(() => { // Finds the value of the currently selected activity based on the most accurate version of the selected activity
    if(selectedActivity.includes("Mood")) { getMoodValue(selectedActivity) } // Mood
    else if(selectedActivity == "Water") { getWaterValue() }                 // Water
    else if(selectedActivity == "Sleep Total") { getSleepValue() }           // Sleep
  }, [selectedActivity])
  useEffect(() => { setSelectedActivityText(String(selectedActivityVal)) }, [selectedActivityVal]) // Sets the selectedActivityText to reflect the most accurate version of the selcted mood
  useEffect(() => { setSelectedActivityText(defaultMood) }, [defaultMood]) // Ensures the selectedActivityText is updated with the mood stored in the database for the current mood selected to use as a default mood
  useEffect(() => { setSelectedActivityText(finalTextBoxContent) }, [finalTextBoxContent])
  useEffect(() => { // Stores the value of the currently selected activity based on the most accurate version of the selected activity
    if(selectedActivity == "Water") {
      updateWaterValue()
    }
    else if(selectedActivity == "Sleep Total") {
      updateSleepValue()
    }
    else {
      console.log("selected activity: " + selectedActivity)
    }
  }, [selectedActivityText])
  


  /* Main Check-In Return */
  return (
    <>
      {/* The Main Check-In Screen */}
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView  behavior={Platform.OS === 'ios' ? "padding" : undefined} style={{flex: 1}}>
            {/* Question Section */}
            <Text style={styles.question}>[Example Question to Go Here]</Text>
            
            {/* Activities Section */}
            <View style={{backgroundColor: 'azure', flex: 5}}>
              {/* Activities Header */}
              <View style={styles.activitiesTitleHeader}>
                <Text style={styles.activitiesTitleText}>Activities</Text>
              </View>


              {/* Default Activities Buttons */} 
              <View>
                {/* Food & Drinks Category */}
                <Text style={{fontSize: 22, padding: 8, textAlign: 'center'}}>Food & Drinks</Text>
                <View style={{flexDirection: 'row', marginBottom: 8, marginRight: 4, justifyContent: 'center'}}>
                  {/* Breakfast Button */}
                  <TouchableOpacity style={styles.defaultActivities} onPress={() => {
                    {setModalType("update")}
                    {setActivityModalVisible(true)}
                    {setSelectedActivity("Breakfast")}
                    {setSelectedActivityUnit("Meal")}
                    {getBreakfastValue()}
                    {setKeyboardTypeName("default")}
                    {setTextInputVal(selectedActivityText)}
                  }}>
                    <Text style={styles.textInActivityBox}>Breakfast</Text>
                  </TouchableOpacity>

                  {/* Lunch Button */}
                  <TouchableOpacity style={styles.defaultActivities} onPress={() => {
                    {setModalType("update")}
                    {setActivityModalVisible(true)}
                    {setSelectedActivity("Lunch")}
                    {setSelectedActivityUnit("Meal")}
                    {getLunchValue()}
                    {setKeyboardTypeName("default")}
                    {setTextInputVal(selectedActivityText)}
                  }}>
                    <Text style={styles.textInActivityBox}>Lunch</Text>
                  </TouchableOpacity>

                  {/* Dinner Button */}
                  <TouchableOpacity style={styles.defaultActivities} onPress={() => {
                    {setModalType("update")}
                    {setActivityModalVisible(true)}
                    {setSelectedActivity("Dinner")}
                    {setSelectedActivityUnit("Meal")}
                    {getDinnerValue()}
                    {setKeyboardTypeName("default")}
                    {setTextInputVal(selectedActivityText)}
                  }}>
                    <Text style={styles.textInActivityBox}>Dinner</Text>
                  </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', marginBottom: 4, marginRight: 4, justifyContent: 'center'}}>
                  {/* Snacks Button */}
                  <TouchableOpacity style={styles.defaultActivities} onPress={() => {
                    {setModalType("update")}
                    {setActivityModalVisible(true)}
                    {setSelectedActivity("Snacks")}
                    {setSelectedActivityUnit("Meal")}
                    {getSnackValue()}
                    {setKeyboardTypeName("default")}
                    {setTextInputVal(selectedActivityText)}
                  }}>
                    <Text style={styles.textInActivityBox}>Snacks</Text>
                  </TouchableOpacity>

                  {/* Water Button */}
                  <TouchableOpacity style={styles.defaultActivities} onPress={() => {
                    {setModalType("update")}
                    {setActivityModalVisible(true)}
                    {setUpdateTextWith("Water")}
                    {setSelectedActivityUnit("Ounces")}
                    {setKeyboardTypeName("decimal-pad")}
                    {setTextInputVal(String(selectedActivityVal))}
                  }}>
                    <Text style={styles.textInActivityBox}>Water</Text>
                  </TouchableOpacity>
                </View>

                {/* Moods & Sleep Category */}
                <Text style={{fontSize: 22, padding: 8, textAlign: 'center'}}>Moods & Sleep</Text>
                <View style={{flexDirection: 'row', marginBottom: 8, marginRight: 4, justifyContent: 'space-around'}}>
                  <TouchableOpacity style={styles.defaultActivities} onPress={() => {
                    {setModalType("update")}
                    {setActivityModalVisible(true)}
                    {setSelectedActivityUnit("12 AM-8 AM")}
                    {setUpdateTextWith("Morning Mood")}
                    {setDefaultMood(String(selectedActivityVal))}
                  }}>
                    <Text style={styles.textInActivityBox}>Morning Mood</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.defaultActivities} onPress={() => {
                    {setModalType("update")}
                    {setActivityModalVisible(true)}
                    {setSelectedActivityUnit("9 AM-4 PM")}
                    {setUpdateTextWith("Midday Mood")}
                    {setDefaultMood(String(selectedActivityVal))}
                  }}>
                    <Text style={styles.textInActivityBox}>Midday Mood</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.defaultActivities} onPress={() => {
                    {setModalType("update")}
                    {setActivityModalVisible(true)}
                    {setSelectedActivityUnit("5 PM-11 PM")}
                    {setUpdateTextWith("Night Mood")}
                    {setDefaultMood(String(selectedActivityVal))}
                  }}>
                    <Text style={styles.textInActivityBox}>Night Mood</Text>
                  </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', marginBottom: 4, marginRight: 4, justifyContent: 'center'}}>
                  <TouchableOpacity style={[styles.defaultActivities, {alignSelf: 'center'}]} onPress={() => {
                    {setModalType("update")}
                    {setActivityModalVisible(true)}
                    {setUpdateTextWith("Sleep Total")}
                    {setSelectedActivityUnit("Hours")}
                    {setKeyboardTypeName("decimal-pad")}
                    {setTextInputVal(String(selectedActivityVal))}
                  }}>
                    <Text style={styles.textInActivityBox}>Sleep Total</Text>
                  </TouchableOpacity>
                </View>

                {/* Extra Activities Category */}
                <Text style={{fontSize: 22, paddingTop: 10, textAlign: 'center'}}>Extra Activities</Text>
                <View style={{alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap'}}>
                  <FlatList
                  data={listOfActivityButtons}
                  renderItem={({item}) => {
                    return (
                      <TouchableOpacity style={[styles.defaultActivities, {marginBottom: 16}]} onPress={() => {
                        setModalType("update")
                        setActivityModalVisible(true)
                        setUpdateTextWith(item)
                        getUnit(item)
                        setKeyboardTypeName("decimal-pad")
                      }}>
                        <Text numberOfLines = {1} style={styles.textInActivityBox}>{item}</Text>
                      </TouchableOpacity>
                    )
                  }}
                  />
                </View>
                <View style={{height: 48, width: 96, alignSelf: 'center'}}>
                  {/* Plus Button */}
                  <TouchableOpacity style={modalStyles.addButton} onPress={() => { 
                    setUpdateTextWith("addCustom")
                    setModalType("create")
                    setActivityModalVisible(true)
                    setKeyboardTypeName("default")
                    setTextInputVal("")
                  }}>
                    <Ionicons name="add-circle-outline" color={'#629AAC'} size={48} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>

    {/* The Selected Activity Button's Screen */}
    <Modal visible={activityModalVisible} onRequestClose={() => setActivityModalVisible(false)} animationType='slide' presentationStyle='pageSheet'>
      <SafeAreaView style={modalStyles.container}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : undefined} style={{backgroundColor: 'azure', flex: 1}}>
            {/* Back Button */}
            <TouchableOpacity style={modalStyles.backButton} onPress={() => setActivityModalVisible(false)}>
              <Ionicons name="chevron-back" color={'#18576D'} size={20} />
              <Text style={{color: '#18576D', fontSize: 16}}>Back</Text>
            </TouchableOpacity>

            <ModalTypeToUse type={modalType} />
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </Modal>
  </>
)}

/* Styles for the main check-in screen */
const styles = StyleSheet.create({
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
const modalStyles = StyleSheet.create({
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
    flex: 1
  }
})

export default CheckIn
