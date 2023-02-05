import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import History from './History';
import Calculator from './Calculator';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={'Calculator'} component={Calculator} />
        <Stack.Screen name={'History'} component={History} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
    
  },
  input: {
    width: 150, 
    borderColor: "grey", 
    borderWidth: 1,
    marginTop: 10,
  },
  button: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  }
});
