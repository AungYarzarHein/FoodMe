import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { ActivityIndicator, BackHandler, Dimensions, FlatList, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AppContext from '../routes/appContext';
import OrderListItem from '../screenComponent/OrderListItem';
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";


const { width, height } = Dimensions.get("window") ;

const OrderNow = ({navigation}) => {
  const { userState,dispatch } = useContext(AppContext);
  // const orderList = userState.orderList ;
  const [loading,setLoading] = useState(true);
  const [data,setData] = useState(Object.values(userState.orderList));
  const appTimestamp = new Date().getTime();
  const [btnLoading,setBtnLoading] = useState(false);


    // handle backpress
    useEffect(() => {
        const backAction = () => {navigation.goBack() ; return true ;}
        const backHandler = BackHandler.addEventListener("hardwareBackPress",backAction) ;
        return () => backHandler.remove();
     } ,[])



  const onDeleteItem = useCallback((item) => {
    const newOrderList = data.filter((obj) => obj.id != item.id) ;
    // console.log(data.findIndex(obj => obj.id == item.id))
    // const index = data.findIndex(obj => obj.id == item.id);
    // data.splice(index,1);
    // console.log(data.length)
    // setData(data);
    dispatch({type:"deleteItem",value:item})
      setData(newOrderList);
    // console.log(item, " is deleted");
    // console.log(data);
  })


useEffect(() => { 
  setTimeout(() => {
    setLoading(false)
    // console.log(auth().currentUser)
  },500);
 } , [])

 const onOrderNow = () => {
  const docName = auth().currentUser.uid+appTimestamp ;
  setBtnLoading(true);
  // console.log(userState);
  const { totalPrice , totalCount , orderList } = userState ;
  const data = {
    totalCount,
    totalPrice,
    orderList,
    user:auth().currentUser.uid
  }
firestore().collection("orders").doc(docName).set(data)
.then((success) => {
  dispatch({type:"reset"});
  setBtnLoading(false);
  navigation.goBack();
})
.catch(err => {
  setBtnLoading(false);
  return;
})
  
 }


 if(loading){
  return(
    <View style={{flex:1,justifyContent:'center',alignItems:"center",backgroundColor:"#f2f2f2"}} >
      <ActivityIndicator size={28} color={"#333"} />
    </View>
  )
 }


  return (
    <View style={styles.container} >
      <View style={styles.header} >
        <Text style={styles.headerText} > Your Selected List </Text>
      </View>
    

      

        <ScrollView style={{flex:1}} contentContainerStyle={{paddingHorizontal:5}} showsVerticalScrollIndicator={false} >
        {
          data.map((item,index) => {
            return (
              <OrderListItem key={item.name} onDeleteItem={() => onDeleteItem(item)} index={index} obj={item} />
            )
          })
        }
        </ScrollView>


        <View style={styles.totalCost} >
          <Text style={styles.text} > Total Cost </Text>
          <Text style={styles.textOne} > {userState.totalPrice} </Text>
        </View>

        <TouchableOpacity style={styles.orderNowBtn} onPress={onOrderNow} >
         {
          btnLoading ?  <ActivityIndicator size={16} /> : null
         }
          <Text style={styles.orderNowBtnText} > Order Now </Text>
        </TouchableOpacity>
      {/* </ScrollView> */}
    </View>
  )

 
 
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#f2f2f2",
        paddingTop:StatusBar.currentHeight,
        // backgroundColor:"red"
    },
    header:{
        padding:15,
        justifyContent:"center",
        alignItems:"center",
        // backgroundColor:"gold"
    },
    headerText:{
      fontFamily:"tile",
      fontSize:22,
      color:"#8cbecbff"
    },
    totalCost:{
      flexDirection:"row",
      paddingVertical:10,
      paddingHorizontal:10,
      justifyContent:"center",
      gap:20,
      // backgroundColor:"red"
    },
    text:{
      fontFamily:"dinbo",
      fontSize:24,
      color:"#ff7700ff"
    },
    textOne:{
      fontFamily:"dinbo",
      fontSize:20,
      color:"#ff7700ff"
    },
    orderNowBtn:{
      width:width*0.6,
      backgroundColor:"#8cbecbff",
      flexDirection:"row",
      alignSelf:"center",
      justifyContent:"center",
      marginBottom:20,
      borderRadius:10,
      borderWidth:2,
      borderColor:"#8cbecb33"
    },
    orderNowBtnText:{
      fontFamily:"tile",
      fontSize:20,
      color:"#fff",
      paddingVertical:10,
      textAlign:"center",
      letterSpacing:1,
      paddingLeft:5
    }
})

export default OrderNow