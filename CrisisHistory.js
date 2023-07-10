import { useState } from "react";
import { Text, Button, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CrisisList = ({ crisises }) => {
  if (!crisises) return <Text>Loading...</Text>;

  return (
    <View>
      {crisises.map((crisis, index) => (
        <Text key={index}>{crisis}</Text>
      ))}
    </View>
  );
};

const storeCrisisesValue = async (value) => {
  try {
    await AsyncStorage.setItem("CRISISES", JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
};

const CrisisHistory = () => {
  const [history, setHistory] = useState(null);
  // console.log(history);

  const addCrisis = async () => {
    let crisises = await getCrisises();
    if (crisises == null) crisises = [];

    const date = new Date();
    crisises.push(date.toDateString() + " " + date.toTimeString());
    storeCrisisesValue(crisises);
    setHistory(crisises);
  };

  const clearCrisises = async () => {
    storeCrisisesValue([]);
    setHistory([]);
  };

  getCrisises = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("CRISISES");
      const value = jsonValue == null ? null : JSON.parse(jsonValue);
      if (value !== null) {
        return value;
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (history == null) getCrisises().then((crisises) => setHistory(crisises));

  return (
    <>
      <Text>Crisis History</Text>
      <Button title="Add Crisis" onPress={addCrisis} />
      <Button title="Clear history" onPress={clearCrisises} />

      <CrisisList crisises={history} />
    </>
  );
};

export default CrisisHistory;
