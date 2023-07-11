import * as React from 'react'
import { useState } from 'react'
import { Text, Button, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import HistoryChart from './HistoryChart'

const countPerDate = (crisisesDateArray) => {
  const values = [
    new Date('2023-07-11T08:15:33.968Z'),
    new Date('2023-07-11T08:15:58.610Z'),
    new Date('2023-07-10T08:16:24.151Z'),
    new Date('2023-07-08T08:16:35.877Z'),
    new Date('2023-07-08T08:16:38.854Z'),
    new Date('2023-07-08T08:16:39.833'),
  ]

  const initialValue = {}
  const grouppedValues = crisisesDateArray.reduce((acc, value) => {
    if (acc[value.toDateString()] != undefined) acc[value.toDateString()] += 1
    else {
      acc[value.toDateString()] = 0
    }
    return acc
  }, initialValue)

  const today = new Date()
  const countArray = []

  for (let i = 6; i >= 0; i--) {
    const priorDateString = new Date(new Date().setDate(today.getDate() - i)).toDateString()
    countArray.push({ date: priorDateString, count: grouppedValues[priorDateString] || 0 })
  }

  return countArray
}

const CrisisList = ({ crisises }) => {
  if (!crisises) return <Text>Loading...</Text>

  return (
    <View>
      {crisises.map((crisis, index) => (
        <Text key={index}>{crisis}</Text>
      ))}
    </View>
  )
}

const storeCrisisesValue = async (value) => {
  try {
    await AsyncStorage.setItem('CRISISES', JSON.stringify(value))
  } catch (error) {
    console.error(error)
  }
}

const History = () => {
  const [history, setHistory] = useState(null)
  const addCrisis = async () => {
    let crisises = await getCrisises()
    if (crisises == null) crisises = []

    const date = new Date()
    crisises.push(date.toDateString() + ' ' + date.toTimeString())
    storeCrisisesValue(crisises)
    setHistory(crisises)
  }

  const clearCrisises = async () => {
    storeCrisisesValue([])
    setHistory([])
  }

  getCrisises = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('CRISISES')
      const value = jsonValue == null ? null : JSON.parse(jsonValue)
      if (value !== null) {
        return value
      }
    } catch (error) {
      console.error(error)
    }
  }

  if (history == null) {
    getCrisises().then((crisises) => setHistory(crisises))
    return <Text>Loading...</Text>
  }

  const countArray = countPerDate(history.map((dateString) => new Date(dateString)))

  return (
    <View>
      <HistoryChart labels={countArray.map((x) => x['date'])} data={countArray.map((x) => x['count'])} />
      <Text>Crisis History</Text>
      <Button title="Add Crisis" onPress={addCrisis} />
      <Button title="Clear history" onPress={clearCrisises} />

      <CrisisList crisises={history} />
    </View>
  )
}

export default History
