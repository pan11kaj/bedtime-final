import React from 'react';
import { StyleSheet, Text, View ,Image} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import ReadScreen from './Screens/ReadScreen';
import WriteScreen from './Screens/WriteScreen';

export default class App extends React.Component {
  render(){
  return (
    <View style={Styles.container}>
      <Text style={Styles.heading}>Story Hub</Text>
   <AppContainer/>
    </View>
  );
}}
const TabNavigator = createBottomTabNavigator({
  Write: {screen:WriteScreen},
  Read:  { screen:ReadScreen}

}, 
{
  defaultNavigationOptions: ({navigation})=>({
    tabBarIcon: ()=>{
      const routeName = navigation.state.routeName;
      if(routeName === "Read"){
        return(
          <Image
          source={require("./assets/read.png")}
          style={{width:40, height:40}}
        />
        )
        
      }
      else if(routeName === "Write"){
        return(
          <Image
          source={require("./assets/write.png")}
          style={{width:40, height:40}}
        />)
      }
    }
  })
}
);
var AppContainer = createAppContainer(TabNavigator)
const Styles = StyleSheet.create({
  container:{ flex:1,backgroundColor:'pink'
  },heading:{
    backgroundColor:'red',
    color:'white',
    textAlign:'center',
    fontSize:32,marginTop:20
  } 
})