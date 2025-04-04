import React from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { searchModalStyles } from '../../styles/IndexStyles';

interface SearchModalProps {
  setViewModalVisible: (visible: boolean) => void;
  startYear: number;
  setStartYear: (year: number) => void;
  startMonth: number;
  setStartMonth: (month: number) => void;
  startDay: number;
  setStartDay: (day: number) => void;
  endYear: number;
  setEndYear: (year: number) => void;
  endMonth: number;
  setEndMonth: (month: number) => void;
  endDay: number;
  setEndDay: (day: number) => void;
  keyword: string;
  setKeyword: (keyword: string) => void;
  filteredJournalEntries: Array<{ date: string; journalEntry: string }>;
  setUpdateUsingSearchButton: React.Dispatch<React.SetStateAction<boolean>>;
  getMonthName: (monthIndex: number) => string;
}

const SearchModal: React.FC<SearchModalProps> = ({ 
  setViewModalVisible, 
  startYear, setStartYear,
  startMonth, setStartMonth,
  startDay, setStartDay,
  endYear, setEndYear,
  endMonth, setEndMonth,
  endDay, setEndDay,
  keyword, setKeyword,
  filteredJournalEntries,
  setUpdateUsingSearchButton,
  getMonthName
}) => {
  return (
    <SafeAreaView style={searchModalStyles.container}>
      <TouchableOpacity style={searchModalStyles.backButton} onPress={() => setViewModalVisible(false)}>
        <Ionicons name="chevron-back" color={'#18576D'} size={20} />
        <Text style={{ color: '#18576D', fontSize: 16 }}>Back</Text>
      </TouchableOpacity>

      <View style={{ borderBottomWidth: 1 }}>
        <View style={{ backgroundColor: 'azure', margin: 20, paddingTop: 8, paddingBottom: 8, borderWidth: 1, borderRadius: 20 }}>
          {/* Start and End Input Dates */}
          <View style={{ justifyContent: 'space-evenly', flexDirection: 'row' }}>
            {/* Start Date Input */}
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 32, paddingBottom: 4 }}>Start</Text>
              <View style={searchModalStyles.yearMonthDayBox}>
                <View style={{ paddingRight: 4 }}>
                  <Text style={searchModalStyles.yearMonthDayText}>Year:</Text>
                  <Text style={searchModalStyles.yearMonthDayText}>Month:</Text>
                  <Text style={searchModalStyles.yearMonthDayText}>Day:</Text>
                </View>
                <View>
                  <TextInput
                    style={searchModalStyles.yearMonthDayInputText}
                    placeholder='----'
                    placeholderTextColor={'lightblue'}
                    textAlign='center'
                    keyboardType='number-pad'
                    maxLength={4}
                    onChangeText={newText => { newText == "" ? setStartYear(-1) : setStartYear(Number(newText)) }}
                  />
                  <TextInput
                    style={searchModalStyles.yearMonthDayInputText}
                    placeholder='--'
                    placeholderTextColor={'lightblue'}
                    textAlign='center'
                    keyboardType='number-pad'
                    maxLength={2}
                    onChangeText={newText => { newText == "" ? setStartMonth(-1) : setStartMonth(Number(newText)) }}
                  />
                  <TextInput
                    style={searchModalStyles.yearMonthDayInputText}
                    placeholder='--'
                    placeholderTextColor={'lightblue'}
                    textAlign='center'
                    keyboardType='number-pad'
                    maxLength={2}
                    onChangeText={newText => { newText == "" ? setStartDay(-1) : setStartDay(Number(newText)) }}
                  />
                </View>
              </View>
            </View>

            {/* End Date Input */}
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 32, paddingBottom: 4 }}>End</Text>
              <View style={searchModalStyles.yearMonthDayBox}>
                <View style={{ paddingRight: 4 }}>
                  <Text style={{ fontSize: 24, textAlign: 'right', marginBottom: 4 }}>Year:</Text>
                  <Text style={{ fontSize: 24, textAlign: 'right', marginBottom: 4 }}>Month:</Text>
                  <Text style={{ fontSize: 24, textAlign: 'right', marginBottom: 4 }}>Day:</Text>
                </View>
                <View>
                  <TextInput
                    style={searchModalStyles.yearMonthDayInputText}
                    placeholder='----'
                    placeholderTextColor={'lightblue'}
                    textAlign='center'
                    keyboardType='number-pad'
                    maxLength={4}
                    onChangeText={newText => { newText == "" ? setEndYear(-1) : setEndYear(Number(newText)) }}
                  />
                  <TextInput
                    style={searchModalStyles.yearMonthDayInputText}
                    placeholder='--'
                    placeholderTextColor={'lightblue'}
                    textAlign='center'
                    keyboardType='number-pad'
                    maxLength={2}
                    onChangeText={newText => { newText == "" ? setEndMonth(-1) : setEndMonth(Number(newText)) }}
                  />
                  <TextInput
                    style={searchModalStyles.yearMonthDayInputText}
                    placeholder='--'
                    placeholderTextColor={'lightblue'}
                    textAlign='center'
                    keyboardType='number-pad'
                    maxLength={2}
                    onChangeText={newText => { newText == "" ? setEndDay(-1) : setEndDay(Number(newText)) }}
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Keyword Input */}
          <View style={{ paddingTop: 16, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ fontSize: 20, paddingRight: 4 }}>Keyword:</Text>
            <TextInput
              style={searchModalStyles.keywordBox}
              placeholder='Enter a Keyword to Start Search'
              placeholderTextColor={'gray'}
              onChangeText={newText => { setKeyword(newText) }}
            />
          </View>

          {/* Search Button */}
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity style={searchModalStyles.searchButton} onPress={() => {
              setUpdateUsingSearchButton(prev => !prev);
            }}>
              <Text style={{ fontSize: 16, textDecorationLine: 'underline' }}>Search</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Entries that Meet Filter Criteria */}
      <View style={{ backgroundColor: 'azure', flex: 1, borderBottomWidth: 1 }}>
        <FlatList
          data={filteredJournalEntries}
          renderItem={({ item }) => {
            var date = new Date(item.date);
            var monthName = getMonthName(date.getMonth());
            return (
              <View style={searchModalStyles.searchResultBoxes}>
                <Text style={{ fontSize: 20, fontWeight: 600, textAlign: 'center', paddingBottom: 4 }}>{monthName} {date.getDate() + 1}, {date.getFullYear()}:</Text>
                <Text>{item.journalEntry}</Text>
              </View>
            );
          }}
          contentContainerStyle={{ flexGrow: 1, padding: 20, backgroundColor: 'azure' }}
          keyboardShouldPersistTaps={'always'}
        />
      </View>
    </SafeAreaView>
  );
};

export default SearchModal;