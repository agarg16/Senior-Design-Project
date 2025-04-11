import React from 'react';
import { SafeAreaView, TouchableOpacity, Text, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { journalEntryModalStyles } from '../../styles/IndexStyles';

interface JournalEntryModalProps {
  visibleEntry: string;
  setViewModalVisible: (visible: boolean) => void;
  curDate: Date;
  getMonthName: (monthIndex: number) => string;
}

const JournalEntryModal: React.FC<JournalEntryModalProps> = ({ 
  visibleEntry, 
  setViewModalVisible, 
  curDate, 
  getMonthName 
}) => {
  return (
    <SafeAreaView style={journalEntryModalStyles.container}>
      {/* Back Button */}
      <TouchableOpacity style={journalEntryModalStyles.backButton} onPress={() => setViewModalVisible(false)}>
        <Ionicons name="chevron-back" color={'#18576D'} size={20} />
        <Text style={{ color: '#18576D', fontSize: 16 }}>Back</Text>
      </TouchableOpacity>

      <Text style={{ fontSize: 32, textAlign: 'center', padding: 4 }}>{getMonthName(curDate.getMonth())} {curDate.getDate()}, {curDate.getFullYear()}</Text>
      <ScrollView style={{}} contentContainerStyle={{ backgroundColor: 'white', borderWidth: 1, borderRadius: 10, padding: 16, margin: 16 }}>
        <Text>{visibleEntry}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default JournalEntryModal;
