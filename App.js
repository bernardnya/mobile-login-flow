import React,{useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './components/LoginScreen';
import RegistrationScreen from './components/RegistrationScreen';
import HomeScreen from './components/HomeScreen';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View } from 'react-native';
import Loader from './components/Loader';


const Stack = createNativeStackNavigator();

export default function App() {

  const [initialRouteName, setInitialRouteName] = useState('');
  useEffect(() => {
    setTimeout(() => {
      authUser();
    }, 2000);
  }, []);

  const authUser = async () => {
    try {
      let userData = await AsyncStorage.getItem('userData');
      if (userData) {
        userData= JSON.parse(userData);
          if (userData?.loggedIn) {
            setInitialRouteName('HomeScreen');
          }else {
            setInitialRouteName('LoginScreen');
          }
      } else {
        setInitialRouteName('LoginScreen');
      }
      
    } catch (error) {
      setInitialRouteName('RegistrationScreen');
    }
  }

  return (
    <NavigationContainer>
      {initialRouteName == '' ? (
        <Loader visible={true}/>
      ) : (
      <>
      <Stack.Navigator initialRouteName={initialRouteName} screenOptions={{headerShown:false}}>
        <Stack.Screen name='RegistrationScreen' component={RegistrationScreen}/>
        <Stack.Screen name='LoginScreen' component={LoginScreen}/>
        <Stack.Screen name='HomeScreen' component={HomeScreen}/>
      </Stack.Navigator>
      </>
      )}
      
    </NavigationContainer>
  );
}

