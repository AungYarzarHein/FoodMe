import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useReducer, useState } from 'react';
import HomeScreens from '../screens/HomeScreens';
import MyOrders from '../screens/MyOrders';
import MyHistory from '../screens/MyHistory';
import Login from '../screens/Login';
import TodaySpecial from '../screens/TodaySpecial';
import AppContext from './appContext';
import FoodDetails from '../screens/FoodDetails';
import OrderNow from '../screens/OrderNow';
import Profile from '../screens/Profile';
import HistoryOrderList from '../screens/HistoryOrderList';

// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator() ;



const userInitialState = {
      totalCount:0,
      totalPrice:0,
      orderList:{}
}

const reducer = (state,action) => {
  switch(action.type) {
    // case "addItemToCart" :
    //   return {...state,selectedItemCount:state.selectedItemCount + action.value.count,totalCost:state.totalCost + action.value.price,orderList:[...state.orderList,action.value.orderObj] };

      case "addItemToCart" :
        // console.log(state.orderList)
        return {...state,totalCount:state.totalCount + action.value.totalCount,totalPrice:state.totalPrice + action.value.totalPrice,orderList:{...state.orderList,[action.value.id]:action.value} };

    case "deleteItem" : 
      delete state.orderList[action.value.id];
      // const { price , count , objName } = action.value ;
      return {...state,totalPrice:state.totalPrice - action.value.totalPrice,totalCount:state.totalCount - action.value.totalCount }

    case "updateItem" : 
      // const theneworderlist = state.orderList.filter(item => item.id != action.value.id) ;
      return {...state,totalCount:state.totalCount + action.value.realCount,totalPrice:state.totalPrice + action.value.realPrice,orderList:{...state.orderList,[action.value.id]:action.value.orderItem} };
       


    case "reset" : 
      return {totalCount:0,totalPrice:0,orderList:{}}
  }

}





const MainRoute = () => {
    const [user,setUser] = useState({});
    const [userState,dispatch] = useReducer(reducer,userInitialState)
    

  return (
    <AppContext.Provider value={{userState,dispatch}} >
      <NavigationContainer>
       <Stack.Navigator 
                screenOptions={{
                headerShown:false,
                animation:"fade",
                animationTypeForReplace:"push",
                presentation:"transparentModal"
              }}
       >
        <Stack.Screen name='login' component={Login} />
        <Stack.Screen name='home' component={HomeScreens} />
        <Stack.Screen name='todayspecial' component={TodaySpecial} />
        <Stack.Screen name='fooddetails' component={FoodDetails} />
        <Stack.Screen name='ordernow' component={OrderNow} />
        <Stack.Screen name='profile' component={Profile} />
        <Stack.Screen name='myorders' component={MyOrders} />
        <Stack.Screen name='myhistory' component={MyHistory} />
        <Stack.Screen name='historyorderlist' component={HistoryOrderList} options={{animation:"fade_from_bottom"}} />
       </Stack.Navigator>
    </NavigationContainer>
    </AppContext.Provider>
  )
}

export default MainRoute