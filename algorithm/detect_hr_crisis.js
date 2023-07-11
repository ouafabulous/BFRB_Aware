function getDataFromLogFile(filePath) {
	// Example usage
	const fs = require('fs');
	
	// Read data from the file
	const rawData = fs.readFileSync(filePath);
	const data = JSON.parse(rawData);
	
	// Extract heart rate data
	const hrsData = data.hrs;
	
	// Format heart rate data as a JavaScript array of objects
	const extractedData = hrsData.map(hrData => ({
		hr: hrData.hr,
		timestamp: hrData.timestamp
	}));
	
	return extractedData;
}


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
  for (let i = restingHrIndex; i < data.length; i++) {
    const currentHR = data[i].hr;

    if (currentHR > restingHR + 10) {
			return {'bool': true, 'restingHR': restingHR, 'crisisInfo': data[i], 'crisisIndex': i};
    }
  }

  return {'bool': false, 'restingHR': 0, 'crisisInfo': { "timestamp": 0, "hr": 0}, 'crisisIndex': 0};
}


function detectHeartRateDecrease(crisis, data) {
	if (!crisis.bool)
		return {'bool': false, 'endOfCrisisInfo': { "timestamp": 0, "hr": 0}};
		
		// Looking for a decrease of bpm back to resting HR from the moment of the crisis
		for (let i = crisis.crisisIndex + 1; i < data.length; i++) {
			const currentHR = data[i].hr;
			if (currentHR < 60 || currentHR > 180)
				continue;
			
			if (currentHR <= crisis.restingHR) {
				return {'bool': true, 'endOfCrisisInfo': data[i]};
			}
		}
		
	return {'bool': false, 'endOfCrisisInfo': { "timestamp": 0, "hr": 0}};
}

let extractedData = getDataFromLogFile('hrs_positions_crisis.log')
const crisis = detectHeartRateIncrease(extractedData);
if (crisis.bool) {
	console.log("A crisis was detected at", crisis.crisisInfo.hr, "bpm from a resting heart rate ", crisis.restingHR);
	console.log("Timestamp of crisis :", crisis.crisisInfo.timestamp)
	const crisisEnd = detectHeartRateDecrease(crisis, extractedData);
	if (crisisEnd.bool === false)
		console.log("The crisis did not end");
	else
		console.log("The crisis ended at", crisisEnd.endOfCrisisInfo.hr, "bpm at timestamp", crisisEnd.endOfCrisisInfo.timestamp);
}


