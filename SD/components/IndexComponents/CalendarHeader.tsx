import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styles } from '../../styles/IndexStyles';

interface CalendarHeaderProps {
  curDate: Date;
  updateCalendarHeader: (direction: number) => void;
  getMonthName: (monthIndex: number) => string;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ 
  curDate, 
  updateCalendarHeader, 
  getMonthName 
}) => {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
      <TouchableOpacity style={styles.arrowButtonsLocation} onPress={() => {
        curDate.setMonth(curDate.getMonth() - 1);
        updateCalendarHeader(-1);
      }}>
        <Image style={styles.arrowButtonsImgs} source={require('../../assets/images/leftArrow.png')} />
      </TouchableOpacity>

      <Text style={{ fontSize: 38, textAlign: 'center', width: 280 }}>
        {getMonthName(curDate.getMonth())} {curDate.getFullYear()}
      </Text>

      <TouchableOpacity style={styles.arrowButtonsLocation} onPress={() => {
        curDate.setMonth(curDate.getMonth() + 1);
        updateCalendarHeader(1);
      }}>
        <Image style={styles.arrowButtonsImgs} source={require('../../assets/images/rightArrow.png')} />
      </TouchableOpacity>
    </View>
  );
};

export default CalendarHeader;