import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, FlatList } from 'react-native';
import { push, ref, onValue, remove } from 'firebase/database';
import database from './firebase';


export default function App() {
  const [amount, setAmount] = useState('');
  const [product, setProduct] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const itemsRef = ref(database, '/products');
    onValue(itemsRef, snapshot => {
      console.log('onValue');
      const data = snapshot.val();
      console.log(data)

      const items = data ? Object.keys(data).map(key => ({ key, ...data[key] })) : [];
      console.log(items);
      setProducts(items);
    });
  }, []);

  // Save product
  const saveItem = () => {
    console.log('saveItem:', {product, amount})
    push(ref(database, '/products'), {'product': product, 'amount': amount });

    setAmount('');
    setProduct('');
  }


  // Delete product
  const deleteItem = (key) => {
    console.log('deleteItem', key);
    remove(ref(database, '/products/' + key))
  };

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "80%",
          backgroundColor: "#fff",
          marginLeft: "10%"
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder='Product' style={styles.textinputfirst}
        onChangeText={(product) => setProduct(product)}
        value={product}/>  
      <TextInput placeholder='Amount' style={styles.textinputsecond}
        onChangeText={(amount) => setAmount(amount)}
        value={amount}/>      
      <Button onPress={saveItem} title="Save" /> 
      <Text style={styles.title}>Shopping list</Text>
      <FlatList 
        style={{marginLeft : "5%"}}
        keyExtractor={item => item.key} 
        renderItem={({item}) => <View style={styles.listcontainer}><Text style={styles.text}>{item.product}, {item.amount}</Text>
        <Text style={styles.delete} onPress={() => deleteItem(item.key)}> Bought</Text></View>} 
        data={products} 
        ItemSeparatorComponent={listSeparator} 
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
  marginTop: 20,
 },
 listcontainer: {
  flexDirection: 'row',
  backgroundColor: '#fff',
  alignItems: 'center'
 },
 textinputfirst: {
  marginTop: 30, 
  fontSize: 18, 
  width: 200, 
  borderColor: 'gray', 
  borderWidth: 1
 },
textinputsecond: {
  marginTop: 5, 
  marginBottom: 5,  
  fontSize:18, 
  width: 200, 
  borderColor: 'gray', 
  borderWidth: 1
},
title: {
  marginTop: 30, 
  paddingBottom:10, 
  fontSize: 20
},
delete: {
  fontSize: 18, 
  color: '#0000ff'
},
text: {
  fontSize: 18
},
});
