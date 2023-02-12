import React, { useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function Calculator( { navigation }) {

  const [result, setResult] = useState('');
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  
  const [data, setData] = useState([]);
  


  const add = () => {
    const total = number1 + number2;
    setResult(total);
    const text = number1 + ' + ' + number2 + ' = ' + total;
    setData([text, ...data]);
    setNumber1('');
    setNumber2('');
    //initialFocus.current.fucus();
  }
  
  const minus = () => {
    const total = number1 - number2;
    setResult(total);
    const text = number1 + ' - ' + number2 + ' = ' + total;
    setData([text, ...data,]);
    setNumber1('');
    setNumber2('');
  }

  return (
    
    <View style={styles.container}>
      <Text style={styles.title}>Calculate two numbers</Text>
      <Text>Result: {result}</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setNumber1(Number.parseInt(text))}
        value={number1}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        onChangeText={text => setNumber2(Number.parseInt(text))}
        value={number2}
        keyboardType="numeric"
      />
    <View style={styles.button}>
      <Button title="+" onPress={add}/>
      <Button title="-" onPress={minus}/>
      <Button onPress={() => navigation.navigate('History', {data})} title="History" />
    </View>
    
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
  button: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  }
});
