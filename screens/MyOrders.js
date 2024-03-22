import React from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'

const MyOrders = () => {
  return (
    <View style={style.container} >
    <Text > Today Special </Text>
    </View>
  )
}

const style = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"gold",
        paddingTop:StatusBar.currentHeight
    }
})

export default MyOrders