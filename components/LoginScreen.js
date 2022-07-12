import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView, StyleSheet, ScrollView, Text, View, Keyboard, Alert } from 'react-native';
import COLORS from '../src/constants/colors'
import Input from './Input';
import Button from './Button';
import Loader from './Loader';


const LoginScreen = ({ navigation }) => {

  const [inputs, setInputs] = useState({
    email: '',
    fullname: '',
    phone: '',
    password: ''
  });

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }))
  };

  const validate = () => {
    let valid = true
    Keyboard.dismiss();

    if (!inputs.email) {
      handleError('Please enter email', 'email');
      valid = false;
    }
    if (!inputs.password) {
      valid = false;
      handleError('Please enter your password', 'password');
    }
    if (valid) {
      LogInUser();
    }
  };

  const LogInUser = () => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      let userData = await AsyncStorage.getItem('userData');
      if (userData) {
        userData = JSON.parse(userData);
        if (inputs.email == userData.email &&
          inputs.password == userData.password
        ) {
          AsyncStorage.setItem('userData', JSON.stringify({ ...userData, loggedIn: true }),)
          navigation.navigate('HomeScreen');
        } else {
          Alert.alert('Error', 'Email or Password is not correct');
        }
      } else {
        Alert.alert('Error', 'User does not exist')
      }
    }, 3000);
  };

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = React.useState(false);

  const handleError = (errorMessage, input) => {
    setErrors(prevState => ({ ...prevState, [input]: errorMessage }));
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <Loader visible={loading} />
      <ScrollView contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }} >
        <Text style={styles.titleText}>Sign In</Text>
        <Text style={styles.titleDesc}>Enter your details to Login</Text>

        <View style={{ marginVertical: 20 }}>
          <Input
            placeholder='Enter your Email'
            iconName="email-outline"
            lable='Email'
            error={errors.email}
            onFocus={() => { handleError(null, 'email') }}
            onChangeText={text => handleOnchange(text, 'email')}
          />

          <Input
            placeholder='Enter your Password'
            iconName="lock-outline"
            lable='Password'
            password
            error={errors.password}
            onFocus={() => { handleError(null, 'password') }}
            onChangeText={text => handleOnchange(text, 'password')}
          />
          <Button title='Log In' onPress={validate} />
          <Text
            onPress={() => navigation.navigate('RegistrationScreen')}
            style={{
              color: COLORS.black,
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 16,
              marginVertical: 10,
            }}>
            Don't have account yet? Register
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  titleText: {
    color: COLORS.black,
    fontSize: 35,
    fontWeight: 'bold',
  },
  titleDesc: {
    color: COLORS.grey,
    fontSize: 18,
    marginVertical: 5
  },
})

export default LoginScreen