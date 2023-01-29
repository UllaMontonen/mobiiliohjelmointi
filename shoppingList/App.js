import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';

export default function App() {
  
  const [text, setText] = useState('');
  const [data, setData] = useState([]);

  const buttonAdd = () => {
    setData([...data, { key: text }]);
    setText('');
  }
  
  const buttonClear = () => {
    setData([]);
    setText('');
  }

  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add things to your shopping list</Text>
      <TextInput style={styles.input} onChangeText={text => setText(text)} value={text} />
      

      <View style={styles.button}>
        <Button title="ADD" onPress={buttonAdd}/>
        <Button title="CLEAR" onPress={buttonClear}/>
      </View>
      <Text style={styles.title}>Shopping List</Text>
      <FlatList style={styles.list}
        data={data}
        renderItem={({ item }) =>
          <Text>{item.key}</Text>}
        keyExtractor= {(item, index) => index.toString()}
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
    color: "blue",
  },
});
