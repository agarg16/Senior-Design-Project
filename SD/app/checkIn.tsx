import React, { useState } from 'react'
import { Text, TextInput, View, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Dimensions, Modal, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, Platform } from "react-native"
import { Ionicons } from '@expo/vector-icons'

const width =  Dimensions.get('screen').width // Width of entire screen
const height = Dimensions.get('screen').height // Height of entire screen
const boxSize = width <= height ? (width * 0.10) + 80 : (height * 0.10) + 80 // Basic size of activity box

/* List of the activities to choose from */
const ACTIVITIES = [
  {title: '[Activity 1]'},
  {title: '[Activity 2]'},
  {title: '[Activity 3]'},
  {title: '[Activity 4]'},
  {title: '[Activity 5]'},
  {title: '[Activity 6]'},
  {title: '[Activity 7]'}
]



const CheckIn = () => {
  const [activityAmntInfo, setActivityAmntInfo] = useState(0) // Individual input for a selected activity amount box
  const [listOfActivityAmnts, setListOfActivityAmnts] = useState([0]) // All of the input for a chosen activity
  const [activityModalVisible, setActivityModalVisible] = useState(false) // Whether or not the modal is visible to the user
  const [selectedActivity, setSelectedActivity] = useState("") // The activity the user selected

  // Adds a new box to put in an activity amount
  const addActivityAmntBox = () => {
    setListOfActivityAmnts( listOfActivityAmnts => {
      return (
        [...listOfActivityAmnts, Number()]
      )
    })
  }

  // Modifies what value is stored at an index position in the list of all activity amounts
  const editActivityAmntBox = (index: number) => {
    let allActivityAmnts = [...listOfActivityAmnts] // All of the activity amount info
    allActivityAmnts[index] = activityAmntInfo

    setListOfActivityAmnts(allActivityAmnts)
  }

  // Removes an activity amount box
  const removeActivityAmntBox = (index: number) => {
    const allOtherActivityAmnts = [...listOfActivityAmnts] // All of the other activity amount info beyond the one being looked at
    allOtherActivityAmnts.splice(index, 1)

    setListOfActivityAmnts(allOtherActivityAmnts)
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        {/* Question Section */}
        <Text style={styles.question}>[Example Question to Go Here]</Text>
        
        {/* Activities Section */}
        <View style={{flex: 5}}>
          {/* Activities Header */}
          <Text style={styles.activitiesTitle}>Activities</Text>

          {/* Displays the various activities to choose from */}
          <FlatList 
            data={ACTIVITIES}
            renderItem={({item}) => {
              return (
                <TouchableOpacity style={styles.activities} onPress={() => {
                  {setActivityModalVisible(true)}
                  {setSelectedActivity(item.title)}
                  }}>
                  <Text style={{fontSize: 20, padding: 8, textAlign: 'center'}}>{item.title}</Text>
                </TouchableOpacity>
              )
            }}
            numColumns={2}

            contentContainerStyle={styles.activitiesBoxes}
          />
        </View>
      </SafeAreaView>

      {/* The Selected Activity Button's Screen */}
      <Modal visible={activityModalVisible} onRequestClose={() => setActivityModalVisible(false)} animationType='slide' presentationStyle='pageSheet'>
        <SafeAreaView style={styles.container}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : undefined} style={{backgroundColor: 'azure', flex: 1}}>
                <TouchableOpacity style={{width: '45%', paddingTop: '4%', paddingBottom: '4%', paddingLeft: '1.5%', alignItems: 'center', flexDirection: 'row'}} onPress={() => setActivityModalVisible(false)}>
                  <Ionicons name="chevron-back" color={'#18576D'} size={20} />
                  <Text style={{color: '#18576D', fontSize: 16}}>Back</Text>
                </TouchableOpacity>

                {/* Each Activity Insert */}
                <View style={{marginLeft: '6%', marginRight: '6%', paddingTop: '5%', flex: 1}}>
                  {/* Activity Name */}
                  <Text style={{fontSize: 42, textAlign: 'center', paddingBottom: 20}}>{selectedActivity}</Text>

                  {/* Box to Insert Activity-Related Info */}
                  <View style={{flex: 1}}>
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      data={listOfActivityAmnts}
                      renderItem={({index}) => {
                        return(
                          <TouchableOpacity  style={{backgroundColor: 'lightblue', borderWidth: 0.5, borderRadius: 8, borderColor: 'black', paddingLeft: '4%', paddingRight: '4%', paddingBottom: '4%', marginBottom: 16}} activeOpacity={1}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                              {/* Amount of Activity Wording */}
                              <View style={{justifyContent: 'center'}}>
                                <Text style={{fontSize: 18, paddingTop: '2%', paddingBottom: '2%', justifyContent: 'center'}}>Amount of Activity:</Text>
                              </View>
                      
                              {/* Delete Button */}
                              <TouchableOpacity style={{width: '40%', alignItems: 'flex-end', justifyContent: 'center'}} onPress={() => {
                                removeActivityAmntBox(index)
                              }}>
                                <Text style={{color: '#3D3C3C', fontSize: 14, textDecorationLine: 'underline', marginRight: '4%', paddingTop: '4%', paddingBottom: '2%'}}>Delete</Text>
                              </TouchableOpacity>
                            </View>
                            {/* Input Text Box */}
                            <TextInput 
                              style={{backgroundColor: 'white', borderWidth: 1, borderColor: 'gray', height: 36, padding: 8}}
                              onChangeText={newText => setActivityAmntInfo(Number(newText))}
                              onEndEditing={() => { editActivityAmntBox(index) }}
                              defaultValue={String(listOfActivityAmnts[index])}
                            />
                          </TouchableOpacity>
                        )
                      }}
                    />
                  </View>
                </View> 

                {/* Plus (Add) Button */}
                <View style={{width: '100%', height: '8%', alignSelf: 'center'}}>
                  <TouchableOpacity style={{height: '100%', alignItems: 'center', justifyContent: 'center'}} onPress={() => {
                    addActivityAmntBox()
                  }}>
                    <Ionicons name="add-circle-outline" color={'#629AAC'} size={48} />
                  </TouchableOpacity>
                </View>
              </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'azure',
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
  activitiesTitle: {
    backgroundColor: 'lightblue',
    borderColor: 'black',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    textAlign: 'center',
    fontSize: 36,
    padding: 16
  },
  activitiesBoxes: {
    backgroundColor: 'azure',
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
    flexGrow: 1
  },
  activities: {
    backgroundColor: '#c2e2ec',
    borderRadius: 10,
    borderColor: '#82a2ac',
    borderWidth: 2,
    width: boxSize + 50,
    height: boxSize,
    justifyContent: 'center',
    margin: (boxSize * 0.13)
  }
})

export default CheckIn
