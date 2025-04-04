// UpdateModal.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { modalStyles } from '../../styles/CheckInStyles';

interface UpdateModalProps {
  selectedActivity: string;
  selectedActivityUnit: string;
  keyboardTypeName: string;
  textInputVal: string;
  onSave: (value: string) => void;
  selectedActivityText: string;
  setSelectedActivityText: (text: string) => void;
}

export const UpdateModal: React.FC<UpdateModalProps> = ({
  selectedActivity,
  selectedActivityUnit,
  keyboardTypeName,
  textInputVal,
  onSave,
  selectedActivityText,
  setSelectedActivityText
}) => {
  const [inputValue, setInputValue] = useState(textInputVal);

  useEffect(() => {
    setInputValue(textInputVal);
  }, [textInputVal]);

  return (
    <View>
      <Text style={{fontSize: 48, padding: 20, alignSelf: 'center'}}>{selectedActivity}</Text>
      <View style={modalStyles.boxStyling}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={modalStyles.unitsLabel}>{selectedActivityUnit}:</Text>
          <TouchableOpacity 
            style={modalStyles.saveButton} 
            onPress={() => onSave(inputValue)}
          >
            <Text style={modalStyles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={modalStyles.inputBox}
          value={inputValue}
          onChangeText={setInputValue}
          multiline
          keyboardType={keyboardTypeName === "default" ? 'default' : 'decimal-pad'}
        />
      </View>
    </View>
  );
};