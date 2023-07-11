import * as React from 'react'
import { useState } from 'react'
import { Text, Button, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import HistoryChart from './HistoryChart'
import { setCrisises, getCrisises } from '../lib/crisisStorage'

// const CrisisList = ({ crisises }) => {
//   if (!crisises) return <Text>Loading...</Text>

//   return (
//     <View>
//       {crisises.map((crisis, index) => (
//         <Text key={index}>{crisis}</Text>
//       ))}
//     </View>
//   )
// }

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
    <View>
      <HistoryChart history={history} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          height: 100,
          padding: 20,
        }}
      >
        <Button title="Add Crisis" onPress={addCrisis} />
        <Button title="Edit History" onPress={clearCrisises} />
      </View>
    </View>
  )
}

export default History
