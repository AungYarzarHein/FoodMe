import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Text, View,StyleSheet,StatusBar, BackHandler, Image, Dimensions, ActivityIndicator, TouchableOpacity, Pressable } from 'react-native';
import foodOne from "./images/one.png";
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import Animated, { BounceIn, FadeIn, FadeInDown, FadeInLeft, FadeInRight, FadeInUp, ZoomIn } from 'react-native-reanimated';
import AntDesign from "react-native-vector-icons/AntDesign"
import PriceAndNumber from '../screenComponent/PriceAndNumber';
import AppContext from '../routes/appContext';

const { width , height } = Dimensions.get("window") ;
const itemWidth = width * 0.6 ;

const AnimatedBtn = Animated.createAnimatedComponent(TouchableOpacity);

const FoodDetails = ({route,navigation}) => {
  const [loading,setLoading] = useState(true) ;
  const [count,setCount] = useState(1) ; // for new count
  const [originalCount,setOriginalCount] = useState(0); // if item already exit and this is the original count
  const [originalPrice,setOriginalPrice] = useState(0) //  if item already exit and this is the original price
  const [oldItem,setOldItem] = useState(false);
  const { userState,dispatch } = useContext(AppContext);
  const {name,price,id,imageUrl} = route.params ; // getting from route 
  const [onePrice,setOnePrice] = useState(price);
  const [show,setShow] = useState(false);
  const {orderList} = userState ;
  
  // console.log("Food Details Render.....");
 
  // handling hardware backpress

  useEffect(() => {
    const backAction = () => { navigation.goBack() ; return true ; } ;
    const backHandler = BackHandler.addEventListener("hardwareBackPress",backAction) ;
    return () => backHandler.remove();
  })

  


  // handling increase & decrease
  const onCountIncrease = () => {
    setCount(prev => prev + 1) ;
  }

  const onCountReduce = () => {
    setCount(prev => prev - 1) ;
  }

  const onAddToCart = () => {
    setShow(true);
    if(oldItem){
      const realCount = count  - originalCount ;
      const realPrice = (price * count) - originalPrice ;
      const orderItem = {
        name,
        totalPrice:price*count,
        totalCount:count,
        id,
        imageUrl
      }
      dispatch({type:"updateItem",value:{realCount,realPrice,orderItem,id}})

    }else{
      const orderItem = {
        name,
        totalPrice:price*count,
        totalCount:count,
        id,
        imageUrl
      }
      dispatch({type:"addItemToCart",value:orderItem})
    }

   setTimeout(() => { setShow(false);navigation.goBack() } ,200)

    // const totalCost = (price * count) - (price * originalCount) ;
    // const orderItemObj = {
    //   name:name,
    //   count:count-originCount,
    //   price:totalCost,
    //   id:route.params.id
    // }
    //  dispatch({type:"addItemToCart",value:{count:count-originCount,price:totalCost,orderObj:orderItemObj,objName:route.params.itemName}});

    //  setTimeout(() => { 
    //   setShow(false);
    //   navigation.goBack()
    //   } ,500)
  } ;

 



  useEffect(() => { 
    setTimeout(() => { setLoading(false) ;
    if(orderList.hasOwnProperty(id)){
      setOriginalCount(orderList[id].totalCount); // updating the item count
      setOriginalPrice(orderList[id].totalPrice) ; // updating the item price
      setCount(orderList[id].totalCount) ;
      setOldItem(true);
      // setCount(orderList[id].count);
    } 
    } ,200)
   } ,[])


   if(loading) {
    return(
      <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"#f2f2f2"}} >
        <ActivityIndicator size={30} color={"red"} />
      </View>
    )
   }

  return (
    <View style={styles.container} >
      <View style={styles.headerContainer} >
    <Animated.Image source={{uri:imageUrl}} style={{width:itemWidth,height:itemWidth}} entering={FadeInLeft.duration(300)}   />
    <Animated.Text style={styles.foodName} entering={FadeInLeft.duration(500)} > {name} </Animated.Text>
    <Animated.Text style={styles.price} entering={FadeInRight.duration(500)} > {price} kyats </Animated.Text>

      </View>

       <View style={styles.ratingContainer} >
        {/* <Text> Star Rating... </Text> */}
       </View>

       <View >
        <PriceAndNumber  count={count} onCountIncrease={onCountIncrease} onCountReduce={onCountReduce} price={price} />
       </View>

       <View style={styles.btnContainer} >
         <AnimatedBtn entering={FadeInUp.duration(600)} style={styles.btn} onPress={onAddToCart}  activeOpacity={1} >
          {
            show ? <ActivityIndicator size={20} color={"red"} /> : <AntDesign name="shoppingcart" size={24} color="#fff" /> 
          }
          <Text style={styles.btnText} > Add To Cart </Text>
         </AnimatedBtn>
       </View>

    </View>
  )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#f2f2f2",
        // backgroundColor:"#ff770011"
        // paddingTop:StatusBar.currentHeight,
        // alignItems:"center"
    },
    headerContainer:{
      width,
      alignItems:"center",
      justifyContent:'center',
      paddingTop:24,
      backgroundColor:"#8cbecbff",
      borderBottomLeftRadius:width/5,
      borderBottomRightRadius:width/5,
      // borderWidth:3,
      // borderColor:"#ffffff66"
    },
    foodName:{
      fontFamily:"sakar",
      fontSize:24,
      color:"#fff",
      // paddingBottom:10
    },
    price:{
      fontFamily:"dinbo",
      fontSize:18,
      color:"#fff",
      paddingVertical:10
    },
    ratingContainer:{
      padding:16,
      // backgroundColor:"gold"
    },
    btnContainer:{
      flex:1,
      // backgroundColor:"green",
      alignItems:"center",
      justifyContent:"center"
    },
    btn:{
      // width:width*0.8,
      paddingHorizontal:20,
      borderRadius:16,
      borderWidth:3,
      borderColor:"#ffffff55",
      backgroundColor:"#8cbecbff",
      flexDirection:'row',
      alignItems:"center",
      justifyContent:"center"
    },
    btnText:{
      padding:10,
      fontSize:22,
      fontFamily:"dinbo",
      color:"#fff",
      textAlign:"center"
    }
})

export default FoodDetails