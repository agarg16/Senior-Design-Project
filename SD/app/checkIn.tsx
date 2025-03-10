import React, { useEffect, useState } from 'react'
import { Text, TextInput, View, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Modal, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, Platform } from "react-native"
import { Ionicons } from '@expo/vector-icons'

import { addDate,
         updateBreakfast, getBreakfast,
         updateLunch,     getLunch,
         updateDinner,    getDinner,
         updateSnacks,    getSnacks,
         updateWater,     getWater
        } from '../database/database'

const CheckIn = () => {
  const [textInputVal, setTextInputVal] = useState("")

  const [keyboardTypeName, setKeyboardTypeName] = useState("default")
  const [activityModalVisible, setActivityModalVisible] = useState(false) // Whether or not the modal is visible to the user
  const [selectedActivity, setSelectedActivity] = useState("") // The activity the user selected
  const [selectedActivityUnit, setSelectedActivityUnit] = useState("")
  const [selectedActivityText, setSelectedActivityText] = useState("")
  const [selectedActivityVal, setSelectedActivityVal] = useState(0)

  const [curDate, setCurDate] = useState(new Date().toISOString().split("T")[0]) // The current date
  //const [userAddedActivities, setUserAddedActivities] = useState([]) // List of all of the user's added activities

  /* Adds the current date into the table (if it is not already there) */
  const addDateIntoTable = async () => { await addDate(curDate) }

  // Updates the value for breakfast for the current day
  const updateBreakfastValue = async () => {
    try { await updateBreakfast(selectedActivityText, curDate) }
    catch (error) { console.log(error) }
  }

  // Updates the value for lunch for the current day
  const updateLunchValue = async () => {
    try { await updateLunch(selectedActivityText, curDate) }
    catch (error) { console.log(error) }
  }

  // Updates the value for dinner for the current day
  const updateDinnerValue = async () => {
    try { await updateDinner(selectedActivityText, curDate) }
    catch (error) { console.log(error) }
  }

  // Updates the value for snacks for the current day
  const updateSnackValue = async () => {
    try { await updateSnacks(selectedActivityText, curDate) }
    catch (error) { console.log(error) }
  }

  // Updates the value for water for the current day
  const updateWaterValue = async () => {
    try { await updateWater(selectedActivityText, curDate) }
    catch (error) { console.log(error) }
  }



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

  useEffect(() => { addDateIntoTable() }, []) // Creates a new date for the current date (if it doesn't already exist)
  useEffect(() => { setTextInputVal(selectedActivityText) }, [selectedActivityText]) // Updates the default value in the text input to be a non-numerical value
  useEffect(() => { setTextInputVal(String(selectedActivityVal)) }, [selectedActivityVal]) // Updates the default value in the text input to be a numerical value (converted to string form)

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
                    {setActivityModalVisible(true)}
                    {setSelectedActivity("Water")}
                    {setSelectedActivityUnit("Ounces")}
                    {getWaterValue()}
                    {setKeyboardTypeName("decimal-pad")}
                    {setTextInputVal(String(selectedActivityVal))}
                  }}>
                    <Text style={styles.textInActivityBox}>Water</Text>
                  </TouchableOpacity>
                </View>

                {/* Moods, Sleep, & Journal Category */}
                <Text style={{fontSize: 22, padding: 8, textAlign: 'center'}}>Moods, Sleep, & Journal</Text>
                <View style={{flexDirection: 'row', marginBottom: 8, marginRight: 4, justifyContent: 'space-around'}}>
                  <TouchableOpacity style={styles.defaultActivities}><Text style={styles.textInActivityBox}>Morning Mood</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.defaultActivities}><Text style={styles.textInActivityBox}>Midday Mood</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.defaultActivities}><Text style={styles.textInActivityBox}>Night Mood</Text></TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', marginBottom: 4, marginRight: 4, justifyContent: 'center'}}>
                  <TouchableOpacity style={[styles.defaultActivities, {alignSelf: 'center'}]}><Text style={styles.textInActivityBox}>Sleep Total</Text></TouchableOpacity>
                  <TouchableOpacity style={[styles.defaultActivities, {alignSelf: 'center'}]}><Text style={styles.textInActivityBox}>Journal Entry</Text></TouchableOpacity>
                </View>

                {/* Extra Activities Category */}
                <Text style={{fontSize: 22, padding: 10, textAlign: 'center'}}>Extra Activities</Text>
                <View style={{height: 48, width: 96, alignSelf: 'center'}}>
                  {/* Plus Button */}
                  <TouchableOpacity style={modalStyles.addButton}>
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

            {/* Selected Activity's Name and Unit*/}
            <View>
              {/* Selected Activity's Unit */}
              <Text style={{fontSize: 48, padding: 20, alignSelf: 'center'}}>{selectedActivity}</Text>
              <View style={modalStyles.boxStyling}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  {/* Selected Activity's Unit */}
                  <Text style={modalStyles.unitsLabel}>{selectedActivityUnit}:</Text>
                  
                  {/* Save Button */}
                  <TouchableOpacity style={modalStyles.saveButton} onPress={() => {
                    if     (selectedActivity == "Breakfast") { updateBreakfastValue() }
                    else if(selectedActivity == "Lunch"    ) { updateLunchValue()     }
                    else if(selectedActivity == "Dinner"   ) { updateDinnerValue()    }
                    else if(selectedActivity == "Snacks"   ) { updateSnackValue()     }
                    else if(selectedActivity == "Water"    ) { updateWaterValue()     }
                  }}>
                    <Text style={modalStyles.saveButtonText}>Save</Text>
                  </TouchableOpacity>
                </View>

                {/* Input Text Box */}
                <TextInput style={modalStyles.inputBox} 
                  onChangeText={ newText => { setSelectedActivityText(newText) } }
                  multiline
                  keyboardType={keyboardTypeName == "default" ? 'default' : 'decimal-pad'}
                  defaultValue={textInputVal}
                />
              </View>
            </View>
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
    width: '40%',
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  saveButtonText: {
    color: '#3D3C3C',
    textDecorationLine: 'underline',
    fontSize: 14,
    marginRight: '4%',
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
