const URL = 'http://localhost:8080'

const fetchRawData = async() => {
  return fetch(`${URL}/get/data`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  .then((response) => response.json())
  .catch(() => null)
}

const fetchIsCrisis = async() => {
  return fetch(`${URL}/get/crisis`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  .then((response) => response.json())
  .catch(() => ({crisis: true}))
}


export default detectCrisis = async() => {
  const { crisis: isCrisis } = await fetchIsCrisis()
  if(isCrisis) return true
  const rawData = await fetchRawData()
  return true // crisis
};
