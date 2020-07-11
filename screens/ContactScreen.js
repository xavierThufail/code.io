import React from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from 'react-native';
import Constant from "expo-constants";

export default function ContactScreen () {
  return (
    <View style={styles.container}>
      <View style={styles.StatusBar} />

      <Text>Open up App.js to on your n!</Text>

      <StatusBar style="auto" backgroundColor="#1b83e3"/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  StatusBar: {
    height: Constant.statusBarHeight
  }
});