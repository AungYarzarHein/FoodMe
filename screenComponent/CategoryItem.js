import React from 'react'
import { Pressable , View , Text, StyleSheet, Dimensions, Image } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';




const AnimatedBtn = Animated.createAnimatedComponent(Pressable);

const { width , height } = Dimensions.get("window") ;
const cardWidth = (width - 50)/5;
const imgWidth = cardWidth*0.9 ; 




const CategoryItem = ({delay,imgUrl,onAllFood,bg}) => {
   

    return(

      <AnimatedBtn style={[styles.card,{backgroundColor:bg}]}  entering={FadeInRight.duration(300).delay(delay)} onPress={onAllFood} >
      <Image source={imgUrl} style={{width:imgWidth,height:imgWidth}} />
    </AnimatedBtn> 
    
      
    )
  }


  const styles = StyleSheet.create({
    card : {
     width:cardWidth,
     height:cardWidth,
     borderRadius:cardWidth/5,
     borderWidth:3,
     borderColor:"#8cbecb55",
     justifyContent:"center",
     alignItems:"center"
    }
  })







export default React.memo(CategoryItem)  ;