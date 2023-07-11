import { View, Text, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const GuidelinesCard = ({ iconName, text }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          width: '100%',
          alignItems: 'center',
        }}
      >
        <Ionicons name={iconName} size={40} />
      </View>
      <View
        style={{
          flex: 3,
        }}
      >
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#fff',
  },
  text: { fontSize: 20, fontFamily: 'Cochin' },
})

export default GuidelinesCard
