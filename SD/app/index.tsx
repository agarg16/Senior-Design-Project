import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, Dimensions, Platform, TouchableOpacity, Image, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Modal } from "react-native";
import { getMonthName } from '../additionalFiles/getMonthName.js';
import { getEntry, updateJournalEntry, filterByDate } from '../database/database';
import { Ionicons } from '@expo/vector-icons';
import { styles, } from '../styles/IndexStyles';
import CalendarHeader from '../components/IndexComponents/CalendarHeader';
import CalendarGrid from '../components/IndexComponents/CalendarGrid';
import JournalEntryModal from '../components/IndexComponents/JournalEntryModal';
import SearchModal from '../components/IndexComponents/SearchModal';
import JournalInputSection from '../components/IndexComponents/JournalInputSection';

const calendarFlexSize = 4;
var daysBoxHeight = 0;
var width = Dimensions.get('screen').width;
var height = Dimensions.get('screen').height;
daysBoxHeight = width <= height ? (width * 0.0725) - (width * 0.005) : (height * 0.035) - (height * 0.0001);
const curDate = new Date();

const Index = () => {
  const [modalType, setModalType] = useState(0);
  const [clearButtonUpdate, setClearButtonUpdate] = useState(false);
  const [curDay, setCurDay] = useState(curDate.getDate());
  const [curMonth, setCurMonth] = useState(curDate.getMonth());
  const [curYear, setCurYear] = useState(curDate.getFullYear());
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [modalTypeSelected, setModalTypeSelected] = useState("");
  const [textToDisplay, setTextToDisplay] = useState("");
  const [curStartingDayOfWeek, setCurStartingDayOfWeek] = useState(new Date(curDate.getFullYear(), curDate.getMonth(), 1).getDay());
  const [numDaysInCurMonth, setNumDaysInCurMonth] = useState(new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0).getDate());
  const [userEntryText, setUserEntryText] = useState("");
  const [visibleEntry, setVisibleEntry] = useState("");
  const [startYear, setStartYear] = useState(2020);
  const [startMonth, setStartMonth] = useState(0);
  const [startDay, setStartDay] = useState(1);
  const [startDateString, setStartDateString] = useState(new Date(startYear, startMonth, startDay).toISOString().split("T")[0]);
  const [endYear, setEndYear] = useState(new Date().getFullYear());
  const [endMonth, setEndMonth] = useState(11);
  const [endDay, setEndDay] = useState(31);
  const [endDateString, setEndDateString] = useState(new Date(endYear, endMonth, endDay).toISOString().split("T")[0]);
  const [keyword, setKeyword] = useState("");
  const [updateUsingSearchButton, setUpdateUsingSearchButton] = useState(false);
  const [filteredJournalEntries, setFilteredJournalEntries] = useState<{ date: string, journalEntry: string }[]>([]);

  const updateCalendarHeader = (directionChanged: number) => {
    setCurMonth((curMonth + directionChanged) % 12);
    if (curMonth < 0) {
      setCurMonth(11);
      setCurYear(curYear - 1);
    }
    else if (curMonth > 11) {
      setCurMonth(0);
      setCurYear(curYear + 1);
    }
  };

  const getCurDateEntry = async (date: string) => {
    const entry = await getEntry(date);
    if (entry === "") { setVisibleEntry(""); }
    else { setVisibleEntry(entry); }
  };

  const updateEntry = async (date: Date, entry: string) => {
    const currentEnteredDate = (new Date(date.getFullYear(), date.getMonth(), date.getDate())).toISOString().split("T")[0];
    updateJournalEntry(currentEnteredDate, entry);
    getCurDateEntry(currentEnteredDate);
  };

  const filterJournalEntries = async () => {
    if (startDateString != "" && endDateString != "") {
      const entries = await filterByDate(startDateString, endDateString, keyword);
      setFilteredJournalEntries(entries);
    }
  };

  useEffect(() => { getCurDateEntry((new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate())).toISOString().split("T")[0]) }, [viewModalVisible === true, curDay]);
  useEffect(() => { modalType === 0 ? setModalTypeSelected("journal-entry") : setModalTypeSelected("search") }, [modalType]);
  useEffect(() => { filterJournalEntries() }, [updateUsingSearchButton]);
  useEffect(() => {
    setStartYear(2020);
    setStartMonth(0);
    setStartDay(1);
    setStartDateString(new Date(startYear, startMonth, startDay).toISOString().split("T")[0]);
    setEndYear(new Date().getFullYear());
    setEndMonth(11);
    setEndDay(31);
    setEndDateString(new Date(endYear, endMonth, endDay).toISOString().split("T")[0]);
    setKeyword("");
    setTextToDisplay("");
  }, [clearButtonUpdate]);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : undefined} style={{ flex: 1 }}>
            {/* Search Button */}
            <TouchableOpacity style={{ backgroundColor: 'azure', borderWidth: 1, flexDirection: 'row', height: 38 }} onPress={() => {
              setViewModalVisible(true);
              setModalType(1);
              setKeyword("");
              setClearButtonUpdate(!clearButtonUpdate);
            }}>
              <Text style={{ color: 'gray', fontSize: 18, width: '100%', textAlign: 'center', alignSelf: 'center' }}>Search for Entry</Text>
              <Ionicons style={{ color: 'gray', fontSize: 28, padding: 4, position: 'absolute', right: 0 }} name='search-outline' />
            </TouchableOpacity>

            {/* Calendar */}
            <View style={{ flex: calendarFlexSize, paddingLeft: '5%', paddingRight: '5%', marginBottom: '5%', justifyContent: 'flex-start' }}>
              <CalendarHeader 
                curDate={curDate} 
                updateCalendarHeader={updateCalendarHeader} 
                getMonthName={getMonthName} 
              />

              <CalendarGrid 
                curStartingDayOfWeek={curStartingDayOfWeek} 
                numDaysInCurMonth={numDaysInCurMonth} 
                curDate={curDate} 
                setCurDay={setCurDay} 
              />

              {/* Today Button */}
              <TouchableOpacity
                style={styles.todayButton}
                onPress={() => {
                  const today = new Date();
                  curDate.setFullYear(today.getFullYear(), today.getMonth(), today.getDate());
                  setCurDay(today.getDate());
                  setCurMonth(today.getMonth());
                  setCurYear(today.getFullYear());
                  setCurStartingDayOfWeek(new Date(curDate.getFullYear(), curDate.getMonth(), 1).getDay());
                  setNumDaysInCurMonth(new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0).getDate());
                }}>
                <Text style={styles.todayButtonText}>Today</Text>
              </TouchableOpacity>
            </View>

            <JournalInputSection 
              curDate={curDate} 
              visibleEntry={visibleEntry} 
              userEntryText={userEntryText} 
              setUserEntryText={setUserEntryText} 
              updateEntry={updateEntry} 
              setViewModalVisible={setViewModalVisible} 
              onViewPress={() => {
                setModalType(0);
                setViewModalVisible(true);
                getCurDateEntry(
                  new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate())
                  .toISOString()
                  .split("T")[0]
                );
              }}
            />
          </KeyboardAvoidingView>
        </SafeAreaView>
      </TouchableWithoutFeedback>

      {/* Modals */}
      {modalTypeSelected === "journal-entry" ?
        <Modal visible={viewModalVisible} onRequestClose={() => setViewModalVisible(false)} animationType='slide' presentationStyle='pageSheet'>
          <JournalEntryModal 
            visibleEntry={visibleEntry} 
            setViewModalVisible={setViewModalVisible} 
            curDate={curDate} 
            getMonthName={getMonthName} 
          />
        </Modal>
        :
        <Modal visible={viewModalVisible} onRequestClose={() => setViewModalVisible(false)} animationType='slide' presentationStyle='pageSheet'>
          <SearchModal
            setViewModalVisible={setViewModalVisible}
            startYear={startYear} setStartYear={setStartYear}
            startMonth={startMonth} setStartMonth={setStartMonth}
            startDay={startDay} setStartDay={setStartDay}
            endYear={endYear} setEndYear={setEndYear}
            endMonth={endMonth} setEndMonth={setEndMonth}
            endDay={endDay} setEndDay={setEndDay}
            keyword={keyword} setKeyword={setKeyword}
            filteredJournalEntries={filteredJournalEntries}
            setUpdateUsingSearchButton={setUpdateUsingSearchButton}
            getMonthName={getMonthName}
          />
        </Modal>
      }
    </>
  );
};

export default Index;