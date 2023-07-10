import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Text, View, Button } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Contacts from './components/Contacts'
import Guidelines from './components/Guidelines'
import Home from './components/Home'

const Tab = createBottomTabNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name='Home' component={Home} />
        <Tab.Screen name='Contacts' component={Contacts} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default App
