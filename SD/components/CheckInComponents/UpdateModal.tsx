// UpdateModal.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { modalStyles } from '../../styles/CheckInStyles';
import { updateFood, updateSleepTotal, updateWater, updateActivity } from '../../database/database';

interface UpdateModalProps {
  curDate: Date;
  selectedActivityName: string;
  selectedActivityUnit: string;
  selectedActivityText: string;
}

export const UpdateModal: React.FC<UpdateModalProps> = ({
  curDate,
  selectedActivityName,
  selectedActivityUnit,
  selectedActivityText
}) => {
  const [inputValue, setInputValue] = selectedActivityText != "null" ? useState(selectedActivityText) : useState("0");
  const [updatedInputText, setUpdatedInputText] = useState(inputValue);

  useEffect(() => {
    setInputValue(selectedActivityText);
  }, [selectedActivityText]);

  /* Ensures moodVal is updated immediately upon trying to save */
  const saveToDB = async () => {
    if(selectedActivityName === "Water") {
      console.log(curDate.toISOString().split("T")[0])
      await updateWater(updatedInputText, curDate.toISOString().split("T")[0])
    }
    else if(selectedActivityName === "Sleep Total") {
      await updateSleepTotal(updatedInputText, curDate.toISOString().split("T")[0])
    }
    else if(["Breakfast", "Lunch", "Dinner", "Snacks"].includes(selectedActivityName)) {
      await updateFood(updatedInputText, curDate.toISOString().split("T")[0], selectedActivityName)
    }
    else { // Custom Activity
      var text = Number(updatedInputText)
      await updateActivity(curDate.toISOString().split("T")[0], selectedActivityName, text)
    }
  }

  return (
    <View>
      {/* Selected Activity */}
      <Text style={{fontSize: 48, padding: 20, alignSelf: 'center'}}>{selectedActivityName}</Text>
      <View style={modalStyles.boxStyling}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {/* Selected Activity's Unit */}
          <Text style={modalStyles.unitsLabel}>{selectedActivityUnit}:</Text>
          
          {/* Save Button */}
          <TouchableOpacity 
            style={modalStyles.saveButton} 
            onPress={() => {
              /* onSave(inputValue) */
              saveToDB()
            }
          }>
            <Text style={modalStyles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={modalStyles.inputBox}
          defaultValue={inputValue}
          onChangeText={setUpdatedInputText}
          multiline
          keyboardType={'decimal-pad'}
        />
      </View>
    </View>
  );
};
