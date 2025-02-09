import React from 'react'
import { Tabs } from "expo-router"

export default function TabLayout() {
  return (
      <Tabs screenOptions={{headerShown: false}}>
        <Tabs.Screen name="index" options={{ title: 'Home' }} />
        <Tabs.Screen name="checkIn" options={{ title: 'Daily Check-In' }} />
        <Tabs.Screen name="more" options={{ title: 'Learn More' }} />
      </Tabs>
  )
}