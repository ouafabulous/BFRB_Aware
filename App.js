import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Contacts from './components/Contacts'
import Guidelines from './components/Guidelines'
import Home from './components/Home'

const Tab = createBottomTabNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName

            if (route.name === 'Home') {
              iconName = focused ? 'ios-play-circle' : 'ios-play-circle-outline'
            } else if (route.name === 'Contacts') {
              iconName = focused ? 'ios-list' : 'ios-list-outline'
            } else if (route.name === 'Guidelines') {
              iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline'
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name='Guidelines' component={Guidelines} />
        <Tab.Screen name='Home' component={Home} />
        <Tab.Screen name='Contacts' component={Contacts} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default App
