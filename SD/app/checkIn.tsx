import React, { useEffect, useState } from 'react';
import { Text, TextInput, View, SafeAreaView, FlatList, TouchableOpacity, Modal, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { modalStyles, styles } from '../styles/CheckInStyles';
import { ActivityButton } from '../components/CheckInComponents/ActivityButton';
import { UpdateModal } from '../components/CheckInComponents/UpdateModal';
import { CreateModal } from '../components/CheckInComponents/CreateModal';

import { 
  addDate,
  updateFood, getBreakfast,
  getLunch, getDinner,
  getSnacks, updateWater, 
  getWater, updateMood,
  getMorningMood, getMiddayMood, getNighttimeMood,
  getSleepTotal, updateSleepTotal,
  getUniqueActivities, addActivity, updateActivity, getUnitType, getActivityTypeAmnt
} from '../database/database';

const CheckIn = () => {
  var textBox1 = ""
  var textBox2 = ""
  const [modalType, setModalType] = useState("update")
  const [listOfActivityButtons, setListOfActivityButtons] = useState<string[]>([])
  const [updateTextWith, setUpdateTextWith] = useState("")
  const [textInputVal, setTextInputVal] = useState("")
  const [keyboardTypeName, setKeyboardTypeName] = useState("default")
  const [activityModalVisible, setActivityModalVisible] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState("")
  const [selectedActivityUnit, setSelectedActivityUnit] = useState("")
  const [selectedActivityText, setSelectedActivityText] = useState("")
  const [selectedActivityVal, setSelectedActivityVal] = useState(0)
  const [curDate, setCurDate] = useState(new Date().toISOString().split("T")[0])
  const [finalTextBoxContent, setFinalTextBoxContent] = useState("")
  const [defaultMood, setDefaultMood] = useState(String(selectedActivityVal))
  const [activityName, setActivityName] = useState("")
  const [updateActivityName, setUpdateActivityName] = useState("")
  const [activityUnit, setActivityUnit] = useState("")
  const [updateActivityUnit, setUpdateActivityUnit] = useState("")

 const addDateIntoTable = async () => { await addDate(curDate) }
const updateMeal = async (mealType: string) => { await updateFood(selectedActivityText, curDate, mealType) }
const updateWaterValue = async () => { await updateWater(selectedActivityText, curDate) }
const updateMoodVal = async (timeOfDay: string) => { await updateMood(selectedActivityText, curDate, timeOfDay) }
const updateSleepValue = async () => { await updateSleepTotal(selectedActivityText, curDate) }
const getBreakfastValue = async () => {
  const breakfast = await getBreakfast(curDate)
  setSelectedActivityText(breakfast[0].breakfastMeal)
}
const getLunchValue = async () => {
  const lunch = await getLunch(curDate)
  setSelectedActivityText(lunch[0].lunchMeal)
}
const getDinnerValue = async () => {
  const dinner = await getDinner(curDate)
  setSelectedActivityText(dinner[0].dinnerMeal)
}
const getSnackValue = async () => {
  const snack = await getSnacks(curDate)
  setSelectedActivityText(snack[0].snackMeal)
}
const getWaterValue = async () => {
  const water = await getWater(curDate)
  water[0].waterTotal !== null ? setSelectedActivityVal(water[0].waterTotal) : setSelectedActivityVal(0)
}
const getSleepValue = async () => {
  const sleep = await getSleepTotal(curDate)
  sleep[0].sleepTotal !== null ? setSelectedActivityVal(sleep[0].sleepTotal) : setSelectedActivityVal(0)
}
const getUnit = async (activityName: string) => {
  try {
    // Get unit with proper type handling
    const unitResult = await getUnitType(activityName, curDate);
    setSelectedActivityUnit(unitResult?.exerciseUnit || "");

    // Get amount with type safety
    const amount = await getActivityTypeAmnt(activityName, curDate);
    setTextInputVal(amount.toString() || "0");

  } catch (error) {
    console.error('Error fetching activity details:', error);
    setSelectedActivityUnit("");
    setTextInputVal("0");
  }
};
const addActivityButton = async (activityName: string, activityUnit: string) => {
  // Check if activity already exists
  const exists = listOfActivityButtons.some(name => name === activityName);
  
  if (!exists && activityName.trim() !== '') {
    try {
      await addActivity(curDate, activityName, activityUnit);
      setListOfActivityButtons(prev => [...prev, activityName]);
      setTextInputVal('');
    } catch (error) {
      console.error('Error adding activity:', error);
    }
  }
};
const updateActivityButton = async (activityName: string, activityAmnt: number) => { 
  await updateActivity(curDate, activityName, activityAmnt) 
}

const getPrevActivities = async () => {
  const activitiesFromDB = await getUniqueActivities()
  var onlyActivities: string[] = []
  for (var i = 0; i < activitiesFromDB.length; i++) {
    if (i === 0) {
      onlyActivities[0] = activitiesFromDB[0].exerciseName
    }
    else {
      onlyActivities = [...onlyActivities, activitiesFromDB[i].exerciseName]
    }
  }
  setListOfActivityButtons(onlyActivities)
  }

  const getMoodValue = async (timeOfDay: string) => {
    if (timeOfDay == "Morning Mood") {
      const morningVal = await getMorningMood(curDate)

      // Ensures the mood doesn't see "null" in the text input box when there is no value for the given date
      if (morningVal[0].morningMood !== null) { setSelectedActivityVal(morningVal[0].morningMood) }
      else { setSelectedActivityVal(0) }
    }
    else if (timeOfDay == "Midday Mood") {
      const middayVal = await getMiddayMood(curDate)

      // Ensures the mood doesn't see "null" in the text input box when there is no value for the given date
      if (middayVal[0].middayMood !== null) { setSelectedActivityVal(middayVal[0].middayMood) }
      else { setSelectedActivityVal(0) }
    }
    else {
      const nighttimeVal = await getNighttimeMood(curDate)

      // Ensures the mood doesn't see "null" in the text input box when there is no value for the given date
      if (nighttimeVal[0].nighttimeMood !== null) { setSelectedActivityVal(nighttimeVal[0].nighttimeMood) }
      else { setSelectedActivityVal(0) }
    }
  }


  // Handler functions
  const handleMealPress = (activity: string, unit: string, fetchHandler: () => void) => {
    setModalType("update");
    setActivityModalVisible(true);
    setSelectedActivity(activity);
    setSelectedActivityUnit(unit);
    fetchHandler();
    setKeyboardTypeName("default");
    setTextInputVal(selectedActivityText);
  };

  const handleWaterPress = () => {
    setModalType("update");
    setActivityModalVisible(true);
    setUpdateTextWith("Water");
    setSelectedActivityUnit("Ounces");
    setKeyboardTypeName("decimal-pad");
    setTextInputVal(String(selectedActivityVal));
  };

  const handleMoodPress = (moodType: string, timeRange: string) => {
    setModalType("update");
    setActivityModalVisible(true);
    setSelectedActivityUnit(timeRange);
    setUpdateTextWith(moodType);
    setDefaultMood(String(selectedActivityVal));
  };

  const handleSleepPress = () => {
    setModalType("update");
    setActivityModalVisible(true);
    setUpdateTextWith("Sleep Total");
    setSelectedActivityUnit("Hours");
    setKeyboardTypeName("decimal-pad");
    setTextInputVal(String(selectedActivityVal));
  };

  const handleCustomActivityPress = (activityName: string) => {
    setModalType("update");
    setActivityModalVisible(true);
    setUpdateTextWith(activityName);
    getUnit(activityName);
    setKeyboardTypeName("decimal-pad");
  };

  const handleAddActivityPress = () => {
    setUpdateTextWith("addCustom");
    setModalType("create");
    setActivityModalVisible(true);
    setKeyboardTypeName("default");
    setTextInputVal("");
  };


  const handleSave = async (value: string) => {
    try {
      if (selectedActivity === "Water") {
        await updateWater(value, curDate);
        await getWaterValue();
      }
      else if (selectedActivity.includes("Mood")) {
        await updateMood(value, curDate, selectedActivity);
        await getMoodValue(selectedActivity);
      }
      else if (selectedActivity === "Sleep Total") {
        await updateSleepTotal(value, curDate);
        await getSleepValue();
      }
      else if (["Breakfast", "Lunch", "Dinner", "Snacks"].includes(selectedActivity)) {
        await updateFood(value, curDate, selectedActivity);
        // Refresh the appropriate meal value
        switch (selectedActivity) {
          case "Breakfast": await getBreakfastValue(); break;
          case "Lunch": await getLunchValue(); break;
          case "Dinner": await getDinnerValue(); break;
          case "Snacks": await getSnackValue(); break;
        }
      }
      else {
        // Handle custom activities
        await updateActivity(curDate, selectedActivity, Number(value));
        await getUnit(selectedActivity);
      }
      setActivityModalVisible(false);
    } catch (error) {
      console.error("Save failed:", error);
    }
  };
 

  const handleCreateSave = (name: string, unit: string) => {
    if (name.trim() && unit.trim()) {
      addActivityButton(name, unit);
      setActivityModalVisible(false);
    }
  };

  useEffect(() => {
    addDateIntoTable()
    getPrevActivities()
  }, [])
  useEffect(() => { setTextInputVal(selectedActivityText) }, [selectedActivityText])
  useEffect(() => { setTextInputVal(String(selectedActivityVal)) }, [selectedActivityVal])
  useEffect(() => {
    const activity = updateTextWith
    setSelectedActivity(activity)
  }, [updateTextWith])
  useEffect(() => {
    if (selectedActivity.includes("Mood")) getMoodValue(selectedActivity)
    else if (selectedActivity == "Water") getWaterValue()
    else if (selectedActivity == "Sleep Total") getSleepValue()
  }, [selectedActivity])
  useEffect(() => { setSelectedActivityText(String(selectedActivityVal)) }, [selectedActivityVal])
  useEffect(() => { setSelectedActivityText(defaultMood) }, [defaultMood])
  useEffect(() => { setSelectedActivityText(finalTextBoxContent) }, [finalTextBoxContent])
  useEffect(() => {
    if (selectedActivity == "Water") updateWaterValue()
    else if (selectedActivity == "Sleep Total") updateSleepValue()
  }, [selectedActivityText])

  return (
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : undefined} style={{ flex: 1 }}>
            <Text style={styles.question}>[Example Question to Go Here]</Text>
            
            <View style={{ backgroundColor: 'azure', flex: 5 }}>
              <View style={styles.activitiesTitleHeader}>
                <Text style={styles.activitiesTitleText}>Activities</Text>
              </View>

              {/* Food & Drinks Section */}
              <View>
                <Text style={{ fontSize: 22, padding: 8, textAlign: 'center' }}>Food & Drinks</Text>
                <View style={{ flexDirection: 'row', marginBottom: 8, marginRight: 4, justifyContent: 'center' }}>
                  <ActivityButton
                    activityName="Breakfast"
                    onPress={() => handleMealPress("Breakfast", "Meal", getBreakfastValue)}
                  />
                  <ActivityButton
                    activityName="Lunch"
                    onPress={() => handleMealPress("Lunch", "Meal", getLunchValue)}
                  />
                  <ActivityButton
                    activityName="Dinner"
                    onPress={() => handleMealPress("Dinner", "Meal", getDinnerValue)}
                  />
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 4, marginRight: 4, justifyContent: 'center' }}>
                  <ActivityButton
                    activityName="Snacks"
                    onPress={() => handleMealPress("Snacks", "Meal", getSnackValue)}
                  />
                  <ActivityButton
                    activityName="Water"
                    onPress={handleWaterPress}
                  />
                </View>
              </View>

              {/* Moods & Sleep Section */}
              <View>
                <Text style={{ fontSize: 22, padding: 8, textAlign: 'center' }}>Moods & Sleep</Text>
                <View style={{ flexDirection: 'row', marginBottom: 8, marginRight: 4, justifyContent: 'space-around' }}>
                  <ActivityButton
                    activityName="Morning Mood"
                    onPress={() => handleMoodPress("Morning Mood", "12 AM-8 AM")}
                  />
                  <ActivityButton
                    activityName="Midday Mood"
                    onPress={() => handleMoodPress("Midday Mood", "9 AM-4 PM")}
                  />
                  <ActivityButton
                    activityName="Night Mood"
                    onPress={() => handleMoodPress("Night Mood", "5 PM-11 PM")}
                  />
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 4, marginRight: 4, justifyContent: 'center' }}>
                  <ActivityButton
                    activityName="Sleep Total"
                    onPress={handleSleepPress}
                  />
                </View>
              </View>

              {/* Extra Activities Section */}
              <View>
                <Text style={{ fontSize: 22, paddingTop: 10, textAlign: 'center' }}>Extra Activities</Text>
                <View style={{ alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap' }}>
                  <FlatList
                    data={listOfActivityButtons}
                    renderItem={({ item }) => (
                      <ActivityButton
                        activityName={item}
                        onPress={() => handleCustomActivityPress(item)}
                      />
                    )}
                  />
                </View>
                <View style={{ height: 48, width: 96, alignSelf: 'center' }}>
                  <TouchableOpacity style={modalStyles.addButton} onPress={handleAddActivityPress}>
                    <Ionicons name="add-circle-outline" color={'#629AAC'} size={48} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </TouchableWithoutFeedback>

      <Modal visible={activityModalVisible} onRequestClose={() => setActivityModalVisible(false)} animationType='slide' presentationStyle='pageSheet'>
        <SafeAreaView style={modalStyles.container}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : undefined} style={{ backgroundColor: 'azure', flex: 1 }}>
              <TouchableOpacity style={modalStyles.backButton} onPress={() => setActivityModalVisible(false)}>
                <Ionicons name="chevron-back" color={'#18576D'} size={20} />
                <Text style={{ color: '#18576D', fontSize: 16 }}>Back</Text>
              </TouchableOpacity>

              {modalType === "update" ? (
                <UpdateModal
                  selectedActivity={selectedActivity}
                  selectedActivityUnit={selectedActivityUnit}
                  keyboardTypeName={keyboardTypeName}
                  textInputVal={textInputVal}
                  onSave={handleSave}
                  selectedActivityText={selectedActivityText}
                  setSelectedActivityText={setSelectedActivityText}
                /> 
              ) : (
                  <CreateModal
                    onSave={handleCreateSave}
                    keyboardTypeName={keyboardTypeName}
                  /> 
              )}
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </Modal>
    </>
  );
};

export default CheckIn;