import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Alert, Image } from 'react-native';


export default function App() {

  const [keyword, setKeyword] = useState('');
  const [recipes, setRecipes] = useState([]);

  const getRecipes = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
    .then((response) => response.json())
    .then((data) => {
      setRecipes(data.meals);
    })
    .catch(error => 
          Alert.alert('Error', error));
  }
  const ItemSeparator = () => {
  return (
  <View
      style={{
        height: 1,
        backgroundColor: "grey"
      }}
  />
  );
  };


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <FlatList
          keyExtractor={(item) => String(item.idMeal)}
          renderItem={({item}) => {
            return (
              <View> 
                <Text style={{fontSize: 18, fontWeight: "bold"}}> {item.strMeal} </Text>
                <Image 
                  style={{ width: 100, height: 100 }}
                  source={{
                    uri: `${item.strMealThumb}`,
                  }}
                />
              </View>
            );
          }}
          ItemSeparatorComponent={ItemSeparator}
          data={recipes}
      />
      <View>
              <TextInput
                  style={styles.input}
                  placeholder='Ingredient'
                  value={keyword}
                  onChangeText={(text) => setKeyword(text)}
              />
              <View style={styles.button}>
                <Button title="Find" onPress= {getRecipes} />
              </View>
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
    marginTop: 50
  },

  input: {
    width: 200,
    fontSize: 18, 
    borderColor: "grey", 
    borderWidth: 1,
    marginTop: 10,
    alignItems: 'center',
  },

  button: {
    flexDirection: 'row',
    marginBottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
