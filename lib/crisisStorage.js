import AsyncStorage from '@react-native-async-storage/async-storage'

export const setCrisises = async (value) => {
  try {
    await AsyncStorage.setItem('CRISISES', JSON.stringify(value))
  } catch (error) {
    console.error(error)
  }
}

export const getCrisises = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('CRISISES')
    const value = jsonValue == null ? null : JSON.parse(jsonValue)
    if (value !== null) {
      return value
    }
  } catch (error) {
    console.error(error)
  }
}
