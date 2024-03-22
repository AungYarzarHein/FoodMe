import React from 'react'
import { StatusBar, StyleSheet,Text,View } from 'react-native'
import MainRoute from './routes/MainRoute'

const App = () => {
  return (
   <View style={styles.container} >
     <StatusBar hidden />
     <MainRoute />
   </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1
  }
})

export default App