import React from 'react'
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Linking, Platform } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const MOCKED_CONTACTS = [
  {
    id: 1,
    firstName: 'Arvin',
    lastName: 'Latch',
    email: 'arvinl@aol.fr',
    phoneNumber: '06 84 12 23 25',
    profilePicture: 'https://static.generated.photos/vue-static/face-generator/landing/wall/20.jpg',
  },
  {
    id: 2,
    firstName: 'Fédérica',
    lastName: 'Madeira',
    email: 'fede.madeira@gmail.com',
    phoneNumber: '06 25 07 77 57',
    profilePicture:
      'https://i.seadn.io/gae/_fy_SHzXyxgbeFfFyqZ8JpQ48a_w4Wl50b8FSPjNW7wV8FzYp_Ag3S6DdcZfFlSeg78_QfgVcZ3vSL4_nJbQEthOfQWPHjYv0gOpyA?auto=format&dpr=1&w=1000',
  },
]

const ContactListItem = ({ contact }) => {
  const handlePhoneCall = () => {
    let phoneUrl = ''

    if (Platform.OS === 'android') {
      phoneUrl = `telprompt:${contact.phoneNumber}`
    } else if (Platform.OS === 'ios') {
      phoneUrl = `tel:${contact.phoneNumber}`
    } else {
      console.log('Phone call not supported on this platform')
      return
    }

    Linking.canOpenURL(phoneUrl)
      .then((supported) => {
        if (!supported) {
          console.log('Phone call not supported')
        } else {
          return Linking.openURL(phoneUrl)
        }
      })
      .catch((error) => console.log('An error occurred', error))
  }

  return (
    <View style={styles.contactsContainer}>
      <Image source={{ uri: contact.profilePicture }} style={styles.profilePicture} />
      <View style={styles.contactInfo}>
        <Text style={styles.name}>{`${contact.firstName} ${contact.lastName}`}</Text>
        <Text>{contact.email}</Text>
        <Text>{contact.phoneNumber}</Text>
      </View>
      <TouchableOpacity onPress={handlePhoneCall} style={styles.iconContainer}>
        <Ionicons name="call" size={24} color="tomato" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {}} style={styles.iconContainer}>
        <Ionicons name="mail" size={24} color="tomato" />
      </TouchableOpacity>
    </View>
  )
}

const ContactList = () => {
  return (
    <View style={styles.page}>
      <FlatList
        data={MOCKED_CONTACTS}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ContactListItem contact={item} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contactsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  contactInfo: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontFamily: 'Cochin',
    fontSize: 20,
    marginBottom: 8,
  },
  iconContainer: {
    marginLeft: 10,
  },
})

export default ContactList
