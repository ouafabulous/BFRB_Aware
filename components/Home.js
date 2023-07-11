import React, { useState, useEffect, useRef } from 'react'
import { Text, View, Button, StyleSheet, Animated } from 'react-native'
import Lottie from 'lottie-react-native'
import detectCrisis from '../detectCrisis'
import { useFonts } from 'expo-font'

const Home = () => {
  const [isCrisis, setIsCrisis] = useState(false)
  const intervalRef = useRef(null)
  const animationRef = useRef(null)

  // Fonts
  useFonts({
    Cochin: require('../assets/fonts/Cochin.ttf'),
  })

  // Lottie
  useEffect(() => animationRef.current?.play(), [])

  const fadeCrisisMode = useRef(new Animated.Value(0)).current
  const fadeRelaxMode = useRef(new Animated.Value(1)).current

  const fadeIn = (ref) => {
    Animated.timing(ref, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start()
  }

  const fadeOut = (ref) => {
    Animated.timing(ref, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start()
  }

  // TBD : detect crisis permanently
  // const toggleCrisisCheck = () => {
  //   if (intervalRef.current == null) {
  //     intervalRef.current = setInterval(() => setIsCrisis(detectCrisis()), 1000)
  //   } else {
  //     clearInterval(intervalRef.current)
  //     intervalRef.current = null
  //   }
  // }

  const fade = (isCrisis) => {
    if (isCrisis) {
      // Recover

      fadeOut(fadeCrisisMode)
      fadeIn(fadeRelaxMode)
    } else {
      // Jump to crisis

      fadeOut(fadeRelaxMode)
      fadeIn(fadeCrisisMode)
    }
  }

  const toggleCrisis = () => {
    setIsCrisis((prevState) => !prevState)
  }

  return (
    <View style={styles.container}>
      {isCrisis ? (
        <Animated.View style={{ flex: 1, width: '100%', alignItems: 'center', opacity: fadeCrisisMode }}>
          <View style={{ flex: 2, height: '50%', width: '50%' }}>
            <Lottie source={require('../assets/animations/danger.json')} autoPlay loop />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.dangerTitle}>You might be experiencing a crisis.</Text>
            <Text style={styles.dangerTitle}> It's alright !</Text>
          </View>
        </Animated.View>
      ) : (
        <Animated.View style={{ flex: 1, width: '100%', alignItems: 'center', opacity: fadeRelaxMode }}>
          <View style={{ flex: 4, width: '100%' }}>
            <Lottie source={require('../assets/animations/flower-moving.json')} autoPlay loop />
          </View>
          <View style={{ flex: 1, textAlign: 'center' }}>
            <Text style={styles.titleText}>All good.</Text>
          </View>
        </Animated.View>
      )}
      <Button
        title={isCrisis ? 'Deactivate crisis' : 'Activate crisis'}
        onPress={async () => {
          fade(isCrisis)
          setTimeout(toggleCrisis, 1000)
        }}
      ></Button>
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
  dangerTitle: {
    fontFamily: 'Cochin',
    textAlign: 'center',
    fontSize: 20,
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
