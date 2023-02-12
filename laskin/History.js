import React from 'react';
import { StyleSheet, Text, View, FlatList  } from 'react-native';


export default function History({route}) {
    const { data } = route.params;


    return(
        <View style={styles.container}>
            <Text>History</Text>
                <FlatList 
                    data={data}
                    keyExtractor= { (index) => index.toString()}
                    renderItem={({ item }) => {
                    return <Text>{item}</Text>}}
                />
        </View>
    )}

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          
        },
        title: {
          fontSize: 20,
          marginBottom: 10,
        }
      });
      