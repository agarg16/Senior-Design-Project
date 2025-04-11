import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { searchModalStyles } from '../../styles/IndexStyles';
import { filterByDate } from '../../database/database'

interface SearchModalProps {
  setViewModalVisible: (visible: boolean) => void;
  getMonthName: (monthIndex: number) => string;
}

const SearchModal: React.FC<SearchModalProps> = ({ 
  setViewModalVisible, 
  getMonthName
}) => {
  const [startYear, setStartYear] = useState(2020);
  const [startMonth, setStartMonth] = useState(1);
  const [startDay, setStartDay] = useState(1);
  const [endYear, setEndYear] = useState(new Date().getFullYear());
  const [endMonth, setEndMonth] = useState(11);
  const [endDay, setEndDay] = useState(31);
  const [startDateString, setStartDateString] = useState(new Date(startYear, startMonth, startDay).toISOString().split("T")[0]);
  const [endDateString, setEndDateString] = useState(new Date(endYear, endMonth, endDay).toISOString().split("T")[0]);

  const [keyword, setKeyword] = useState("");
  const [updateUsingSearchButton, setUpdateUsingSearchButton] = useState(false);
  const [filteredJournalEntries, setFilteredJournalEntries] = useState<{ date: string, journalEntry: string }[]>([]);

  /* Updates the date for the filter Start date that the user enters */
  useEffect(() => {
    var year = startYear
    var month = startMonth - 1
    var day = startDay

    /* Values to use in place of empty boxes for the end year, month, or day */
    if(startYear === -1) { year = 2020 }
    if(startMonth === -1) {  month = 0 }
    if(startDay === -1) { day = 1 }

    setStartDateString((new Date(year, month, day)).toISOString().split("T")[0]);
    console.log("Post start update: " + startDateString);
  }, [startDay, startMonth, startYear])

  /* Updates the date for the filter End date that the user enters */
  useEffect(() => {
    var year = endYear
    var month = endMonth - 1
    var day = endDay 

    /* Values to use in place of empty boxes for the end year, month, or day */
    if(endYear === -1) { year = new Date().getFullYear() }
    if(endMonth === -1) {  month = 11 }
    if(endDay === -1) {
      month += 1
      day = 0
    }

    setEndDateString((new Date(year, month, day)).toISOString().split("T")[0]);
    console.log("Post start update: " + startDateString);
    console.log("Y " + year + " M " + month + " D " + day);
  }, [endDay, endMonth, endYear])


  useEffect(() => { filterJournalEntries() }, [updateUsingSearchButton]);

  const filterJournalEntries = async () => {
    if (startDateString != "" && endDateString != "") {
      console.log("Start date: " + startDateString);
      console.log("End date: " + endDateString);

      setStartDateString(new Date(startYear, startMonth - 1, startDay).toISOString().split("T")[0])

      const entries = await filterByDate(startDateString, endDateString, keyword);
      setFilteredJournalEntries(entries);
    }
  };

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
                  setUpdateUsingSearchButton(!updateUsingSearchButton);
                  console.log("Starts: Year (" + startYear + ") Month (" + startMonth + ") Day (" + startDay + ")");
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
                date.setDate(date.getDate() + 1); /* Ensures the number displayed matches the correct date */
                var lastDayInCurMonth = new Date(date.getFullYear(), date.getMonth(), 0); /* Prevents edge-case days from incorrectly displaying */
                var monthName = getMonthName(date.getMonth());
                return (
                  <View style={searchModalStyles.searchResultBoxes}>
                    <Text style={{ fontSize: 20, fontWeight: 600, textAlign: 'center', paddingBottom: 4 }}>{monthName} {date.getDate() % (lastDayInCurMonth).getDate()}, {date.getFullYear()}:</Text>
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
