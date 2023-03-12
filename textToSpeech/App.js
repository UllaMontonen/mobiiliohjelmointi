import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import * as Speech from 'expo-speech';

export default function App() {

  const [text, setText] = useState('');

  const speak = () => {
    const thingToSay = text;
    Speech.speak(thingToSay);
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} onChangeText={text => setText(text)} value={text} />
      <Button title="PRESS TO HEAR TEXT" onPress={speak} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 150, 
    borderColor: "grey", 
    borderWidth: 1,
    marginTop: 10,
  },
});
