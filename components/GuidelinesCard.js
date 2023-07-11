import { View, Text, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const GuidelinesCard = ({iconName, text}) => {
    return (
        <View style={styles.container}>
            <View style={{
                flex:1,
                alignItems: 'center'
            }
            }>
                <Ionicons name={iconName} size={25}/>
            </View>
            <View style={{
                flex:3,
            }
            }>
                <Text>{text}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      fontSize: 30,
      fontFamily: 'Cochin',
      height: '100%',
      backgroundColor: '#fff'
    }
  })

export default GuidelinesCard