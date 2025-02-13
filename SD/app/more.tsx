import React from 'react'
import { Text, StyleSheet, SafeAreaView, FlatList, Dimensions, Platform, TouchableOpacity } from "react-native"

var width = 0
var height = 0

if(Platform.OS === 'web') {
  width  = Dimensions.get('window').width
  height = Dimensions.get('window').height
}
else {
  width  = Dimensions.get('screen').width
  height = Dimensions.get('screen').height
}
const boxSize = width <= height ? (width * 0.32) : (height * 0.32)

const DATA = [
  { title: 'Journal' },
  { title: 'Practice' },
  { title: 'Learn More' },
  { title: 'Helpful Resources' }
]

type ItemProps = {title: string}

const Item = ({title}: ItemProps) => (
  <TouchableOpacity style={styles.infoItemBox}>
    <Text style={styles.infoItemText}>{title}</Text>
  </TouchableOpacity>
)

const More = () => {
  return (
    
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Extra Information</Text>
      
      {/* Displays the boxes of info */}
      <FlatList
        data={DATA}
        renderItem={({item}) => <Item title={item.title} />}
        scrollEnabled={false}
        numColumns={2}
        
        contentContainerStyle={styles.moreInfoSection}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  title: {
    fontSize: 44,
    marginTop: 12,
    marginBottom: 16,
    textAlign: 'center',
  },
  moreInfoSection: {
    backgroundColor: 'azure',
    borderColor: 'black',
    borderTopWidth: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  infoItemBox: {
    backgroundColor: 'lightblue',
    borderColor: '#6c8790',
    borderWidth: 2,
    borderRadius: 20,
    width: boxSize,
    height: boxSize,
    margin: (boxSize * 0.13),
    justifyContent: 'center'
  },
  infoItemText: {
    fontSize: (boxSize * 0.18),
    textAlign: 'center'
  }
})

export default More