import React,{useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView, StyleSheet,ScrollView, Text, View, Keyboard, Alert} from 'react-native';
import COLORS from '../src/constants/colors'
import Input from './Input';
import Button from './Button';
import Loader from './Loader';

const RegistrationScreen = ({navigation}) => {
  
  const [inputs, setInputs] = useState({
    email: '',
    fullname: '',
    phone: '',
    password:''
  });
  
  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({...prevState, [input]:text}))
  };

  const validate = ()=> {
    let valid = true
    Keyboard.dismiss();
    if(!inputs.email){
      handleError('Please enter email', 'email');
      valid = false;
    }else if(!inputs.email.match(/\S+@\S+\.\S+/)){
      handleError('Please enter a valid email', 'email');
    };
    if(!inputs.fullname){
      handleError('Please enter your fullname', 'fullname');
      valid = false;
    };
    if(!inputs.phone){
      handleError('Please enter your phone number', 'phone');
      valid = false;
    };
    if(!inputs.password){
      handleError('Please enter your password', 'password');
      valid = false;
    } else if (!inputs.password.length < 7){
      handleError('Please enter a min of 8 characters', 'password');
      valid = false;
    };
    if(valid){
      RegisterUser();
    }
  };

  const RegisterUser = () => {
    setLoading(true);
    setTimeout(() => {
      try { // point of saving data
        setLoading(false);
        AsyncStorage.setItem('userData', JSON.stringify(inputs)); //to users device
        navigation.navigate('LoginScreen'); // redirect user to next
      } catch (error) {  // else error
        Alert.alert('Error', 'Something went wrong');
      }
    }, 3000);
  };

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = React.useState(false);

  const handleError = (errorMessage, input) => {
    setErrors(prevState => ({...prevState, [input]: errorMessage}));
  };

  return (
    <SafeAreaView style={{backgroundColor:COLORS.white, flex:1}}>
      <Loader visible={loading}/>
      <ScrollView contentContainerStyle={{paddingTop:50, paddingHorizontal:20}} >
       <Text style={styles.titleText}>Register</Text> 
       <Text style={styles.titleDesc}>Enter your details to Register</Text> 

       <View style={{marginVertical:20}}>
          <Input
            placeholder='Enter your Email' 
            iconName="email-outline" 
            lable= 'Email'
            error={errors.email}
            onFocus={()=> {handleError(null, 'email')}}
            onChangeText={text=> handleOnchange(text, 'email')}
          />
          <Input
            placeholder='Enter your Fullname' 
            iconName="account-outline" 
            lable= 'Fullname'
            error={errors.fullname}
            onFocus={()=> {handleError(null, 'fullname')}}
            onChangeText={text=> handleOnchange(text, 'fullname')}
            //error='Enter in your Email'
          />
          <Input
            keyboardType='numeric'
            placeholder='Enter your PhoneNumber' 
            iconName="phone-outline" 
            lable= 'Phone number'
            error={errors.phone}
            onFocus={()=> {handleError(null, 'phone')}}
            onChangeText={text=> handleOnchange(text, 'phone')}
            //error='Enter in your Email'
          />
          <Input
            placeholder='Enter your Password' 
            iconName="lock-outline" 
            lable= 'Password'
            password
            error={errors.password}
            onFocus={()=> {handleError(null, 'password')}}
            onChangeText={text=> handleOnchange(text, 'password')}
          />
          <Button title='Register' onPress={validate}/>
          <Text 
          onPress={() => navigation.navigate('LoginScreen')}
          style={{
              color: COLORS.black,
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 16,
              marginVertical:10,
            }}> 
            Already have account? Log in
          </Text>
       </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  titleText:{
    color: COLORS.black,
    fontSize: 35,
    fontWeight: 'bold',
  },
  titleDesc:{
    color: COLORS.grey,
    fontSize: 18,
    marginVertical: 5
  },
})

export default RegistrationScreen
