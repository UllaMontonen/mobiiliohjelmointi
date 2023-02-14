import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Alert, Image } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { API_CURRENCY } from '@env';

export default function App() {

  const [rates, setRates] = useState({});
  const [selected, setSelected] = useState('');
  const [amount, setAmount] = useState('');
  const [euro, setEuro] = useState('');

  const getData = async () => {
    const url = 'https://api.apilayer.com/exchangerates_data/latest';
    const options = {
      headers: {
        apikey: API_CURRENCY
      }
    };

    try {
      const response = await fetch(url, options);
      const currencyData = await response.json();
      setRates(currencyData.rates);
    } catch (e) {
      Alert.alert('Error fetching data');
    }
  }

  useEffect(() => { getData() }, []);

  const convert = () => {
    const amountEuro = Number(amount) / rates[selected];
    setEuro(`${amountEuro.toFixed(2)}€`);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image style={{ width: 200, height: 200}}
        source={require('./Calculator.png')}
      />
      <Text style= {{ ...styles.valuerow, ...styles.text}}>{euro}</Text>
      <View style={styles.inputrow}>
        <TextInput
          style={styles.text}
          placeholder={'Amount'}
          keyboardType='numeric'
          value={amount}
          onChangeText={text => setAmount(text)}
        />
        <Picker style={{ height: 50, width: 150 }}
          selectedValue={selected}
          onValueChange={(itemValue, itemIndex) => {
            setSelected(itemValue);
          }}
        >
          {Object.keys(rates).sort().map(key => (<Picker.Item label={key} value={key} key={key} />))}
        </Picker>
    </View>
    <Button
        title='Convert'
        onPress={convert}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 30
  },
  valuerow: {
    paddingTop: 20,
    paddingBottom: 10
  },
  inputrow: {
    flexDirection: 'row',
    borderColor: "grey", 
    borderWidth: 1,
    paddingLeft:5
  },
  text: {
    fontSize: 16
  },
});
