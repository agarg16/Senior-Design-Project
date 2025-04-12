import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, Platform, TouchableOpacity, Image, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Modal } from "react-native";
import { getMonthName } from '../additionalFiles/getMonthName.js';
import { getEntry } from '../database/database';
import { Ionicons } from '@expo/vector-icons';
import { styles, } from '../styles/IndexStyles';
import CalendarGrid from '../components/IndexComponents/CalendarGrid';
import JournalEntryModal from '../components/IndexComponents/JournalEntryModal';
import SearchModal from '../components/IndexComponents/SearchModal';
import JournalInputSection from '../components/IndexComponents/JournalInputSection';

const calendarFlexSize = 4;
const curDate = new Date();

const Index = () => {
  const [modalType, setModalType] = useState(0);
  const [clearButtonUpdate, setClearButtonUpdate] = useState(false);
  const [curDay, setCurDay] = useState(curDate.getDate());
  const [curMonth, setCurMonth] = useState(curDate.getMonth());
  const [curYear, setCurYear] = useState(curDate.getFullYear());
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [modalTypeSelected, setModalTypeSelected] = useState("");
  const [curStartingDayOfWeek, setCurStartingDayOfWeek] = useState(new Date(curDate.getFullYear(), curDate.getMonth(), 1).getDay());
  const [numDaysInCurMonth, setNumDaysInCurMonth] = useState(new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0).getDate());
  const [visibleEntry, setVisibleEntry] = useState("");
  

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

  useEffect(() => { getCurDateEntry((new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate())).toISOString().split("T")[0]) }, [viewModalVisible === true, curDay]);
  useEffect(() => { modalType === 0 ? setModalTypeSelected("journal-entry") : setModalTypeSelected("search") }, [modalType]);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : undefined} style={{ flex: 1 }}>
            {/* Search Button */}
            <TouchableOpacity style={{ backgroundColor: 'azure', borderWidth: 1, flexDirection: 'row', height: 38 }} onPress={() => {
              setViewModalVisible(true);
              setModalType(1);
              setClearButtonUpdate(!clearButtonUpdate);
            }}>
              <Text style={{ color: 'gray', fontSize: 18, width: '100%', textAlign: 'center', alignSelf: 'center' }}>Search for Entry</Text>
              <Ionicons style={{ color: 'gray', fontSize: 28, padding: 4, position: 'absolute', right: 0 }} name='search-outline' />
            </TouchableOpacity>

            {/* Calendar */}
            <View style={{ flex: calendarFlexSize, paddingLeft: '5%', paddingRight: '5%', marginBottom: '5%', justifyContent: 'flex-start' }}>
              <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                <TouchableOpacity style={styles.arrowButtonsLocation} onPress={() => {
                  curDate.setMonth(curDate.getMonth() - 1);
                  updateCalendarHeader(-1);
                  setCurStartingDayOfWeek(new Date(curDate.getFullYear(), curDate.getMonth(), 1).getDay())
                  setNumDaysInCurMonth(new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0).getDate())
                  getCurDateEntry(
                    new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate())
                    .toISOString()
                    .split("T")[0]
                  );
                }}>
                  <Image style={styles.arrowButtonsImgs} source={require('../assets/images/leftArrow.png')} />
                </TouchableOpacity>
          
                <TouchableWithoutFeedback onPress={() => {
                  const today = new Date();
                  curDate.setFullYear(today.getFullYear(), today.getMonth(), today.getDate());
                  setCurDay(today.getDate());
                  setCurMonth(today.getMonth());
                  setCurYear(today.getFullYear());
                  setCurStartingDayOfWeek(new Date(curDate.getFullYear(), curDate.getMonth(), 1).getDay());
                  setNumDaysInCurMonth(new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0).getDate());
                }}>
                  <Text style={{ fontSize: 38, textAlign: 'center', width: 280 }}>
                    {getMonthName(curDate.getMonth())} {curDate.getFullYear()}
                  </Text>
                </TouchableWithoutFeedback>
          
                <TouchableOpacity style={styles.arrowButtonsLocation} onPress={() => {
                  curDate.setMonth(curDate.getMonth() + 1);
                  updateCalendarHeader(1);
                  setCurStartingDayOfWeek(new Date(curDate.getFullYear(), curDate.getMonth(), 1).getDay())
                  setNumDaysInCurMonth(new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0).getDate())
                  getCurDateEntry(
                    new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate())
                    .toISOString()
                    .split("T")[0]
                  );
                }}>
                  <Image style={styles.arrowButtonsImgs} source={require('../assets/images/rightArrow.png')} />
                </TouchableOpacity>
              </View>

              {/* Displays the minimum weeks-worth of days needed to display all days of the month and a filler number for text in each day */}
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

            {/* Journal Entry Box */}
            <JournalInputSection 
              curDate={curDate} 
              visibleEntry={visibleEntry} 
              setVisibleEntry={setVisibleEntry}
              getCurDateEntry={getCurDateEntry}
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
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : undefined} style={{ backgroundColor: 'white', flex: 1 }}>
              <JournalEntryModal 
                visibleEntry={visibleEntry} 
                setViewModalVisible={setViewModalVisible} 
                curDate={curDate} 
                getMonthName={getMonthName} 
              />
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </Modal>
        :
        <Modal visible={viewModalVisible} onRequestClose={() => setViewModalVisible(false)} animationType='slide' presentationStyle='pageSheet'>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : undefined} style={{ backgroundColor: 'white', flex: 1 }}>
              <SearchModal
                setViewModalVisible={setViewModalVisible}
                getMonthName={getMonthName}
              />
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </Modal>
      }
    </>
  );
};

export default Index;
