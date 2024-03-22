import React, { useState } from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import AntDesign from "react-native-vector-icons/AntDesign"


const { width } = Dimensions.get("window");
const wid = width -20 ;

const PriceAndNumber = ({price,count,onCountIncrease,onCountReduce}) => {
    // console.log("Price and Number render ")
   
  return (
    <Animated.View style={styles.container} entering={FadeInRight.duration(400).delay(200)} >

        <Text style={styles.price} > {price*count} </Text>
        <TouchableOpacity onPress={onCountReduce}  activeOpacity={0.7} >
            <AntDesign name="minuscircle" size={36} color="#333" />
        </TouchableOpacity>
        <Text style={styles.count} > {count} </Text>
        <TouchableOpacity onPress={onCountIncrease}  activeOpacity={0.7} >
        <AntDesign name="pluscircle" size={36} color="#333" />
        </TouchableOpacity>

    </Animated.View>
  )
}

const styles = StyleSheet.create({
    btn:{
        width:wid*0.25,
        backgroundColor:"#8cbecbff",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:10,
        borderWidth:3,
        borderColor:"#ffffff55"
    },
    container:{
        width:wid,
        flexDirection:"row",
        gap:10,
        justifyContent:'center',
        alignItems:"center",
        paddingVertical:10,
        backgroundColor:"#8cbecb22",
        borderRadius:10,
        alignSelf:'center'
        // paddingHorizontal:10,
    },
    price:{
        width:wid*0.4,
        fontFamily:"dinbo",
        textAlign:"center",
        color:"#333",
        fontSize:24
    },
    count:{
        width:wid*0.1,
        fontSize:24,
        fontFamily:"dinbo",
        textAlign:"center",
        verticalAlign:"middle",
        color:"#333"
    },
    btnText:{
        paddingVertical:8,
        fontFamily:"dinbo",
        fontSize:18,
        color:"#fff"
    }
})

export default PriceAndNumber