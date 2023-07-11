# BFRB Aware

Mobile app as part of TOM France Hackathon 2023 (Team 6)

# Requirements

In order to run an Androïd, the app requires JDK 11 to be ran.

# Installation

- `npm install`

# Running the app

- `npm run android`
- `npm run ios`
- `npm run web`

# State of the app

## React Native App

This repository contains a working React Native app. It displays the status of the user `In crisis` / `Not in crisis`
as well as a list of contact, guidelines and history of crisises.

The application fetches a json wich contains:
- `heartrate`: contains the heartrate value with its associated timestamp
- `position`: contains a `[x,y,z]` vector which contains the movement values with its associated timestamp.

Currently, we are using the heartrate to flag a crisis if there is a difference of more than 10 between two values.

## Technical architecture
![alt text](./project-overview.png)

# Work to be done

The app currently does not use the `position` values. It could be done to identify the movement of the hand and detect
the crisis more precisely.

# Algorithms used in the app

## Parsing

Raw data extracted from the smart watch are in `./rasp-api/input_data`. The parsing algorithm to extract **x, y, z** and the **heart rate** with their **timestamp** is in `./rasp-api/algorithm/parsing.py`. It extracts data into a JSON file in `./rasp-api/algorithm/json_outputs`. You can all the parsing algorithm like this :

```zsh
python3 parsing.py <path_to_input_file>
```

## Crisis detection

In order to detect a crisis, we are monitoring heart rate. Any increase of 10 bpm is considered a crisis and is detected through `detectHeartRateIncrease`, any decrease of heart rate back to base level is considered the end of a crisis and is detected through `detectHeartRateDecrease`. Both algorithm are in `./detectCrisis.js`.
