import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, Text, FlatList } from 'react-native';
import { modalStyles } from '../../styles/CheckInStyles';
import { updateMood } from '../../database/database';

interface MoodGridProps {
  curDate: string;
  selectedActivityName: string;
  selectedActivityUnit: string;
  selectedActivityText: string;
  setSelectedActivityText: (text: string) => void;
  onSave: (value: string) => void;
}

export const MoodGrid: React.FC<MoodGridProps> = ({
  curDate,
  selectedActivityName,
  selectedActivityUnit,
  selectedActivityText, 
  setSelectedActivityText,
  onSave
}) => {
  /* List of Mood Images */
  const images = [
    require('../../assets/images/1.png'),
    require('../../assets/images/2.png'),
    require('../../assets/images/3.png'),
    require('../../assets/images/4.png'),
    require('../../assets/images/5.png'),
    require('../../assets/images/6.png'),
    require('../../assets/images/7.png'),
  ];

  const [moodVal, setMoodVal] = useState(selectedActivityText);

  /* Immediately updates the default moodVal to be the value currently stored in the database */
  useEffect(() => {
    setMoodVal(selectedActivityText)
  }, [selectedActivityText])

  /* Saves the selected mood when the user presses the Save button */
  const Save = () => {
    return (
      <TouchableOpacity 
        style={modalStyles.saveButton} 
        onPress={() => {
          onSave(moodVal)
          saveToDB()
        }
      }>
        <Text style={modalStyles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    )
  }

  /* Ensures moodVal is updated immediately upon trying to save */
  const saveToDB = async () => { await updateMood(moodVal, curDate, selectedActivityName); }

  /* Allows for the current mood displayed to be re-rendered without re-rendering the other images on the screen */
  const MoodDisplayed = () => {
    return (
      moodVal === "null" || moodVal === "" || moodVal === "0"
      ? (
          <Text style={{ fontSize: 16, margin: 17 }}>None</Text>
        )
      : (
        <Image
          source={images[Number(moodVal) - 1]}
          style={{ width: 45, height: 45, margin: 4 }}
        />
      )
    )
  }

  return (
    <View>
      {/* Mood Name */}
      <Text style={{fontSize: 48, padding: 20, alignSelf: 'center'}}>{selectedActivityName}</Text>

      <View style={modalStyles.boxStyling}>
        {/* Mood Unit */}
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={modalStyles.unitsLabel}>{selectedActivityUnit}:</Text>
          <Save />
        </View>

        {/* Displays the 7 Moods */}
        <FlatList 
          data={images}
          renderItem={({index}) => (
            <TouchableOpacity onPress={() => {
              setSelectedActivityText(String(index + 1))
              setMoodVal(String(index + 1))
            }}>
              <Image source={images[index]} style={{ width: 45, height: 45, margin: 3.5 }} />
            </TouchableOpacity>
          )}
          contentContainerStyle={{flexDirection: 'row', alignSelf: 'center'}}
        />

        {/* Current Selected Mood */}
        <View style={{ backgroundColor: 'azure', marginTop: 16, padding: 4, alignSelf: 'center', alignItems: 'center', borderWidth: 1, borderRadius: 10, width: '75%' }}>
          <Text style={{ fontSize: 20 }}>Current Selected Mood:</Text>
          <MoodDisplayed />
        </View>
      </View>
    </View>
  );
};
