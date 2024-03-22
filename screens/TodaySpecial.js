import React, { useEffect } from 'react'
import { BackHandler, StatusBar, StyleSheet, Text, View } from 'react-native'

const TodaySpecial = ({navigation}) => {

  useEffect(() => { 
    const backAction = () => { navigation.goBack() ; return true ; }
    const backHandler = BackHandler.addEventListener("hardwareBackPress",backAction) ;
    return () => backHandler.remove() ;
   } ,[])
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

export default TodaySpecial