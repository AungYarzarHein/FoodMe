import React, { useEffect } from 'react'
import { Dimensions, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import fruit from "./images/fruit.png";
import plate from "./images/plate.png";
import plateOne from "./images/plate_one.png";
import Animated, { BounceIn, FadeInDown, FadeInLeft, FadeInRight, FadeInUp } from 'react-native-reanimated';
import { Rect, Svg } from 'react-native-svg';


const AnimatedRect = Animated.createAnimatedComponent(Rect);
const AnimatedBtn = Animated.createAnimatedComponent(TouchableOpacity);

const { width, height }  = Dimensions.get("window");

const Login = ({navigation}) => {


 const onPressHandler = () => {
   navigation.navigate("home")
 }
  return (
    <View style={styles.container} >
       {/* <ImageBackground source={loginImage} style={{width,height}}  >
   
       </ImageBackground> */}
       <View style={{width,height:height*0.285,flexDirection:"row"}} >
        <Animated.Image source={plate} style={{width:width*0.34,height:height*0.285}} entering={FadeInLeft.duration(300).delay(200)} />
        <Animated.Image source={fruit} style={{width:width*0.66,height:height*0.285}} entering={FadeInRight.duration(300).delay(300)} />
       </View>
       <View style={{height:height*0.3,justifyContent:"flex-end"}} >
       <Animated.Image source={plateOne} style={{width:width*0.25,height:height*0.197}} entering={FadeInLeft.duration(300).delay(600)} />
       </View>
       
       <Svg width={width} height={height*0.414}  >
  <AnimatedRect
    x="0"
    y="0"
    rx={width/2}
    ry={width/6}
    width={width}
    height={height*0.714}
    fill="#ff7700ff"
    entering={FadeInDown.duration(300).delay(500)} 
  />

 
</Svg>

       <Animated.View style={{position:"absolute",width,height,alignItems:"center",paddingTop:height*0.4}}  entering={FadeInUp.duration(500).delay(600)} >
        <Text style={styles.text} >FoodMe</Text>
       </Animated.View>

        <View style={{position:"absolute",height,width,paddingBottom:height*0.2,justifyContent:"flex-end"}} >
        <AnimatedBtn style={styles.btn} entering={FadeInDown.duration(600).delay(600)} onPress={onPressHandler} activeOpacity={0.7} >
          <Text  style={styles.btnText} > Login </Text>
        </AnimatedBtn>
        </View>
    </View>
  ) 
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#8cbecbff",
        // paddingTop:StatusBar.currentHeight
    },
    text:{
        fontSize:30,
        color:"#fff" ,
        fontFamily:"lucky"
    },
    btn:{
      // position:"absolute",
      // bottom:height*0.2,
      width:width*0.6,
      backgroundColor:"#8cbecbff",
      borderRadius:14,
      alignSelf:"center",
      borderColor:"#ffffff88",
      borderWidth:2
    },
    btnText:{
      padding:10,
      fontSize:18,
      color:"#fff",
      textAlign:"center",
      fontFamily:"dinbo"
    }
})

export default Login