import React from 'react';
import { FlatList,StyleSheet, Text, View,ScrollView,TextInput,TouchableOpacity } from 'react-native';

import db from '../config';
import firebase from 'firebase';
export default class ReadScreen extends React.Component{
constructor(props){
    super(props);
    this.state={
     allsearch:[],search:''
    }
}
componentDidMount = async()=>{
const query = await db.collection("Writers").get()
query.docs.map((doc)=>{
    this.setState({allsearch:[...this.state.allsearch,doc.data()]})
})
    
}
fetchMoredata = async ()=>{
    var text = this.state.search;
    var enteredText = text.split("")
   
    
    if (enteredText[0] ===this.state.search){
    const query = await db.collection("Writers").where('Author','==',text).startAfter(this.state.lastVisibleTransaction).limit(10).get()
    query.docs.map((doc)=>{
      this.setState({
        allTransactions: [...this.state.allTransactions, doc.data()],
     
      });   
      if(text === doc.StoryTitle ){
       return(
        <View style={{borderBottomWidth: 2}}>
        <Text>{"Author: " + doc.Author}</Text>
        <Text>{"StoryTItle: " + doc.StoryTitle}</Text>
        <Text>{"Story: " + doc.Story}</Text>
      </View>
       )
    }
    })
  }
    else if(enteredText[0] ===this.state.search){
      const query = await db.collection("Writers").where('StoryTitle','==',text).startAfter(this.state.lastVisibleTransaction).limit(10).get()
      query.docs.map((doc)=>{
        this.setState({
          allTransactions: [...this.state.allTransactions, doc.data()],
      
        })
      })
    }
}
 render(){
     return(
        <View style={styles.container}>
          <View style={styles.searchBar}>
        
         <TextInput
         placeholder="Enetr Story title"
         style={{width:300,borderColor:'white',backgroundColor:'yellow',height:50}}
         onChangeText={text=>{this.setState({search:text})}}
         />
       
       </View>
       {
            this.state.allsearch.map((writer,index)=>{
                if(this.state.search ===''){
                    return(
                    <View key={index} style={{borderBottomWidth:2}}>
                 
                    <Text style={styles.outputs}>{"Title:"+  writer.StoryTitle}</Text>
                    <Text style={styles.outputs}>{"Author:"+  writer.Author}</Text>
                </View>
                )
                }else if(this.state.search === writer.StoryTitle){
                    return(
                        <FlatList
                        data={this.state.allsearch}
                        renderItem={({item})=>(
                          <ScrollView style={{borderBottomWidth: 2}}>
                            <Text>{"Author: " + item.Author}</Text>
                            <Text>{"StoryTItle: " + this.state.search}</Text>
                        <Text>{"Story:-"+item.Story}</Text>
                          </ScrollView>
                        )}
                        keyExtractor= {(item, index)=> index.toString()}
                        onEndReached ={this.fetchMoredata}
                        onEndReachedThreshold={0.7}
                      /> 
                    
                    )
                }
            })
        }
    
    
    
     </View>)
 }   
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20
      },
      searchBar:{
        flexDirection:'row',
        height:40,
        width:'auto',
        borderWidth:0.5,
        alignItems:'center',
        backgroundColor:'grey',
    
      },
})