import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { ActivityIndicator, BackHandler, Dimensions, FlatList, Image, Pressable, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Animated, { FadeInDown, FadeInLeft, FadeInRight, StretchOutX } from 'react-native-reanimated';
import firestore from "@react-native-firebase/firestore";
import foodOne from "./images/one.png";
import AppContext from '../routes/appContext';
import FoodItem from '../screenComponent/FoodItem';
import AntDesign from "react-native-vector-icons/AntDesign";
import CategoryItem from '../screenComponent/CategoryItem';
import foodAll from "./images/catOne.png";
import food from "./images/catTwo.png";
import juice from "./images/catThree.png";
import snack from "./images/catFour.png";
import { getAllData, specificData } from '../utils/GettingData';
import SpecialCom from '../screenComponent/SpecialCom';
import man from "./images/man1.jpg";

const {width,height} = Dimensions.get("window") ;
const itemWidth = (width-30)/2 ;
const profileWidth = width/10 ;


const AnimatedBtn = Animated.createAnimatedComponent(TouchableOpacity);


const HomeScreens = ({navigation}) => {
  const [foodList,setFoodList] = useState([]);
  const [loading,setLoading] = useState(true);
  const [show,setShow] = useState(false);
  const [moreLoading,setMoreLoading] = useState(false);
  const [btnDisable,setBtnDisable] = useState(false);
  const {userState,dispatch} = useContext(AppContext);
  // const [orderList,setOrderList] = useState([]);
  const [originalList,setOriginalList] = useState([]);


// console.log("Home render...")  

 //handling hardwarebackpress
  useEffect(()=>{
    const backAction = () => {BackHandler.exitApp()};
    const backHandler = BackHandler.addEventListener("hardwareBackPress",backAction);
    return () => backHandler.remove();
  },[])

 
 



  const onAllFood = useCallback( async () => {
    // console.log("All Food")
    setBtnDisable(false);
    setShow(false)
    const data = await getAllData() ;
    setFoodList(data);
    setShow(true)
  },[])

  const onFood = useCallback(async () => {
    // console.log("Food")
    setBtnDisable(true)
    setShow(false)
    const data = await specificData("curry");
    setFoodList(data);
    setShow(true)
  },[])

  const onJuice = useCallback(async () => {
    setBtnDisable(true)
    // console.log("Juice")
    setShow(false)
    const data = await specificData("juice");
    setFoodList(data);
    setShow(true)
  },[])

  const onSnack = useCallback(async () => {
    setBtnDisable(true)
    // console.log("snack")
    setShow(false)
    const data = await specificData("snack");
    setFoodList(data);
    setShow(true)
  },[])

  // const onAddToCart = (obj) => {
  //   setOrderList([...orderList,obj]);
  // }

  const onBuyAllItem = (price) => {
      // console.log(price , " Needs to pay");
      navigation.navigate("ordernow")
      // console.log(foodList)
  }

  const getMoreItem = () => {
    // console.log(originalList.length , "is remainded" , foodList.length , " is rendder");
    setMoreLoading(true);
    const startPoint = foodList.length ;
    const endPoint = startPoint + 10 ;
    const newItems = originalList.slice(startPoint,endPoint) ;
    // setFoodList([...foodList,...newItems]);
    setTimeout(() => { 
      setFoodList([...foodList,...newItems]);
      setMoreLoading(false);
     } ,500)
  }



  const getAllItems = () => {
    firestore().collection("fooditems").get()
    .then(documentList => {
      if(documentList){
        const items = [] ;
       documentList.forEach(document => {
        items.push(document.data());
       });
       
       setOriginalList(items);
       setFoodList(items.slice(0,10));
      // console.log(items.slice(0,10).length)
       setShow(true);
      //  console.log(items.length , " is original length")
       
      }else{
        return ;
      }
    })
    .catch(err => {
      return ;
    })
  }




 useEffect(() => {
  getAllItems()
  setTimeout(() => setLoading(false) , 300)
  // setTimeout(() => setShow(true) , 600)
 },[])


 

  if(loading){
    return(
      <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"white"}} >
        <ActivityIndicator size={30} color={"red"} />
      </View>
    )
  }

  

  return (
    <View style={styles.container} >
    <View style={styles.headerContainer} >
      <Text style={styles.headerTitle} > Welcome to FoodMe </Text>
      <TouchableOpacity style={styles.profileBtn} onPress={() => navigation.navigate("profile")} activeOpacity={0.7} >
<Image source={man} style={{width:profileWidth,height:profileWidth,borderRadius:profileWidth/2,borderWidth:2,borderColor:"#ffffff44"}} />
      </TouchableOpacity>
    </View>

    <ScrollView style={styles.mainBody} showsVerticalScrollIndicator={false}
     contentContainerStyle={{paddingBottom:100}}
    >

    <Animated.View style={styles.todaySpecialContainer} entering={FadeInDown.duration(600)} >
      <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",paddingRight:10}} >
      <Text style={{fontFamily:"lucky",fontSize:16,color:"#ff7700ff",paddingVertical:5,letterSpacing:3}} > Today Specials </Text>
      <TouchableOpacity  activeOpacity={0.7} onPress={() => navigation.navigate("todayspecial")} >
        <Text style={{color:"#ff7700ff",fontFamily:"lucky",fontSize:14}} >See All</Text>
      </TouchableOpacity>
      </View>
      {/* <View style={{height:150,backgroundColor:"#8cbecbff",borderRadius:6}} >

      </View> */}
      <SpecialCom />
    </Animated.View>

<View style={styles.categoryContainer}  >

 <CategoryItem  imgUrl={foodAll} delay={500} onAllFood={onAllFood} bg={"#d7f4eeff"} />
 <CategoryItem  imgUrl={food} delay={600} onAllFood={onFood} bg={"#ff770011"} />
 <CategoryItem  imgUrl={juice} delay={700} onAllFood={onJuice} bg={"#c4b7c8ff"} />
 <CategoryItem  imgUrl={snack} delay={800} onAllFood={onSnack} bg={"#e3dbdeff"} />

</View>

<View style={styles.foodItemContainer} >

  {
   show ? foodList.map((item,index) => {
    
    return ( <FoodItem key={item.id} item={item}  navigation={navigation} index={index}  /> )
  }) : <ActivityIndicator size={30} color={"green"} style={{marginTop:80,width:width-20}}  /> 
  } 

</View>

{
  show ? <Pressable style={styles.moreBtn} onPress={getMoreItem} disabled={btnDisable} >
 {moreLoading ? <ActivityIndicator size={18} color={"#fff"} /> :  <Text style={styles.moreBtnText} > More Items </Text>  }
</Pressable> : null
}

    </ScrollView>

    
   {  
    show ?  <AnimatedBtn style={styles.chartBtn} entering={FadeInDown.duration(600).delay(600)} onPress={() => onBuyAllItem(userState.totalCost)} activeOpacity={0.7} >
    <Text style={{position:"absolute",width:26,height:26,backgroundColor:"white",borderRadius:13,textAlign:"center",verticalAlign:"middle",top:-13,fontSize:12,borderWidth:3,borderColor:"#ffffff66",color:"#333"}} > 
         {userState.totalCount}
    </Text>
    {/* <Text style={{color:"#fff"}} > Buy </Text> */}
    <AntDesign name="shoppingcart" color="#333" size={30} />
    </AnimatedBtn> : null 
   }
    
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#f2f2f2",
        // paddingTop:StatusBar.currentHeight
    },
    headerContainer:{
      flex:0.08,
      flexDirection:"row",
      padding:10,
      alignItems:"center",
      justifyContent:"space-between",
      // backgroundColor:"green",
      paddingTop:StatusBar.currentHeight,
      paddingHorizontal:10
    },
    profileBtn:{
       width:profileWidth,
       height:profileWidth,
      //  backgroundColor:"red",
       borderRadius:profileWidth/2,
      //  borderWidth:2,
      //  borderColor:"#ffffff55"
    },
    mainBody:{
       flex:0.9,
      //  backgroundColor:"black"
    },
    headerTitle:{
      fontSize:width*0.065,
      fontFamily:"lucky",
      color:"#ff7700ff",
      letterSpacing:1
    },
    todaySpecialContainer:{
      padding:10
      // flex:0.25,
      // backgroundColor:"gold"
    },
    categoryContainer:{
      // flex:0.5,
      // backgroundColor:"red"
      paddingHorizontal:10,
      flexDirection:"row",
      gap:10,
      justifyContent:"center"
    },
    foodItemContainer:{
      // flex:0.5,
      // backgroundColor:"green",
      flexDirection:"row",
      justifyContent:"flex-start",
      alignItems:"center",
      flexWrap:"wrap",
      gap:10,
      padding:10
    },
    chartBtn:{
      position:"absolute",
      width:60,
      height:60,
      backgroundColor:"#8cbecbff",
      borderRadius:30,
      justifyContent:"center",
      alignItems:"center",
      bottom:20,
      right:(width-60)/2,
      borderWidth:4,
      borderColor:"#ffffff66"
    },
    moreBtn:{
      width:width*0.6,
      height:46,
      backgroundColor:"#ff7700ff",
      marginVertical:20,
      alignSelf:"center",
      justifyContent:"center",
      alignItems:'center',
      borderRadius:16,
      borderWidth:3,
      borderColor:"#ffffff"
    },
    moreBtnText:{
      // paddingVertical:12,
      fontSize:16,
      fontFamily:"tangu",
      color:"#fff",
      textAlign:"center"
    }
})

export default HomeScreens