import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, FlatList, Image, StyleSheet, View , BackHandler , StatusBar, Text } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated';
// import one from "./images/specialOne.png";
// import two from "./images/specialTwo.png";
// import three from "./images/specialThree.png";

const { width , height } = Dimensions.get("window") ;

const data = [
  {
    id:1,
    imageUrl:require("./images/specialOne.png")
  },
  {
    id:2,
    imageUrl:require("./images/specialTwo.png")
  },
  {
    id:3,
    imageUrl:require("./images/specialThree.png")
  },
]

const TodaySpecial = ({navigation}) => {

  useEffect(() => { 
    const backAction = () => { navigation.goBack() ; return true ; }
    const backHandler = BackHandler.addEventListener("hardwareBackPress",backAction) ;
    return () => backHandler.remove() ;
   } ,[])
  return (
    <View style={style.container} >
      <Text style={{fontFamily:"tile",color:"#000",paddingVertical:10,fontSize:22}} > Today Special Menu </Text>
   <FlatList 
   data={data}
   renderItem={({item,index}) => {
    return(
      <Animated.View key={item.id} style={{width:width-20,height:140}} entering={FadeInDown.delay(index*100)} >
              <Image source={item.imageUrl}  style={{width:width-20,height:140,borderRadius:4}} />
      </Animated.View>
    )
   }}
   contentContainerStyle={{gap:10,paddingTop:30}}
   />
    </View>
  )
}

const style = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#f3f3f3",
        paddingTop:StatusBar.currentHeight,
        alignItems:"center"
    }
})

export default TodaySpecial