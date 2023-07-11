import * as React from 'react'
import { Text, View } from 'react-native'
import GuidelinesCard from './GuidelinesCard'

const guidelines = [
  {
    iconName: 'ios-body-outline',
    text: 'Take 10 deep breath',
  },
  {
    iconName: 'ios-chatbubble-ellipses-outline',
    text: 'Talk to a close person',
  },
  {
    iconName: 'ios-heart-outline',
    text: 'Do something you love',
  },
]

const Guidelines = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {guidelines.map(({ iconName, text }) => (
        <GuidelinesCard iconName={iconName} text={text} />
      ))}
    </View>
  )
}

export default Guidelines
