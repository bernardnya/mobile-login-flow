import React,{useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text, View, Button} from 'react-native';


const HomeScreen = ({navigation}) => {
  const [userDetails, setUserDetails] = React.useState();
  useEffect(() => {
    getUserDetails();
  },[]);

  const getUserDetails = async ()=>{
    const userData = await AsyncStorage.getItem('userData');
    if(userData){
      setUserDetails(JSON.parse(userData));
    }
  }
  const logOutUser = () => {
    AsyncStorage.setItem(
      'userData',
      JSON.stringify({...userDetails, loggedIn: false}),
    );
    navigation.navigate('LoginScreen');
  }

  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 40,
      }}>
       <Text style={{fontSize: 20, fontWeight: 'bold'}}>
         Welcome {userDetails?.fullname}
       </Text> 
       <Button title='Log Out' onPress={logOutUser}/>
    </View>
  )
}

export default HomeScreen