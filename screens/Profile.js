import React, { useEffect, useState } from 'react'
import { BackHandler, Dimensions, Pressable, StyleSheet, Text, TouchableOpacity, View , ScrollView, Image, ActivityIndicator, FlatList, Alert } from 'react-native' ;
import Animated, { FadeInDown, FadeInLeft, FadeInRight, FadeInUp, LightSpeedInLeft, LightSpeedInRight, ZoomIn, ZoomInEasyUp, ZoomInUp } from 'react-native-reanimated';
import { Rect, Svg } from 'react-native-svg';
import man from "./images/man1.jpg";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const { width , height  } = Dimensions.get("window") ;
const AnimatedRect = Animated.createAnimatedComponent(Rect);
const AnimatedBtn = Animated.createAnimatedComponent(TouchableOpacity);
const profileWidth = width * 0.3 ;
const top = ((height*0.4)-50)/2 - (profileWidth/2)

const Profile = ({navigation}) => {
 const [orders,setOrders] = useState([]);
 const [loading,setLoading] = useState(true);

    useEffect(() =>  {
        const backAction = () => {navigation.goBack() ; return true ;} ;
        const backHandler = BackHandler.addEventListener("hardwareBackPress",backAction) ;
        return () => backHandler.remove() ;
     })

     const onSignOut = async () => {
        // await auth().signOut();
        const user = auth().currentUser.uid;
        await auth().currentUser.delete(user);
        BackHandler.exitApp();
     }

     const onPressHandler = () => {
        Alert.alert("Are you sure","All your data will be deleted",[{text:"cancel"},{text:"Delete",onPress:onSignOut}],{cancelable:true})
     }

     useEffect(() => { 
        firestore().collection("orders").where("user","==",auth().currentUser.uid).get()
        .then((documents) => {
            if(documents){
                const itemList = []
                documents.forEach(document => {
                    itemList.push({...document.data(),"OrderId":document.id});
                })
                setOrders(itemList);
                setLoading(false);
            }
        })
      } ,[])

  return (
   <View style={styles.container} >
      <View style={{height:(height*0.4)-50,marginBottom:10}} >
      <Svg width={width} height={(height*0.4)-50}  >
<AnimatedRect width={width} height={height*0.4} x="0" y="-50" rx={50}  fill="#8cbecbff" entering={FadeInUp.duration(800)}   />

      </Svg>
      <Animated.Text style={{position:"absolute",bottom:20,width,textAlign:"center",fontSize:18,fontFamily:"tile",color:"#fff"}} entering={FadeInUp.duration(600)} > Hello User </Animated.Text>
      </View>
     

      <View style={styles.btnContainer} >
        <AnimatedBtn style={styles.btn} entering={FadeInLeft.duration(500).delay(300)} activeOpacity={0.7} >
            <Text style={styles.btnText} > Your Orders </Text>
        </AnimatedBtn>

        {/* <AnimatedBtn style={styles.btn} entering={FadeInRight.duration(500).delay(300)} activeOpacity={0.7} onPress={onPressHandler} >
            <Text style={styles.btnText} > Delete Account </Text>
        </AnimatedBtn> */}
      </View>


     <Animated.Image source={man} style={styles.profileImage} entering={ZoomIn.duration(300)} />
    
      
     {
        loading ?  <View style={{flex:1,justifyContent:"center",alignItems:"center"}} >
        <ActivityIndicator size={22} color={"#333"} />
       </View> : <View style={{flex:1,justifyContent:"center",alignItems:"center"}} >
    

        <FlatList data={orders} 
        renderItem={({item,index}) => {
            
            return(
                <AnimatedBtn style={styles.card} entering={FadeInDown.duration(300).delay(index*100)} activeOpacity={0.7} onPress={() =>navigation.navigate("historyorderlist",item.orderList)} >

                    {/* <View style={{flexDirection:"row",justifyContent:"space-between"}} > */}
                    <Text style={{fontSize:12,color:"#333",paddingVertical:5}} >  {item.OrderId} </Text>
                    <Text style={{fontSize:16,color:"#000"}} > Number Of Items {item.totalCount} </Text>

                    {/* </View> */}
                    <View style={{flexDirection:"row",justifyContent:"flex-end",paddingVertical:5}} >
                    <Text style={{flex:1,textAlign:"left",fontSize:16,color:"#000"}} >  Total {item.totalPrice}  </Text>
                    <Text> status : </Text>
                    <Text style={{color:item.comfirm? "green":"red"}} > { item.comfirm? "comfirmed":"processing" } </Text>
                    </View>
                </AnimatedBtn>
            )
        }}
        contentContainerStyle={{padding:5,gap:5,paddingBottom:100}}
        showsVerticalScrollIndicator={false}
        
         />
       </View>
     }
      
   </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#f3f3f3"
    },
    btnContainer:{
        width:width,
        // height:300,
        // backgroundColor:"red",
        flexDirection:"row",
        justifyContent:"center",
        paddingHorizontal:10,
        // paddingVertical:10
    },
    btn:{
        width:width*0.4,
        backgroundColor:"#8cbecbff",
        borderRadius:10,
        borderWidth:2,
        borderColor:"#ffffff55"
    },
    btnText:{
        paddingVertical:10,
        textAlign:"center",
        // fontSize:16,
        fontFamily:"tile",
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
    },
    card:{
        width:width-10,
        padding:5,
        backgroundColor:"#8cbecb33",
        borderRadius:4,
        // elevation:0.5,
        gap:10
    }
})

export default Profile