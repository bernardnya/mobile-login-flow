import React, {useState} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import COLORS from '../src/constants/colors';

import { MaterialCommunityIcons } from '@expo/vector-icons';


const Input = (
    {
        lable,
        iconName, 
        error,
        password,
        onFocus=() => {},
        ...props
    }) => {
        const [isFocused, setIsFocused] = useState(false)
        const [hidePassword, setHidePassword] = useState(password)
  return (
    <View style={{marginBottom:20}}>
       <Text style={styles.label}>{lable}</Text> 
       <View style={[
           styles.inputContainer, 
           {borderColor: error ? COLORS.red : isFocused ? COLORS.darkBlue : COLORS.light}]}>
        <MaterialCommunityIcons name={iconName} style={{fontSize:22, color:COLORS.darkBlue, marginRight:10}}/>
        <TextInput
            secureTextEntry={hidePassword}
            autoCorrect={false} 
            onFocus ={()=>{
                onFocus();
                setIsFocused(true);
            }}
            onBlur={()=> {
                setIsFocused(false);
            }}
            style={{color:COLORS.darkBlue, flex:1}} 
            {...props}
            />
            {password && (
                <MaterialCommunityIcons 
                onPress={() =>setHidePassword(!hidePassword) }
                name={hidePassword ? 'eye-outline' : 'eye-off-outline'} 
                style={{fontSize:22, 
                color:COLORS.darkBlue, marginRight:10}}
            />
            )}
       </View>
        {error && (
            <Text style={{color:COLORS.red, fontSize:12, marginTop:7}}>{error}</Text>
        )}
    </View>
  )
}

const styles = StyleSheet.create({
    label:{
        marginVertical:5,
        color: COLORS.grey,
        fontSize:14
    },
    inputContainer:{
        height:55,
        backgroundColor:COLORS.light,
        flexDirection: 'row',
        paddingHorizontal: 15,
        borderWidth:0.5,
        alignItems:'center'
    },
})

export default Input