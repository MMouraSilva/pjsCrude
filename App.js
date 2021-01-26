import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class App extends Component() {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    );
  }
}
