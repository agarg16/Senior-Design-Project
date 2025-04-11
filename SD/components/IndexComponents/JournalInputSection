import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { styles } from '../../styles/IndexStyles';
import { updateJournalEntry } from '../../database/database';

interface JournalInputSectionProps {
  curDate: Date;
  visibleEntry: string;
  setVisibleEntry: (entryVisible: string) => void;
  getCurDateEntry: (date: string) => void;
  onViewPress: () => void;
}

const JournalInputSection: React.FC<JournalInputSectionProps> = ({
  curDate,
  visibleEntry,
  setVisibleEntry,
  getCurDateEntry,
  onViewPress
}) => {
  const [updateEntryVisibility, setUpdateEntryVisibility] = useState(false);
  const [displayedEntry, setDisplayedEntry] = useState("");

  const updateEntry = async (entry: string) => {
    const currentEnteredDate = (new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate())).toISOString().split("T")[0];
    updateJournalEntry(currentEnteredDate, entry);
    setUpdateEntryVisibility(!updateEntryVisibility);
  };

  // Finds the current day's entry when either the view modal is visible or the current day is modified
  useEffect(() => {getCurDateEntry((new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate())).toISOString().split("T")[0])}, [curDate])

  useEffect(() => setVisibleEntry(displayedEntry), [updateEntryVisibility])

  return (
    /* Summary */
    <View style={{ backgroundColor: 'azure', padding: 10, borderWidth: 1 }}>
      {/* Current Date, Delete Button, and Whether or Not There Are Journal Entries */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {/* Current Date */}
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
          {curDate.toLocaleString('default', { month: 'long' })} {curDate.getDate()}, {curDate.getFullYear()}
        </Text>

        {/* View Button */}
        <TouchableOpacity style={{ width: '25%', alignItems: 'flex-end', justifyContent: 'center' }} onPress= {onViewPress}>
          <Text style={{ color: '#555555', fontSize: 14, textDecorationLine: 'underline', marginTop: '1%', marginRight: '6%' }}>View</Text>
        </TouchableOpacity>
      </View>

      {/* Whether or Not There Are Journal Entries */}
      <Text style={{ marginBottom: 5, width: '90%' }} numberOfLines={1}>{visibleEntry ? visibleEntry : "No journal entry for this day."}</Text>

      {/* Entry Input */}
      <ScrollView style={styles.journalInput} automaticallyAdjustKeyboardInsets={false}>
        <TextInput
          style={{ padding: 8, height: 120 }}
          multiline
          placeholder={"Write your journal entry here..."}
          placeholderTextColor={"gray"}
          defaultValue={visibleEntry}
          onChangeText={newText => { setDisplayedEntry(newText) }}
        />
      </ScrollView>

      {/* Insert Entry Button */}
      <TouchableOpacity style={{ marginTop: 10, padding: 10, backgroundColor: "#b1d8ff", borderColor: '#aaa', borderRadius: 5, borderWidth: 0.25 }} onPress={() => updateEntry(displayedEntry) }>
        <Text style={{ textAlign: "center" }}>Insert Entry</Text>
      </TouchableOpacity>
    </View>
  );
};

export default JournalInputSection;
