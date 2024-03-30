import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, FlatList, Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

const { width, height } = Dimensions.get("window") ;

const HistoryOrderList = ({route,navigation}) => {
   
const [loading,setLoading] = useState(true);

useEffect(() => { 
    setTimeout(() => { setLoading(false) } ,300)
 } ,[])

 if(loading){
    return(
        <View style={[styles.container,{justifyContent:"center"}]} >
            <ActivityIndicator size={22} />
        </View>
    )
 }

  return (
    <View style={styles.container} >
        <FlatList 
        showsVerticalScrollIndicator={false}
        data={Object.values(route.params)}
        renderItem={({item,index}) => {
            return(
                <Animated.View style={{flexDirection:"row",alignItems:"center",gap:20}} entering={FadeInDown.delay(index*100)} > 
                   
                {item.imageUrl &&  <Image source={{uri:item.imageUrl}} style={{width:width/4,height:width/4}} /> }
                    <View>
                    <Text style={{fontFamily:"sakar",textAlign:"center",fontSize:16,color:"#000",paddingVertical:5}} > {item.name} </Text>
                    <Text style={{fontFamily:"sakar"}} > {item.totalPrice/item.totalCount} x {item.totalCount} = {item.totalPrice} </Text>
                    </View>
                </Animated.View>
                
            )
        }}
        contentContainerStyle={{marginBottom:10,paddingBottom:60}}
        />
    </View >
  )
}


const styles = StyleSheet.create({
    container:{
       marginTop:StatusBar.currentHeight,
       width:width-20,
       height:height-60,
       backgroundColor:"#f2f2f2",
       marginHorizontal:10,
       paddingVertical:20,
       borderRadius:10
       
    }
})

export default HistoryOrderList