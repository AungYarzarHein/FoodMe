import React from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'

const MyHistory = () => {
  return (
    <View style={style.container} >
    <Text > My History </Text>
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

export default MyHistory