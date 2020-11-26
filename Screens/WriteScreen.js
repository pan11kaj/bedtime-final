import React from 'react';
import { StyleSheet, Text, View,TextInput ,TouchableOpacity,KeyboardAvoidingView,ToastAndroid} from 'react-native';
import db from '../config';
import firebase from 'firebase';
export default class WriteScreen extends React.Component{
    constructor(){
        super();
        this.state={
            storyTitle :'',writting:'',author:''
        }
    }
handleWriting = async() =>{
    var writes;
   db.collection("Writers").doc(this.state.storyTitle).get()
   .then((doc)=>{
      console.log(doc.data)
   })
}
 handleStory = async()=>{
     var datas=null

     db.collection("Writers").add({
        'Author' : this.state.author,
        'StoryTitle':this.state.storyTitle,
        'Story':this.state.writting
     })
     if(this.state.storyTitle ==='' || this.state.author ==='' || this.state.writting ==='' ){
         datas = "please fill values"
        ToastAndroid.show( datas, ToastAndroid.SHORT)
        this.setState({
            storyTitle :'',writting:'',author:''
        })
     }else{
        datas="Congratulations! Your story has uploaded"
        ToastAndroid.show( datas, ToastAndroid.SHORT)
     
     }
  
   
 }

 render(){
     return(
        <KeyboardAvoidingView style={style.container} behavior="padding" enabled>
         <View>
         <TextInput
         style={style.inputs}
         placeholder="Story Title"
         onChangeText={text=>{this.setState({storyTitle:text})}}
         value={this.state.storyTitle}
         />
    <TextInput
         style={style.inputs}
         placeholder="Author"
         onChangeText={text=>{this.setState({author:text})}}
         value={this.state.author}
         />
             <TextInput
         style={style.input2}
         placeholder="Write your story"
         onChangeText={text=>{this.setState({writting:text})}}
         value={this.state.writting}
         />
         <TouchableOpacity style={{backgroundColor:'red',width:80,justifyContent:'center',marginLeft:50}} onPress={async()=>{
                var transactionMessage = this.handleStory()
                this.setState({
                    storyTitle :'',writting:'',author:''
                })}}>
         <Text style={{color:'white',textAlign:'center'}}>Submit</Text></TouchableOpacity>
         </View>
         </KeyboardAvoidingView>
     )
 }   
}
const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
  inputs:{
 marginTop:50,
width:140,
borderWidth:2,borderColor:'blue'
  },
  input2:{
    justifyContent:'center',
 
    width:400,
    height:200,
    borderWidth:2,borderColor:'red'
  }  
})