import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, ImageBackground, KeyboardAvoidingView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import auth from "@react-native-firebase/auth";
import fruit from "./images/fruit.png";
import plate from "./images/plate.png";
import plateOne from "./images/plate_one.png";
import Animated, { BounceIn, FadeInDown, FadeInLeft, FadeInRight, FadeInUp } from 'react-native-reanimated';
import { Rect, Svg , } from 'react-native-svg';


const AnimatedRect = Animated.createAnimatedComponent(Rect);
const AnimatedBtn = Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const { width, height }  = Dimensions.get("window");

const Login = ({navigation}) => {
  const [loading,setLoading] = useState(false);

  const onPressHandler = () => {
    setLoading(true);
    auth().signInAnonymously().then(() => { 
      setLoading(false);
      navigation.navigate("home");
     }).catch((err) => { console.log(err)})
    
    // navigation.navigate("home")
  }

  useEffect(() => { 
    let isMounted = true ;
    if(auth().currentUser && isMounted){
      setLoading(true);
      setTimeout(() => { setLoading(false) ; navigation.push("home") } ,300)
    }

    return () => isMounted = false ;
   },[])

  return (
    <View style={styles.container} >
       <View style={{width,height:height*0.285,flexDirection:"row"}} >
        <Animated.Image source={plate} style={{width:width*0.34,height:height*0.285}} entering={FadeInLeft.duration(300).delay(200)} />
        <Animated.Image source={fruit} style={{width:width*0.66,height:height*0.285}} entering={FadeInRight.duration(300).delay(300)} />
       </View>
     
      <View style={{position:"absolute",width,height:height*0.7,backgroundColor:"transparent",bottom:0}} >
      <Svg width={width} height={height*0.7}   >
       
       <AnimatedRect
           x="0"
           y={width/7}
           rx={width/2}
           ry={width/7}
           width={width}
           height={height*0.7}
           fill="#ff7700ff"
           entering={FadeInDown.duration(300).delay(500)} 
         />
           </Svg>
      </View>

      <Animated.Image source={plateOne} style={{width:width*0.259,height:height*0.197,marginTop:20}} entering={FadeInLeft.duration(300).delay(600)} />

      
      
    <View   >
  
  {/* <AnimatedTextInput entering={FadeInLeft.duration(600).delay(600)}  style={styles.textInput}  placeholder='Your Number' placeholderTextColor={"#ffffff88"} keyboardType="number-pad" />  */}

   
        <AnimatedBtn style={styles.btn} entering={FadeInRight.duration(600).delay(600)} onPress={onPressHandler} activeOpacity={0.7}  >
       {
        loading ? <ActivityIndicator size={16}  /> : null
       }
       <Text style={styles.btnText}> Login </Text>
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
      borderRadius:10,
      flexDirection:"row",
      alignSelf:"center",
      justifyContent:"center",
      borderColor:"#ffffff88",
      borderWidth:2,
      marginTop:30
    },
    btnText:{
      padding:10,
      fontSize:18,
      color:"#fff",
      textAlign:"center",
      fontFamily:"dinbo"
    },
    textInput:{
      padding:6,
      fontSize:18,
      textAlign:"center",
      paddingLeft:20,
      fontFamily:"lucky",
      width:width*0.7,
      // backgroundColor:"#8cbecb11",
      // borderRadius:6,
      alignSelf:"center",
      borderBottomColor:"#ffffff22",
      borderBottomWidth:2
    }
})

export default Login