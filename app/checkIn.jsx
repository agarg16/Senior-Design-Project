import React from 'react'
import { Text, View, StyleSheet, SafeAreaView } from "react-native"

const CheckIn = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.question}>[Example Question to Go Here]</Text>
      
      <View style={{flex: 5}}>
        <Text style={styles.activitiesTitle}>Activities</Text>

        <View style={{backgroundColor: 'azure', justifyContent: 'space-around', flex: 1}}>
          <Text style={styles.activities}>Activity 1</Text>
          <Text style={styles.activities}>Activity 2</Text>
          <Text style={styles.activities}>Activity 3</Text>
        </View>
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
    fontSize: 40,
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
  activities: {
    backgroundColor: '#c2e2ec',
    fontSize: 24,
    padding: 10,
    alignSelf: 'center',
    textAlign: 'center',
    borderRadius: 10,
    borderColor: '#82a2ac',
    borderWidth: 2,
    width: '50%'
  }
})

export default CheckIn
