import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { styles } from '../../styles/IndexStyles';

interface JournalInputSectionProps {
  curDate: Date;
  visibleEntry: string;
  userEntryText: string;
  setUserEntryText: (text: string) => void;
  updateEntry: (date: Date, entry: string) => void;
  setViewModalVisible: (visible: boolean) => void;
  onViewPress: () => void;
}

const JournalInputSection: React.FC<JournalInputSectionProps> = ({
  curDate,
  visibleEntry,
  userEntryText,
  setUserEntryText,
  updateEntry,
  setViewModalVisible,
  onViewPress
}) => {
  return (
    <View style={{ backgroundColor: 'azure', padding: 10, borderWidth: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
          {curDate.toLocaleString('default', { month: 'long' })} {curDate.getDate()}, {curDate.getFullYear()}
        </Text>

        <TouchableOpacity style={{ width: '25%', alignItems: 'flex-end', justifyContent: 'center' }} onPress= {onViewPress}
        >
          <Text style={{ color: '#555555', fontSize: 14, textDecorationLine: 'underline', marginTop: '1%', marginRight: '6%' }}>View</Text>
        </TouchableOpacity>
      </View>

      <Text style={{ marginBottom: 5, width: '90%' }} numberOfLines={1}>{visibleEntry ? visibleEntry : "No journal entry for this day."}</Text>

      <ScrollView style={styles.journalInput} automaticallyAdjustKeyboardInsets={false}>
        <TextInput
          style={{ padding: 8, height: 120 }}
          multiline
          placeholder={visibleEntry ? visibleEntry : "Write your journal entry here..."}
          placeholderTextColor={visibleEntry ? "black" : "gray"}
          defaultValue={visibleEntry}
          onChangeText={newText => { setUserEntryText(newText) }}
        />
      </ScrollView>

      <TouchableOpacity style={{ marginTop: 10, padding: 10, backgroundColor: "#b1d8ff", borderColor: '#aaa', borderRadius: 5, borderWidth: 0.25 }} onPress={() => updateEntry(curDate, userEntryText)}>
        <Text style={{ textAlign: "center" }}>Insert Entry</Text>
      </TouchableOpacity>
    </View>
  );
};

export default JournalInputSection;