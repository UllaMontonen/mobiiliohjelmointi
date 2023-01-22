import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, input } from 'react-native';

export default function App() {

const [number1, setNumber1] = useState(0);
const [number2, setNumber2] = useState(0);

function add () {
  const total = number1 + number2;
  Alert.alert('Result: ' + total)
}
function minus () {
  const total = number1 - number2;
  Alert.alert('Result: ' + total)
}


  return (
    <View style={styles.container}>
      <Text>Calculate two numbers</Text>
      <TextInput
        style={styles.input}
        onChangeText={number1 => setNumber1(Number.parseInt(number1))}
        value={number1}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        onChangeText={number2 => setNumber2(Number.parseInt(number2))}
        value={number2}
        keyboardType="numeric"
      />
      <View style={styles.button}>
      <Button title="+" onPress={add}/>
      <Button title="-" onPress={minus}/>
    </View>
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
    borderWidth: 1
  },
  button: {
    flexDirection: 'row',
  }
});
