import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import { styles } from '../../styles/CheckInStyles';

export const ActivityButton = ({ 
  activityName, 
  getActivityValue 
}: { 
  activityName: string; 
  getActivityValue: () => void 
}) => {
  return (
    <TouchableOpacity style={styles.defaultActivities} onPress={getActivityValue}>
      <Text style={styles.textInActivityBox}>{activityName}</Text>
    </TouchableOpacity>
  )
};
