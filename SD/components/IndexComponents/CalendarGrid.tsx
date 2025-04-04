import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { styles } from '../../styles/IndexStyles';

interface CalendarGridProps {
  curStartingDayOfWeek: number;
  numDaysInCurMonth: number;
  curDate: Date;
  setCurDay: (day: number) => void;
}

const DAYS_BOXES = Array.from({ length: 42 }, (_, i) => ({ id: i + 1 }));

const CalendarGrid: React.FC<CalendarGridProps> = ({ 
  curStartingDayOfWeek, 
  numDaysInCurMonth, 
  curDate, 
  setCurDay 
}) => {
  const renderItem = ({ index }: { index: number }) => {
    const day = index - curStartingDayOfWeek + 1;
    const isSelected = curDate.getDate() === day;
    
    if (index < curStartingDayOfWeek || index >= (numDaysInCurMonth + curStartingDayOfWeek)) {
      return <View style={styles.calendarDayOutlines}><Text></Text></View>;
    }

    return (
      <TouchableOpacity
        style={styles.calendarDayOutlines}
        onPress={() => {
          curDate.setDate(day);
          setCurDay(day);
        }}>
        <View style={isSelected && styles.selectedDay}>
          <Text style={styles.calendarDayText}>{day}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <View style={styles.calendarWeeksContainer}>
        {['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'].map(day => (
          <Text key={day} style={styles.calendarDaysOfWeek}>{day}</Text>
        ))}
      </View>

      <FlatList
        data={DAYS_BOXES.slice(0, Math.ceil((numDaysInCurMonth + curStartingDayOfWeek) / 7) * 7)}
        renderItem={renderItem}
        scrollEnabled={false}
        numColumns={7}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default CalendarGrid;