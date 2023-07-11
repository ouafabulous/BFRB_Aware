import { View, Text, Modal, StyleSheet, Pressable } from 'react-native'

const HistoryEditModal = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.')
        onClose()
      }}
    >
      <Pressable>
        <Text>X</Text>
      </Pressable>
      {/* <View style={styles.centeredView}> */}
      {/* <View style={styles.modalView}> */}
      {/* <Text style={styles.modalText}>Hello World!</Text>
        <Pressable style={[styles.button, styles.buttonClose]} onPress={onClose}>
          <Text style={styles.textStyle}>Hide Modal</Text>
        </Pressable>
      </View> */}
      {/* </View> */}
    </Modal>
  )
}

const styles = StyleSheet.create({
  // // centeredView: {
  // //   flex: 1,
  // //   justifyContent: 'center',
  // //   alignItems: 'center',
  // //   marginTop: 22,
  // // },
  // // modalView: {
  // //   margin: 20,
  // //   backgroundColor: 'white',
  // //   borderRadius: 20,
  // //   padding: 35,
  // //   alignItems: 'center',
  // //   shadowColor: '#000',
  // //   shadowOffset: {
  // //     width: 0,
  // //     height: 2,
  // //   },
  // //   shadowOpacity: 0.25,
  // //   shadowRadius: 4,
  // //   elevation: 5,
  // // },
  // button: {
  //   borderRadius: 20,
  //   padding: 10,
  //   elevation: 2,
  // },
  // buttonOpen: {
  //   backgroundColor: '#F194FF',
  // },
  // buttonClose: {
  //   backgroundColor: '#2196F3',
  // },
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
