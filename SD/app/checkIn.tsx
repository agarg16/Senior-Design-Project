import React from 'react'
import { Text, View, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from "react-native"

const ACTIVITIES = [
  {title: '[Activity 1]'},
  {title: '[Activity 2]'},
  {title: '[Activity 3]'}
]

type ActivityProps = {title: string}

const Activities = ({title}: ActivityProps) => (
  <TouchableOpacity style={styles.activities}>
    <Text style={{fontSize: 24, textAlign: 'center'}}>{title}</Text>
  </TouchableOpacity>
)

const CheckIn = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.question}>[Example Question to Go Here]</Text>
      
      <View style={{flex: 5}}>
        <Text style={styles.activitiesTitle}>Activities</Text>

        {/* Displays the various activities to choose from */}
        <FlatList 
          data={ACTIVITIES}
          renderItem={({item}) => <Activities title={item.title} />}
          scrollEnabled= {false}

          contentContainerStyle={styles.activitiesBoxes}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  question: {
    fontSize: 36,
    paddingLeft: '2%',
    paddingRight: '2%',
    paddingBottom: 12,
    textAlign: 'center'
  },
  activitiesTitle: {
    backgroundColor: 'lightblue',
    borderColor: 'black',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    textAlign: 'center',
    fontSize: 36,
    padding: 16
  },
  activitiesBoxes: {
    backgroundColor: 'azure',
    paddingTop: '5%',
    paddingBottom: '5%',
    justifyContent: 'space-around',
    flex: 1
  },
  activities: {
    backgroundColor: '#c2e2ec',
    padding: 10,
    alignSelf: 'center',
    borderRadius: 10,
    borderColor: '#82a2ac',
    borderWidth: 2,
    width: '50%',
    height: 80,
    justifyContent: 'center'
  }
})

export default CheckIn