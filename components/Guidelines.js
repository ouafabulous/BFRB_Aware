import * as React from 'react'
import { Text, View } from 'react-native'
import GuidelinesCard from './GuidelinesCard'

const guidelines = [
  {
    iconName: 'ios-body-outline',
    text: 'Focus on your breath. Sometimes taking a few deep breath is enough to relax !',
  },
  {
    iconName: 'ios-chatbubble-ellipses-outline',
    text: 'Call a friend or a member of your family. Tell them how you feel.',
  },
  {
    iconName: 'ios-heart-outline',
    text: 'Do something you love ! Keep your mind free and light.',
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
