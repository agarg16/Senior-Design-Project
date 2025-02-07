import React from 'react'
import { Text, View, StyleSheet, SafeAreaView } from "react-native"

const Index = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.homeCalendar}>
        <Text style={{fontSize: 40, textAlign: 'center'}}>[Date]</Text>
        <Text style={{textAlign: 'center'}}>[Calendar]</Text>
      </View>

      <View style={styles.summary}>
        <Text style={styles.summaryDate}>[Summary Date]</Text>

        <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
      </View>

      <View style={styles.addDaySection}>
        <Text style={{textAlign: 'center'}}>[Add to/Edit Day Section]</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  homeCalendar: {
    padding: 4,
    flex: 7
  },
  summary: {
    backgroundColor: 'azure',
    borderColor: 'black',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    fontSize: '14',
    paddingTop: '4%',
    paddingLeft: '6%',
    paddingRight: '6%',
    flex: 5
  },
  addDaySection: {
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    flex: 1
  },
  summaryDate: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 16
  }
})

export default Index