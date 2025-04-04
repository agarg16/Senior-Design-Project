import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import { styles } from '../../styles/CheckInStyles';

export const ActivityButton = ({ 
  activityName, 
  onPress 
}: { 
  activityName: string; 
  onPress: () => void 
}) => (
  <TouchableOpacity style={styles.defaultActivities} onPress={onPress}>
    <Text style={styles.textInActivityBox}>{activityName}</Text>
  </TouchableOpacity>
);