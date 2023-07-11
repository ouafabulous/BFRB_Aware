import AsyncStorage from '@react-native-async-storage/async-storage'

export const addContact = async (value) => {
  try {
    await AsyncStorage.setItem('CONTACTS', JSON.stringify(value))
  } catch (error) {
    console.error(error)
  }
}

export const getContacts = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('CONTACTS')
    const value = jsonValue == null ? null : JSON.parse(jsonValue)
    if (value !== null) {
      return value
    }
  } catch (error) {
    console.error(error)
  }
}
