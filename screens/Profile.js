import React, { useEffect } from 'react'
import { BackHandler, Dimensions, Pressable, StyleSheet, Text, TouchableOpacity, View , ScrollView, Image, ActivityIndicator } from 'react-native' ;
import Animated, { FadeInDown, FadeInLeft, FadeInRight, FadeInUp, LightSpeedInLeft, LightSpeedInRight, ZoomIn, ZoomInEasyUp, ZoomInUp } from 'react-native-reanimated';
import { Rect, Svg } from 'react-native-svg';
import man from "./images/man1.jpg";

const { width , height  } = Dimensions.get("window") ;
const AnimatedRect = Animated.createAnimatedComponent(Rect);
const AnimatedBtn = Animated.createAnimatedComponent(TouchableOpacity);
const profileWidth = width * 0.3 ;
const top = ((height*0.4)-50)/2 - (profileWidth/2)

const Profile = ({navigation}) => {


    useEffect(() =>  {
        const backAction = () => {navigation.goBack() ; return true ;} ;
        const backHandler = BackHandler.addEventListener("hardwareBackPress",backAction) ;
        return () => backHandler.remove() ;
     })

  return (
   <View style={styles.container} >
      <View style={{height:(height*0.4)-50,marginBottom:10}} >
      <Svg width={width} height={(height*0.4)-50}  >
<AnimatedRect width={width} height={height*0.4} x="0" y="-50" rx={50}  fill="#8cbecbff" entering={FadeInUp.duration(800)}   />

      </Svg>
      <Animated.Text style={{position:"absolute",bottom:20,width,textAlign:"center",fontSize:18,fontFamily:"lucky",color:"#fff"}} entering={FadeInUp.duration(600)} > Mg Aung Yarzar Hein </Animated.Text>
      </View>
     

      <View style={styles.btnContainer} >
        <AnimatedBtn style={styles.btn} entering={FadeInLeft.duration(500).delay(300)} activeOpacity={0.7} >
            <Text style={styles.btnText} > Orders </Text>
        </AnimatedBtn>

        <AnimatedBtn style={styles.btn} entering={FadeInRight.duration(500).delay(300)} activeOpacity={0.7} >
            <Text style={styles.btnText} >History</Text>
        </AnimatedBtn>
      </View>

      <Animated.Image source={man} style={styles.profileImage} entering={ZoomIn.duration(600)} />
      
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}} >
       <ActivityIndicator size={22} color={"#333"} />
      </View>
      
   </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#f2f2f2"
    },
    btnContainer:{
        width:width,
        // height:300,
        // backgroundColor:"red",
        flexDirection:"row",
        justifyContent:"space-between",
        paddingHorizontal:10,
        // paddingVertical:10
    },
    btn:{
        width:width*0.4,
        backgroundColor:"#8cbecbff",
        borderRadius:10,
        borderWidth:3,
        borderColor:"#ffffff55"
    },
    btnText:{
        paddingVertical:12,
        textAlign:"center",
        fontSize:16,
        fontFamily:"lucky",
        color:"#fff"
    },
    profileImage:{
        width:profileWidth,
        height:profileWidth,
        borderRadius:profileWidth/2,
        position:"absolute",
        top:top,
        right:(width/2)-(profileWidth/2),
        borderWidth:3,
        borderColor:"#ffffff55"
    }
})

export default Profile