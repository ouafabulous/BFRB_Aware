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

const detectHeartRateIncrease = (data) => {
	let restingHR = 0;
	let restingHrIndex = 0;
	// looking for resting HR that should be between 60 and 100 bpm
	for (let i = 0; i < data.length; i++) {
		if (data[i].hr > 60 && data[i].hr < 100) {
			restingHR = data[i].hr;
			restingHrIndex = i;
			break;
		}
	}

	// looking for an increase of at least 10 bpm from resting HR
  for (let i = restingHrIndex; i < data.length; i++) {
    const currentHR = data[i].hr;

    if (currentHR > restingHR + 10) {
			return {bool: true, restingHR: restingHR, crisisInfo: data[i], crisisIndex: i};
    }
  }

  return {bool: false, restingHR: 0, crisisInfo: { timestamp: 0, hr: 0}, crisisIndex: 0};
}


const detectHeartRateDecrease = (crisis, data) => {
	if (!crisis.bool) return {bool: false, endOfCrisisInfo: { timestamp: 0, hr: 0}}
	// Looking for a decrease of bpm back to resting HR from the moment of the crisis
	for (let i = crisis.crisisIndex + 1; i < data.length; i++) {
		const currentHR = data[i].hr;
		if (currentHR < 60 || currentHR > 180)
			continue

		if (currentHR <= crisis.restingHR) {
			return {bool: true, endOfCrisisInfo: data[i]}
		}
	}

	return {bool: false, endOfCrisisInfo: { timestamp: 0, hr: 0}};
}


export default detectCrisis = async() => {
  /*
  For debug purpose
  const { crisis: isCrisis } = await fetchIsCrisis()
  if (isCrisis) return true
  */
  const { hrs } = await fetchRawData()
  const crisis = detectHeartRateIncrease(hrs)
  //if(crisis.bool) return true // for demo purpose
  if (crisis.bool) {
    const crisisEnd = detectHeartRateDecrease(crisis, hrs)
    if (crisisEnd.bool === false) return true
    return false
  }
  return false
};
