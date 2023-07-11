import { View, Text, Modal, StyleSheet, Pressable } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const HistoryEditModal = ({ history, visible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={() => {
        onClose()
      }}
    >
      <View style={styles.header}>
        <Pressable onPress={onClose}>
          <Ionicons name="close" size={32} />
        </Pressable>
      </View>

      <View style={styles.list}>
        {history.map((dateString, index) => (
          <View style={styles.listElement} key={index}>
            <Text>{dateString}</Text>
          </View>
        ))}
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  header: {
    padding: 8,
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})

export default HistoryEditModal
