import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import detectCrisis from "./detectCrisis";

export default function App() {
  const [isCrisis, setIsCrisis] = useState(false);

  return (
    <View style={styles.container}>
      <Text>BFRB AWARE</Text>
      <Text>{isCrisis ? "Crisis in progres" : "No Crisis"}</Text>

      <Button
        title="send Notification"
        onPress={() => setInterval(() => setIsCrisis(detectCrisis()), 3000)}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
