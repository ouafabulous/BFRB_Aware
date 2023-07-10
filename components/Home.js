import React, { useState } from 'react'
import detectCrisis from '../detectCrisis'
import { Text, View, Button, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'

const Home = () => {
  const [isCrisis, setIsCrisis] = useState(false)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })

  return (
    <View style={styles.container}>
      <Text>BFRB AWARE</Text>
      <Text>{isCrisis ? 'Crisis in progres' : 'No Crisis'}</Text>

      <Button title='send Notification' onPress={() => setInterval(() => setIsCrisis(detectCrisis()), 3000)} />
      <StatusBar style='auto' />
    </View>
  )
}

export default Home
