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
const boxSize = width <= height ? (width * 0.3) : (height * 0.3)

const DATA = [
  { title: 'Journal' },
  { title: 'Practice' },
  { title: 'Learn More' },
  { title: 'Helpful Resources' }
]

const Item = ({title}) => (
  <TouchableOpacity style={{margin: (boxSize * 0.15)}}>
    <Text style={styles.infoItem}>{title}</Text>
  </TouchableOpacity>
)

const More = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Extra Information</Text>
      
      <FlatList style={styles.moreInfoSection}
        data={DATA}
        renderItem={({item}) => <Item title={item.title} />}
        scrollEnabled={false}
        numColumns={2}
        
        contentContainerStyle={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
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
    padding: 4,
    marginBottom: 16,
    textAlign: 'center',
  },
  moreInfoSection: {
    backgroundColor: 'azure',
    borderColor: 'black',
    borderTopWidth: 1
  },
  infoItem: {
    backgroundColor: 'lightblue',
    fontSize: (boxSize * 0.18),
    textAlign: 'center',
    borderColor: '#6c8790',
    borderWidth: 2,
    width: boxSize,
    height: boxSize,
    alignContent: 'center'
  }
})

export default More
