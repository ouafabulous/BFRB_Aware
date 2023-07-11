import React, { useState, useEffect, useRef } from 'react'
import { Text, View, Button, StyleSheet } from 'react-native'
import Lottie from 'lottie-react-native'
import detectCrisis from '../detectCrisis'
import { useFonts } from 'expo-font'

const Home = () => {
  const [isCrisis, setIsCrisis] = useState(false)
  const [isCheckingForCrisises, setIsCheckingForCrisises] = useState(false)
  const intervalRef = useRef(null)
  const animationRef = useRef(null)

  useFonts({
    Cochin: require('../assets/fonts/Cochin.ttf'),
  })

  useEffect(() => {
    animationRef.current?.play()

    // Or set a specific startFrame and endFrame with:
    // animationRef.current?.play(30, 120)
  }, [])

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

  return (
    <View style={styles.container}>
      <Lottie source={require('../assets/animations/flower-moving.json')} autoPlay loop />
      <Text style={styles.titleText}>All good.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontSize: 20,
    fontFamily: 'Cochin',
    marginBottom: 64,
  },
})

export default Home
