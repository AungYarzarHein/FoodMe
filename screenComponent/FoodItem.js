import React from 'react'
import { Dimensions , View , Text, TouchableOpacity, Image, Pressable } from 'react-native';
import Animated, { FadeIn, FadeInLeft, FadeInRight } from 'react-native-reanimated';
import foodOne from "../screens/images/one.png";


const {width,height} = Dimensions.get("window") ;
const itemWidth = (width-30)/2 ;
const AnimatedBtn = Animated.createAnimatedComponent(Pressable) ;


const FoodItem = ({item,navigation,index}) => {
  //  console.log(item.name)

    const onPressHandler = () => {
      // const obj = {
      //   itemName:item.name,
      //   priceForOne:(1 + index) * 1000 ,
      //   id:item.id
      // }
      navigation.navigate("fooddetails",item);
    }

 const enteringSide = (index%2==0) ? FadeInRight.duration(500).delay(500) : FadeInLeft.duration(500).delay(500) ;
  return (
   
        <AnimatedBtn style={{width:itemWidth,backgroundColor:"#ff770011",borderRadius:6,paddingBottom:10}} entering={enteringSide} onPress={onPressHandler}   >
      <Animated.Image  source={{uri:item.imageUrl}} style={{width:itemWidth-10,height:itemWidth-10}}  />
      <Text style={{textAlign:"center",fontFamily:"sakar",fontSize:16,width:itemWidth,height:32,lineHeight:32,color:"#000"}} > {item.name} </Text>
      <Text style={{textAlign:"center",fontFamily:"dinbo",fontSize:18,color:"#ff7700ff"}} > {item.price} kyats </Text>
         </AnimatedBtn>
    
  )
}

export default React.memo(FoodItem);