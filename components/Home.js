import * as React from 'react'
import { Text, View, Button, StyleSheet } from 'react-native'
import notifee from '@notifee/react-native'
import { AndroidColor } from '@notifee/react-native'

const Home = () => {
  const onDisplayNotification = async () => {
    // Request permissions (required for iOS)
    await notifee.requestPermission()

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    })

    // Display a notification
    await notifee.displayNotification({
      title: 'Notification Title',
      body: 'Main body content of the notification',
      android: {
        channelId,
        smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    })
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
      <Button title='send Notification' onPress={onDisplayNotification} />
    </View>
  )
}

export default Home
