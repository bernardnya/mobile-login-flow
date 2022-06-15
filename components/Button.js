import React from 'react'
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import COLORS from '../src/constants/colors';


const Button = ({title, onPress=()=> {}}) => {
  return (
    <TouchableOpacity
        activeOpacity={0.5} 
        style={styles.button} 
        onPress={onPress}
        >
       <Text style={styles.buttonText}>{title}</Text> 
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    button:{
        height:55,
        width:'100%',
        backgroundColor:COLORS.blue,
        justifyContent:'center',
        alignItems:'center'
    },
    buttonText:{
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: 18
    }
})

export default Button