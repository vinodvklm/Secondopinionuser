import React, {Component} from 'react';
import {View, Button, FlatList,Text,Dimensions,TouchableOpacity} from 'react-native';
import { Default } from './Default';
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
class TileSelector extends Component {
    constructor() {
      super();
      this.state = {
        selectedTag:0,
      
     }
    }
      render(){

      return (
          <View style ={{flex:1}}>
            <View style={styles.containerStyle}>

                 <View>
               <Text
               allowFontScaling={false}
               style = {{color:this.props.titleColor ? this.props.titleColor : "black",fontFamily:Default.FontMedium,fontSize:15}}>{this.props.title}</Text>
               </View>
               <View style = {styles.selectorContainer}>
                   <TouchableOpacity onPress = {()=>{
                       this.props.onPress({tag:1});
                       this.setState({selectedTag:1});

                   }} >
                   <View style ={[styles.selectionObject,{backgroundColor:this.state.selectedTag === 1 ? '#36BC5A' :'lightgray' ,paddingTop:12,borderRadius:5}]}>
                  <Text 
                  allowFontScaling={false}
                  style={styles.textStyle}>{this.props.optionOne}</Text>
                   </View>
                   </TouchableOpacity>
                   <TouchableOpacity onPress = {()=>{

                       this.props.onPress({tag:2});
                       this.setState({selectedTag:2});

                   }}>
                   <View style ={[styles.selectionObject,{backgroundColor:this.state.selectedTag === 2 ? '#36BC5A' :'lightgray',paddingTop:12,marginHorizontal:20,borderRadius:5}]}>
                   <Text 
                   allowFontScaling={false}
                   style={styles.textStyle}>{this.props.optionTwo}</Text>
                   </View>
                   </TouchableOpacity>

              </View> 

              
    
            </View>
   
        </View>
      );
    }
    }
    const styles = {
      containerStyle: {
       
      },
      selectorContainer:{
        width: deviceWidth-50,
        
       // borderWidth: 1,
        margin: 0,
        flexDirection: 'row',
       // backgroundColor:'red' ,
        justifyContent:'space-around',
       
       
      
       
      },
      selectionObject:{
          height: 40,
          width:(deviceWidth-50-40)/2,
          marginHorizontal:5,
          marginVertical:20,
          alignItems:'center',

          
          
      },
      textStyle:{
        color:'white',
        justifyContent:'space-around',
        fontFamily:Default.FontMedium,
        fontSize:14
      }
      
    };
    
    export default TileSelector;
    