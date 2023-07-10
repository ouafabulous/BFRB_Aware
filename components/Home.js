import React, { useState, useRef } from 'react'
import { Text, View, Button, StyleSheet } from 'react-native'
import detectCrisis from '../detectCrisis'

const Home = () => {
  const [isCrisis, setIsCrisis] = useState(false)
  const [isCheckingForCrisises, setIsCheckingForCrisises] = useState(false)
  const intervalRef = useRef(null)

  const toggleCrisisCheck = () => {
    if (intervalRef.current == null) {
      intervalRef.current = setInterval(() => setIsCrisis(detectCrisis()), 1000)
      setIsCheckingForCrisises(true)
    } else {
      clearInterval(intervalRef.current)
      intervalRef.current = null
      setIsCheckingForCrisises(false)
    }
  }

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
      <Text>{isCrisis ? 'Crisis in progress' : 'No Crisis'}</Text>

      <Button
        title={isCheckingForCrisises ? 'Checking For a crisis...' : 'Press to check for a crisis'}
        onPress={toggleCrisisCheck}
      />
    </View>
  )
}

export default Home
