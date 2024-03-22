import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { ActivityIndicator, BackHandler, Dimensions, FlatList, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AppContext from '../routes/appContext';
import OrderListItem from '../screenComponent/OrderListItem';

const { width, height } = Dimensions.get("window") ;

const OrderNow = ({navigation}) => {
  const { userState,dispatch } = useContext(AppContext);
  // const orderList = userState.orderList ;
  const [loading,setLoading] = useState(true);
  const [data,setData] = useState(Object.values(userState.orderList));


    // handle backpress
    useEffect(() => {
        const backAction = () => {navigation.goBack() ; return true ;}
        const backHandler = BackHandler.addEventListener("hardwareBackPress",backAction) ;
        return () => backHandler.remove();
     } ,[])



  const onDeleteItem = useCallback((item) => {
    const newOrderList = data.filter((obj) => obj.id != item.id) ;
    dispatch({type:"deleteItem",value:item})
      setData(newOrderList);
    // console.log(item, " is deleted");
    // console.log(data);
  })


useEffect(() => { 
  setTimeout(() => {
    setLoading(false)
  },500);
 } , [])

 const onOrderNow = () => {
  console.log(userState)
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
    

        <FlatList 
        keyExtractor={(item,index) => `${item.name}${index}` }
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={({item,index}) => {
          
          return(
            <OrderListItem obj={item} onDeleteItem={()=> onDeleteItem(item)} index={index} />
          )
        }}
        contentContainerStyle={{paddingBottom:30,paddingHorizontal:10}}
        
        />


        <View style={styles.totalCost} >
          <Text style={styles.text} > Total Cost </Text>
          <Text style={styles.textOne} > {userState.totalPrice} </Text>
        </View>

        <TouchableOpacity style={styles.orderNowBtn} onPress={onOrderNow} >
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
        paddingTop:StatusBar.currentHeight
    },
    header:{
        paddingTop:20,
        justifyContent:"center",
        alignItems:"center"
    },
    headerText:{
      fontFamily:"lucky",
      fontSize:22,
      color:"#8cbecbff"
    },
    totalCost:{
      flexDirection:"row",
      paddingVertical:15,
      paddingHorizontal:10,
      justifyContent:"center",
      gap:20
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
      width:width*0.7,
      backgroundColor:"#8cbecbff",
      alignSelf:"center",
      marginVertical:20,
      borderRadius:10,
      borderWidth:3,
      borderColor:"#8cbecb33"
    },
    orderNowBtnText:{
      fontFamily:"lucky",
      fontSize:20,
      color:"#fff",
      paddingVertical:10,
      textAlign:"center",
      letterSpacing:1
    }
})

export default OrderNow