import * as React from 'react'
import { useState } from 'react'
import { Text, View, StyleSheet, Pressable } from 'react-native'
import HistoryChart from './HistoryChart'
import HistoryEditModal from './HistoryEditModal'
import { setCrisises, getCrisises } from '../lib/crisisStorage'

const MOCKED_HISTORY = [
  'Thu Jul 6 2023 15:23:30 GMT+0200',
  'Thu Jul 6 2023 15:23:30 GMT+0200',
  'Sat Jul 8 2023 15:23:30 GMT+0200',
]

const History = () => {
  const [history, setHistory] = useState(MOCKED_HISTORY)
  const [editModalVisible, setEditModalVisible] = useState(false)

  const addCrisis = async () => {
    let crisises = await getCrisises()
    if (crisises == null) crisises = []

    const date = new Date()
    crisises.push(date.toDateString() + ' ' + date.toTimeString())
    setCrisises(crisises)
    setHistory(crisises)
  }

  if (history == null) {
    getCrisises().then((crisises) => setHistory(crisises))
    return <Text>Loading...</Text>
  }

  return (
    <View style={styles.container}>
      <HistoryEditModal history={history} visible={editModalVisible} onClose={() => setEditModalVisible(false)} />

      <HistoryChart history={history} />
      <View style={styles.linkContainer}>
        <Pressable onPress={addCrisis}>
          <Text style={styles.link}>Add Crisis</Text>
        </Pressable>
        <Pressable onPress={() => setEditModalVisible(true)}>
          <Text style={styles.link}>Show History</Text>
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
    color: '#ff6347',
    fontSize: 20,
    fontFamily: 'Cochin',
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
