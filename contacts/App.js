import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';


export default function App() {

  const [allContacts, setAllContacts] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers], 
      })

      if (data.length > 0) {
        setAllContacts(data);
        console.log(data);
      }
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatlist}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <View> 
              <Text> {item.firstName} {item.lastName}</Text>
            </View>
          );
        }}
        data={allContacts}
      />
      <View style={styles.button}>
        <Button title="GET CONTACTS" onPress={getContacts} />
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
    marginTop: 20,
  },
  button: {
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
  },
  flatlist: {
    paddingTop: 50,
  }
});
