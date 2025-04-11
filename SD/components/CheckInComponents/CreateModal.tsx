import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { modalStyles } from '../../styles/CheckInStyles';

interface CreateModalProps {
  onSave: (name: string, unit: string) => void;
  keyboardTypeName: string;
}

export const CreateModal: React.FC<CreateModalProps> = ({
  onSave,
  keyboardTypeName,
}) => {
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');

  return (
    <View>
      <Text style={{fontSize: 48, padding: 20, alignSelf: 'center'}}>New Activity</Text>
      <View style={modalStyles.boxStyling}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={modalStyles.unitsLabel}>Name:</Text>
          <TouchableOpacity style={modalStyles.saveButton} onPress={() => onSave(name, unit)}>
            <Text style={modalStyles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={modalStyles.inputBox}
          onChangeText={setName}
          value={name}
          multiline
          keyboardType={keyboardTypeName === "default" ? 'default' : 'decimal-pad'}
        />
        <View style={{marginTop: 16, flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={modalStyles.unitsLabel}>Unit:</Text>
        </View>
        <TextInput
          style={modalStyles.inputBox}
          onChangeText={setUnit}
          value={unit}
          multiline
          keyboardType={keyboardTypeName === "default" ? 'default' : 'decimal-pad'}
        />
      </View>
    </View>
  );
};
