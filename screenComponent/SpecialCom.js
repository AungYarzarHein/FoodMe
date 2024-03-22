import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, FlatList, Image, StyleSheet, View } from 'react-native'
import Animated from 'react-native-reanimated';
import one from "../screens/images/specialOne.png";
import two from "../screens/images/specialTwo.png";
import three from "../screens/images/specialThree.png";

const { width , height } = Dimensions.get("window") ;


const imgData = [
    {imgUrl:two,id:"specialone"},
    {imgUrl:one,id:"specialTwo"},
    {imgUrl:three,id:"specialThree"}
]

const SpecialCom = () => {
    const ref = useRef() ;
    const [activeIndex,setActiveIndex] = useState(0) ;
    const onScrollHandler = (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = scrollPosition/(width-20)
        if(Number.isInteger(index)){
            setActiveIndex(index)
        }

    }

    

    const getItem = (item,index) => ({
        length:width-10,
        offset:(width-20)*index,
        index:index
    })

    useEffect(() => {
     const inter =   setInterval(() => { 
        if(activeIndex == imgData.length -1){
            ref.current.scrollToIndex({
                index:0,
                animation:true
            })
        }else{
            ref.current.scrollToIndex({
                index:activeIndex + 1,
                animation:true
            })
        }
        } ,5000)

        return () =>  clearInterval(inter)
    })


  return (
   <View style={styles.container}  >
    <FlatList
    ref={ref}
    getItemLayout={getItem}
    horizontal={true}
    showsHorizontalScrollIndicator={false}
    data={imgData}
    pagingEnabled={true}
    renderItem={({item,index}) => {
    
        return(
            <View key={item.id} style={{width:width-20,height:140}} >
              <Image source={item.imgUrl}  style={{width:width-20,height:140,borderRadius:4}} />
            </View>
        )
    }}
    onScroll={onScrollHandler}
    />
    <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",paddingVertical:5,gap:10}} >
        <View style={[styles.dot,{backgroundColor:activeIndex ==0 ? "green":"red"}]} ></View>
        <View style={[styles.dot,{backgroundColor:activeIndex ==1 ? "green":"red"}]} ></View>
        <View style={[styles.dot,{backgroundColor:activeIndex ==2 ? "green":"red"}]} ></View>
    </View>
   </View>
  )
}


const styles = StyleSheet.create({
    container:{
      
    },
    dot:{
        width:10,
        height:10,
        borderRadius:5,
        borderWidth:2,
        borderColor:"#fff"
    }
})

export default React.memo(SpecialCom)