import * as React from 'react'
import { useState } from 'react'
import { Text, Button, View, StyleSheet, Pressable } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import HistoryChart from './HistoryChart'
import { setCrisises, getCrisises } from '../lib/crisisStorage'

const History = () => {
  const [history, setHistory] = useState(null)
  const addCrisis = async () => {
    let crisises = await getCrisises()
    if (crisises == null) crisises = []

    const date = new Date()
    crisises.push(date.toDateString() + ' ' + date.toTimeString())
    setCrisises(crisises)
    setHistory(crisises)
  }

  const clearCrisises = async () => {
    setCrisises([])
    setHistory([])
  }

  if (history == null) {
    getCrisises().then((crisises) => setHistory(crisises))
    return <Text>Loading...</Text>
  }

  return (
    <View style={styles.container}>
      <HistoryChart history={history} />
      <View style={styles.linkContainer}>
        <Pressable onPress={addCrisis}>
          <Text style={styles.link}>Add Crisis</Text>
        </Pressable>
        <Pressable onPress={clearCrisises}>
          <Text style={styles.link}>Edit History</Text>
        </Pressable>
      </View>
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
  link: {
    color: '#2e7eff',
  },
  linkContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 100,
    padding: 20,
  },
})

export default History
