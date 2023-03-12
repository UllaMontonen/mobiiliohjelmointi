import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, Alert, StatusBar, Keyboard } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { EXPO_MAPQUEST_API_KEY } from '@env';

export default function App() {
  const initial = {
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221
  };

  const [region, setRegion] = useState(initial);
  const [address, setAddress] = useState('');

  useEffect(() => {
    const fetchLocation = async () => {
      let { permissions } = await Location.requestForegroundPermissionsAsync();
      if (permissions !== 'granted') {
        Alert.alert('No permission to get location');
      } else {
        try {
          let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
          console.log(location)
          setRegion({ ...region, latitude: location.coords.latitude, longitude: location.coords.longitude });
        } catch (error) {
          console.log(error.message);
        }
      }
    }
    fetchLocation();
  }, []);

  const fetchCoordinates = async (address) => {
    //const KEY = process.env.EXPO_MAPQUEST_API_KEY || Constants.manifest.extra.apiKey;
    const KEY = {
      headers: {
        apikey: EXPO_MAPQUEST_API_KEY
      }
    }
    const url = `http://www.mapquestapi.com/geocoding/v1/address?key=${KEY}&location=${address}`;

    try {
      const response = await fetch(url, KEY);
      const data = await response.json();
      console.log(data);

      const { lat, lng } = data.results[0].locations[0].latLng;
      console.log(lat, lng);
      setRegion({ ...region, latitude: lat, longitude: lng })
    } catch (error) {
      console.error('API call failed. Did you provide a valid API key?', error.message);
    }
    Keyboard.dismiss();
  };



  return (
    <View style={styles.container}>
      <MapView
        style={{ width: "100%", height: "90%" }}
        region={region}>
        <Marker coordinate={region} />
      </MapView>
      <TextInput
        style={styles.input}
        placeholder={'Address'}
        value={address}
        onChangeText={text => setAddress(text)}
      />
      <View style={styles.button}>
        <Button title="SHOW ADDRESS" onPress={() => fetchCoordinates(address)} />
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
    width: 200,
    fontSize: 20,
    borderColor: "grey",
    borderWidth: 1,
    marginTop: 10,
    padding: 5,
  },
  button: {
    height: 100,
    width: '100%',
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'center',
  },
});
