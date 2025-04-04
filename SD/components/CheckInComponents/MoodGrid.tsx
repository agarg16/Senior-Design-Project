import React from 'react';
import { View, TouchableOpacity, Image, Text, ImageSourcePropType } from 'react-native';

interface MoodImages {
  [key: number]: ImageSourcePropType;
}

interface MoodGridProps {
  selectedActivityText: string;
  setSelectedActivityText: (text: string) => void;
}

export const MoodGrid: React.FC<MoodGridProps> = ({ 
  selectedActivityText, 
  setSelectedActivityText 
}) => {
  // Define type-safe image references
  const images: MoodImages = {
    1: require('../../assets/images/1.png'),
    2: require('../../assets/images/2.png'),
    3: require('../../assets/images/3.png'),
    4: require('../../assets/images/4.png'),
    5: require('../../assets/images/5.png'),
    6: require('../../assets/images/6.png'),
    7: require('../../assets/images/7.png'),
  };

  // Convert selected text to number for type safety
  const selectedMood = parseInt(selectedActivityText, 10);

  return (
    <View style={{ alignItems: 'center' }}>
      <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
        {[1, 2, 3, 4, 5, 6, 7].map((num) => (
          <TouchableOpacity
            key={num}
            onPress={() => setSelectedActivityText(num.toString())}
          >
            <Image
              source={images[num]}
              style={{ width: 45, height: 45, margin: 4 }}
            />
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ 
        backgroundColor: 'azure', 
        marginTop: 16, 
        padding: 4, 
        alignItems: 'center', 
        borderWidth: 1, 
        borderRadius: 10, 
        width: '75%' 
      }}>
        <Text style={{ fontSize: 20 }}>Current Selected Mood:</Text>
        {selectedActivityText === "" || selectedActivityText === "0" ? (
          <Text style={{ fontSize: 16, margin: 17 }}>None</Text>
        ) : (
          <Image
            source={images[selectedMood]}
            style={{ width: 45, height: 45, margin: 4 }}
          />
        )}
      </View>
    </View>
  );
};