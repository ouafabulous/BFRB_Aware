import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>BFRB AWARE</Text>

      <Button title="send Notification" />
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
