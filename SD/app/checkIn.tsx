import React, { useEffect, useState } from 'react';
import { Text, View, SafeAreaView, FlatList, TouchableOpacity, Modal, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { modalStyles, styles } from '../styles/CheckInStyles';
import { ActivityButton } from '../components/CheckInComponents/ActivityButton';
import { UpdateModal } from '../components/CheckInComponents/UpdateModal';
import { CreateModal } from '../components/CheckInComponents/CreateModal';
import { MoodGrid } from '../components/CheckInComponents/MoodGrid';
import { getMonthName } from '../additionalFiles/getMonthName';

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
  var currentDay = new Date()
  currentDay = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate())  /* Prevents timezone issue from displaying one date but doing calculations with another */
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
  const [updateCurDateWith, setUpdateCurDateWith] = useState(curDate)
  const [updateDateWith, setUpdateDateWith] = useState(new Date())
  const [updatedDate, setUpdatedDate] = useState(updateDateWith)
  const [finalTextBoxContent, setFinalTextBoxContent] = useState("")
  const [activityName, setActivityName] = useState("")

  useEffect(() => { updateDateWith.setHours(updateDateWith.getHours() - 5) }, [])

  const addDateIntoTable = async () => { await addDate(updateCurDateWith) }
  const updateWaterValue = async () => { await updateWater(selectedActivityText, updateCurDateWith) }
  const updateSleepValue = async () => { await updateSleepTotal(selectedActivityText, updateCurDateWith) }
  const getBreakfastValue = async () => {
    const breakfast = await getBreakfast(updatedDate.toISOString().split("T")[0])
    breakfast[0].breakfastMeal !== null ? setSelectedActivityText(breakfast[0].breakfastMeal) : setSelectedActivityText("0")
  }
  const getLunchValue = async () => {
    const lunch = await getLunch(updatedDate.toISOString().split("T")[0])
    lunch[0].lunchMeal !== null ? setSelectedActivityText(lunch[0].lunchMeal) : setSelectedActivityText("0")
  }
  const getDinnerValue = async () => {
    const dinner = await getDinner(updatedDate.toISOString().split("T")[0])
    dinner[0].dinnerMeal !== null ? setSelectedActivityText(dinner[0].dinnerMeal) : setSelectedActivityText("0")
  }
  const getSnackValue = async () => {
    const snack = await getSnacks(updatedDate.toISOString().split("T")[0])
    snack[0].snackMeal !== null ? setSelectedActivityText(snack[0].snackMeal) : setSelectedActivityText("0")
  }
  const getWaterValue = async () => {
    const water = await getWater(updatedDate.toISOString().split("T")[0])
    water[0].waterTotal !== null ? setSelectedActivityText(String(water[0].waterTotal)) : setSelectedActivityText("0")
  }
  const getSleepValue = async () => {
    const sleep = await getSleepTotal(updatedDate.toISOString().split("T")[0])
    sleep[0].sleepTotal !== null ? setSelectedActivityText(String(sleep[0].sleepTotal)) : setSelectedActivityText("0")
  }
  const getUnit = async (activityName: string) => {
    try {
      // Get unit with proper type handling
      const unitResult = await getUnitType(activityName);
      setSelectedActivityUnit(unitResult?.exerciseUnit || "");

      // Get amount with type safety
      const amount = await getActivityTypeAmnt(activityName, updatedDate.toISOString().split("T")[0]);
      setTextInputVal(amount.toString() || "0");
      if(unitResult != null) { setSelectedActivityUnit(unitResult.exerciseUnit); }
      else { setSelectedActivityUnit(""); }
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
        await addActivity(updatedDate.toISOString().split("T")[0], activityName, activityUnit);
        setListOfActivityButtons(prev => [...prev, activityName]);
        setTextInputVal('');
      } catch (error) {
        console.error('Error adding activity:', error);
      }
    }
    setActivityModalVisible(false)
  };

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
      const morningVal = await getMorningMood(updatedDate.toISOString().split("T")[0])

      // Ensures the mood doesn't see "null" in the text input box when there is no value for the given date
      if (morningVal[0].morningMood !== null) { setSelectedActivityVal(morningVal[0].morningMood) }
      else { setSelectedActivityVal(0) }
    }
    else if (timeOfDay == "Midday Mood") {
      const middayVal = await getMiddayMood(updatedDate.toISOString().split("T")[0])

      // Ensures the mood doesn't see "null" in the text input box when there is no value for the given date
      if (middayVal[0].middayMood !== null) { setSelectedActivityVal(middayVal[0].middayMood) }
      else { setSelectedActivityVal(0) }
    }
    else {
      const nighttimeVal = await getNighttimeMood(updatedDate.toISOString().split("T")[0])

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
    setUpdateTextWith(activity);
    fetchHandler();
    setKeyboardTypeName("default");
    setTextInputVal(selectedActivityText);
  };

  const handleWaterPress = () => {
    getWaterValue()
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
    getMoodValue(moodType);
  };

  const handleSleepPress = () => {
    getSleepValue()
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
      addDate(updatedDate.toISOString().split("T")[0])
      if (selectedActivity === "Water") {
        await updateWater(value, updateCurDateWith);
        await getWaterValue();
      }
      else if (selectedActivity.includes("Mood")) {
        await updateMood(value, updateCurDateWith, selectedActivity);
        await getMoodValue(selectedActivity);
      }
      else if (selectedActivity === "Sleep Total") {
        await updateSleepTotal(value, updateCurDateWith);
        await getSleepValue();
      }
      else if (["Breakfast", "Lunch", "Dinner", "Snacks"].includes(selectedActivity)) {
        await updateFood(value, updateCurDateWith, selectedActivity);
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
        await updateActivity(updateCurDateWith, selectedActivity, Number(value));
        await getUnit(selectedActivity);
      }
      setActivityModalVisible(false);
    } catch (error) {
      console.error("Save failed:", error);
    }
  };
 

  const handleCreateSave = (name: string, unit: string) => {
    if (name.trim() && unit.trim()) {
      addDate(updatedDate.toISOString().split("T")[0])
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
    setActivityName(activity)
    setSelectedActivity(activity)
  }, [updateTextWith])
  useEffect(() => {
    if (selectedActivity.includes("Mood")) getMoodValue(selectedActivity)
    else if (selectedActivity == "Water") getWaterValue()
    else if (selectedActivity == "Sleep Total") getSleepValue()
  }, [selectedActivity])
  useEffect(() => { 
    var text = String(selectedActivityVal)
    setSelectedActivityText(text)
  }, [selectedActivityVal])
  useEffect(() => { setSelectedActivityText(finalTextBoxContent) }, [finalTextBoxContent])
  useEffect(() => {
    if (selectedActivity == "Water") updateWaterValue()
    else if (selectedActivity == "Sleep Total") updateSleepValue()
  }, [selectedActivityText])
  
  
  useEffect(() => { setUpdatedDate(updateDateWith) }, [updateDateWith])
  useEffect(() => { setUpdateCurDateWith(updatedDate.toISOString().split("T")[0]) }, [updatedDate])
  useEffect(() => { setCurDate(updateCurDateWith) }, [updateCurDateWith])

  return (
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : undefined} style={{ flex: 1 }}>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity style={[styles.arrowButtonsLocation, {alignItems: 'flex-end'}]} onPress={() => {
                currentDay = new Date(updateDateWith.getFullYear(), updateDateWith.getMonth(), updateDateWith.getDate() - 1)
                currentDay.setHours(updateDateWith.getHours())
                setUpdateDateWith(currentDay)
              }}>
                <Image style={styles.arrowButtonsImgs} source={require('../assets/images/leftArrow.png')} />
              </TouchableOpacity>
              
              <TouchableWithoutFeedback onPress={() => {
                currentDay = new Date();
                currentDay = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate())
                setUpdateDateWith(currentDay);
              }}>
                <Text style={{fontSize: 32, textAlign: 'center', width: 310 }}>{getMonthName(updateDateWith.getMonth())} {updateDateWith.getDate()}, {updateDateWith.getFullYear()}</Text>
              </TouchableWithoutFeedback>
              <TouchableOpacity style={styles.arrowButtonsLocation} onPress={() => {
                currentDay = new Date(updatedDate.getFullYear(), updatedDate.getMonth(), updatedDate.getDate() + 1)
                setUpdateDateWith(currentDay);
              }}>
                <Image style={styles.arrowButtonsImgs} source={require('../assets/images/rightArrow.png')} />
              </TouchableOpacity>
            </View>

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
                    getActivityValue={() => handleMealPress("Breakfast", "Meal", getBreakfastValue)}
                  />
                  <ActivityButton
                    activityName="Lunch"
                    getActivityValue={() => handleMealPress("Lunch", "Meal", getLunchValue)}
                  />
                  <ActivityButton
                    activityName="Dinner"
                    getActivityValue={() => handleMealPress("Dinner", "Meal", getDinnerValue)}
                  />
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 4, marginRight: 4, justifyContent: 'center' }}>
                  <ActivityButton
                    activityName="Snacks"
                    getActivityValue={() => handleMealPress("Snacks", "Meal", getSnackValue)}
                  />
                  <ActivityButton
                    activityName="Water"
                    getActivityValue={handleWaterPress}
                  />
                </View>
              </View>

              {/* Moods & Sleep Section */}
              <View>
                <Text style={{ fontSize: 22, padding: 8, textAlign: 'center' }}>Moods & Sleep</Text>
                <View style={{ flexDirection: 'row', marginBottom: 8, marginRight: 4, justifyContent: 'space-around' }}>
                  <ActivityButton
                    activityName="Morning Mood"
                    getActivityValue={() => handleMoodPress("Morning Mood", "12 AM-8 AM")}
                  />
                  <ActivityButton
                    activityName="Midday Mood"
                    getActivityValue={() => handleMoodPress("Midday Mood", "9 AM-4 PM")}
                  />
                  <ActivityButton
                    activityName="Night Mood"
                    getActivityValue={() => handleMoodPress("Night Mood", "5 PM-11 PM")}
                  />
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 4, marginRight: 4, justifyContent: 'center' }}>
                  <ActivityButton
                    activityName="Sleep Total"
                    getActivityValue={handleSleepPress}
                  />
                </View>
              </View>

              {/* Extra Activities Section */}
              <View style={{flex: 1}}>
                <Text style={{ fontSize: 22, padding: 8, textAlign: 'center' }}>Extra Activities</Text>
                <View style={{ alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap' }}>
                  <FlatList
                    data={listOfActivityButtons}
                    renderItem={({ item }) => (
                      <ActivityButton
                        activityName={item}
                        getActivityValue={() => handleCustomActivityPress(item)}
                      />
                    )}
                    contentContainerStyle={{alignItems: 'center'}}
                    numColumns={3}
                  />
                </View>
                <View style={{ height: 60, width: 96, alignSelf: 'center' }}>
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

              {modalType === "update" 
              ? 
                activityName.includes("Mood") 
                ? 
                  <MoodGrid curDate={updatedDate} selectedActivityName={activityName} selectedActivityUnit={selectedActivityUnit} selectedActivityText={String(selectedActivityVal)} setSelectedActivityText={setSelectedActivityText} onSave={handleSave} />
                : 
                  <>
                    {/* Activity Unit Input Box & Save Button */}
                    <UpdateModal
                      curDate={updatedDate}
                      selectedActivityName={activityName}
                      selectedActivityUnit={selectedActivityUnit}
                      selectedActivityText={String(textInputVal)}
                    />
                  </>
              :
                <CreateModal
                  onSave={handleCreateSave}
                  keyboardTypeName={keyboardTypeName}
                /> 
              }
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </Modal>
    </>
  );
};

export default CheckIn;
