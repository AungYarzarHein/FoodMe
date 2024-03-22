import React, { useContext } from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View,Image } from 'react-native';
import foodOne from "../screens/images/one.png";
import Animated, { BounceOut, FadeInDown, FadeOutDown, FadeOutLeft, FlipOutEasyX, FlipOutXDown, FlipOutYRight, LightSpeedInLeft, LightSpeedInRight, LightSpeedOutLeft, LightSpeedOutRight, ZoomOut, ZoomOutRight } from 'react-native-reanimated';
import AntDesign from "react-native-vector-icons/AntDesign";
import AppContext from '../routes/appContext';




const { width , height } = Dimensions.get("window") ;
const itemWidth = (width-20) ;
const itemHeight = (width-20) * 0.4 ;

const OrderListItem = ({obj,onDeleteItem,index}) => {
    const delay = index * 100 ;

  return (
   <Animated.View style={styles.container} entering={FadeInDown.duration(300).delay(delay)} exiting={ZoomOutRight.duration(300)} >
     <Image source={foodOne} style={{width:itemHeight,height:itemHeight}}  />
     <View style={{flex:1}} >
        <View style={styles.btnContainer} >
        {/* <TouchableOpacity style={styles.deleteBtn} >
            <AntDesign name="edit" size={18} color="#333" />
        </TouchableOpacity> */}
        
        <TouchableOpacity style={styles.deleteBtn} onPress={ onDeleteItem} >
        <AntDesign name="delete" size={18} color="#333" />
        </TouchableOpacity>
        </View>
        <Text style={styles.textOne} > {obj.name} </Text>
        <Text style={styles.textTwo} > {obj.totalPrice/obj.totalCount} x  {obj.totalCount} =  {obj.totalPrice}  </Text>
     </View>
   </Animated.View>
  )
}


const styles = StyleSheet.create({
    container:{
        width:itemWidth,
        // height:itemHeight,
        backgroundColor:"#8cbecb33",
        marginBottom:10,
        flexDirection:"row",
        padding:10,
        borderRadius:10,
        borderWidth:3,
        borderColor:"#ffffff55"

    },
    textOne:{
        fontSize:18,
        fontFamily:"tangu",
        color:"#333",
        paddingVertical:10
    },
    textTwo:{
        fontSize:18,
        fontFamily:"dinbo",
        color:"#ff7700ff"
    },
    deleteBtn:{
        // paddingVertical:10,
        // paddingHorizontal:10,
        width:itemWidth/10,
        height:itemWidth/10,
        backgroundColor:"#8cbecbff",
        borderRadius:(itemWidth/10)/2,
        justifyContent:"center",
        alignItems:"center",
        borderWidth:2,
        borderColor:"#ffffff55"
    },
    btnContainer:{
        flexDirection:"row",
        // backgroundColor:"green",
        justifyContent:"flex-end",
        gap:10
    }
})

export default React.memo(OrderListItem)