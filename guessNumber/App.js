import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';

let secret;
let guess;

export default function App() {
  
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');

  const init = () => {
    setMessage('Guess a number between 1 and 100');
    count = 0;
    secret = Math.floor(Math.random() * 100) +1;
    console.log('Secret: ', secret);
  }

  useEffect(() =>{
    init();
  }, [])

  const checkGuess = () => {
    const guess = Number(input);
    count++;
    if (guess < secret) {
      setMessage('Your guess ' + guess + ' is too low')
    } else if (guess > secret) {
      setMessage("Your guess " + guess + " is too high")
    } else {
      Alert.alert("You guessed the number in " + (count) + " guesses")
      init();
    }
    setInput('');
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>{message}</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setInput(text)}
        value={input}
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

  title: {
    fontSize: 20
  },

});
