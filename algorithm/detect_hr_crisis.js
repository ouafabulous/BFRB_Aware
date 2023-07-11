function detectHeartRateIncrease(data) {
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
  let increaseDetected = false;
  for (let i = restingHrIndex; i < data.length; i++) {
    const currentHR = data[i].hr;

    if (currentHR >= restingHR + 10) {
			console.log(`Heart rate increase detected at ${data[i].hr} bpm with resting heart rate ${restingHR}`);
      increaseDetected = true;
      break;
    }
  }

  return increaseDetected;
}

function getData(filePath) {
	// Example usage
	const fs = require('fs');
	
	// Read data from the file
	const rawData = fs.readFileSync(filePath);
	const data = JSON.parse(rawData);
	
	// Extract heart rate data
	const hrsData = data.hrs;
	
	// Format heart rate data as a JavaScript array of objects
	const formattedData = hrsData.map(hrData => ({
		hr: hrData.hr,
		timestamp: hrData.timestamp
	}));

	return formattedData;
}

const increaseDetected = detectHeartRateIncrease(getData('hrs_positions.log'));
console.log(increaseDetected);  // Output: true or false
