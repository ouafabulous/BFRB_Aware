import { View, Text, Modal, StyleSheet, Pressable, FlatList } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const HistoryListItem = ({ crisisDate }) => {
  return (
    <View style={styles.crisisContainer}>
      <Ionicons name="calendar-outline" size={24} color="tomato" />

      <View style={{ flex: 1, paddingLeft: 16 }}>
        <Text style={styles.text}>
          There has been a crisis on this day : {`${new Date(crisisDate).toLocaleString('en-GB')}`}
        </Text>
      </View>
    </View>
  )
}

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

      <View>
        <FlatList data={history} renderItem={({ item }) => <HistoryListItem crisisDate={item} />} />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 24,
    marginRight: 24,
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
  list: { flex: 1 },
  text: {
    fontWeight: 'bold',
    fontFamily: 'Cochin',
    fontSize: 20,
    marginBottom: 8,
  },
  crisisContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
  },
})

export default HistoryEditModal
