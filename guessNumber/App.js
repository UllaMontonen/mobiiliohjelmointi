import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';

export default function App() {
  const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 100)+1);
  //const randomNumber = 7;
  const [number, setNumber] = useState('');
  const [message, setMessage] = useState('');
  const [count, setCount] = useState(0);


  function getMessage(number, randomNumber) {  
    if(number > randomNumber) {
      return "Your guess " + number + " is too high";
    } else if (number < randomNumber) {
      return "Your guess " + number + " is too low";
    } else {
      Alert.alert("You guessed the number in " + (count+1) + " guesses")
      setCount((count) => -1);
    }
  }
  
  function checkGuess () {    
    setMessage(getMessage(number, randomNumber))  
    setCount((count) => count + 1);
  };

  return (
    <View style={styles.container}>
      <Text>Guess a number between 1-100!</Text>
      <Text>{message}</Text>
      <StatusBar style="auto" />
      <TextInput
        style={styles.input}
        onChangeText={number => setNumber(Number.parseInt(number))}
        value={number}
        keyboardType="numeric"
      />
      <Button title="MAKE GUESS" onPress={checkGuess}/>
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

});
