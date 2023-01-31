import { StatusBar } from 'expo-status-bar';
import { useState, useRef } from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, input, FlatList } from 'react-native';

export default function App() {

const [result, setResult] = useState('');
const [number1, setNumber1] = useState('');
const [number2, setNumber2] = useState('');

const [data, setData] = useState([]);

const add = () => {
  const total = number1 + number2;
  setResult(total);
  const text = number1 + ' + ' + number2 + ' = ' + total;
  setData([text, ...data]);
  //Alert.alert('Result: ' + total)
  setNumber1('');
  setNumber2('');
  //initialFocus.currect.fucus();
}

const minus = () => {
  const total = number1 - number2;
  setResult(total);
  const text = number1 + ' - ' + number2 + ' = ' + total;
  setData([text, ...data]);
  //Alert.alert('Result: ' + total)
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
    </View>
    <Text>History</Text>
    <FlatList style={styles.list}
        data={data}
        keyExtractor= { (item, index) => index.toString()}
        renderItem={({ item }) => {
          return <Text>{item}</Text>
        }
        }
      />
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
