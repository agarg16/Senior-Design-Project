import React, { useEffect } from 'react'
import { Tabs } from "expo-router"
import { Ionicons } from '@expo/vector-icons'
import { setupDatabase } from '../database/database'

export default function TabLayout() {


  useEffect(() => {
      const initDB = async () => {
        await setupDatabase();
      };
      initDB();
  }, [])

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen 
        name="index" options={{ title: 'Home', 
        tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />
        }} 
      />
      <Tabs.Screen 
        name="checkIn" options={{ title: 'Daily Check-In', 
        tabBarIcon: ({ color, size }) => <Ionicons name="calendar" color={color} size={size} />
        }} 
      />
      <Tabs.Screen 
        name="more" 
        options={{ title: 'Learn More', 
        tabBarIcon: ({ color, size }) => <Ionicons name="information-circle" color={color} size={size} />
        }} 
      />
    </Tabs>
  );
}
